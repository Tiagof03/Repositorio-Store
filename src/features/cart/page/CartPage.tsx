import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Layout from '@/shared/Layout'
import { useCartStore } from '@/store/useCartStore'
import { useCreateOrder } from '@/features/orders/hooks/useCreateOrder'
import { useAuthStore } from '@/store/useAuthStore'
import { useDirections } from '@/features/directions/hooks/useDirections'
import { useCreateDirection } from '@/features/directions/hooks/useCreateDirection'
import { useFormasPago } from '@/features/formas-pago/hooks/useFormasPago'
import CartItemCard from '@/features/cart/components/CartItemCard'
import OrderSummary from '@/features/cart/components/OrderSummary'
import DirectionForm from '@/features/cart/components/DirectionForm'
import type { DirectionFormData } from '@/features/cart/components/DirectionForm'
import type { FormaPago } from '@/features/formas-pago/types'

const COSTO_ENVIO = 50.00

export default function CartPage() {
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token)
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const clearCart = useCartStore((state) => state.clearCart)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)

  const { data: directions } = useDirections()
  const { data: formasPago } = useFormasPago()

  const [selectedDirection, setSelectedDirection] = useState<number>(directions?.[0]?.id ?? 0)
  const [selectedFormaPago, setSelectedFormaPago] = useState<string>('')

  const mutation = useCreateOrder()
  const createDirectionMutation = useCreateDirection()

  const subtotal = items.reduce((acc, item) => acc + item.precio_base * item.quantity, 0)
  const total = subtotal + COSTO_ENVIO

  const formaPago = selectedFormaPago || formasPago?.[0]?.codigo || 'EFECTIVO'

  const payload = {
    direccion_id: selectedDirection,
    forma_pago_codigo: formaPago,
    notas: null,
    items: items.map((item) => ({
      producto_id: item.id,
      cantidad: item.quantity,
      personalizacion: [],
    })),
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className='flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center'>
          <h1 className='text-headline-lg font-bold text-on-surface'>Carrito vacío</h1>
          <p className='text-body-md text-on-surface-variant/70'>Agregá productos para comenzar tu pedido.</p>
          <Link to='/' className='bg-primary-container text-on-primary-container text-label-md font-bold uppercase tracking-wider px-6 py-4 hover:brightness-110 active:scale-[0.98] transition-all'>
            Volver al menú
          </Link>
        </div>
      </Layout>
    )
  }

  const handleSaveDirection = (data: DirectionFormData) => {
    createDirectionMutation.mutate(
      {
        alias: data.alias,
        linea1: data.linea1,
        linea2: data.linea2,
        ciudad: data.ciudad,
        provincia: data.provincia,
        codigo_postal: data.codigo_postal,
        latitud: 0,
        longitud: 0,
        es_principal: false,
      },
      {
        onSuccess: (direction) => {
          setSelectedDirection(direction.id)
        },
      }
    )
  }

  const handleConfirmOrder = () => {
    if (!token) {
      navigate('/login', { state: { from: { pathname: '/cart' } } })
      return
    }
    if (!selectedDirection) {
      alert('Agregá una dirección de entrega primero')
      return
    }
    mutation.mutate(payload, {
      onSuccess: () => {
        clearCart()
        navigate('/orders')
      },
    })
  }

  return (
    <Layout>
      <main className='mx-auto max-w-7xl px-6 py-14'>
        <div className='mb-14'>
          <h1 className='text-display-lg font-bold tracking-tight text-on-surface'>Tu Pedido</h1>
        </div>

        <div className='grid grid-cols-1 gap-10 lg:grid-cols-12'>
          <section className='space-y-4 lg:col-span-8'>
            {items.map((item) => (
              <CartItemCard
                key={item.id}
                item={item}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onRemove={removeItem}
              />
            ))}
          </section>

          <aside className='lg:col-span-4'>
            <div className='sticky top-28 space-y-8 border border-outline-variant/30 bg-surface-container-low p-8'>
              <h2 className='border-b border-outline-variant/30 pb-4 text-headline-md font-bold text-on-surface'>Resumen</h2>

              <OrderSummary
                itemCount={items.length}
                subtotal={subtotal}
                costoEnvio={COSTO_ENVIO}
                total={total}
              />

              <div className='space-y-3'>
                <label className='block text-label-md text-primary font-bold uppercase tracking-wider'>Forma de pago</label>
                <select
                  value={formaPago}
                  onChange={(e) => setSelectedFormaPago(e.target.value)}
                  className='w-full bg-surface-container-high border border-outline-variant/30 text-on-surface text-body-md px-4 py-4 focus:outline-none focus:ring-1 focus:ring-primary'
                >
                  {formasPago?.filter((fp: FormaPago) => fp.habilitado).map((fp: FormaPago) => (
                    <option key={fp.codigo} value={fp.codigo}>
                      {fp.descripcion}
                    </option>
                  ))}
                </select>
              </div>

              <DirectionForm
                directions={directions}
                selectedDirection={selectedDirection}
                onDirectionChange={setSelectedDirection}
                onSave={handleSaveDirection}
                isSaving={createDirectionMutation.isPending}
              />

              <div className='space-y-4'>
                <button
                  onClick={handleConfirmOrder}
                  disabled={mutation.isPending}
                  className='w-full bg-primary-container text-on-primary-container text-label-md font-bold uppercase tracking-wider py-4 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
                >
                  {mutation.isPending ? 'Procesando...' : 'Confirmar pedido'}
                </button>
                <button
                  onClick={clearCart}
                  className='w-full bg-error-container text-on-error-container text-label-md font-bold uppercase tracking-wider py-4 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer'
                >
                  Vaciar carrito
                </button>
              </div>
            </div>
          </aside>
        </div>
      </main>
    </Layout>
  )
}
