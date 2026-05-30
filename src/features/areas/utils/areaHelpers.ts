// src/features/areas/utils/areaHelpers.ts

import type { Area } from '../types'

export const getAreaTypeLabel = (type: string): string => {
  const labels: Record<string, string> = {
    forest: 'Floresta',
    wetland: 'Área Úmida',
    grassland: 'Pastagem',
    urban: 'Urbana',
    other: 'Outra',
  }
  return labels[type] || type
}

export const getAreaStatusLabel = (status: string): string => {
  const labels: Record<string, string> = {
    active: 'Ativa',
    inactive: 'Inativa',
    archived: 'Arquivada',
  }
  return labels[status] || status
}

export const getAreaStatusColor = (status: string): string => {
  const colors: Record<string, string> = {
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    archived: 'bg-red-100 text-red-800',
  }
  return colors[status] || 'bg-gray-100 text-gray-800'
}

export const calculateRecoveryPercentage = (
  progress: number | undefined,
  target: number | undefined
): string => {
  if (!progress || !target) return '0%'
  const percentage = Math.round((progress / target) * 100)
  return `${percentage}%`
}

export const isAreaRecovering = (area: Area): boolean => {
  return area.status === 'active' && (area.recoveryProgress || 0) > 0
}

export const sortAreasByName = (areas: Area[]): Area[] => {
  return [...areas].sort((a, b) => a.name.localeCompare(b.name))
}

export const sortAreasByRecoveryProgress = (areas: Area[]): Area[] => {
  return [...areas].sort((a, b) => (b.recoveryProgress || 0) - (a.recoveryProgress || 0))
}
