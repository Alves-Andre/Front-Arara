import type { CommonFilters, MonitoringEvent } from '@/shared/types'

export type Monitoring = MonitoringEvent

export interface MonitoringFilters extends CommonFilters {
  areaId?: string
  type?: Monitoring['type'][]
  status?: Monitoring['status'][]
  from?: string
  to?: string
}

