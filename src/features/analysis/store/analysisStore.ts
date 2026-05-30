import { create } from 'zustand'
import type { AnalysisFilters, EnvironmentalAnalysis } from '../types'

type AnalysisVisualizationType = NonNullable<EnvironmentalAnalysis['visualization']>['type']

interface AnalysisState {
  selectedAnalysisId: string | null
  activeVisualization: AnalysisVisualizationType | null
  filters: AnalysisFilters
  selectAnalysis: (id: string | null) => void
  setActiveVisualization: (type: AnalysisVisualizationType | null) => void
  setFilters: (filters: Partial<AnalysisFilters>) => void
  resetFilters: () => void
}

export const useAnalysisStore = create<AnalysisState>((set) => ({
  selectedAnalysisId: null,
  activeVisualization: null,
  filters: {},
  selectAnalysis: (id) => set({ selectedAnalysisId: id }),
  setActiveVisualization: (type) => set({ activeVisualization: type }),
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetFilters: () => set({ filters: {} }),
}))
