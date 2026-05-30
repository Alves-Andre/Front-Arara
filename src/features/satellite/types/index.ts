import type { CommonFilters, SatelliteImage } from '@/shared/types'

export type SatelliteScene = SatelliteImage

export interface SatelliteFilters extends CommonFilters {
  areaId?: string
  provider?: SatelliteScene['provider'][]
  maxCloudCover?: number
  from?: string
  to?: string
}

