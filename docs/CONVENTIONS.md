// docs/CONVENTIONS.md

# Convenções de Código

## 📝 Nomenclatura

### Pastas
- Usar kebab-case para pastas de componentes
- Usar lowercase para pastas de domínio
- Exemplo: `src/shared/components/data-display`, `src/features/areas`

### Arquivos
- **Componentes React**: PascalCase (ex: `Button.tsx`, `AreaCard.tsx`)
- **Hooks**: camelCase com prefixo `use` (ex: `useAreas.ts`, `useAuth.ts`)
- **Services**: camelCase com sufixo `Service` (ex: `areasService.ts`, `authService.ts`)
- **Stores**: camelCase com sufixo `Store` (ex: `authStore.ts`, `uiStore.ts`)
- **Types**: PascalCase (ex: `Area.ts`, `User.ts`)
- **Schemas**: camelCase com sufixo `Schema` (ex: `areaSchemas.ts`)
- **Utils**: camelCase (ex: `formatters.ts`, `validators.ts`)

### Variáveis
- **Constantes**: UPPER_SNAKE_CASE (ex: `MAX_RETRIES`, `API_TIMEOUT`)
- **Valores normais**: camelCase (ex: `userName`, `isLoading`)
- **Booleanos**: prefixo `is`, `has`, `can` (ex: `isActive`, `hasError`, `canDelete`)

## 🎨 Padrões de Código

### Imports
```typescript
// 1. React e dependências externas
import React, { useState } from 'react'
import { useQuery } from '@tanstack/react-query'

// 2. Absolute imports
import { Button } from '@/shared/components/Button'
import { useAuth } from '@/shared/hooks'

// 3. Imports relativos
import { AreaCard } from './AreaCard'
import { areaHelpers } from '../utils'
```

### Exports
```typescript
// Componentes
export const MyComponent = () => { }

// Types
export interface MyProps { }
export type MyType = { }

// Barrel exports
export * from './MyComponent'
export * from './types'
```

### Props Interfaces
```typescript
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
  isLoading?: boolean
}
```

### Componentes Funcionais
```typescript
interface MyComponentProps {
  title: string
  onClick?: () => void
}

export const MyComponent = React.forwardRef<HTMLDivElement, MyComponentProps>(
  ({ title, onClick }, ref) => {
    return (
      <div ref={ref} onClick={onClick}>
        {title}
      </div>
    )
  }
)
MyComponent.displayName = 'MyComponent'
```

### Hooks Customizados
```typescript
export const useMyHook = (options?: Options) => {
  const [state, setState] = useState<State>()
  
  const action = useCallback(() => {
    // lógica
  }, [])

  return { state, action }
}
```

### Services
```typescript
export const myService = {
  async fetchData(id: string) {
    const { data } = await axiosClient.get(`/endpoint/${id}`)
    return data
  },

  async createData(input: CreateInput) {
    const { data } = await axiosClient.post('/endpoint', input)
    return data
  },
}
```

## 📏 Formatação

### ESLint
```bash
npm run lint
```

### Prettier
```bash
npm run format
npm run format:check
```

### TypeScript
```bash
npm run type-check
```

## ✅ Checklist de Qualidade

Antes de fazer commit, verifique:

- [ ] TypeScript sem erros (`npm run type-check`)
- [ ] Sem warnings de ESLint (`npm run lint`)
- [ ] Código formatado (`npm run format`)
- [ ] Testes passando (`npm run test`)
- [ ] Sem console.log em produção
- [ ] Sem `any` types (se possível)
- [ ] Componentes têm displayName
- [ ] Interfaces bem tipadas
- [ ] Tratamento de erros implementado
- [ ] Acessibilidade considerada

## 📚 Boas Práticas

### Component Patterns

#### 1. Single Responsibility
```typescript
// ✅ Bom
const Header = () => <header>...</header>
const Navigation = () => <nav>...</nav>
const Logo = () => <img src="logo.png" />

// ❌ Ruim
const App = () => (
  <header>
    <nav>
      <img src="logo.png" />
    </nav>
  </header>
)
```

#### 2. Lifting State Up
```typescript
// ✅ Bom
const Parent = () => {
  const [value, setValue] = useState('')
  return <Child value={value} onChange={setValue} />
}

// ❌ Ruim
const Child = () => {
  const [value, setValue] = useState('')
  const Parent = () => {
    // ...
  }
}
```

#### 3. Prop Drilling Prevention
```typescript
// ✅ Use Context/Store para dados globais
const { user } = useAuthStore()

// ❌ Evitar passar props por muitos níveis
<Component prop1={prop1} prop2={prop2} prop3={prop3} ... />
```

### Performance

```typescript
// ✅ Memoização quando apropriado
const expensiveComponent = React.memo(MyComponent)

// ✅ useCallback para funções
const handleClick = useCallback(() => { }, [])

// ✅ Lazy loading
const HeavyComponent = dynamic(() => import('./HeavyComponent'))

// ❌ Não fazer
const handleClick = () => { } // Recriada em cada render
```

### Async/Await

```typescript
// ✅ Bom
try {
  const data = await fetchData()
  setState(data)
} catch (error) {
  handleError(error)
}

// ❌ Ruim
fetchData().then(data => setState(data))
```

## 🚫 Coisas a Evitar

- ❌ `any` types
- ❌ `!` (non-null assertion) - use `if` checks
- ❌ Métodos HTTP hardcoded
- ❌ Console.log em produção
- ❌ Componentes muito grandes (>300 linhas)
- ❌ Lógica complexa em JSX
- ❌ Props drilling profundo
- ❌ Funções anônimas em props
