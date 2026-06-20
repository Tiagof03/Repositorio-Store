import { useToastStore } from '@/store/useToastStore'
import type { ToastType } from '@/store/useToastStore'

const iconMap: Record<ToastType, string> = {
  success: 'check_circle',
  error: 'error',
  info: 'info',
}

const colorMap: Record<ToastType, string> = {
  success: 'border-green-500 text-green-400',
  error: 'border-red-500 text-red-400',
  info: 'border-primary text-primary',
}

export default function ToastProvider() {
  const toasts = useToastStore((s) => s.toasts)
  const removeToast = useToastStore((s) => s.removeToast)

  if (toasts.length === 0) return null

  return (
    <div className='fixed bottom-6 right-6 z-50 flex flex-col gap-3'>
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex animate-slide-up items-center gap-3 border bg-surface-container px-5 py-4 shadow-lg transition-all ${colorMap[toast.type]}`}
          style={{ minWidth: '280px' }}
        >
          <span className='material-symbols-outlined text-[20px]' style={{ fontVariationSettings: "'FILL' 1" }}>
            {iconMap[toast.type]}
          </span>
          <p className='flex-1 text-sm font-medium'>{toast.message}</p>
          <button
            onClick={() => removeToast(toast.id)}
            className='ml-2 cursor-pointer text-on-surface-variant/50 hover:text-on-surface-variant'
          >
            <span className='material-symbols-outlined text-[18px]'>close</span>
          </button>
        </div>
      ))}
    </div>
  )
}
