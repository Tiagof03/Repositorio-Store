import axios from 'axios'
import type { AxiosError } from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
})

api.interceptors.request.use((config) => {
  const raw = localStorage.getItem('auth-storage')
  if (raw) {
    try {
      const parsed = JSON.parse(raw)
      const token = parsed?.state?.token ?? parsed?.token
      if (token) {
        config.headers.Authorization = `Bearer ${token}`
      }
    } catch { /* noop */
    }
  }
  return config
})

let isRefreshing = false
let failedQueue: Array<{
  resolve: (value: unknown) => void
  reject: (reason: unknown) => void
}> = []

function processQueue(error: unknown, token: string | null) {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error)
    } else {
      prom.resolve(token)
    }
  })
  failedQueue = []
}

api.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as {
      _retry?: boolean
      headers: Record<string, string>
    } & typeof error.config

    if (error.response?.status !== 401 || originalRequest._retry) {
      return Promise.reject(error)
    }

    if (isRefreshing) {
      return new Promise((resolve, reject) => {
        failedQueue.push({ resolve, reject })
      }).then((token) => {
        if (token) {
          originalRequest.headers.Authorization = `Bearer ${token}`
        }
        return api(originalRequest)
      })
    }

    originalRequest._retry = true
    isRefreshing = true

    try {
      const { data } = await axios.post(
        '/auth/refresh',
        {},
        {
          baseURL: import.meta.env.VITE_API_URL,
          withCredentials: true,
        }
      )

      const newToken: string | null = data?.access_token ?? null

      if (newToken) {
        const raw = localStorage.getItem('auth-storage')
        if (raw) {
          const parsed = JSON.parse(raw)
          const state = parsed?.state ?? parsed
          state.token = newToken
          localStorage.setItem(
            'auth-storage',
            JSON.stringify({ state, version: 0 })
          )
        }
        originalRequest.headers.Authorization = `Bearer ${newToken}`
      }

      processQueue(null, newToken)
      return api(originalRequest)
    } catch (refreshError) {
      processQueue(refreshError, null)
      localStorage.removeItem('auth-storage')
      const currentPath = window.location.pathname + window.location.search
      const returnParam = currentPath !== '/login' ? `?returnTo=${encodeURIComponent(currentPath)}` : ''
      window.location.href = `/login${returnParam}`
      return Promise.reject(refreshError)
    } finally {
      isRefreshing = false
    }
  }
)

export default api
