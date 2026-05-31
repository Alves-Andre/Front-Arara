'use client'

import dynamic from 'next/dynamic'
import type { ReactNode } from 'react'
import { Activity, Database, MapPinned, Satellite } from 'lucide-react'
import { AppLogo } from '@/shared/components'
import { usePropertySearch } from '../hooks'
import { EmptyState } from './EmptyState'
import { SearchBar } from './SearchBar'
import { SearchResults } from './SearchResults'
import { SearchSkeleton } from './SearchSkeleton'

const SearchMap = dynamic(() => import('./SearchMap').then((module) => module.SearchMap), {
  ssr: false,
})

export const SearchLandingPage = () => {
  const { query, setQuery, suggestions, search, results, submittedQuery, isInitial, isLoading } =
    usePropertySearch()
  const hasResults = results.length > 0
  const hasNoResults = !isInitial && !isLoading && !hasResults

  return (
    <main className="min-h-screen bg-slate-100">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-4 px-4 py-5 sm:px-6 lg:flex-row lg:items-center lg:justify-between xl:px-8">
          <div className="flex items-center gap-4">
            <AppLogo markClassName="size-14" wordmarkClassName="h-12" />
            <div className="hidden border-l border-slate-200 pl-4 sm:block">
              <p className="text-sm font-medium text-slate-950">Monitoramento Ambiental</p>
              <p className="text-xs text-slate-500">Acompanhamento remoto de areas em recuperacao</p>
            </div>
          </div>

          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-emerald-100 px-3 py-1 text-sm font-medium text-emerald-800 ring-1 ring-emerald-200">
            <span className="size-2 rounded-full bg-emerald-600" />
            Status: Operacional
          </div>
        </div>
      </header>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto grid max-w-[1600px] gap-8 px-4 py-10 sm:px-6 lg:grid-cols-[1fr_420px] lg:items-center xl:px-8">
          <div className="space-y-7">
            <div className="max-w-3xl">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-primary">
                Localizar area em recuperacao
              </p>
              <h1 className="mt-3 text-3xl font-semibold tracking-normal text-slate-950 sm:text-5xl">
                Pesquise uma propriedade pelo numero do CAR
              </h1>
              <p className="mt-4 text-lg text-slate-600">
                Encontre rapidamente propriedades importadas para analise territorial, monitoramento ambiental e
                verificacao do projeto de recuperacao.
              </p>
            </div>

            <SearchBar query={query} suggestions={suggestions} onQueryChange={setQuery} onSearch={search} />
          </div>

          <div className="hidden rounded-lg border border-slate-200 bg-slate-950 p-5 text-white shadow-sm lg:block">
            <div className="grid aspect-[4/3] place-items-center rounded-md border border-white/10 bg-[radial-gradient(circle_at_35%_30%,rgba(16,185,129,0.35),transparent_34%),radial-gradient(circle_at_70%_65%,rgba(0,174,239,0.32),transparent_30%)]">
              <div className="space-y-4 text-center">
                <div className="mx-auto flex size-16 items-center justify-center rounded-md bg-white/10 text-cyan-200">
                  <Satellite className="size-8" />
                </div>
                <div>
                  <p className="font-semibold">Base territorial SEMARH</p>
                  <p className="mt-1 text-sm text-slate-300">CAR, poligonos e areas em recuperacao</p>
                </div>
              </div>
            </div>

            <div className="mt-5 grid grid-cols-3 gap-3 text-sm">
              <OperationalMetric icon={<Database className="size-4" />} label="CAR" value="Indexado" />
              <OperationalMetric icon={<MapPinned className="size-4" />} label="GIS" value="Ativo" />
              <OperationalMetric icon={<Activity className="size-4" />} label="Status" value="Online" />
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] space-y-5 px-4 py-6 sm:px-6 xl:px-8">
        {isInitial && <InitialGuidance />}
        {isLoading && <SearchSkeleton />}
        {hasNoResults && <EmptyState />}
        {hasResults && (
          <>
            <SearchResults properties={results} />
            <SearchMap properties={results} />
          </>
        )}
        {!isInitial && submittedQuery && !isLoading && (
          <p className="text-sm text-slate-500">Consulta realizada para: {submittedQuery}</p>
        )}
      </section>
    </main>
  )
}

const InitialGuidance = () => {
  return (
    <section className="grid gap-4 lg:grid-cols-3">
      <GuidanceItem title="Busca inteligente" description="Digite o CAR completo ou apenas parte do codigo." />
      <GuidanceItem title="Sugestoes automaticas" description="Use autocomplete para localizar propriedades importadas." />
      <GuidanceItem title="Analise territorial" description="Abra a area para visualizar poligonos, status e projeto." />
    </section>
  )
}

interface GuidanceItemProps {
  title: string
  description: string
}

const GuidanceItem = ({ title, description }: GuidanceItemProps) => {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="font-semibold text-slate-950">{title}</h2>
      <p className="mt-2 text-sm text-slate-600">{description}</p>
    </div>
  )
}

interface OperationalMetricProps {
  icon: ReactNode
  label: string
  value: string
}

const OperationalMetric = ({ icon, label, value }: OperationalMetricProps) => {
  return (
    <div className="rounded-md border border-white/10 bg-white/10 p-3">
      <div className="mb-2 text-cyan-200">{icon}</div>
      <p className="text-xs text-slate-300">{label}</p>
      <p className="font-medium">{value}</p>
    </div>
  )
}
