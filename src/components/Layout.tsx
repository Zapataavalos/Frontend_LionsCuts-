// src/components/Layout.tsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import CartModal from './CartModal'; // Importa el modal

function Layout() {
  return (
    <>
      <Header />
      <main>
        {/* Outlet renderizará la página actual (Home, Acceso, etc.) */}
        <Outlet />
      </main>
      <Footer />
      
      {/* El Modal del Carrito vive aquí */}
      <CartModal />
    </>
  );
}

export default Layout;