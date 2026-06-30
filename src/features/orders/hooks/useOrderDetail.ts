import { useQuery } from '@tanstack/react-query'
import { getOrderById } from '@/features/orders/services/orderService'
import { queryKeys } from '@/lib/queryKeys'

export const useOrder = (id: number) => {
  return useQuery({
    queryKey: queryKeys.order(id),
    queryFn: () => getOrderById(id),
    enabled: !!id,
  })
}
