export interface PedidoDetalle {
  pedido_id: number

  producto_id: number

  cantidad: number

  nombre_snapshot: string

  precio_snapshot: number

  subtotal_snap: number

  personalizacion: number[] | null

  created_at: string
}

export interface Pedido {

  id: number

  usuario_id: number

  direccion_id: number

  estado_codigo: string

  forma_pago_codigo: string

  subtotal: number

  descuento: number

  costo_envio: number

  total: number

  notas: string | null

  created_at: string

  detalles: PedidoDetalle[]

  historial: unknown[]
}

export interface CreatePedidoPayload {

  direccion_id: number 

  forma_pago_codigo: string

  notas: string | null

  items: {

    producto_id: number

    cantidad: number

    personalizacion: number[]

  }[]
}