import { useState } from 'react'
import api from '@/lib/axios'
import { extractApiError } from '@/lib/errorParser'
import { isMpConfigured } from '@/lib/mp'

interface CardPaymentFormProps {
  pedidoId: number
  monto: number
}

export default function CardPaymentForm({ pedidoId }: CardPaymentFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const mpConfigured = isMpConfigured()

  const handleRedirect = async () => {
    if (!mpConfigured) {
      setError('MercadoPago no está configurado. Contactá al administrador.')
      return
    }

    setLoading(true)
    setError(null)

    try {
      const res = await api.post('/pagos/crear', {
        pedido_id: pedidoId,
      })

      const initPoint = res.data?.init_point

      if (initPoint) {
        window.location.href = initPoint
      } else {
        setError('Error al obtener el punto de pago de MercadoPago')
      }
    } catch (err: unknown) {
      setError(extractApiError(err, 'Error al conectar con MercadoPago'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='space-y-4'>
      {error && (
        <div className='rounded border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400'>
          {error}
        </div>
      )}

      <button
        onClick={handleRedirect}
        disabled={loading}
        className='w-full border border-primary bg-primary py-4 text-sm font-bold uppercase tracking-[0.2em] text-on-primary transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer'
      >
        {loading ? (
          <span className='flex items-center justify-center gap-2'>
            <svg className='h-4 w-4 animate-spin' viewBox='0 0 24 24'>
              <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' fill='none' />
              <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z' />
            </svg>
            Conectando con MercadoPago...
          </span>
        ) : (
          'Pagar con MercadoPago'
        )}
      </button>

      <p className='text-center text-xs uppercase tracking-[0.2em] text-outline'>
        Pago seguro v&iacute;a MercadoPago
      </p>
    </div>
  )
}
