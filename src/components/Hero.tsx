// src/components/Hero.tsx
import React from 'react';

// --- ¡SOLUCIÓN AQUÍ! ---
// 1. Importamos la imagen de fondo directamente en el componente.
//    Asegúrate de que tu imagen se llame 'Logo-LionCuts.jpg' y esté en 'src/assets/'
import heroBgImage from '../assets/Logo-LionCuts.jpg';
// --- FIN DE LA SOLUCIÓN ---

function Hero() {
  return (
    // 2. Aplicamos la imagen de fondo usando un 'style' en línea.
    //    React y Vite se encargarán de la ruta correcta.
    <section 
      className="hero" 
      id="inicio" 
      style={{ 
        backgroundImage: `url(${heroBgImage})` 
      }}
    >
      <div className="hero-content">
        <h1>LionsCuts Barbería</h1>
        <p>Estilo, fuerza y precisión en cada corte</p>
        <a href="#contacto" className="btn">Contáctanos</a>
      </div>
    </section>
  );
}

export default Hero;