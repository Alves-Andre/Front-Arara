'use client'

import { useEffect, useState } from 'react'
import { recoveryAreaMockApi } from '../services/recoveryAreaMockApi'
import type { RecoveryArea } from '../types'

interface UseRecoveryAreaOptions {
  empty?: boolean
}

interface UseRecoveryAreaState {
  data: RecoveryArea | null
  isLoading: boolean
  isEmpty: boolean
  error: string | null
}

export const useRecoveryArea = ({ empty = false }: UseRecoveryAreaOptions = {}): UseRecoveryAreaState => {
  const [data, setData] = useState<RecoveryArea | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadRecoveryArea = async () => {
      try {
        setIsLoading(true)
        setError(null)

        const response = empty
          ? await recoveryAreaMockApi.getEmptyImportedRecoveryArea()
          : await recoveryAreaMockApi.getImportedRecoveryArea()

        if (isMounted) {
          setData(response.data)
        }
      } catch {
        if (isMounted) {
          setError('Nao foi possivel carregar a area importada da SEMARH.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadRecoveryArea()

    return () => {
      isMounted = false
    }
  }, [empty])

  return {
    data,
    isLoading,
    isEmpty: !isLoading && !data,
    error,
  }
}

