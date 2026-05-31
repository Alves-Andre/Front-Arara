import type { Metadata } from 'next'
import { RecoveryAreaPage } from '@/features/areas/components/recovery'

interface AreaDetailPageProps {
  params: Promise<{
    id: string
  }>
}

export const metadata: Metadata = {
  title: 'Area em Recuperacao | ARARA',
  description: 'Visualizacao territorial da area em recuperacao selecionada.',
}

export default async function AreaDetailPage({ params }: AreaDetailPageProps) {
  const { id } = await params

  return <RecoveryAreaPage areaId={id} />
}
