// src/shared/utils/coordinates.ts

import type { Coordinates, BoundingBox } from '../types'

/**
 * Calcula distância entre dois pontos usando Haversine formula
 * Retorna distância em quilômetros
 */
export const calculateDistance = (from: Coordinates, to: Coordinates): number => {
  const R = 6371 // Raio da Terra em km
  const dLat = ((to.lat - from.lat) * Math.PI) / 180
  const dLng = ((to.lng - from.lng) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((from.lat * Math.PI) / 180) *
      Math.cos((to.lat * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  const distance = R * c

  return distance
}

/**
 * Converte graus para radianos
 */
export const toRadians = (degrees: number): number => {
  return (degrees * Math.PI) / 180
}

/**
 * Converte radianos para graus
 */
export const toDegrees = (radians: number): number => {
  return (radians * 180) / Math.PI
}

/**
 * Valida se coordenadas são válidas
 */
export const isValidCoordinates = (coords: Coordinates): boolean => {
  return coords.lat >= -90 && coords.lat <= 90 && coords.lng >= -180 && coords.lng <= 180
}

/**
 * Calcula centro de múltiplas coordenadas
 */
export const calculateCenter = (coordinates: Coordinates[]): Coordinates => {
  if (coordinates.length === 0) {
    return { lat: 0, lng: 0 }
  }

  const sum = coordinates.reduce(
    (acc, coord) => ({
      lat: acc.lat + coord.lat,
      lng: acc.lng + coord.lng,
    }),
    { lat: 0, lng: 0 }
  )

  return {
    lat: sum.lat / coordinates.length,
    lng: sum.lng / coordinates.length,
  }
}

/**
 * Calcula bounding box para coordenadas
 */
export const calculateBounds = (coordinates: Coordinates[]): BoundingBox => {
  if (coordinates.length === 0) {
    return { north: 0, south: 0, east: 0, west: 0 }
  }

  const lats = coordinates.map((c) => c.lat)
  const lngs = coordinates.map((c) => c.lng)

  return {
    north: Math.max(...lats),
    south: Math.min(...lats),
    east: Math.max(...lngs),
    west: Math.min(...lngs),
  }
}

/**
 * Verifica se ponto está dentro de bounding box
 */
export const isPointInBounds = (point: Coordinates, bounds: BoundingBox): boolean => {
  return (
    point.lat >= bounds.south &&
    point.lat <= bounds.north &&
    point.lng >= bounds.west &&
    point.lng <= bounds.east
  )
}
