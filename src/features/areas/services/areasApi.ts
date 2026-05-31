import { axiosClient } from '@/shared/services/api/axiosClient'
import { mapAffectedAreaToRecoveryArea } from '@/shared/services/api/mappers'
import type { RecoveryArea, RecoveryAreaResponse } from '../types'

export const areasApi = {
  /**
   * Fetches an affected area by ID and maps it to the frontend's RecoveryArea structure.
   */
  getImportedRecoveryArea: async (areaId?: string): Promise<RecoveryAreaResponse> => {
    // Workaround: As rotas de affected-areas estao dando 500, vamos extrair da rota de missions
    console.log('[areasApi] Fetching missions for areaId:', areaId)
    // Decode areaId if it's URL encoded (e.g. CAR code)
    const decodedAreaId = areaId ? decodeURIComponent(areaId) : undefined
    
    const listResponse = await axiosClient.get('/v1/missions?limit=50')
    const items = listResponse.data?.data || listResponse.data || []
    console.log('[areasApi] Missions fetched:', items.length)
    
    const missionsWithArea = items.filter((m: any) => m.affectedArea)
    console.log('[areasApi] Missions with area:', missionsWithArea.length)
    if (missionsWithArea.length === 0) {
      throw new Error('No affected areas found')
    }

    if (!areaId) {
      return {
        data: mapAffectedAreaToRecoveryArea(missionsWithArea[0].affectedArea),
      }
    }

    const mission = missionsWithArea.find((m: any) => {
      const id = m.affectedArea.id || ''
      const carCode = m.affectedArea.property?.carCode || ''
      const semarh = id.substring(0, 8).toUpperCase()
      const target = decodedAreaId || ''
      
      return id === target || 
             carCode.trim().toLowerCase() === target.trim().toLowerCase() ||
             semarh === target.trim().toUpperCase()
    })
    if (!mission) {
       throw new Error('Area not found')
    }

    return {
      data: mapAffectedAreaToRecoveryArea(mission.affectedArea),
    }
  },

  /**
   * Mock empty for empty states
   */
  getEmptyImportedRecoveryArea: async (): Promise<RecoveryAreaResponse> => {
    return {
      data: null,
    }
  },
}
