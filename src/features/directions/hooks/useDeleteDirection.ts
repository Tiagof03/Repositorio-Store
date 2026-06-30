import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteDirection } from '@/features/directions/services/directionsService'
import { queryKeys } from '@/lib/queryKeys'
import { extractApiError } from '@/lib/errorParser'

export const useDeleteDirection = () => {
    const queryClient = useQueryClient()
    const [error, setError] = useState<string | null>(null)

    const mutation = useMutation({
        mutationFn: deleteDirection,
        onSuccess: () => {
            setError(null)
            queryClient.invalidateQueries({ queryKey: queryKeys.directions })
        },
        onError: (err: unknown) => {
            setError(extractApiError(err, 'Error al eliminar la dirección'))
        },
    })

    return { ...mutation, error, clearError: () => setError(null) }
}
