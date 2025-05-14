import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Product } from '@/types';
import { useAuth } from './AuthContext';

interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addToCart: (product: Product, quantity: number, selectedSize?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const { user } = useAuth();
  
  // Calculate derived values
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const totalPrice = items.reduce(
    (total, item) => total + (item.product.salePrice ?? item.product.price) * item.quantity, 
    0
  );

  // Load cart from localStorage on mount or when user changes
  useEffect(() => {
    if (user) {
      const storageKey = `styleaura_cart_${user.id}`;
      const storedCart = localStorage.getItem(storageKey);
      
      if (storedCart) {
        try {
          setItems(JSON.parse(storedCart));
        } catch (error) {
          console.error('Failed to parse stored cart:', error);
          localStorage.removeItem(storageKey);
          setItems([]);
        }
      } else {
        // Clear cart if no stored cart for current user
        setItems([]);
      }
    } else {
      // Clear cart on logout
      setItems([]);
    }
  }, [user?.id]);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      const storageKey = `styleaura_cart_${user.id}`;
      localStorage.setItem(storageKey, JSON.stringify(items));
    }
  }, [items, user?.id]);

  // Add product to cart
  const addToCart = (product: Product, quantity: number, selectedSize?: string) => {
    if (!user) {
      return; // Don't add to cart if user is not logged in
    }
    
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(item => 
        item.product.id === product.id && 
        ((!item.selectedSize && !selectedSize) || item.selectedSize === selectedSize)
      );
      
      if (existingItemIndex !== -1) {
        // Update quantity if same product and size already in cart
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + quantity
        };
        return updatedItems;
      } else {
        // Add new item if product/size combination doesn't exist in cart
        return [...prevItems, { product, quantity, selectedSize }];
      }
    });
  };

  // Remove product from cart
  const removeFromCart = (productId: string) => {
    setItems(prevItems => prevItems.filter(item => item.product.id !== productId));
  };

  // Update product quantity
  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  // Clear entire cart
  const clearCart = () => {
    setItems([]);
  };

  return (
    <CartContext.Provider value={{
      items,
      totalItems,
      totalPrice,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};
