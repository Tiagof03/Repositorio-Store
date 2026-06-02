import { Link } from 'react-router-dom'
import { useCartStore } from '@/store/useCartStore'
import { useAuthStore } from '@/store/useAuthStore'

export default function Navbar() {
  const totalItems = useCartStore((state) => state.totalItems())
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  return (
    <header className='sticky top-0 z-50 border-b border-outline-variant/30 bg-surface/95 backdrop-blur'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-5'>
        <Link to='/'>
          <h1 className='text-headline-md font-bold text-primary uppercase tracking-tighter'>Food Store</h1>
          <span className='text-label-sm text-on-surface-variant/60 uppercase tracking-wider'>Store Online</span>
        </Link>
        <nav className='hidden items-center gap-8 lg:flex'>
          <Link to='/' className='text-label-md text-on-surface-variant tracking-wider uppercase transition hover:text-primary'>Inicio</Link>
          <Link to='/' className='text-label-md text-on-surface-variant tracking-wider uppercase transition hover:text-primary'>Productos</Link>
          {token && (
            <Link to='/orders' className='text-label-md text-on-surface-variant tracking-wider uppercase transition hover:text-primary'>Pedidos</Link>
          )}
        </nav>
        <div className='flex items-center gap-4'>
          {!token ? (
            <Link to='/login' className='border border-primary text-label-md text-primary font-bold uppercase tracking-wider px-4 py-3 transition hover:bg-primary hover:text-on-primary cursor-pointer'>
              Ingresar
            </Link>
          ) : (
            <>
              <span className='hidden text-body-md text-primary lg:block'>Hola {user?.nombre}</span>
              <button onClick={logout} className='bg-error-container text-on-error-container text-label-md font-bold uppercase tracking-wider px-4 py-3 hover:brightness-110 active:scale-[0.98] transition-all cursor-pointer'>
                Cerrar sesion
              </button>
            </>
          )}
          <Link to='/cart' className='relative flex h-12 w-12 items-center justify-center border border-outline-variant/40 bg-surface-container-high text-on-surface-variant transition hover:text-primary hover:border-primary'>
            <span className='material-symbols-outlined text-[24px]'>shopping_cart</span>
            {totalItems > 0 && (
              <span className='absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center bg-primary-container text-on-primary-container text-label-sm font-bold'>{totalItems}</span>
            )}
          </Link>
        </div>
      </div>
    </header>
  )

}