// src/app/layout.tsx

import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'SEMARH - Sistema de Monitoramento de Recuperação Ambiental',
  description: 'Sistema de monitoramento de recuperação ambiental para SEMARH',
  viewport: 'width=device-width, initial-scale=1',
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
        <div className="flex flex-col min-h-screen">
          {/* Providers cairiam aqui */}
          {children}
        </div>
      </body>
    </html>
  )
}
