import api from '@/lib/axios'
import type { Category } from '@/features/categorias/types'

export async function getCategories(): Promise<Category[]> {
  const { data } = await api.get('/categorias/')
  return data
}
