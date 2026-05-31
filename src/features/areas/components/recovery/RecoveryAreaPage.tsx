'use client'

import { RecoveryAreaEmptyState } from './RecoveryAreaEmptyState'
import { RecoveryAreaHeader } from './RecoveryAreaHeader'
import { RecoveryAreaInfoCard } from './RecoveryAreaInfoCard'
import { RecoveryAreaMap } from './RecoveryAreaMap'
import { RecoveryAreaSkeleton } from './RecoveryAreaSkeleton'
import { RecoveryProjectCard } from './RecoveryProjectCard'
import { useRecoveryArea } from '../../hooks'

interface RecoveryAreaPageProps {
  areaId?: string
}

export const RecoveryAreaPage = ({ areaId }: RecoveryAreaPageProps = {}) => {
  const { data: area, isLoading, isEmpty, error } = useRecoveryArea(areaId ? { areaId } : {})

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-100">
        <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 xl:px-8">
          <RecoveryAreaSkeleton />
        </div>
      </main>
    )
  }

  if (error) {
    return (
      <main className="min-h-screen bg-slate-100">
        <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 xl:px-8">
          <RecoveryAreaEmptyState message={error} />
        </div>
      </main>
    )
  }

  if (isEmpty || !area) {
    return (
      <main className="min-h-screen bg-slate-100">
        <div className="mx-auto max-w-[1600px] px-4 py-6 sm:px-6 xl:px-8">
          <RecoveryAreaEmptyState />
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-100">
      <RecoveryAreaHeader area={area} />
      <div className="mx-auto max-w-[1600px] space-y-5 px-4 py-5 sm:px-6 xl:px-8">
        <RecoveryAreaMap area={area} />
        <RecoveryProjectCard area={area} />
        <RecoveryAreaInfoCard area={area} />
      </div>
    </main>
  )
}
