import { MessageSquareText } from 'lucide-react'

interface PropertyObservationProps {
  observation: string
}

export const PropertyObservation = ({ observation }: PropertyObservationProps) => {
  return (
    <section className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex gap-3">
        <div className="flex size-10 shrink-0 items-center justify-center rounded-md bg-sky-50 text-sky-700">
          <MessageSquareText className="size-5" />
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.18em] text-slate-500">Observacoes do proprietario</p>
          <p className="mt-2 text-sm leading-6 text-slate-700">{observation}</p>
        </div>
      </div>
    </section>
  )
}
