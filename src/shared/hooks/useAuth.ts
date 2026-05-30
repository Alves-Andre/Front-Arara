// src/shared/hooks/useAuth.ts

import { useCallback } from 'react'
import { useAuthStore } from '../stores/authStore'

export const useAuth = () => {
  const { user, token, isAuthenticated, isLoading, logout } = useAuthStore()

  const hasRole = useCallback(
    (role: string | string[]) => {
      if (!user) return false

      if (typeof role === 'string') {
        return user.role === role
      }

      return role.includes(user.role)
    },
    [user]
  )

  const hasPermission = useCallback(
    (permission: string | string[]) => {
      if (!user) return false

      // Implementar lógica de permissões
      // Isso dependerá da sua estrutura de permissões
      return true
    },
    [user]
  )

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    logout,
    hasRole,
    hasPermission,
  }
}
