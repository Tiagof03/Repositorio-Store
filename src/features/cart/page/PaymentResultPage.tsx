import { useEffect, useState } from 'react'
import { useParams, useSearchParams, Link } from 'react-router-dom'
import api from '@/lib/axios'
import Layout from '@/shared/Layout'
import PaymentButton from '@/features/cart/components/PaymentButton'
import { usePaymentStore } from '@/store/usePaymentStore'

type ResultStatus = 'confirmando' | 'aprobado' | 'rechazado' | 'error'

export default function PaymentResultPage() {
  const { id, status: routeStatus } = useParams<{ id: string; status: string }>()
  const [searchParams] = useSearchParams()
  const [estado, setEstado] = useState<ResultStatus>('confirmando')
  const [orderTotal, setOrderTotal] = useState<number | null>(null)
  const resetPayment = usePaymentStore((s) => s.resetPayment)
  const approvePayment = usePaymentStore((s) => s.approvePayment)
  const rejectPayment = usePaymentStore((s) => s.rejectPayment)

  const pedidoId = Number(id)
  const paymentId = searchParams.get('payment_id')
  const isFailure = routeStatus === 'failure'

  useEffect(() => {
    if (isFailure) {
      setEstado('rechazado')
      rejectPayment('Pago rechazado por el usuario')
      api.get(`/pedidos/${pedidoId}`)
        .then((res) => setOrderTotal(res.data.total))
        .catch(() => {})
      return
    }

    if (!paymentId) {
      setEstado('error')
      rejectPayment('No se recibió el ID del pago')
      return
    }

    async function confirmar() {
      try {
        const res = await api.post('/pagos/confirm', {
          pedido_id: pedidoId,
          payment_id: Number(paymentId),
        })
        const esAprobado = res.data.estado === 'aprobado'
        setEstado(esAprobado ? 'aprobado' : 'rechazado')
        if (esAprobado) {
          approvePayment(paymentId!)
        } else {
          rejectPayment('El pago fue rechazado')
        }
      } catch {
        setEstado('error')
        rejectPayment('Error al confirmar el pago')
      }
    }

    confirmar()
  }, [pedidoId, paymentId, isFailure, approvePayment, rejectPayment])

  if (estado === 'confirmando') {
    return (
      <Layout>
        <div className='flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center'>
          <svg className='h-8 w-8 animate-spin text-primary' viewBox='0 0 24 24'>
            <circle className='opacity-25' cx='12' cy='12' r='10' stroke='currentColor' strokeWidth='4' fill='none' />
            <path className='opacity-75' fill='currentColor' d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z' />
          </svg>
          <p className='text-lg text-on-surface-variant/70'>Confirmando tu pago...</p>
        </div>
      </Layout>
    )
  }

  if (estado === 'aprobado') {
    return (
      <Layout>
        <div className='flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center'>
          <div className='flex h-16 w-16 items-center justify-center rounded-full border-2 border-green-500'>
            <svg className='h-8 w-8 text-green-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
            </svg>
          </div>
          <h1 className='text-5xl font-black uppercase text-on-surface'>&iexcl;Pago Exitoso!</h1>
          <p className='text-on-surface-variant/70'>Tu pago fue procesado correctamente.</p>
          <Link
            to={`/orders/${pedidoId}`}
            className='border border-primary bg-primary px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-on-primary transition hover:opacity-90'
          >
            Ver detalle del pedido
          </Link>
        </div>
      </Layout>
    )
  }

  if (estado === 'error') {
    return (
      <Layout>
        <div className='flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center'>
          <div className='flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-500'>
            <svg className='h-8 w-8 text-red-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </div>
          <h1 className='text-5xl font-black uppercase text-on-surface'>Error en el Pago</h1>
          <p className='text-on-surface-variant/70'>Hubo un problema al verificar tu pago.</p>
          <button
            onClick={resetPayment}
            className='border border-primary bg-primary px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-on-primary transition hover:opacity-90 cursor-pointer'
          >
            Reintentar
          </button>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <div className='flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center'>
        <div className='flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-500'>
          <svg className='h-8 w-8 text-red-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
          </svg>
        </div>
        <h1 className='text-5xl font-black uppercase text-on-surface'>Pago Rechazado</h1>
        <p className='text-on-surface-variant/70'>El pago fue rechazado. Pod&eacute;s intentar nuevamente.</p>
        <div className='w-full max-w-xs'>
          <PaymentButton pedidoId={pedidoId} monto={orderTotal ?? 0} />
        </div>
        <Link
          to='/cart'
          className='text-sm uppercase tracking-[0.2em] text-outline transition hover:text-on-surface'
        >
          Volver al carrito
        </Link>
      </div>
    </Layout>
  )
}
