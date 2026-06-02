import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: {
      '/auth': 'http://localhost:8000',
      '/productos': 'http://localhost:8000',
      '/pedidos': 'http://localhost:8000',
      '/mis-direcciones': 'http://localhost:8000',
      '/formas-pago': 'http://localhost:8000',
      '/health': 'http://localhost:8000',
      '/unidad-medida': 'http://localhost:8000',
      '/categorias': 'http://localhost:8000',
      '/ingredientes': 'http://localhost:8000',
      '/admin': 'http://localhost:8000',
    },
  },
})