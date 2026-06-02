import api from '@/lib/axios'
import type { FormaPago } from '@/features/formas-pago/types'

export async function getFormasPago(): Promise<FormaPago[]> {
  const { data } = await api.get('/formas-pago')
  return data
}
