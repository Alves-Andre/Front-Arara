// src/features/areas/schemas/areaSchemas.ts

import { z } from 'zod'

export const coordinatesSchema = z.object({
  lat: z.number().min(-90).max(90, 'Latitude inválida'),
  lng: z.number().min(-180).max(180, 'Longitude inválida'),
})

export const createAreaSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres').max(100),
  description: z.string().min(10, 'Descrição deve ter pelo menos 10 caracteres').max(1000),
  coordinates: coordinatesSchema,
  areaType: z.enum(['forest', 'wetland', 'grassland', 'urban', 'other']),
  hectares: z.number().positive('Hectares deve ser positivo'),
  status: z.enum(['active', 'inactive', 'archived']),
  recoveryTarget: z.number().min(0).max(100).optional(),
})

export const updateAreaSchema = createAreaSchema.partial()

export type CreateAreaInput = z.infer<typeof createAreaSchema>
export type UpdateAreaInput = z.infer<typeof updateAreaSchema>
export type Coordinates = z.infer<typeof coordinatesSchema>
