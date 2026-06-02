import { create } from 'zustand'

type Role = 'admin' | 'empleado' | 'cajero' | 'cliente'

interface User {
  id: number
  nombre: string
  email: string
}

interface AuthState {
  user: User | null
  token: string | null
  rol: Role | null
  login: (user: User, token: string, rol: Role) => void
  logout: () => void
}

const STORAGE_KEY = 'auth-storage'

function loadFromStorage(): { user: User | null; token: string | null; rol: Role | null } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { user: null, token: null, rol: null }
    const parsed = JSON.parse(raw)
  
    if (parsed && typeof parsed === 'object' && 'state' in parsed) {
      return {
        user: parsed.state.user ?? null,
        token: parsed.state.token ?? null,
        rol: parsed.state.rol ?? null,
      }
    }
    
    return {
      user: parsed.user ?? null,
      token: parsed.token ?? null,
      rol: parsed.rol ?? null,
    }
  } catch {
    return { user: null, token: null, rol: null }
  }
}

function saveToStorage(user: User | null, token: string | null, rol: Role | null): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ user, token, rol }))
  } catch {
   
  }
}

export const useAuthStore = create<AuthState>()((set) => ({
  ...loadFromStorage(),
  login: (user, token, rol) => {
    set({ user, token, rol })
    saveToStorage(user, token, rol)
  },
  logout: () => {
    set({ user: null, token: null, rol: null })
    saveToStorage(null, null, null)
  },
}))