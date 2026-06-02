import ProductCard from './ProductCard'

import type { Product } from '../types'

interface Props {
  products: Product[]
}

export default function RelatedProducts({
  products,
}: Props) {

  if (products.length === 0) {
    return null
  }

  return (
    <section className='mt-24'>

      <div className='mb-10 flex items-end justify-between'>

        <div>

          <span className='text-label-sm text-primary uppercase tracking-wider'>

            Recomendados

          </span>

          <h2 className='mt-2 text-headline-lg font-bold text-on-surface'>

            Productos Relacionados

          </h2>

        </div>

      </div>

      <section className='grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4'>

        {products
          .slice(0, 4)
          .map((product) => (

            <ProductCard
              key={product.id}
              product={product}
            />

          ))}

      </section>

    </section>
  )
}