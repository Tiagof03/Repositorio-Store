import type { Direction } from '@/features/directions/types/direction'

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

export interface HistorialEntry {
  id?: number
  pedido_id: number
  estado_desde: string | null
  estado_hacia: string
  usuario_id: number | null
  motivo: string | null
  created_at: string
}

export interface Pedido {

  id: number

  usuario_id: number

  direccion_id: number | null

  direccion?: Direction | null

  estado_codigo: string

  forma_pago_codigo: string

  metodo_envio: string

  subtotal: number

  descuento: number

  costo_envio: number

  total: number

  notas: string | null

  created_at: string

  detalles: PedidoDetalle[]

  historial: HistorialEntry[]
}

export const STATUS_LABELS: Record<string, string> = {
  PENDIENTE: 'Pendiente',
  CONFIRMADO: 'Confirmado',
  EN_PREP: 'En Preparación',
  ENTREGADO: 'Entregado',
  CANCELADO: 'Cancelado',
}

export const STATUS_COLORS: Record<string, string> = {
  PENDIENTE: 'text-yellow-400 border-yellow-400/30',
  CONFIRMADO: 'text-blue-400 border-blue-400/30',
  EN_PREP: 'text-orange-400 border-orange-400/30',
  ENTREGADO: 'text-green-400 border-green-400/30',
  CANCELADO: 'text-red-400 border-red-400/30',
}

export interface CreatePedidoPayload {

  metodo_envio: string

  direccion_id: number | null

  forma_pago_codigo: string

  notas: string | null

  items: {

    producto_id: number

    cantidad: number

    personalizacion: number[]

  }[]
}