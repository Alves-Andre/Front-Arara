import { SearchX } from 'lucide-react'

export const EmptyState = () => {
  return (
    <section className="rounded-lg border border-dashed border-slate-300 bg-white/80 p-10 text-center">
      <div className="mx-auto flex size-12 items-center justify-center rounded-md bg-slate-100 text-slate-500">
        <SearchX className="size-6" />
      </div>
      <h2 className="mt-4 text-xl font-semibold text-slate-950">Nenhuma propriedade encontrada</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-slate-600">
        Nenhuma propriedade encontrada para o CAR informado.
      </p>
    </section>
  )
}
