interface MetodoEnvioSelectorProps {
  value: 'DOMICILIO' | 'RETIRO'
  onChange: (value: 'DOMICILIO' | 'RETIRO') => void
}

const METODOS = [
  { value: 'DOMICILIO' as const, label: 'A domicilio' },
  { value: 'RETIRO' as const, label: 'Retiro en el local' },
]

export default function MetodoEnvioSelector({ value, onChange }: MetodoEnvioSelectorProps) {
  return (
    <div className='space-y-3'>
      <label className='block text-sm font-bold uppercase tracking-[0.2em] text-primary'>
        Método de envío
      </label>
      <div className='flex gap-3'>
        {METODOS.map((metodo) => {
          const isActive = value === metodo.value
          return (
            <button
              key={metodo.value}
              type='button'
              onClick={() => onChange(metodo.value)}
              className={`flex-1 border px-2 py-3 text-center text-xs font-bold uppercase tracking-[0.1em] transition cursor-pointer ${
                isActive
                  ? 'border-primary bg-primary/10 text-primary'
                  : 'border-outline-variant/30 text-on-surface-variant hover:border-primary hover:text-primary'
              }`}
            >
              {metodo.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}
