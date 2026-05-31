// src/features/areas/hooks/useAreas.ts

import { useQuery, useQueryClient } from '@tanstack/react-query'
import { areasService } from '../services/areasService'

const AREAS_QUERY_KEY = ['areas']

export const useAreas = (page = 1, limit = 10, filters?: Record<string, any>) => {
  return useQuery({
    queryKey: [...AREAS_QUERY_KEY, page, limit, filters],
    queryFn: () => areasService.getAreas(page, limit, filters),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
  })
}

export const useComplianceQueue = () => {
  return useQuery({
    queryKey: [...AREAS_QUERY_KEY, 'compliance-queue'],
    queryFn: () => areasService.getComplianceQueue(),
    staleTime: 1 * 60 * 1000, // 1 minute
  })
}

export const useArea = (id: string) => {
  return useQuery({
    queryKey: [...AREAS_QUERY_KEY, id],
    queryFn: () => areasService.getArea(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000,
  })
}

export const useAreasStats = () => {
  return useQuery({
    queryKey: [...AREAS_QUERY_KEY, 'stats'],
    queryFn: () => areasService.getAreasStats(),
    staleTime: 10 * 60 * 1000,
  })
}

export const useNearbyAreas = (lat: number, lng: number, radius?: number) => {
  return useQuery({
    queryKey: [...AREAS_QUERY_KEY, 'nearby', lat, lng, radius],
    queryFn: () => areasService.getNearbyAreas(lat, lng, radius),
    enabled: lat !== undefined && lng !== undefined,
  })
}

/**
 * Hook helper para invalidar queries de áreas
 */
export const useAreasQueryClient = () => {
  const queryClient = useQueryClient()

  return {
    invalidateAreas: () => {
      queryClient.invalidateQueries({ queryKey: AREAS_QUERY_KEY })
    },
    invalidateArea: (id: string) => {
      queryClient.invalidateQueries({ queryKey: [...AREAS_QUERY_KEY, id] })
    },
  }
}
