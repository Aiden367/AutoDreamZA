
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../../BACKEND/context/UserContext';

type CartContextType = {
  cartCount: number;
  refreshCartCount: () => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { userId } = useUser();
  const [cartCount, setCartCount] = useState(0);

  const refreshCartCount = async () => {
    if (!userId) {
      setCartCount(0);
      return;
    }
    try {
      const res = await axios.get(`http://localhost:5000/user/cart/${userId}`);
      setCartCount(res.data.reduce((sum: number, item: any) => sum + item.quantity, 0));
    } catch {
      setCartCount(0);
    }
  };

  useEffect(() => {
    refreshCartCount();
  }, [userId]);

  return (
    <CartContext.Provider value={{ cartCount, refreshCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within CartProvider');
  return context;
};
