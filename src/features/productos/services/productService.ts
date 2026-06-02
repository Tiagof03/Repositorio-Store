import api from '@/lib/axios'
import type { Product } from '@/features/productos/types'

export async function getProducts(): Promise<Product[]> {

  const { data } = await api.get('/productos/')

  return data
}

export async function getProductById(
  id: number
): Promise<Product> {

  const { data } = await api.get(
    `/productos/${id}`
  )

  return data
}