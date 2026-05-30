'use client'

import type { EnvironmentalEvidence } from '../types'
import { EvidenceCard } from './EvidenceCard'

interface EvidenceListProps {
  evidences: EnvironmentalEvidence[]
  isLoading?: boolean
  onSelect?: (id: string) => void
}

export const EvidenceList = ({ evidences, isLoading, onSelect }: EvidenceListProps) => {
  if (isLoading) {
    return <div className="rounded-lg border bg-gray-50 p-6 text-sm text-muted-foreground">Carregando evidencias...</div>
  }

  if (evidences.length === 0) {
    return <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">Nenhuma evidencia encontrada</div>
  }

  return (
    <div className="space-y-3">
      {evidences.map((evidence) => (
        <EvidenceCard key={evidence.id} evidence={evidence} onSelect={onSelect} />
      ))}
    </div>
  )
}

