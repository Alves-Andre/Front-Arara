// src/shared/lib/queryClient.ts

import { QueryClient } from '@tanstack/react-query'

export const createQueryClient = () => {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minuto
        gcTime: 5 * 60 * 1000, // 5 minutos
        retry: 1,
        refetchOnWindowFocus: false,
      },
      mutations: {
        retry: 1,
      },
    },
  })
}

let clientSingleton: QueryClient | undefined

export function getQueryClient() {
  if (typeof window === 'undefined') {
    // Servidor
    return createQueryClient()
  }

  if (!clientSingleton) {
    clientSingleton = createQueryClient()
  }

  return clientSingleton
}
