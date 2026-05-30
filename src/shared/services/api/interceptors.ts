// src/shared/services/api/interceptors.ts

import { AxiosInstance, AxiosError, AxiosResponse } from 'axios'
import { useAuthStore } from '../../stores/authStore'

export const setupInterceptors = (instance: AxiosInstance) => {
  // Request interceptor - Adicionar token
  instance.interceptors.request.use(
    (config) => {
      const token = useAuthStore.getState().token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  // Response interceptor - Tratar erros
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    async (error: AxiosError) => {
      if (error.response?.status === 401) {
        // Token expirado ou inválido
        useAuthStore.getState().logout()
        window.location.href = '/login'
      }

      if (error.response?.status === 403) {
        // Sem permissão
        console.error('Acesso negado')
      }

      return Promise.reject(error)
    }
  )
}
