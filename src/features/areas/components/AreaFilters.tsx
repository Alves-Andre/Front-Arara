// src/features/areas/components/AreaFilters.tsx

'use client'

import React from 'react'

interface AreaFiltersProps {
  search?: string
  onSearchChange?: (value: string) => void
  statusFilter?: string[]
  onStatusChange?: (status: string[]) => void
  typeFilter?: string[]
  onTypeChange?: (type: string[]) => void
}

export const AreaFilters = React.forwardRef<HTMLDivElement, AreaFiltersProps>(
  ({ search, onSearchChange, statusFilter, onStatusChange, typeFilter, onTypeChange }, ref) => {
    return (
      <div ref={ref} className="p-4 border rounded-lg bg-white space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Buscar</label>
          <input
            type="text"
            value={search || ''}
            onChange={(e) => onSearchChange?.(e.target.value)}
            placeholder="Pesquisar áreas..."
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Status</label>
          <div className="space-y-2">
            {['active', 'inactive', 'archived'].map((status) => (
              <label key={status} className="flex items-center">
                <input
                  type="checkbox"
                  checked={statusFilter?.includes(status) || false}
                  onChange={(e) => {
                    const newStatus = e.target.checked
                      ? [...(statusFilter || []), status]
                      : (statusFilter || []).filter((s) => s !== status)
                    onStatusChange?.(newStatus)
                  }}
                  className="rounded"
                />
                <span className="ml-2 text-sm">
                  {status === 'active' ? 'Ativa' : status === 'inactive' ? 'Inativa' : 'Arquivada'}
                </span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tipo</label>
          <div className="space-y-2">
            {['forest', 'wetland', 'grassland', 'urban', 'other'].map((type) => (
              <label key={type} className="flex items-center">
                <input
                  type="checkbox"
                  checked={typeFilter?.includes(type) || false}
                  onChange={(e) => {
                    const newType = e.target.checked
                      ? [...(typeFilter || []), type]
                      : (typeFilter || []).filter((t) => t !== type)
                    onTypeChange?.(newType)
                  }}
                  className="rounded"
                />
                <span className="ml-2 text-sm">
                  {type === 'forest'
                    ? 'Floresta'
                    : type === 'wetland'
                      ? 'Área Úmida'
                      : type === 'grassland'
                        ? 'Pastagem'
                        : type === 'urban'
                          ? 'Urbana'
                          : 'Outra'}
                </span>
              </label>
            ))}
          </div>
        </div>
      </div>
    )
  }
)

AreaFilters.displayName = 'AreaFilters'
