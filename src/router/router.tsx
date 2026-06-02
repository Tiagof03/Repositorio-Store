import {
  createBrowserRouter,
} from 'react-router-dom'
import RegisterPage from '@/features/auth/pages/RegisterPage'
import ProductosPage from '@/features/productos/page/ProductosPage'
import DetalleProductoPage from '@/features/productos/page/DetalleProductoPage'
import CartPage from '@/features/cart/page/CartPage'
import OrdersPage from '@/features/orders/page/OrdersPage'

import NotFoundPage from '@/shared/NotFoundPage'

import LoginPage from '@/features/auth/pages/LoginPage'

import { ProtectedRoute } from '@/shared/ProtectedRoute'

export const router =
  createBrowserRouter([

    {
      path: '/',
      element: <ProductosPage />,
    },
    {
      path: '/register',
      element: <RegisterPage />,
    },
    {
      path: '/products/:id',
      element: <DetalleProductoPage />,
    },

    {
      path: '/cart',
      element: <CartPage />,
    },

    {
      path: '/orders',
      element: (
        <ProtectedRoute>
          <OrdersPage />
        </ProtectedRoute>
      ),
    },

    {
      path: '/login',
      element: <LoginPage />,
    },

    {
      path: '*',
      element: <NotFoundPage />,
    },

  ])