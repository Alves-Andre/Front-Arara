import { CarFront, CheckCircle2, ClipboardCheck, Compass, FileQuestion, MapPin } from 'lucide-react'
import { Button } from '@/shared/components'
import { cn } from '@/shared/utils/cn'
import type { AnalysisDecision, EvidenceDirection, MonitoringPointEvidence } from '../types'

interface DecisionPanelProps {
  selectedDecision: AnalysisDecision | null
  points: MonitoringPointEvidence[]
  evidenceRequestPointId: string | null
  evidenceRequestDirections: EvidenceDirection[]
  canFinalize: boolean
  onSelectDecision: (decision: AnalysisDecision) => void
  onSelectEvidenceRequestPoint: (pointId: string) => void
  onToggleEvidenceRequestDirection: (direction: EvidenceDirection) => void
  onFinalize: () => void
}

const decisions = [
  {
    id: 'approve_monitoring',
    label: 'Aprovar Monitoramento',
    icon: ClipboardCheck,
    variant: 'primary',
  },
  {
    id: 'request_evidence',
    label: 'Solicitar Nova Evidencia',
    icon: FileQuestion,
    variant: 'secondary',
  },
  {
    id: 'recommend_visit',
    label: 'Recomendar Visita Presencial',
    icon: CarFront,
    variant: 'outline',
  },
] as const

const directionOptions: Array<{ id: EvidenceDirection; label: string }> = [
  { id: 'north', label: 'Norte' },
  { id: 'south', label: 'Sul' },
  { id: 'east', label: 'Leste' },
  { id: 'west', label: 'Oeste' },
]

export const DecisionPanel = ({
  selectedDecision,
  points,
  evidenceRequestPointId,
  evidenceRequestDirections,
  canFinalize,
  onSelectDecision,
  onSelectEvidenceRequestPoint,
  onToggleEvidenceRequestDirection,
  onFinalize,
}: DecisionPanelProps) => {
  return (
    <section className="sticky bottom-0 z-[1000] border-t border-slate-200 bg-white/95 px-4 py-3 shadow-[0_-12px_28px_rgba(15,23,42,0.08)] backdrop-blur sm:px-6 xl:px-8">
      <div className="mx-auto grid max-w-[1800px] gap-3">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Decisao tecnica</p>
            <p className="mt-1 text-sm text-slate-700">Registre o encaminhamento da vistoria virtual.</p>
          </div>
          <div className="grid gap-2 md:grid-cols-3 xl:min-w-[680px]">
            {decisions.map((decision) => {
              const Icon = decision.icon
              const isSelected = selectedDecision === decision.id

              return (
                <Button
                  key={decision.id}
                  type="button"
                  variant={decision.variant}
                  className={cn(
                    'h-auto min-h-10 gap-2 px-3 py-2 text-sm leading-snug',
                    isSelected && 'ring-2 ring-sky-500 ring-offset-2'
                  )}
                  onClick={() => onSelectDecision(decision.id)}
                >
                  <Icon className="size-4" />
                  {decision.label}
                </Button>
              )
            })}
          </div>
        </div>

        {selectedDecision === 'request_evidence' && (
          <div className="grid gap-3 rounded-md border border-amber-200 bg-amber-50 p-3 lg:grid-cols-[minmax(240px,0.65fr)_1fr]">
            <label className="block">
              <span className="mb-1 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-600">
                <MapPin className="size-4 text-amber-700" />
                Ponto para recoleta
              </span>
              <select
                className="h-10 w-full rounded-md border border-amber-200 bg-white px-3 text-sm font-medium text-slate-900 outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-100"
                value={evidenceRequestPointId ?? ''}
                onChange={(event) => onSelectEvidenceRequestPoint(event.target.value)}
              >
                {points.map((point) => (
                  <option key={point.id} value={point.id}>
                    {point.code} - {point.latitude.toFixed(5)}, {point.longitude.toFixed(5)}
                  </option>
                ))}
              </select>
            </label>

            <div>
              <p className="mb-2 flex items-center gap-2 text-xs font-medium uppercase tracking-[0.14em] text-slate-600">
                <Compass className="size-4 text-amber-700" />
                Direcoes solicitadas
              </p>
              <div className="grid gap-2 sm:grid-cols-4">
                {directionOptions.map((direction) => {
                  const isChecked = evidenceRequestDirections.includes(direction.id)

                  return (
                    <label
                      key={direction.id}
                      className={cn(
                        'flex cursor-pointer items-center justify-center gap-2 rounded-md border px-3 py-2 text-sm font-medium transition',
                        isChecked
                          ? 'border-amber-500 bg-white text-slate-950 shadow-sm'
                          : 'border-amber-200 bg-amber-100/60 text-slate-700 hover:bg-white'
                      )}
                    >
                      <input
                        type="checkbox"
                        className="size-4 accent-amber-500"
                        checked={isChecked}
                        onChange={() => onToggleEvidenceRequestDirection(direction.id)}
                      />
                      {direction.label}
                    </label>
                  )
                })}
              </div>
            </div>
          </div>
        )}

        <div className="flex flex-col gap-2 border-t border-slate-200 pt-3 sm:flex-row sm:items-center sm:justify-end">
          <p className="text-sm text-slate-600 sm:mr-auto">
            {selectedDecision
              ? 'Ao concluir, a etapa sera encerrada e preparada para envio ao backend.'
              : 'Selecione uma decisao tecnica para concluir a etapa.'}
          </p>
          <Button type="button" className="gap-2" disabled={!canFinalize} onClick={onFinalize}>
            <CheckCircle2 className="size-4" />
            Concluir Vistoria
          </Button>
        </div>
      </div>
    </section>
  )
}
