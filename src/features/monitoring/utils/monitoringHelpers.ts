import type { Monitoring } from '../types'

export const getMonitoringTypeLabel = (type: Monitoring['type']) => {
  const labels: Record<Monitoring['type'], string> = {
    inspection: 'Vistoria',
    measurement: 'Medicao',
    analysis: 'Analise',
  }

  return labels[type]
}

export const getMonitoringStatusLabel = (status: Monitoring['status']) => {
  const labels: Record<Monitoring['status'], string> = {
    pending: 'Pendente',
    in_progress: 'Em andamento',
    completed: 'Concluido',
    failed: 'Falhou',
  }

  return labels[status]
}

