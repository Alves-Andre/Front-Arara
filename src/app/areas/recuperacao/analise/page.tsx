import type { Metadata } from 'next'
import { EnvironmentalRecoveryAnalysisPage } from '@/features/analysis'

export const metadata: Metadata = {
  title: 'Vistoria de Recuperacao Ambiental | SEMARH',
  description: 'Vistoria virtual de evidencias de campo e imagens satelitais para recuperacao ambiental.',
}

export default function Page() {
  return <EnvironmentalRecoveryAnalysisPage />
}
