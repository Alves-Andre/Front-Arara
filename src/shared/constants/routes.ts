// src/shared/constants/routes.ts

/**
 * Rotas públicas (sem autenticação)
 */
export const PUBLIC_ROUTES = {
  LOGIN: '/login',
  REGISTER: '/register',
  HOME: '/',
}

/**
 * Rotas protegidas (com autenticação)
 */
export const PROTECTED_ROUTES = {
  DASHBOARD: '/dashboard',
  AREAS: '/dashboard/areas',
  AREAS_NEW: '/dashboard/areas/new',
  AREAS_DETAIL: (id: string) => `/dashboard/areas/${id}`,
  MONITORING: '/dashboard/monitoring',
  EVIDENCES: '/dashboard/evidences',
  SATELLITE: '/dashboard/satellite',
  ANALYSIS: '/dashboard/analysis',
  REQUESTS: '/dashboard/requests',
  SETTINGS: '/dashboard/settings',
  PROFILE: '/dashboard/profile',
}

/**
 * Rotas de erro
 */
export const ERROR_ROUTES = {
  NOT_FOUND: '/404',
  FORBIDDEN: '/403',
  SERVER_ERROR: '/500',
}
