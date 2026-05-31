'use client'

import React from 'react'
import { useRouter } from 'next/navigation'
import { useComplianceQueue } from '../hooks/useAreas'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  Flame, 
  Map as MapIcon, 
  Search, 
  ChevronRight,
  User
} from 'lucide-react'

export const ComplianceQueueList = () => {
  const router = useRouter()
  const { data: queue, isLoading, error } = useComplianceQueue()

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-32 w-full animate-pulse rounded-lg border bg-slate-50" />
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg border border-red-200 bg-red-50 p-6 text-red-700">
        Erro ao carregar fila de vistorias.
      </div>
    )
  }

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'Critical': return 'bg-red-100 text-red-700 border-red-200'
      case 'Medium': return 'bg-amber-100 text-amber-700 border-amber-200'
      default: return 'bg-emerald-100 text-emerald-700 border-emerald-200'
    }
  }

  return (
    <div className="space-y-4">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 flex items-center gap-2">
          <Clock className="size-5 text-sky-600" />
          Fila de Vistorias Priorizada
        </h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar por CAR ou Proprietário..." 
            className="rounded-md border border-slate-200 py-2 pl-10 pr-4 text-sm focus:border-sky-500 focus:outline-none focus:ring-1 focus:sky-500"
          />
        </div>
      </div>

      <div className="grid gap-4">
        {queue?.map((item: any) => (
          <div 
            key={item.id}
            onClick={() => router.push(`/areas/recuperacao/analise?carCode=${item.carCode}`)}
            className="group cursor-pointer rounded-lg border border-slate-200 bg-white p-5 transition-all hover:border-sky-300 hover:shadow-md"
          >
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <span className={`rounded-full border px-2.5 py-0.5 text-xs font-semibold ${getPriorityStyles(item.priority)}`}>
                    {item.priority === 'Critical' ? 'CRÍTICO' : item.priority === 'Medium' ? 'MÉDIO' : 'NORMAL'}
                  </span>
                  <span className="text-xs font-medium text-slate-500">{item.carCode}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-700">{item.name}</h3>
                <div className="flex items-center gap-4 text-sm text-slate-600">
                  <span className="flex items-center gap-1.5"><User className="size-4" /> {item.owner}</span>
                  <span className="flex items-center gap-1.5"><MapIcon className="size-4" /> {item.municipality}</span>
                </div>
              </div>

              <div className="flex items-center gap-6">
                <div className="flex gap-3">
                  {item.indicators.hasAlerts && (
                    <div className="flex size-10 items-center justify-center rounded-md bg-red-50 text-red-600" title="Alerta de Desmatamento Ativo">
                      <AlertTriangle className="size-5" />
                    </div>
                  )}
                  {item.indicators.fireRisk > 0 && (
                    <div className="flex size-10 items-center justify-center rounded-md bg-orange-50 text-orange-600" title={`Histórico de Fogo: ${item.indicators.fireRisk} eventos`}>
                      <Flame className="size-5" />
                    </div>
                  )}
                  {!item.indicators.hasAlerts && item.indicators.fireRisk === 0 && (
                    <div className="flex size-10 items-center justify-center rounded-md bg-emerald-50 text-emerald-600">
                      <CheckCircle2 className="size-5" />
                    </div>
                  )}
                </div>
                
                <div className="hidden flex-col items-end text-right md:flex">
                  <span className="text-xs text-slate-400">Atualizado em</span>
                  <span className="text-sm font-medium text-slate-700">
                    {format(new Date(item.lastUpdate), "dd 'de' MMMM", { locale: ptBR })}
                  </span>
                </div>

                <ChevronRight className="size-6 text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-sky-500" />
              </div>
            </div>
          </div>
        ))}

        {queue?.length === 0 && (
          <div className="py-20 text-center text-slate-500 border-2 border-dashed rounded-xl">
            Nenhuma vistoria pendente na fila.
          </div>
        )}
      </div>
    </div>
  )
}
