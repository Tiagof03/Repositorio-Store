import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import FilterBar from '@/features/productos/components/FilterBar'
import Layout from '@/shared/Layout'
import ProductCard from '@/features/productos/components/ProductCard'
import ProductGridSkeleton from '@/features/productos/components/ProductGridSkeleton'
import { useAuthStore } from '@/store/useAuthStore'
import { useCategories } from '@/features/categorias/hooks/useCategorias'
import { useProducts } from '@/features/productos/hooks/useProductos'

const PAGE_SIZE = 12

export default function ProductosPage() {

  const token = useAuthStore((s) => s.token)

  const [search, setSearch] =
    useState('')

  const [debouncedSearch, setDebouncedSearch] =
    useState('')

  const [sort, setSort] =
    useState('default')

  const [page, setPage] = useState(1)

  const [categoryId, setCategoryId] = useState<number | undefined>(undefined)

  const { data: categories } = useCategories()

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search)
      setPage(1)
    }, 400)
    return () => clearTimeout(timer)
  }, [search])

  const {
    data: result,
    isLoading,
    isError,
  } = useProducts({
    buscar: debouncedSearch || undefined,
    size: PAGE_SIZE,
    page,
    categoria_id: categoryId,
  })

  const products = result?.items
  const totalPages = result?.pages ?? 0

  const sortedProducts = products
    ?.slice()
    .sort((a, b) => {
      if (sort === 'asc') return a.precio_base - b.precio_base
      if (sort === 'desc') return b.precio_base - a.precio_base
      return 0
    })

  if (isLoading) {
    return (
      <Layout>
        <main className='mx-auto max-w-7xl px-6 py-14'>
          <div className='mb-20 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between'>
            <div className='max-w-3xl'>
              <div className='mb-4 h-4 w-28 rounded bg-surface-container-highest/50 animate-pulse' />
              <div className='mb-6 h-16 w-96 rounded bg-surface-container-highest/50 animate-pulse' />
            </div>
          </div>
          <ProductGridSkeleton />
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
            Necesitás estar logueado para ver el menú.
          </p>
          <Link
            to='/login'
            state={{ from: { pathname: '/' } }}
            className='border border-primary bg-primary px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-on-primary transition hover:opacity-90'
          >
            Ir a iniciar sesión
          </Link>
        </div>
      </Layout>
    )
  }

  if (isError) {
    return (
      <Layout>
        <div className='flex min-h-[70vh] items-center justify-center text-3xl font-bold text-red-500'>
          Error al cargar productos
        </div>
      </Layout>
    )
  }

  const handleCategoryChange = (value: number | undefined) => {
    setCategoryId(value)
    setPage(1)
  }

  return (
    <Layout>
      <main className='mx-auto max-w-7xl px-6 py-14'>
        <section className='mb-20 text-center'>
          <div className='mx-auto max-w-3xl'>
            <span className='mb-4 block text-sm uppercase tracking-[0.3em] text-primary'>
              Store Online
            </span>
            <h1 className='mb-6 text-5xl font-black uppercase leading-none tracking-tight text-on-surface md:text-7xl'>
              Nuestro <span className='text-primary'>Menú</span>
            </h1>
            <p className='mx-auto max-w-2xl text-base leading-8 text-on-surface-variant/70 md:text-lg'>
              Descubrí nuestros productos y realizá tu pedido online.
            </p>
          </div>
        </section>

        <FilterBar
         search={search}
         onSearch={setSearch}
         sort={sort}
         onSort={setSort}
         categories={token ? categories?.map((c) => ({ id: c.id, nombre: c.nombre })) : undefined}
         categoryId={categoryId}
         onCategoryChange={handleCategoryChange}
         />

        {sortedProducts?.length === 0 ? (
          <div className='flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center'>
            <h2 className='text-4xl font-black uppercase text-on-surface'>
              No se encontraron productos
            </h2>
            <p className='text-on-surface-variant/70'>
              Probá con otra búsqueda.
            </p>
          </div>
        ) : (
          <>
            <section className='grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4'>
              {sortedProducts?.map(
                (product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                )
              )}
            </section>

            <div className='mt-14 flex items-center justify-center gap-6'>
              <button
                onClick={() => setPage((prev) => Math.max(1, prev - 1))}
                disabled={page === 1}
                className='border border-outline-variant/30 bg-surface-container-high px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-on-surface-variant transition hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer'
              >
                Anterior
              </button>
              <span className='text-sm text-on-surface-variant/70'>
                Página {page}
              </span>
              <button
                onClick={() => setPage((prev) => prev + 1)}
                disabled={page >= totalPages}
                className='border border-outline-variant/30 bg-surface-container-high px-6 py-3 text-sm font-bold uppercase tracking-[0.2em] text-on-surface-variant transition hover:border-primary hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer'
              >
                Siguiente
              </button>
            </div>
          </>
        )}

      </main>
    </Layout>
  )
}