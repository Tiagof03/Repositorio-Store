import { useMutation, useQueryClient } from '@tanstack/react-query'
import { createDirection } from '@/features/directions/services/directionsService'
import { queryKeys } from '@/lib/queryKeys'
import { useState } from 'react'
import { extractApiError } from '@/lib/errorParser'

export const useCreateDirection = () => {
  const queryClient = useQueryClient()
  const [error, setError] = useState<string | null>(null)

  const mutation = useMutation({
    mutationFn: createDirection,
    onSuccess: () => {
      setError(null)
      queryClient.invalidateQueries({ queryKey: queryKeys.directions })
    },
    onError: (err: unknown) => {
      setError(extractApiError(err, 'Error al guardar la dirección'))
    },
  })

  return { ...mutation, error, clearError: () => setError(null) }
}
