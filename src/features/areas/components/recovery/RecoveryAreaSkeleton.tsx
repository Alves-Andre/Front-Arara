import { Skeleton } from '@/shared/components/ui'

export const RecoveryAreaSkeleton = () => {
  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-5 rounded-lg border border-slate-200 bg-white p-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-4">
          <Skeleton className="size-14 rounded-md" />
          <div className="space-y-3">
            <Skeleton className="h-8 w-72" />
            <Skeleton className="h-4 w-96 max-w-full" />
          </div>
        </div>
        <Skeleton className="h-24 w-64 rounded-lg" />
      </div>

      <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
        <Skeleton className="h-44 rounded-lg" />
        <Skeleton className="h-44 rounded-lg" />
      </div>

      <Skeleton className="min-h-[60vh] w-full rounded-lg" />
    </div>
  )
}
