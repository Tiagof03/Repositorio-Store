export const queryKeys = {
  products: ['products'] as const,
  product: (id: number) =>
    ['product', id] as const,
  orders: ['orders'] as const,
  order: (id: number) =>
    ['order', id] as const,
  directions: ['directions'] as const,
  categories: ['categories'] as const,
  formasPago: ['formas-pago'] as const,
}