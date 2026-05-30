// src/shared/utils/cn.ts

import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * Mescla classes Tailwind CSS com suporte a conflitos
 * Utilidade comum para componentes React
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
