import { NextResponse } from 'next/server'

const SICAR_WFS_URL = 'https://geoserver.car.gov.br/geoserver/sicar/ows'
const TOCANTINS_TYPENAME = 'sicar:sicar_imoveis_to'

type GeoJsonGeometry = {
  type: string
  coordinates: unknown
}

interface SicarFeature {
  type: 'Feature'
  geometry: GeoJsonGeometry | null
  properties: Record<string, unknown>
}

interface SicarFeatureCollection {
  type: 'FeatureCollection'
  features: SicarFeature[]
}

const normalizeCarQuery = (query: string) =>
  query
    .trim()
    .toUpperCase()
    .replace(/^CAR-/, '')
    .replace(/[^A-Z0-9.-]/g, '')

const escapeCqlLiteral = (value: string) => value.replace(/'/g, "''")

const buildCqlFilter = (query: string) => {
  const normalizedQuery = normalizeCarQuery(query)

  if (!normalizedQuery || !normalizedQuery.startsWith('TO-')) {
    return null
  }

  const escaped = escapeCqlLiteral(normalizedQuery)

  if (escaped.length >= 42) {
    return `cod_imovel = '${escaped}'`
  }

  return `cod_imovel LIKE '%${escaped}%'`
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const query = searchParams.get('q') ?? ''
  const cqlFilter = buildCqlFilter(query)

  if (!cqlFilter) {
    return NextResponse.json({
      properties: [],
      source: 'sicar',
      warning: 'A busca real do SICAR esta limitada a codigos CAR do Tocantins iniciados por TO- ou CAR-TO-.',
    })
  }

  const params = new URLSearchParams({
    service: 'WFS',
    version: '1.0.0',
    request: 'GetFeature',
    typeName: TOCANTINS_TYPENAME,
    outputFormat: 'application/json',
    maxFeatures: '10',
    CQL_FILTER: cqlFilter,
  })

  const response = await fetch(`${SICAR_WFS_URL}?${params.toString()}`, {
    headers: {
      Accept: 'application/json',
      'Cache-Control': 'no-cache',
    },
    next: {
      revalidate: 60 * 60,
    },
  })

  if (!response.ok) {
    return NextResponse.json(
      {
        properties: [],
        source: 'sicar',
        error: 'Nao foi possivel consultar o geosservico publico do SICAR.',
      },
      { status: 502 }
    )
  }

  const data = (await response.json()) as SicarFeatureCollection

  return NextResponse.json({
    properties: data.features ?? [],
    source: 'sicar',
  })
}
