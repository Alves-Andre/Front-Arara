// src/features/areas/components/AreaMap.tsx

'use client'

import React from 'react'
import dynamic from 'next/dynamic'
import type { Area, Coordinates } from '../types'

// Importar dinamicamente para evitar problemas no SSR
const GeoMap = dynamic(
  () => import('@/shared/components/Map/GeoMap').then((mod) => mod.GeoMap),
  { ssr: false, loading: () => <div className="w-full h-96 bg-gray-100 rounded-lg animate-pulse" /> }
)

interface AreaMapProps {
  areas: Area[]
  selectedId?: string
  onSelect?: (id: string) => void
  center?: Coordinates
}

export const AreaMap = React.forwardRef<HTMLDivElement, AreaMapProps>(
  ({ areas, selectedId, onSelect, center = { lat: -15.8267, lng: -48.0 } }, ref) => {
    const markers = areas.map((area) => ({
      id: area.id,
      lat: area.coordinates.lat,
      lng: area.coordinates.lng,
      popup: area.name,
      isSelected: area.id === selectedId,
    }))

    return (
      <div ref={ref} className="w-full h-96 rounded-lg overflow-hidden border">
        <GeoMap
          center={[center.lat, center.lng]}
          zoom={10}
          markers={markers as any}
          onMarkerClick={(marker) => onSelect?.(marker.id)}
        />
      </div>
    )
  }
)

AreaMap.displayName = 'AreaMap'
