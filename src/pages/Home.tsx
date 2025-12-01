// src/pages/Home.tsx
import React from 'react';

// --- ¡NUEVO! ---
// 1. Importa toast
import { toast } from 'react-toastify';
// --- FIN NUEVO ---

// Componentes
import Hero from '../components/Hero';
import Servicios from '../components/Servicios';
import Barberos from '../components/Barberos';
import BlogSection from '../components/BlogSection';
import Contacto from '../components/Contacto';

// Imágenes e Importaciones del Carrito
import producto1 from '../assets/producto1.jpg';
import producto2 from '../assets/producto2.jpg';
import producto3 from '../assets/producto3.jpg';
import { useCart } from '../context/CartContext';

function Home() {
  const { addToCart } = useCart();

  const products = [
    { id: 'prod1', name: 'Cera Fijación Fuerte', price: 12000, image: producto1, description: 'Moldea tu cabello con una fijación duradera y acabado mate.' },
    { id: 'prod2', name: 'Aceite para Barba Premium', price: 15000, image: producto2, description: 'Hidrata, suaviza y da brillo a tu barba con aceites naturales.' },
    { id: 'prod3', name: 'Shampoo Anticaída Fortalecedor', price: 18000, image: producto3, description: 'Limpia suavemente y ayuda a fortalecer el cabello desde la raíz.' },
  ];

  const handleAddToCart = (product: { id: string; name: string; price: number }) => {
    addToCart(product);
    
    // --- ¡CAMBIO AQUÍ! ---
    // 2. Reemplaza console.log() por toast.success()
    toast.success(`${product.name} añadido al carrito!`, {
        position: "bottom-right", // Posición diferente para que no moleste
        autoClose: 2000, // Cierre rápido
    });
    // --- FIN CAMBIO ---
  };

  return (
    <>
      <Hero />
      <Servicios />
      <Barberos />
      <BlogSection />
      <section className="productos" id="productos">
        <h2>Nuestros Productos</h2>
        <div className="productos-grid">
          {products.map((product) => (
            <div key={product.id} className="producto-item">
              <img src={product.image} alt={product.name} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p className="precio">${product.price.toLocaleString()}</p>
              <button
                className="btn-add-cart"
                onClick={() => handleAddToCart({ id: product.id, name: product.name, price: product.price })}
              >
                Añadir al Carrito
              </button>
            </div>
          ))}
        </div>
      </section>
      <Contacto />
    </>
  );
}

export default Home;