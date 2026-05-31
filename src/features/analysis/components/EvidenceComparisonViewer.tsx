import { ArrowLeft, Maximize2, Minimize2 } from 'lucide-react'
import { formatDate } from '@/shared/utils/formatters'
import { cn } from '@/shared/utils/cn'
import type { EvidenceDirection, EvidencePhoto, TemporalPeriod } from '../types'

interface EvidenceComparisonViewerProps {
  currentPhoto: EvidencePhoto
  periods: TemporalPeriod[]
  selectedPeriodId: string | null
  isFullscreen: boolean
  onSelectPeriod: (periodId: string) => void
  onToggleFullscreen: () => void
  onBack: () => void
}

const directionLabels: Record<EvidenceDirection, string> = {
  north: 'Foto Norte',
  south: 'Foto Sul',
  east: 'Foto Leste',
  west: 'Foto Oeste',
}

const historicalImagesByDirection: Record<EvidenceDirection, string[]> = {
  north: [
    'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
  ],
  south: [
    'https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1455218873509-8097305ee378?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&w=1200&q=80',
  ],
  east: [
    'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1433086966358-54859d0ed716?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1426604966848-d7adac402bff?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&w=1200&q=80',
  ],
  west: [
    'https://images.unsplash.com/photo-1518495973542-4542c06a5843?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1472214103451-9374bd1c798e?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1439853949127-fa647821eba0?auto=format&fit=crop&w=1200&q=80',
    'https://images.unsplash.com/photo-1513836279014-a89f7a76ae86?auto=format&fit=crop&w=1200&q=80',
  ],
}

export const EvidenceComparisonViewer = ({
  currentPhoto,
  periods,
  selectedPeriodId,
  isFullscreen,
  onSelectPeriod,
  onToggleFullscreen,
  onBack,
}: EvidenceComparisonViewerProps) => {
  const selectedPeriod = periods.find((period) => period.id === selectedPeriodId) ?? periods[1] ?? periods[0] ?? null
  const selectedSnapshot = getSnapshotForPeriod(currentPhoto, periods, selectedPeriod)

  return (
    <div className={cn('bg-slate-950', isFullscreen ? 'fixed inset-0 z-[1000]' : 'absolute inset-0')}>
      <div className="grid size-full gap-px bg-slate-800 md:grid-cols-2">
        <PhotoFrame label={`${directionLabels[currentPhoto.direction]} atual`} date={currentPhoto.capturedAt} imageUrl={currentPhoto.imageUrl} />
        <PhotoFrame label={`${directionLabels[currentPhoto.direction]} selecionada`} date={selectedSnapshot.date} imageUrl={selectedSnapshot.imageUrl} />
      </div>

      <div className="absolute inset-x-0 top-0 flex flex-col gap-3 bg-gradient-to-b from-slate-950/85 to-transparent p-4 sm:flex-row sm:items-start sm:justify-between">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/90 px-3 py-2 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-white"
          onClick={onBack}
        >
          <ArrowLeft className="size-4" />
          Voltar ao mapa
        </button>

        <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row sm:items-start">
          <label className="w-full max-w-xs rounded-md border border-white/25 bg-slate-950/75 p-2 text-white shadow-sm backdrop-blur">
            <span className="block text-xs font-medium uppercase tracking-[0.14em] text-cyan-100">Data da foto</span>
            <select
              className="mt-1 h-9 w-full rounded-md border border-white/20 bg-white px-2 text-sm font-medium text-slate-900 outline-none"
              value={selectedSnapshot.periodId}
              onChange={(event) => onSelectPeriod(event.target.value)}
            >
              {periods.map((period) => (
                <option key={period.id} value={period.id}>
                  {period.label} - {formatDate(period.capturedAt)}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-white/30 bg-white/90 px-3 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-white"
            onClick={onToggleFullscreen}
          >
            {isFullscreen ? <Minimize2 className="size-4" /> : <Maximize2 className="size-4" />}
            {isFullscreen ? 'Reduzir' : 'Tela cheia'}
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 left-4 rounded-md border border-white/30 bg-slate-950/75 px-3 py-2 text-white backdrop-blur">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-cyan-100">Comparativo de vistoria</p>
        <p className="mt-1 text-sm font-semibold">
          {directionLabels[currentPhoto.direction]} - {selectedSnapshot.label} - {formatDate(selectedSnapshot.date)}
        </p>
      </div>
    </div>
  )
}

const getSnapshotForPeriod = (
  currentPhoto: EvidencePhoto,
  periods: TemporalPeriod[],
  selectedPeriod: TemporalPeriod | null
) => {
  const period = selectedPeriod ?? periods[0]
  const periodIndex = Math.max(
    0,
    periods.findIndex((item) => item.id === period?.id)
  )

  if (!period || periodIndex === 0) {
    return {
      periodId: periods[0]?.id ?? 'current',
      label: periods[0]?.label ?? 'Atual',
      date: currentPhoto.capturedAt,
      imageUrl: currentPhoto.imageUrl,
    }
  }

  return {
    periodId: period.id,
    label: period.label,
    date: period.capturedAt,
    imageUrl: historicalImagesByDirection[currentPhoto.direction][(periodIndex - 1) % historicalImagesByDirection[currentPhoto.direction].length],
  }
}

interface PhotoFrameProps {
  label: string
  date: string
  imageUrl: string
}

const PhotoFrame = ({ label, date, imageUrl }: PhotoFrameProps) => {
  return (
    <div className="relative min-h-[260px] overflow-hidden bg-slate-900">
      <img src={imageUrl} alt={`${label} em ${formatDate(date)}`} className="size-full object-cover" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,.12)_1px,transparent_1px)] bg-[size:56px_56px]" />
      <div className="absolute left-3 top-28 rounded-md border border-white/30 bg-slate-950/75 px-3 py-2 text-white backdrop-blur">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-cyan-100">{label}</p>
        <p className="mt-1 text-sm font-semibold">{formatDate(date)}</p>
      </div>
    </div>
  )
}
