import { axiosClient } from '@/shared/services/api/axiosClient'
import type { PaginatedResponse } from '@/shared/types'
import type { CreateAnalysisInput, UpdateAnalysisInput } from '../schemas/analysisSchemas'
import type { AnalysisFilters, EnvironmentalAnalysis } from '../types'

export const analysisService = {
  async getAnalyses(page = 1, limit = 10, filters?: AnalysisFilters) {
    const { data } = await axiosClient.get<PaginatedResponse<EnvironmentalAnalysis>>('/analysis', {
      params: { page, limit, ...filters },
    })
    return data
  },

  async getAnalysis(id: string) {
    const { data } = await axiosClient.get<EnvironmentalAnalysis>(`/analysis/${id}`)
    return data
  },

  async createAnalysis(input: CreateAnalysisInput) {
    const { data } = await axiosClient.post<EnvironmentalAnalysis>('/analysis', input)
    return data
  },

  async updateAnalysis(id: string, input: UpdateAnalysisInput) {
    const { data } = await axiosClient.put<EnvironmentalAnalysis>(`/analysis/${id}`, input)
    return data
  },

  async deleteAnalysis(id: string) {
    await axiosClient.delete(`/analysis/${id}`)
  },

  async runAnalysis(id: string) {
    const { data } = await axiosClient.post<EnvironmentalAnalysis>(`/analysis/${id}/run`)
    return data
  },
}

