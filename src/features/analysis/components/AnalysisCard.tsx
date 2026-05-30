'use client'

import { formatDate } from '@/shared/utils/formatters'
import type { EnvironmentalAnalysis } from '../types'
import { getAnalysisStatusLabel, getAnalysisTypeLabel } from '../utils/analysisHelpers'

interface AnalysisCardProps {
  analysis: EnvironmentalAnalysis
  onRun?: (id: string) => void
  onSelect?: (id: string) => void
}

export const AnalysisCard = ({ analysis, onRun, onSelect }: AnalysisCardProps) => {
  return (
    <article className="rounded-lg border p-4 transition hover:border-blue-300" onClick={() => onSelect?.(analysis.id)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{getAnalysisTypeLabel(analysis.type)}</h3>
          <p className="text-sm text-muted-foreground">{formatDate(analysis.date)}</p>
        </div>
        <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium">{getAnalysisStatusLabel(analysis.status)}</span>
      </div>
      {analysis.status === 'pending' && (
        <button
          className="mt-4 rounded border px-3 py-1 text-sm transition hover:bg-gray-50"
          type="button"
          onClick={(event) => {
            event.stopPropagation()
            onRun?.(analysis.id)
          }}
        >
          Executar
        </button>
      )}
    </article>
  )
}

