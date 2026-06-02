import { Link } from 'react-router-dom'
export default function Footer() {
  return (
    <footer className='mt-24 border-t border-outline-variant/30 bg-surface-container'>
      <div className='mx-auto grid max-w-7xl grid-cols-1 gap-14 px-6 py-16 md:grid-cols-3'>
        <div className='space-y-5'>
          <span className='text-label-sm text-primary uppercase tracking-wider'>
            Store Online
          </span>
          <h2 className='text-headline-md font-bold text-on-surface uppercase tracking-tighter'>
            FoodStore
          </h2>
          <p className='max-w-sm leading-7 text-on-surface-variant/70'>
            Tienda online de alimentos frescos y saludables,
            con entrega rápida y servicio excepcional.
            ¡Compra ahora y disfruta de la mejor comida en tu hogar!
          </p>
        </div>
        <div>
          <h3 className='mb-6 text-label-md text-primary font-bold uppercase tracking-wider'>
            Navegación
          </h3>
          <div className='flex flex-col gap-4'>
            <Link to='/' className='text-on-surface-variant/70 transition hover:text-primary'>
              Productos
            </Link>
            <Link to='/cart' className='text-on-surface-variant/70 transition hover:text-primary'>
              Carrito
            </Link>
            <Link to='/orders' className='text-on-surface-variant/70 transition hover:text-primary'>
              Pedidos
            </Link>
          </div>
        </div>
        <div>
          <h3 className='mb-6 text-label-md text-primary font-bold uppercase tracking-wider'>
            Seguinos
          </h3>
          <div className='flex gap-4'>
            <button className='border border-outline-variant/30 px-4 py-3 text-primary transition hover:bg-primary-container hover:text-on-primary-container cursor-pointer'>
              Instagram
            </button>
            <button className='border border-outline-variant/30 px-4 py-3 text-primary transition hover:bg-primary-container hover:text-on-primary-container cursor-pointer'>
              Facebook
            </button>
            <button className='border border-outline-variant/30 px-4 py-3 text-primary transition hover:bg-primary-container hover:text-on-primary-container cursor-pointer'>
              X
            </button>
          </div>
          <div className='mt-8 space-y-2 text-label-md text-on-surface-variant/60'>
            <p>foodstore@gmail.com</p>
            <p>+54 261 000 0000</p>
          </div>
        </div>
      </div>
      <div className='border-t border-outline-variant/20 py-6 text-center text-label-sm text-on-surface-variant/50'>
        © 2026 FoodStore — Todos los derechos reservados.
      </div>
    </footer>
  )
}