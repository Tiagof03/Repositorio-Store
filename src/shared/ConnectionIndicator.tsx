import { useWsStore } from '@/store/wsStore'

export default function ConnectionIndicator() {
  const wsConnected = useWsStore((s) => s.isConnected)
  if (!wsConnected) return null
  return (
    <div className='fixed bottom-4 right-4 z-50 flex items-center gap-2'>
      <span className='inline-block h-2.5 w-2.5 rounded-full bg-green-500 shadow-[0_0_6px_rgba(34,197,94,0.6)]' />
      <span className='text-[10px] uppercase tracking-[0.2em] text-green-400'>En vivo</span>
    </div>
  )
}
