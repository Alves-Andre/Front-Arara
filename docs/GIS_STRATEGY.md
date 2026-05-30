// docs/GIS_STRATEGY.md

# Estratégia GIS (Geospatial Information System)

## 🗺️ Configuração de Mapas

### Leaflet + React Leaflet

```typescript
// src/shared/lib/mapConfig.ts
export const MAP_CONFIG = {
  tileLayer: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  defaultCenter: [-15.8267, -48.0],
  defaultZoom: 10,
  minZoom: 3,
  maxZoom: 18,
}
```

## 🧭 Componente Base de Mapa

```typescript
// src/shared/components/Map/GeoMap.tsx
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'

export const GeoMap = ({ center, zoom, markers }) => {
  return (
    <MapContainer center={center} zoom={zoom} style={{ height: '100%' }}>
      <TileLayer url={MAP_CONFIG.tileLayer} />
      {markers.map(marker => (
        <Marker key={marker.id} position={[marker.lat, marker.lng]}>
          <Popup>{marker.title}</Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}
```

## 📍 Tipos Geoespaciais

```typescript
// src/shared/types/gis.ts
export interface Coordinates {
  lat: number  // -90 a 90
  lng: number  // -180 a 180
}

export interface GeoPoint {
  type: 'Point'
  coordinates: [lng, lat] // GeoJSON format
}

export interface GeoPolygon {
  type: 'Polygon'
  coordinates: Array<Array<[lng, lat]>>
}

export interface MapBounds {
  north: number
  south: number
  east: number
  west: number
}
```

## 🎯 Cálculos Geoespaciais

### Distância (Haversine)

```typescript
// src/shared/utils/coordinates.ts
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
  return R * c // Distância em km
}
```

### Centro de Múltiplas Coordenadas

```typescript
export const calculateCenter = (coords: Coordinates[]): Coordinates => {
  const sum = coords.reduce(
    (acc, c) => ({ lat: acc.lat + c.lat, lng: acc.lng + c.lng }),
    { lat: 0, lng: 0 }
  )
  return {
    lat: sum.lat / coords.length,
    lng: sum.lng / coords.length,
  }
}
```

### Validação

```typescript
export const isValidCoordinates = (coords: Coordinates): boolean => {
  return coords.lat >= -90 && coords.lat <= 90 &&
         coords.lng >= -180 && coords.lng <= 180
}
```

## 🎨 Camadas de Mapa

### Base Tiles

```typescript
export const MAP_TILES = {
  OPENSTREETMAP: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  SATELLITE: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
  TOPOGRAPHIC: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
}
```

### Camadas Customizadas

```typescript
interface MapLayer {
  id: string
  name: string
  type: 'tile' | 'geojson' | 'raster'
  visible: boolean
  opacity?: number
  zIndex?: number
}

const layers: MapLayer[] = [
  { id: 'areas', name: 'Áreas', type: 'geojson', visible: true },
  { id: 'monitoring', name: 'Monitoramento', type: 'geojson', visible: true },
  { id: 'satellite', name: 'Satélite', type: 'raster', visible: false },
]
```

## 🎯 Marcadores

### Tipos de Marcador

```typescript
interface MapMarker {
  id: string
  coordinates: Coordinates
  title: string
  description?: string
  icon?: string // URL da imagem
  color?: string // Cor do marcador
  data?: Record<string, any> // Dados customizados
}
```

### Renderização

```typescript
{markers.map(marker => (
  <Marker
    key={marker.id}
    position={[marker.coordinates.lat, marker.coordinates.lng]}
    icon={createCustomIcon(marker.color)}
    onClick={() => handleMarkerClick(marker)}
  >
    <Popup>
      <div>
        <h3>{marker.title}</h3>
        <p>{marker.description}</p>
      </div>
    </Popup>
  </Marker>
))}
```

## 🔍 Filtros Espaciais

### Por Proximidade

```typescript
export const filterByProximity = (
  markers: MapMarker[],
  center: Coordinates,
  radiusKm: number
): MapMarker[] => {
  return markers.filter(marker => {
    const distance = calculateDistance(center, marker.coordinates)
    return distance <= radiusKm
  })
}
```

### Por Área (Bounding Box)

```typescript
export const filterByBounds = (
  markers: MapMarker[],
  bounds: MapBounds
): MapMarker[] => {
  return markers.filter(marker => {
    const { lat, lng } = marker.coordinates
    return lat >= bounds.south && lat <= bounds.north &&
           lng >= bounds.west && lng <= bounds.east
  })
}
```

## 📊 Índices Espectrais (Satélite)

### NDVI (Normalized Difference Vegetation Index)

```typescript
export const calculateNDVI = (nir: number, red: number): number => {
  return (nir - red) / (nir + red)
}

// Interpretação:
// < 0.2: Água/Nuvem
// 0.2-0.4: Área urbana/Solo exposto
// 0.4-0.6: Vegetação moderada
// > 0.6: Vegetação densa
```

### NDBI (Normalized Difference Built-up Index)

```typescript
export const calculateNDBI = (swir: number, nir: number): number => {
  return (swir - nir) / (swir + nir)
}

// Para identificar áreas construídas
```

### NDMI (Normalized Difference Moisture Index)

```typescript
export const calculateNDMI = (nir: number, swir: number): number => {
  return (nir - swir) / (nir + swir)
}

// Para umidade da vegetação
```

## 📈 Análises Geoespaciais

### Detecção de Mudanças

```typescript
export const detectChange = (
  beforeData: number[][],
  afterData: number[][]
): ChangeMap => {
  return beforeData.map((row, i) =>
    row.map((cell, j) => {
      const change = afterData[i][j] - cell
      return {
        improvement: change > threshold,
        degradation: change < -threshold,
        change: change,
      }
    })
  )
}
```

### Classificação de Uso da Terra

```typescript
export const classifyLandUse = (
  ndvi: number,
  ndbi: number,
  ndmi: number
): LandUseClass => {
  if (ndvi < -0.2) return 'water'
  if (ndbi > 0.1 && ndvi < 0.4) return 'urban'
  if (ndvi > 0.6) return 'dense_vegetation'
  if (ndvi > 0.4 && ndvi < 0.6) return 'moderate_vegetation'
  return 'other'
}
```

## 🎓 Visualização de Dados

### Heatmaps

```typescript
import HeatmapLayer from '@react-leaflet/heatmap-layer'

<HeatmapLayer
  points={data.map(item => [
    item.coordinates.lat,
    item.coordinates.lng,
    item.intensity,
  ])}
  radius={25}
  blur={15}
  max={1}
/>
```

### GeoJSON Styling

```typescript
const geoJSONStyle = (feature) => {
  const value = feature.properties.ndvi
  let color = '#ff0000' // Vermelho: baixo

  if (value > 0.6) color = '#00aa00' // Verde: alto
  else if (value > 0.4) color = '#ffff00' // Amarelo: médio

  return {
    color: color,
    weight: 2,
    opacity: 0.8,
    fillOpacity: 0.6,
  }
}

<GeoJSON data={geojsonData} style={geoJSONStyle} />
```

## 🔗 Integração com Backend

### API de Dados GIS

```typescript
export const gisService = {
  async getAreaBoundary(areaId: string) {
    const { data } = await axiosClient.get(`/gis/areas/${areaId}/boundary`)
    return data // GeoJSON
  },

  async getIndices(areaId: string, date: string) {
    const { data } = await axiosClient.get(`/gis/areas/${areaId}/indices`, {
      params: { date },
    })
    return data // { ndvi, ndbi, ndmi, ... }
  },

  async getSatelliteImage(areaId: string, date: string) {
    const { data } = await axiosClient.get(`/gis/satellite/${areaId}`, {
      params: { date },
    })
    return data // { url, metadata, ... }
  },
}
```

## 🏗️ Estrutura de Componente Completo

```typescript
// src/features/satellite/components/SatelliteMap.tsx
export const SatelliteMap = ({ areaId }) => {
  const { data: area } = useArea(areaId)
  const { data: indices } = useAreaIndices(areaId)
  const { data: image } = useSatelliteImage(areaId)

  return (
    <div className="space-y-4">
      <GeoMap
        center={area?.coordinates}
        zoom={12}
        markers={[
          {
            id: areaId,
            coordinates: area?.coordinates,
            title: area?.name,
            data: indices,
          },
        ]}
      />

      <IndicesVisualization indices={indices} />
      <ChangeDetection areaId={areaId} />
    </div>
  )
}
```
