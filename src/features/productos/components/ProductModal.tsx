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
    <div className='fixed inset-0 z-[100] flex items-center justify-center bg-black/60 px-6'>
      <div className='relative bg-surface-container border border-outline-variant/30 w-full max-w-2xl mx-4'>
        <div className='px-6 py-5 border-b border-outline-variant/30 flex items-center justify-between'>
          <h2 className='text-headline-md font-bold text-on-surface'>
            Nuevo Producto
          </h2>

          <button
            onClick={onClose}
            className='text-on-surface-variant hover:text-primary transition-colors cursor-pointer'
          >
            <span className='material-symbols-outlined text-[24px]'>close</span>
          </button>
        </div>

        <div className='px-6 py-6'>
          <form className='flex flex-col gap-stack-md'>
            <div className='flex flex-col gap-stack-sm'>
              <label className='text-label-md text-on-surface-variant'>
                Nombre
              </label>

              <input
                type='text'
                className='bg-surface-container-high border border-outline-variant/30 text-on-surface text-body-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40'
              />
            </div>

            <div className='flex flex-col gap-stack-sm'>
              <label className='text-label-md text-on-surface-variant'>
                Precio
              </label>

              <input
                type='number'
                className='bg-surface-container-high border border-outline-variant/30 text-on-surface text-body-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40'
              />
            </div>

            <div className='flex flex-col gap-stack-sm'>
              <label className='text-label-md text-on-surface-variant'>
                Descripción
              </label>

              <textarea
                className='bg-surface-container-high border border-outline-variant/30 text-on-surface text-body-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40 resize-none'
                rows={4}
              />
            </div>

            <div className='flex justify-end gap-3 pt-4 border-t border-outline-variant/30'>
              <button type='button' onClick={onClose} className='border border-outline-variant/30 text-on-surface-variant text-label-md font-bold uppercase tracking-wider px-6 py-3 hover:bg-surface-container-high transition-colors cursor-pointer'>
                Cancelar
              </button>
              <button className='bg-primary-container text-on-primary-container text-label-md font-bold uppercase tracking-wider px-6 py-3 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer'>
                Guardar Producto
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}