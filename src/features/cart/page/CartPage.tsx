import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Layout from '@/shared/Layout'
import { useCartStore } from '@/store/useCartStore'
import { useCreateOrder } from '@/features/orders/hooks/useOrders'
import { useAuthStore } from '@/store/useAuthStore'
import { useDirections, useCreateDirection, useUpdateDirection } from '@/features/directions/hooks/useDirections'
import { useFormasPago } from '@/features/formas-pago/hooks/useFormasPago'
import CartItemCard from '@/features/cart/components/CartItemCard'
import CartSkeleton from '@/features/cart/components/CartSkeleton'
import OrderSummary from '@/features/cart/components/OrderSummary'
import DirectionForm from '@/features/cart/components/DirectionForm'
import type { DirectionFormData } from '@/features/cart/components/DirectionForm'
import MetodoEnvioSelector from '@/features/cart/components/MetodoEnvioSelector'
import { useToastStore } from '@/store/useToastStore'
import { usePaymentStore } from '@/store/usePaymentStore'
import { extractApiError } from '@/lib/errorParser'
import type { Pedido } from '@/features/orders/types'

const COSTO_ENVIO = Number(import.meta.env.VITE_COSTO_ENVIO) || 50.00

export default function CartPage() {
  const navigate = useNavigate()
  const token = useAuthStore((state) => state.token)
  const items = useCartStore((state) => state.items)
  const removeItem = useCartStore((state) => state.removeItem)
  const clearCart = useCartStore((state) => state.clearCart)
  const increaseQuantity = useCartStore((state) => state.increaseQuantity)
  const decreaseQuantity = useCartStore((state) => state.decreaseQuantity)

  const { data: directions, isLoading: isLoadingDirections } = useDirections()
  const { data: formasPago, isLoading: isLoadingFormas } = useFormasPago()

  const [selectedDirection, setSelectedDirection] = useState<number>(0)
  const [selectedFormaPago, setSelectedFormaPago] = useState<string>('')
  const [metodoEnvio, setMetodoEnvio] = useState<'DOMICILIO' | 'RETIRO'>('DOMICILIO')

  useEffect(() => {
    if (directions && directions.length > 0 && selectedDirection === 0) {
      setSelectedDirection(directions[0].id)
    }
  }, [directions, selectedDirection])

  const mutation = useCreateOrder()
  const createDirectionMutation = useCreateDirection()
  const updateDirectionMutation = useUpdateDirection()
  const addToast = useToastStore((s) => s.addToast)
  const startPayment = usePaymentStore((s) => s.startPayment)

  const requiereEnvio = metodoEnvio === 'DOMICILIO'
  const subtotal = items.reduce((acc, item) => acc + item.precio_base * item.quantity, 0)
  const total = subtotal + (requiereEnvio ? COSTO_ENVIO : 0)

  const formaPago = selectedFormaPago || formasPago?.[0]?.codigo || 'EFECTIVO'

  const payload = {
    metodo_envio: metodoEnvio,
    direccion_id: requiereEnvio ? selectedDirection : null,
    forma_pago_codigo: formaPago,
    notas: null,
    items: items.map((item) => ({
      producto_id: item.id,
      cantidad: item.quantity,
      personalizacion: item.personalizacion ?? [],
    })),
  }

  if (isLoadingDirections || isLoadingFormas) {
    return (
      <Layout>
        <main className='mx-auto max-w-7xl px-6 py-14'>
          <div className='mb-14'>
            <div className='h-12 w-48 rounded bg-surface-container-highest/50 animate-pulse' />
          </div>
          <CartSkeleton />
        </main>
      </Layout>
    )
  }

  if (items.length === 0) {
    return (
      <Layout>
        <div className='flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center'>
          <h1 className='text-5xl font-black uppercase text-on-surface'>Carrito vacío</h1>
          <p className='text-on-surface-variant/70'>Agregá productos para comenzar tu pedido.</p>
          <Link to='/' className='border border-primary bg-primary px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-on-primary transition hover:opacity-90'>
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
    if (requiereEnvio && !selectedDirection) {
      addToast('Agregá una dirección de entrega primero', 'error')
      return
    }
    mutation.mutate(payload, {
      onSuccess: (order: Pedido) => {
        addToast('Pedido creado con éxito', 'success')
        clearCart()
        startPayment(order.id)
        navigate(`/payment/${order.id}`)
      },
      onError: (err: unknown) => {
        addToast(extractApiError(err, 'Error al crear el pedido'), 'error')
      },
    })
  }

  return (
    <Layout>
      <main className='mx-auto max-w-7xl px-6 py-14'>
        <div className='mb-14'>
          <h1 className='text-5xl font-black uppercase tracking-tight text-on-surface md:text-7xl'>Tu Pedido</h1>
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
            {!token ? (
              <div className='sticky top-28 space-y-6 border border-outline-variant/20 bg-surface-container p-8 text-center'>
                <h3 className='text-xl font-black uppercase text-on-surface'>Iniciá sesión</h3>
                <p className='text-sm text-on-surface-variant/70'>
                  Necesitás estar logueado para completar tu pedido.
                </p>
                <Link
                  to='/login'
                  state={{ from: { pathname: '/cart' } }}
                  className='inline-block border border-primary bg-primary px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-on-primary transition hover:opacity-90'
                >
                  Iniciar sesión
                </Link>
              </div>
            ) : (
              <div className='sticky top-28 space-y-8 border border-outline-variant/20 bg-surface-container p-8'>
                <h2 className='border-b border-outline-variant/20 pb-4 text-3xl font-black uppercase text-on-surface'>Resumen</h2>

                <MetodoEnvioSelector
                  value={metodoEnvio}
                  onChange={setMetodoEnvio}
                />

                <OrderSummary
                  itemCount={items.length}
                  subtotal={subtotal}
                  costoEnvio={requiereEnvio ? COSTO_ENVIO : 0}
                  total={total}
                />

                <div className='space-y-3'>
                  <label className='block text-sm font-bold uppercase tracking-[0.2em] text-primary'>Forma de pago</label>
                  <select
                    value={formaPago}
                    onChange={(e) => setSelectedFormaPago(e.target.value)}
                    className='w-full border border-outline-variant/30 bg-surface-container-high px-4 py-4 text-on-surface outline-none'
                  >
                    {formasPago?.filter((fp) => fp.habilitado).map((fp) => (
                      <option key={fp.codigo} value={fp.codigo}>
                        {fp.descripcion}
                      </option>
                    ))}
                  </select>
                </div>

                {requiereEnvio && (
                  <>
                    <DirectionForm
                      directions={directions}
                      selectedDirection={selectedDirection}
                      onDirectionChange={setSelectedDirection}
                      onSave={handleSaveDirection}
                      isSaving={createDirectionMutation.isPending}
                      onUpdate={(id, data) => updateDirectionMutation.mutate({ id, data })}
                      isUpdating={updateDirectionMutation.isPending}
                    />

                    {createDirectionMutation.error && (
                      <div className='rounded border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-400'>
                        {createDirectionMutation.error ?? 'Error al guardar dirección'}
                      </div>
                    )}
                  </>
                )}

                <div className='space-y-4'>
                  <button
                    onClick={handleConfirmOrder}
                    disabled={mutation.isPending}
                    className='w-full border border-primary bg-primary py-4 text-sm font-bold uppercase tracking-[0.2em] text-on-primary transition hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer'
                  >
                    {mutation.isPending ? 'Procesando...' : 'Confirmar pedido'}
                  </button>
                  <button
                    onClick={clearCart}
                    className='w-full border border-red-500 py-4 text-sm font-bold uppercase tracking-[0.2em] text-red-500 transition hover:bg-red-500 hover:text-white cursor-pointer'
                  >
                    Vaciar carrito
                  </button>
                </div>
              </div>
            )}
          </aside>
        </div>
      </main>
    </Layout>
  )
}
