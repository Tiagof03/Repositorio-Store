import { useQuery } from '@tanstack/react-query'
import { queryKeys } from '@/lib/queryKeys'
import { getOrders } from '@/features/orders/services/orderService'

export const useOrders = () => {
  return useQuery({
    queryKey: queryKeys.orders,
    queryFn: getOrders,
  })
}