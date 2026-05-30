import type { RecoveryArea, RecoveryAreaResponse } from '../types'

const semarhRecoveryArea: RecoveryArea = {
  id: 'rec-area-001',
  semarhCode: 'SEMARH-AR-2026-0001',
  name: 'Area em Recuperacao - Fazenda Boa Esperanca',
  totalAreaHectares: 428.6,
  recoveryAreaHectares: 86.4,
  createdAt: '2026-05-12T10:30:00.000Z',
  importedAt: '2026-05-30T13:42:00.000Z',
  monitoringStatus: 'monitoring',
  centroid: [-10.2147, -48.3274],
  polygon: [
    [-10.2218, -48.3354],
    [-10.2139, -48.3372],
    [-10.2086, -48.3295],
    [-10.2114, -48.3209],
    [-10.2197, -48.3228],
  ],
  property: {
    id: 'prop-001',
    name: 'Fazenda Boa Esperanca',
    owner: 'Agropecuaria Serra Verde LTDA',
    municipality: 'Palmas - TO',
    registrationCode: 'CAR-TO-1721000-7F2B.99A1.443D.8E21',
    boundary: [
      [-10.2352, -48.3549],
      [-10.1958, -48.3511],
      [-10.1887, -48.3092],
      [-10.2308, -48.3027],
      [-10.2444, -48.3298],
    ],
  },
}

const wait = (milliseconds: number) =>
  new Promise((resolve) => {
    setTimeout(resolve, milliseconds)
  })

export const recoveryAreaMockApi = {
  async getImportedRecoveryArea(): Promise<RecoveryAreaResponse> {
    await wait(650)
    return { data: semarhRecoveryArea }
  },

  async getEmptyImportedRecoveryArea(): Promise<RecoveryAreaResponse> {
    await wait(350)
    return { data: null }
  },
}
