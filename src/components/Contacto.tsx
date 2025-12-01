// src/components/Contacto.tsx
import React, { useState } from 'react';

function Contacto() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // No prevenimos el default, para que coincida con tu script.js
    // (Aunque en React, usualmente SÍ querrías e.preventDefault())
    // e.preventDefault(); 
    
    // Lógica migrada de script.js
    const contactData = { nombre, email, mensaje };
    localStorage.setItem('lionsCutsContactData', JSON.stringify(contactData));
    
    alert('¡Datos de contacto guardados en el almacenamiento local!');
    
    // En React, limpiaríamos los campos así:
    // setNombre('');
    // setEmail('');
    // setMensaje('');
    
    // Si no usas e.preventDefault(), la página se recargará y los campos se limpiarán solos.
  };

  return (
    <section className="contacto" id="contacto">
      <h2>Contáctanos</h2>
      <form className="contacto-form" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre</label>
        <input 
          type="text" 
          id="nombre" 
          name="nombre" 
          required 
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        
        <label htmlFor="email">Email</label>
        <input 
          type="email" 
          id="email" 
          name="email" 
          required 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        
        <label htmlFor="mensaje">Mensaje</label>
        <textarea 
          id="mensaje" 
          name="mensaje" 
          rows={5} 
          required 
          value={mensaje}
          onChange={(e) => setMensaje(e.target.value)}
        />
        
        <button type="submit">Enviar</button>
      </form>
    </section>
  );
}

export default Contacto;