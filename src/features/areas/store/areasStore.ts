// src/features/areas/store/areasStore.ts

import { create } from 'zustand'
import type { Area } from '../types'

interface AreasState {
  // State
  selectedAreaId: string | null
  selectedAreas: string[]
  filters: {
    status?: string[]
    areaType?: string[]
    search?: string
  }

  // Actions
  selectArea: (id: string) => void
  deselectArea: (id: string) => void
  toggleAreaSelection: (id: string) => void
  clearSelection: () => void
  setFilters: (filters: Partial<AreasState['filters']>) => void
  resetFilters: () => void
}

const initialState = {
  selectedAreaId: null,
  selectedAreas: [],
  filters: {},
}

export const useAreasStore = create<AreasState>((set) => ({
  ...initialState,

  selectArea: (id) => set({ selectedAreaId: id }),

  deselectArea: (id) =>
    set((state) => ({
      selectedAreas: state.selectedAreas.filter((aid) => aid !== id),
    })),

  toggleAreaSelection: (id) =>
    set((state) => ({
      selectedAreas: state.selectedAreas.includes(id)
        ? state.selectedAreas.filter((aid) => aid !== id)
        : [...state.selectedAreas, id],
    })),

  clearSelection: () =>
    set({
      selectedAreaId: null,
      selectedAreas: [],
    }),

  setFilters: (filters) =>
    set((state) => ({
      filters: { ...state.filters, ...filters },
    })),

  resetFilters: () =>
    set({
      filters: {},
    }),
}))
