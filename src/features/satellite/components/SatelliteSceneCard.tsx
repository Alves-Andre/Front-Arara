'use client'

import { formatDate } from '@/shared/utils/formatters'
import type { SatelliteScene } from '../types'
import { getSatelliteProviderLabel, isSceneUsableForAnalysis } from '../utils/satelliteHelpers'

interface SatelliteSceneCardProps {
  scene: SatelliteScene
  onSelect?: (id: string) => void
}

export const SatelliteSceneCard = ({ scene, onSelect }: SatelliteSceneCardProps) => {
  const usable = isSceneUsableForAnalysis(scene)

  return (
    <article className="rounded-lg border p-4 transition hover:border-blue-300" onClick={() => onSelect?.(scene.id)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="font-semibold">{getSatelliteProviderLabel(scene.provider)}</h3>
          <p className="text-sm text-muted-foreground">{formatDate(scene.date)}</p>
        </div>
        <span className={`rounded px-2 py-1 text-xs font-medium ${usable ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
          {scene.cloudCover}% nuvens
        </span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">Resolucao: {scene.resolution} m</p>
    </article>
  )
}

