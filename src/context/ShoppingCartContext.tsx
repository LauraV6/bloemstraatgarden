"use client";

import { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Verkrijgbaar } from '@/types/contentful';

interface CartItem extends Verkrijgbaar {
  quantity: number;
}

interface ShoppingCartContextType {
  cartItems: CartItem[];
  cartQuantity: number;
  isOpen: boolean;
  addToCart: (item: Verkrijgbaar, quantity?: number) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotalItems: () => number;
  isInCart: (itemId: string) => boolean;
  getItemQuantity: (itemId: string) => number;
  canAddToCart: (itemId: string, maxAmount: number) => number;
  openCart: () => void;
  closeCart: () => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

export function ShoppingCartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem('shopping-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('shopping-cart', JSON.stringify(cartItems));
  }, [cartItems]);
  
  const cartQuantity = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (item: Verkrijgbaar, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.sys.id === item.sys.id);
      
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.sys.id === item.sys.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      }
      
      return [...prevItems, { ...item, quantity }];
    });
  };

  const removeFromCart = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.sys.id !== itemId));
  };

  const updateQuantity = (itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }
    
    setCartItems(prevItems =>
      prevItems.map(item => {
        if (item.sys.id === itemId) {
          const maxAmount = parseInt(item.amount) || 1;
          const newQuantity = Math.min(quantity, maxAmount);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };
  
  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const getTotalItems = () => {
    return cartItems.reduce((total, item) => total + item.quantity, 0);
  };

  const isInCart = (itemId: string) => {
    return cartItems.some(item => item.sys.id === itemId);
  };

  const getItemQuantity = (itemId: string) => {
    const item = cartItems.find(item => item.sys.id === itemId);
    return item ? item.quantity : 0;
  };

  const canAddToCart = (itemId: string, maxAmount: number) => {
    const currentQuantity = getItemQuantity(itemId);
    return Math.max(0, maxAmount - currentQuantity);
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        cartItems,
        cartQuantity,
        isOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalItems,
        isInCart,
        getItemQuantity,
        canAddToCart,
        openCart,
        closeCart
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
}

export function useShoppingCart() {
  const context = useContext(ShoppingCartContext);
  if (context === undefined) {
    throw new Error('useShoppingCart must be used within a ShoppingCartProvider');
  }
  return context;
}