import type { Analysis, CommonFilters } from '@/shared/types'

export type EnvironmentalAnalysis = Analysis

export type MonitoringPointStatus = 'adequate' | 'attention' | 'critical'
export type EvidenceDirection = 'north' | 'south' | 'east' | 'west'
export type AnalysisDecision = 'approve_monitoring' | 'request_evidence' | 'recommend_visit'

export interface CompletedInspectionRecord {
  id: string
  areaId: string
  finishedAt: string
  decision: AnalysisDecision
  technicalOpinion: string
  evidenceRequest?: {
    pointCode: string
    directions: EvidenceDirection[]
  }
}

export interface AnalysisFilters extends CommonFilters {
  areaId?: string
  type?: EnvironmentalAnalysis['type'][]
  status?: EnvironmentalAnalysis['status'][]
  from?: string
  to?: string
}

export interface EvidencePhoto {
  id: string
  direction: EvidenceDirection
  title: string
  imageUrl: string
  capturedAt: string
}

export interface SatelliteImageSet {
  currentDate: string
  previousDate: string
  currentImageUrl: string
  previousImageUrl: string
  ndviTrend: number
}

export interface MonitoringPointEvidence {
  id: string
  code: string
  latitude: number
  longitude: number
  owner: string
  observations: string
  status: MonitoringPointStatus
  createdAt: string
  photos: Record<EvidenceDirection, EvidencePhoto>
  hasPanorama: boolean
  satellite: SatelliteImageSet
}

export interface RecoveryAnalysisArea {
  id: string
  semarhCode: string
  name: string
  propertyName: string
  owner: string
  municipality: string
  totalAreaHectares: number
  recoveryAreaHectares: number
  propertyBoundary: [number, number][]
  recoveryPolygon: [number, number][]
  centroid: [number, number]
}

export interface TemporalPeriod {
  id: string
  label: string
  daysAgo: number
  capturedAt: string
}

export interface RecoveryAnalysisDataset {
  area: RecoveryAnalysisArea
  monitoringPoints: MonitoringPointEvidence[]
  timeline: TemporalPeriod[]
}
