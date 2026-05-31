'use client'

import { useEffect, useState } from 'react'
import { areasApi } from '../services/areasApi'
import type { RecoveryArea } from '../types'

interface UseRecoveryAreaOptions {
  areaId?: string
  empty?: boolean
}

interface UseRecoveryAreaState {
  data: RecoveryArea | null
  isLoading: boolean
  isEmpty: boolean
  error: string | null
}

export const useRecoveryArea = ({ areaId, empty = false }: UseRecoveryAreaOptions = {}): UseRecoveryAreaState => {
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
          ? await areasApi.getEmptyImportedRecoveryArea()
          : await areasApi.getImportedRecoveryArea(areaId)

        if (isMounted) {
          setData(response.data)
        }
      } catch (err: any) {
        console.log('[useRecoveryArea] Caught error:', err.message, err)
        if (isMounted) {
          setError('Nao foi possivel carregar a area importada da SEMARH. Erro: ' + err.message)
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
  }, [areaId, empty])

  return {
    data,
    isLoading,
    isEmpty: !isLoading && !data,
    error,
  }
}

