import type { ReactNode } from 'react'
import { CalendarDays, Database, MapPinned, Ruler, ShieldCheck } from 'lucide-react'
import { formatDate, formatNumber } from '@/shared/utils/formatters'
import type { RecoveryArea } from '../../types'
import { getRecoveryAreaStatusLabel } from '../../utils/recoveryAreaHelpers'

interface RecoveryAreaInfoCardProps {
  area: RecoveryArea
}

export const RecoveryAreaInfoCard = ({ area }: RecoveryAreaInfoCardProps) => {
  const recoveryPercent = (area.recoveryAreaHectares / area.totalAreaHectares) * 100

  return (
    <section className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Resumo ambiental</p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950">Indicadores de recuperacao</h2>
          </div>
          <div className="text-left sm:text-right">
            <p className="text-4xl font-semibold text-emerald-700">{formatNumber(area.recoveryAreaHectares, 1)} ha</p>
            <p className="text-sm text-slate-600">{formatNumber(recoveryPercent, 1)}% da propriedade</p>
          </div>
        </div>

        <div className="mt-5 grid gap-4 border-t border-slate-200 pt-5 sm:grid-cols-3">
          <TerritoryMetric icon={<Ruler className="size-4" />} label="Area total" value={`${formatNumber(area.totalAreaHectares, 1)} ha`} />
          <TerritoryMetric icon={<MapPinned className="size-4" />} label="Municipio" value={area.property.municipality} />
          <TerritoryMetric icon={<ShieldCheck className="size-4" />} label="Monitoramento" value={getRecoveryAreaStatusLabel(area.monitoringStatus)} />
        </div>
      </div>

      <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Dados de origem</p>
        <div className="mt-4 space-y-4">
          <PropertyLine icon={<Database className="size-4" />} label="Codigo CAR" value={area.property.registrationCode} />
          <PropertyLine icon={<CalendarDays className="size-4" />} label="Importado em" value={formatDate(area.importedAt)} />
          <PropertyLine icon={<CalendarDays className="size-4" />} label="Criado em" value={formatDate(area.createdAt)} />
        </div>
      </div>
    </section>
  )
}

interface TerritoryMetricProps {
  icon: ReactNode
  label: string
  value: string
}

const TerritoryMetric = ({ icon, label, value }: TerritoryMetricProps) => {
  return (
    <div>
      <div className="mb-2 flex size-8 items-center justify-center rounded-md bg-sky-50 text-sky-700">{icon}</div>
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-950">{value}</p>
    </div>
  )
}

interface PropertyLineProps {
  icon: ReactNode
  label: string
  value: string
}

const PropertyLine = ({ icon, label, value }: PropertyLineProps) => {
  return (
    <div className="flex gap-3">
      <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-md bg-slate-100 text-slate-600">
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">{label}</p>
        <p className="mt-1 break-words text-sm font-medium text-slate-900">{value}</p>
      </div>
    </div>
  )
}
