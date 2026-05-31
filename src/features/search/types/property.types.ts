export type PropertyStatus = 'monitoring' | 'awaiting_evidence' | 'analysis' | 'rejected'
export type ProtectionAreaType = 'app' | 'legal_reserve' | 'restricted_use'

export type LatLngTuple = [number, number]

export interface ProtectionArea {
  id: string
  type: ProtectionAreaType
  label: string
  area: number
  polygon: LatLngTuple[]
}

export interface Property {
  id: string
  car: string
  name: string
  city: string
  owner: string
  totalArea: number
  recoveryArea: number
  status: PropertyStatus
  polygon: LatLngTuple[]
  recoveryPolygon: LatLngTuple[]
  protectionAreas: ProtectionArea[]
}

export interface PropertySearchResponse {
  properties: Property[]
}
