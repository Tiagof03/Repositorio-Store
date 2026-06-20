export function isMpConfigured(): boolean {
  const key = import.meta.env.VITE_MP_PUBLIC_KEY as string | undefined
  return !!key
}

export function getMpPublicKey(): string | undefined {
  return import.meta.env.VITE_MP_PUBLIC_KEY as string | undefined
}