import type { Product } from '@/features/productos/types'

export interface CartItem extends Product {
  quantity: number
}
