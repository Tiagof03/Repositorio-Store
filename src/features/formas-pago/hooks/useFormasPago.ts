import { useQuery } from '@tanstack/react-query'
import { getFormasPago } from '@/features/formas-pago/services/formasPagoService'
import { queryKeys } from '@/lib/queryKeys'

export const useFormasPago = () => {
  return useQuery({
    queryKey: queryKeys.formasPago,
    queryFn: getFormasPago,
  })
}
