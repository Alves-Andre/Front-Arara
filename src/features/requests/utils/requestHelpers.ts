import type { EnvironmentalRequest } from '../types'

export const getRequestStatusLabel = (status: EnvironmentalRequest['status']) => {
  const labels: Record<EnvironmentalRequest['status'], string> = {
    submitted: 'Enviada',
    approved: 'Aprovada',
    rejected: 'Rejeitada',
    in_progress: 'Em andamento',
    completed: 'Concluida',
  }

  return labels[status]
}

export const getRequestPriorityLabel = (priority: EnvironmentalRequest['priority']) => {
  const labels: Record<EnvironmentalRequest['priority'], string> = {
    low: 'Baixa',
    medium: 'Media',
    high: 'Alta',
    urgent: 'Urgente',
  }

  return labels[priority]
}

export const getRequestTypeLabel = (type: EnvironmentalRequest['requestType']) => {
  const labels: Record<EnvironmentalRequest['requestType'], string> = {
    monitoring: 'Monitoramento',
    analysis: 'Analise',
    intervention: 'Intervencao',
    inspection: 'Vistoria',
  }

  return labels[type]
}

