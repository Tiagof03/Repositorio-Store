interface OrderDetailItemProps {
  productoId: number
  nombreSnapshot: string | undefined
  cantidad: number
  precioSnapshot: number
  subtotalSnap: number
}

export default function OrderDetailItem({ productoId, nombreSnapshot, cantidad, precioSnapshot, subtotalSnap }: OrderDetailItemProps) {
  return (
    <div className='flex items-center justify-between border border-outline-variant/30 bg-surface-container-high p-4'>
      <div className='flex items-center gap-4'>
        <div className='flex h-16 w-16 items-center justify-center bg-surface-variant text-on-surface-variant'>
          <span className='material-symbols-outlined text-[24px]'>restaurant_menu</span>
        </div>
        <div>
          <h3 className='text-body-md font-bold text-on-surface'>{nombreSnapshot || `Producto #${productoId}`}</h3>
          <p className='text-label-sm text-on-surface-variant/70'>Cantidad: {cantidad}</p>
        </div>
      </div>
      <span className='text-headline-md font-bold text-primary'>${subtotalSnap ?? (precioSnapshot * cantidad)}</span>
    </div>
  )
}
