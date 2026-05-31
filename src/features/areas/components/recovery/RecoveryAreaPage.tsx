'use client'

import { RecoveryAreaEmptyState } from './RecoveryAreaEmptyState'
import { RecoveryAreaHeader } from './RecoveryAreaHeader'
import { RecoveryAreaSkeleton } from './RecoveryAreaSkeleton'
import { ComplianceQueueList } from '../ComplianceQueueList'

export const RecoveryAreaPage = () => {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-[1800px] px-4 py-8 sm:px-6 xl:px-8">
          <h1 className="text-3xl font-bold text-slate-950">Gestão de Vistorias</h1>
          <p className="mt-2 text-slate-600 text-lg">Painel técnico da SEMARH/TO para monitoramento de áreas em recuperação.</p>
        </div>
      </div>
      
      <div className="mx-auto max-w-[1800px] px-4 py-10 sm:px-6 xl:px-8">
        <ComplianceQueueList />
      </div>
    </main>
  )
}
