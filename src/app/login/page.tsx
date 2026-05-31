'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import { axiosClient } from '@/shared/services/api/axiosClient'
import { Button } from '@/shared/components'
import { ShieldCheck, Mail, Key, AlertCircle, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const { data } = await axiosClient.post('/v1/auth/email/login-code', {
        email,
        code: code.toUpperCase(),
      })

      // Salvar token (Ajustar conforme o nome da chave no seu .env.local)
      localStorage.setItem('authToken', data.token)
      
      // Redirecionar para a fila de vistorias
      router.push('/areas/recuperacao')
    } catch (err: any) {
      console.error(err)
      setError('Código ou E-mail inválidos. Verifique o código enviado ao seu e-mail.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
      <div className="w-full max-w-md space-y-8 rounded-2xl border border-slate-200 bg-white p-8 shadow-xl">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <ShieldCheck className="h-10 w-10" />
          </div>
          <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900">Sistema Arara</h1>
          <p className="mt-2 text-sm text-slate-600">
            Acesse usando o código enviado pelo seu engenheiro.
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleLogin}>
          <div className="space-y-4 rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="block text-sm font-medium text-slate-700">
                Endereço de E-mail
              </label>
              <div className="relative mt-1">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-lg border border-slate-300 py-3 pl-10 pr-3 text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                  placeholder="seu@email.com"
                />
              </div>
            </div>

            <div>
              <label htmlFor="invite-code" className="block text-sm font-medium text-slate-700">
                Código de Acesso
              </label>
              <div className="relative mt-1">
                <Key className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                <input
                  id="invite-code"
                  name="code"
                  type="text"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="block w-full rounded-lg border border-slate-300 py-3 pl-10 pr-3 font-mono text-lg tracking-widest text-slate-900 placeholder-slate-400 focus:border-emerald-500 focus:outline-none focus:ring-emerald-500 sm:text-sm"
                  placeholder="EX: A1B2C3"
                />
              </div>
            </div>
          </div>

          {error && (
            <div className="flex items-center gap-2 rounded-lg bg-red-50 p-4 text-sm text-red-700">
              <AlertCircle className="h-5 w-5 shrink-0" />
              <p>{error}</p>
            </div>
          )}

          <div>
            <Button
              type="submit"
              disabled={isLoading}
              className="group relative flex w-full justify-center rounded-lg bg-emerald-600 py-3 text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:bg-slate-400"
            >
              {isLoading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                'Entrar no Sistema'
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
