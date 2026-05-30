import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { CreateMonitoringInput, UpdateMonitoringInput } from '../schemas/monitoringSchemas'
import { monitoringService } from '../services/monitoringService'
import type { MonitoringFilters } from '../types'

export const MONITORING_QUERY_KEY = ['monitoring'] as const

export const useMonitoringEvents = (page = 1, limit = 10, filters?: MonitoringFilters) => {
  return useQuery({
    queryKey: [...MONITORING_QUERY_KEY, page, limit, filters],
    queryFn: () => monitoringService.getMonitoringEvents(page, limit, filters),
    staleTime: 5 * 60 * 1000,
  })
}

export const useMonitoringEvent = (id: string) => {
  return useQuery({
    queryKey: [...MONITORING_QUERY_KEY, id],
    queryFn: () => monitoringService.getMonitoringEvent(id),
    enabled: !!id,
  })
}

export const useCreateMonitoringEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateMonitoringInput) => monitoringService.createMonitoringEvent(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: MONITORING_QUERY_KEY }),
  })
}

export const useUpdateMonitoringEvent = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateMonitoringInput }) =>
      monitoringService.updateMonitoringEvent(id, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: MONITORING_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: [...MONITORING_QUERY_KEY, variables.id] })
    },
  })
}

