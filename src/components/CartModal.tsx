// src/components/CartModal.tsx
import React from 'react';
import { useCart } from '../context/CartContext';
import { X } from 'lucide-react';
import CheckoutForm from './CheckoutForm'; // <-- Importa el formulario de checkout

const CartModal: React.FC = () => {
  const {
    cartItems,
    cartTotal,
    isCartOpen,
    hideCart,
    removeFromCart,
    isCheckoutView, // <-- Obtener estado de vista
    showCheckout, // <-- Obtener función para mostrar checkout
    clearCart // <-- Obtener función para vaciar (opcional)
  } = useCart();

  if (!isCartOpen) return null;

  return (
    <div className="modal" style={{ display: 'block' }}> {/* Siempre block si isCartOpen es true */}
      <div className="modal-content">
        <span className="close-btn" onClick={hideCart}>
          <X size={24} />
        </span>

        {/* --- Renderizado Condicional --- */}
        {isCheckoutView ? (
          <>
            <h2>Formulario de Pago</h2> {/* Título para checkout */}
            <CheckoutForm />
          </>
        ) : (
          <>
            <h2>Tu Carrito</h2> {/* Título para carrito */}
            <div id="cart-items-container">
              {cartItems.length === 0 ? (
                <p className="empty-cart-message">Tu carrito está vacío.</p>
              ) : (
                cartItems.map((item) => (
                  <div key={item.id} className="cart-item">
                    <div className="cart-item-details">
                      <h4>{item.name}</h4>
                      <p>${item.price.toLocaleString()} x {item.quantity}</p>
                    </div>
                    <button
                      className="remove-item-btn"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))
              )}
            </div>

            {cartItems.length > 0 && (
              <div className="cart-total">
                <h3>Total: ${cartTotal.toLocaleString()}</h3>
              </div>
            )}

            {cartItems.length > 0 && (
              <button id="checkout-btn" onClick={showCheckout}> {/* Botón ahora muestra checkout */}
                Proceder al Pago
              </button>
            )}
            
            {/* Botón opcional para vaciar */}
            {/* {cartItems.length > 0 && (
              <button id="clear-cart-btn" onClick={clearCart}>
                Vaciar Carrito
              </button>
            )} */}
          </>
        )}
        {/* --- Fin Renderizado Condicional --- */}

      </div>
    </div>
  );
};

export default CartModal;