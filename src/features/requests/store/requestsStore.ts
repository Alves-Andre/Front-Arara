import { create } from 'zustand'
import type { RequestFilters } from '../types'

interface RequestsState {
  selectedRequestId: string | null
  filters: RequestFilters
  selectRequest: (id: string | null) => void
  setFilters: (filters: Partial<RequestFilters>) => void
  resetFilters: () => void
}

export const useRequestsStore = create<RequestsState>((set) => ({
  selectedRequestId: null,
  filters: {},
  selectRequest: (id) => set({ selectedRequestId: id }),
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetFilters: () => set({ filters: {} }),
}))

