import { useMutation, useQueryClient } from '@tanstack/react-query'
import { cancelOrder } from '@/features/orders/services/orderService'
import { queryKeys } from '@/lib/queryKeys'

export const useCancelOrder = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: number) => cancelOrder(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders })
    },
  })
}
