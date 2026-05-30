import { axiosClient } from '@/shared/services/api/axiosClient'
import type { PaginatedResponse } from '@/shared/types'
import type { CreateEvidenceInput, UpdateEvidenceInput } from '../schemas/evidenceSchemas'
import type { EnvironmentalEvidence, EvidenceFilters } from '../types'

export const evidencesService = {
  async getEvidences(page = 1, limit = 10, filters?: EvidenceFilters) {
    const { data } = await axiosClient.get<PaginatedResponse<EnvironmentalEvidence>>('/evidences', {
      params: { page, limit, ...filters },
    })
    return data
  },

  async getEvidence(id: string) {
    const { data } = await axiosClient.get<EnvironmentalEvidence>(`/evidences/${id}`)
    return data
  },

  async createEvidence(input: CreateEvidenceInput) {
    const { data } = await axiosClient.post<EnvironmentalEvidence>('/evidences', input)
    return data
  },

  async updateEvidence(id: string, input: UpdateEvidenceInput) {
    const { data } = await axiosClient.put<EnvironmentalEvidence>(`/evidences/${id}`, input)
    return data
  },

  async deleteEvidence(id: string) {
    await axiosClient.delete(`/evidences/${id}`)
  },

  async uploadEvidenceFile(file: Blob) {
    const formData = new FormData()
    formData.append('file', file)

    const { data } = await axiosClient.post<{ url: string; thumbnailUrl?: string }>('/evidences/upload', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
    return data
  },
}

