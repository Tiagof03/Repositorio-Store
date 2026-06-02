import api from '@/lib/axios'

import type {
  Pedido,
  CreatePedidoPayload,
} from '@/features/orders/types'

export async function getOrders():
Promise<Pedido[]> {

  const { data } =
    await api.get('/pedidos/')

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