// src/shared/services/api/axiosClient.ts

import axios from 'axios'

const baseURL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api'

export const axiosClient = axios.create({
  baseURL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Configurar interceptores
import { setupInterceptors } from './interceptors'
setupInterceptors(axiosClient)

export default axiosClient
