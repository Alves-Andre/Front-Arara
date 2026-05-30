'use client'

import type { SatelliteScene } from '../types'
import { SatelliteSceneCard } from './SatelliteSceneCard'

interface SatelliteSceneListProps {
  scenes: SatelliteScene[]
  isLoading?: boolean
  onSelect?: (id: string) => void
}

export const SatelliteSceneList = ({ scenes, isLoading, onSelect }: SatelliteSceneListProps) => {
  if (isLoading) {
    return <div className="rounded-lg border bg-gray-50 p-6 text-sm text-muted-foreground">Carregando cenas de satelite...</div>
  }

  if (scenes.length === 0) {
    return <div className="rounded-lg border p-6 text-center text-sm text-muted-foreground">Nenhuma cena encontrada</div>
  }

  return (
    <div className="space-y-3">
      {scenes.map((scene) => (
        <SatelliteSceneCard key={scene.id} scene={scene} onSelect={onSelect} />
      ))}
    </div>
  )
}

