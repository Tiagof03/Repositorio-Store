export const queryKeys = {
  products: ['products'] as const,
  product: (id: number) =>
    ['product', id] as const,
  orders: ['orders'] as const,
  directions: ['directions'] as const,
}