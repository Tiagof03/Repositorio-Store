export default function OrderDetailSkeleton() {
  return (
    <div className='space-y-10 animate-pulse'>
      <div className='border border-outline-variant/20 bg-surface-container p-8'>
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div className='space-y-3'>
            <div className='h-5 w-40 rounded bg-surface-container-highest/50' />
            <div className='h-4 w-28 rounded bg-surface-container-highest/50' />
            <div className='h-4 w-36 rounded bg-surface-container-highest/50' />
          </div>
          <div className='space-y-3'>
            <div className='h-4 w-32 rounded bg-surface-container-highest/50' />
            <div className='h-4 w-24 rounded bg-surface-container-highest/50' />
            <div className='h-6 w-28 rounded bg-surface-container-highest/50' />
          </div>
        </div>
      </div>

      <div className='border border-outline-variant/20 bg-surface-container p-8'>
        <div className='space-y-4'>
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='flex items-center gap-4'>
              <div className='flex h-8 w-8 items-center justify-center'>
                <div className='h-4 w-4 rounded-full bg-surface-container-highest/50' />
              </div>
              <div className='flex-1 space-y-2'>
                <div className='h-4 w-48 rounded bg-surface-container-highest/50' />
                <div className='h-3 w-32 rounded bg-surface-container-highest/50' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
