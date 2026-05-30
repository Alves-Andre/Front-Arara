// src/shared/stores/uiStore.ts

import { create } from 'zustand'

interface UIState {
  // Sidebar
  sidebarOpen: boolean
  setSidebarOpen: (value: boolean) => void
  toggleSidebar: () => void

  // Notifications
  notifications: Array<{
    id: string
    type: 'success' | 'error' | 'warning' | 'info'
    message: string
    duration?: number
  }>
  addNotification: (notification: Omit<UIState['notifications'][0], 'id'>) => void
  removeNotification: (id: string) => void

  // Modal
  modals: Record<string, boolean>
  openModal: (name: string) => void
  closeModal: (name: string) => void
  toggleModal: (name: string) => void

  // Loading
  isLoading: boolean
  setIsLoading: (value: boolean) => void
}

export const useUIStore = create<UIState>((set) => ({
  // Sidebar
  sidebarOpen: true,
  setSidebarOpen: (value) => set({ sidebarOpen: value }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),

  // Notifications
  notifications: [],
  addNotification: (notification) =>
    set((state) => ({
      notifications: [
        ...state.notifications,
        {
          ...notification,
          id: `${Date.now()}`,
        },
      ],
    })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),

  // Modal
  modals: {},
  openModal: (name) => set((state) => ({ modals: { ...state.modals, [name]: true } })),
  closeModal: (name) => set((state) => ({ modals: { ...state.modals, [name]: false } })),
  toggleModal: (name) =>
    set((state) => ({
      modals: { ...state.modals, [name]: !state.modals[name] },
    })),

  // Loading
  isLoading: false,
  setIsLoading: (value) => set({ isLoading: value }),
}))
