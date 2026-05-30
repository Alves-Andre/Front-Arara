// src/shared/types/gis.ts

export interface Coordinates {
  lat: number
  lng: number
}

export interface BoundingBox {
  north: number
  south: number
  east: number
  west: number
}

export interface GeoPoint {
  type: 'Point'
  coordinates: [number, number] // [lng, lat]
}

export interface GeoPolygon {
  type: 'Polygon'
  coordinates: Array<Array<[number, number]>>
}

export interface GeoFeature<T = any> {
  type: 'Feature'
  id?: string
  properties: T
  geometry: GeoPoint | GeoPolygon
}

export interface MapMarker {
  id: string
  coordinates: Coordinates
  title: string
  description?: string
  icon?: string
  color?: string
  data?: Record<string, any>
}

export interface MapLayer {
  id: string
  name: string
  type: 'tile' | 'geojson' | 'raster'
  visible: boolean
  opacity?: number
  zIndex?: number
}

export interface MapState {
  center: Coordinates
  zoom: number
  bounds?: BoundingBox
  activeLayer?: string
}
