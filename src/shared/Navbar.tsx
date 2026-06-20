import { Link } from 'react-router-dom'
import { useCartStore } from '@/store/useCartStore'
import { useAuthStore } from '@/store/useAuthStore'

export default function Navbar() {
  const totalItems = useCartStore((state) => state.totalItems())
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const logout = useAuthStore((state) => state.logout)

  return (
    <header className='sticky top-0 z-50 border-b border-outline-variant/20 bg-background/95 backdrop-blur'>
      <div className='mx-auto flex max-w-7xl items-center justify-between px-6 py-5'>
        <Link to='/'>
          <h1 className='text-2xl font-black uppercase tracking-tight text-primary'>Food Store</h1>
          <span className='text-xs uppercase tracking-[0.3em] text-outline'>Store Online</span>
        </Link>
        <nav className='hidden items-center gap-8 lg:flex'>
          <Link to='/' className='text-sm uppercase tracking-[0.2em] text-on-surface-variant transition hover:text-on-surface'>Inicio</Link>
          <Link to='/' className='text-sm uppercase tracking-[0.2em] text-on-surface-variant transition hover:text-on-surface'>Productos</Link>
          {token && (
            <>
              <Link to='/orders' className='text-sm uppercase tracking-[0.2em] text-on-surface-variant transition hover:text-on-surface'>Pedidos</Link>
            </>
          )}
        </nav>
        <div className='flex items-center gap-4'>
          {!token ? (
            <Link to='/login' className='border border-primary px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-primary transition hover:bg-primary hover:text-on-primary'>Ingresar</Link>
          ) : (
            <>
              <span className='hidden text-sm text-primary lg:block'>Hola {user?.nombre}</span>
              <button onClick={logout} className='border border-red-500 px-4 py-3 text-xs font-bold uppercase tracking-[0.2em] text-red-500 transition hover:bg-red-500 hover:text-white cursor-pointer'>Cerrar sesion</button>
            </>
          )}
          <Link to='/cart' className='relative flex h-12 w-12 items-center justify-center border border-outline-variant/30 bg-surface-container-high text-xl text-primary transition hover:border-primary'>
            🛒
            <span className='absolute -right-2 -top-2 flex h-6 w-6 items-center justify-center rounded-full bg-primary text-xs font-bold text-on-primary'>{totalItems}</span>
          </Link>
        </div>
      </div>
    </header>
  )
}