import { useQuery } from '@tanstack/react-query'
import { getProductById } from '@/features/productos/services/productService'
import { queryKeys } from '@/lib/queryKeys'

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: queryKeys.product(id),
    queryFn: () => getProductById(id),
    enabled: !!id,
  })
}
