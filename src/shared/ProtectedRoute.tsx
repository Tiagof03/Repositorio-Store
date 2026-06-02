import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore } from '@/store/useAuthStore'

interface Props {
  children: React.ReactNode
}

export const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate()
  const token = useAuthStore((s) => s.token)
  const rol = useAuthStore((s) => s.rol)

  useEffect(() => {
    if (!token || !rol) {
      navigate('/login', { replace: true })
    } else if (rol !== 'cliente') {
      navigate('/', { replace: true })
    }
  }, [token, rol, navigate])

  if (!token || !rol || rol !== 'cliente') return null

  return children
}