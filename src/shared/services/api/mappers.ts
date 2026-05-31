// src/shared/services/api/mappers.ts

import type { LatLngTuple } from '@/features/areas/types'

/**
 * Converte geometria GeoJSON (Point ou Polygon) para array de tuplas [lat, lng]
 */
export const geoJsonToLatLngs = (geom: any): LatLngTuple[] => {
  if (!geom || !geom.coordinates) return []

  if (geom.type === 'Polygon') {
    // GeoJSON Polygon: [[[lng, lat], [lng, lat], ...]]]
    const ring = geom.coordinates[0] || []
    return ring.map((coord: number[]) => [coord[1], coord[0]] as LatLngTuple)
  }

  if (geom.type === 'Point') {
    // GeoJSON Point: [lng, lat]
    return [[geom.coordinates[1], geom.coordinates[0]]]
  }

  return []
}

/**
 * Calcula o centroide simples (media) de um polígono
 */
export const calculateCentroid = (coords: LatLngTuple[]): LatLngTuple => {
  if (!coords || coords.length === 0) return [0, 0]

  const sum = coords.reduce(
    (acc, val) => {
      acc[0] += val[0]
      acc[1] += val[1]
      return acc
    },
    [0, 0]
  )

  return [sum[0] / coords.length, sum[1] / coords.length]
}

/**
 * Mapeia os dados do backend para a estrutura de RecoveryArea do frontend
 */
export const mapAffectedAreaToRecoveryArea = (affectedArea: any): any => {
  const propertyCoords = geoJsonToLatLngs(affectedArea.property?.geom)
  const areaCoords = geoJsonToLatLngs(affectedArea.geom)

  return {
    id: affectedArea.id,
    semarhCode: affectedArea.id.substring(0, 8).toUpperCase(), // Fake semarh code if not present
    name: affectedArea.name || 'Área em Recuperação',
    property: {
      id: affectedArea.property?.id || '',
      name: affectedArea.property?.name || 'Propriedade',
      owner: affectedArea.property?.ownerName || 'Não informado',
      municipality: affectedArea.property?.municipality || 'Não informado',
      registrationCode: affectedArea.property?.carCode || 'Não informado',
      boundary: propertyCoords,
    },
    totalAreaHectares: affectedArea.property?.totalAreaHa || 0,
    recoveryAreaHectares: affectedArea.areaHa || 0,
    createdAt: affectedArea.createdAt || new Date().toISOString(),
    monitoringStatus: (affectedArea.status || 'monitoring').toLowerCase(),
    importedAt: affectedArea.createdAt || new Date().toISOString(),
    polygon: areaCoords,
    centroid: calculateCentroid(areaCoords),
  }
}
