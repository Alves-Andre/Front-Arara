import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { CreateAnalysisInput, UpdateAnalysisInput } from '../schemas/analysisSchemas'
import { analysisService } from '../services/analysisService'
import type { AnalysisFilters } from '../types'

export const ANALYSIS_QUERY_KEY = ['analysis'] as const

export const useAnalyses = (page = 1, limit = 10, filters?: AnalysisFilters) => {
  return useQuery({
    queryKey: [...ANALYSIS_QUERY_KEY, page, limit, filters],
    queryFn: () => analysisService.getAnalyses(page, limit, filters),
    staleTime: 5 * 60 * 1000,
  })
}

export const useAnalysis = (id: string) => {
  return useQuery({
    queryKey: [...ANALYSIS_QUERY_KEY, id],
    queryFn: () => analysisService.getAnalysis(id),
    enabled: !!id,
  })
}

export const useCreateAnalysis = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateAnalysisInput) => analysisService.createAnalysis(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ANALYSIS_QUERY_KEY }),
  })
}

export const useUpdateAnalysis = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateAnalysisInput }) =>
      analysisService.updateAnalysis(id, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ANALYSIS_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: [...ANALYSIS_QUERY_KEY, variables.id] })
    },
  })
}

export const useRunAnalysis = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => analysisService.runAnalysis(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ANALYSIS_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: [...ANALYSIS_QUERY_KEY, id] })
    },
  })
}

