interface Props {
  value: number
  onChange: (value: number) => void
}

export default function QuantitySelector({ value, onChange }: Props) {
  const increment = () => onChange(value + 1)

  const decrement = () => {
    if (value > 1) onChange(value - 1)
  }

  return (
    <div className='flex items-center border border-outline-variant/30 bg-surface-container-high'>
      <button
        onClick={decrement}
        className='px-4 py-3 text-xl text-primary transition hover:bg-surface-variant cursor-pointer'
      >
        -
      </button>

      <span className='px-6 font-bold text-on-surface'>
        {value}
      </span>

      <button
        onClick={increment}
        className='px-4 py-3 text-xl text-primary transition hover:bg-surface-variant cursor-pointer'
      >
        +
      </button>
    </div>
  )
}