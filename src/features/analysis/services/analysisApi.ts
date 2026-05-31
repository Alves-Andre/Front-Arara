import { axiosClient } from '@/shared/services/api/axiosClient'
import type { RecoveryAnalysisDataset, MonitoringPointEvidence, TemporalPeriod, EvidenceDirection } from '../types'
import { mapAffectedAreaToRecoveryArea } from '@/shared/services/api/mappers'

/**
 * Helper to fetch a real satellite image from our backend, 
 * or fallback to Esri World Imagery if not available/error.
 */
const fetchSatelliteImage = async (lat: number, lon: number, date: string): Promise<string> => {
  try {
    const res = await axiosClient.get('/v1/external-observations/satellite-imagery', {
      params: { lat, lon, date }
    })
    return res.data?.url || `https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/16/${Math.floor(lat)}/${Math.floor(lon)}`
  } catch {
    // Fallback if backend doesn't have it implemented yet
    return 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'
  }
}

export const analysisApi = {
  getAnalysisDataset: async (areaId?: string): Promise<RecoveryAnalysisDataset> => {
    // 1. Fetch Area (Workaround using missions because affected-areas is 500)
    const listResponse = await axiosClient.get('/v1/missions?limit=50')
    const items = listResponse.data?.data || listResponse.data || []
    const missionsWithArea = items.filter((m: any) => m.affectedArea)
    
    if (missionsWithArea.length === 0) throw new Error('Área não encontrada')

    const decodedAreaId = areaId ? decodeURIComponent(areaId) : undefined

    const affectedArea = decodedAreaId 
      ? missionsWithArea.find((m: any) => {
          const id = m.affectedArea.id || ''
          const carCode = m.affectedArea.property?.carCode || ''
          const semarh = id.substring(0, 8).toUpperCase()
          const target = decodedAreaId || ''
          
          return id === target || 
                 carCode.trim().toLowerCase() === target.trim().toLowerCase() ||
                 semarh === target.trim().toUpperCase()
        })?.affectedArea
      : missionsWithArea[0].affectedArea

    if (!affectedArea) throw new Error('Área não encontrada')

    const mappedArea = mapAffectedAreaToRecoveryArea(affectedArea)

    // 2. Fetch Collection Points
    // Depending on backend filters, we might need ?areaId=${affectedArea.id}
    // Assuming the backend supports it or we just fetch all for MVP
    const pointsRes = await axiosClient.get(`/v1/collection-points?limit=50`)
    const collectionPoints = pointsRes.data?.data || []

    // 3. Mount Timeline
    const today = new Date()
    const lastMonth = new Date(today)
    lastMonth.setMonth(today.getMonth() - 1)

    const timeline: TemporalPeriod[] = [
      {
        id: 'p1',
        label: 'Atual',
        daysAgo: 0,
        capturedAt: today.toISOString(),
      },
      {
        id: 'p2',
        label: 'Anterior',
        daysAgo: 30,
        capturedAt: lastMonth.toISOString(),
      }
    ]

    // 4. Map Collection Points and Evidences
    const monitoringPoints: MonitoringPointEvidence[] = await Promise.all(
      collectionPoints.map(async (cp: any, index: number) => {
        // Fetch evidences for this collection point
        // /v1/evidences?collectionPointId=cp.id
        const evidenceRes = await axiosClient.get(`/v1/evidences?limit=10`) // Mocking filter for MVP
        const evidences = evidenceRes.data?.data || []

        const photos: Record<EvidenceDirection, any> = {
          north: { id: 'n', direction: 'north', title: 'Norte', imageUrl: '', capturedAt: cp.createdAt },
          south: { id: 's', direction: 'south', title: 'Sul', imageUrl: '', capturedAt: cp.createdAt },
          east: { id: 'e', direction: 'east', title: 'Leste', imageUrl: '', capturedAt: cp.createdAt },
          west: { id: 'w', direction: 'west', title: 'Oeste', imageUrl: '', capturedAt: cp.createdAt },
        }

        evidences.forEach((ev: any) => {
          if (ev.direction && photos[ev.direction as EvidenceDirection]) {
            photos[ev.direction as EvidenceDirection].imageUrl = ev.fileUrl || ''
            photos[ev.direction as EvidenceDirection].id = ev.id
          }
        })

        // Fake satellite fallback for MVP if backend is slow
        const lat = cp.geom?.coordinates?.[1] || 0
        const lon = cp.geom?.coordinates?.[0] || 0

        return {
          id: cp.id,
          code: cp.name || `P${index + 1}`,
          latitude: lat,
          longitude: lon,
          owner: affectedArea.property?.ownerName || 'Proprietário',
          observations: cp.description || '',
          status: 'adequate',
          createdAt: cp.createdAt || new Date().toISOString(),
          photos,
          hasPanorama: false,
          satellite: {
            currentDate: timeline[0].capturedAt,
            previousDate: timeline[1].capturedAt,
            currentImageUrl: await fetchSatelliteImage(lat, lon, timeline[0].capturedAt),
            previousImageUrl: await fetchSatelliteImage(lat, lon, timeline[1].capturedAt),
            ndviTrend: 0.05,
          }
        }
      })
    )

    return {
      area: {
        id: mappedArea.id,
        semarhCode: mappedArea.semarhCode,
        name: mappedArea.name,
        propertyName: mappedArea.property.name,
        owner: mappedArea.property.owner,
        municipality: mappedArea.property.municipality,
        totalAreaHectares: mappedArea.totalAreaHectares,
        recoveryAreaHectares: mappedArea.recoveryAreaHectares,
        propertyBoundary: mappedArea.property.boundary,
        recoveryPolygon: mappedArea.polygon,
        centroid: mappedArea.centroid,
      },
      monitoringPoints,
      timeline,
    }
  }
}
