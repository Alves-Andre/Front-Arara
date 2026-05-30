// docs/TESTING_STRATEGY.md

# Estratégia de Testes

## 📊 Estrutura de Testes

```
tests/
├── unit/
│   ├── shared/
│   │   ├── utils/
│   │   │   └── formatters.test.ts
│   │   ├── hooks/
│   │   │   └── useAuth.test.ts
│   │   └── components/
│   │       └── Button.test.tsx
│   └── features/
│       └── areas/
│           ├── utils/
│           │   └── areaHelpers.test.ts
│           ├── hooks/
│           │   └── useAreas.test.ts
│           └── components/
│               └── AreaCard.test.tsx
├── integration/
│   └── features/
│       └── areas/
│           └── areas.integration.test.ts
└── e2e/
    └── areas/
        └── areas.e2e.test.ts
```

## 🧪 Testes Unitários

### Testing Utilities

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
```

### Teste de Componente

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

  it('disables button when loading', () => {
    render(<Button isLoading>Loading</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })
})
```

### Teste de Hook

```typescript
// tests/unit/shared/hooks/useAuth.test.ts
import { renderHook } from '@testing-library/react'
import { useAuth } from '@/shared/hooks/useAuth'

describe('useAuth', () => {
  it('returns auth state', () => {
    const { result } = renderHook(() => useAuth())
    
    expect(result.current).toHaveProperty('user')
    expect(result.current).toHaveProperty('isAuthenticated')
    expect(result.current).toHaveProperty('logout')
  })
})
```

### Teste de Utilitário

```typescript
// tests/unit/shared/utils/formatters.test.ts
import { formatDate, formatCoordinates } from '@/shared/utils/formatters'

describe('Formatters', () => {
  describe('formatDate', () => {
    it('formats date to dd/MM/yyyy', () => {
      const date = new Date('2024-05-30')
      const result = formatDate(date)
      expect(result).toMatch(/\d{2}\/\d{2}\/\d{4}/)
    })
  })

  describe('formatCoordinates', () => {
    it('formats coordinates with correct precision', () => {
      const result = formatCoordinates(-15.789123, -48.123456)
      expect(result).toBe('-15.7891, -48.1235')
    })
  })
})
```

## 🔗 Testes de Integração

```typescript
// tests/integration/features/areas/areas.integration.test.ts
import { render, screen, waitFor } from '@testing-library/react'
import { QueryClientProvider } from '@tanstack/react-query'
import { getQueryClient } from '@/shared/lib/queryClient'
import { AreasList } from '@/features/areas/components/AreaList'

describe('Areas Feature Integration', () => {
  it('loads and displays areas', async () => {
    const queryClient = getQueryClient()

    render(
      <QueryClientProvider client={queryClient}>
        <AreasList areas={mockAreas} />
      </QueryClientProvider>
    )

    await waitFor(() => {
      expect(screen.getByText('Área 1')).toBeInTheDocument()
    })
  })
})
```

## 🎬 Testes E2E (Cypress)

```typescript
// tests/e2e/areas/areas.e2e.test.ts
describe('Areas Feature', () => {
  beforeEach(() => {
    cy.visit('/dashboard/areas')
  })

  it('displays list of areas', () => {
    cy.get('[data-testid=area-list]').should('be.visible')
    cy.get('[data-testid=area-card]').should('have.length.greaterThan', 0)
  })

  it('can create a new area', () => {
    cy.get('button[type=submit]').contains('Criar Área').click()
    cy.get('input[name=name]').type('Nova Área')
    cy.get('input[name=description]').type('Descrição da área')
    cy.get('button[type=submit]').contains('Salvar').click()

    cy.contains('Área criada com sucesso').should('be.visible')
  })

  it('can edit an area', () => {
    cy.get('[data-testid=edit-button]').first().click()
    cy.get('input[name=name]').clear().type('Área Editada')
    cy.get('button[type=submit]').contains('Salvar').click()

    cy.contains('Área atualizada com sucesso').should('be.visible')
  })

  it('can delete an area', () => {
    cy.get('[data-testid=delete-button]').first().click()
    cy.contains('Confirmar exclusão').click()

    cy.contains('Área deletada com sucesso').should('be.visible')
  })
})
```

## 🧩 Mocks

### Mock de API

```typescript
// tests/__mocks__/handlers.ts
import { rest } from 'msw'

export const handlers = [
  rest.get('/api/areas', (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          {
            id: '1',
            name: 'Área 1',
            description: 'Test area',
            status: 'active',
          },
        ],
        pagination: { page: 1, limit: 10, total: 1, pages: 1 },
      })
    )
  }),
]
```

### Setup MSW (Mock Service Worker)

```typescript
// tests/setup.ts
import { setupServer } from 'msw/node'
import { handlers } from './__mocks__/handlers'

export const server = setupServer(...handlers)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

## 📋 Checklist de Testes

Antes de fazer commit, verifique:

- [ ] Testes unitários passando
- [ ] Testes de integração passando
- [ ] Coverage > 80%
- [ ] Sem memory leaks
- [ ] Sem console errors
- [ ] Testes E2E passando
- [ ] Acessibilidade testada

## 🚀 Executar Testes

```bash
# Todos os testes
npm run test

# Modo watch
npm run test:watch

# Coverage
npm run test:coverage

# E2E (Cypress)
npm run test:e2e

# E2E headless
npm run test:e2e:headless
```

## 📊 Coverage Esperado

- **Statements**: > 80%
- **Branches**: > 75%
- **Functions**: > 80%
- **Lines**: > 80%

## 🎯 Boas Práticas

1. **Test Behavior, Not Implementation**
   ```typescript
   // ✅ Bom
   expect(screen.getByRole('button', { name: /submit/i })).toBeInTheDocument()

   // ❌ Ruim
   expect(component.querySelector('.submit-btn')).toBeTruthy()
   ```

2. **Use Data Attributes**
   ```typescript
   // No componente
   <div data-testid="area-list">

   // No teste
   expect(screen.getByTestId('area-list')).toBeInTheDocument()
   ```

3. **Teste Edge Cases**
   ```typescript
   it('handles empty state', () => {
     render(<AreaList areas={[]} />)
     expect(screen.getByText('Nenhuma área encontrada')).toBeInTheDocument()
   })

   it('handles loading state', () => {
     render(<AreaList areas={[]} isLoading={true} />)
     expect(screen.getByText('Carregando...')).toBeInTheDocument()
   })

   it('handles error state', () => {
     render(<AreaList areas={[]} error="Erro ao carregar" />)
     expect(screen.getByText('Erro ao carregar')).toBeInTheDocument()
   })
   ```

4. **Use Factories**
   ```typescript
   // tests/factories/areaFactory.ts
   export const createArea = (overrides = {}): Area => ({
     id: '1',
     name: 'Test Area',
     description: 'Test',
     status: 'active',
     ...overrides,
   })

   // No teste
   const area = createArea({ name: 'Custom Name' })
   ```
