import { AlertCircle } from 'lucide-react'
import { Card, CardContent } from '@/shared/components/ui'

interface RecoveryAreaEmptyStateProps {
  message?: string
}

export const RecoveryAreaEmptyState = ({ message = 'Nenhuma area em recuperacao foi importada da SEMARH.' }: RecoveryAreaEmptyStateProps) => {
  return (
    <Card>
      <CardContent className="flex min-h-72 flex-col items-center justify-center px-6 py-12 text-center">
        <div className="mb-4 flex size-12 items-center justify-center rounded-lg bg-muted">
          <AlertCircle className="size-6 text-muted-foreground" />
        </div>
        <h2 className="text-lg font-semibold">Area nao encontrada</h2>
        <p className="mt-2 max-w-md text-sm text-muted-foreground">{message}</p>
      </CardContent>
    </Card>
  )
}

