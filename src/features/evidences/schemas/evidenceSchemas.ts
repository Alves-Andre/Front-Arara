import { z } from 'zod'

export const createEvidenceSchema = z.object({
  areaId: z.string().min(1, 'Area obrigatoria'),
  monitoringEventId: z.string().optional(),
  type: z.enum(['photo', 'video', 'document', 'satellite_image']),
  url: z.string().url('URL invalida'),
  thumbnailUrl: z.string().url('URL invalida').optional(),
  caption: z.string().max(500).optional(),
  date: z.coerce.date(),
  coordinates: z
    .object({
      lat: z.number().min(-90).max(90),
      lng: z.number().min(-180).max(180),
    })
    .optional(),
  metadata: z.record(z.unknown()).optional(),
})

export const updateEvidenceSchema = createEvidenceSchema.partial()

export type CreateEvidenceInput = z.infer<typeof createEvidenceSchema>
export type UpdateEvidenceInput = z.infer<typeof updateEvidenceSchema>

