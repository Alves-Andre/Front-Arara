import { create } from 'zustand'
import type { MonitoringFilters } from '../types'

interface MonitoringState {
  selectedEventId: string | null
  filters: MonitoringFilters
  selectEvent: (id: string | null) => void
  setFilters: (filters: Partial<MonitoringFilters>) => void
  resetFilters: () => void
}

export const useMonitoringStore = create<MonitoringState>((set) => ({
  selectedEventId: null,
  filters: {},
  selectEvent: (id) => set({ selectedEventId: id }),
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetFilters: () => set({ filters: {} }),
}))

