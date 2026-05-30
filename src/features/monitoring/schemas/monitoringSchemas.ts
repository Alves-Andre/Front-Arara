import { z } from 'zod'

export const monitoringDataSchema = z.record(z.union([z.string(), z.number(), z.boolean(), z.null()]))

export const createMonitoringSchema = z.object({
  areaId: z.string().min(1, 'Area obrigatoria'),
  date: z.coerce.date(),
  type: z.enum(['inspection', 'measurement', 'analysis']),
  status: z.enum(['pending', 'in_progress', 'completed', 'failed']),
  data: monitoringDataSchema.default({}),
  notes: z.string().max(2000).optional(),
})

export const updateMonitoringSchema = createMonitoringSchema.partial()

export type CreateMonitoringInput = z.infer<typeof createMonitoringSchema>
export type UpdateMonitoringInput = z.infer<typeof updateMonitoringSchema>

