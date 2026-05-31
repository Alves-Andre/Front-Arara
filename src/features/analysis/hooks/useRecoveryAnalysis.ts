'use client'

import { useEffect, useMemo, useState } from 'react'
import { analysisApi } from '../services/analysisApi'
import type { MonitoringPointEvidence, RecoveryAnalysisDataset, TemporalPeriod } from '../types'

export const useRecoveryAnalysis = (areaId?: string) => {
  const [data, setData] = useState<RecoveryAnalysisDataset | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    const loadData = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const dataset = await analysisApi.getAnalysisDataset(areaId)
        if (isMounted) {
          setData(dataset)
        }
      } catch (err: any) {
        if (isMounted) {
          setError('Nao foi possivel carregar a analise ambiental.')
        }
      } finally {
        if (isMounted) {
          setIsLoading(false)
        }
      }
    }

    loadData()

    return () => {
      isMounted = false
    }
  }, [areaId])

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
