import type { Metadata } from 'next'
import { RecoveryAreaPage } from '@/features/areas/components/recovery'

export const metadata: Metadata = {
  title: 'Area em Recuperacao | SEMARH',
  description: 'Visualizacao tecnica de area em recuperacao importada da SEMARH.',
}

export default function Page() {
  return <RecoveryAreaPage />
}
