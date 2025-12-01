// src/components/Barberos.tsx
import React from 'react';

// Importa las imágenes
import barbero1 from '../assets/barbero1.jpg';
import barbero2 from '../assets/barbero2.jpg';
import barbero3 from '../assets/barbero3.jpg';

function Barberos() {
  return (
    <section className="barberos" id="barberos">
      <h2>Nuestros Barberos</h2>
      <div className="barberos-grid">
        <div className="barbero-item">
          <img src={barbero1} alt="Barbero 1" />
          <h3>Carlos "El Navaja" Rivas</h3>
          <p>Con más de 10 años de experiencia, Carlos es un maestro del corte clásico y el afeitado tradicional.</p>
          <div className="rating">★★★★★</div>
        </div>
        <div className="barbero-item">
          <img src={barbero2} alt="Barbero 2" />
          <h3>Javier "El Estilista" Mora</h3>
          <p>Especialista en tendencias modernas y diseños vanguardistas. Perfecto para un cambio de look atrevido.</p>
          <div className="rating">★★★★☆</div>
        </div>
        <div className="barbero-item">
          <img src={barbero3} alt="Barbero 3" />
          <h3>Miguel "Manos de Tijera" Soto</h3>
          <p>Experto en cuidado de barba y tratamientos capilares. Su precisión y atención al detalle son inigualables.</p>
          <div className="rating">★★★★★</div>
        </div>
      </div>
    </section>
  );
}

export default Barberos;