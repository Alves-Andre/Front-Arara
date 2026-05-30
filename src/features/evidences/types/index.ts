import type { CommonFilters, Evidence } from '@/shared/types'

export type EnvironmentalEvidence = Evidence

export interface EvidenceFilters extends CommonFilters {
  areaId?: string
  monitoringEventId?: string
  type?: EnvironmentalEvidence['type'][]
  from?: string
  to?: string
}

