// src/shared/lib/mapConfig.ts

/**
 * Configurações para mapas Leaflet
 */

export const MAP_TILES = {
  OPENSTREETMAP: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  SATELLITE: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  TOPOGRAPHIC: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
}

export const DEFAULT_MAP_CENTER = {
  lat: -15.8267,
  lng: -48.0,
}

export const DEFAULT_MAP_ZOOM = 10

export const MAP_BOUNDS = {
  north: 5.2419,
  south: -33.7683,
  east: -28.8345,
  west: -73.9850,
}

export const MAP_CONFIG = {
  attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  tileLayer: process.env.NEXT_PUBLIC_MAP_TILE_URL || MAP_TILES.OPENSTREETMAP,
}
