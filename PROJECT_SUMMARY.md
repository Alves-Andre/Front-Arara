// PROJECT_SUMMARY.md

# Resumo da Arquitetura - SEMARH

## 📋 Documentos Principais

1. **[ARCHITECTURE.md](./ARCHITECTURE.md)** - Arquitetura completa e detalhada
2. **[README.md](./README.md)** - Visão geral do projeto e setup
3. **[docs/CONVENTIONS.md](./docs/CONVENTIONS.md)** - Convenções de código
4. **[docs/DEVELOPMENT_GUIDE.md](./docs/DEVELOPMENT_GUIDE.md)** - Guia de desenvolvimento
5. **[docs/API_INTEGRATION.md](./docs/API_INTEGRATION.md)** - Integração com API
6. **[docs/GIS_STRATEGY.md](./docs/GIS_STRATEGY.md)** - Estratégia de mapas GIS
7. **[docs/TESTING_STRATEGY.md](./docs/TESTING_STRATEGY.md)** - Estratégia de testes

## 🎯 Estrutura Rápida

```
src/
├── app/              # Next.js App Router
├── features/         # Feature-Based Architecture (6 domínios)
│   ├── areas/
│   ├── monitoring/
│   ├── evidences/
│   ├── satellite/
│   ├── analysis/
│   └── requests/
└── shared/           # Código compartilhado
    ├── components/   # UI components + Map + Forms + DataDisplay
    ├── hooks/        # Custom hooks (useAuth, useAsync, etc)
    ├── stores/       # Zustand stores (auth, ui, filters)
    ├── services/     # API client, Auth, Storage
    ├── types/        # TypeScript types
    ├── utils/        # Utilities, formatters, coordinates
    ├── constants/    # Routes, messages
    └── lib/          # Query client, map config
```

## 🏗️ Pilares da Arquitetura

### 1. Clean Architecture
- Separação clara de responsabilidades
- Cada feature é auto-contida
- Código independente de framework

### 2. Feature-Based Organization
- 6 domínios de negócio
- Cada feature tem sua própria estrutura
- Fácil escalabilidade

### 3. Type Safety
- TypeScript strict mode
- Validação com Zod
- Interfaces bem definidas

### 4. State Management
- Zustand para estado global
- React hooks para estado local
- TanStack Query para cache de dados

### 5. API Integration
- Axios com interceptadores
- TanStack Query para queries
- Services como factories

### 6. Componentes
- Atomic components (Button, Input)
- Compound components (Form)
- Domain components (AreaCard, AreaForm)

## 🚀 Tecnologias

| Categoria | Tecnologia |
|-----------|-----------|
| Framework | Next.js 15 |
| Linguagem | TypeScript |
| UI/Styling | Tailwind CSS + shadcn/ui |
| State | Zustand + TanStack Query |
| Forms | React Hook Form + Zod |
| HTTP | Axios |
| Maps | Leaflet + React Leaflet |
| Testing | Jest + React Testing Library |
| Linting | ESLint + Prettier |

## 📚 Exemplos de Implementação

### Criar uma Área (Feature completa)

```
1. Definir Types → src/features/areas/types/
2. Criar Schema (Validação) → src/features/areas/schemas/
3. Implementar Service → src/features/areas/services/
4. Criar Hooks → src/features/areas/hooks/
5. Implementar Componentes → src/features/areas/components/
6. Exportar via Barrel → src/features/areas/index.ts
```

### Consumir API

```typescript
// 1. Service
const areasService = { getAreas: () => axiosClient.get('/areas') }

// 2. Hook
const useAreas = () => useQuery({ queryKey: ['areas'], queryFn: () => areasService.getAreas() })

// 3. Componente
const AreasList = () => {
  const { data } = useAreas()
  return <div>{data?.map(area => <AreaCard key={area.id} area={area} />)}</div>
}
```

## ✨ Convenções Importantes

### Nomenclatura
- **Componentes**: PascalCase (`AreaCard.tsx`)
- **Hooks**: camelCase com `use` (`useAreas.ts`)
- **Services**: camelCase com `Service` (`areasService.ts`)
- **Stores**: camelCase com `Store` (`authStore.ts`)

### Padrões
- Componentes recebem `ref` com `forwardRef`
- Props em interfaces com sufixo `Props`
- Barrel exports em cada pasta
- Services como factories (objetos com métodos)

## 🔐 Autenticação

1. Login envia credenciais
2. Backend retorna token + user
3. Interceptor adiciona token em requisições
4. Token expira → refresh automático
5. 401 → logout e redireciona para /login

## 🗺️ GIS/Mapas

```typescript
// Componente base
<GeoMap center={[-15.8267, -48.0]} zoom={10} markers={markers} />

// Cálculos geoespaciais
calculateDistance(from, to)    // Haversine formula
calculateCenter(coordinates)    // Centro de múltiplos pontos
calculateBounds(coordinates)    // Bounding box

// Índices espectrais
calculateNDVI(nir, red)  // Vegetação
calculateNDBI(swir, nir) // Áreas construídas
calculateNDMI(nir, swir) // Umidade
```

## ✅ Testes

```bash
npm run test          # Executar testes
npm run test:watch    # Watch mode
npm run test:coverage # Coverage report
```

Estrutura:
- Unit tests: Componentes, hooks, utilities
- Integration tests: Features completas
- E2E tests: Fluxos do usuário (Cypress)

## 🚀 Build & Deploy

```bash
npm run build  # Build para produção
npm start      # Servir build localmente
```

## 📖 Próximos Passos

1. Ler [ARCHITECTURE.md](./ARCHITECTURE.md) para detalhes
2. Ler [docs/CONVENTIONS.md](./docs/CONVENTIONS.md) para padrões
3. Seguir [docs/DEVELOPMENT_GUIDE.md](./docs/DEVELOPMENT_GUIDE.md) para desenvolver
4. Consultar [docs/API_INTEGRATION.md](./docs/API_INTEGRATION.md) para APIs
5. Ver [docs/GIS_STRATEGY.md](./docs/GIS_STRATEGY.md) para mapas
6. Usar [docs/TESTING_STRATEGY.md](./docs/TESTING_STRATEGY.md) para testes

## 🎯 Checklist de Qualidade

Antes de fazer commit:

- [ ] TypeScript sem erros
- [ ] ESLint passou
- [ ] Código formatado (Prettier)
- [ ] Testes passando
- [ ] Sem console.log
- [ ] Sem `any` types
- [ ] Componentes têm displayName
- [ ] Mensagem de commit clara

## 📞 Referências Rápidas

### Environment Variables
```bash
cp .env.example .env.local
# Editar com suas credenciais
```

### Scripts Úteis
```bash
npm run dev              # Development
npm run build            # Build
npm start                # Produção
npm run lint             # Lint
npm run format           # Format
npm run type-check       # Type check
npm run test             # Testes
npm run test:coverage    # Coverage
```

### Paths
- API: `process.env.NEXT_PUBLIC_API_URL`
- Map: `process.env.NEXT_PUBLIC_MAP_TILE_URL`
- App: `process.env.NEXT_PUBLIC_APP_URL`

---

**Criado com ❤️ para SEMARH**
