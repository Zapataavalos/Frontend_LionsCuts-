// src/main.tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Importa tus páginas y layout
import Layout from './components/Layout';
import Home from './pages/Home';
import Acceso from './pages/Acceso';
import Blogs from './pages/Blogs';
import BlogPost from './components/BlogPost';

// Importaciones para Notificaciones
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// Importa tu CSS global
import './css/style.css'; 

// Importa los proveedores de Contexto
import { CartProvider } from './context/CartContext';
// --- ¡NUEVO! Importamos el UserProvider ---
import { UserProvider } from './context/UserContext';
// ------------------------------------------

// Definición de rutas
const router = createBrowserRouter([
  {
    // RUTA 1: RUTAS QUE SÍ TIENEN HEADER Y FOOTER
    path: '/',
    element: <Layout />, 
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/blogs',
        element: <Blogs />,
      },
      {
        path: '/blog/:postId',
        element: <BlogPost />,
      },
    ],
  },
  {
    // RUTA 2: RUTAS QUE NO TIENEN HEADER NI FOOTER
    path: '/acceso',
    element: <Acceso />,
  },
]);

// Renderiza la app
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* 1. Envolvemos todo con UserProvider primero (Autenticación) */}
    <UserProvider>
      {/* 2. Luego el CartProvider (Tienda) */}
      <CartProvider>
        
        <RouterProvider router={router} />
        
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
        
      </CartProvider>
    </UserProvider>
  </React.StrictMode>
);