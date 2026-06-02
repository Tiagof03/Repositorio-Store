interface OrderSummaryProps {
  itemCount: number
  subtotal: number
  costoEnvio: number
  total: number
}

export default function OrderSummary({ itemCount, subtotal, costoEnvio, total }: OrderSummaryProps) {
  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between text-body-md text-on-surface-variant/70'>
        <span>Productos ({itemCount})</span>
        <span>${subtotal}</span>
      </div>
      <div className='flex items-center justify-between text-body-md text-on-surface-variant/70'>
        <span>Envío</span>
        <span>${costoEnvio}</span>
      </div>
      <div className='border-t border-outline-variant/30 pt-4 flex items-center justify-between text-headline-md font-bold text-primary'>
        <span>Total</span>
        <span>${total}</span>
      </div>
    </div>
  )
}
