// docs/DEVELOPMENT_GUIDE.md

# Guia de Desenvolvimento

## 🚀 Primeiros Passos

### 1. Setup Inicial

```bash
# Clonar repositório
git clone <repo-url>
cd frontend

# Instalar dependências
npm install

# Configurar ambiente
cp .env.example .env.local

# Editar .env.local com suas credenciais
# API_URL, MAP_TOKEN, etc.

# Iniciar servidor de desenvolvimento
npm run dev
```

### 2. Estrutura do Projeto

Familiarize-se com:
- `ARCHITECTURE.md` - Visão geral da arquitetura
- `docs/CONVENTIONS.md` - Convenções de código
- `docs/API_INTEGRATION.md` - Como integrar com API

## 📝 Criando uma Nova Feature

### Passo 1: Criar Estrutura de Pasta

```bash
mkdir -p src/features/myfeature/{
  components,
  hooks,
  services,
  store,
  types,
  schemas,
  utils,
  pages
}
```

### Passo 2: Definir Types

```typescript
// src/features/myfeature/types/index.ts
export interface MyEntity {
  id: string
  name: string
  // ... mais campos
}
```

### Passo 3: Criar Schemas (Validação)

```typescript
// src/features/myfeature/schemas/myfeatureSchemas.ts
import { z } from 'zod'

export const createMyEntitySchema = z.object({
  name: z.string().min(3),
  // ... mais validações
})

export type CreateMyEntityInput = z.infer<typeof createMyEntitySchema>
```

### Passo 4: Implementar Service

```typescript
// src/features/myfeature/services/myfeatureService.ts
import { axiosClient } from '@/shared/services/api/axiosClient'
import type { MyEntity, CreateMyEntityInput } from '../schemas/myfeatureSchemas'

export const myfeatureService = {
  async getAll() {
    const { data } = await axiosClient.get<MyEntity[]>('/myfeature')
    return data
  },

  async create(input: CreateMyEntityInput) {
    const { data } = await axiosClient.post<MyEntity>('/myfeature', input)
    return data
  },

  // ... mais métodos
}
```

### Passo 5: Criar Hooks

```typescript
// src/features/myfeature/hooks/useMyfeature.ts
import { useQuery, useMutation } from '@tanstack/react-query'
import { myfeatureService } from '../services/myfeatureService'

export const useMyfeature = () => {
  return useQuery({
    queryKey: ['myfeature'],
    queryFn: () => myfeatureService.getAll(),
  })
}

export const useCreateMyEntity = () => {
  return useMutation({
    mutationFn: (input) => myfeatureService.create(input),
    onSuccess: () => {
      // Invalidar queries
    },
  })
}
```

### Passo 6: Criar Store (se necessário)

```typescript
// src/features/myfeature/store/myfeatureStore.ts
import { create } from 'zustand'

export const useMyfeatureStore = create((set) => ({
  selectedId: null,
  setSelectedId: (id) => set({ selectedId: id }),
}))
```

### Passo 7: Implementar Componentes

```typescript
// src/features/myfeature/components/MyEntityCard.tsx
'use client'

import React from 'react'
import type { MyEntity } from '../types'

interface MyEntityCardProps {
  entity: MyEntity
  onEdit?: (entity: MyEntity) => void
  onDelete?: (id: string) => void
}

export const MyEntityCard = React.forwardRef<HTMLDivElement, MyEntityCardProps>(
  ({ entity, onEdit, onDelete }, ref) => {
    return (
      <div ref={ref} className="p-4 border rounded-lg">
        <h3 className="font-semibold">{entity.name}</h3>
        <div className="flex gap-2 mt-4">
          <button onClick={() => onEdit?.(entity)}>Editar</button>
          <button onClick={() => onDelete?.(entity.id)}>Deletar</button>
        </div>
      </div>
    )
  }
)
MyEntityCard.displayName = 'MyEntityCard'
```

### Passo 8: Exportar via Barrel Export

```typescript
// src/features/myfeature/index.ts
export * from './components'
export * from './hooks'
export * from './services'
export * from './store'
export * from './types'
export * from './utils'
```

## 🎯 Adicionando um Novo Componente

### Smart Component (com lógica)

```typescript
// src/features/myfeature/components/MyEntityList.tsx
'use client'

import { useMyfeature } from '../hooks/useMyfeature'
import { MyEntityListView } from './MyEntityListView'

export const MyEntityList = () => {
  const { data, isLoading, error } = useMyfeature()

  if (isLoading) return <div>Carregando...</div>
  if (error) return <div>Erro ao carregar</div>
  if (!data) return <div>Sem dados</div>

  return <MyEntityListView entities={data} />
}
```

### Dumb Component (apenas apresentação)

```typescript
// src/features/myfeature/components/MyEntityListView.tsx
interface MyEntityListViewProps {
  entities: MyEntity[]
}

export const MyEntityListView = ({ entities }: MyEntityListViewProps) => {
  return (
    <div className="space-y-4">
      {entities.map(entity => (
        <MyEntityCard key={entity.id} entity={entity} />
      ))}
    </div>
  )
}
```

## 🔄 Fluxo de Desenvolvimento

### 1. Desenvolvimento Local

```bash
# Iniciar servidor de desenvolvimento
npm run dev

# Em outro terminal, verificar tipos
npm run type-check

# Em outro terminal, verificar lint
npm run lint
```

### 2. Testes

```bash
# Rodar testes
npm run test:watch

# Coverage
npm run test:coverage
```

### 3. Build

```bash
# Build para produção
npm run build

# Verificar build localmente
npm start
```

### 4. Formato de Código

```bash
# Formatar código
npm run format

# Verificar formatação
npm run format:check
```

## 🐛 Debugging

### DevTools do React

```typescript
// Instalar React DevTools extension para seu navegador
// https://react-devtools-tutorial.vercel.app/
```

### Console Logs

```typescript
// ✅ Bom para debug
console.log('Debug:', data)

// ❌ Remove antes de fazer commit
console.log('temp debug')
```

### TypeScript Strict Mode

Todos os tipos devem ser explícitos:

```typescript
// ✅ Bom
const handleClick = (id: string) => void

// ❌ Ruim
const handleClick = (id: any) => {
  // ...
}
```

## 🚨 Checklist Antes do Commit

- [ ] `npm run type-check` passa
- [ ] `npm run lint` sem erros
- [ ] `npm run format` executado
- [ ] `npm run test` passa
- [ ] Sem `console.log` de debug
- [ ] Sem `any` types (se possível)
- [ ] Commits com mensagens claras

## 📚 Recursos Úteis

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [React Hook Form](https://react-hook-form.com/)
- [Zod](https://zod.dev/)
- [TanStack Query](https://tanstack.com/query/latest)
- [Zustand](https://github.com/pmndrs/zustand)

## 💬 Git Workflow

### Commit Message

Seguir o padrão:

```
<type>(<scope>): <subject>

<body>

<footer>
```

Tipos:
- `feat`: Nova feature
- `fix`: Bug fix
- `docs`: Documentação
- `style`: Formatação
- `refactor`: Refatoração
- `test`: Testes
- `chore`: Ferramentas

Exemplo:
```
feat(areas): add area creation form

- Implement AreaForm component
- Add validation with Zod
- Integrate with API

Closes #123
```

### Branching

```bash
# Feature
git checkout -b feature/user-authentication

# Bug fix
git checkout -b fix/area-list-loading

# Documentação
git checkout -b docs/api-integration
```

### Pull Request

1. Atualizar branch com `main`
2. Resolver conflitos se necessário
3. Rodar testes locais
4. Fazer push e abrir PR
5. Descrever mudanças no PR
6. Aguardar revisão

## 🔧 Troubleshooting

### Problema: Port 3000 já em uso

```bash
# Linux/Mac
lsof -i :3000
kill -9 <PID>

# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Problema: Dependências desatualizadas

```bash
npm update
npm audit fix
```

### Problema: Cache de build

```bash
rm -rf .next
npm run build
```

## 📞 Suporte

Para dúvidas:
1. Verificar documentação em `docs/`
2. Procurar em issues/discussions
3. Consultar team lead
