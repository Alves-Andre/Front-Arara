import * as React from 'react'
import { cn } from '@/shared/utils/cn'

type BadgeVariant = 'default' | 'secondary' | 'success' | 'warning' | 'outline'

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: BadgeVariant
}

const badgeVariants: Record<BadgeVariant, string> = {
  default: 'border-transparent bg-primary text-primary-foreground',
  secondary: 'border-transparent bg-secondary text-secondary-foreground',
  success: 'border-transparent bg-green-100 text-green-800',
  warning: 'border-transparent bg-amber-100 text-amber-700',
  outline: 'text-foreground',
}

export const Badge = ({ className, variant = 'default', ...props }: BadgeProps) => {
  return (
    <div
      className={cn(
        'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors',
        badgeVariants[variant],
        className
      )}
      {...props}
    />
  )
}
