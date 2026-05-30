// src/shared/hooks/useGeoLocation.ts

import { useState, useCallback, useEffect } from 'react'
import type { Coordinates } from '../types'

interface UseGeoLocationState {
  coordinates: Coordinates | null
  error: string | null
  isLoading: boolean
}

export const useGeoLocation = () => {
  const [state, setState] = useState<UseGeoLocationState>({
    coordinates: null,
    error: null,
    isLoading: false,
  })

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setState({
        coordinates: null,
        error: 'Geolocalização não é suportada pelo navegador',
        isLoading: false,
      })
      return
    }

    setState((prev) => ({ ...prev, isLoading: true }))

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          coordinates: {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          },
          error: null,
          isLoading: false,
        })
      },
      (error) => {
        setState({
          coordinates: null,
          error: error.message,
          isLoading: false,
        })
      }
    )
  }, [])

  return {
    ...state,
    getCurrentLocation,
  }
}
