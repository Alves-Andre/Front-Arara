// src/app/page.tsx

'use client'

import Link from 'next/link'
import { AppLogo } from '@/shared/components'
import { Button } from '@/shared/components/Button'

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="max-w-4xl w-full space-y-8">
        <div className="flex flex-col items-center space-y-4 text-center">
          <AppLogo
            className="justify-center"
            markClassName="size-24 sm:size-28"
            wordmarkClassName="h-16 sm:h-20"
          />
          <p className="text-xl text-muted-foreground">
            Acompanhamento Remoto de Areas em Recuperacao Ambiental
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 pt-8">
          <Link href="/login">
            <Button size="lg" className="w-full">
              Entrar
            </Button>
          </Link>
          <Link href="/register">
            <Button size="lg" variant="outline" className="w-full">
              Registrar
            </Button>
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-6 pt-12">
          <div className="p-6 rounded-lg border">
            <h3 className="font-semibold mb-2">📍 Monitoramento</h3>
            <p className="text-sm text-muted-foreground">
              Acompanhamento em tempo real de áreas de recuperação
            </p>
          </div>
          <div className="p-6 rounded-lg border">
            <h3 className="font-semibold mb-2">🛰️ Satélite</h3>
            <p className="text-sm text-muted-foreground">
              Análise de imagens satélites de alta resolução
            </p>
          </div>
          <div className="p-6 rounded-lg border">
            <h3 className="font-semibold mb-2">📊 Análises</h3>
            <p className="text-sm text-muted-foreground">
              Relatórios e índices espectrais avançados
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
