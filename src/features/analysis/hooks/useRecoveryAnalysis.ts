'use client'

import { useEffect, useMemo, useState } from 'react'
import { axiosClient } from '@/shared/services/api/axiosClient'
import type { MonitoringPointEvidence, RecoveryAnalysisDataset, TemporalPeriod } from '../types'

export const useRecoveryAnalysis = (carCode?: string) => {
  const [data, setData] = useState<RecoveryAnalysisDataset | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!carCode) {
      setIsLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        setIsLoading(true)
        const { data } = await axiosClient.get<RecoveryAnalysisDataset>(
          `/v1/compliances/recovery-analysis/${carCode}`
        )
        setData(data)
      } catch (err: any) {
        console.error('Erro ao carregar análise ambiental:', err)
        setError('Nao foi possivel carregar a analise ambiental real. Verifique se o código CAR existe.')
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [carCode])

  return {
    data,
    isLoading,
    error,
    isEmpty: !isLoading && !error && (!data || data.monitoringPoints.length === 0),
  }
}

export const useMonitoringPoints = (dataset: RecoveryAnalysisDataset | null) => {
  return useMemo(() => dataset?.monitoringPoints ?? [], [dataset])
}

export const useEvidence = (points: MonitoringPointEvidence[], selectedPointId: string | null) => {
  return useMemo(() => {
    if (points.length === 0) {
      return null
    }

    return points.find((point) => point.id === selectedPointId) ?? points[0]
  }, [points, selectedPointId])
}

export const useSatelliteImages = (selectedPoint: MonitoringPointEvidence | null, selectedPeriod: TemporalPeriod | null) => {
  return useMemo(() => {
    if (!selectedPoint) {
      return null
    }

    return {
      ...selectedPoint.satellite,
      selectedPeriod,
    }
  }, [selectedPoint, selectedPeriod])
}

export const useTimeline = (dataset: RecoveryAnalysisDataset | null) => {
  const timeline = useMemo(() => dataset?.timeline ?? [], [dataset])
  const currentPeriod = timeline[0] ?? null

  return {
    timeline,
    currentPeriod,
  }
}
