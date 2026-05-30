// src/features/areas/components/AreaList.tsx

'use client'

import React from 'react'
import type { Area } from '../types'
import { AreaCard } from './AreaCard'

interface AreaListProps {
  areas: Area[]
  isLoading?: boolean
  onEdit?: (area: Area) => void
  onDelete?: (id: string) => void
  selectedId?: string
  onSelect?: (id: string) => void
}

export const AreaList = React.forwardRef<HTMLDivElement, AreaListProps>(
  ({ areas, isLoading, onEdit, onDelete, selectedId, onSelect }, ref) => {
    if (isLoading) {
      return (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="p-4 rounded-lg border bg-gray-50 animate-pulse" />
          ))}
        </div>
      )
    }

    if (areas.length === 0) {
      return (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Nenhuma área encontrada</p>
        </div>
      )
    }

    return (
      <div ref={ref} className="space-y-4">
        {areas.map((area) => (
          <AreaCard
            key={area.id}
            area={area}
            onEdit={onEdit}
            onDelete={onDelete}
            isSelected={selectedId === area.id}
            onSelect={onSelect}
          />
        ))}
      </div>
    )
  }
)

AreaList.displayName = 'AreaList'
