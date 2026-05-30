import { axiosClient } from '@/shared/services/api/axiosClient'
import type { PaginatedResponse } from '@/shared/types'
import type { CreateSatelliteSceneInput, UpdateSatelliteSceneInput } from '../schemas/satelliteSchemas'
import type { SatelliteFilters, SatelliteScene } from '../types'

export const satelliteService = {
  async getScenes(page = 1, limit = 10, filters?: SatelliteFilters) {
    const { data } = await axiosClient.get<PaginatedResponse<SatelliteScene>>('/satellite/scenes', {
      params: { page, limit, ...filters },
    })
    return data
  },

  async getScene(id: string) {
    const { data } = await axiosClient.get<SatelliteScene>(`/satellite/scenes/${id}`)
    return data
  },

  async createScene(input: CreateSatelliteSceneInput) {
    const { data } = await axiosClient.post<SatelliteScene>('/satellite/scenes', input)
    return data
  },

  async updateScene(id: string, input: UpdateSatelliteSceneInput) {
    const { data } = await axiosClient.put<SatelliteScene>(`/satellite/scenes/${id}`, input)
    return data
  },

  async deleteScene(id: string) {
    await axiosClient.delete(`/satellite/scenes/${id}`)
  },

  async requestSceneSync(areaId: string) {
    const { data } = await axiosClient.post<{ jobId: string }>('/satellite/sync', { areaId })
    return data
  },
}

