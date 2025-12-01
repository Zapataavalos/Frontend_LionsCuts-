// src/components/BlogSection.tsx
import React from 'react';
import { Link } from 'react-router-dom'; // <-- Asegúrate de importar Link

// Importa tus imágenes
import blogImg1 from '../assets/blog1.jpg';
import blogImg2 from '../assets/blog2.jpg';

const blogPosts = [
  {
    id: 'cuero-cabelludo',
    slug: 'cuidado-cuero-cabelludo', // El slug para la URL
    title: 'Cómo Cuidar tu Cuero Cabelludo',
    image: blogImg1,
    excerpt: 'La verdadera salud capilar comienza en la raíz...',
  },
  {
    id: 'tendencias',
    slug: 'tendencias-cortes-2025', // El slug para la URL
    title: 'Cortes de Pelo en Tendencia para 2025',
    image: blogImg2,
    excerpt: 'Estilos que combinan lo clásico y moderno...',
  },
];

function BlogSection() {
  return (
    <section className="blog" id="blog">
      <h2>Nuestro Blog</h2>
      <div className="blog-grid">
        {blogPosts.map((post) => (
          <div key={post.id} className="blog-item">
            <img src={post.image} alt={post.title} />
            <h3>{post.title}</h3>
            <p>{post.excerpt}</p>
            {/* --- LÍNEA CRÍTICA --- */}
            {/* Crea el enlace a /blog/SLUG */}
            <Link to={`/blog/${post.slug}`} className="btn-blog">
              Leer Más
            </Link>
            {/* --- FIN LÍNEA CRÍTICA --- */}
          </div>
        ))}
      </div>
    </section>
  );
}

export default BlogSection;