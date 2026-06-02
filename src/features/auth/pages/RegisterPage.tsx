import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useRegister } from '@/features/auth/hooks/useRegister'
import { useAuthStore } from '@/store/useAuthStore'

export default function RegisterPage() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const rol = useAuthStore((s) => s.rol)
  const [nombre, setNombre] = useState('')
  const [apellido, setApellido] = useState('')
  const [email, setEmail] = useState('')
  const [celular, setCelular] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

  const registerMutation = useRegister()

  useEffect(() => {
    if (!user) return
    if (rol === 'admin') {
      window.location.href = 'http://localhost:5174/'
    } else {
      navigate('/', { replace: true })
    }
  }, [user, rol, navigate])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    registerMutation.mutate(
      { nombre, apellido, email, celular: celular || undefined, password },
      {
        onSuccess: (data) => {
          if (data.rol === 'admin') {
            window.location.href = 'http://localhost:5174/'
          } else {
            navigate('/', { replace: true })
          }
        },
        onError: (err: unknown) => {
          if (
            typeof err === 'object' &&
            err !== null &&
            'response' in err &&
            typeof (err as Record<string, unknown>).response === 'object'
          ) {
            const response = (err as { response: { status: number } }).response
            if (response.status === 409) {
              setError('Este email ya esta registrado')
            } else {
              setError('Error del servidor. Intenta de nuevo.')
            }
          } else {
            setError('No se pudo conectar con el servidor')
          }
        },
      }
    )
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-margin-mobile">
      <div className="w-full max-w-sm flex flex-col gap-stack-lg">
        <div className="flex flex-col items-center gap-stack-sm">
          <div className="w-14 h-14 bg-primary-container flex items-center justify-center mb-2">
            <span className="material-symbols-outlined text-on-primary-container text-[32px]">
              restaurant
            </span>
          </div>
          <h1 className="text-headline-lg font-bold text-primary uppercase tracking-tighter">
            FoodStore
          </h1>
          <p className="text-label-md text-on-surface-variant/70">
            Crea tu cuenta para empezar
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
              <label htmlFor="nombre" className="text-label-md text-on-surface-variant">Nombre</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[20px] pointer-events-none">person</span>
                <input id="nombre" type="text" required value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Tu nombre" className="w-full bg-surface-container-high border border-outline-variant/30 text-on-surface text-body-md pl-11 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40" />
              </div>
            </div>
            <div className="flex flex-col gap-stack-sm">
              <label htmlFor="apellido" className="text-label-md text-on-surface-variant">Apellido</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[20px] pointer-events-none">person</span>
                <input id="apellido" type="text" required value={apellido} onChange={(e) => setApellido(e.target.value)} placeholder="Tu apellido" className="w-full bg-surface-container-high border border-outline-variant/30 text-on-surface text-body-md pl-11 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40" />
              </div>
            </div>
            <div className="flex flex-col gap-stack-sm">
              <label htmlFor="email" className="text-label-md text-on-surface-variant">Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[20px] pointer-events-none">mail</span>
                <input id="email" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tu@email.com" className="w-full bg-surface-container-high border border-outline-variant/30 text-on-surface text-body-md pl-11 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40" />
              </div>
            </div>
            <div className="flex flex-col gap-stack-sm">
              <label htmlFor="celular" className="text-label-md text-on-surface-variant">Celular <span className="text-on-surface-variant/50">(opcional)</span></label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[20px] pointer-events-none">phone</span>
                <input id="celular" type="tel" value={celular} onChange={(e) => setCelular(e.target.value)} placeholder="+54 11 1234-5678" className="w-full bg-surface-container-high border border-outline-variant/30 text-on-surface text-body-md pl-11 pr-4 py-3 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40" />
              </div>
            </div>
            <div className="flex flex-col gap-stack-sm">
              <label htmlFor="password" className="text-label-md text-on-surface-variant">Contraseña</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 text-[20px] pointer-events-none">lock</span>
                <input id="password" type={showPassword ? 'text' : 'password'} required value={password} onChange={(e) => setPassword(e.target.value)} placeholder="xxxxxxxx" className="w-full bg-surface-container-high border border-outline-variant/30 text-on-surface text-body-md pl-11 pr-12 py-3 focus:outline-none focus:ring-1 focus:ring-primary placeholder:text-on-surface-variant/40" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-on-surface-variant/50 hover:text-on-surface-variant cursor-pointer">
                  <span className="material-symbols-outlined text-[20px]">{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>
            <button type="submit" disabled={registerMutation.isPending} className="w-full bg-primary-container text-on-primary-container font-label-md text-label-md py-3 mt-2 hover:brightness-110 active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2 cursor-pointer">
              {registerMutation.isPending ? (
                <><span className="material-symbols-outlined animate-spin text-[20px]">progress_activity</span> Creando cuenta...</>
              ) : (
                'Crear Cuenta'
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-body-md text-on-surface-variant">
          Ya tenes cuenta?{' '}
          <Link to="/login" className="text-primary font-medium hover:underline">Iniciar sesion</Link>
        </p>
      </div>
    </div>
  )
}