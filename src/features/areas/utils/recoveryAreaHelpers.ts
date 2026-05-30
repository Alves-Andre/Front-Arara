import type { RecoveryAreaStatus } from '../types'

type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning' | 'outline'

export const getRecoveryAreaStatusLabel = (status: RecoveryAreaStatus) => {
  const labels: Record<RecoveryAreaStatus, string> = {
    imported: 'Importada',
    monitoring: 'Em monitoramento',
    recovering: 'Em recuperacao',
    completed: 'Concluida',
    paused: 'Pausada',
  }

  return labels[status]
}

export const getRecoveryAreaStatusVariant = (status: RecoveryAreaStatus): BadgeVariant => {
  const variants: Record<RecoveryAreaStatus, BadgeVariant> = {
    imported: 'secondary',
    monitoring: 'default',
    recovering: 'success',
    completed: 'success',
    paused: 'warning',
  }

  return variants[status]
}

