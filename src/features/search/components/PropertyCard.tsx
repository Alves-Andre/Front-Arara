import Link from 'next/link'
import type { ReactNode } from 'react'
import { ArrowRight, MapPinned, Ruler } from 'lucide-react'
import { Button } from '@/shared/components'
import { formatNumber } from '@/shared/utils/formatters'
import type { Property, PropertyStatus } from '../types'

interface PropertyCardProps {
  property: Property
}

const statusConfig: Record<PropertyStatus, { label: string; className: string; dotClassName: string }> = {
  monitoring: {
    label: 'Em monitoramento',
    className: 'bg-emerald-100 text-emerald-800 ring-emerald-200',
    dotClassName: 'bg-emerald-600',
  },
  awaiting_evidence: {
    label: 'Aguardando evidencias',
    className: 'bg-amber-100 text-amber-700 ring-amber-200',
    dotClassName: 'bg-amber-500',
  },
  analysis: {
    label: 'Em analise',
    className: 'bg-sky-100 text-sky-800 ring-sky-200',
    dotClassName: 'bg-sky-600',
  },
  rejected: {
    label: 'Rejeitado',
    className: 'bg-red-100 text-red-700 ring-red-200',
    dotClassName: 'bg-red-600',
  },
}

export const PropertyCard = ({ property }: PropertyCardProps) => {
  const status = statusConfig[property.status]
  const hasRecoveryArea = property.recoveryArea > 0
  const protectedArea = property.protectionAreas.reduce((total, area) => total + area.area, 0)
  const hasProtectedArea = protectedArea > 0

  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="flex flex-col gap-4">
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h3 className="text-xl font-semibold text-slate-950">{property.name}</h3>
            <span className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium ring-1 ${status.className}`}>
              <span className={`size-2 rounded-full ${status.dotClassName}`} />
              {status.label}
            </span>
          </div>
          <p className="mt-2 break-all text-sm font-medium text-slate-500">{property.car}</p>
        </div>

        <div className="grid gap-3 border-y border-slate-200 py-4 sm:grid-cols-4">
          <PropertyMetric icon={<MapPinned className="size-4" />} label="Municipio" value={property.city} />
          <PropertyMetric icon={<Ruler className="size-4" />} label="Area total" value={`${formatNumber(property.totalArea, 1)} ha`} />
          <PropertyMetric
            icon={<Ruler className="size-4" />}
            label="Protecao"
            value={hasProtectedArea ? `${formatNumber(protectedArea, 1)} ha` : 'Nao informada'}
            tone={hasProtectedArea ? 'sky' : 'neutral'}
          />
          <PropertyMetric
            icon={<Ruler className="size-4" />}
            label="Recuperacao"
            value={hasRecoveryArea ? `${formatNumber(property.recoveryArea, 1)} ha` : 'Nao vinculada'}
            tone={hasRecoveryArea ? 'emerald' : 'neutral'}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">
            Proprietario: <span className="font-medium text-slate-900">{property.owner}</span>
          </p>
          <Button asChild className="gap-2">
            <Link href={`/areas/${encodeURIComponent(property.car)}`}>
              Acessar Area
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  )
}

interface PropertyMetricProps {
  icon: ReactNode
  label: string
  value: string
  tone?: 'neutral' | 'emerald' | 'sky'
}

const metricToneClassName: Record<NonNullable<PropertyMetricProps['tone']>, string> = {
  neutral: 'font-semibold text-slate-950',
  emerald: 'text-lg font-semibold text-emerald-700',
  sky: 'text-lg font-semibold text-sky-700',
}

const PropertyMetric = ({ icon, label, value, tone = 'neutral' }: PropertyMetricProps) => {
  return (
    <div>
      <div className="mb-2 flex items-center gap-2 text-slate-500">
        {icon}
        <span className="text-xs font-medium uppercase tracking-[0.14em]">{label}</span>
      </div>
      <p className={metricToneClassName[tone]}>{value}</p>
    </div>
  )
}
