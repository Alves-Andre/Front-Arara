// src/features/areas/hooks/useCreateArea.ts

import { useMutation, useQueryClient } from '@tanstack/react-query'
import { areasService } from '../services/areasService'
import { useUIStore } from '@/shared/stores/uiStore'
import type { CreateAreaInput } from '../schemas/areaSchemas'

export const useCreateArea = () => {
  const queryClient = useQueryClient()
  const { addNotification } = useUIStore()

  return useMutation({
    mutationFn: (input: CreateAreaInput) => areasService.createArea(input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['areas'] })
      addNotification({
        type: 'success',
        message: 'Área criada com sucesso',
        duration: 3000,
      })
    },
    onError: (error: any) => {
      addNotification({
        type: 'error',
        message: error.response?.data?.message || 'Erro ao criar área',
        duration: 3000,
      })
    },
  })
}

export const useUpdateArea = () => {
  const queryClient = useQueryClient()
  const { addNotification } = useUIStore()

  return useMutation({
    mutationFn: (vars: { id: string; input: Partial<CreateAreaInput> }) =>
      areasService.updateArea(vars.id, vars.input),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['areas'] })
      queryClient.invalidateQueries({ queryKey: ['areas', data.id] })
      addNotification({
        type: 'success',
        message: 'Área atualizada com sucesso',
        duration: 3000,
      })
    },
    onError: (error: any) => {
      addNotification({
        type: 'error',
        message: error.response?.data?.message || 'Erro ao atualizar área',
        duration: 3000,
      })
    },
  })
}

export const useDeleteArea = () => {
  const queryClient = useQueryClient()
  const { addNotification } = useUIStore()

  return useMutation({
    mutationFn: (id: string) => areasService.deleteArea(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['areas'] })
      addNotification({
        type: 'success',
        message: 'Área deletada com sucesso',
        duration: 3000,
      })
    },
    onError: (error: any) => {
      addNotification({
        type: 'error',
        message: error.response?.data?.message || 'Erro ao deletar área',
        duration: 3000,
      })
    },
  })
}
