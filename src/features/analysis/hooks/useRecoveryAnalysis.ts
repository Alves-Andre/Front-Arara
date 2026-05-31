'use client'

import { useEffect, useMemo, useState } from 'react'
import { recoveryAnalysisMock } from '../services/recoveryAnalysisMock'
import type { MonitoringPointEvidence, RecoveryAnalysisDataset, TemporalPeriod } from '../types'

export const useRecoveryAnalysis = () => {
  const [data, setData] = useState<RecoveryAnalysisDataset | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      try {
        setData(recoveryAnalysisMock)
      } catch {
        setError('Nao foi possivel carregar a analise ambiental.')
      } finally {
        setIsLoading(false)
      }
    }, 450)

    return () => window.clearTimeout(timeoutId)
  }, [])

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
