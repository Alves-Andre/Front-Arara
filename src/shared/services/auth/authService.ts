// src/shared/services/auth/authService.ts

import { axiosClient } from '../api/axiosClient'
import { useAuthStore } from '../../stores/authStore'
import type { LoginRequest, LoginResponse, User } from '../../types'

export const authService = {
  async login(credentials: LoginRequest) {
    const { data } = await axiosClient.post<LoginResponse>('/auth/login', credentials)

    useAuthStore.setState({
      token: data.token,
      user: data.user,
      isAuthenticated: true,
    })

    localStorage.setItem('authToken', data.token)

    return data
  },

  async logout() {
    try {
      await axiosClient.post('/auth/logout')
    } catch (error) {
      console.error('Erro ao fazer logout:', error)
    }

    useAuthStore.getState().logout()
    localStorage.removeItem('authToken')
  },

  async getCurrentUser() {
    const { data } = await axiosClient.get<User>('/auth/me')
    useAuthStore.setState({ user: data })
    return data
  },

  async refreshToken() {
    const { data } = await axiosClient.post<LoginResponse>('/auth/refresh')

    useAuthStore.setState({
      token: data.token,
      user: data.user,
    })

    localStorage.setItem('authToken', data.token)

    return data
  },

  getToken() {
    return useAuthStore.getState().token || localStorage.getItem('authToken')
  },

  isAuthenticated() {
    return useAuthStore.getState().isAuthenticated
  },
}
