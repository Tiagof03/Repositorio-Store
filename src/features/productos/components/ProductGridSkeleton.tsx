export default function ProductGridSkeleton() {
  return (
    <section className='grid grid-cols-1 gap-10 md:grid-cols-2 xl:grid-cols-4'>
      {Array.from({ length: 12 }).map((_, i) => (
        <div key={i} className='animate-pulse border border-outline-variant/20 bg-surface-container'>
          <div className='aspect-square w-full bg-surface-container-highest/50' />
          <div className='space-y-4 p-5'>
            <div className='flex items-center justify-between'>
              <div className='h-3 w-20 rounded bg-surface-container-highest/50' />
              <div className='h-5 w-16 rounded bg-surface-container-highest/50' />
            </div>
            <div className='space-y-2'>
              <div className='h-5 w-3/4 rounded bg-surface-container-highest/50' />
              <div className='h-4 w-full rounded bg-surface-container-highest/50' />
              <div className='h-4 w-2/3 rounded bg-surface-container-highest/50' />
            </div>
            <div className='h-10 w-full rounded bg-surface-container-highest/50' />
          </div>
        </div>
      ))}
    </section>
  )
}
