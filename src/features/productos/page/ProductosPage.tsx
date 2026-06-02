import { useState } from 'react'

import FilterBar from '@/features/productos/components/FilterBar'
import Layout from '@/shared/Layout'
import ProductCard from '@/features/productos/components/ProductCard'

import { useProducts } from '@/features/productos/hooks/useProducts'

export default function ProductosPage() {

  const [search, setSearch] =
    useState('')

  const [sort, setSort] =
    useState('default')

  const {
    data: products,
    isLoading,
    isError,
  } = useProducts()

  const filteredProducts = products

    ?.filter((product) => {

      const matchesSearch =
        product.nombre
          .toLowerCase()
          .includes(search.toLowerCase())

      return matchesSearch
    })

    .sort((a, b) => {

      if (sort === 'asc') {
        return (
          a.precio_base -
          b.precio_base
        )
      }

      if (sort === 'desc') {
        return (
          b.precio_base -
          a.precio_base
        )
      }

      return 0
    })

  if (isLoading) {
    return (
      <Layout>

        <div className='flex min-h-[70vh] items-center justify-center text-headline-md font-semibold text-on-surface'>

          Cargando productos...

        </div>

      </Layout>
    )
  }

  if (isError) {
    return (
      <Layout>

        <div className='flex min-h-[70vh] items-center justify-center text-headline-md font-semibold text-error'>

          Error al cargar productos

        </div>

      </Layout>
    )
  }

  return (
    <Layout>

      <main className='mx-auto max-w-7xl px-6 py-14'>

        <section className='mb-20 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between'>

          <div className='max-w-3xl'>

            <span className='mb-4 block text-label-sm text-primary uppercase tracking-wider'>

              Store Online

            </span>

            <h1 className='mb-6 text-display-lg font-bold leading-none tracking-tight'>

              Nuestro <span className='text-primary'>Menú</span>

            </h1>

            <p className='max-w-2xl text-body-lg text-on-surface-variant/70'>

              Descubrí nuestros productos y realizá tu pedido online.

            </p>

          </div>

        </section>

        <FilterBar
          search={search}
          onSearch={setSearch}
          sort={sort}
          onSort={setSort}
        />

        {filteredProducts?.length === 0 ? (

          <div className='flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center'>

            <h2 className='text-headline-lg font-bold text-on-surface'>

              No se encontraron productos

            </h2>

            <p className='text-body-md text-on-surface-variant/70'>

              Probá con otra búsqueda.

            </p>

          </div>

        ) : (

          <section className='grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4'>

            {filteredProducts?.map(
              (product) => (

                <ProductCard
                  key={product.id}
                  product={product}
                />

              )
            )}

          </section>

        )}

      </main>

    </Layout>
  )

}