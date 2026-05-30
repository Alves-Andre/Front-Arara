import { z } from 'zod'

export const createSatelliteSceneSchema = z.object({
  areaId: z.string().min(1, 'Area obrigatoria'),
  provider: z.enum(['sentinel', 'landsat', 'custom']),
  date: z.coerce.date(),
  cloudCover: z.number().min(0).max(100),
  resolution: z.number().positive(),
  url: z.string().url('URL invalida'),
  indexData: z
    .object({
      ndvi: z.number().min(-1).max(1).optional(),
      ndbi: z.number().min(-1).max(1).optional(),
      ndmi: z.number().min(-1).max(1).optional(),
    })
    .optional(),
})

export const updateSatelliteSceneSchema = createSatelliteSceneSchema.partial()

export type CreateSatelliteSceneInput = z.infer<typeof createSatelliteSceneSchema>
export type UpdateSatelliteSceneInput = z.infer<typeof updateSatelliteSceneSchema>

