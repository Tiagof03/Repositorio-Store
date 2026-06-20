import api from '@/lib/axios'

import type {
  Pedido,
  CreatePedidoPayload,
} from '@/features/orders/types'

export async function getOrders():
Promise<Pedido[]> {

  const { data } =
    await api.get('/pedidos/')

  return data.items ?? []
}

export async function getOrderById(
  id: number
): Promise<Pedido> {

  const { data } =
    await api.get(`/pedidos/${id}`)

  return data
}

export async function createOrder(
  payload: CreatePedidoPayload
) {

  const { data } =
    await api.post(
      '/pedidos/',
      payload
    )

  return data
}

export async function updateOrderStatus(
  id: number,
  estado_hacia: string,
  motivo?: string | null
) {
  const { data } = await api.patch(`/pedidos/${id}/estado`, {
    estado_hacia,
    motivo: motivo ?? null,
  })
  return data
}

export async function cancelOrder(id: number) {
  const { data } = await api.delete(`/pedidos/${id}`)
  return data
}