import type { ReactNode } from 'react'
import { Activity, CalendarDays, GitCompareArrows, Layers3 } from 'lucide-react'
import { Button } from '@/shared/components'
import type { SatelliteImageSet, TemporalPeriod } from '../types'

interface SatellitePanelProps {
  satellite: (SatelliteImageSet & { selectedPeriod: TemporalPeriod | null }) | null
  onOpenComparison: () => void
}

export const SatellitePanel = ({ satellite, onOpenComparison }: SatellitePanelProps) => {
  if (!satellite) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-6 text-sm text-slate-600 shadow-sm">
        Mapa de vegetacao indisponivel.
      </section>
    )
  }

  const trendClassName = satellite.ndviTrend >= 0 ? 'text-emerald-700' : 'text-red-700'
  const trendPrefix = satellite.ndviTrend >= 0 ? '+' : ''

  return (
    <section className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
      <div className="flex flex-col gap-3 border-b border-slate-200 px-4 py-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Visao satelital</p>
          <h2 className="mt-1 text-lg font-semibold text-slate-950">Mapa de vigor vegetativo</h2>
        </div>
        <Button type="button" variant="outline" size="sm" className="gap-2" onClick={onOpenComparison}>
          <GitCompareArrows className="size-4" />
          Comparar antes/depois
        </Button>
      </div>

      <div className="relative min-h-[320px] overflow-hidden bg-emerald-950">
        <VegetationMap />
        <div className="absolute left-3 top-3 rounded-md border border-white/30 bg-slate-950/75 px-3 py-2 text-white backdrop-blur">
          <p className="text-xs font-medium uppercase tracking-[0.14em] text-cyan-100">NDVI mock</p>
          <p className="mt-1 text-sm font-semibold">Area em recuperacao</p>
        </div>
        <div className="absolute bottom-3 left-3 right-3 rounded-md border border-white/30 bg-white/90 p-3 text-xs text-slate-700 shadow-sm backdrop-blur">
          <div className="mb-2 flex items-center justify-between font-medium text-slate-900">
            <span>Baixo vigor</span>
            <span>Alto vigor</span>
          </div>
          <div className="h-2 rounded-full bg-gradient-to-r from-amber-400 via-lime-400 to-emerald-700" />
        </div>
      </div>

      <div className="grid gap-3 border-t border-slate-200 p-4 sm:grid-cols-3">
        <SatelliteMetric icon={<CalendarDays className="size-4" />} label="Periodo" value={satellite.selectedPeriod?.label ?? 'Atual'} />
        <SatelliteMetric icon={<Activity className="size-4" />} label="Tendencia NDVI" value={`${trendPrefix}${satellite.ndviTrend}%`} valueClassName={trendClassName} />
        <SatelliteMetric icon={<Layers3 className="size-4" />} label="Fonte mock" value="Brasil MAIS" />
      </div>
    </section>
  )
}

const VegetationMap = () => {
  return (
    <div className="absolute inset-0">
      <div className="absolute inset-0 bg-[linear-gradient(135deg,#0f3f2b_0%,#1f7a3d_32%,#b7d94b_58%,#2f8f46_78%,#0c3425_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_24%,rgba(250,204,21,.78)_0_9%,transparent_20%),radial-gradient(circle_at_68%_38%,rgba(22,163,74,.88)_0_12%,transparent_26%),radial-gradient(circle_at_48%_72%,rgba(132,204,22,.82)_0_15%,transparent_29%),radial-gradient(circle_at_84%_74%,rgba(5,150,105,.72)_0_10%,transparent_24%)] mix-blend-screen" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.18)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,.18)_1px,transparent_1px)] bg-[size:42px_42px] opacity-70" />
      <div className="absolute left-[18%] top-[20%] h-[56%] w-[58%] rotate-[-8deg] rounded-[38%] border-4 border-white/80 bg-emerald-400/20 shadow-[0_0_0_999px_rgba(15,23,42,.08)]" />
      <div className="absolute left-[24%] top-[30%] h-[12%] w-[20%] rounded-full bg-amber-300/80 blur-sm" />
      <div className="absolute left-[46%] top-[42%] h-[18%] w-[28%] rounded-full bg-emerald-700/80 blur-sm" />
      <div className="absolute left-[34%] top-[60%] h-[12%] w-[24%] rounded-full bg-lime-300/80 blur-sm" />
    </div>
  )
}

interface SatelliteMetricProps {
  icon: ReactNode
  label: string
  value: string
  valueClassName?: string
}

const SatelliteMetric = ({ icon, label, value, valueClassName = 'text-slate-950' }: SatelliteMetricProps) => {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
      <div className="mb-2 flex size-8 items-center justify-center rounded-md bg-sky-50 text-sky-700">{icon}</div>
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className={`mt-1 text-sm font-semibold ${valueClassName}`}>{value}</p>
    </div>
  )
}
