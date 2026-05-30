'use client'

import type { EnvironmentalAnalysis } from '../types'
import { AnalysisCard } from './AnalysisCard'

interface AnalysisListProps {
  analyses: EnvironmentalAnalysis[]
  isLoading?: boolean
  onRun?: (id: string) => void
  onSelect?: (id: string) => void
}

export const AnalysisList = ({ analyses, isLoading, onRun, onSelect }: AnalysisListProps) => {
  if (isLoading) {
    return <div className="rounded-lg border bg-gray-50 p-6 text-sm text-muted-foreground">Carregando analises...</div>
  }

  if (analyses.length === 0) {
    return <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">Nenhuma analise encontrada</div>
  }

  return (
    <div className="space-y-3">
      {analyses.map((analysis) => (
        <AnalysisCard key={analysis.id} analysis={analysis} onRun={onRun} onSelect={onSelect} />
      ))}
    </div>
  )
}

