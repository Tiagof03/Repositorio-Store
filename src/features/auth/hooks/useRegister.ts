import {
  useMutation,
} from '@tanstack/react-query'

import { register } from '@/features/auth/services/authService'
import { useAuthStore } from '@/store/useAuthStore'

export const useRegister = () => {
  const loginStore = useAuthStore((s) => s.login)

  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      loginStore(data.user, data.token, data.rol)
    },
  })
}
