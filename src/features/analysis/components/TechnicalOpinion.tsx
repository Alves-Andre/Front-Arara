import { ClipboardPenLine } from 'lucide-react'

interface TechnicalOpinionProps {
  value: string
  onChange: (value: string) => void
}

export const TechnicalOpinion = ({ value, onChange }: TechnicalOpinionProps) => {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="mb-3 flex items-center gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-sky-50 text-sky-700">
          <ClipboardPenLine className="size-5" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Parecer tecnico</p>
          <h2 className="mt-1 text-lg font-semibold text-slate-950">Analise profissional</h2>
        </div>
      </div>
      <textarea
        className="min-h-36 w-full resize-y rounded-md border border-slate-300 bg-white p-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-sky-600 focus:ring-2 focus:ring-sky-100"
        placeholder="Insira sua analise profissional."
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
    </section>
  )
}
