'use client'

import { formatDate } from '@/shared/utils/formatters'
import type { EnvironmentalEvidence } from '../types'
import { getEvidenceTypeLabel } from '../utils/evidenceHelpers'

interface EvidenceCardProps {
  evidence: EnvironmentalEvidence
  onSelect?: (id: string) => void
}

export const EvidenceCard = ({ evidence, onSelect }: EvidenceCardProps) => {
  return (
    <article className="rounded-lg border p-4 transition hover:border-blue-300" onClick={() => onSelect?.(evidence.id)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{evidence.caption || getEvidenceTypeLabel(evidence.type)}</h3>
          <p className="text-sm text-muted-foreground">{formatDate(evidence.date)}</p>
        </div>
        <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium">{getEvidenceTypeLabel(evidence.type)}</span>
      </div>
      <a className="mt-3 block truncate text-sm text-blue-600" href={evidence.url} target="_blank" rel="noreferrer">
        {evidence.url}
      </a>
    </article>
  )
}

