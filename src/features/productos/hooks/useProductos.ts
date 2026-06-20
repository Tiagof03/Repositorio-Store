import { useQuery } from '@tanstack/react-query'
import { getProducts, getProductById, type ProductFilters, type PaginatedResult } from '@/features/productos/services/productService'
import type { Product } from '@/features/productos/types'
import { queryKeys } from '@/lib/queryKeys'

export const useProducts = (filters?: ProductFilters) => {
  return useQuery<PaginatedResult<Product>>({
    queryKey: [...queryKeys.products, filters],
    queryFn: () => getProducts(filters),
  })
}

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: queryKeys.product(id),
    queryFn: () => getProductById(id),
    enabled: !!id,
  })
}
