import { useQuery } from '@tanstack/react-query'
import { getOrders } from '@/features/orders/services/orderService'
import { queryKeys } from '@/lib/queryKeys'

export const useOrders = () => {
  return useQuery({
    queryKey: queryKeys.orders,
    queryFn: getOrders,
  })
}
