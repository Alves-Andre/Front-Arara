import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { CreateRequestInput, UpdateRequestInput } from '../schemas/requestSchemas'
import { requestsService } from '../services/requestsService'
import type { EnvironmentalRequest, RequestFilters } from '../types'

export const REQUESTS_QUERY_KEY = ['requests'] as const

export const useRequests = (page = 1, limit = 10, filters?: RequestFilters) => {
  return useQuery({
    queryKey: [...REQUESTS_QUERY_KEY, page, limit, filters],
    queryFn: () => requestsService.getRequests(page, limit, filters),
    staleTime: 5 * 60 * 1000,
  })
}

export const useRequest = (id: string) => {
  return useQuery({
    queryKey: [...REQUESTS_QUERY_KEY, id],
    queryFn: () => requestsService.getRequest(id),
    enabled: !!id,
  })
}

export const useCreateRequest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateRequestInput) => requestsService.createRequest(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: REQUESTS_QUERY_KEY }),
  })
}

export const useUpdateRequest = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateRequestInput }) =>
      requestsService.updateRequest(id, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: REQUESTS_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: [...REQUESTS_QUERY_KEY, variables.id] })
    },
  })
}

export const useTransitionRequestStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, status, notes }: { id: string; status: EnvironmentalRequest['status']; notes?: string }) =>
      requestsService.transitionRequestStatus(id, status, notes),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: REQUESTS_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: [...REQUESTS_QUERY_KEY, variables.id] })
    },
  })
}

