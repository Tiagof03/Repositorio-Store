import { useQuery } from '@tanstack/react-query'
import { getFormasPago } from '@/features/formas-pago/services/formasPagoService'

export const useFormasPago = () => {
  return useQuery({
    queryKey: ['formas-pago'],
    queryFn: getFormasPago,
  })
}
