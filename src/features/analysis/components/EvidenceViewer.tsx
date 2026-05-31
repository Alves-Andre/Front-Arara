import { ArrowLeft } from 'lucide-react'
import type { EvidencePhoto } from '../types'

interface EvidenceViewerProps {
  photo: EvidencePhoto
  onBack: () => void
}

export const EvidenceViewer = ({ photo, onBack }: EvidenceViewerProps) => {
  return (
    <div className="absolute inset-0 bg-slate-900">
      <img src={photo.imageUrl} alt={photo.title} className="size-full object-cover" />
      <div className="absolute inset-x-0 top-0 bg-gradient-to-b from-slate-950/80 to-transparent p-4">
        <button
          type="button"
          className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/90 px-3 py-2 text-sm font-medium text-slate-900 shadow-sm transition hover:bg-white"
          onClick={onBack}
        >
          <ArrowLeft className="size-4" />
          Voltar ao mapa
        </button>
      </div>
      <div className="absolute bottom-4 left-4 rounded-md border border-white/30 bg-slate-950/75 px-3 py-2 text-white backdrop-blur">
        <p className="text-xs font-medium uppercase tracking-[0.14em] text-cyan-100">Evidencia expandida</p>
        <p className="mt-1 text-sm font-semibold">{photo.title}</p>
      </div>
    </div>
  )
}
