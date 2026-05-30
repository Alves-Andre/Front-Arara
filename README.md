// README.md

# SEMARH - Sistema de Monitoramento de Recuperação Ambiental

## 🎯 Visão Geral

Sistema web moderno e escalável para monitoramento de recuperação ambiental desenvolvido para a SEMARH (Secretaria do Meio Ambiente). Construído com as melhores práticas de engenharia de software, Clean Architecture e SOLID Principles.

## 🚀 Tecnologias Principais

- **Frontend Framework**: Next.js 15 (App Router)
- **Linguagem**: TypeScript (strict mode)
- **Styling**: Tailwind CSS + shadcn/ui
- **State Management**: Zustand
- **Data Fetching**: TanStack Query + Axios
- **Forms**: React Hook Form + Zod
- **Maps**: Leaflet + React Leaflet
- **Package Manager**: npm

## 📋 Pré-requisitos

- Node.js 18+ 
- npm 9+

## 🔧 Instalação

```bash
# Clonar repositório
git clone <repo>
cd frontend

# Instalar dependências
npm install

# Copiar arquivo de ambiente
cp .env.example .env.local

# Configurar variáveis de ambiente
# Editar .env.local com suas configurações

# Iniciar servidor de desenvolvimento
npm run dev
```

Acesse `http://localhost:3000`

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Next.js App Router
├── features/               # Feature-Based Architecture
│   ├── areas/             # Gerenciamento de áreas
│   ├── monitoring/        # Monitoramento
│   ├── evidences/         # Evidências (fotos, vídeos)
│   ├── satellite/         # Imagens satélites
│   ├── analysis/          # Análises espectrais
│   └── requests/          # Solicitações
├── shared/                # Código compartilhado
│   ├── components/        # Componentes reutilizáveis
│   ├── hooks/            # Custom hooks
│   ├── stores/           # Zustand stores
│   ├── services/         # Serviços (API, Auth)
│   ├── utils/            # Funções utilitárias
│   ├── types/            # Tipos TypeScript
│   ├── constants/        # Constantes
│   └── lib/              # Bibliotecas compartilhadas
└── middleware.ts         # Next.js middleware
```

## 🎨 Arquitetura

### Feature-Based Architecture

Cada feature é auto-contida com sua própria estrutura:

```
features/areas/
├── components/      # Componentes React
├── hooks/          # Hooks customizados
├── services/       # Chamadas API
├── store/          # Zustand store
├── types/          # Types TypeScript
├── schemas/        # Validação (Zod)
├── utils/          # Funções helpers
├── pages/          # Páginas/layouts
└── index.ts        # Barrel export
```

### Princípios

- **Clean Architecture**: Separação clara de responsabilidades
- **SOLID**: Single responsibility, Open/closed, Liskov, Interface segregation, Dependency inversion
- **DRY**: Don't repeat yourself
- **KISS**: Keep it simple, stupid
- **Type Safety**: TypeScript strict mode

## 🧩 Componentes

### Atomic Components

Componentes sem lógica complexa, altamente reutilizáveis:

```typescript
<Button variant="primary" size="lg" onClick={() => {}}>
  Clique aqui
</Button>
```

### Compound Components

Componentes que trabalham juntos:

```typescript
<Form>
  <FormField name="email" label="Email" />
  <FormField name="password" label="Senha" />
  <Button type="submit">Enviar</Button>
</Form>
```

### Domain Components

Componentes específicos de uma feature:

```typescript
<AreaCard area={area} onEdit={handleEdit} onDelete={handleDelete} />
```

## 📋 Formulários

Com React Hook Form + Zod:

```typescript
const { register, handleSubmit, formState: { errors } } = useForm<CreateAreaInput>({
  resolver: zodResolver(createAreaSchema),
})

<form onSubmit={handleSubmit(onSubmit)}>
  <input {...register('name')} />
  {errors.name && <span>{errors.name.message}</span>}
</form>
```

## 🔌 API Integration

```typescript
// Service
export const areasService = {
  getAreas: (page, limit) => axiosClient.get('/areas', { params: { page, limit } }),
  createArea: (data) => axiosClient.post('/areas', data),
}

// Hook
export const useAreas = (page, limit) => useQuery({
  queryKey: ['areas', page, limit],
  queryFn: () => areasService.getAreas(page, limit),
})

// Component
const { data, isLoading } = useAreas(1, 10)
```

## 📦 State Management

### Global State (Zustand)

```typescript
const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}))

// Usar no componente
const { user, setUser } = useAuthStore()
```

### Local State (React)

```typescript
const [isOpen, setIsOpen] = useState(false)
```

## 🗺️ Maps (GIS)

```typescript
<GeoMap
  center={[-15.8267, -48.0]}
  zoom={10}
  markers={markers}
  onMarkerClick={(marker) => handleClick(marker)}
/>
```

## 🔐 Autenticação

1. **Login**: Envia credenciais, recebe token
2. **Interceptor**: Adiciona token em todas as requisições
3. **Refresh**: Token expira e é renovado automaticamente
4. **Logout**: Limpa token e redireciona

```typescript
const { login, logout, isAuthenticated } = useAuth()

useEffect(() => {
  if (!isAuthenticated) {
    router.push('/login')
  }
}, [isAuthenticated])
```

## ✅ Testes

```bash
# Executar testes
npm run test

# Com coverage
npm run test:coverage

# Modo watch
npm run test:watch
```

## 🏗️ Build

```bash
# Build para produção
npm run build

# Iniciar servidor de produção
npm start
```

## 📚 Documentação Adicional

- [ARCHITECTURE.md](./ARCHITECTURE.md) - Documentação detalhada da arquitetura
- [docs/CONVENTIONS.md](./docs/CONVENTIONS.md) - Convenções de código
- [docs/DEVELOPMENT_GUIDE.md](./docs/DEVELOPMENT_GUIDE.md) - Guia de desenvolvimento
- [docs/API_INTEGRATION.md](./docs/API_INTEGRATION.md) - Integração com API
- [docs/GIS_STRATEGY.md](./docs/GIS_STRATEGY.md) - Estratégia de GIS

## 🤝 Contribuindo

1. Crie uma branch: `git checkout -b feature/minha-feature`
2. Commit suas mudanças: `git commit -am 'Add feature'`
3. Push para a branch: `git push origin feature/minha-feature`
4. Abra um Pull Request

## 📝 Licença

Este projeto é propriedade da SEMARH.

## 📞 Suporte

Para dúvidas ou problemas, entre em contato com o time de desenvolvimento.
