import type { EnvironmentalEvidence } from '../types'

export const getEvidenceTypeLabel = (type: EnvironmentalEvidence['type']) => {
  const labels: Record<EnvironmentalEvidence['type'], string> = {
    photo: 'Foto',
    video: 'Video',
    document: 'Documento',
    satellite_image: 'Imagem de satelite',
  }

  return labels[type]
}

