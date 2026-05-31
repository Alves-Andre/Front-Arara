'use client'

import Link from 'next/link'
import { useEffect, useMemo, useState } from 'react'
import { ArrowLeft, ArrowRight, ClipboardList } from 'lucide-react'
import { Button } from '@/shared/components'
import { formatDateTime, formatTimeAgo, truncateText } from '@/shared/utils/formatters'
import type { AnalysisDecision, CompletedInspectionRecord, EvidenceDirection } from '@/features/analysis'
import type { RecoveryArea } from '../../types'
import { getRecoveryAreaStatusLabel } from '../../utils/recoveryAreaHelpers'

interface RecoveryProjectCardProps {
  area: RecoveryArea
}

export const RecoveryProjectCard = ({ area }: RecoveryProjectCardProps) => {
  const [inspectionRecords, setInspectionRecords] = useState<CompletedInspectionRecord[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.max(1, Math.ceil(inspectionRecords.length / RECORDS_PER_PAGE))
  const paginatedRecords = useMemo(() => {
    const start = (currentPage - 1) * RECORDS_PER_PAGE
    return inspectionRecords.slice(start, start + RECORDS_PER_PAGE)
  }, [currentPage, inspectionRecords])

  useEffect(() => {
    setInspectionRecords(readInspectionRecords(area.id))
    setCurrentPage(1)
  }, [area.id])

  useEffect(() => {
    setCurrentPage((page) => Math.min(page, totalPages))
  }, [totalPages])

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

        <Button asChild className="w-full gap-2 sm:w-fit">
          <Link href="/areas/recuperacao/analise">
            Abrir Vistoria
            <ArrowRight className="size-4" />
          </Link>
        </Button>
      </div>

      <div className="mt-5 border-t border-slate-200 pt-5">
        <div className="mb-3 flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Historico de vistorias</p>
            <h3 className="mt-1 text-base font-semibold text-slate-950">Registros realizados</h3>
          </div>
          <p className="text-sm text-slate-600">{inspectionRecords.length} registro(s)</p>
        </div>

        {inspectionRecords.length > 0 ? (
          <div className="overflow-x-auto rounded-md border border-slate-200">
            <table className="min-w-full divide-y divide-slate-200 text-sm">
              <thead className="bg-slate-50 text-left text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                <tr>
                  <th className="px-3 py-3">Data</th>
                  <th className="px-3 py-3">Decisao</th>
                  <th className="px-3 py-3">Recoleta</th>
                  <th className="px-3 py-3">Parecer</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 bg-white">
                {paginatedRecords.map((record) => (
                  <tr key={record.id}>
                    <td className="whitespace-nowrap px-3 py-3 font-medium text-slate-900">{formatDateTime(record.finishedAt)}</td>
                    <td className="px-3 py-3 text-slate-700">{decisionLabels[record.decision]}</td>
                    <td className="px-3 py-3 text-slate-700">
                      {record.evidenceRequest
                        ? `${record.evidenceRequest.pointCode} - ${record.evidenceRequest.directions.map((direction) => directionLabels[direction]).join(', ')}`
                        : '-'}
                    </td>
                    <td className="max-w-md px-3 py-3 text-slate-700">
                      {record.technicalOpinion ? truncateText(record.technicalOpinion, 90) : '-'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-3 py-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-slate-600">
                Pagina {currentPage} de {totalPages} - {inspectionRecords.length} registro(s)
              </p>
              <div className="flex gap-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  disabled={currentPage === 1}
                  onClick={() => setCurrentPage((page) => Math.max(1, page - 1))}
                >
                  <ArrowLeft className="size-4" />
                  Anterior
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  className="gap-2"
                  disabled={currentPage === totalPages}
                  onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}
                >
                  Proxima
                  <ArrowRight className="size-4" />
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="rounded-md border border-dashed border-slate-300 bg-slate-50 p-4 text-sm text-slate-600">
            Nenhuma vistoria finalizada para esta area.
          </div>
        )}
      </div>
    </section>
  )
}

const RECORDS_PER_PAGE = 10

const decisionLabels: Record<AnalysisDecision, string> = {
  approve_monitoring: 'Aprovado',
  request_evidence: 'Nova evidencia solicitada',
  recommend_visit: 'Visita presencial recomendada',
}

const directionLabels: Record<EvidenceDirection, string> = {
  north: 'Norte',
  south: 'Sul',
  east: 'Leste',
  west: 'Oeste',
}

const readInspectionRecords = (areaId: string): CompletedInspectionRecord[] => {
  try {
    const value = window.localStorage.getItem(`semarh:vistorias:${areaId}`)
    return value ? JSON.parse(value) as CompletedInspectionRecord[] : []
  } catch {
    return []
  }
}
