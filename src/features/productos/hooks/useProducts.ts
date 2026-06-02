import { useQuery } from '@tanstack/react-query'
import { getProducts } from '@/features/productos/services/productService'
import { queryKeys } from '@/lib/queryKeys'
export const useProducts = () => {
  return useQuery({
    queryKey: queryKeys.products,
    queryFn: getProducts,
  })
}