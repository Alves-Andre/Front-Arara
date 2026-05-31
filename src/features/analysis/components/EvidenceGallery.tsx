import type { ReactNode } from 'react'
import { Camera, Compass, MapPin, UserRound } from 'lucide-react'
import { formatDate } from '@/shared/utils/formatters'
import type { EvidencePhoto, MonitoringPointEvidence } from '../types'

interface EvidenceGalleryProps {
  point: MonitoringPointEvidence | null
  onExpandPhoto: (photo: EvidencePhoto) => void
}

export const EvidenceGallery = ({ point, onExpandPhoto }: EvidenceGalleryProps) => {
  if (!point) {
    return (
      <section className="rounded-lg border border-slate-200 bg-white p-6 text-center text-sm text-slate-600 shadow-sm">
        Nenhuma evidencia encontrada para o ponto selecionado.
      </section>
    )
  }

  const photos = Object.values(point.photos)

  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Evidencias do ponto selecionado</p>
          <h2 className="mt-1 text-xl font-semibold text-slate-950">{point.code}</h2>
        </div>

        <div className="grid gap-3 text-sm sm:grid-cols-2 lg:grid-cols-4">
          <EvidenceMeta icon={<MapPin className="size-4" />} label="Latitude" value={point.latitude.toFixed(5)} />
          <EvidenceMeta icon={<MapPin className="size-4" />} label="Longitude" value={point.longitude.toFixed(5)} />
          <EvidenceMeta icon={<Camera className="size-4" />} label="Data da coleta" value={formatDate(point.createdAt)} />
          <EvidenceMeta icon={<UserRound className="size-4" />} label="Responsavel" value={point.owner} />
        </div>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {photos.map((photo) => (
          <button
            key={photo.id}
            type="button"
            className="group overflow-hidden rounded-md border border-slate-200 bg-slate-50 text-left transition hover:border-sky-300 hover:shadow-md"
            onClick={() => onExpandPhoto(photo)}
          >
            <div className="aspect-[4/3] overflow-hidden bg-slate-200">
              <img src={photo.imageUrl} alt={photo.title} className="size-full object-cover transition duration-300 group-hover:scale-105" />
            </div>
            <div className="p-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-slate-950">
                <Compass className="size-4 text-sky-700" />
                {photo.title}
              </div>
              <p className="mt-1 text-xs text-slate-600">{formatDate(photo.capturedAt)}</p>
            </div>
          </button>
        ))}
      </div>
    </section>
  )
}

interface EvidenceMetaProps {
  icon: ReactNode
  label: string
  value: string
}

const EvidenceMeta = ({ icon, label, value }: EvidenceMetaProps) => {
  return (
    <div className="rounded-md border border-slate-200 bg-slate-50 p-3">
      <div className="mb-2 flex size-8 items-center justify-center rounded-md bg-sky-50 text-sky-700">{icon}</div>
      <p className="text-xs font-medium uppercase tracking-[0.14em] text-slate-500">{label}</p>
      <p className="mt-1 break-words text-sm font-semibold text-slate-950">{value}</p>
    </div>
  )
}
