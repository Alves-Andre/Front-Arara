// tests/example.test.ts

describe('Example Test', () => {
  it('should pass', () => {
    expect(true).toBe(true)
  })
})

describe('Formatters', () => {
  it('should format date correctly', () => {
    const date = new Date('2024-01-15')
    const formatted = date.toLocaleDateString('pt-BR')
    expect(formatted).toContain('15')
  })
})
