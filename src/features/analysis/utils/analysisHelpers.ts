import type { EnvironmentalAnalysis } from '../types'

export const getAnalysisTypeLabel = (type: EnvironmentalAnalysis['type']) => {
  const labels: Record<EnvironmentalAnalysis['type'], string> = {
    ndvi: 'NDVI',
    ndbi: 'NDBI',
    change_detection: 'Deteccao de mudanca',
    classification: 'Classificacao',
    custom: 'Customizada',
  }

  return labels[type]
}

export const getAnalysisStatusLabel = (status: EnvironmentalAnalysis['status']) => {
  const labels: Record<EnvironmentalAnalysis['status'], string> = {
    pending: 'Pendente',
    processing: 'Processando',
    completed: 'Concluida',
    failed: 'Falhou',
  }

  return labels[status]
}

