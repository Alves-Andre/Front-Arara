// src/app/layout.tsx

import type { Metadata, Viewport } from 'next'
import { Providers } from './providers'
import 'leaflet/dist/leaflet.css'
import './globals.css'

export const metadata: Metadata = {
  title: 'ARARA - Acompanhamento Remoto de Areas em Recuperacao Ambiental',
  description: 'Acompanhamento remoto de areas em recuperacao ambiental.',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-background text-foreground">
        <div className="flex min-h-screen flex-col">
          <Providers>{children}</Providers>
        </div>
      </body>
    </html>
  )
}
