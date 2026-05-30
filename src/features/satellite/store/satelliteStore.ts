import { create } from 'zustand'
import type { SatelliteFilters } from '../types'

interface SatelliteState {
  selectedSceneId: string | null
  activeIndex: 'rgb' | 'ndvi' | 'ndbi' | 'ndmi'
  filters: SatelliteFilters
  selectScene: (id: string | null) => void
  setActiveIndex: (index: SatelliteState['activeIndex']) => void
  setFilters: (filters: Partial<SatelliteFilters>) => void
  resetFilters: () => void
}

export const useSatelliteStore = create<SatelliteState>((set) => ({
  selectedSceneId: null,
  activeIndex: 'rgb',
  filters: {},
  selectScene: (id) => set({ selectedSceneId: id }),
  setActiveIndex: (index) => set({ activeIndex: index }),
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetFilters: () => set({ filters: {} }),
}))

