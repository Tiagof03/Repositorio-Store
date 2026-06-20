import { useState, useEffect } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { useLogin } from '@/features/auth/hooks/useAuth'
import { useAuthStore } from '@/store/useAuthStore'
import { extractApiError } from '@/lib/errorParser'

const ADMIN_URL = import.meta.env.VITE_ADMIN_URL as string | undefined || 'http://localhost:5174'

export default function LoginPage() {
  const navigate = useNavigate()
  const location = useLocation()
  const user = useAuthStore((s) => s.user)
  const rol = useAuthStore((s) => s.rol)

  const from =
    (location.state as { from?: { pathname: string } })?.from?.pathname ||
    new URLSearchParams(location.search).get('returnTo') ||
    '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const loginMutation = useLogin()

  useEffect(() => {
    if (!user) return
    if (rol === 'admin') {
      window.location.href = ADMIN_URL
    } else {
      navigate(from, { replace: true })
    }
  }, [user, rol, navigate, from])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    loginMutation.mutate(
      { email, password },
      {
        onSuccess: (data) => {
          if (data.rol === 'admin') {
            window.location.href = ADMIN_URL
          } else {
            navigate(from, { replace: true })
          }
        },
        onError: (err: unknown) => {
          setError(extractApiError(err, 'No se pudo conectar con el servidor'))
        },
      }
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-margin-mobile">
      <div className="w-full max-w-sm flex flex-col gap-stack-lg">
        <div className="flex flex-col items-center gap-stack-sm">
          <h1 className="text-headline-lg font-bold text-primary uppercase tracking-tighter">
            Food Store
          </h1>
          <p className="text-label-md text-on-surface-variant/70">
            Ingresa a tu cuenta para continuar
          </p>
        </div>

        <div className="bg-surface-container border border-outline-variant/20 p-8 flex flex-col gap-stack-md">
          {error && (
            <div className="bg-error-container/15 border border-error/30 px-4 py-3 flex items-center gap-3">
              <span className="material-symbols-outlined text-error text-[20px]">error</span>
              <p className="text-body-md text-error">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-stack-md">
            <div className="flex flex-col gap-stack-sm">
              <label htmlFor="email" className="text-label-md text-on-surface-variant">Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[20px] pointer-events-none" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" className="w-full bg-surface-container-high border border-outline-variant/30 text-on-surface text-body-md pl-11 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40" />
              </div>
            </div>

            <div className="flex flex-col gap-stack-sm">
              <label htmlFor="password" className="text-label-md text-on-surface-variant">Contraseña</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[20px] pointer-events-none" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
                <input id="password" type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="xxxxxxxx" className="w-full bg-surface-container-high border border-outline-variant/30 text-on-surface text-body-md pl-11 pr-12 py-3 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-on-surface-variant cursor-pointer">
                  <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            <button type="submit" disabled={loginMutation.isPending} className="w-full bg-primary-container text-on-primary-container font-label-md text-label-md py-3 mt-2 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer">
              {loginMutation.isPending ? (
                <><span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span> Ingresando...</>
              ) : (
                'Ingresar'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-body-md text-on-surface-variant">
          No tenes cuenta?{' '}
          <Link to="/register" className="text-primary font-medium hover:underline">Registrate</Link>
        </p>
      </div>
    </div>
  )
}