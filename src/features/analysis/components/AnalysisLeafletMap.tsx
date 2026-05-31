'use client'

import { useEffect, useRef } from 'react'
import type { LatLngBoundsExpression, Map as LeafletMap, PathOptions } from 'leaflet'
import type { MonitoringPointEvidence, RecoveryAnalysisArea } from '../types'

interface AnalysisLeafletMapProps {
  area: RecoveryAnalysisArea
  points: MonitoringPointEvidence[]
  selectedPointId: string | null
  onSelectPoint: (pointId: string) => void
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

export const AnalysisLeafletMap = ({ area, points, selectedPointId, onSelectPoint }: AnalysisLeafletMapProps) => {
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

      const propertyBoundary = L.polygon(area.propertyBoundary, propertyBoundaryStyle).bindPopup(
        `<strong>${area.propertyName}</strong><br />Area total: ${area.totalAreaHectares} ha`
      )
      const recoveryPolygon = L.polygon(area.recoveryPolygon, recoveryPolygonStyle).bindPopup(
        `<strong>${area.name}</strong><br />${area.recoveryAreaHectares} ha em recuperacao`
      )
      const pointMarkers = points.map((point) => {
        const isSelected = point.id === selectedPointId
        const marker = L.marker([point.latitude, point.longitude], {
          icon: L.divIcon({
            className: '',
            html: `<span style="
              align-items:center;
              background:${isSelected ? '#FFD23F' : '#0066CC'};
              border:3px solid white;
              border-radius:9999px;
              box-shadow:0 10px 24px rgba(15,23,42,.35);
              color:${isSelected ? '#111827' : 'white'};
              display:flex;
              font-size:12px;
              font-weight:700;
              height:${isSelected ? '38px' : '32px'};
              justify-content:center;
              width:${isSelected ? '38px' : '32px'};
            ">${point.code}</span>`,
            iconSize: [isSelected ? 38 : 32, isSelected ? 38 : 32],
            iconAnchor: [isSelected ? 19 : 16, isSelected ? 19 : 16],
          }),
        })

        marker.on('click', () => onSelectPoint(point.id))
        marker.bindPopup(`<strong>${point.code}</strong><br />${point.observations}`)
        return marker
      })

      const map = L.map(containerRef.current, {
        center: area.centroid,
        zoom: 14,
        zoomControl: false,
        scrollWheelZoom: true,
        layers: [
          L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
          }),
          propertyBoundary,
          recoveryPolygon,
          ...pointMarkers,
        ],
      })

      L.control.zoom({ position: 'bottomright' }).addTo(map)
      L.control.scale({ imperial: false, position: 'bottomright' }).addTo(map)
      L.control
        .layers(
          {},
          {
            'Limite da propriedade': propertyBoundary,
            'Area em recuperacao': recoveryPolygon,
          },
          { position: 'topright' }
        )
        .addTo(map)

      const bounds = [...area.propertyBoundary, ...area.recoveryPolygon] as LatLngBoundsExpression
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
  }, [area, onSelectPoint, points, selectedPointId])

  return <div ref={containerRef} className="absolute inset-0 bg-muted" />
}
