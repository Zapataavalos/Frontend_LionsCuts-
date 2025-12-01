// src/components/Productos.tsx
import React from 'react';
import { useCart } from '../context/CartContext'; // Importa el hook

// Importa imágenes
import producto1 from '../assets/producto1.jpg';
import producto2 from '../assets/producto2.jpg';
import producto3 from '../assets/producto3.jpg';

// Define los productos (esto podría venir de una API)
const productos = [
  { id: '1', name: 'Cera Fijación Fuerte', price: 12990, img: producto1, alt: 'Cera para peinar' },
  { id: '2', name: 'Aceite Esencial para Barba', price: 15990, img: producto2, alt: 'Aceite para barba' },
  { id: '3', name: 'Shampoo Fortificante', price: 18990, img: producto3, alt: 'Shampoo anti-caída' },
];

function Productos() {
  // Obtiene la función para añadir items del contexto
  const { addItemToCart } = useCart();

  return (
    <section className="productos" id="productos">
      <h2>Tienda de Productos</h2>
      <div className="productos-grid">
        {productos.map((prod) => (
          <div className="producto-item" key={prod.id}>
            <img src={prod.img} alt={prod.alt} />
            <h3>{prod.name}</h3>
            <p className="precio">${prod.price.toLocaleString('es-CL')}</p>
            {/* Llama a la función del contexto al hacer clic */}
            <button 
              className="btn-add-cart"
              onClick={() => addItemToCart(prod)}
            >
              Añadir al Carrito
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Productos;
