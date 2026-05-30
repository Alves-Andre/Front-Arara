// src/shared/services/storage/storageService.ts

export const storageService = {
  // LocalStorage
  setItem(key: string, value: any) {
    try {
      const serialized = JSON.stringify(value)
      localStorage.setItem(key, serialized)
    } catch (error) {
      console.error(`Erro ao salvar no localStorage (${key}):`, error)
    }
  },

  getItem<T = any>(key: string, defaultValue?: T): T | null {
    try {
      const item = localStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue || null
    } catch (error) {
      console.error(`Erro ao recuperar do localStorage (${key}):`, error)
      return defaultValue || null
    }
  },

  removeItem(key: string) {
    try {
      localStorage.removeItem(key)
    } catch (error) {
      console.error(`Erro ao remover do localStorage (${key}):`, error)
    }
  },

  clear() {
    try {
      localStorage.clear()
    } catch (error) {
      console.error('Erro ao limpar localStorage:', error)
    }
  },

  // SessionStorage
  setSessionItem(key: string, value: any) {
    try {
      const serialized = JSON.stringify(value)
      sessionStorage.setItem(key, serialized)
    } catch (error) {
      console.error(`Erro ao salvar no sessionStorage (${key}):`, error)
    }
  },

  getSessionItem<T = any>(key: string, defaultValue?: T): T | null {
    try {
      const item = sessionStorage.getItem(key)
      return item ? JSON.parse(item) : defaultValue || null
    } catch (error) {
      console.error(`Erro ao recuperar do sessionStorage (${key}):`, error)
      return defaultValue || null
    }
  },

  removeSessionItem(key: string) {
    try {
      sessionStorage.removeItem(key)
    } catch (error) {
      console.error(`Erro ao remover do sessionStorage (${key}):`, error)
    }
  },
}
