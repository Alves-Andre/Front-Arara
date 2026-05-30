'use client'

import type { EnvironmentalRequest } from '../types'
import { RequestCard } from './RequestCard'

interface RequestListProps {
  requests: EnvironmentalRequest[]
  isLoading?: boolean
  onSelect?: (id: string) => void
}

export const RequestList = ({ requests, isLoading, onSelect }: RequestListProps) => {
  if (isLoading) {
    return <div className="rounded-lg border bg-gray-50 p-6 text-sm text-muted-foreground">Carregando solicitacoes...</div>
  }

  if (requests.length === 0) {
    return <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">Nenhuma solicitacao encontrada</div>
  }

  return (
    <div className="space-y-3">
      {requests.map((request) => (
        <RequestCard key={request.id} request={request} onSelect={onSelect} />
      ))}
    </div>
  )
}

