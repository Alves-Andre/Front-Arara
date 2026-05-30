'use client'

import { useEffect, useRef } from 'react'
import type { LatLngBoundsExpression, Map as LeafletMap, PathOptions } from 'leaflet'
import type { RecoveryArea } from '../../types'

interface RecoveryAreaLeafletMapProps {
  area: RecoveryArea
}

const recoveryPolygonStyle: PathOptions = {
  color: '#047857',
  fillColor: '#10b981',
  fillOpacity: 0.34,
  weight: 4,
}

const propertyBoundaryStyle: PathOptions = {
  color: '#0369a1',
  fillColor: '#38bdf8',
  fillOpacity: 0.08,
  dashArray: '9 7',
  weight: 3,
}

export const RecoveryAreaLeafletMap = ({ area }: RecoveryAreaLeafletMapProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<LeafletMap | null>(null)

  useEffect(() => {
    let isCancelled = false

    const renderMap = async () => {
      if (!containerRef.current) {
        return
      }

      const L = await import('leaflet')

      if (isCancelled || !containerRef.current) {
        return
      }

      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }

      const recoveryPolygon = L.polygon(area.polygon, recoveryPolygonStyle).bindPopup(
        `<strong>${area.name}</strong><br />${area.recoveryAreaHectares} ha em recuperacao`
      )
      const propertyBoundary = L.polygon(area.property.boundary, propertyBoundaryStyle).bindPopup(
        `<strong>${area.property.name}</strong><br />Area total: ${area.totalAreaHectares} ha`
      )
      const map = L.map(containerRef.current, {
        center: area.centroid,
        zoom: 14,
        zoomControl: false,
        scrollWheelZoom: true,
        layers: [
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }),
          recoveryPolygon,
          propertyBoundary,
        ],
      })

      L.control
        .zoom({
          position: 'bottomright',
        })
        .addTo(map)

      L.control
        .scale({
          imperial: false,
          position: 'bottomright',
        })
        .addTo(map)

      L.control
        .layers(
          {},
          {
            'Area em recuperacao': recoveryPolygon,
            'Limite da propriedade': propertyBoundary,
          },
          { position: 'topright' }
        )
        .addTo(map)

      const bounds = [...area.property.boundary, ...area.polygon] as LatLngBoundsExpression
      map.fitBounds(bounds, { padding: [42, 42], maxZoom: 15 })
      mapRef.current = map
    }

    renderMap()

    return () => {
      isCancelled = true

      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [area])

  return <div ref={containerRef} className="absolute inset-0 bg-muted" />
}
