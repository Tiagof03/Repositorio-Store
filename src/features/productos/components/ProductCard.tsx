import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { useCartStore } from '../../../store/useCartStore'
import { useState } from 'react'

import Toast from '../../../shared/Toast'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({
  product,
}: ProductCardProps) {

  const addItem = useCartStore(
    (state) => state.addItem
  )

  const [showToast, setShowToast] =
    useState(false)

  const handleAddToCart = () => {

    addItem(product)

    setShowToast(true)

    setTimeout(() => {
      setShowToast(false)
    }, 2000)
  }

  return (
    <article className='group border border-outline-variant/30 bg-surface-container-low transition duration-300 hover:border-primary/50 hover:shadow-[0px_4px_20px_rgba(0,0,0,0.04)]'>

      <div className='overflow-hidden'>

        <img
          src={product.imagenes_url?.[0]}
          alt={product.nombre}
          className='aspect-square w-full object-cover transition duration-700 group-hover:scale-105'
        />

      </div>

      <div className='space-y-4 p-5'>

        <div className='flex items-center justify-between'>

          <span className='text-label-sm text-on-surface-variant/60 uppercase tracking-wider'>

            {product.disponible
              ? 'Disponible'
              : 'Sin stock'}

          </span>

          <span className='text-headline-md font-bold text-primary'>

            ${product.precio_base}

          </span>

        </div>

        <div>

          <h3 className='mb-2 text-body-lg font-bold text-on-surface transition group-hover:text-primary'>

            {product.nombre}

          </h3>

          <p className='text-body-md text-on-surface-variant/70'>

            {product.descripcion}

          </p>

        </div>

        <div className='space-y-3'>

          <button
            onClick={handleAddToCart}
            className='w-full bg-primary-container text-on-primary-container text-label-md font-bold uppercase tracking-wider py-3 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer'
          >

            Agregar al carrito

          </button>

          <Link
            to={`/products/${product.id}`}
            className='block w-full border border-outline-variant/30 text-on-surface-variant text-label-md text-center py-3 hover:bg-surface-container-high transition-colors'
          >

            Ver detalle

          </Link>

        </div>

      </div>

      {showToast && (
        <Toast message='Producto agregado al carrito' />
      )}

    </article>
  )
}