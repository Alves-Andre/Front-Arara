// src/shared/stores/filterStore.ts

import { create } from 'zustand'

interface FilterState {
  // Areas filters
  areaStatus: string[]
  areaType: string[]

  // Monitoring filters
  monitoringType: string[]
  monitoringStatus: string[]
  dateRange: [string, string] | null

  // Global
  search: string

  // Actions
  setAreaStatus: (status: string[]) => void
  setAreaType: (type: string[]) => void
  setMonitoringType: (type: string[]) => void
  setMonitoringStatus: (status: string[]) => void
  setDateRange: (range: [string, string] | null) => void
  setSearch: (search: string) => void
  reset: () => void
}

const initialState = {
  areaStatus: [],
  areaType: [],
  monitoringType: [],
  monitoringStatus: [],
  dateRange: null,
  search: '',
}

export const useFilterStore = create<FilterState>((set) => ({
  ...initialState,

  setAreaStatus: (status) => set({ areaStatus: status }),
  setAreaType: (type) => set({ areaType: type }),
  setMonitoringType: (type) => set({ monitoringType: type }),
  setMonitoringStatus: (status) => set({ monitoringStatus: status }),
  setDateRange: (range) => set({ dateRange: range }),
  setSearch: (search) => set({ search }),

  reset: () => set(initialState),
}))
