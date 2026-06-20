import type { HistorialEntry } from '@/features/orders/types'
import { STATUS_LABELS } from '@/features/orders/types'

interface OrderTimelineProps {
  historial: HistorialEntry[]
}

export default function OrderTimeline({ historial }: OrderTimelineProps) {
  if (!historial.length) {
    return (
      <div className='border border-outline-variant/20 bg-surface-container p-8 text-center text-sm text-on-surface-variant/70'>
        Sin historial disponible
      </div>
    )
  }

  const sorted = [...historial].sort(
    (a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
  )

  return (
    <div className='border border-outline-variant/20 bg-surface-container p-8'>
      <h3 className='mb-8 text-sm font-bold uppercase tracking-[0.3em] text-primary'>
        Línea de tiempo
      </h3>

      <div className='relative space-y-0'>
        {sorted.map((entry, index) => {
          const isLast = index === sorted.length - 1
          return (
            <div key={entry.id ?? index} className='relative flex gap-6 pb-8 last:pb-0'>
              <div className='flex flex-col items-center'>
                <div className={`z-10 h-4 w-4 rounded-full border-2 ${
                  isLast
                    ? 'border-primary bg-primary'
                    : 'border-outline-variant/40 bg-surface-container'
                }`} />
                {!isLast && (
                  <div className='mt-1 w-px flex-1 bg-outline-variant/20' />
                )}
              </div>

              <div className='flex-1 -mt-1'>
                <div className='flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between'>
                  <p className='text-sm font-bold text-on-surface'>
                    {entry.estado_desde
                      ? `${STATUS_LABELS[entry.estado_desde] ?? entry.estado_desde} → ${STATUS_LABELS[entry.estado_hacia] ?? entry.estado_hacia}`
                      : `${STATUS_LABELS[entry.estado_hacia] ?? entry.estado_hacia}`}
                  </p>
                  <p className='text-xs text-outline'>
                    {new Date(entry.created_at).toLocaleDateString('es-AR', {
                      day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit',
                    })}
                  </p>
                </div>
                {entry.motivo && (
                  <p className='mt-1 text-xs italic text-on-surface-variant/50'>
                    Motivo: {entry.motivo}
                  </p>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
