// src/features/areas/components/AreaCard.tsx

'use client'

import React from 'react'
import type { Area } from '../types'
import { getAreaTypeLabel, getAreaStatusLabel, calculateRecoveryPercentage } from '../utils/areaHelpers'
import { formatDate } from '@/shared/utils/formatters'

interface AreaCardProps {
  area: Area
  onEdit?: (area: Area) => void
  onDelete?: (id: string) => void
  isSelected?: boolean
  onSelect?: (id: string) => void
}

export const AreaCard = React.forwardRef<HTMLDivElement, AreaCardProps>(
  ({ area, onEdit, onDelete, isSelected, onSelect }, ref) => {
    return (
      <div
        ref={ref}
        className={`
          p-4 rounded-lg border transition-all cursor-pointer
          ${isSelected ? 'border-blue-500 bg-blue-50' : 'border-border hover:border-blue-300'}
        `}
        onClick={() => onSelect?.(area.id)}
      >
        <div className="flex justify-between items-start mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-lg">{area.name}</h3>
            <p className="text-sm text-muted-foreground">{getAreaTypeLabel(area.areaType)}</p>
          </div>
          <span
            className={`
              px-2 py-1 rounded text-xs font-medium
              ${area.status === 'active' ? 'bg-green-100 text-green-800' : ''}
              ${area.status === 'inactive' ? 'bg-gray-100 text-gray-800' : ''}
              ${area.status === 'archived' ? 'bg-red-100 text-red-800' : ''}
            `}
          >
            {getAreaStatusLabel(area.status)}
          </span>
        </div>

        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{area.description}</p>

        <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
          <div>
            <span className="text-muted-foreground">Área:</span>
            <p className="font-medium">{area.hectares} ha</p>
          </div>
          <div>
            <span className="text-muted-foreground">Recuperação:</span>
            <p className="font-medium">{calculateRecoveryPercentage(area.recoveryProgress, area.recoveryTarget)}</p>
          </div>
        </div>

        {area.recoveryTarget && (
          <div className="mb-4">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-muted-foreground">Progresso</span>
              <span className="font-medium">{area.recoveryProgress || 0}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-green-500 h-2 rounded-full transition-all"
                style={{ width: `${(area.recoveryProgress || 0) / (area.recoveryTarget || 100) * 100}%` }}
              />
            </div>
          </div>
        )}

        <div className="text-xs text-muted-foreground mb-3">
          Criado em {formatDate(area.createdAt)}
        </div>

        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onEdit?.(area)
            }}
            className="flex-1 px-3 py-1 text-sm border rounded hover:bg-gray-50 transition"
          >
            Editar
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete?.(area.id)
            }}
            className="flex-1 px-3 py-1 text-sm border border-red-200 text-red-600 rounded hover:bg-red-50 transition"
          >
            Deletar
          </button>
        </div>
      </div>
    )
  }
)

AreaCard.displayName = 'AreaCard'
