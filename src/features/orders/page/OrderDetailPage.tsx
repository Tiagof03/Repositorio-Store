import { useParams, useNavigate, Link } from 'react-router-dom'
import Layout from '@/shared/Layout'
import { useOrder, useCancelOrder } from '@/features/orders/hooks/useOrders'
import OrderDetailItem from '@/features/orders/components/OrderDetailItem'
import OrderDetailSkeleton from '@/features/orders/components/OrderDetailSkeleton'
import OrderInfo from '@/features/orders/components/OrderInfo'
import OrderTimeline from '@/features/orders/components/OrderTimeline'
import { useOrderStatusWS } from '@/features/orders/hooks/useOrderStatusWS'
import { useUiStore } from '@/store/useUiStore'

const CANCELABLE = ['PENDIENTE', 'CONFIRMADO']

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const numericId = Number(id)

  useOrderStatusWS(numericId)
  const { data: order, isLoading, isError } = useOrder(numericId)
  const cancelMutation = useCancelOrder()
  const confirmCancelId = useUiStore((s) => s.confirmCancelId)
  const setConfirmCancelId = useUiStore((s) => s.setConfirmCancelId)
  const showConfirm = confirmCancelId === numericId

  const handleCancel = () => {
    cancelMutation.mutate(numericId, {
      onSuccess: () => setConfirmCancelId(null),
    })
  }

  if (isLoading) {
    return (
      <Layout>
        <main className='mx-auto max-w-4xl px-6 py-14'>
          <div className='mb-10'>
            <div className='mb-6 h-8 w-36 rounded bg-surface-container-highest/50 animate-pulse' />
            <div className='h-12 w-64 rounded bg-surface-container-highest/50 animate-pulse' />
          </div>
          <OrderDetailSkeleton />
        </main>
      </Layout>
    )
  }

  if (isError || !order) {
    return (
      <Layout>
        <div className='flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center'>
          <h1 className='text-5xl font-black uppercase text-on-surface'>Pedido no encontrado</h1>
          <p className='text-on-surface-variant/70'>El pedido que buscas no existe o no tienes acceso.</p>
          <Link to='/orders' className='border border-primary bg-primary px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-on-primary transition hover:opacity-90'>
            Volver a mis pedidos
          </Link>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <main className='mx-auto max-w-4xl px-6 py-14'>
        <div className='mb-10'>
          <button
            onClick={() => navigate('/orders')}
            className='mb-6 border border-outline-variant/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant transition hover:border-primary hover:text-primary cursor-pointer'
          >
            ← Volver a pedidos
          </button>
          <h1 className='text-5xl font-black uppercase tracking-tight text-on-surface md:text-7xl'>
            Detalle del pedido
          </h1>
        </div>

        <section className='space-y-8'>
          <OrderInfo order={order} />

          <div className='border border-outline-variant/20 bg-surface-container p-8'>
            <h3 className='mb-6 text-sm font-bold uppercase tracking-[0.3em] text-primary'>
              Productos ({order.detalles.length})
            </h3>
            <div className='space-y-4'>
              {order.detalles.map((detalle) => (
                <OrderDetailItem
                  key={`${detalle.pedido_id}-${detalle.producto_id}`}
                  productoId={detalle.producto_id}
                  nombreSnapshot={detalle.nombre_snapshot}
                  cantidad={detalle.cantidad}
                  precioSnapshot={detalle.precio_snapshot}
                  subtotalSnap={detalle.subtotal_snap}
                />
              ))}
            </div>
          </div>

          <OrderTimeline historial={order.historial} />

          {CANCELABLE.includes(order.estado_codigo) && (
            <div className='border border-outline-variant/20 bg-surface-container p-8'>
              {showConfirm ? (
                <div className='flex items-center gap-4'>
                  <span className='text-sm text-on-surface-variant/70'>¿Cancelar pedido?</span>
                  <button
                    onClick={handleCancel}
                    disabled={cancelMutation.isPending}
                    className='border border-red-500 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-red-500 transition hover:bg-red-500 hover:text-white disabled:opacity-50 cursor-pointer'
                  >
                    {cancelMutation.isPending ? 'Cancelando...' : 'Sí, cancelar'}
                  </button>
                  <button
                    onClick={() => setConfirmCancelId(null)}
                    className='border border-outline-variant/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-on-surface-variant transition hover:border-primary cursor-pointer'
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmCancelId(numericId)}
                  className='border border-red-500/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-red-400 transition hover:border-red-500 hover:text-red-500 cursor-pointer'
                >
                  Cancelar pedido
                </button>
              )}
            </div>
          )}
        </section>
      </main>
    </Layout>
  )
}
