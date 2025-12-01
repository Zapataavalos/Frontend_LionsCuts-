// src/context/UserContext.tsx
import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. AGREGA 'id' AQUÍ
interface User {
  id: number; // <--- ¡NUEVO!
  name: string;
  email: string;
}

// 2. Definimos la forma de los datos del usuario
interface User {
  name: string;
  email: string;
}

// 3. Definimos qué funciones tendrá el contexto
interface UserContextType {
  user: User | null;
  login: (userData: User) => void;
  logout: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

// 4. Definimos el tipo para las "props" del proveedor

interface UserProviderProps {
    children: React.ReactNode;
}

export const UserProvider = ({ children }: UserProviderProps) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user_session');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user_session', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user_session');
  };

  return (
    <UserContext.Provider value={{ user, login, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Hook personalizado
export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser debe ser usado dentro de un UserProvider');
  }
  return context;
};