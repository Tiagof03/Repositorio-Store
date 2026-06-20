import {
  createBrowserRouter,
} from 'react-router-dom'
import RegisterPage from '@/features/auth/pages/RegisterPage'
import ProductosPage from '@/features/productos/page/ProductosPage'
import DetalleProductoPage from '@/features/productos/page/DetalleProductoPage'
import CartPage from '@/features/cart/page/CartPage'
import PaymentPage from '@/features/cart/page/PaymentPage'
import PaymentResultPage from '@/features/cart/page/PaymentResultPage'
import OrdersPage from '@/features/orders/page/OrdersPage'
import OrderDetailPage from '@/features/orders/page/OrderDetailPage'

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
      path: '/payment/:orderId',
      element: (
        <ProtectedRoute>
          <PaymentPage />
        </ProtectedRoute>
      ),
    },

    {
      path: '/orders/:id/success',
      element: (
        <ProtectedRoute>
          <PaymentResultPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/orders/:id/failure',
      element: (
        <ProtectedRoute>
          <PaymentResultPage />
        </ProtectedRoute>
      ),
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
      path: '/orders/:id',
      element: (
        <ProtectedRoute>
          <OrderDetailPage />
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