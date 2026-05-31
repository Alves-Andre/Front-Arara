import type { Property, PropertySearchResponse } from '../types'

interface SicarSearchResponse {
  properties: SicarFeature[]
  source: 'sicar'
  warning?: string
  error?: string
}

interface SicarFeature {
  type: 'Feature'
  geometry: {
    type: string
    coordinates: unknown
  } | null
  properties: Record<string, unknown>
}

const propertiesMock: Property[] = [
  {
    id: 'rec-area-001',
    car: 'CAR-TO-1721000-7F2B.99A1.443D.8E21',
    name: 'Fazenda Boa Esperanca',
    city: 'Palmas - TO',
    owner: 'Agropecuaria Serra Verde LTDA',
    totalArea: 428.6,
    recoveryArea: 86.4,
    status: 'monitoring',
    polygon: [
      [-10.2352, -48.3549],
      [-10.1958, -48.3511],
      [-10.1887, -48.3092],
      [-10.2308, -48.3027],
      [-10.2444, -48.3298],
    ],
    recoveryPolygon: [
      [-10.2218, -48.3354],
      [-10.2139, -48.3372],
      [-10.2086, -48.3295],
      [-10.2114, -48.3209],
      [-10.2197, -48.3228],
    ],
    protectionAreas: [
      {
        id: 'app-001',
        type: 'app',
        label: 'Area de Preservacao Permanente',
        area: 24.8,
        polygon: [
          [-10.232, -48.343],
          [-10.207, -48.339],
          [-10.201, -48.324],
          [-10.219, -48.317],
          [-10.238, -48.328],
        ],
      },
      {
        id: 'rl-001',
        type: 'legal_reserve',
        label: 'Reserva Legal',
        area: 92.6,
        polygon: [
          [-10.229, -48.351],
          [-10.198, -48.348],
          [-10.193, -48.333],
          [-10.218, -48.330],
          [-10.236, -48.338],
        ],
      },
    ],
  },
  {
    id: 'rec-area-002',
    car: 'CAR-TO-1721000-9C12.A871.552B.8C11',
    name: 'Fazenda Serra Verde',
    city: 'Palmas - TO',
    owner: 'Serra Verde Reflorestamento SA',
    totalArea: 312.9,
    recoveryArea: 42.7,
    status: 'analysis',
    polygon: [
      [-10.184, -48.382],
      [-10.157, -48.374],
      [-10.151, -48.337],
      [-10.188, -48.329],
      [-10.201, -48.358],
    ],
    recoveryPolygon: [
      [-10.181, -48.367],
      [-10.164, -48.363],
      [-10.162, -48.347],
      [-10.184, -48.343],
      [-10.191, -48.356],
    ],
    protectionAreas: [
      {
        id: 'app-002',
        type: 'app',
        label: 'Area de Preservacao Permanente',
        area: 17.2,
        polygon: [
          [-10.181, -48.377],
          [-10.158, -48.368],
          [-10.157, -48.352],
          [-10.185, -48.346],
          [-10.195, -48.36],
        ],
      },
    ],
  },
  {
    id: 'rec-area-003',
    car: 'CAR-TO-1721000-4A66.210F.8DB5.77E3',
    name: 'Fazenda Santa Fe',
    city: 'Porto Nacional - TO',
    owner: 'Santa Fe Agroambiental LTDA',
    totalArea: 587.2,
    recoveryArea: 118.3,
    status: 'awaiting_evidence',
    polygon: [
      [-10.33, -48.44],
      [-10.295, -48.432],
      [-10.287, -48.388],
      [-10.336, -48.379],
      [-10.356, -48.412],
    ],
    recoveryPolygon: [
      [-10.333, -48.426],
      [-10.306, -48.421],
      [-10.304, -48.398],
      [-10.337, -48.394],
      [-10.346, -48.414],
    ],
    protectionAreas: [
      {
        id: 'rl-003',
        type: 'legal_reserve',
        label: 'Reserva Legal',
        area: 126.4,
        polygon: [
          [-10.348, -48.432],
          [-10.303, -48.427],
          [-10.296, -48.402],
          [-10.337, -48.389],
          [-10.353, -48.414],
        ],
      },
    ],
  },
]

const normalizeSearch = (value: string) =>
  value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')

const normalizeCarCode = (value: string) => value.trim().toUpperCase().replace(/^CAR-/, '')

const asString = (value: unknown, fallback = '') => (typeof value === 'string' ? value : fallback)

const asNumber = (value: unknown, fallback = 0) => {
  if (typeof value === 'number') {
    return value
  }

  if (typeof value === 'string') {
    const parsed = Number(value.replace(',', '.'))
    return Number.isFinite(parsed) ? parsed : fallback
  }

  return fallback
}

const getPropertyValue = (properties: Record<string, unknown>, keys: string[], fallback = '') => {
  const entry = keys.find((key) => properties[key] !== undefined && properties[key] !== null)
  return entry ? properties[entry] : fallback
}

const getFirstPolygonRing = (geometry: SicarFeature['geometry']): [number, number][] => {
  if (!geometry || !Array.isArray(geometry.coordinates)) {
    return []
  }

  if (geometry.type === 'Polygon') {
    const rings = geometry.coordinates as unknown[]
    return Array.isArray(rings[0]) ? (rings[0] as [number, number][]) : []
  }

  if (geometry.type === 'MultiPolygon') {
    const polygons = geometry.coordinates as unknown[]
    const firstPolygon = polygons[0] as unknown[] | undefined
    return Array.isArray(firstPolygon?.[0]) ? (firstPolygon[0] as [number, number][]) : []
  }

  return []
}

const geoJsonRingToLatLng = (ring: [number, number][]) =>
  ring
    .filter((coordinate) => Array.isArray(coordinate) && coordinate.length >= 2)
    .map(([lng, lat]) => [lat, lng] as [number, number])

const mapSicarFeatureToProperty = (feature: SicarFeature): Property => {
  const rawProperties = feature.properties
  const car = asString(getPropertyValue(rawProperties, ['cod_imovel', 'codigoImovel']), '')
  const name = asString(getPropertyValue(rawProperties, ['nom_imovel', 'nomeImovel']), 'Imovel rural sem nome')
  const city = asString(getPropertyValue(rawProperties, ['nom_munici', 'municipio']), 'Tocantins')
  const owner = asString(getPropertyValue(rawProperties, ['nom_respon', 'nomeCadastrante']), 'Nao informado')
  const totalArea = asNumber(getPropertyValue(rawProperties, ['num_area', 'area_imove', 'areaTotalImovel', 'areaTotal']), 0)
  const polygon = geoJsonRingToLatLng(getFirstPolygonRing(feature.geometry))

  return {
    id: car || `sicar-${Date.now()}`,
    car: car.startsWith('CAR-') ? car : `CAR-${car}`,
    name,
    city,
    owner,
    totalArea,
    recoveryArea: 0,
    status: 'analysis',
    polygon,
    recoveryPolygon: [],
    protectionAreas: [],
  }
}

const mergeWithLocalRecoveryData = (property: Property) => {
  const localProperty = propertiesMock.find((mockProperty) => {
    return normalizeCarCode(mockProperty.car) === normalizeCarCode(property.car)
  })

  if (!localProperty) {
    return property
  }

  return {
    ...property,
    name: property.name === 'Imovel rural sem nome' ? localProperty.name : property.name,
    owner: property.owner === 'Nao informado' ? localProperty.owner : property.owner,
    recoveryArea: localProperty.recoveryArea,
    status: localProperty.status,
    recoveryPolygon: localProperty.recoveryPolygon,
    protectionAreas: localProperty.protectionAreas,
  }
}

export const searchPropertyService = {
  async searchByCar(query: string): Promise<PropertySearchResponse> {
    const normalizedQuery = normalizeSearch(query)

    if (!normalizedQuery) {
      return { properties: [] }
    }

    const localProperties = propertiesMock.filter((property) => {
      const normalizedCar = normalizeSearch(property.car)
      const normalizedName = normalizeSearch(property.name)
      const normalizedCity = normalizeSearch(property.city)

      return (
        normalizedCar.includes(normalizedQuery) ||
        normalizedName.includes(normalizedQuery) ||
        normalizedCity.includes(normalizedQuery)
      )
    })

    try {
      const response = await fetch(`/api/car/search?q=${encodeURIComponent(query)}`)

      if (!response.ok) {
        return { properties: localProperties }
      }

      const data = (await response.json()) as SicarSearchResponse
      const sicarProperties = data.properties
        .map(mapSicarFeatureToProperty)
        .filter((property) => property.polygon.length > 0)
        .map(mergeWithLocalRecoveryData)

      if (sicarProperties.length > 0) {
        return { properties: sicarProperties }
      }
    } catch {
      return { properties: localProperties }
    }

    return { properties: localProperties }
  },

  getSuggestions(query: string): Property[] {
    const normalizedQuery = normalizeSearch(query)

    if (normalizedQuery.length < 2) {
      return []
    }

    return propertiesMock
      .filter((property) => {
        const normalizedCar = normalizeSearch(property.car)
        const normalizedName = normalizeSearch(property.name)

        return normalizedCar.includes(normalizedQuery) || normalizedName.includes(normalizedQuery)
      })
      .slice(0, 5)
  },
}
