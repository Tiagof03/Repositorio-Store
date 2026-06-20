export default function OrderListSkeleton() {
  return (
    <div className='space-y-6'>
      {Array.from({ length: 3 }).map((_, i) => (
        <div key={i} className='animate-pulse border border-outline-variant/20 bg-surface-container p-6'>
          <div className='flex items-start justify-between'>
            <div className='space-y-3'>
              <div className='h-5 w-32 rounded bg-surface-container-highest/50' />
              <div className='h-4 w-20 rounded bg-surface-container-highest/50' />
            </div>
            <div className='h-6 w-28 rounded bg-surface-container-highest/50' />
          </div>
          <div className='mt-4 space-y-2'>
            <div className='h-4 w-48 rounded bg-surface-container-highest/50' />
            <div className='h-4 w-36 rounded bg-surface-container-highest/50' />
          </div>
        </div>
      ))}
    </div>
  )
}
