import {
  useMutation,
  useQueryClient,
} from '@tanstack/react-query'

import {
  createDirection,
} from '@/features/directions/services/directionsService'
import { queryKeys } from '@/lib/queryKeys'

export const useCreateDirection =
  () => {
    const queryClient = useQueryClient()

    return useMutation({

      mutationFn:
        createDirection,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: queryKeys.directions,
        })
      },
    })
  }