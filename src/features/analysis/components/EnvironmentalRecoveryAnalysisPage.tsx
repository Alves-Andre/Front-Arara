'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, CheckCircle2, Eye, MapPinned, ShieldCheck, X } from 'lucide-react'
import { Button } from '@/shared/components'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shared/components/ui'
import { formatNumber } from '@/shared/utils/formatters'
import {
  useEvidence,
  useMonitoringPoints,
  useRecoveryAnalysis,
  useSatelliteImages,
  useTimeline,
} from '../hooks/useRecoveryAnalysis'
import type { AnalysisDecision, CompletedInspectionRecord, EvidenceDirection } from '../types'
import { AnalysisMap } from './AnalysisMap'
import { AnalysisSkeleton } from './AnalysisSkeleton'
import { DecisionPanel } from './DecisionPanel'
import { EvidenceGallery } from './EvidenceGallery'
import { PropertyObservation } from './PropertyObservation'
import { SatellitePanel } from './SatellitePanel'
import { TechnicalOpinion } from './TechnicalOpinion'
import { TemporalTimeline } from './TemporalTimeline'

export const EnvironmentalRecoveryAnalysisPage = () => {
  const router = useRouter()
  const { data, isLoading, isEmpty, error } = useRecoveryAnalysis()
  const points = useMonitoringPoints(data)
  const { timeline, currentPeriod } = useTimeline(data)
  const [selectedPointId, setSelectedPointId] = useState<string | null>(null)
  const [selectedPeriodId, setSelectedPeriodId] = useState<string | null>(null)
  const [inspectionDirection, setInspectionDirection] = useState<EvidenceDirection | null>(null)
  const [isInspectionFullscreen, setIsInspectionFullscreen] = useState(false)
  const [isComparisonOpen, setIsComparisonOpen] = useState(false)
  const [technicalOpinion, setTechnicalOpinion] = useState('')
  const [selectedDecision, setSelectedDecision] = useState<AnalysisDecision | null>(null)
  const [evidenceRequestPointId, setEvidenceRequestPointId] = useState<string | null>(null)
  const [evidenceRequestDirections, setEvidenceRequestDirections] = useState<EvidenceDirection[]>([])
  const [isFinalizedModalOpen, setIsFinalizedModalOpen] = useState(false)

  const selectedPoint = useEvidence(points, selectedPointId)
  const selectedPeriod = useMemo(
    () => timeline.find((period) => period.id === selectedPeriodId) ?? currentPeriod,
    [currentPeriod, selectedPeriodId, timeline]
  )
  const satellite = useSatelliteImages(selectedPoint, selectedPeriod)
  const inspectionPhoto = inspectionDirection && selectedPoint ? selectedPoint.photos[inspectionDirection] : null
  const evidenceRequestPoint = points.find((point) => point.id === evidenceRequestPointId) ?? null
  const canFinalize =
    selectedDecision === 'request_evidence'
      ? Boolean(evidenceRequestPointId && evidenceRequestDirections.length > 0)
      : Boolean(selectedDecision)
  const handleSelectPoint = useCallback((pointId: string) => {
    setSelectedPointId(pointId)
    setEvidenceRequestPointId(pointId)
    setInspectionDirection(null)
    setIsInspectionFullscreen(false)
    setIsComparisonOpen(false)
  }, [])
  const handleSelectPeriod = useCallback((periodId: string) => {
    setSelectedPeriodId(periodId)
    setInspectionDirection(null)
    setIsInspectionFullscreen(false)
    setIsComparisonOpen(false)
  }, [])
  const handleSelectComparisonPeriod = useCallback((periodId: string) => {
    setSelectedPeriodId(periodId)
  }, [])
  const openInspection = useCallback((direction: EvidenceDirection = 'north') => {
    setSelectedPeriodId((currentPeriodId) => currentPeriodId ?? timeline[1]?.id ?? timeline[0]?.id ?? null)
    setInspectionDirection(direction)
    setIsInspectionFullscreen(false)
    setIsComparisonOpen(false)
  }, [timeline])
  const handleSelectDecision = useCallback((decision: AnalysisDecision) => {
    setSelectedDecision(decision)

    if (decision === 'request_evidence') {
      setEvidenceRequestPointId((currentPointId) => currentPointId ?? selectedPoint?.id ?? points[0]?.id ?? null)
      setEvidenceRequestDirections((directions) => directions.length > 0 ? directions : ['north'])
    }
  }, [points, selectedPoint])
  const handleToggleEvidenceDirection = useCallback((direction: EvidenceDirection) => {
    setEvidenceRequestDirections((directions) => {
      if (directions.includes(direction)) {
        return directions.filter((item) => item !== direction)
      }

      return [...directions, direction]
    })
  }, [])
  const handleReturnToRecoveryArea = useCallback(() => {
    router.push('/areas/recuperacao')
  }, [router])
  const saveInspectionRecord = useCallback(() => {
    if (!data || !selectedDecision) {
      return
    }

    const storageKey = getInspectionStorageKey(data.area.id)
    const currentRecords = readInspectionRecords(storageKey)
    const record: CompletedInspectionRecord = {
      id: `vistoria-${Date.now()}`,
      areaId: data.area.id,
      finishedAt: new Date().toISOString(),
      decision: selectedDecision,
      technicalOpinion,
      ...(selectedDecision === 'request_evidence' && {
        evidenceRequest: {
          pointCode: evidenceRequestPoint?.code ?? selectedPoint?.code ?? 'Ponto nao informado',
          directions: evidenceRequestDirections,
        },
      }),
    }

    window.localStorage.setItem(storageKey, JSON.stringify([record, ...currentRecords]))
  }, [
    data,
    evidenceRequestDirections,
    evidenceRequestPoint,
    selectedDecision,
    selectedPoint,
    technicalOpinion,
  ])

  useEffect(() => {
    if (!isFinalizedModalOpen) {
      return
    }

    const timeoutId = window.setTimeout(() => {
      handleReturnToRecoveryArea()
    }, 2200)

    return () => window.clearTimeout(timeoutId)
  }, [handleReturnToRecoveryArea, isFinalizedModalOpen])

  if (isLoading) {
    return <AnalysisSkeleton />
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-100 p-6">
        <div className="mx-auto max-w-[960px] rounded-lg border border-red-200 bg-white p-6 text-red-700 shadow-sm">{error}</div>
      </main>
    )
  }

  if (isEmpty || !data) {
    return (
      <main className="min-h-screen bg-slate-100 p-6">
        <div className="mx-auto max-w-[960px] rounded-lg border border-slate-200 bg-white p-6 text-center text-slate-600 shadow-sm">
          Nenhuma evidencia disponivel para analise.
        </div>
      </main>
    )
  }

  const recoveryPercent = (data.area.recoveryAreaHectares / data.area.totalAreaHectares) * 100

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1800px] px-4 py-5 sm:px-6 xl:px-8">
          <div className="mb-4 flex items-center justify-between">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Inicio</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href="/areas">Areas</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbLink href={`/areas/recuperacao`}>Area em Recuperacao</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                  <BreadcrumbPage>Analise</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            
            <Button variant="outline" size="sm" onClick={() => router.back()} className="gap-2 text-slate-600">
              <ArrowLeft className="size-4" />
              Voltar
            </Button>
          </div>

          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">US08 - Analise de recuperacao ambiental</p>
              <h1 className="mt-2 text-2xl font-semibold text-slate-950 md:text-3xl">{data.area.name}</h1>
              <p className="mt-2 text-sm text-slate-600">
                {data.area.semarhCode} - {data.area.municipality} - {data.area.owner}
              </p>
            </div>

            <div className="grid gap-3 sm:grid-cols-3 xl:min-w-[620px]">
              <HeaderMetric icon={<ShieldCheck className="size-4" />} label="Recuperacao" value={`${formatNumber(data.area.recoveryAreaHectares, 1)} ha`} />
              <HeaderMetric icon={<MapPinned className="size-4" />} label="Propriedade" value={`${formatNumber(recoveryPercent, 1)}%`} />
              <HeaderMetric icon={<Eye className="size-4" />} label="Pontos" value={`${points.length} coletas`} />
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1800px] gap-4 px-4 pb-52 pt-5 sm:px-6 xl:px-8">
        <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
          <AnalysisMap
            area={data.area}
            points={points}
            selectedPointId={selectedPoint?.id ?? null}
            inspectionPhoto={inspectionPhoto}
            comparison={isComparisonOpen ? satellite : null}
            periods={timeline}
            selectedPeriodId={selectedPeriod?.id ?? null}
            isInspectionFullscreen={isInspectionFullscreen}
            onSelectPoint={handleSelectPoint}
            onSelectComparisonPeriod={handleSelectComparisonPeriod}
            onOpenInspection={() => openInspection(inspectionDirection ?? 'north')}
            onToggleInspectionFullscreen={() => setIsInspectionFullscreen((isFullscreen) => !isFullscreen)}
            onCloseInspection={() => setInspectionDirection(null)}
            onCloseComparison={() => setIsComparisonOpen(false)}
          />
          <SatellitePanel
            satellite={satellite}
            onOpenComparison={() => {
              setSelectedPeriodId((currentPeriodId) => currentPeriodId ?? timeline[1]?.id ?? timeline[0]?.id ?? null)
              setInspectionDirection(null)
              setIsInspectionFullscreen(false)
              setIsComparisonOpen(true)
            }}
          />
        </div>

        <EvidenceGallery point={selectedPoint} onExpandPhoto={(photo) => openInspection(photo.direction)} />
        <div className="grid gap-4 xl:grid-cols-[0.85fr_1.15fr]">
          <PropertyObservation observation={selectedPoint?.observations ?? ''} />
          <TechnicalOpinion value={technicalOpinion} onChange={setTechnicalOpinion} />
        </div>
        <TemporalTimeline
          periods={timeline}
          selectedPeriodId={selectedPeriod?.id ?? null}
          onSelectPeriod={handleSelectPeriod}
        />
      </div>

      <DecisionPanel
        selectedDecision={selectedDecision}
        points={points}
        evidenceRequestPointId={evidenceRequestPointId ?? selectedPoint?.id ?? null}
        evidenceRequestDirections={evidenceRequestDirections}
        canFinalize={canFinalize}
        onSelectDecision={handleSelectDecision}
        onSelectEvidenceRequestPoint={setEvidenceRequestPointId}
        onToggleEvidenceRequestDirection={handleToggleEvidenceDirection}
        onFinalize={() => {
          setIsInspectionFullscreen(false)
          saveInspectionRecord()
          setIsFinalizedModalOpen(true)
        }}
      />
      {isFinalizedModalOpen && (
        <AnalysisFinishedModal
          selectedDecision={selectedDecision}
          evidenceRequestPointCode={evidenceRequestPoint?.code ?? selectedPoint?.code ?? null}
          evidenceRequestDirections={evidenceRequestDirections}
          onReturn={handleReturnToRecoveryArea}
        />
      )}
    </main>
  )
}

interface HeaderMetricProps {
  icon: ReactNode
  label: string
  value: string
}

const HeaderMetric = ({ icon, label, value }: HeaderMetricProps) => {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
      <div className="mb-2 flex size-8 items-center justify-center rounded-md bg-sky-50 text-sky-700">{icon}</div>
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-1 text-sm font-semibold text-slate-950">{value}</p>
    </div>
  )
}

const decisionLabels: Record<AnalysisDecision, string> = {
  approve_monitoring: 'Aprovar Monitoramento',
  request_evidence: 'Solicitar Nova Evidencia',
  recommend_visit: 'Recomendar Visita Presencial',
}

const directionLabels: Record<EvidenceDirection, string> = {
  north: 'Norte',
  south: 'Sul',
  east: 'Leste',
  west: 'Oeste',
}

const getInspectionStorageKey = (areaId: string) => `semarh:vistorias:${areaId}`

const readInspectionRecords = (storageKey: string): CompletedInspectionRecord[] => {
  try {
    const value = window.localStorage.getItem(storageKey)
    return value ? JSON.parse(value) as CompletedInspectionRecord[] : []
  } catch {
    return []
  }
}

interface AnalysisFinishedModalProps {
  selectedDecision: AnalysisDecision | null
  evidenceRequestPointCode: string | null
  evidenceRequestDirections: EvidenceDirection[]
  onReturn: () => void
}

const AnalysisFinishedModal = ({
  selectedDecision,
  evidenceRequestPointCode,
  evidenceRequestDirections,
  onReturn,
}: AnalysisFinishedModalProps) => {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-slate-950/70 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-lg border border-slate-200 bg-white shadow-2xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 p-5">
          <div className="flex gap-3">
            <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-emerald-700">
              <CheckCircle2 className="size-6" />
            </div>
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Etapa concluida</p>
              <h2 className="mt-1 text-xl font-semibold text-slate-950">Vistoria concluida</h2>
            </div>
          </div>
          <button
            type="button"
            className="flex size-9 items-center justify-center rounded-md text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
            onClick={onReturn}
            aria-label="Fechar"
          >
            <X className="size-5" />
          </button>
        </div>

        <div className="space-y-4 p-5 text-sm text-slate-700">
          <p>
            A decisao tecnica foi registrada na interface. Futuramente, este payload sera enviado ao backend para salvar o encerramento da vistoria.
          </p>

          <div className="rounded-md border border-slate-200 bg-slate-50 p-4">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Decisao</p>
            <p className="mt-1 font-semibold text-slate-950">
              {selectedDecision ? decisionLabels[selectedDecision] : 'Nao informada'}
            </p>
          </div>

          {selectedDecision === 'request_evidence' && (
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Ponto</p>
                <p className="mt-1 font-semibold text-slate-950">{evidenceRequestPointCode ?? 'Nao informado'}</p>
              </div>
              <div className="rounded-md border border-amber-200 bg-amber-50 p-4">
                <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">Direcoes</p>
                <p className="mt-1 font-semibold text-slate-950">
                  {evidenceRequestDirections.map((direction) => directionLabels[direction]).join(', ')}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-3 border-t border-slate-200 p-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-slate-600">Redirecionando para a area em recuperacao...</p>
          <Button type="button" onClick={onReturn}>
            Voltar agora
          </Button>
        </div>
      </div>
    </div>
  )
}
