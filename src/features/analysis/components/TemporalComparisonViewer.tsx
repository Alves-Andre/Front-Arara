import { ArrowLeft } from 'lucide-react'
import { formatDate } from '@/shared/utils/formatters'
import type { SatelliteImageSet, TemporalPeriod } from '../types'

interface TemporalComparisonViewerProps {
  satellite: SatelliteImageSet & { selectedPeriod: TemporalPeriod | null }
  periods: TemporalPeriod[]
  selectedPeriodId: string | null
  onSelectPeriod: (periodId: string) => void
  onBack: () => void
}

const historicalImages = [
  'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1200&q=80',
]

export const TemporalComparisonViewer = ({
  satellite,
  periods,
  selectedPeriodId,
  onSelectPeriod,
  onBack,
}: TemporalComparisonViewerProps) => {
  const selectedPeriod = periods.find((period) => period.id === selectedPeriodId) ?? satellite.selectedPeriod ?? periods[0] ?? null
  const selectedSnapshot = getSnapshotForPeriod(satellite, periods, selectedPeriod)

  return (
    <div className="absolute inset-0 bg-slate-950">
      <div className="grid size-full gap-px bg-slate-800 md:grid-cols-2">
        <ComparisonFrame label="Imagem atual" date={satellite.currentDate} imageUrl={satellite.currentImageUrl} />
        <ComparisonFrame label="Imagem selecionada" date={selectedSnapshot.date} imageUrl={selectedSnapshot.imageUrl} />
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

        <label className="w-full max-w-xs rounded-md border border-white/25 bg-slate-950/75 p-2 text-white shadow-sm backdrop-blur">
          <span className="block text-xs font-medium uppercase tracking-[0.14em] text-cyan-100">Data da imagem</span>
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
      </div>

      <div className="absolute bottom-4 left-4 rounded-md border border-white/30 bg-slate-950/75 px-3 py-2 text-white backdrop-blur">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-cyan-100">Comparativo temporal</p>
        <p className="mt-1 text-sm font-semibold">{selectedSnapshot.label} - {formatDate(selectedSnapshot.date)}</p>
      </div>
    </div>
  )
}

const getSnapshotForPeriod = (
  satellite: SatelliteImageSet,
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
      date: satellite.currentDate,
      imageUrl: satellite.currentImageUrl,
    }
  }

  return {
    periodId: period.id,
    label: period.label,
    date: period.capturedAt,
    imageUrl: periodIndex === 1 ? satellite.previousImageUrl : historicalImages[(periodIndex - 2) % historicalImages.length],
  }
}

interface ComparisonFrameProps {
  label: string
  date: string
  imageUrl: string
}

const ComparisonFrame = ({ label, date, imageUrl }: ComparisonFrameProps) => {
  return (
    <div className="relative min-h-[260px] overflow-hidden bg-slate-900">
      <img src={imageUrl} alt={`${label} em ${formatDate(date)}`} className="size-full object-cover saturate-125" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,.12)_1px,transparent_1px),linear-gradient(0deg,rgba(255,255,255,.12)_1px,transparent_1px)] bg-[size:56px_56px]" />
      <div className="absolute left-3 top-28 rounded-md border border-white/30 bg-slate-950/75 px-3 py-2 text-white backdrop-blur">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-cyan-100">{label}</p>
        <p className="mt-1 text-sm font-semibold">{formatDate(date)}</p>
      </div>
    </div>
  )
}
