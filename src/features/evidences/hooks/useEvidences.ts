import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import type { CreateEvidenceInput, UpdateEvidenceInput } from '../schemas/evidenceSchemas'
import { evidencesService } from '../services/evidencesService'
import type { EvidenceFilters } from '../types'

export const EVIDENCES_QUERY_KEY = ['evidences'] as const

export const useEvidences = (page = 1, limit = 10, filters?: EvidenceFilters) => {
  return useQuery({
    queryKey: [...EVIDENCES_QUERY_KEY, page, limit, filters],
    queryFn: () => evidencesService.getEvidences(page, limit, filters),
    staleTime: 5 * 60 * 1000,
  })
}

export const useEvidence = (id: string) => {
  return useQuery({
    queryKey: [...EVIDENCES_QUERY_KEY, id],
    queryFn: () => evidencesService.getEvidence(id),
    enabled: !!id,
  })
}

export const useCreateEvidence = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateEvidenceInput) => evidencesService.createEvidence(input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: EVIDENCES_QUERY_KEY }),
  })
}

export const useUpdateEvidence = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, input }: { id: string; input: UpdateEvidenceInput }) =>
      evidencesService.updateEvidence(id, input),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: EVIDENCES_QUERY_KEY })
      queryClient.invalidateQueries({ queryKey: [...EVIDENCES_QUERY_KEY, variables.id] })
    },
  })
}

export const useUploadEvidenceFile = () => {
  return useMutation({
    mutationFn: (file: Blob) => evidencesService.uploadEvidenceFile(file),
  })
}

