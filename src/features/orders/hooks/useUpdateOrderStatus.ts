import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateOrderStatus } from '@/features/orders/services/orderService'
import { queryKeys } from '@/lib/queryKeys'
import type { Pedido } from '@/features/orders/types'

type UpdateStatusVars = {
  id: number
  estado_hacia: string
  motivo?: string | null
}

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({
      id,
      estado_hacia,
      motivo,
    }: UpdateStatusVars) => updateOrderStatus(id, estado_hacia, motivo),

    onMutate: async ({ id, estado_hacia }) => {
      await queryClient.cancelQueries({ queryKey: queryKeys.orders })
      await queryClient.cancelQueries({ queryKey: queryKeys.order(id) })

      const previousOrders = queryClient.getQueryData<Pedido[]>(queryKeys.orders)
      const previousOrder = queryClient.getQueryData<Pedido>(queryKeys.order(id))

      if (previousOrders) {
        queryClient.setQueryData<Pedido[]>(queryKeys.orders, (old) =>
          old?.map((p) =>
            p.id === id ? { ...p, estado_codigo: estado_hacia } : p
          )
        )
      }

      if (previousOrder) {
        queryClient.setQueryData<Pedido>(queryKeys.order(id), (old) =>
          old ? { ...old, estado_codigo: estado_hacia } : old
        )
      }

      return { previousOrders, previousOrder }
    },

    onError: (_err, { id }, context) => {
      if (context?.previousOrders) {
        queryClient.setQueryData(queryKeys.orders, context.previousOrders)
      }
      if (context?.previousOrder) {
        queryClient.setQueryData(queryKeys.order(id), context.previousOrder)
      }
    },

    onSettled: (_data, _err, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.orders })
      queryClient.invalidateQueries({ queryKey: queryKeys.order(id) })
    },
  })
}
