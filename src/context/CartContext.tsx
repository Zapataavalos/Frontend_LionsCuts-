// src/context/CartContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react'; // ReactNode removed from import

// Interfaces (CartItem remains the same)
export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  cartCount: number;
  cartTotal: number;
  isCartOpen: boolean;
  isCheckoutView: boolean;
  addToCart: (item: { id: string; name: string; price: number }) => void;
  removeFromCart: (id: string) => void;
  showCart: () => void;
  hideCart: () => void;
  clearCart: () => void;
  showCheckout: () => void;
  showCartView: () => void;
}

// Context creation remains the same
const CartContext = createContext<CartContextType | undefined>(undefined);

// Define props type using React.ReactNode
type CartProviderProps = {
  children: React.ReactNode; // Use React.ReactNode directly
}

// Provider
export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const savedCart = localStorage.getItem('cartItems');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutView, setIsCheckoutView] = useState(false);

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const cartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const addToCart = (product: { id: string; name: string; price: number }) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === id);
      if (existingItem && existingItem.quantity > 1) {
        return prevItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        );
      } else {
        return prevItems.filter((item) => item.id !== id);
      }
    });
  };

  const clearCart = () => {
    setCartItems([]);
    setIsCheckoutView(false);
  };

  const showCart = () => {
    setIsCartOpen(true);
    //setIsCheckoutView(false);
  };

  const hideCart = () => {
    setIsCartOpen(false);
    setIsCheckoutView(false);
  };

  const showCheckout = () => setIsCheckoutView(true);
  const showCartView = () => setIsCheckoutView(false);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        cartTotal,
        isCartOpen,
        isCheckoutView,
        addToCart,
        removeFromCart,
        showCart,
        hideCart,
        clearCart,
        showCheckout,
        showCartView,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// Hook remains the same
export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};