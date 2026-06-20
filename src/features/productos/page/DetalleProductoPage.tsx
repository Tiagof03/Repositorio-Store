import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'

import ProductDetailSkeleton from '@/features/productos/components/ProductDetailSkeleton'
import RelatedProducts from '@/features/productos/components/RelatedProducts'
import QuantitySelector from '@/features/productos/components/QuantitySelector'

import Layout from '@/shared/Layout'

import { useCartStore } from '@/store/useCartStore'
import { useAuthStore } from '@/store/useAuthStore'

import { useProduct, useProducts } from '@/features/productos/hooks/useProductos'

export default function DetalleProductoPage() {

  const { id } = useParams()
  const token = useAuthStore((s) => s.token)

  const {
    data: product,
    isLoading,
    isError,
  } = useProduct(Number(id))

  const {
    data: result,
  } = useProducts()

  const products = result?.items

  const [quantity, setQuantity] = useState(1)
  const [removedIngredientes, setRemovedIngredientes] = useState<number[]>([])

  const addItem = useCartStore(
    (state) => state.addItem
  )

  if (isLoading) {
    return (
      <Layout>
        <main className='mx-auto max-w-7xl px-6 py-14'>
          <ProductDetailSkeleton />
        </main>
      </Layout>
    )
  }

  if (isError && !token) {
    return (
      <Layout>
        <div className='flex min-h-[70vh] flex-col items-center justify-center gap-6 px-6 text-center'>
          <h2 className='text-5xl font-black uppercase text-on-surface'>Iniciá sesión</h2>
          <p className='max-w-md text-on-surface-variant/70'>
            Necesitás estar logueado para ver el detalle del producto.
          </p>
          <Link
            to='/login'
            state={{ from: { pathname: `/products/${id}` } }}
            className='border border-primary bg-primary px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-on-primary transition hover:opacity-90'
          >
            Ir a iniciar sesión
          </Link>
        </div>
      </Layout>
    )
  }

  if (isError || !product) {
    return (
      <Layout>

        <div className='flex min-h-[60vh] items-center justify-center text-2xl font-bold text-on-surface'>

          Producto no encontrado

        </div>

      </Layout>
    )
  }

  return (
    <Layout>

      <main className='mx-auto max-w-7xl px-6 py-14'>

        <section className='grid grid-cols-1 gap-14 lg:grid-cols-2'>

          <div className='overflow-hidden border border-outline-variant/20 bg-surface-container'>

            <img
              src={product.imagenes_url?.[0]}
              alt={product.nombre}
              className='h-full w-full object-cover'
            />

          </div>

          <div className='space-y-8'>

            <div>

              <span className='text-sm uppercase tracking-[0.3em] text-outline'>

                {product.disponible
                  ? 'Disponible'
                  : 'Sin stock'}

              </span>

              <h1 className='mt-4 text-5xl font-black uppercase tracking-tight text-on-surface'>

                {product.nombre}

              </h1>

              <p className='mt-4 text-3xl font-bold text-primary'>

                ${product.precio_base}

              </p>

            </div>

            <p className='text-lg leading-8 text-on-surface-variant/70'>

              {product.descripcion}

            </p>

            <div>

              <h2 className='mb-4 text-sm font-bold uppercase tracking-[0.3em] text-primary'>

                Stock disponible

              </h2>

              <div className='flex flex-wrap gap-3'>

                <span
                  className='border border-outline-variant/30 bg-surface-variant px-4 py-2 text-sm text-on-surface-variant'
                >

                  {product.stock_cantidad} unidades

                </span>

              </div>

            </div>

            {product.ingredientes && product.ingredientes.length > 0 && (
              <div>
                <h2 className='mb-4 text-sm font-bold uppercase tracking-[0.3em] text-primary'>
                  Ingredientes
                </h2>
                <div className='flex flex-wrap gap-2'>
                  {product.ingredientes.map((ing) => (
                    <label
                      key={ing.id}
                      className={`flex items-center gap-2 border px-4 py-2 text-sm transition
                        $                      {!ing.es_removible
                          ? 'opacity-40 cursor-not-allowed border-outline-variant/30 bg-surface-variant text-on-surface-variant'
                          : 'border-outline-variant/30 bg-surface-variant text-on-surface-variant hover:border-primary/50 cursor-pointer'}`}
                    >
                      <input
                        type='checkbox'
                        checked={removedIngredientes.includes(ing.id)}
                        disabled={!ing.es_removible}
                        onChange={(e) => {
                          if (!ing.es_removible) return
                          setRemovedIngredientes(
                            e.target.checked
                              ? [...removedIngredientes, ing.id]
                              : removedIngredientes.filter((rid) => rid !== ing.id)
                          )
                        }}
                        className='accent-primary'
                      />
                      <span>{ing.nombre}</span>
                      {!ing.es_removible && (
                        <span className='text-[10px] uppercase tracking-wider text-gray-500 ml-auto'>(fijo)</span>
                      )}
                      {ing.es_alergeno && (
                        <span className='text-[10px] uppercase tracking-wider text-yellow-400'>(alergeno)</span>
                      )}
                    </label>
                  ))}
                </div>
                <p className='mt-2 text-xs text-on-surface-variant/50'>
                  Desmarc&aacute; los ingredientes que quer&eacute;s remover de tu pedido.
                </p>
              </div>
            )}

            <div className='flex flex-col gap-4 md:flex-row md:items-center'>

              <QuantitySelector value={quantity} onChange={setQuantity} />

              <button
                onClick={() => {
                  addItem(product, quantity, removedIngredientes)
                  setQuantity(1)
                  setRemovedIngredientes([])
                }}
                className='flex-1 border border-primary bg-primary px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-on-primary transition hover:opacity-90 cursor-pointer'
              >

                Agregar al carrito

              </button>

            </div>

          </div>

        </section>

        <RelatedProducts
          products={
            products?.filter(
              (p) => p.id !== product.id
            ) || []
          }
        />

      </main>

    </Layout>
  )
}