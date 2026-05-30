import Image from 'next/image'
import { cn } from '@/shared/utils/cn'

interface AppLogoProps {
  className?: string
  markClassName?: string
  wordmarkClassName?: string
  showWordmark?: boolean
}

export const AppLogo = ({
  className,
  markClassName,
  wordmarkClassName,
  showWordmark = true,
}: AppLogoProps) => {
  return (
    <div className={cn('flex items-center gap-3', className)}>
      <Image
        src="/brand/arara-logo.svg"
        alt="Logo ARARA"
        width={178}
        height={178}
        priority
        className={cn('size-14 shrink-0 object-contain', markClassName)}
      />
      {showWordmark && (
        <Image
          src="/brand/arara-nome.svg"
          alt="ARARA"
          width={219}
          height={123}
          priority
          className={cn('h-12 w-auto object-contain', wordmarkClassName)}
        />
      )}
    </div>
  )
}
