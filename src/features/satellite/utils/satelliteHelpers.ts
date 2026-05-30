import type { SatelliteScene } from '../types'

export const getSatelliteProviderLabel = (provider: SatelliteScene['provider']) => {
  const labels: Record<SatelliteScene['provider'], string> = {
    sentinel: 'Sentinel',
    landsat: 'Landsat',
    custom: 'Customizado',
  }

  return labels[provider]
}

export const isSceneUsableForAnalysis = (scene: SatelliteScene, maxCloudCover = 20) => {
  return scene.cloudCover <= maxCloudCover
}

