import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { useOrder } from '@/features/orders/hooks/useOrders'
import Layout from '@/shared/Layout'
import CardPaymentForm from '@/features/cart/components/CardPaymentForm'
import { usePaymentStore } from '@/store/usePaymentStore'
import { STATUS_LABELS } from '@/features/orders/types'

const METODOS_MP = ['MERCADOPAGO']

export default function PaymentPage() {
  const { orderId } = useParams<{ orderId: string }>()
  const pedidoId = Number(orderId)
  const { data: order, isLoading, isError } = useOrder(pedidoId)
  const paymentStatus = usePaymentStore((s) => s.status)
  const resetPayment = usePaymentStore((s) => s.resetPayment)

  useEffect(() => {
    resetPayment()
  }, [resetPayment])

  if (isLoading) {
    return (
      <Layout>
        <main className='mx-auto max-w-7xl px-6 py-14'>
          <div className='mb-14'>
            <div className='h-12 w-48 rounded bg-surface-container-highest/50 animate-pulse' />
          </div>
          <div className='mx-auto max-w-lg space-y-6'>
            <div className='h-6 w-32 rounded bg-surface-container-highest/50 animate-pulse' />
            <div className='h-10 w-48 rounded bg-surface-container-highest/50 animate-pulse' />
            <div className='h-14 w-full rounded bg-surface-container-highest/50 animate-pulse' />
          </div>
        </main>
      </Layout>
    )
  }

  if (isError || !order) {
    return (
      <Layout>
        <div className='flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center'>
          <h1 className='text-5xl font-black uppercase text-on-surface'>Pedido no encontrado</h1>
          <p className='text-on-surface-variant/70'>No pudimos cargar la informaci&oacute;n de tu pedido.</p>
          <Link
            to='/orders'
            className='border border-primary bg-primary px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-on-primary transition hover:opacity-90'
          >
            Volver a mis pedidos
          </Link>
        </div>
      </Layout>
    )
  }

  if (paymentStatus === 'approved') {
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
            to={`/orders/${order.id}`}
            className='border border-primary bg-primary px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-on-primary transition hover:opacity-90'
          >
            Ver detalle del pedido
          </Link>
        </div>
      </Layout>
    )
  }

  if (paymentStatus === 'rejected' || paymentStatus === 'error') {
    return (
      <Layout>
        <div className='flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center'>
          <div className='flex h-16 w-16 items-center justify-center rounded-full border-2 border-red-500'>
            <svg className='h-8 w-8 text-red-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </div>
          <h1 className='text-5xl font-black uppercase text-on-surface'>Pago Rechazado</h1>
          <p className='text-on-surface-variant/70'>{usePaymentStore.getState().errorMessage ?? 'El pago fue rechazado.'}</p>
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
      <main className='mx-auto max-w-2xl px-6 py-14'>
        <div className='mb-14'>
          <Link
            to='/orders'
            className='mb-8 inline-block text-sm uppercase tracking-[0.2em] text-primary transition hover:opacity-80'
          >
            &larr; Volver a pedidos
          </Link>
          <h1 className='mt-6 text-5xl font-black uppercase tracking-tight text-on-surface md:text-7xl'>
            Finalizar Pago
          </h1>
        </div>

        <div className='space-y-8 border border-outline-variant/20 bg-surface-container p-8'>
          <div className='space-y-4'>
            <div className='flex items-center justify-between'>
              <span className='text-sm font-bold uppercase tracking-[0.2em] text-outline'>
                Pedido
              </span>
              <span className='font-bold text-on-surface'>#{order.id}</span>
            </div>

            <div className='flex items-center justify-between'>
              <span className='text-sm font-bold uppercase tracking-[0.2em] text-outline'>
                Estado
              </span>
              <span className='font-medium text-on-surface'>
                {STATUS_LABELS[order.estado_codigo] ?? order.estado_codigo}
              </span>
            </div>

            <hr className='border-outline-variant/20' />

            <div className='flex items-center justify-between text-2xl'>
              <span className='font-black uppercase text-on-surface'>Total a pagar</span>
              <span className='font-black text-primary'>${order.total}</span>
            </div>
          </div>

          {METODOS_MP.includes(order.forma_pago_codigo) ? (
            <CardPaymentForm
              pedidoId={order.id}
              monto={order.total}
            />
          ) : (
            <div className='space-y-4 text-center'>
              <div className='flex justify-center'>
                <div className='flex h-14 w-14 items-center justify-center rounded-full border-2 border-green-500'>
                  <svg className='h-7 w-7 text-green-500' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M5 13l4 4L19 7' />
                  </svg>
                </div>
              </div>
              <p className='text-lg font-bold text-on-surface'>Pedido Confirmado</p>
              <p className='text-sm text-on-surface-variant/70'>
                Tu pedido fue registrado. Te contactaremos cuando est&eacute; listo.
              </p>
              <Link
                to={`/orders/${order.id}`}
                className='inline-block border border-primary bg-primary px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-on-primary transition hover:opacity-90'
              >
                Ver detalle del pedido
              </Link>
            </div>
          )}
        </div>
      </main>
    </Layout>
  )
}
