// src/shared/types/api.ts

import type { AxiosError } from 'axios'

export interface ApiError extends AxiosError {
  status: number
  message: string
}

export interface PaginationParams {
  page?: number
  limit?: number
  offset?: number
}

export interface SortParams {
  sortBy?: string
  sortOrder?: 'asc' | 'desc'
}

export type QueryParams = PaginationParams & SortParams & Record<string, any>
