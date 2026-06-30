import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Role = 'admin' | 'empleado' | 'cajero' | 'cliente'

interface User {
  id: number
  nombre: string
  apellido: string
  email: string
  celular: string | null
}

interface AuthState {
  user: User | null
  token: string | null
  rol: Role | null
  login: (user: User, token: string, rol: Role) => void
  logout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      token: null,
      rol: null,
      login: (user, token, rol) => set({ user, token, rol }),
      logout: () => set({ user: null, token: null, rol: null }),
    }),
    {
      name: 'auth-storage',
      partialize: (state) => ({ user: state.user, token: state.token, rol: state.rol }),
    }
  )
)