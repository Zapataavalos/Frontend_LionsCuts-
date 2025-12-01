// src/components/Servicios.tsx
import React from 'react';

// Importa las imágenes
import servicio1 from '../assets/servicio1.jpg';
import servicio2 from '../assets/servicio2.jpg';
import servicio3 from '../assets/servicio3.jpg';

function Servicios() {
  return (
    <section className="servicios" id="servicios">
      <h2>Nuestros Servicios</h2>
      <div className="servicios-grid">
        <div className="servicio-item">
          <img src={servicio1} alt="Corte clásico" />
          <h3>Corte Clásico</h3>
          <p>Un corte tradicional con acabado profesional.</p>
        </div>
        <div className="servicio-item">
          <img src={servicio2} alt="Barba y estilo" />
          <h3>Barba & Estilo</h3>
          <p>Diseño y cuidado de barba con estilo único.</p>
        </div>
        <div className="servicio-item">
          <img src={servicio3} alt="Color & Tratamiento" />
          <h3>Color & Tratamiento</h3>
          <p>Coloración y tratamiento capilar de primera calidad.</p>
        </div>
      </div>
    </section>
  );
}

export default Servicios;