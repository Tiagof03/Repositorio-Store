#LiNK DEL VIDEO: 
https://drive.google.com/drive/folders/1xywErmmLfCMpkTxa26J6N54uUy7zSkhz

# FoodStore — store

Frontend de e-commerce de comida que consume la API de FastAPI. Catálogo de productos, carrito persistente y pedidos.

## Stack

- **Vite 8** + **React 19** + **TypeScript 6**
- **React Router DOM v7** — rutas, params dinámicos, navegación
- **TanStack Query v5** — fetching y caché del server state
- **Zustand v5** — sesión del usuario y carrito con persistencia en localStorage
- **Axios** — cliente HTTP con interceptor para JWT
- **Tailwind CSS v4** 

## Instalación

```bash
npm install
```

Copiar variables de entorno:

```bash
cp .env.example .env
```

Editar con la URL de la API:

```
VITE_API_URL=http://localhost:8000
```

## Scripts



`npm run dev` | Levanta el servidor de desarrollo |
`npm run build` | Build de producción |
`npm run preview` | Preview del build |

## Estructura

```
src/
├── features/
│   ├── auth/          registro, login
│   ├── productos/     listado, detalle, búsqueda y filtros
│   ├── cart/          carrito persistido + checkout
│   ├── orders/        historial de pedidos
│   ├── directions/    direcciones de entrega
│   └── formas-pago/   métodos de pago
├── shared/            Layout, Navbar, Footer, ProtectedRoute, NotFoundPage
├── store/             useAuthStore y useCartStore (Zustand con persist)
├── lib/               instancia de axios, queryClient, queryKeys
└── router/            configuración de rutas
```

Cada feature sigue la misma estructura:

```
feature/
├── types.ts          interfaces
├── services/         llamadas a la API
├── hooks/            hooks de TanStack Query
├── components/       componentes del módulo
└── page/             vistas
```

## Rutas


| `/` | Listado de productos con búsqueda | No |
| `/products/:id` | Detalle del producto | No |
| `/cart` | Carrito y checkout | No |
| `/orders` | Historial de pedidos | Sí (rol cliente) |
| `/login` | Login | No |
| `/register` | Registro | No |

## Variables de entorno

| `VITE_API_URL` | URL base de la API REST | `http://localhost:8000` |

## Roles

| `cliente` | Catálogo, carrito, checkout, historial de pedidos propios |
| `admin` | Redirige al panel de administración en `localhost:5174` |
