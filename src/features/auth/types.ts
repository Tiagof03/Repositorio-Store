export interface LoginRequest {
  email: string
  password: string
}

export interface TokenResponse {
  access_token: string
  token_type: string
}

export interface MeResponse {
  id: number
  email: string
  nombre: string
  apellido: string
  celular: string | null
  roles: string[]
}

export interface RegisterRequest {
  email: string
  nombre: string
  apellido: string
  celular?: string
  password: string
}

export type Role = 'admin' | 'empleado' | 'cajero' | 'cliente'

export interface LoginResponse {
  user: {
    id: number
    nombre: string
    email: string
  }
  token: string
  rol: Role
}
