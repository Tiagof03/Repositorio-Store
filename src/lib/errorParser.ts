export function extractApiError(err: unknown, fallback = 'Error inesperado'): string {
  const data = (err as { response?: { data?: unknown } })?.response?.data
  if (!data) return fallback
  if (typeof data === 'string') return data
  if (typeof data === 'object' && data !== null) {
    const obj = data as Record<string, unknown>
    if (typeof obj.detail === 'string') return obj.detail
    if (typeof obj.detail === 'object' && obj.detail !== null) {
      const inner = obj.detail as Record<string, unknown>
      if (typeof inner.detail === 'string') return inner.detail
    }
    if (typeof obj.message === 'string') return obj.message
  }
  return fallback
}