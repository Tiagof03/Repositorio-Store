interface CategoryOption {
  id: number
  nombre: string
}

interface FilterBarProps {
  search: string
  onSearch: (value: string) => void

  sort: string
  onSort: (value: string) => void

  categories?: CategoryOption[]
  categoryId?: number
  onCategoryChange?: (value: number | undefined) => void
}

export default function FilterBar({
  search,
  onSearch,
  sort,
  onSort,
  categories,
  categoryId,
  onCategoryChange,
}: FilterBarProps) {

  return (
    <section className='mb-14 flex flex-col gap-6 border-b border-outline-variant/20 pb-8 lg:flex-row lg:items-center lg:justify-between'>

      <div>
        <h2 className='text-lg font-bold uppercase tracking-[0.2em] text-primary'>

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
          className='border border-outline-variant/30 bg-surface-container-high px-4 py-3 text-sm text-on-surface outline-none placeholder:text-on-surface-variant/40 focus:border-primary'
        />

        {categories && onCategoryChange && (
          <select
            value={categoryId ?? ''}
            onChange={(e) => onCategoryChange(e.target.value ? Number(e.target.value) : undefined)}
            className='border border-outline-variant/30 bg-surface-container-high px-4 py-3 text-sm text-on-surface-variant outline-none focus:border-primary'
          >
            <option value=''>
              Todas las categorías
            </option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.nombre}
              </option>
            ))}
          </select>
        )}

        <select
          value={sort}
          onChange={(e) =>
            onSort(e.target.value)
          }
          className='border border-outline-variant/30 bg-surface-container-high px-4 py-3 text-sm text-on-surface-variant outline-none focus:border-primary'
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