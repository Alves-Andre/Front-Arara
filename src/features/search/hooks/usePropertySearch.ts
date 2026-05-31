'use client'

import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { searchPropertyService } from '../services'

const PROPERTY_SEARCH_QUERY_KEY = ['property-search']

export const usePropertySearch = () => {
  const [query, setQuery] = useState('')
  const [submittedQuery, setSubmittedQuery] = useState('')

  const searchQuery = useQuery({
    queryKey: [...PROPERTY_SEARCH_QUERY_KEY, submittedQuery],
    queryFn: () => searchPropertyService.searchByCar(submittedQuery),
    enabled: submittedQuery.trim().length > 0,
  })

  const suggestions = useMemo(() => searchPropertyService.getSuggestions(query), [query])

  const search = (value = query) => {
    setSubmittedQuery(value.trim())
  }

  return {
    query,
    setQuery,
    submittedQuery,
    suggestions,
    search,
    results: searchQuery.data?.properties ?? [],
    isInitial: submittedQuery.length === 0,
    isLoading: searchQuery.isLoading || searchQuery.isFetching,
    isError: searchQuery.isError,
  }
}
