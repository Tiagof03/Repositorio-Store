import api from '@/lib/axios'
import type { Product } from '@/features/productos/types'

export interface ProductFilters {
  buscar?: string
  categoria_id?: number
  disponible?: boolean
  page?: number
  size?: number
}

export interface PaginatedResult<T> {
  items: T[]
  total: number
  page: number
  size: number
  pages: number
}

export async function getProducts(filters?: ProductFilters): Promise<PaginatedResult<Product>> {
  const { data } = await api.get('/productos/', { params: filters })
  return {
    items: data.items ?? [],
    total: data.total ?? 0,
    page: data.page ?? 1,
    size: data.size ?? 0,
    pages: data.pages ?? 0,
  }
}

export async function getProductById(
  id: number
): Promise<Product> {

  const { data } = await api.get(
    `/productos/${id}`
  )

  return data
}