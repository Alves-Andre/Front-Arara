'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { AppLogo, Button } from '@/shared/components'
import { formatNumber } from '@/shared/utils/formatters'
import type { RecoveryArea } from '../../types'
import { getRecoveryAreaStatusLabel } from '../../utils/recoveryAreaHelpers'
import { RecoveryAreaBreadcrumb } from './RecoveryAreaBreadcrumb'

interface RecoveryAreaHeaderProps {
  area: RecoveryArea
}

export const RecoveryAreaHeader = ({ area }: RecoveryAreaHeaderProps) => {
  const router = useRouter()
  const recoveryPercent = (area.recoveryAreaHectares / area.totalAreaHectares) * 100

  return (
    <header className="border-b border-slate-200 bg-white">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-5 px-4 py-5 sm:px-6 xl:px-8">
        <div className="flex items-center justify-between">
          <RecoveryAreaBreadcrumb />
          <Button variant="outline" size="sm" onClick={() => router.back()} className="gap-2 text-slate-600">
            <ArrowLeft className="size-4" />
            Voltar
          </Button>
        </div>
        
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex min-w-0 flex-col gap-4 sm:flex-row sm:items-center">
            <AppLogo markClassName="size-14" wordmarkClassName="h-12" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-semibold tracking-normal text-slate-950 sm:text-3xl">
                  {area.property.name}
                </h1>
                <StatusIndicator label={getRecoveryAreaStatusLabel(area.monitoringStatus)} />
              </div>
              <p className="mt-2 max-w-3xl text-sm text-slate-600">
                Area importada para acompanhamento remoto, analise territorial e monitoramento de recuperacao ambiental.
              </p>
            </div>
          </div>

          <div className="rounded-lg bg-emerald-50 px-5 py-4 text-emerald-950 ring-1 ring-emerald-200 lg:min-w-64">
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-emerald-700">Area em recuperacao</p>
            <p className="mt-1 text-4xl font-semibold">{formatNumber(area.recoveryAreaHectares, 1)} ha</p>
            <p className="mt-1 text-sm text-emerald-800">{formatNumber(recoveryPercent, 1)}% da propriedade</p>
          </div>
        </div>

        <div className="grid gap-x-8 gap-y-3 border-t border-slate-200 pt-4 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <HeaderMeta label="CAR" value={area.property.registrationCode} />
          <HeaderMeta label="Municipio" value={area.property.municipality} />
          <HeaderMeta label="Proprietario" value={area.property.owner} />
          <HeaderMeta label="Area total" value={`${formatNumber(area.totalAreaHectares, 1)} ha`} />
        </div>
      </div>
    </header>
  )
}

interface HeaderMetaProps {
  label: string
  value: string
}

const HeaderMeta = ({ label, value }: HeaderMetaProps) => {
  return (
    <div className="min-w-0">
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-1 truncate font-medium text-slate-900">{value}</p>
    </div>
  )
}

interface StatusIndicatorProps {
  label: string
}

const StatusIndicator = ({ label }: StatusIndicatorProps) => {
  return (
    <span className="inline-flex items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 ring-1 ring-emerald-200">
      <span className="size-2 rounded-full bg-emerald-600" />
      {label}
    </span>
  )
}
