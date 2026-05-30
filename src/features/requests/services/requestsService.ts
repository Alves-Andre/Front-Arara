import { axiosClient } from '@/shared/services/api/axiosClient'
import type { PaginatedResponse } from '@/shared/types'
import type { CreateRequestInput, UpdateRequestInput } from '../schemas/requestSchemas'
import type { EnvironmentalRequest, RequestFilters } from '../types'

export const requestsService = {
  async getRequests(page = 1, limit = 10, filters?: RequestFilters) {
    const { data } = await axiosClient.get<PaginatedResponse<EnvironmentalRequest>>('/requests', {
      params: { page, limit, ...filters },
    })
    return data
  },

  async getRequest(id: string) {
    const { data } = await axiosClient.get<EnvironmentalRequest>(`/requests/${id}`)
    return data
  },

  async createRequest(input: CreateRequestInput) {
    const { data } = await axiosClient.post<EnvironmentalRequest>('/requests', input)
    return data
  },

  async updateRequest(id: string, input: UpdateRequestInput) {
    const { data } = await axiosClient.put<EnvironmentalRequest>(`/requests/${id}`, input)
    return data
  },

  async deleteRequest(id: string) {
    await axiosClient.delete(`/requests/${id}`)
  },

  async transitionRequestStatus(id: string, status: EnvironmentalRequest['status'], notes?: string) {
    const { data } = await axiosClient.patch<EnvironmentalRequest>(`/requests/${id}/status`, { status, notes })
    return data
  },
}

