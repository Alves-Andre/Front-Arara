import type { RecoveryArea, RecoveryAreaResponse } from '../types'
import { searchPropertyService } from '@/features/search/services'
import type { Property, PropertyStatus } from '@/features/search/types'

const semarhRecoveryArea: RecoveryArea = {
  id: 'rec-area-001',
  semarhCode: 'SEMARH-AR-2026-0001',
  name: 'Area em Recuperacao - Fazenda Boa Esperanca',
  totalAreaHectares: 428.6,
  recoveryAreaHectares: 86.4,
  createdAt: '2026-05-12T10:30:00.000Z',
  importedAt: '2026-05-30T13:42:00.000Z',
  monitoringStatus: 'monitoring',
  centroid: [-10.2147, -48.3274],
  polygon: [
    [-10.2218, -48.3354],
    [-10.2139, -48.3372],
    [-10.2086, -48.3295],
    [-10.2114, -48.3209],
    [-10.2197, -48.3228],
  ],
  property: {
    id: 'prop-001',
    name: 'Fazenda Boa Esperanca',
    owner: 'Agropecuaria Serra Verde LTDA',
    municipality: 'Palmas - TO',
    registrationCode: 'CAR-TO-1721000-7F2B.99A1.443D.8E21',
    boundary: [
      [-10.2352, -48.3549],
      [-10.1958, -48.3511],
      [-10.1887, -48.3092],
      [-10.2308, -48.3027],
      [-10.2444, -48.3298],
    ],
  },
}

const wait = (milliseconds: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })

export const recoveryAreaMockApi = {
  async getImportedRecoveryArea(areaId?: string): Promise<RecoveryAreaResponse> {
    if (areaId) {
      const response = await searchPropertyService.searchByCar(decodeURIComponent(areaId))
      const property = response.properties[0]

      if (property) {
        return { data: mapPropertyToRecoveryArea(property) }
      }
    }

    await wait(650)
    return { data: semarhRecoveryArea }
  },

  async getEmptyImportedRecoveryArea(): Promise<RecoveryAreaResponse> {
    await wait(350)
    return { data: null }
  },
}

const mapPropertyStatusToRecoveryStatus = (status: PropertyStatus): RecoveryArea['monitoringStatus'] => {
  const statusMap: Record<PropertyStatus, RecoveryArea['monitoringStatus']> = {
    monitoring: 'monitoring',
    awaiting_evidence: 'paused',
    analysis: 'imported',
    rejected: 'paused',
  }

  return statusMap[status]
}

const getCentroid = (polygon: Property['polygon']): RecoveryArea['centroid'] => {
  if (polygon.length === 0) {
    return [-10.2147, -48.3274]
  }

  const totals = polygon.reduce(
    (acc, [lat, lng]) => ({
      lat: acc.lat + lat,
      lng: acc.lng + lng,
    }),
    { lat: 0, lng: 0 }
  )

  return [totals.lat / polygon.length, totals.lng / polygon.length]
}

const mapPropertyToRecoveryArea = (property: Property): RecoveryArea => {
  const now = new Date().toISOString()

  return {
    id: property.id,
    semarhCode: `SEMARH-AR-${property.id}`,
    name: `Area em Recuperacao - ${property.name}`,
    totalAreaHectares: property.totalArea,
    recoveryAreaHectares: property.recoveryArea,
    createdAt: now,
    importedAt: now,
    monitoringStatus: mapPropertyStatusToRecoveryStatus(property.status),
    centroid: getCentroid(property.polygon),
    polygon: property.recoveryPolygon,
    property: {
      id: property.id,
      name: property.name,
      owner: property.owner,
      municipality: property.city,
      registrationCode: property.car,
      boundary: property.polygon,
    },
  }
}
