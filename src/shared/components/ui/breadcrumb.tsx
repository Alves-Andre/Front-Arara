import * as React from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/shared/utils/cn'

export const Breadcrumb = React.forwardRef<HTMLElement, React.ComponentPropsWithoutRef<'nav'>>(
  ({ className, ...props }, ref) => (
    <nav ref={ref} aria-label="breadcrumb" className={cn('text-sm', className)} {...props} />
  )
)
Breadcrumb.displayName = 'Breadcrumb'

export const BreadcrumbList = React.forwardRef<HTMLOListElement, React.ComponentPropsWithoutRef<'ol'>>(
  ({ className, ...props }, ref) => (
    <ol ref={ref} className={cn('flex flex-wrap items-center gap-1.5 text-muted-foreground', className)} {...props} />
  )
)
BreadcrumbList.displayName = 'BreadcrumbList'

export const BreadcrumbItem = React.forwardRef<HTMLLIElement, React.ComponentPropsWithoutRef<'li'>>(
  ({ className, ...props }, ref) => (
    <li ref={ref} className={cn('inline-flex items-center gap-1.5', className)} {...props} />
  )
)
BreadcrumbItem.displayName = 'BreadcrumbItem'

interface BreadcrumbLinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string
}

export const BreadcrumbLink = ({ className, href, ...props }: BreadcrumbLinkProps) => (
  <Link href={href} className={cn('transition-colors hover:text-foreground', className)} {...props} />
)

export const BreadcrumbPage = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<'span'>>(
  ({ className, ...props }, ref) => (
    <span ref={ref} className={cn('font-medium text-foreground', className)} aria-current="page" {...props} />
  )
)
BreadcrumbPage.displayName = 'BreadcrumbPage'

export const BreadcrumbSeparator = ({ className, ...props }: React.ComponentProps<'li'>) => (
  <li className={cn('[&>svg]:size-3.5', className)} role="presentation" aria-hidden="true" {...props}>
    <ChevronRight />
  </li>
)

