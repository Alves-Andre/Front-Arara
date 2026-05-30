// src/shared/types/common.ts

/**
 * Resposta padrão da API
 */
export interface ApiResponse<T = any> {
  success: boolean
  data: T
  message?: string
  errors?: Record<string, string[]>
}

/**
 * Resposta paginada
 */
export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    pages: number
  }
}

/**
 * Status de requisição
 */
export type RequestStatus = 'idle' | 'pending' | 'success' | 'error'

/**
 * Filtros comuns
 */
export interface CommonFilters {
  search?: string
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
  page?: number
  limit?: number
}

/**
 * Estados comuns
 */
export type Status = 'active' | 'inactive' | 'archived' | 'deleted'
