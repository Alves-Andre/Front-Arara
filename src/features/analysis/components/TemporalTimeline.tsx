import { CalendarClock } from 'lucide-react'
import { formatDate } from '@/shared/utils/formatters'
import { cn } from '@/shared/utils/cn'
import type { TemporalPeriod } from '../types'

interface TemporalTimelineProps {
  periods: TemporalPeriod[]
  selectedPeriodId: string | null
  onSelectPeriod: (periodId: string) => void
}

export const TemporalTimeline = ({ periods, selectedPeriodId, onSelectPeriod }: TemporalTimelineProps) => {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Historico temporal</p>
          <h2 className="mt-1 text-lg font-semibold text-slate-950">Evolucao das evidencias</h2>
        </div>

        <div className="grid gap-2 sm:grid-cols-5 lg:min-w-[620px]">
          {periods.map((period) => {
            const isSelected = period.id === selectedPeriodId

            return (
              <button
                key={period.id}
                type="button"
                className={cn(
                  'rounded-md border px-3 py-2 text-left transition',
                  isSelected
                    ? 'border-sky-700 bg-sky-700 text-white shadow-sm'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-sky-300 hover:bg-sky-50'
                )}
                onClick={() => onSelectPeriod(period.id)}
              >
                <span className="flex items-center gap-2 text-sm font-semibold">
                  <CalendarClock className="size-4" />
                  {period.label}
                </span>
                <span className={cn('mt-1 block text-xs', isSelected ? 'text-sky-50' : 'text-slate-500')}>
                  {formatDate(period.capturedAt)}
                </span>
              </button>
            )
          })}
        </div>
      </div>
    </section>
  )
}
