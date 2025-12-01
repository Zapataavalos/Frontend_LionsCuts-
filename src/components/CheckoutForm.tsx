// src/components/CheckoutForm.tsx
import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';

// --- ¡NUEVO! Importamos el UserContext ---
// Necesitamos saber QUIÉN está comprando (su ID) para guardarlo en la BD
import { useUser } from '../context/UserContext';
// ----------------------------------------

const CheckoutForm: React.FC = () => {
    const { cartTotal, showCartView, hideCart, clearCart } = useCart();
    
    // Obtenemos el usuario del contexto global
    const { user } = useUser();

    // Estados existentes (Los mantenemos para el formulario visual)
    const [nombre, setNombre] = useState('');
    const [apellidos, setApellidos] = useState('');
    const [rut, setRut] = useState('');
    const [numeroTarjeta, setNumeroTarjeta] = useState('');
    const [cvv, setCvv] = useState('');
    const [metodoEntrega, setMetodoEntrega] = useState('retiro');

    // Estados para Envío a Domicilio
    const [direccion, setDireccion] = useState('');
    const [ciudad, setCiudad] = useState('');
    const [region, setRegion] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');

    // --- LÓGICA DE PAGO REAL CON BACKEND ---
    const handlePayment = async (e: React.FormEvent) => {
        e.preventDefault();

        // 1. Validación de Seguridad: ¿Está logueado?
        if (!user || !user.id) {
            toast.error("Error de seguridad: Debes iniciar sesión nuevamente.");
            return;
        }

        // 2. Preparamos los datos para Spring Boot
        // (Solo enviamos lo que la tabla 'orders' necesita por ahora)
        const orderData = {
            totalAmount: cartTotal,
            status: "PAGADO" 
        };

        try {
            // 3. Enviamos la petición al Backend (Puerto 8081)
            // Pasamos el userId como parámetro en la URL
            const response = await fetch(`http://localhost:8081/api/v1/orders?userId=${user.id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(orderData)
            });

            if (response.ok) {
                // 4. Si el servidor responde OK (200), mostramos éxito
                const orderSaved = await response.json(); // Obtenemos la respuesta (ej: ID del pedido)

                let message = `¡Compra #${orderSaved.id} exitosa! Total: $${cartTotal.toLocaleString()}.`;
                
                if (metodoEntrega === 'envio') {
                    message += `\nEnvío a: ${direccion}, ${ciudad}.`;
                } else {
                     message += `\nMétodo: Retiro en tienda.`;
                }

                toast.success(message, {
                    position: "top-center",
                    autoClose: 5000,
                });

                // Limpiamos el carrito y cerramos el modal
                clearCart();
                hideCart();

            } else {
                toast.error("Hubo un error al procesar el pedido en el servidor.");
            }

        } catch (error) {
            console.error("Error checkout:", error);
            toast.error("Error de conexión con el sistema de ventas.");
        }
    };

    return (
        <div id="checkout-form">
            <form onSubmit={handlePayment}>
                {/* Campos: Nombre, Apellidos, RUT, Tarjeta, CVV */}
                <div className="form-group">
                    <label htmlFor="nombre">Nombre</label>
                    <input type="text" id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="apellidos">Apellidos</label>
                    <input type="text" id="apellidos" value={apellidos} onChange={(e) => setApellidos(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label htmlFor="rut">RUT</label>
                    <input type="text" id="rut" placeholder="12.345.678-9" value={rut} onChange={(e) => setRut(e.target.value)} required />
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="numeroTarjeta">Número de Tarjeta</label>
                        <input type="text" id="numeroTarjeta" placeholder="**** **** **** ****" value={numeroTarjeta} onChange={(e) => setNumeroTarjeta(e.target.value)} required />
                    </div>
                    <div className="form-group cvv-group">
                        <label htmlFor="cvv">CVV</label>
                        <input type="text" id="cvv" placeholder="123" maxLength={3} value={cvv} onChange={(e) => setCvv(e.target.value)} required />
                    </div>
                </div>

                {/* Método de Entrega */}
                <div className="form-group">
                    <label>Método de Entrega</label>
                    <div className="radio-group">
                        <input
                            type="radio" id="retiro" name="metodoEntrega" value="retiro"
                            checked={metodoEntrega === 'retiro'} onChange={(e) => setMetodoEntrega(e.target.value)}
                        />
                        <label htmlFor="retiro">Retiro en Tienda</label>
                    </div>
                    <div className="radio-group">
                        <input
                            type="radio" id="envio" name="metodoEntrega" value="envio"
                            checked={metodoEntrega === 'envio'} onChange={(e) => setMetodoEntrega(e.target.value)}
                        />
                        <label htmlFor="envio">Envío a Domicilio</label>
                    </div>
                </div>

                {/* Campos Condicionales de Envío */}
                {metodoEntrega === 'envio' && (
                    <div className="shipping-address-fields">
                        <div className="form-group">
                            <label htmlFor="direccion">Dirección</label>
                            <input type="text" id="direccion" placeholder="Calle, Número, Depto/Casa" value={direccion} onChange={(e) => setDireccion(e.target.value)} required={metodoEntrega === 'envio'} />
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="ciudad">Ciudad</label>
                                <input type="text" id="ciudad" value={ciudad} onChange={(e) => setCiudad(e.target.value)} required={metodoEntrega === 'envio'} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="region">Región</label>
                                <input type="text" id="region" value={region} onChange={(e) => setRegion(e.target.value)} required={metodoEntrega === 'envio'} />
                            </div>
                        </div>
                         <div className="form-group">
                            <label htmlFor="codigoPostal">Código Postal (Opcional)</label>
                            <input type="text" id="codigoPostal" value={codigoPostal} onChange={(e) => setCodigoPostal(e.target.value)} />
                        </div>
                    </div>
                )}

                <button type="submit" id="pay-btn">Pagar ${cartTotal.toLocaleString()}</button>
                <button type="button" id="back-to-cart-btn" onClick={showCartView}>
                    Volver al Carrito
                </button>
            </form>
        </div>
    );
};

export default CheckoutForm;