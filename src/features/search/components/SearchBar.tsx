'use client'

import { FormEvent, useState } from 'react'
import { Search, X } from 'lucide-react'
import { Button } from '@/shared/components'
import { cn } from '@/shared/utils/cn'
import type { Property } from '../types'

interface SearchBarProps {
  query: string
  suggestions: Property[]
  onQueryChange: (query: string) => void
  onSearch: (query?: string) => void
}

export const SearchBar = ({ query, suggestions, onQueryChange, onSearch }: SearchBarProps) => {
  const [isFocused, setIsFocused] = useState(false)
  const shouldShowSuggestions = isFocused && suggestions.length > 0

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    onSearch(query)
    setIsFocused(false)
  }

  const selectSuggestion = (property: Property) => {
    onQueryChange(property.car)
    onSearch(property.car)
    setIsFocused(false)
  }

  return (
    <form onSubmit={handleSubmit} className="relative mx-auto w-full max-w-4xl">
      <div className="flex flex-col gap-3 rounded-lg border border-slate-200 bg-white p-3 shadow-xl shadow-slate-900/10 sm:flex-row">
        <div className="relative flex min-h-14 flex-1 items-center">
          <Search className="absolute left-4 size-5 text-slate-400" />
          <input
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            onFocus={() => setIsFocused(true)}
            placeholder="Digite o numero do CAR"
            className="h-14 w-full rounded-md border border-slate-200 bg-slate-50 pl-12 pr-11 text-base font-medium text-slate-950 outline-none transition focus:border-primary focus:bg-white focus:ring-4 focus:ring-primary/10"
          />
          {query && (
            <button
              type="button"
              onClick={() => onQueryChange('')}
              className="absolute right-3 flex size-8 items-center justify-center rounded-md text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
              aria-label="Limpar busca"
            >
              <X className="size-4" />
            </button>
          )}
        </div>

        <Button type="submit" size="lg" className="min-h-14 px-8">
          Buscar
        </Button>
      </div>

      {shouldShowSuggestions && (
        <div className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-20 overflow-hidden rounded-lg border border-slate-200 bg-white shadow-xl">
          <div className="border-b border-slate-100 px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] text-slate-500">
            Sugestoes
          </div>
          {suggestions.map((property) => (
            <button
              key={property.id}
              type="button"
              onMouseDown={(event) => event.preventDefault()}
              onClick={() => selectSuggestion(property)}
              className={cn(
                'flex w-full flex-col gap-1 px-4 py-3 text-left transition hover:bg-sky-50',
                'focus:bg-sky-50 focus:outline-none'
              )}
            >
              <span className="font-medium text-slate-950">{property.name}</span>
              <span className="text-sm text-slate-500">{property.car}</span>
            </button>
          ))}
        </div>
      )}
    </form>
  )
}
