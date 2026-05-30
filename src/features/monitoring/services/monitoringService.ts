import { axiosClient } from '@/shared/services/api/axiosClient'
import type { PaginatedResponse } from '@/shared/types'
import type { CreateMonitoringInput, UpdateMonitoringInput } from '../schemas/monitoringSchemas'
import type { Monitoring, MonitoringFilters } from '../types'

export const monitoringService = {
  async getMonitoringEvents(page = 1, limit = 10, filters?: MonitoringFilters) {
    const { data } = await axiosClient.get<PaginatedResponse<Monitoring>>('/monitoring', {
      params: { page, limit, ...filters },
    })
    return data
  },

  async getMonitoringEvent(id: string) {
    const { data } = await axiosClient.get<Monitoring>(`/monitoring/${id}`)
    return data
  },

  async createMonitoringEvent(input: CreateMonitoringInput) {
    const { data } = await axiosClient.post<Monitoring>('/monitoring', input)
    return data
  },

  async updateMonitoringEvent(id: string, input: UpdateMonitoringInput) {
    const { data } = await axiosClient.put<Monitoring>(`/monitoring/${id}`, input)
    return data
  },

  async deleteMonitoringEvent(id: string) {
    await axiosClient.delete(`/monitoring/${id}`)
  },
}

