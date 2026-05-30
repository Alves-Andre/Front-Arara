'use client'

import { formatDate } from '@/shared/utils/formatters'
import type { EnvironmentalRequest } from '../types'
import { getRequestPriorityLabel, getRequestStatusLabel, getRequestTypeLabel } from '../utils/requestHelpers'

interface RequestCardProps {
  request: EnvironmentalRequest
  onSelect?: (id: string) => void
}

export const RequestCard = ({ request, onSelect }: RequestCardProps) => {
  return (
    <article className="rounded-lg border p-4 transition hover:border-blue-300" onClick={() => onSelect?.(request.id)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{request.title}</h3>
          <p className="text-sm text-muted-foreground">{getRequestTypeLabel(request.requestType)}</p>
        </div>
        <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium">{getRequestStatusLabel(request.status)}</span>
      </div>
      <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{request.description}</p>
      <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground">
        <span>Prioridade: {getRequestPriorityLabel(request.priority)}</span>
        <span>Prazo: {formatDate(request.targetEndDate)}</span>
      </div>
    </article>
  )
}

