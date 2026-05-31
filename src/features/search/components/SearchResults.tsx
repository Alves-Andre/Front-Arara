import type { Property } from '../types'
import { PropertyCard } from './PropertyCard'

interface SearchResultsProps {
  properties: Property[]
}

export const SearchResults = ({ properties }: SearchResultsProps) => {
  return (
    <section className="space-y-4">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.16em] text-slate-500">Resultados</p>
          <h2 className="mt-1 text-2xl font-semibold text-slate-950">Propriedades localizadas</h2>
        </div>
        <p className="text-sm text-slate-600">
          {properties.length} {properties.length === 1 ? 'registro encontrado' : 'registros encontrados'}
        </p>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </section>
  )
}
