import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { CreateSatelliteSceneInput, UpdateSatelliteSceneInput } from '../schemas/satelliteSchemas'
import { satelliteService } from '../services/satelliteService'
import type { SatelliteFilters } from '../types'

export const SATELLITE_QUERY_KEY = ['satellite'] as const

export const useSatelliteScenes = (page = 1, limit = 10, filters?: SatelliteFilters) => {
  return useQuery({
    queryKey: [...SATELLITE_QUERY_KEY, 'scenes', page, limit, filters],
    queryFn: () => satelliteService.getScenes(page, limit, filters),
    staleTime: 10 * 60 * 1000,
  })
}

export const useSatelliteScene = (id: string) => {
  return useQuery({
    queryKey: [...SATELLITE_QUERY_KEY, 'scenes', id],
    queryFn: () => satelliteService.getScene(id),
    enabled: !!id,
  })
}

export const useCreateSatelliteScene = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateSatelliteSceneInput) => satelliteService.createScene(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: SATELLITE_QUERY_KEY }),
  })
}

export const useUpdateSatelliteScene = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateSatelliteSceneInput }) =>
      satelliteService.updateScene(id, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: SATELLITE_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: [...SATELLITE_QUERY_KEY, 'scenes', variables.id] })
    },
  })
}

export const useRequestSatelliteSync = () => {
  return useMutation({
    mutationFn: (areaId: string) => satelliteService.requestSceneSync(areaId),
  })
}

