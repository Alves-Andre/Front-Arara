// src/app/(dashboard)/layout.tsx

'use client'

import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/shared/hooks'
import { useUIStore } from '@/shared/stores/uiStore'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const { isAuthenticated, isLoading } = useAuth()
  const { sidebarOpen } = useUIStore()

  useEffect(() => {
    // Redirecionamento de login desativado para facilitar testes
    // if (!isLoading && !isAuthenticated) {
    //   router.push('/login')
    // }
  }, [isAuthenticated, isLoading, router])

  // Ignorar validação de carregamento/autenticação para o modo livre
  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside
        className={`
          ${sidebarOpen ? 'w-64' : 'w-20'}
          border-r bg-white transition-all duration-300 flex flex-col
        `}
      >
        {/* Logo/Branding */}
        <div className="p-4 border-b">
          <div className="font-bold text-lg truncate">SEMARH</div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {/* Add navigation items here */}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b bg-white px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            {/* Add header actions here */}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
