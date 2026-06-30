import { useMutation } from '@tanstack/react-query'
import { login } from '@/features/auth/services/authService'
import { useAuthStore } from '@/store/useAuthStore'

export const useLogin = () => {
  
  const loginStore = useAuthStore((s) => s.login)

  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      loginStore(data.user, data.token, data.rol)
    },
  })
}
