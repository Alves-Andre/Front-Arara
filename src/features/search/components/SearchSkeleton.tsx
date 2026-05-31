import { Skeleton } from '@/shared/components/ui'

export const SearchSkeleton = () => {
  return (
    <section className="space-y-5">
      <div className="grid gap-4 xl:grid-cols-2">
        <Skeleton className="h-64 rounded-lg" />
        <Skeleton className="h-64 rounded-lg" />
      </div>
      <Skeleton className="h-[420px] rounded-lg" />
    </section>
  )
}
