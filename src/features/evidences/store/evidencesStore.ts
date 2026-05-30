import { create } from 'zustand'
import type { EvidenceFilters } from '../types'

interface EvidencesState {
  selectedEvidenceId: string | null
  filters: EvidenceFilters
  selectEvidence: (id: string | null) => void
  setFilters: (filters: Partial<EvidenceFilters>) => void
  resetFilters: () => void
}

export const useEvidencesStore = create<EvidencesState>((set) => ({
  selectedEvidenceId: null,
  filters: {},
  selectEvidence: (id) => set({ selectedEvidenceId: id }),
  setFilters: (filters) => set((state) => ({ filters: { ...state.filters, ...filters } })),
  resetFilters: () => set({ filters: {} }),
}))

