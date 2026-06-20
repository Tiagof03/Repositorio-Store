import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { useCartStore } from '../../../store/useCartStore'
import { useToastStore } from '../../../store/useToastStore'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({
  product,
}: ProductCardProps) {

  const addItem = useCartStore(
    (state) => state.addItem
  )

  const addToast = useToastStore((s) => s.addToast)

  const handleAddToCart = () => {
    addItem(product)
    addToast('Producto agregado al carrito', 'success')
  }

  return (
    <article className='group overflow-hidden border border-outline-variant/20 bg-surface-container transition duration-300 hover:border-primary/50'>

      <div className='overflow-hidden'>

        <img
          src={product.imagenes_url?.[0]}
          alt={product.nombre}
          className='aspect-square w-full object-cover transition duration-700 group-hover:scale-105'
        />

      </div>

      <div className='space-y-4 p-5'>

        <div className='flex items-center justify-between'>

          <span className='text-xs uppercase tracking-[0.3em] text-outline'>

            {product.disponible
              ? 'Disponible'
              : 'Sin stock'}

          </span>

          <span className='text-lg font-bold text-primary'>

            ${product.precio_base}

          </span>

        </div>

        <div>

          <h3 className='mb-2 text-2xl font-bold text-on-surface transition group-hover:text-primary'>

            {product.nombre}

          </h3>

          <p className='text-sm leading-7 text-on-surface-variant/70'>

            {product.descripcion}

          </p>

        </div>

        <div className='space-y-3'>

          <button
            onClick={handleAddToCart}
            className='w-full border border-primary py-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary transition hover:bg-primary hover:text-on-primary cursor-pointer'
          >

            Agregar al carrito

          </button>

          <Link
            to={`/products/${product.id}`}
            className='block w-full border border-outline-variant/30 py-3 text-center text-sm font-semibold uppercase tracking-[0.2em] text-on-surface-variant transition hover:border-primary hover:text-on-surface'
          >

            Ver detalle

          </Link>

        </div>

      </div>

    </article>
  )
}