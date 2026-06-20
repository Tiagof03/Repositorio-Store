import { useEffect } from 'react'
import { RouterProvider } from 'react-router-dom'
import { router } from '@/router/router'
import { useAuthStore } from '@/store/useAuthStore'
import { getMe, mapRoles } from '@/features/auth/services/authService'
import ToastProvider from '@/shared/ToastProvider'
import ConnectionIndicator from '@/shared/ConnectionIndicator'

function App() {
  const token = useAuthStore((state) => state.token)
  const user = useAuthStore((state) => state.user)
  const loginStore = useAuthStore((state) => state.login)

  useEffect(() => {
    if (!token) return
    if (user) return

    const loadUser = async () => {
      try {
        const data = await getMe()
        const rol = mapRoles(data.roles)
        loginStore({ id: data.id, nombre: data.nombre, email: data.email }, token, rol)
      } catch {
        console.log('No se pudo cargar usuario')
      }
    }
    loadUser()
  }, [token, user, loginStore])

  return (
    <>
      <RouterProvider router={router} />
      <ToastProvider />
      <ConnectionIndicator />
    </>
  )
}

export default App