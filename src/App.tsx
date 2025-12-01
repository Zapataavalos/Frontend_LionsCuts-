// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';

// Importaciones de Toastify
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

// Layout
import Header from './components/Header';
import Footer from './components/Footer';
import CartModal from './components/CartModal';

// Páginas
import Home from './pages/Home';
import Acceso from './pages/Acceso';

// Componente de Blog (importado desde 'components')
import BlogPost from './components/BlogPost'; 

// CSS Global
import './css/style.css';


function App() {
  return (
    <CartProvider>
      <Router> {/* El Router envuelve todo */}
        <Header />
        <main>
          <Routes> {/* El 'mapa' de rutas */}
            <Route path="/" element={<Home />} />
            <Route path="/acceso" element={<Acceso />} />
            
            {/* --- ESTA ES LA LÍNEA CRÍTICA --- */}
            {/* Define la ruta para CUALQUIER post de blog */}
            <Route path="/blog/:postId" element={<BlogPost />} />
            {/* --- FIN LÍNEA CRÍTICA --- */}

            {/* <Route path="*" element={<h2>404 - Página no encontrada</h2>} /> */}
          </Routes>
        </main>

        <Footer />
        <CartModal />
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
      </Router>
    </CartProvider>
  );
}

export default App;