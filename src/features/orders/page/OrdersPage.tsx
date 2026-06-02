import Layout from '@/shared/Layout'
import { useOrders } from '@/features/orders/hooks/useOrders'
import OrderCard from '@/features/orders/components/OrderCard'

export default function OrdersPage() {
  const { data: orders, isLoading, isError } = useOrders()

  if (isLoading) {
    return (
      <Layout>
        <div className='flex min-h-[70vh] items-center justify-center text-headline-md font-semibold text-on-surface'>Cargando pedidos...</div>
      </Layout>
    )
  }

  if (isError) {
    return (
      <Layout>
        <div className='flex min-h-[70vh] items-center justify-center text-headline-md font-semibold text-error'>Error al cargar pedidos</div>
      </Layout>
    )
  }

  if (!orders?.length) {
    return (
      <Layout>
        <div className='flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center'>
          <h1 className='text-headline-lg font-bold text-on-surface'>No hay pedidos</h1>
          <p className='text-body-md text-on-surface-variant/70'>Todavía no realizaste pedidos.</p>
        </div>
      </Layout>
    )
  }

  return (
    <Layout>
      <main className='mx-auto max-w-7xl px-6 py-14'>
        <section className='mb-16'>
          <span className='mb-4 block text-label-sm text-primary uppercase tracking-wider'>Historial</span>
          <h1 className='text-display-lg font-bold tracking-tight text-on-surface'>Mis Pedidos</h1>
        </section>

        <section className='space-y-8'>
          {orders.map((order) => (
            <OrderCard key={order.id} order={order} />
          ))}
        </section>
      </main>
    </Layout>
  )
}
