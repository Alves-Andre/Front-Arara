// src/features/areas/services/areasService.ts

import { axiosClient } from '@/shared/services/api/axiosClient'
import type { Area, PaginatedResponse } from '@/shared/types'
import type { CreateAreaInput, UpdateAreaInput } from '../schemas/areaSchemas'

export const areasService = {
  /**
   * Buscar todas as áreas com paginação
   */
  async getAreas(page = 1, limit = 10, filters?: Record<string, any>) {
    const { data } = await axiosClient.get<PaginatedResponse<Area>>('/areas', {
      params: { page, limit, ...filters },
    })
    return data
  },

  /**
   * Buscar uma área específica
   */
  async getArea(id: string) {
    const { data } = await axiosClient.get<Area>(`/areas/${id}`)
    return data
  },

  /**
   * Buscar fila de vistorias priorizada (Analista SEMARH)
   */
  async getComplianceQueue() {
    const { data } = await axiosClient.get('/v1/compliances/queue')
    return data
  },

  /**
   * Criar uma nova área
   */
  async createArea(input: CreateAreaInput) {
    const { data } = await axiosClient.post<Area>('/areas', input)
    return data
  },

  /**
   * Atualizar uma área
   */
  async updateArea(id: string, input: UpdateAreaInput) {
    const { data } = await axiosClient.put<Area>(`/areas/${id}`, input)
    return data
  },

  /**
   * Deletar uma área
   */
  async deleteArea(id: string) {
    await axiosClient.delete(`/areas/${id}`)
  },

  /**
   * Buscar estatísticas de áreas
   */
  async getAreasStats() {
    const { data } = await axiosClient.get('/areas/stats')
    return data
  },

  /**
   * Buscar áreas por localização (proximidade)
   */
  async getNearbyAreas(lat: number, lng: number, radius: number = 10) {
    const { data } = await axiosClient.get<Area[]>('/areas/nearby', {
      params: { lat, lng, radius },
    })
    return data
  },
}
