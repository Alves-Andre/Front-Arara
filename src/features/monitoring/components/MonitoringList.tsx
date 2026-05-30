'use client'

import type { Monitoring } from '../types'
import { MonitoringCard } from './MonitoringCard'

interface MonitoringListProps {
  events: Monitoring[]
  isLoading?: boolean
  onSelect?: (id: string) => void
}

export const MonitoringList = ({ events, isLoading, onSelect }: MonitoringListProps) => {
  if (isLoading) {
    return <div className="rounded-lg border bg-gray-50 p-6 text-sm text-muted-foreground">Carregando monitoramentos...</div>
  }

  if (events.length === 0) {
    return <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">Nenhum monitoramento encontrado</div>
  }

  return (
    <div className="space-y-3">
      {events.map((event) => (
        <MonitoringCard key={event.id} event={event} onSelect={onSelect} />
      ))}
    </div>
  )
}

