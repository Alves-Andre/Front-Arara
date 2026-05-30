import { z } from 'zod'

export const createAnalysisSchema = z.object({
  areaId: z.string().min(1, 'Area obrigatoria'),
  type: z.enum(['ndvi', 'ndbi', 'change_detection', 'classification', 'custom']),
  date: z.coerce.date(),
  status: z.enum(['pending', 'processing', 'completed', 'failed']).default('pending'),
  result: z.record(z.unknown()).optional(),
  visualization: z
    .object({
      type: z.enum(['raster', 'vector', 'chart']),
      url: z.string().url('URL invalida'),
    })
    .optional(),
})

export const updateAnalysisSchema = createAnalysisSchema.partial()

export type CreateAnalysisInput = z.infer<typeof createAnalysisSchema>
export type UpdateAnalysisInput = z.infer<typeof updateAnalysisSchema>

