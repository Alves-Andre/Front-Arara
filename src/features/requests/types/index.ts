import type { CommonFilters, RecoveryRequest } from '@/shared/types'

export type EnvironmentalRequest = RecoveryRequest

export interface RequestFilters extends CommonFilters {
  areaId?: string
  status?: EnvironmentalRequest['status'][]
  requestType?: EnvironmentalRequest['requestType'][]
  priority?: EnvironmentalRequest['priority'][]
  assignedTo?: string
}

