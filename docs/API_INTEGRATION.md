// docs/API_INTEGRATION.md

# Estratégia de Integração com API

## 📡 Configuração Base

### Axios Client

Arquivo: `src/shared/services/api/axiosClient.ts`

```typescript
const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
})
```

### Interceptadores

Arquivo: `src/shared/services/api/interceptors.ts`

**Request Interceptor**
- Adiciona token JWT no header
- Prepara headers customizados

**Response Interceptor**
- Trata erros 401 (token expirado)
- Trata erros 403 (sem permissão)
- Formata respostas de erro

## 🏗️ Estrutura de Service

### Padrão Factory

```typescript
export const resourceService = {
  // GET
  async getAll(params?: QueryParams) {
    const { data } = await axiosClient.get<Resource[]>('/resources', {
      params,
    })
    return data
  },

  async getById(id: string) {
    const { data } = await axiosClient.get<Resource>(`/resources/${id}`)
    return data
  },

  // POST
  async create(input: CreateInput) {
    const { data } = await axiosClient.post<Resource>('/resources', input)
    return data
  },

  // PUT/PATCH
  async update(id: string, input: UpdateInput) {
    const { data } = await axiosClient.put<Resource>(`/resources/${id}`, input)
    return data
  },

  // DELETE
  async delete(id: string) {
    await axiosClient.delete(`/resources/${id}`)
  },
}
```

## 🎣 Integração com TanStack Query

### Query Hooks

```typescript
export const useResource = (id: string) => {
  return useQuery({
    queryKey: ['resource', id],
    queryFn: () => resourceService.getById(id),
    enabled: !!id, // Só executa se id existe
    staleTime: 5 * 60 * 1000, // 5 minutos
    gcTime: 10 * 60 * 1000, // 10 minutos
  })
}
```

### Mutation Hooks

```typescript
export const useCreateResource = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (input: CreateInput) => resourceService.create(input),
    onSuccess: (data) => {
      // Invalidar queries relacionadas
      queryClient.invalidateQueries({
        queryKey: ['resources'],
      })
      // Atualizar query específica
      queryClient.setQueryData(['resource', data.id], data)
    },
    onError: (error) => {
      console.error('Erro:', error)
    },
  })
}
```

## 🔄 Paginação

### Service
```typescript
async getResources(page = 1, limit = 10) {
  const { data } = await axiosClient.get<PaginatedResponse<Resource>>(
    '/resources',
    { params: { page, limit } }
  )
  return data
}
```

### Hook
```typescript
export const useResources = (page: number, limit: number) => {
  return useQuery({
    queryKey: ['resources', page, limit],
    queryFn: () => resourceService.getResources(page, limit),
  })
}
```

### Componente
```typescript
const { data, isLoading } = useResources(currentPage, itemsPerPage)

const handleNextPage = () => {
  setCurrentPage(prev => prev + 1)
}
```

## 🔍 Filtros e Busca

### Com Debounce

```typescript
const [search, setSearch] = useState('')
const debouncedSearch = useDebounce(search, 500)

const { data } = useQuery({
  queryKey: ['resources', debouncedSearch],
  queryFn: () => resourceService.getAll({ search: debouncedSearch }),
})
```

### Com Store

```typescript
const { search, status } = useFilterStore()

const { data } = useQuery({
  queryKey: ['resources', search, status],
  queryFn: () => resourceService.getAll({ search, status }),
})
```

## ✅ Validação de Dados

### Zod Schemas

```typescript
export const createResourceSchema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  status: z.enum(['active', 'inactive']),
})

export type CreateResourceInput = z.infer<typeof createResourceSchema>
```

### No Service

```typescript
async create(input: CreateResourceInput) {
  const validated = createResourceSchema.parse(input)
  const { data } = await axiosClient.post('/resources', validated)
  return data
}
```

### No Componente

```typescript
const form = useForm({
  resolver: zodResolver(createResourceSchema),
})
```

## 🔐 Autenticação

### Login

```typescript
export const authService = {
  async login(email: string, password: string) {
    const { data } = await axiosClient.post<LoginResponse>('/auth/login', {
      email,
      password,
    })
    
    useAuthStore.setState({
      token: data.token,
      user: data.user,
    })
    
    localStorage.setItem('authToken', data.token)
    return data
  },
}
```

### Hook

```typescript
export const useLogin = () => {
  const router = useRouter()

  return useMutation({
    mutationFn: (credentials: LoginInput) =>
      authService.login(credentials.email, credentials.password),
    onSuccess: () => {
      router.push('/dashboard')
    },
  })
}
```

## ⚠️ Tratamento de Erros

### Tipos de Erro

```typescript
interface ApiError {
  status: number
  message: string
  errors?: Record<string, string[]>
}
```

### No Interceptor

```typescript
instance.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      authService.logout()
      router.push('/login')
    }
    
    if (error.response?.status === 403) {
      // Sem permissão
    }
    
    if (error.response?.status >= 500) {
      // Erro do servidor
    }
    
    return Promise.reject(error)
  }
)
```

### No Componente

```typescript
const { mutate, isPending, error } = useCreateResource()

<form onSubmit={(e) => {
  e.preventDefault()
  mutate(formData, {
    onError: (error) => {
      showErrorNotification(error.message)
    },
  })
}}>
  {error && <ErrorMessage error={error} />}
</form>
```

## 🔗 CORS e Headers

### Configuração

```typescript
// next.config.js
headers: async () => {
  return [
    {
      source: '/api/:path*',
      headers: [
        { key: 'Access-Control-Allow-Credentials', value: 'true' },
        { key: 'Access-Control-Allow-Origin', value: '*' },
      ],
    },
  ]
}
```

## 📊 Upload de Arquivos

```typescript
export const uploadService = {
  async uploadFile(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    
    const { data } = await axiosClient.post(
      '/upload',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    )
    return data
  },
}
```

## 💾 Caching Estratégico

```typescript
// Dados que raramente mudam
const useConfiguration = () => {
  return useQuery({
    queryKey: ['config'],
    queryFn: () => configService.get(),
    staleTime: Infinity, // Nunca fica stale
    gcTime: 24 * 60 * 60 * 1000, // 24 horas
  })
}

// Dados que mudam frequentemente
const useNotifications = () => {
  return useQuery({
    queryKey: ['notifications'],
    queryFn: () => notificationService.getAll(),
    staleTime: 30 * 1000, // 30 segundos
    refetchInterval: 60 * 1000, // Refetch a cada minuto
  })
}
```
