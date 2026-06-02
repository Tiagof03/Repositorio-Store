import type { CartItem } from '@/features/cart/types'

interface CartItemCardProps {
  item: CartItem
  onIncrease: (id: number) => void
  onDecrease: (id: number) => void
  onRemove: (id: number) => void
}

export default function CartItemCard({ item, onIncrease, onDecrease, onRemove }: CartItemCardProps) {
  return (
    <article className='flex flex-col gap-6 border border-outline-variant/30 bg-surface-container-low p-5 md:flex-row md:items-center'>
      <div className='h-32 w-full overflow-hidden bg-surface-variant md:w-32'>
        <img
          src={item.imagenes_url?.[0] || 'https://placehold.co/200x200'}
          alt={item.nombre}
          className='h-full w-full object-cover'
        />
      </div>

      <div className='flex-1 space-y-3'>
        <span className='text-label-sm text-on-surface-variant/60 uppercase tracking-wider'>
          {item.disponible ? 'Disponible' : 'Sin stock'}
        </span>
        <h2 className='text-body-lg font-bold text-on-surface'>{item.nombre}</h2>

        <div className='flex w-fit items-center border border-outline-variant/30 bg-surface-container-high'>
          <button onClick={() => onDecrease(item.id)} className='px-4 py-2 text-primary cursor-pointer'>-</button>
          <span className='px-4 text-body-md font-bold text-on-surface'>{item.quantity}</span>
          <button onClick={() => onIncrease(item.id)} className='px-4 py-2 text-primary cursor-pointer'>+</button>
        </div>
      </div>

      <div className='flex items-center justify-between gap-6 md:flex-col md:items-end'>
        <span className='text-headline-md font-bold text-primary'>${item.precio_base * item.quantity}</span>
        <button onClick={() => onRemove(item.id)} className='bg-error-container text-on-error-container text-label-md font-bold uppercase tracking-wider px-4 py-2 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer'>
          Eliminar
        </button>
      </div>
    </article>
  )

}
