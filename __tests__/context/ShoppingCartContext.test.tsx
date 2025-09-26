/**
 * ShoppingCartContext Test Suite
 * Tests for shopping cart functionality
 */

import React from 'react'
import { act, renderHook } from '@testing-library/react'
import { ShoppingCartProvider, useShoppingCart } from '@/context/ShoppingCartContext'
import { createMockVerkrijgbaar } from '../test-utils'

describe('ShoppingCartContext', () => {
  // Helper to render the hook with provider
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ShoppingCartProvider>{children}</ShoppingCartProvider>
  )

  beforeEach(() => {
    // Clear localStorage before each test
    localStorage.clear()
    jest.clearAllMocks()
  })

  describe('Initial State', () => {
    it('should initialize with empty cart', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper })

      expect(result.current.cartItems).toEqual([])
      expect(result.current.cartQuantity).toBe(0)
      expect(result.current.isOpen).toBe(false)
    })

    it('should load cart from localStorage if available', () => {
      const savedCart = [
        { ...createMockVerkrijgbaar(), quantity: 2 },
        { ...createMockVerkrijgbaar(), quantity: 1 },
      ]
      localStorage.setItem('shopping-cart', JSON.stringify(savedCart))

      const { result } = renderHook(() => useShoppingCart(), { wrapper })

      expect(result.current.cartItems).toEqual(savedCart)
      expect(result.current.cartQuantity).toBe(3)
    })
  })

  describe('addToCart', () => {
    it('should add new item to cart', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper })
      const newItem = createMockVerkrijgbaar()

      act(() => {
        result.current.addToCart(newItem, 2)
      })

      expect(result.current.cartItems).toHaveLength(1)
      expect(result.current.cartItems[0]).toEqual({
        ...newItem,
        quantity: 2,
      })
      expect(result.current.cartQuantity).toBe(2)
    })

    it('should increase quantity for existing item', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper })
      const item = createMockVerkrijgbaar({ sys: { id: 'test-123' } })

      act(() => {
        result.current.addToCart(item, 2)
      })

      act(() => {
        result.current.addToCart(item, 3)
      })

      expect(result.current.cartItems).toHaveLength(1)
      expect(result.current.cartItems[0].quantity).toBe(5)
      expect(result.current.cartQuantity).toBe(5)
    })
  })

  describe('removeFromCart', () => {
    it('should remove item from cart completely', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper })
      const item1 = createMockVerkrijgbaar({ sys: { id: 'item-1' } })
      const item2 = createMockVerkrijgbaar({ sys: { id: 'item-2' } })

      act(() => {
        result.current.addToCart(item1, 2)
        result.current.addToCart(item2, 3)
      })

      act(() => {
        result.current.removeFromCart('item-1')
      })

      expect(result.current.cartItems).toHaveLength(1)
      expect(result.current.cartItems[0].sys.id).toBe('item-2')
      expect(result.current.cartQuantity).toBe(3)
    })
  })

  describe('clearCart', () => {
    it('should remove all items from cart', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper })

      act(() => {
        result.current.addToCart(createMockVerkrijgbaar({ sys: { id: 'item-1' } }), 2)
        result.current.addToCart(createMockVerkrijgbaar({ sys: { id: 'item-2' } }), 3)
      })

      expect(result.current.cartItems).toHaveLength(2)

      act(() => {
        result.current.clearCart()
      })

      expect(result.current.cartItems).toHaveLength(0)
      expect(result.current.cartQuantity).toBe(0)
    })
  })

  describe('Cart UI Controls', () => {
    it('should open and close cart', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper })

      act(() => {
        result.current.openCart()
      })

      expect(result.current.isOpen).toBe(true)

      act(() => {
        result.current.closeCart()
      })

      expect(result.current.isOpen).toBe(false)
    })
  })
})