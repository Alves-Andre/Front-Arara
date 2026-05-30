// src/shared/components/Map/GeoMap.tsx

'use client'

import React from 'react'
import dynamic from 'next/dynamic'

// Importação dinâmica para evitar problemas com SSR
const MapContainerDynamic = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
)

const TileLayerDynamic = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
)

const MarkerDynamic = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
)

const PopupDynamic = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
)

interface GeoMapProps {
  center: [number, number]
  zoom?: number
  markers?: Array<{
    id: string
    lat: number
    lng: number
    popup?: string
    isSelected?: boolean
  }>
  onMarkerClick?: (marker: any) => void
  onMapClick?: (coords: [number, number]) => void
  children?: React.ReactNode
}

export const GeoMap = React.forwardRef<HTMLDivElement, GeoMapProps>(
  ({ center, zoom = 10, markers = [], onMarkerClick, onMapClick, children }, ref) => {
    if (typeof window === 'undefined') {
      return <div ref={ref} className="w-full h-full bg-gray-100" />
    }

    return (
      <div ref={ref} className="w-full h-full">
        <MapContainerDynamic
          center={center}
          zoom={zoom}
          style={{ height: '100%', width: '100%' }}
          onClick={(e: any) => onMapClick?.([e.latlng.lat, e.latlng.lng])}
        >
          <TileLayerDynamic
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap contributors'
          />

          {markers.map((marker) => (
            <MarkerDynamic
              key={marker.id}
              position={[marker.lat, marker.lng]}
              onClick={() => onMarkerClick?.(marker)}
            >
              {marker.popup && <PopupDynamic>{marker.popup}</PopupDynamic>}
            </MarkerDynamic>
          ))}

          {children}
        </MapContainerDynamic>
      </div>
    )
  }
)

GeoMap.displayName = 'GeoMap'
