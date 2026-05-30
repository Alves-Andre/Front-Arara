'use client'

import { formatDate } from '@/shared/utils/formatters'
import type { Monitoring } from '../types'
import { getMonitoringStatusLabel, getMonitoringTypeLabel } from '../utils/monitoringHelpers'

interface MonitoringCardProps {
  event: Monitoring
  onSelect?: (id: string) => void
}

export const MonitoringCard = ({ event, onSelect }: MonitoringCardProps) => {
  return (
    <article
      className="rounded-lg border p-4 transition hover:border-blue-300"
      onClick={() => onSelect?.(event.id)}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{getMonitoringTypeLabel(event.type)}</h3>
          <p className="text-sm text-muted-foreground">{formatDate(event.date)}</p>
        </div>
        <span className="rounded bg-gray-100 px-2 py-1 text-xs font-medium">
          {getMonitoringStatusLabel(event.status)}
        </span>
      </div>
      {event.notes && <p className="mt-3 line-clamp-2 text-sm text-muted-foreground">{event.notes}</p>}
    </article>
  )
}

