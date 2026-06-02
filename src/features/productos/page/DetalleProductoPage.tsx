import { useState } from 'react'
import { useParams } from 'react-router-dom'

import RelatedProducts from '@/features/productos/components/RelatedProducts'
import QuantitySelector from '@/features/productos/components/QuantitySelector'

import Layout from '@/shared/Layout'

import { useCartStore } from '@/store/useCartStore'

import { useProduct } from '@/features/productos/hooks/useProduct'
import { useProducts } from '@/features/productos/hooks/useProducts'

export default function DetalleProductoPage() {

  const { id } = useParams()

  const {
    data: product,
    isLoading,
    isError,
  } = useProduct(Number(id))

  const {
    data: products,
  } = useProducts()

  const [quantity, setQuantity] = useState(1)

  const addItem = useCartStore(
    (state) => state.addItem
  )

  if (isLoading) {
    return (
      <Layout>

        <div className='flex min-h-[60vh] items-center justify-center text-headline-md font-semibold text-on-surface'>

          Cargando producto...

        </div>

      </Layout>
    )
  }

  if (isError || !product) {
    return (
      <Layout>

        <div className='flex min-h-[60vh] items-center justify-center text-headline-md font-semibold text-on-surface'>

          Producto no encontrado

        </div>

      </Layout>
    )
  }

  return (
    <Layout>

      <main className='mx-auto max-w-7xl px-6 py-14'>

        <section className='grid grid-cols-1 gap-14 lg:grid-cols-2'>

          <div className='overflow-hidden border border-outline-variant/30 bg-surface-container-low'>

            <img
              src={product.imagenes_url?.[0]}
              alt={product.nombre}
              className='h-full w-full object-cover'
            />

          </div>

          <div className='space-y-8'>

            <div>

              <span className='text-label-sm text-on-surface-variant/60 uppercase tracking-wider'>

                {product.disponible
                  ? 'Disponible'
                  : 'Sin stock'}

              </span>

              <h1 className='mt-4 text-display-lg font-bold tracking-tight text-on-surface'>

                {product.nombre}

              </h1>

              <p className='mt-4 text-headline-md font-bold text-primary'>

                ${product.precio_base}

              </p>

            </div>

            <p className='text-body-lg text-on-surface-variant/70'>

              {product.descripcion}

            </p>

            <div>

              <h2 className='mb-4 text-label-md text-primary font-bold uppercase tracking-wider'>

                Stock disponible

              </h2>

              <div className='flex flex-wrap gap-3'>

                <span className='bg-surface-container-high border border-outline-variant/30 px-4 py-2 text-body-md text-on-surface-variant'>

                  {product.stock_cantidad} unidades

                </span>

              </div>

            </div>

            <div className='flex flex-col gap-4 md:flex-row md:items-center'>

              <QuantitySelector value={quantity} onChange={setQuantity} />

              <button
                onClick={() => {
                  addItem(product, quantity)
                  setQuantity(1)
                }}
                className='flex-1 bg-primary-container text-on-primary-container text-label-md font-bold uppercase tracking-wider px-6 py-4 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer'
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