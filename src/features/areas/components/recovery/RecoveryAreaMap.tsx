'use client'

import dynamic from 'next/dynamic'
import type { ReactNode } from 'react'
import { Layers, Maximize2, Ruler } from 'lucide-react'
import { Skeleton } from '@/shared/components/ui'
import { formatNumber } from '@/shared/utils/formatters'
import type { RecoveryArea } from '../../types'

const RecoveryAreaLeafletMap = dynamic(
  () => import('./RecoveryAreaLeafletMap').then((module) => module.RecoveryAreaLeafletMap),
  {
    ssr: false,
    loading: () => <Skeleton className="min-h-[60vh] w-full rounded-none" />,
  }
)

interface RecoveryAreaMapProps {
  area: RecoveryArea
}

export const RecoveryAreaMap = ({ area }: RecoveryAreaMapProps) => {
  const recoveryPercent = (area.recoveryAreaHectares / area.totalAreaHectares) * 100

  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-slate-950 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-white/10 bg-slate-950 px-4 py-3 text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">Analise territorial</p>
          <h2 className="mt-1 text-lg font-semibold">Mapa operacional da area monitorada</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-200">
          <MapTool icon={<Layers className="size-4" />} label="Poligonos" />
          <MapTool icon={<Ruler className="size-4" />} label="Escala" />
          <MapTool icon={<Maximize2 className="size-4" />} label="60vh" />
        </div>
      </div>

      <div className="relative min-h-[60vh] w-full lg:min-h-[68vh]">
        <RecoveryAreaLeafletMap area={area} />

        <div className="pointer-events-none absolute left-4 top-4 z-[400] max-w-[calc(100%-2rem)] rounded-md border border-white/60 bg-white/90 p-4 shadow-lg backdrop-blur">
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Area em recuperacao</p>
          <p className="mt-1 text-3xl font-semibold text-emerald-700">
            {formatNumber(area.recoveryAreaHectares, 1)} ha
          </p>
          <p className="mt-1 text-sm text-slate-600">
            {formatNumber(recoveryPercent, 1)}% da propriedade
          </p>
        </div>

        <div className="absolute bottom-4 left-4 z-[400] rounded-md border border-white/60 bg-white/90 p-3 text-sm shadow-lg backdrop-blur">
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Legenda</p>
          <div className="space-y-2">
            <LegendItem colorClassName="border-emerald-700 bg-emerald-500/30" label="Area em recuperacao" />
            <LegendItem colorClassName="border-sky-700 bg-sky-500/10" label="Limite da propriedade" />
          </div>
        </div>
      </div>
    </section>
  )
}

interface MapToolProps {
  icon: ReactNode
  label: string
}

const MapTool = ({ icon, label }: MapToolProps) => {
  return (
    <span className="inline-flex items-center gap-1.5 rounded-md border border-white/10 bg-white/10 px-2.5 py-1">
      {icon}
      {label}
    </span>
  )
}

interface LegendItemProps {
  colorClassName: string
  label: string
}

const LegendItem = ({ colorClassName, label }: LegendItemProps) => {
  return (
    <div className="flex items-center gap-2 text-slate-700">
      <span className={`size-3 rounded-sm border-2 ${colorClassName}`} />
      <span>{label}</span>
    </div>
  )
}
