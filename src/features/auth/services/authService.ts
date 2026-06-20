import api from '@/lib/axios'
import type { LoginRequest, LoginResponse, MeResponse, RegisterRequest, Role } from '@/features/auth/types'

export function mapRoles(roles: string[]): Role {
  const normalized = roles.map((r) => r.toLowerCase())
  if (normalized.includes('admin')) return 'admin'
  if (normalized.includes('cajero')) return 'cajero'
  if (normalized.includes('empleado')) return 'empleado'
  return 'cliente'
}

export const login = async (credentials: LoginRequest): Promise<LoginResponse> => {
  const { data: tokenData } = await api.post('/auth/login', {
    email: credentials.email,
    password: credentials.password,
  })
  const { data: me } = await api.get<MeResponse>('/auth/me')
  return {
    user: { id: me.id, nombre: me.nombre, email: me.email },
    token: tokenData.access_token,
    rol: mapRoles(me.roles),
  }
}

export const register = async (data: RegisterRequest): Promise<LoginResponse> => {
  const { data: tokenData } = await api.post('/auth/register', data)
  const { data: me } = await api.get<MeResponse>('/auth/me')
  return {
    user: { id: me.id, nombre: me.nombre, email: me.email },
    token: tokenData.access_token,
    rol: mapRoles(me.roles),
  }
}

export const getMe = async (): Promise<MeResponse> => {
  const { data } = await api.get<MeResponse>('/auth/me')
  return data
}

export const logout = async (): Promise<void> => {
  try { await api.post('/auth/logout') } catch { /* noop */ }
}

export const refreshToken = async (): Promise<string | null> => {
  try {
    const { data } = await api.post('/auth/refresh')
    return data?.access_token ?? null
  } catch {
    return null
  }
}
