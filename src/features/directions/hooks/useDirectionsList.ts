import { useQuery } from '@tanstack/react-query'
import { getDirections } from '@/features/directions/services/directionsService'
import { queryKeys } from '@/lib/queryKeys'

export const useDirections = () => {
    return useQuery({
        queryKey: queryKeys.directions,
        queryFn: getDirections,
    })
}
