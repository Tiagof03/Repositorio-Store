# Food Store - Frontend

Frontend de e-commerce de comida que consume la API de FastAPI.
Catalogo de productos, carrito persistente, checkout con Mercado Pago y
seguimiento de pedidos en tiempo real via WebSocket.

# Como instalarlo

## 1. Clonas el repo.

git clone https://github.com/Tiagof03/Repositorio-Store.git

## 2. Entras a la carpeta.

cd Repositorio-Store

## 3. Instalas las dependencias.

pnpm install

## 4. Copias las variables de entorno.

cp .env.example .env

## 5. Configuras las variables.


VITE_API_URL=http://localhost:8000/api/v1
VITE_MP_PUBLIC_KEY=TEST-xxxx-xxxx-xxxx-xxxx
VITE_ADMIN_URL=http://localhost:5173


## 6. Levantas el proyecto.
#### Previamente habiendo levantado la pagina del administrador

pnpm run dev

## 7. Abris el navegador.

http://localhost:5174

# Seed del backend

## El backend tiene que estar corriendo en http://localhost:8000.

# WebSocket

El estado de los pedidos se actualiza en tiempo real mediante WebSocket.
Cuando la conexion esta activa, un badge verde "En vivo" aparece en la
esquina inferior derecha de la pantalla.

# Nuestro Stack

**React 19**

**TypeScript 6**

**Vite 8**

**TanStack Query 5**

**Zustand 5**

**Tailwind CSS 4**

**Axios**

**Mercado Pago SDK**
