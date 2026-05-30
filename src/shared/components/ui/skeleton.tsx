import type { HTMLAttributes } from 'react'
import { cn } from '@/shared/utils/cn'

interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {}

export const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return <div className={cn('animate-pulse rounded-md bg-muted', className)} {...props} />
}
