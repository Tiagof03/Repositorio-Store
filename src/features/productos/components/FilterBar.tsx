interface FilterBarProps {
  search: string
  onSearch: (value: string) => void

  sort: string
  onSort: (value: string) => void
}

export default function FilterBar({
  search,
  onSearch,
  sort,
  onSort,
}: FilterBarProps) {

  return (
    <section className='mb-14 flex flex-col gap-6 border-b border-outline-variant/30 pb-8 lg:flex-row lg:items-center lg:justify-between'>

      <div>
        <h2 className='text-label-md text-primary font-bold uppercase tracking-wider'>

          Productos Disponibles

        </h2>
      </div>

      <div className='flex flex-col gap-4 md:flex-row md:items-center'>

        <input
          type='text'
          value={search}
          onChange={(e) =>
            onSearch(e.target.value)
          }
          placeholder='Buscar productos...'
          className='bg-surface-container-high border border-outline-variant/30 text-on-surface text-body-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40'
        />

        <select
          value={sort}
          onChange={(e) =>
            onSort(e.target.value)
          }
          className='bg-surface-container-high border border-outline-variant/30 text-on-surface-variant text-body-md px-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary'
        >

          <option value='default'>
            Ordenar
          </option>

          <option value='asc'>
            Menor precio
          </option>

          <option value='desc'>
            Mayor precio
          </option>

        </select>

      </div>

    </section>
  )
}