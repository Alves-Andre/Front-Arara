// src/features/areas/components/AreaForm.tsx

'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createAreaSchema, type CreateAreaInput } from '../schemas/areaSchemas'
import type { Area } from '../types'

interface AreaFormProps {
  onSubmit: (data: CreateAreaInput) => Promise<void>
  initialData?: Partial<Area>
  isLoading?: boolean
}

export const AreaForm = React.forwardRef<HTMLFormElement, AreaFormProps>(
  ({ onSubmit, initialData, isLoading }, ref) => {
    const {
      register,
      handleSubmit,
      formState: { errors, isSubmitting },
      watch,
    } = useForm<CreateAreaInput>({
      resolver: zodResolver(createAreaSchema),
      defaultValues: initialData as any,
    })

    const hectares = watch('hectares')

    return (
      <form ref={ref} onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Nome */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Nome da Área *
          </label>
          <input
            {...register('name')}
            id="name"
            type="text"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Ex: Mata Atlântica Sul"
          />
          {errors.name && <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>}
        </div>

        {/* Descrição */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Descrição *
          </label>
          <textarea
            {...register('description')}
            id="description"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Descrição detalhada da área"
            rows={4}
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        {/* Tipo de Área */}
        <div>
          <label htmlFor="areaType" className="block text-sm font-medium mb-1">
            Tipo de Área *
          </label>
          <select
            {...register('areaType')}
            id="areaType"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione um tipo</option>
            <option value="forest">Floresta</option>
            <option value="wetland">Área Úmida</option>
            <option value="grassland">Pastagem</option>
            <option value="urban">Urbana</option>
            <option value="other">Outra</option>
          </select>
          {errors.areaType && <p className="mt-1 text-sm text-red-500">{errors.areaType.message}</p>}
        </div>

        {/* Coordenadas */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="lat" className="block text-sm font-medium mb-1">
              Latitude *
            </label>
            <input
              {...register('coordinates.lat', { valueAsNumber: true })}
              id="lat"
              type="number"
              step="0.0001"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="-15.8267"
            />
            {errors.coordinates?.lat && (
              <p className="mt-1 text-sm text-red-500">{errors.coordinates.lat.message}</p>
            )}
          </div>
          <div>
            <label htmlFor="lng" className="block text-sm font-medium mb-1">
              Longitude *
            </label>
            <input
              {...register('coordinates.lng', { valueAsNumber: true })}
              id="lng"
              type="number"
              step="0.0001"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="-48.0"
            />
            {errors.coordinates?.lng && (
              <p className="mt-1 text-sm text-red-500">{errors.coordinates.lng.message}</p>
            )}
          </div>
        </div>

        {/* Hectares */}
        <div>
          <label htmlFor="hectares" className="block text-sm font-medium mb-1">
            Área em Hectares *
          </label>
          <input
            {...register('hectares', { valueAsNumber: true })}
            id="hectares"
            type="number"
            step="0.01"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="100"
          />
          {errors.hectares && <p className="mt-1 text-sm text-red-500">{errors.hectares.message}</p>}
        </div>

        {/* Status */}
        <div>
          <label htmlFor="status" className="block text-sm font-medium mb-1">
            Status *
          </label>
          <select
            {...register('status')}
            id="status"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Selecione um status</option>
            <option value="active">Ativa</option>
            <option value="inactive">Inativa</option>
            <option value="archived">Arquivada</option>
          </select>
          {errors.status && <p className="mt-1 text-sm text-red-500">{errors.status.message}</p>}
        </div>

        {/* Meta de Recuperação */}
        <div>
          <label htmlFor="recoveryTarget" className="block text-sm font-medium mb-1">
            Meta de Recuperação (%)
          </label>
          <input
            {...register('recoveryTarget', { valueAsNumber: true })}
            id="recoveryTarget"
            type="number"
            min="0"
            max="100"
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="80"
          />
          {errors.recoveryTarget && (
            <p className="mt-1 text-sm text-red-500">{errors.recoveryTarget.message}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || isLoading}
          className={`
            w-full px-4 py-2 rounded-lg font-medium text-white
            ${isSubmitting || isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'}
            transition
          `}
        >
          {isSubmitting || isLoading ? 'Salvando...' : 'Salvar Área'}
        </button>
      </form>
    )
  }
)

AreaForm.displayName = 'AreaForm'
