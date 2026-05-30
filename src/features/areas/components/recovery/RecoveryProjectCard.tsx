import { ArrowRight, ClipboardList } from 'lucide-react'
import { Button } from '@/shared/components'
import { formatTimeAgo } from '@/shared/utils/formatters'
import type { RecoveryArea } from '../../types'
import { getRecoveryAreaStatusLabel } from '../../utils/recoveryAreaHelpers'

interface RecoveryProjectCardProps {
  area: RecoveryArea
}

export const RecoveryProjectCard = ({ area }: RecoveryProjectCardProps) => {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex gap-4">
          <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-sky-50 text-sky-700">
            <ClipboardList className="size-5" />
          </div>

          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
              Proxima etapa
            </p>
            <h2 className="mt-1 text-xl font-semibold text-slate-950">Projeto de Recuperacao</h2>

            <div className="mt-3 flex flex-col gap-2 text-sm text-slate-600 sm:flex-row sm:gap-6">
              <p>
                <span className="font-medium text-slate-900">Status:</span>{' '}
                {getRecoveryAreaStatusLabel(area.monitoringStatus)}
              </p>
              <p>
                <span className="font-medium text-slate-900">Ultima atualizacao:</span>{' '}
                {formatTimeAgo(area.importedAt)}
              </p>
            </div>
          </div>
        </div>

        <Button className="w-full gap-2 sm:w-fit">
          Abrir Projeto de Recuperacao
          <ArrowRight className="size-4" />
        </Button>
      </div>
    </section>
  )
}
