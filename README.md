# ARARA

![ARARA](public/brand/arara-nome.svg)

ARARA e uma plataforma web para apoio a fiscalizacao, analise e acompanhamento de areas em recuperacao ambiental. O projeto foi desenvolvido para demonstrar como equipes tecnicas podem priorizar vistorias, consultar propriedades por CAR, visualizar evidencias territoriais e registrar decisoes de monitoramento em um fluxo digital simples, rastreavel e orientado a dados.

O sistema conecta a triagem de areas, o mapa operacional e a analise de evidencias em uma unica experiencia para reduzir retrabalho, acelerar a tomada de decisao e apoiar a recuperacao ambiental com melhor contexto tecnico.

## O Que O Projeto Faz

O ARARA organiza o processo de vistoria ambiental em tres momentos principais:

1. Busca e priorizacao de propriedades.
2. Consulta da area em recuperacao com mapa e dados ambientais.
3. Analise tecnica da vistoria com evidencias, comparativos e decisao final.

Na pratica, a equipe consegue localizar uma propriedade, verificar sua area em recuperacao, abrir uma vistoria, comparar evidencias visuais e indicar o encaminhamento tecnico:

- Aprovar o monitoramento.
- Solicitar nova evidencia.
- Recomendar visita presencial.

## Como Funciona

### Busca e fila de vistorias

A tela inicial permite buscar uma propriedade por CAR ou visualizar uma fila priorizada de vistorias. A partir dessa fila, o usuario acessa a area em recuperacao relacionada.

### Area em recuperacao

A tela de area apresenta:

- Mapa territorial com limite da propriedade e area em recuperacao.
- Dados resumidos da propriedade e da area ambiental.
- Proxima etapa do projeto de recuperacao.
- Historico de vistorias realizadas.

### Vistoria e analise tecnica

Na vistoria, o usuario visualiza:

- Pontos de coleta no mapa.
- Evidencias fotograficas por direcao.
- Comparativo temporal de imagens.
- Parecer tecnico.
- Painel de decisao da vistoria.

Ao concluir a vistoria, o sistema registra o resultado no historico local da area. Em uma evolucao de backend, esse evento pode ser persistido em API para auditoria, relatorios e continuidade operacional.

## Integracoes

O projeto foi estruturado para trabalhar com dados reais e tambem com dados mockados durante demonstracoes.

Principais pontos de integracao:

- Consulta de propriedades por CAR.
- Dados territoriais da propriedade e da area em recuperacao.
- Evidencias de campo e imagens comparativas.
- Registro de decisao tecnica da vistoria.
- Camadas de mapa via Leaflet/OpenStreetMap.

As chamadas de servico ficam organizadas nas features em `src/features/*/services`, permitindo trocar mocks por APIs reais sem reescrever as telas.

## Branding

Os arquivos de marca do ARARA ficam em:

```text
public/brand/arara-logo.svg
public/brand/arara-nome.svg
```

Esses assets sao usados para manter consistencia visual entre a aplicacao, apresentacoes e materiais de demonstracao.

## Tecnologias

- Next.js 15 com App Router.
- React 18.
- TypeScript.
- Tailwind CSS.
- Leaflet e React Leaflet para mapas.
- TanStack Query para fluxo de dados.
- Axios para cliente HTTP.
- Zustand para estado global quando necessario.
- Lucide React para icones.

## Estrutura Principal

```text
src/
  app/                 Rotas Next.js
  features/
    analysis/          Vistoria, evidencias e decisao tecnica
    areas/             Area em recuperacao e fila de vistorias
    search/            Busca de propriedades
    evidences/         Evidencias ambientais
    monitoring/        Eventos de monitoramento
    satellite/         Imagens e cenas satelitais
    requests/          Solicitacoes
  shared/
    components/        Componentes reutilizaveis
    hooks/             Hooks compartilhados
    services/          Cliente de API e servicos comuns
    utils/             Formatadores e helpers
```

## Como Rodar Localmente

### Pre-requisitos

- Node.js 18 ou superior.
- npm 9 ou superior.

### Instalacao

```bash
npm install
```

### Variaveis de ambiente

Copie o arquivo de exemplo:

```bash
cp .env.example .env.local
```

Edite `.env.local` conforme o ambiente usado para API, autenticacao ou demonstracao.

### Desenvolvimento

```bash
npm run dev
```

Acesse:

```text
http://localhost:3000
```

### Build de producao

```bash
npm run build
```

### Rodar build local

```bash
npm start
```

## Scripts Disponiveis

```bash
npm run dev          # servidor local de desenvolvimento
npm run build        # build de producao
npm run start        # servidor de producao apos build
npm run type-check   # validacao TypeScript
npm run test         # testes
npm run format       # formatacao com Prettier
```

## Deploy

O projeto esta preparado para deploy em Vercel.

Arquivos estaticos usados pela aplicacao, como logos e imagens de apoio, devem ficar dentro de `public/`. Dessa forma, eles sao empacotados junto com o deploy e podem ser lidos em producao por caminhos como:

```text
/brand/arara-logo.svg
/analysis/photos/nome-da-imagem.jpg
```

## Uso De Inteligencia Artificial

O desenvolvimento do ARARA contou com uso transparente de inteligencia artificial como apoio ao processo de construcao.

A IA foi usada principalmente em duas frentes:

- Spec-Driven Development: transformacao de requisitos, fluxos de usuario e regras de produto em especificacoes incrementais para guiar a implementacao.
- Expansao de brainstorms: apoio para explorar alternativas de experiencia, navegacao, priorizacao de vistorias, estados de decisao e organizacao das telas.

As decisoes finais de produto, escopo, validacao e direcionamento tecnico permaneceram com a equipe. A IA atuou como aceleradora de raciocinio, prototipacao, revisao e implementacao, sem substituir a avaliacao humana sobre o contexto ambiental e operacional.

## Contexto Do Projeto

O ARARA foi pensado para demonstrar uma jornada digital de apoio a recuperacao ambiental, conectando analise territorial, evidencias de campo e decisao tecnica. A proposta e mostrar como uma secretaria, equipe fiscal ou operador ambiental pode sair de uma fila de prioridades para uma vistoria documentada com poucos cliques.

## Licenca E Propriedade

Este projeto e parte de uma iniciativa demonstrativa para monitoramento e recuperacao ambiental. O uso, distribuicao e evolucao devem respeitar as regras definidas pela equipe responsavel pelo projeto.
