import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <footer className='mt-24 border-t border-outline-variant/20 bg-surface-container'>
      <div className='mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 py-16 md:grid-cols-2'>
        <div>
          <h3 className='mb-6 text-sm font-bold uppercase tracking-[0.3em] text-primary'>
            Navegación
          </h3>

          <div className='flex flex-col gap-4'>
            <Link
              to='/'
              className='text-on-surface-variant/70 transition hover:text-on-surface'
            >
              Productos
            </Link>

            <Link
              to='/cart'
              className='text-on-surface-variant/70 transition hover:text-on-surface'
            >
              Carrito
            </Link>

            <Link
              to='/orders'
              className='text-on-surface-variant/70 transition hover:text-on-surface'
            >
              Pedidos
            </Link>
          </div>
        </div>

        <div>
          <h3 className='mb-6 text-sm font-bold uppercase tracking-[0.3em] text-primary'>
            Seguinos
          </h3>

          <div className='flex gap-4'>
            <button className='border border-outline-variant/30 px-4 py-3 text-primary transition hover:border-primary hover:text-on-surface cursor-pointer'>
              Instagram
            </button>

            <button className='border border-outline-variant/30 px-4 py-3 text-primary transition hover:border-primary hover:text-on-surface cursor-pointer'>
              Facebook
            </button>

            <button className='border border-outline-variant/30 px-4 py-3 text-primary transition hover:border-primary hover:text-on-surface cursor-pointer'>
              X
            </button>
          </div>

          <div className='mt-8 space-y-2 text-sm text-on-surface-variant/60'>
            <p>foodstore@email.com</p>

            <p>+54 11 5555 5555</p>
          </div>
        </div>
      </div>

      <div className='border-t border-outline-variant/20 py-6 text-center text-sm text-on-surface-variant/50'>
        © 2026 Food Store — Todos los
        derechos reservados.
      </div>
    </footer>
  )
}