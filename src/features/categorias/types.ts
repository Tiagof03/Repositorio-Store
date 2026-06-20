export interface Category {
  id: number
  nombre: string
  descripcion?: string
  imagen_url?: string
  parent_id: number | null
}
