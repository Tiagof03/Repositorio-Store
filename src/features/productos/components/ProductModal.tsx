interface ProductModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ProductModal({
  isOpen,
  onClose,
}: ProductModalProps) {
  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-6'>
      <div className='w-full max-w-2xl border border-outline-variant/20 bg-surface-container p-8'>
        <div className='mb-8 flex items-center justify-between'>
          <h2 className='text-3xl font-black uppercase text-on-surface'>
            Nuevo Producto
          </h2>

          <button
            onClick={onClose}
            className='text-2xl text-primary cursor-pointer'
          >
            ✕
          </button>
        </div>

        <form className='space-y-6'>
          <div>
            <label className='mb-2 block text-sm uppercase tracking-[0.2em] text-outline'>
              Nombre
            </label>

            <input
              type='text'
              className='w-full border border-outline-variant/30 bg-surface-container-high px-4 py-3 text-on-surface outline-none focus:border-primary'
            />
          </div>

          <div>
            <label className='mb-2 block text-sm uppercase tracking-[0.2em] text-outline'>
              Precio
            </label>

            <input
              type='number'
              className='w-full border border-outline-variant/30 bg-surface-container-high px-4 py-3 text-on-surface outline-none focus:border-primary'
            />
          </div>

          <div>
            <label className='mb-2 block text-sm uppercase tracking-[0.2em] text-outline'>
              Descripción
            </label>

            <textarea
              className='w-full border border-outline-variant/30 bg-surface-container-high px-4 py-3 text-on-surface outline-none focus:border-primary'
              rows={4}
            />
          </div>

          <button className='w-full border border-primary bg-primary py-4 text-sm font-bold uppercase tracking-[0.2em] text-on-primary transition hover:opacity-90 cursor-pointer'>
            Guardar Producto
          </button>
        </form>
      </div>
    </div>
  )
}