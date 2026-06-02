import { Link } from 'react-router-dom'
export default function NotFoundPage() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-6 bg-background text-on-surface'>
      <h1 className='text-display-lg font-bold'>
        404
      </h1>
      <p className='text-body-md text-on-surface-variant/70'>
        Página no encontrada
      </p>
      <Link
        to='/'
        className='bg-primary-container text-on-primary-container text-label-md font-bold uppercase tracking-wider px-6 py-4 hover:brightness-110 active:scale-[0.98] transition-all'
      >
        Volver al inicio
      </Link>
    </div>
  )
}