export interface Product {
  id: number

  nombre: string

  descripcion: string | null

  precio_base: number

  imagenes_url: string[]

  stock_cantidad: number

  disponible: boolean

  unidad_venta_id: number | null
}