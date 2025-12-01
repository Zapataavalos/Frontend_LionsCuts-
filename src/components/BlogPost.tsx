// src/components/BlogPost.tsx
import React from 'react';
import { useParams, Link as RouterLink } from 'react-router-dom'; // <-- Importa useParams

// --- Datos del Blog (simplificado) ---
// Asegúrate de que las claves (ej. 'cuidado-cuero-cabelludo') coincidan con los slugs
const blogData = {
  'cuidado-cuero-cabelludo': {
    title: 'Cómo Cuidar tu Cuero Cabelludo',
    author: 'Equipo LionsCuts',
    date: '25 de septiembre de 2025',
    image: '/src/assets/blog1.jpg',
    content: `<h3>La Base de un Cabello Saludable</h3><p>A menudo nos centramos en las puntas...</p><h3>1. Limpieza Adecuada</h3><p>Lava tu cabello...</p>` // Contenido completo
  },
  'tendencias-cortes-2025': {
    title: 'Cortes de Pelo en Tendencia para 2025',
    author: 'Equipo LionsCuts',
    date: '25 de septiembre de 2025',
    image: '/src/assets/blog2.jpg',
    content: `<h3>Define tu Estilo este Año</h3><p>El 2025 llega con estilos...</p><h3>1. Buzz Cut Texturizado</h3><p>El clásico corte...</p>` // Contenido completo
  },
};

// Estilos (temporal, puedes moverlo a CSS)
const styles = {
    blogPage: { padding: '100px 20px 40px', maxWidth: '800px', margin: '0 auto', color: '#ccc', },
    blogTitle: { fontSize: '2.5rem', color: '#f1c40f', marginBottom: '10px', },
    meta: { fontSize: '0.9rem', color: '#888', marginBottom: '20px', },
    blogImage: { width: '100%', borderRadius: '8px', marginBottom: '30px', },
    blogContent: { lineHeight: '1.7', },
    backButton: { display: 'inline-block', marginTop: '30px', padding: '10px 20px', background: '#555', color: '#fff', textDecoration: 'none', borderRadius: '5px', transition: 'background 0.3s', }
};

function BlogPost() {
  // --- LÍNEA CRÍTICA ---
  // Obtiene el 'postId' de la URL (que coincide con el :postId de App.tsx)
  const { postId } = useParams<{ postId: string }>();
  // --- FIN LÍNEA CRÍTICA ---

  const post = postId ? blogData[postId as keyof typeof blogData] : null;

  if (!post) {
    return (
      <div style={styles.blogPage}>
        <h2>Post no encontrado</h2>
        <RouterLink to="/" style={styles.backButton}>Volver al Inicio</RouterLink>
      </div>
    );
  }

  return (
    <main style={styles.blogPage}>
      <article>
        <h1 style={styles.blogTitle}>{post.title}</h1>
        <p style={styles.meta}>Publicado el {post.date} por {post.author}</p>
        <img src={post.image} alt={post.title} style={styles.blogImage} />
        <div
          style={styles.blogContent}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
      <RouterLink to="/" style={styles.backButton}>Volver al Inicio</RouterLink>
    </main>
  );
}

export default BlogPost;