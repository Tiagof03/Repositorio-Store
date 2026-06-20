import { Link } from 'react-router-dom'
import type { Pedido } from '@/features/orders/types'
import OrderDetailItem from '@/features/orders/components/OrderDetailItem'
import { STATUS_LABELS, STATUS_COLORS } from '@/features/orders/types'
import { useCancelOrder } from '@/features/orders/hooks/useOrders'
import { useUiStore } from '@/store/useUiStore'

interface OrderCardProps {
  order: Pedido
}

const CANCELABLE = ['PENDIENTE', 'CONFIRMADO']

export default function OrderCard({ order }: OrderCardProps) {
  const confirmCancelId = useUiStore((s) => s.confirmCancelId)
  const setConfirmCancelId = useUiStore((s) => s.setConfirmCancelId)
  const showConfirm = confirmCancelId === order.id
  const cancelMutation = useCancelOrder()

  const handleCancel = () => {
    cancelMutation.mutate(order.id, {
      onSuccess: () => setConfirmCancelId(null),
    })
  }

  return (
    <article className='border border-outline-variant/20 bg-surface-container p-8'>
      <div className='mb-8 flex flex-col gap-4 border-b border-outline-variant/20 pb-6 md:flex-row md:items-center md:justify-between'>
        <div>
          <span className='text-sm uppercase tracking-[0.2em] text-outline'>Pedido #{order.id}</span>
          <h2 className={`mt-2 text-3xl font-black uppercase ${STATUS_COLORS[order.estado_codigo]?.split(' ')[0] ?? 'text-on-surface'}`}>
            {STATUS_LABELS[order.estado_codigo] ?? order.estado_codigo}
          </h2>
        </div>
        <div className='text-left md:text-right'>
          <p className='text-sm text-on-surface-variant/70'>{new Date(order.created_at).toLocaleDateString()}</p>
          <p className='mt-2 text-3xl font-bold text-primary'>${order.total}</p>
        </div>
      </div>

      <div className='space-y-4'>
        {order.detalles.slice(0, 3).map((detalle) => (
          <OrderDetailItem
            key={`${detalle.pedido_id}-${detalle.producto_id}`}
            productoId={detalle.producto_id}
            nombreSnapshot={detalle.nombre_snapshot}
            cantidad={detalle.cantidad}
            precioSnapshot={detalle.precio_snapshot}
            subtotalSnap={detalle.subtotal_snap}
          />
        ))}
        {order.detalles.length > 3 && (
          <p className='text-center text-xs text-outline'>
            +{order.detalles.length - 3} productos más
          </p>
        )}
      </div>

      <div className='mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between'>
        <Link
          to={`/orders/${order.id}`}
          className='border border-primary/40 px-4 py-2 text-center text-xs font-bold uppercase tracking-[0.2em] text-primary transition hover:border-primary hover:bg-primary hover:text-on-primary'
        >
          Ver detalle completo
        </Link>
      </div>

      {CANCELABLE.includes(order.estado_codigo) && (
        <div className='mt-6 border-t border-outline-variant/20 pt-6'>
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
              onClick={() => setConfirmCancelId(order.id)}
              className='border border-red-500/40 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-red-400 transition hover:border-red-500 hover:text-red-500 cursor-pointer'
            >
              Cancelar pedido
            </button>
          )}
        </div>
      )}
    </article>
  )
}
