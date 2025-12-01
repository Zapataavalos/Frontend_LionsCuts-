// src/pages/Blogs.tsx
import React from 'react';
import { Link } from 'react-router-dom';

// 1. Importa el CSS global (style.css) que ya está en main.tsx
// 2. Importa el CSS específico para esta página
import '../css/blog-style.css'; 

// 3. Importa las imágenes (ya deberías tenerlas en src/assets/)
import blog1 from '../assets/blog1.jpg';
import blog2 from '../assets/blog2.jpg';

function Blogs() {
  // 4. Solo devolvemos el contenido de <main>. 
  //    El Layout (Header/Footer) se añadirá automáticamente.
  return (
    <main className="blog-page">
      <div className="blog-container">
        <h1>Nuestro Blog</h1>
        
        <article id="cuero-cabelludo" className="blog-post-full">
          <h2>Cómo Cuidar tu Cuero Cabelludo</h2>
          <p className="meta">Publicado el 25 de septiembre de 2025 por el equipo de LionsCuts.</p>
          {/* 5. Conversión de HTML a JSX (img con />) */}
          <img src={blog1} alt="Cuidado del cuero cabelludo" />
          
          <h3>La Base de un Cabello Saludable</h3>
          <p>A menudo nos centramos en las puntas del cabello, pero la verdadera salud capilar comienza en la raíz. Un cuero cabelludo sano es fundamental para prevenir problemas como la caspa, la grasa excesiva y la caída del cabello. Aquí te dejamos los consejos clave de nuestros barberos expertos.</p>

          <h3>1. Limpieza Adecuada</h3>
          <p>Lava tu cabello con la frecuencia que necesites, pero no más. Usar un shampoo adecuado para tu tipo de cuero cabelludo (seco, graso o sensible) es crucial. Masajea suavemente con las yemas de los dedos, nunca con las uñas, para estimular la circulación sin irritar la piel.</p>

          <h3>2. Hidratación y Nutrición</h3>
          <p>Al igual que la piel de tu rostro, el cuero cabelludo necesita hidratación. Utiliza acondicionadores que no apelmacen la raíz y, una vez por semana, considera aplicar una mascarilla específica o un aceite natural como el de jojoba o argán durante unos minutos antes de lavar.</p>
        </article>

        {/* 5. Conversión de HTML a JSX (hr con />) */}
        <hr className="post-divider" />

        <article id="tendencias" className="blog-post-full">
          <h2>Cortes de Pelo en Tendencia para 2025</h2>
          <p className="meta">Publicado el 25 de septiembre de 2025 por el equipo de LionsCuts.</p>
          <img src={blog2} alt="Cortes en tendencia" />
          
          <h3>Define tu Estilo este Año</h3>
          <p>El 2025 llega con estilos que combinan lo clásico y lo moderno, enfocándose en la textura y la versatilidad. Si estás buscando un cambio de look, estas son las tendencias que están dominando en las barberías de todo el mundo.</p>

          <h3>1. Buzz Cut Texturizado</h3>
          <p>El clásico corte rapado se reinventa. En lugar de un acabado uniforme, se busca una ligera longitud en la parte superior para crear textura con ceras o polvos matificantes. Es un look de bajo mantenimiento pero con mucho carácter.</p>

          <h3>2. Mullet Moderno</h3>
          <p>Lejos de su versión ochentera, el mullet moderno es más sutil y estilizado. Se caracteriza por un degradado (fade) en los laterales, una parte superior con textura y una parte trasera más larga pero bien conectada con el resto del corte. Es atrevido y lleno de personalidad.</p>
        </article>

        {/* 6. Conversión de <a> a <Link> para volver a la Home */}
        <Link to="/#blog" className="btn-back">Volver a la Página Principal</Link>
      </div>
    </main>
  );
}

export default Blogs;