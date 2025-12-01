// src/pages/Acceso.tsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../css/acceso.css'; 
import { toast } from 'react-toastify';
import heroBgImage from '../assets/Logo-LionCuts.jpg';

// Importa el hook useUser para actualizar el estado global
import { useUser } from '../context/UserContext';
function Acceso() {
  const [isLoginView, setIsLoginView] = useState(true);
  const navigate = useNavigate();
  
  // Estados del formulario
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerPhone, setRegisterPhone] = useState(''); // Agregamos teléfono si quieres

  // Obtenemos la función login del contexto global
  const { login } = useUser();

  const showRegister = (e: React.MouseEvent) => { e.preventDefault(); setIsLoginView(false); };
  const showLogin = (e: React.MouseEvent) => { e.preventDefault(); setIsLoginView(true); };

  // --- LÓGICA DE REGISTRO CON BACKEND ---
  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); 

    // Validaciones básicas frontend
    if (!registerEmail.includes('@')) {
      toast.error('Ingresa un correo válido');
      return;
    }

    // Objeto que espera Java (UserEntity)
    const newUser = { 
        fullName: registerName, 
        email: registerEmail, 
        password: registerPassword,
        phone: registerPhone || "999999999" // Valor por defecto si no hay campo teléfono
    };

    try {
        const response = await fetch('http://localhost:8081/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });

        if (response.ok) {
            toast.success('¡Registro exitoso! Ahora inicia sesión.');
            setIsLoginView(true); // Cambiar a vista de login
            // Limpiar campos
            setRegisterName(''); setRegisterEmail(''); setRegisterPassword('');
        } else {
            // Si el backend dice "Email repetido", lo mostramos
            const errorMsg = await response.text();
            toast.error(`Error: ${errorMsg}`);
        }
    } catch (error) {
        console.error("Error registro:", error);
        toast.error("Error de conexión con el servidor.");
    }
  };

  // --- LÓGICA DE LOGIN CON BACKEND ---
  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const loginData = {
        email: loginEmail,
        password: loginPassword
    };

    try {
        const response = await fetch('http://localhost:8081/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loginData)
        });

        if (response.ok) {
            const userDataFromBackend = await response.json();
            
            // --- CONEXIÓN CRÍTICA ---
            // Actualizamos el Contexto Global de React con los datos reales de BD.
            // IMPORTANTE: Aquí incluimos el ID para poder usarlo en las compras.
            login({ 
                id: userDataFromBackend.id, // <--- ¡ESTO ES LO NUEVO E IMPORTANTE!
                name: userDataFromBackend.fullName, 
                email: userDataFromBackend.email 
            });

            toast.success(`¡Bienvenido, ${userDataFromBackend.fullName}!`);
            navigate('/'); // Ir al Home
        } else {
            toast.error('Email o contraseña incorrectos.');
        }
    } catch (error) {
        console.error("Error login:", error);
        toast.error("No se pudo conectar con el servidor.");
    }
  };

  return (
    <div 
      className="acceso-page-wrapper"
      style={{ backgroundImage: `url(${heroBgImage})` }}
    >
      <div className="form-container">
        {isLoginView ? (
          <div id="login-form">
            <Link to="/" className="logo">LionsCuts</Link>
            <h2>Iniciar Sesión</h2>
            <form id="form-login" onSubmit={handleLoginSubmit}>
              <div className="input-group">
                <label htmlFor="login-email">Email</label>
                <input type="email" id="login-email" required value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} />
              </div>
              <div className="input-group">
                <label htmlFor="login-password">Contraseña</label>
                <input type="password" id="login-password" required value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} />
              </div>
              <button type="submit">Ingresar</button>
            </form>
            <p>¿No tienes una cuenta? <a href="#" id="show-register" onClick={showRegister}>Regístrate aquí</a></p>
          </div>
        ) : (
          <div id="register-form">
            <Link to="/" className="logo">LionsCuts</Link>
            <h2>Crear Cuenta</h2>
            <form id="form-register" onSubmit={handleRegisterSubmit}>
              <div className="input-group">
                <label htmlFor="register-name">Nombre Completo</label>
                <input type="text" id="register-name" required value={registerName} onChange={(e) => setRegisterName(e.target.value)} />
              </div>
              <div className="input-group">
                <label htmlFor="register-email">Email</label>
                <input type="email" id="register-email" required value={registerEmail} onChange={(e) => setRegisterEmail(e.target.value)} />
              </div>
              <div className="input-group">
                <label htmlFor="register-password">Contraseña</label>
                <input type="password" id="register-password" required value={registerPassword} onChange={(e) => setRegisterPassword(e.target.value)} />
              </div>
              <button type="submit">Registrarse</button>
            </form>
            <p>¿Ya tienes una cuenta? <a href="#" id="show-login" onClick={showLogin}>Inicia sesión</a></p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Acceso;