export type RecoveryAreaStatus = 'imported' | 'monitoring' | 'recovering' | 'completed' | 'paused'

export type LatLngTuple = [number, number]

export interface RecoveryAreaProperty {
  id: string
  name: string
  owner: string
  municipality: string
  registrationCode: string
  boundary: LatLngTuple[]
}

export interface RecoveryArea {
  id: string
  semarhCode: string
  name: string
  property: RecoveryAreaProperty
  totalAreaHectares: number
  recoveryAreaHectares: number
  createdAt: string
  monitoringStatus: RecoveryAreaStatus
  importedAt: string
  polygon: LatLngTuple[]
  centroid: LatLngTuple
}

export interface RecoveryAreaResponse {
  data: RecoveryArea | null
}

