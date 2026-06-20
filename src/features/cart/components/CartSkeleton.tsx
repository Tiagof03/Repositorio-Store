export default function CartSkeleton() {
  return (
    <div className='grid grid-cols-1 gap-10 lg:grid-cols-12'>
      <section className='space-y-4 lg:col-span-8'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className='flex animate-pulse gap-4 border border-outline-variant/20 bg-surface-container p-4'>
            <div className='h-24 w-24 bg-surface-container-highest/50' />
            <div className='flex-1 space-y-3'>
              <div className='h-5 w-3/4 rounded bg-surface-container-highest/50' />
              <div className='h-4 w-20 rounded bg-surface-container-highest/50' />
              <div className='flex items-center gap-3'>
                <div className='h-8 w-24 rounded bg-surface-container-highest/50' />
                <div className='h-4 w-16 rounded bg-surface-container-highest/50' />
              </div>
            </div>
          </div>
        ))}
      </section>
      <aside className='lg:col-span-4'>
        <div className='animate-pulse space-y-6 border border-outline-variant/20 bg-surface-container p-8'>
          <div className='h-6 w-28 rounded bg-surface-container-highest/50' />
          <div className='space-y-3'>
            <div className='h-4 w-full rounded bg-surface-container-highest/50' />
            <div className='h-4 w-full rounded bg-surface-container-highest/50' />
            <div className='h-4 w-3/4 rounded bg-surface-container-highest/50' />
          </div>
          <div className='h-12 w-full rounded bg-surface-container-highest/50' />
        </div>
      </aside>
    </div>
  )
}
