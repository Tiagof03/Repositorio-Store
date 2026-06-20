import { Link } from 'react-router-dom'
export default function NotFoundPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-6 bg-background text-on-surface'>

      <h1 className='text-7xl font-black'>
        404
      </h1>

      <p className='text-on-surface-variant/70'>
        Página no encontrada
      </p>

      <Link
        to='/'
        className='border border-primary bg-primary px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] text-on-primary'
      >
        Volver al inicio
      </Link>

    </div>
  )
}