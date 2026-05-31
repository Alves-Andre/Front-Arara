import { Skeleton } from '@/shared/components/ui'

export const AnalysisSkeleton = () => {
  return (
    <main className="min-h-screen bg-slate-100">
      <div className="border-b border-slate-200 bg-white px-4 py-5 sm:px-6 xl:px-8">
        <div className="mx-auto max-w-[1800px] space-y-3">
          <Skeleton className="h-4 w-48" />
          <Skeleton className="h-8 w-full max-w-xl" />
          <Skeleton className="h-4 w-full max-w-3xl" />
        </div>
      </div>
      <div className="mx-auto grid max-w-[1800px] gap-4 px-4 py-5 sm:px-6 xl:px-8">
        <div className="grid gap-4 xl:grid-cols-[1.25fr_0.75fr]">
          <Skeleton className="h-[560px] rounded-lg" />
          <Skeleton className="h-[560px] rounded-lg" />
        </div>
        <Skeleton className="h-64 rounded-lg" />
        <Skeleton className="h-28 rounded-lg" />
      </div>
    </main>
  )
}
