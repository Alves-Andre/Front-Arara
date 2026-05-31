'use client'

import { useEffect, useRef } from 'react'
import type { Map as LeafletMap, PathOptions } from 'leaflet'
import type { LatLngTuple, Property } from '../types'

interface SearchMapProps {
  properties: Property[]
}

const propertyStyle: PathOptions = {
  color: '#0369a1',
  fillColor: '#38bdf8',
  fillOpacity: 0.08,
  dashArray: '9 7',
  weight: 3,
}

const recoveryStyle: PathOptions = {
  color: '#047857',
  fillColor: '#10b981',
  fillOpacity: 0.34,
  weight: 4,
}

const protectionStyle: PathOptions = {
  color: '#7c3aed',
  fillColor: '#a78bfa',
  fillOpacity: 0.26,
  weight: 3,
}

export const SearchMap = ({ properties }: SearchMapProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<LeafletMap | null>(null)

  useEffect(() => {
    let isCancelled = false

    const renderMap = async () => {
      if (!containerRef.current || properties.length === 0) {
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

      const map = L.map(containerRef.current, {
        zoomControl: false,
        scrollWheelZoom: true,
      })

      L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
        maxZoom: 19,
        attribution: 'Tiles &copy; Esri',
      }).addTo(map)

      const allBounds: LatLngTuple[] = []

      properties.forEach((property) => {
        L.polygon(property.polygon, propertyStyle)
          .bindPopup(`<strong>${property.name}</strong><br />${property.totalArea} ha`)
          .addTo(map)

        if (property.recoveryPolygon.length > 0) {
          L.polygon(property.recoveryPolygon, recoveryStyle)
            .bindPopup(`<strong>Area em recuperacao</strong><br />${property.recoveryArea} ha`)
            .addTo(map)
        }

        property.protectionAreas.forEach((protectionArea) => {
          if (protectionArea.polygon.length === 0) {
            return
          }

          L.polygon(protectionArea.polygon, protectionStyle)
            .bindPopup(`<strong>${protectionArea.label}</strong><br />${protectionArea.area} ha`)
            .addTo(map)
        })

        allBounds.push(
          ...property.polygon,
          ...property.recoveryPolygon,
          ...property.protectionAreas.flatMap((protectionArea) => protectionArea.polygon)
        )
      })

      L.control.zoom({ position: 'bottomright' }).addTo(map)
      L.control.scale({ imperial: false, position: 'bottomright' }).addTo(map)

      map.fitBounds(allBounds, { padding: [40, 40], maxZoom: 15 })
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
  }, [properties])

  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-slate-950 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-white/10 bg-slate-950 px-4 py-3 text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">Mapa de localizacao</p>
          <h2 className="mt-1 text-lg font-semibold">Territorio encontrado para analise</h2>
        </div>
        <div className="flex items-center gap-4 text-sm text-slate-200">
          {properties.some((property) => property.recoveryPolygon.length > 0) && (
            <LegendItem colorClassName="border-emerald-700 bg-emerald-500/30" label="Recuperacao" />
          )}
          {properties.some((property) => property.protectionAreas.some((area) => area.polygon.length > 0)) && (
            <LegendItem colorClassName="border-violet-700 bg-violet-500/30" label="Protecao" />
          )}
          <LegendItem colorClassName="border-sky-700 bg-sky-500/10" label="Propriedade" />
        </div>
      </div>

      <div className="relative h-[420px] w-full lg:h-[520px]">
        <div ref={containerRef} className="absolute inset-0 bg-muted" />
      </div>
    </section>
  )
}

interface LegendItemProps {
  colorClassName: string
  label: string
}

const LegendItem = ({ colorClassName, label }: LegendItemProps) => {
  return (
    <div className="flex items-center gap-2">
      <span className={`size-3 rounded-sm border-2 ${colorClassName}`} />
      <span>{label}</span>
    </div>
  )
}
