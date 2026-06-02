interface ToastProps {
  message: string
}

export default function Toast({ message }: ToastProps) {
  return (
    <div className='fixed bottom-6 right-6 z-[100] border border-primary bg-surface-container shadow-[0px_4px_20px_rgba(0,0,0,0.04)] px-6 py-4'>
      <p className='text-label-md font-bold uppercase tracking-wider text-primary'>
        {message}
      </p>
    </div>
  )
}