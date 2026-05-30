import type { Analysis, CommonFilters } from '@/shared/types'

export type EnvironmentalAnalysis = Analysis

export interface AnalysisFilters extends CommonFilters {
  areaId?: string
  type?: EnvironmentalAnalysis['type'][]
  status?: EnvironmentalAnalysis['status'][]
  from?: string
  to?: string
}

