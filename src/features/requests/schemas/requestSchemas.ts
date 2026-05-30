import { z } from 'zod'

export const createRequestSchema = z.object({
  areaId: z.string().min(1, 'Area obrigatoria'),
  title: z.string().min(3, 'Titulo deve ter pelo menos 3 caracteres').max(120),
  description: z.string().min(10, 'Descricao deve ter pelo menos 10 caracteres').max(2000),
  requestType: z.enum(['monitoring', 'analysis', 'intervention', 'inspection']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']),
  startDate: z.coerce.date(),
  targetEndDate: z.coerce.date(),
  assignedTo: z.string().optional(),
  notes: z.string().max(2000).optional(),
})

export const updateRequestSchema = createRequestSchema.partial().extend({
  status: z.enum(['submitted', 'approved', 'rejected', 'in_progress', 'completed']).optional(),
  completionDate: z.coerce.date().optional(),
})

export type CreateRequestInput = z.infer<typeof createRequestSchema>
export type UpdateRequestInput = z.infer<typeof updateRequestSchema>

