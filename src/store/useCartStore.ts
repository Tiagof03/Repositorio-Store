import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { Product } from '@/features/productos/types'
import type { CartItem } from '@/features/cart/types'

interface CartStore {
  items: CartItem[]
  addItem: (product: Product, quantity?: number, personalizacion?: number[]) => void
  increaseQuantity: (id: number) => void
  decreaseQuantity: (id: number) => void
  removeItem: (id: number) => void
  clearCart: () => void
  totalItems: () => number
}

export const useCartStore =
  create<CartStore>()(
    persist(
      (set, get) => ({
        items: [],

        addItem: (product, quantity = 1, personalizacion = []) => {

          const existingItem =
            get().items.find(
              (item) =>
                item.id === product.id
            )

          if (existingItem) {

            set({
              items: get().items.map(
                (item) =>
                  item.id === product.id
                    ? {
                        ...item,
                        quantity:
                          item.quantity + quantity,
                      }
                    : item
              ),
            })

            return
          }

          set({
            items: [
              ...get().items,
              {
                ...product,
                quantity,
                personalizacion,
              },
            ],
          })
        },

        increaseQuantity: (id) => {

          set({
            items: get().items.map(
              (item) =>
                item.id === id
                  ? {
                      ...item,
                      quantity:
                        item.quantity + 1,
                    }
                  : item
            ),
          })
        },

        decreaseQuantity: (id) => {

          const item =
            get().items.find(
              (item) =>
                item.id === id
            )

          if (!item) return

          if (item.quantity === 1) {

            set({
              items: get().items.filter(
                (item) =>
                  item.id !== id
              ),
            })

            return
          }

          set({
            items: get().items.map(
              (item) =>
                item.id === id
                  ? {
                      ...item,
                      quantity:
                        item.quantity - 1,
                    }
                  : item
            ),
          })
        },

        removeItem: (id) => {

          set({
            items: get().items.filter(
              (item) =>
                item.id !== id
            ),
          })
        },

        clearCart: () => {

          set({
            items: [],
          })
        },

        totalItems: () => {

          return get().items.reduce(
            (acc, item) =>
              acc + item.quantity,
            0
          )
        },
      }),

      {
        name: 'cart-storage',
        partialize: (state) => ({ items: state.items }),
      }
    )
  )