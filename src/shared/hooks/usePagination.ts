// src/shared/hooks/usePagination.ts

import { useState, useCallback } from 'react'

interface UsePaginationOptions {
  initialPage?: number
  initialLimit?: number
}

export const usePagination = ({
  initialPage = 1,
  initialLimit = 10,
}: UsePaginationOptions = {}) => {
  const [page, setPage] = useState(initialPage)
  const [limit, setLimit] = useState(initialLimit)

  const goToPage = useCallback((newPage: number) => {
    setPage(Math.max(1, newPage))
  }, [])

  const goToFirstPage = useCallback(() => {
    setPage(1)
  }, [])

  const goToLastPage = useCallback((total: number) => {
    const lastPage = Math.ceil(total / limit)
    setPage(lastPage)
  }, [limit])

  const nextPage = useCallback(() => {
    setPage((prev) => prev + 1)
  }, [])

  const previousPage = useCallback(() => {
    setPage((prev) => Math.max(1, prev - 1))
  }, [])

  const changeLimit = useCallback((newLimit: number) => {
    setLimit(newLimit)
    setPage(1)
  }, [])

  return {
    page,
    limit,
    goToPage,
    goToFirstPage,
    goToLastPage,
    nextPage,
    previousPage,
    changeLimit,
  }
}
