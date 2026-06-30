import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { updateDirection } from '@/features/directions/services/directionsService'
import type { UpdateDirectionDto } from '@/features/directions/types/direction'
import { queryKeys } from '@/lib/queryKeys'
import { extractApiError } from '@/lib/errorParser'

export const useUpdateDirection = () => {
    const queryClient = useQueryClient()
    const [error, setError] = useState<string | null>(null)

    const mutation = useMutation({
        mutationFn: ({ id, data }: { id: number; data: UpdateDirectionDto }) =>
            updateDirection(id, data),
        onSuccess: () => {
            setError(null)
            queryClient.invalidateQueries({ queryKey: queryKeys.directions })
        },
        onError: (err: unknown) => {
            setError(extractApiError(err, 'Error al actualizar la dirección'))
        },
    })

    return { ...mutation, error, clearError: () => setError(null) }
}
