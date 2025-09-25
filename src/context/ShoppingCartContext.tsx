"use client";

import { createContext, useContext, useState, ReactNode, useEffect, useCallback, useMemo } from 'react';
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
  isInCart: (itemId: string) => boolean;
  getItemQuantity: (itemId: string) => number;
  canAddToCart: (itemId: string, maxAmount: number) => number;
  openCart: () => void;
  closeCart: () => void;
}

const ShoppingCartContext = createContext<ShoppingCartContextType | undefined>(undefined);

const STORAGE_KEY = 'shopping-cart';

export function ShoppingCartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const savedCart = localStorage.getItem(STORAGE_KEY);
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          setCartItems(parsed);
        }
      }
    } catch (error) {
      console.error('Failed to load cart from localStorage:', error);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
    } catch (error) {
      console.error('Failed to save cart to localStorage:', error);
    }
  }, [cartItems]);

  const cartQuantity = useMemo(() =>
    cartItems.reduce((total, item) => total + item.quantity, 0),
    [cartItems]
  );

  const addToCart = useCallback((item: Verkrijgbaar, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.sys.id === item.sys.id);

      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.sys.id === item.sys.id
            ? { ...cartItem, quantity: Math.min(cartItem.quantity + quantity, parseInt(item.amount) || 99) }
            : cartItem
        );
      }

      return [...prevItems, { ...item, quantity: Math.min(quantity, parseInt(item.amount) || 99) }];
    });
  }, []);

  const removeFromCart = useCallback((itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.sys.id !== itemId));
  }, []);

  const updateQuantity = useCallback((itemId: string, quantity: number) => {
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
  }, [removeFromCart]);

  const clearCart = useCallback(() => {
    setCartItems([]);
  }, []);

  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const isInCart = useCallback((itemId: string) => {
    return cartItems.some(item => item.sys.id === itemId);
  }, [cartItems]);

  const getItemQuantity = useCallback((itemId: string) => {
    const item = cartItems.find(item => item.sys.id === itemId);
    return item ? item.quantity : 0;
  }, [cartItems]);

  const canAddToCart = useCallback((itemId: string, maxAmount: number) => {
    const currentQuantity = getItemQuantity(itemId);
    return Math.max(0, maxAmount - currentQuantity);
  }, [getItemQuantity]);

  const contextValue = useMemo(() => ({
    cartItems,
    cartQuantity,
    isOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
    canAddToCart,
    openCart,
    closeCart
  }), [
    cartItems,
    cartQuantity,
    isOpen,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    isInCart,
    getItemQuantity,
    canAddToCart,
    openCart,
    closeCart
  ]);

  return (
    <ShoppingCartContext.Provider value={contextValue}>
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