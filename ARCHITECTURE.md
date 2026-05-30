# Arquitetura - Sistema de Monitoramento de Recuperação Ambiental SEMARH

## 📋 Visão Geral

Sistema web escalável para monitoramento de recuperação ambiental utilizando **Next.js 15**, **TypeScript**, **Clean Architecture** e **SOLID Principles**.

## 🏗️ Estrutura de Pastas

```
frontend/
├── src/
│   ├── app/                          # Next.js App Router
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── (auth)/                   # Grupo de rotas de autenticação
│   │   └── (dashboard)/              # Grupo de rotas do dashboard
│   │
│   ├── features/                     # Feature-Based Architecture
│   │   ├── areas/                    # Domínio: Áreas
│   │   │   ├── components/
│   │   │   │   ├── AreaCard.tsx
│   │   │   │   ├── AreaForm.tsx
│   │   │   │   ├── AreaList.tsx
│   │   │   │   └── AreaMap.tsx
│   │   │   ├── hooks/
│   │   │   │   ├── useAreas.ts
│   │   │   │   ├── useCreateArea.ts
│   │   │   │   └── useAreaFilters.ts
│   │   │   ├── services/
│   │   │   │   └── areasService.ts
│   │   │   ├── store/
│   │   │   │   └── areasStore.ts
│   │   │   ├── types/
│   │   │   │   └── index.ts
│   │   │   ├── schemas/
│   │   │   │   └── areaSchemas.ts
│   │   │   ├── utils/
│   │   │   │   └── areaHelpers.ts
│   │   │   ├── pages/
│   │   │   │   ├── AreasPage.tsx
│   │   │   │   └── AreaDetailPage.tsx
│   │   │   └── index.ts              # Barrel export
│   │   │
│   │   ├── monitoring/              # Domínio: Monitoramento
│   │   │   └── [mesma estrutura]
│   │   │
│   │   ├── evidences/               # Domínio: Evidências
│   │   │   └── [mesma estrutura]
│   │   │
│   │   ├── satellite/               # Domínio: Imagens Satélite
│   │   │   └── [mesma estrutura]
│   │   │
│   │   ├── analysis/                # Domínio: Análises
│   │   │   └── [mesma estrutura]
│   │   │
│   │   └── requests/                # Domínio: Solicitações
│   │       └── [mesma estrutura]
│   │
│   ├── shared/                      # Código Compartilhado
│   │   ├── components/
│   │   │   ├── Layout/
│   │   │   │   ├── Header.tsx
│   │   │   │   ├── Sidebar.tsx
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── AppLayout.tsx
│   │   │   ├── Navigation/
│   │   │   │   ├── Navbar.tsx
│   │   │   │   ├── Breadcrumb.tsx
│   │   │   │   └── Tabs.tsx
│   │   │   ├── Map/
│   │   │   │   ├── GeoMap.tsx
│   │   │   │   ├── MapControls.tsx
│   │   │   │   └── MarkerCluster.tsx
│   │   │   ├── Forms/
│   │   │   │   ├── FormField.tsx
│   │   │   │   ├── FormSection.tsx
│   │   │   │   └── BaseForm.tsx
│   │   │   ├── DataDisplay/
│   │   │   │   ├── Table.tsx
│   │   │   │   ├── DataGrid.tsx
│   │   │   │   ├── Chart.tsx
│   │   │   │   └── StatsCard.tsx
│   │   │   └── Common/
│   │   │       ├── Button.tsx
│   │   │       ├── Modal.tsx
│   │   │       ├── Loading.tsx
│   │   │       └── ErrorBoundary.tsx
│   │   │
│   │   ├── services/
│   │   │   ├── api/
│   │   │   │   ├── axiosClient.ts
│   │   │   │   ├── axiosConfig.ts
│   │   │   │   └── interceptors.ts
│   │   │   ├── auth/
│   │   │   │   ├── authService.ts
│   │   │   │   └── tokenService.ts
│   │   │   ├── storage/
│   │   │   │   └── storageService.ts
│   │   │   └── file/
│   │   │       └── fileService.ts
│   │   │
│   │   ├── hooks/
│   │   │   ├── useAuth.ts
│   │   │   ├── useAsync.ts
│   │   │   ├── usePagination.ts
│   │   │   ├── useLocalStorage.ts
│   │   │   ├── useDebounce.ts
│   │   │   └── useGeoLocation.ts
│   │   │
│   │   ├── stores/
│   │   │   ├── authStore.ts
│   │   │   ├── uiStore.ts
│   │   │   └── filterStore.ts
│   │   │
│   │   ├── types/
│   │   │   ├── common.ts
│   │   │   ├── api.ts
│   │   │   ├── auth.ts
│   │   │   ├── gis.ts
│   │   │   └── index.ts
│   │   │
│   │   ├── utils/
│   │   │   ├── formatters.ts
│   │   │   ├── validators.ts
│   │   │   ├── coordinates.ts
│   │   │   ├── geospatial.ts
│   │   │   └── date.ts
│   │   │
│   │   ├── lib/
│   │   │   ├── queryClient.ts
│   │   │   ├── mapConfig.ts
│   │   │   └── tailwindTheme.ts
│   │   │
│   │   └── constants/
│   │       ├── api.ts
│   │       ├── routes.ts
│   │       ├── messages.ts
│   │       └── config.ts
│   │
│   └── middleware.ts
│
├── config/
│   ├── environment.ts
│   ├── mapTiles.ts
│   └── api.ts
│
├── docs/
│   ├── CONVENTIONS.md
│   ├── DEVELOPMENT_GUIDE.md
│   ├── API_INTEGRATION.md
│   ├── FORMS_STRATEGY.md
│   ├── STATE_MANAGEMENT.md
│   └── GIS_STRATEGY.md
│
├── tests/
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
├── public/
├── .env.local
├── .env.example
├── next.config.js
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.js
├── .eslintrc.json
├── .prettierrc
└── package.json
```

## 🎯 Convenções de Nomenclatura

### Componentes
- **PascalCase** para nomes de arquivo
- Sufixo por tipo: `Button.tsx`, `AreaCard.tsx`
- Componentes com estado: pode ter `Container` ou ser o próprio componente
- Props em interface: `interface ComponentProps { }`

```typescript
// ✅ Correto
const AreaCard = ({ area }: AreaCardProps) => { }
export default AreaCard

// ❌ Incorreto
const areaCard = ({ area }) => { }
export const area_card = () => { }
```

### Hooks Customizados
- Prefixo `use`
- camelCase
- Específico do domínio quando possível

```typescript
// ✅ Correto
export const useAreas = () => { }
export const useCreateArea = () => { }

// ❌ Incorreto
export const getAreas = () => { }
export const Areas = () => { }
```

### Services
- camelCase
- Sufixo `Service`
- Um arquivo por serviço lógico

```typescript
// ✅ Correto
// areasService.ts
export const areasService = {
  getAreas: async () => { },
  createArea: async (data) => { },
}

// ❌ Incorreto
// AreaService.ts - deve ser minúsculo
export class AreaService { }
```

### Stores (Zustand)
- camelCase
- Sufixo `Store`
- Prefixo com domínio

```typescript
// ✅ Correto
export const useAreasStore = create(() => { })

// ❌ Incorreto
export const AreasStore = create(() => { })
```

### Tipos
- PascalCase
- Sufixo com tipo quando necessário: `Props`, `State`, `DTO`
- Nomes descritivos

```typescript
// ✅ Correto
interface AreaProps { }
interface AreaDTO { }
type AreaFilter = { }

// ❌ Incorreto
interface area { }
interface A { }
```

### Schemas (Zod)
- camelCase
- Sufixo `Schema`
- Agrupados em um arquivo por feature

```typescript
// ✅ Correto
export const createAreaSchema = z.object({ })
export const updateAreaSchema = z.object({ })

// ❌ Incorreto
export const AreaSchema = z.object({ })
```

## 🧩 Estratégia de Componentes

### Classificação

#### 1. Atomic Components (Componentes Atômicos)
Componentes altamente reutilizáveis e sem lógica complexa.

```typescript
// src/shared/components/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', isLoading, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          'rounded-lg font-medium transition-colors',
          variant === 'primary' && 'bg-blue-600 text-white hover:bg-blue-700',
          variant === 'secondary' && 'bg-gray-200 text-gray-900 hover:bg-gray-300',
          size === 'md' && 'px-4 py-2 text-base',
          isLoading && 'opacity-50 cursor-not-allowed'
        )}
        disabled={isLoading || props.disabled}
        {...props}
      >
        {isLoading ? 'Carregando...' : props.children}
      </button>
    )
  }
)
Button.displayName = 'Button'
```

#### 2. Compound Components (Componentes Compostos)
Componentes que trabalham juntos formando uma unidade.

```typescript
// src/shared/components/Forms/FormField.tsx
interface FormFieldProps {
  name: string
  label: string
  error?: string
  required?: boolean
}

export const FormField = ({ name, label, error, required }: FormFieldProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={name} className="block text-sm font-medium mb-1">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      {error && <span className="text-red-500 text-sm">{error}</span>}
    </div>
  )
}
```

#### 3. Domain Components (Componentes de Domínio)
Componentes específicos de uma feature que encapsulam lógica de negócio.

```typescript
// src/features/areas/components/AreaCard.tsx
interface AreaCardProps {
  area: Area
  onEdit?: (area: Area) => void
  onDelete?: (id: string) => void
}

export const AreaCard = ({ area, onEdit, onDelete }: AreaCardProps) => {
  const { mutate: deleteArea, isPending } = useDeleteArea()

  const handleDelete = () => {
    if (confirm('Confirmar exclusão?')) {
      deleteArea(area.id, {
        onSuccess: () => onDelete?.(area.id),
      })
    }
  }

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <CardTitle className="flex justify-between items-start">
          <span>{area.name}</span>
          <Badge>{area.status}</Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{area.description}</p>
        <div className="mt-4 text-xs text-gray-500">
          {area.location && `📍 ${area.location}`}
        </div>
      </CardContent>
      <CardFooter className="gap-2">
        <Button size="sm" variant="outline" onClick={() => onEdit?.(area)}>
          Editar
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={handleDelete}
          disabled={isPending}
        >
          Deletar
        </Button>
      </CardFooter>
    </Card>
  )
}
```

### Padrões de Componentes

#### Smart vs Dumb Components
- **Smart Components**: Conectados com store/queries, lógica de negócio
- **Dumb Components**: Apresentação pura, sem dependências externas

```typescript
// ✅ Smart Component
const AreasList = () => {
  const { data: areas, isLoading } = useAreas()
  
  if (isLoading) return <Loading />
  return <AreaListView areas={areas || []} />
}

// ✅ Dumb Component
interface AreaListViewProps {
  areas: Area[]
}
const AreaListView = ({ areas }: AreaListViewProps) => {
  return (
    <div className="grid gap-4">
      {areas.map(area => <AreaCard key={area.id} area={area} />)}
    </div>
  )
}
```

## 📋 Estratégia de Formulários

### Padrão com React Hook Form + Zod

```typescript
// src/features/areas/schemas/areaSchemas.ts
import { z } from 'zod'

export const createAreaSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  description: z.string().min(10),
  location: z.string(),
  coordinates: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
  }),
  status: z.enum(['active', 'inactive', 'monitoring']),
  areaType: z.enum(['forest', 'wetland', 'grassland']),
})

export type CreateAreaInput = z.infer<typeof createAreaSchema>
```

```typescript
// src/features/areas/components/AreaForm.tsx
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { createAreaSchema, type CreateAreaInput } from '../schemas/areaSchemas'

interface AreaFormProps {
  onSubmit: (data: CreateAreaInput) => Promise<void>
  initialData?: Partial<CreateAreaInput>
  isLoading?: boolean
}

export const AreaForm = ({ onSubmit, initialData, isLoading }: AreaFormProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
  } = useForm<CreateAreaInput>({
    resolver: zodResolver(createAreaSchema),
    defaultValues: initialData,
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <FormField label="Nome" error={errors.name?.message}>
        <input
          {...register('name')}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Nome da área"
        />
      </FormField>

      <FormField label="Descrição" error={errors.description?.message}>
        <textarea
          {...register('description')}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Descrição detalhada"
          rows={4}
        />
      </FormField>

      <FormField label="Coordenadas" error={errors.coordinates?.message}>
        <div className="grid grid-cols-2 gap-2">
          <input
            {...register('coordinates.lat', { valueAsNumber: true })}
            type="number"
            step="0.0001"
            placeholder="Latitude"
            className="px-3 py-2 border rounded-lg"
          />
          <input
            {...register('coordinates.lng', { valueAsNumber: true })}
            type="number"
            step="0.0001"
            placeholder="Longitude"
            className="px-3 py-2 border rounded-lg"
          />
        </div>
      </FormField>

      <FormField label="Tipo de Área" error={errors.areaType?.message}>
        <select {...register('areaType')} className="w-full px-3 py-2 border rounded-lg">
          <option value="forest">Floresta</option>
          <option value="wetland">Área Úmida</option>
          <option value="grassland">Pastagem</option>
        </select>
      </FormField>

      <Button
        type="submit"
        disabled={isSubmitting || isLoading}
        isLoading={isSubmitting || isLoading}
      >
        Salvar Área
      </Button>
    </form>
  )
}
```

```typescript
// src/features/areas/hooks/useCreateArea.ts
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { areasService } from '../services/areasService'
import type { CreateAreaInput } from '../schemas/areaSchemas'

export const useCreateArea = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (data: CreateAreaInput) => areasService.createArea(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['areas'] })
    },
    onError: (error) => {
      console.error('Erro ao criar área:', error)
    },
  })
}
```

### Validação em Tempo Real
```typescript
// Usar watch() para validação em tempo real
const coordinatesValue = watch('coordinates')
const [mapCenter, setMapCenter] = useState(coordinatesValue)

useEffect(() => {
  if (coordinatesValue?.lat && coordinatesValue?.lng) {
    setMapCenter(coordinatesValue)
  }
}, [coordinatesValue])
```

## 🔌 Estratégia de Consumo de API

### Configuração do Axios

```typescript
// src/shared/services/api/axiosConfig.ts
import axios, { AxiosError, AxiosResponse } from 'axios'

export const createAxiosInstance = () => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
    },
  })

  return instance
}
```

```typescript
// src/shared/services/api/axiosClient.ts
import { createAxiosInstance } from './axiosConfig'
import { setupInterceptors } from './interceptors'

export const axiosClient = createAxiosInstance()
setupInterceptors(axiosClient)

export default axiosClient
```

```typescript
// src/shared/services/api/interceptors.ts
import { AxiosInstance } from 'axios'
import { authService } from '../auth/authService'

export const setupInterceptors = (instance: AxiosInstance) => {
  // Request interceptor
  instance.interceptors.request.use(
    (config) => {
      const token = authService.getToken()
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
      return config
    },
    (error) => Promise.reject(error)
  )

  // Response interceptor
  instance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response?.status === 401) {
        // Token expirado - fazer refresh ou redirecionar para login
        authService.logout()
        window.location.href = '/login'
      }
      return Promise.reject(error)
    }
  )
}
```

### Service Factories

```typescript
// src/features/areas/services/areasService.ts
import { axiosClient } from '@/shared/services/api/axiosClient'
import type { Area } from '../types'
import type { CreateAreaInput } from '../schemas/areaSchemas'

export const areasService = {
  /**
   * Fetch all areas com paginação
   */
  getAreas: async (page = 1, limit = 10) => {
    const { data } = await axiosClient.get<{ areas: Area[]; total: number }>(
      '/areas',
      { params: { page, limit } }
    )
    return data
  },

  /**
   * Fetch uma área específica
   */
  getArea: async (id: string) => {
    const { data } = await axiosClient.get<Area>(`/areas/${id}`)
    return data
  },

  /**
   * Criar nova área
   */
  createArea: async (input: CreateAreaInput) => {
    const { data } = await axiosClient.post<Area>('/areas', input)
    return data
  },

  /**
   * Atualizar área
   */
  updateArea: async (id: string, input: Partial<CreateAreaInput>) => {
    const { data } = await axiosClient.put<Area>(`/areas/${id}`, input)
    return data
  },

  /**
   * Deletar área
   */
  deleteArea: async (id: string) => {
    await axiosClient.delete(`/areas/${id}`)
  },
}
```

### Query Hooks com TanStack Query

```typescript
// src/features/areas/hooks/useAreas.ts
import { useQuery } from '@tanstack/react-query'
import { areasService } from '../services/areasService'

export const useAreas = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ['areas', page, limit],
    queryFn: () => areasService.getAreas(page, limit),
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 30 * 60 * 1000, // 30 minutos
  })
}

export const useArea = (id: string) => {
  return useQuery({
    queryKey: ['areas', id],
    queryFn: () => areasService.getArea(id),
    enabled: !!id,
  })
}
```

## 📦 Estratégia de Gerenciamento de Estado

### Zustand para Estado Global

```typescript
// src/shared/stores/authStore.ts
import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { User } from '@/shared/types'

interface AuthState {
  user: User | null
  isAuthenticated: boolean
  token: string | null
  setUser: (user: User | null) => void
  setToken: (token: string | null) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      token: null,
      setUser: (user) => set({ user, isAuthenticated: !!user }),
      setToken: (token) => set({ token }),
      logout: () => set({ user: null, isAuthenticated: false, token: null }),
    }),
    {
      name: 'auth-storage',
    }
  )
)
```

```typescript
// src/shared/stores/filterStore.ts
import { create } from 'zustand'

interface FilterState {
  status: string[]
  areaType: string[]
  dateRange: [string, string] | null
  setStatusFilter: (status: string[]) => void
  setAreaTypeFilter: (type: string[]) => void
  setDateRange: (range: [string, string] | null) => void
  reset: () => void
}

export const useFilterStore = create<FilterState>((set) => ({
  status: [],
  areaType: [],
  dateRange: null,
  setStatusFilter: (status) => set({ status }),
  setAreaTypeFilter: (areaType) => set({ areaType }),
  setDateRange: (dateRange) => set({ dateRange }),
  reset: () =>
    set({
      status: [],
      areaType: [],
      dateRange: null,
    }),
}))
```

### Local State com React Hooks
- Use `useState` para estado local do componente
- Use `useReducer` para lógica complexa dentro de um componente
- Levante estado quando múltiplos componentes precisarem compartilhar

## 🗺️ Estratégia de Mapas GIS

### Componente Base de Mapa

```typescript
// src/shared/components/Map/GeoMap.tsx
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

interface GeoMapProps {
  center: [number, number]
  zoom?: number
  markers?: Marker[]
  onMarkerClick?: (marker: Marker) => void
  onMapClick?: (coords: [number, number]) => void
  children?: React.ReactNode
}

export const GeoMap = ({
  center,
  zoom = 12,
  markers = [],
  onMarkerClick,
  onMapClick,
  children,
}: GeoMapProps) => {
  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ height: '100%', width: '100%' }}
      onClick={(e) => onMapClick?.([e.latlng.lat, e.latlng.lng])}
    >
      <TileLayer
        url={process.env.NEXT_PUBLIC_MAP_TILE_URL || 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'}
        attribution='&copy; OpenStreetMap contributors'
      />

      {markers.map((marker) => (
        <Marker
          key={marker.id}
          position={[marker.lat, marker.lng]}
          onClick={() => onMarkerClick?.(marker)}
        >
          {marker.popup && <Popup>{marker.popup}</Popup>}
        </Marker>
      ))}

      {children}
    </MapContainer>
  )
}
```

### Tipos GIS

```typescript
// src/shared/types/gis.ts
export interface Coordinates {
  lat: number
  lng: number
}

export interface GeoJSONFeature {
  type: 'Feature'
  geometry: {
    type: 'Point' | 'LineString' | 'Polygon'
    coordinates: number[] | number[][] | number[][][]
  }
  properties: Record<string, any>
}

export interface Marker {
  id: string
  lat: number
  lng: number
  popup?: string
  icon?: string
}

export interface MapBounds {
  north: number
  south: number
  east: number
  west: number
}
```

### Hook de Geolocalização

```typescript
// src/shared/hooks/useGeoLocation.ts
import { useState, useCallback } from 'react'

export const useGeoLocation = () => {
  const [location, setLocation] = useState<{
    lat: number
    lng: number
  } | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const getCurrentLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocalização não suportada')
      return
    }

    setIsLoading(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setError(null)
        setIsLoading(false)
      },
      (error) => {
        setError(error.message)
        setIsLoading(false)
      }
    )
  }, [])

  return { location, error, isLoading, getCurrentLocation }
}
```

## 🔐 Estratégia de Autenticação

### Service de Autenticação

```typescript
// src/shared/services/auth/authService.ts
import { axiosClient } from '../api/axiosClient'
import { useAuthStore } from '@/shared/stores/authStore'

export const authService = {
  login: async (email: string, password: string) => {
    const { data } = await axiosClient.post('/auth/login', { email, password })
    const { token, user } = data

    useAuthStore.setState({ token, user, isAuthenticated: true })
    localStorage.setItem('authToken', token)

    return { token, user }
  },

  logout: () => {
    useAuthStore.setState({ token: null, user: null, isAuthenticated: false })
    localStorage.removeItem('authToken')
  },

  getToken: () => {
    return useAuthStore.getState().token || localStorage.getItem('authToken')
  },

  isAuthenticated: () => {
    return useAuthStore.getState().isAuthenticated
  },
}
```

### Middleware de Proteção de Rotas

```typescript
// src/middleware.ts
import { NextRequest, NextResponse } from 'next/server'

export function middleware(request: NextRequest) {
  const token = request.cookies.get('authToken')?.value

  // Rotas protegidas
  if (request.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }

  // Rotas públicas
  if (request.nextUrl.pathname.startsWith('/login')) {
    if (token) {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/login', '/register'],
}
```

## ✅ Estratégia de Testes

### Estrutura de Testes

```
tests/
├── unit/
│   ├── shared/
│   │   ├── utils/
│   │   └── hooks/
│   └── features/
│       └── areas/
├── integration/
│   └── features/
└── e2e/
    └── scenarios/
```

### Exemplo de Teste Unitário

```typescript
// tests/unit/shared/utils/formatters.test.ts
import { formatDate, formatCoordinates } from '@/shared/utils/formatters'

describe('Formatters', () => {
  describe('formatDate', () => {
    it('should format date correctly', () => {
      const date = new Date('2024-05-30')
      expect(formatDate(date)).toBe('30/05/2024')
    })
  })

  describe('formatCoordinates', () => {
    it('should format coordinates with correct precision', () => {
      const result = formatCoordinates(-15.789123, -48.123456)
      expect(result).toBe('-15.79, -48.12')
    })
  })
})
```

### Exemplo de Teste de Componente

```typescript
// tests/unit/shared/components/Button.test.tsx
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/shared/components/Button'

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })

  it('handles click event', async () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click</Button>)

    await userEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })

  it('renders loading state', () => {
    render(<Button isLoading>Loading</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

## 📚 Barrel Exports

Cada feature deve ter um `index.ts` que exporta os componentes, hooks e types principais:

```typescript
// src/features/areas/index.ts
export * from './components'
export * from './hooks'
export * from './services'
export * from './types'

// src/features/areas/components/index.ts
export { AreaCard } from './AreaCard'
export { AreaForm } from './AreaForm'
export { AreaList } from './AreaList'
```

## 🎨 Estilo e Temas

### CSS Modules vs Tailwind
- **Tailwind**: Classes utilitárias para estilização rápida
- **CSS Modules**: Para estilos complexos que exigem mais controle

```typescript
// ✅ Preferir Tailwind
<div className="bg-white rounded-lg shadow-md p-4">
  Conteúdo
</div>

// ❌ Evitar misturar sem motivo
import styles from './Component.module.css'
<div className={styles.container}>
```

## 📖 Documentação das Features

Cada feature deve ter um `README.md` descrevendo:
- Propósito da feature
- Componentes principais
- Hooks customizados
- Fluxos de dados
- Exemplos de uso

```markdown
# Feature: Areas

## Propósito
Gerenciar áreas de monitoramento ambiental.

## Componentes

### AreaCard
Exibe um card com informações de uma área.

### AreaForm
Formulário para criar/editar área.

## Hooks

### useAreas()
Fetch todas as áreas.

### useCreateArea()
Criar nova área.
```

## 🚀 Melhores Práticas

1. **Separação de Responsabilidades**: Cada arquivo tem um propósito claro
2. **Reutilização**: Componentes atômicos são altamente reutilizáveis
3. **Testabilidade**: Código é fácil de testar por ser modular
4. **Type Safety**: TypeScript strict mode em tudo
5. **Performance**: React.memo, lazy loading onde apropriado
6. **Acessibilidade**: Semântica HTML e ARIA labels
7. **Documentação**: Código autodocumentado com tipos
8. **Consistência**: Padrões aplicados em todo o projeto

## 📞 Recursos Adicionais

- [Next.js 15 Documentation](https://nextjs.org/docs)
- [React Hook Form](https://react-hook-form.com/)
- [TanStack Query](https://tanstack.com/query)
- [Zustand](https://github.com/pmndrs/zustand)
- [Leaflet](https://leafletjs.com/)
- [Clean Architecture](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html)
- [SOLID Principles](https://en.wikipedia.org/wiki/SOLID)
