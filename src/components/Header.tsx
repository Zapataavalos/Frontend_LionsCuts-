// src/components/Header.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ShoppingCart } from 'lucide-react';
import { toast } from 'react-toastify';

// --- ¡NUEVO! ---
// 1. Importamos el hook del contexto de usuario
// Esto conecta el Header con la "billetera" global de la sesión
import { useUser } from '../context/UserContext';
// --- FIN NUEVO ---

function Header() {
    const { cartCount, showCart } = useCart();
    
    // --- ¡CAMBIO CLAVE! ---
    // 2. En lugar de leer localStorage manualmente, usamos el hook useUser.
    // 'user' tiene los datos (nombre, email) y 'logout' es la función para salir.
    const { user, logout } = useUser();
    // --- FIN CAMBIO ---

    const [isSticky, setIsSticky] = useState(false);

    // (Eliminamos el useEffect antiguo que leía localStorage, ya no es necesario)

    // Efecto para el header pegajoso al hacer scroll
    useEffect(() => {
        const handleScroll = () => setIsSticky(window.scrollY > 50);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        
        // --- ¡CAMBIO CLAVE! ---
        // 3. Llamamos a logout() del contexto. Esto limpia el estado global y el localStorage.
        logout();
        // --- FIN CAMBIO ---
        
        toast.info('Has cerrado la sesión.');
    };

    const handleOpenCart = (e: React.MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        showCart();
    };

    return (
        <header style={{ background: isSticky ? 'rgba(0, 0, 0, 0.95)' : 'rgba(0, 0, 0, 0.8)', transition: 'background 0.3s ease' }}>
            <div className="nav-container">
                <div className="nav-left">
                    <Link to="/" className="logo">LionsCuts</Link> 
                </div>
                <nav className="nav-center">
                    {/* 4. Usamos la variable 'user' del contexto para mostrar el menú */}
                    {user && (
                        <ul>
                            <li><Link to="/">Inicio</Link></li>
                            <li><a href="/#servicios">Servicios</a></li>
                            <li><a href="/#barberos">Barberos</a></li>
                            <li><a href="/#blog">Blog</a></li>
                            <li><a href="/#productos">Tienda</a></li>
                            <li><a href="/#contacto">Contacto</a></li>
                        </ul>
                    )}
                </nav>
                <div className="nav-right">
                    {/* 5. Usamos la variable 'user' del contexto para mostrar el perfil */}
                    {user ? (
                        <ul>
                            <li>
                                <a href="#" className="cart-icon" id="open-cart-btn" onClick={handleOpenCart}>
                                    <ShoppingCart size={24} /> 
                                    {cartCount > 0 && <span id="cart-count">{cartCount}</span>}
                                </a>
                            </li>
                            <li id="user-session-li">
                                {/* Mostramos el nombre que viene del Backend/Contexto */}
                                <a href="#" id="user-name-link">{user.name}</a>
                                <a href="#" id="logout-btn" onClick={handleLogout}>Cerrar Sesión</a>
                            </li>
                        </ul>
                    ) : (
                        <div className="nav-logged-out">
                            <Link to="/acceso" className="btn-acceder">Acceder</Link>
                        </div>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;