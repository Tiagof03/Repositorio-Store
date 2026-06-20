export interface CategoriaOut {
  id: number
  nombre: string
  descripcion?: string | null
  imagen_url?: string | null
  parent_id?: number | null
}

export interface Product {
  id: number

  nombre: string

  descripcion: string | null

  precio_base: number

  imagenes_url: string[] | null

  stock_cantidad: number

  disponible: boolean

  unidad_venta_id: number | null

  categorias?: CategoriaOut[]

  ingredientes?: IngredienteEnProductoOut[]
}

export interface IngredienteOut {
  id: number
  nombre: string
  descripcion: string | null
  es_alergeno: boolean
  stock_cantidad: number
}

export interface IngredienteEnProductoOut extends IngredienteOut {
  es_removible: boolean
}