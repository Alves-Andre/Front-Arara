'use client'

import dynamic from 'next/dynamic'
import type { ReactNode } from 'react'
import { Layers, MapPinned, Maximize2, Ruler } from 'lucide-react'
import { cn } from '@/shared/utils/cn'
import { Skeleton } from '@/shared/components/ui'
import type { EvidencePhoto, MonitoringPointEvidence, RecoveryAnalysisArea, SatelliteImageSet, TemporalPeriod } from '../types'
import { EvidenceComparisonViewer } from './EvidenceComparisonViewer'
import { TemporalComparisonViewer } from './TemporalComparisonViewer'

const AnalysisLeafletMap = dynamic(() => import('./AnalysisLeafletMap').then((module) => module.AnalysisLeafletMap), {
  ssr: false,
  loading: () => <Skeleton className="absolute inset-0 rounded-none" />,
})

interface AnalysisMapProps {
  area: RecoveryAnalysisArea
  points: MonitoringPointEvidence[]
  selectedPointId: string | null
  inspectionPhoto: EvidencePhoto | null
  comparison: (SatelliteImageSet & { selectedPeriod: TemporalPeriod | null }) | null
  periods: TemporalPeriod[]
  selectedPeriodId: string | null
  isInspectionFullscreen: boolean
  onSelectPoint: (pointId: string) => void
  onSelectComparisonPeriod: (periodId: string) => void
  onOpenInspection: () => void
  onToggleInspectionFullscreen: () => void
  onCloseInspection: () => void
  onCloseComparison: () => void
}

export const AnalysisMap = ({
  area,
  points,
  selectedPointId,
  inspectionPhoto,
  comparison,
  periods,
  selectedPeriodId,
  isInspectionFullscreen,
  onSelectPoint,
  onSelectComparisonPeriod,
  onOpenInspection,
  onToggleInspectionFullscreen,
  onCloseInspection,
  onCloseComparison,
}: AnalysisMapProps) => {
  const isInspectionOpen = Boolean(inspectionPhoto)

  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-slate-950 shadow-sm">
      <div className="flex flex-col gap-3 border-b border-white/10 bg-slate-950 px-4 py-3 text-white sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-cyan-200">Mapa operacional</p>
          <h2 className="mt-1 text-lg font-semibold">Area monitorada e pontos de coleta</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2 text-xs text-slate-200">
          <MapTool icon={<Layers className="size-4" />} label="Camadas" />
          <MapTool icon={<Ruler className="size-4" />} label="Escala" />
          <MapTool icon={<MapPinned className="size-4" />} label={`${points.length} pontos`} />
          <MapTool
            icon={<Maximize2 className="size-4" />}
            label="Vistoria"
            isActive={isInspectionOpen}
            onClick={onOpenInspection}
          />
        </div>
      </div>

      <div className="relative h-[min(560px,calc(100vh-260px))] min-h-[420px] w-full">
        {comparison ? (
          <TemporalComparisonViewer
            satellite={comparison}
            periods={periods}
            selectedPeriodId={selectedPeriodId}
            onSelectPeriod={onSelectComparisonPeriod}
            onBack={onCloseComparison}
          />
        ) : inspectionPhoto ? (
          <EvidenceComparisonViewer
            currentPhoto={inspectionPhoto}
            periods={periods}
            selectedPeriodId={selectedPeriodId}
            isFullscreen={isInspectionFullscreen}
            onSelectPeriod={onSelectComparisonPeriod}
            onToggleFullscreen={onToggleInspectionFullscreen}
            onBack={onCloseInspection}
          />
        ) : (
          <>
            <AnalysisLeafletMap area={area} points={points} selectedPointId={selectedPointId} onSelectPoint={onSelectPoint} />
            <div className="pointer-events-none absolute bottom-4 left-4 z-[400] rounded-md border border-white/60 bg-white/90 p-3 text-sm shadow-lg backdrop-blur">
              <p className="mb-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Legenda</p>
              <div className="space-y-2">
                <LegendItem colorClassName="border-emerald-700 bg-emerald-500/30" label="Area em recuperacao" />
                <LegendItem colorClassName="border-sky-700 bg-sky-500/10" label="Limite da propriedade" />
                <LegendItem colorClassName="border-amber-600 bg-amber-400" label="Ponto selecionado" />
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}

interface MapToolProps {
  icon: ReactNode
  label: string
  isActive?: boolean
  onClick?: () => void
}

const MapTool = ({ icon, label, isActive = false, onClick }: MapToolProps) => {
  if (onClick) {
    return (
      <button
        type="button"
        className={cn(
          'inline-flex items-center gap-1.5 rounded-md border px-2.5 py-1 transition',
          isActive
            ? 'border-cyan-200 bg-cyan-100 text-slate-950'
            : 'border-white/10 bg-white/10 text-slate-200 hover:border-white/30 hover:bg-white/20'
        )}
        onClick={onClick}
      >
        {icon}
        {label}
      </button>
    )
  }

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
