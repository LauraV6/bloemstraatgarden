import { renderHook, act } from '@testing-library/react';
import { ShoppingCartProvider, useShoppingCart } from './ShoppingCartContext';
import { Verkrijgbaar } from '@/types/contentful';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value;
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Mock product data
const mockProduct1: Verkrijgbaar = {
  sys: { id: 'product-1' },
  title: 'Tomaten',
  amount: '10',
  postImage: { url: 'test.jpg', title: 'Test' },
  date: '2024-01-01',
};

const mockProduct2: Verkrijgbaar = {
  sys: { id: 'product-2' },
  title: 'Komkommers',
  amount: '5',
  postImage: { url: 'test2.jpg', title: 'Test2' },
  date: '2024-01-02',
};

describe('ShoppingCartContext', () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <ShoppingCartProvider>{children}</ShoppingCartProvider>
  );

  describe('useShoppingCart hook', () => {
    it('should throw error when used outside provider', () => {
      // Suppress console.error for this test
      const consoleError = jest.spyOn(console, 'error').mockImplementation();

      expect(() => {
        renderHook(() => useShoppingCart());
      }).toThrow('useShoppingCart must be used within a ShoppingCartProvider');

      consoleError.mockRestore();
    });
  });

  describe('addToCart', () => {
    it('should add a new item to cart', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      expect(result.current.cartItems).toHaveLength(1);
      expect(result.current.cartItems[0].sys.id).toBe('product-1');
      expect(result.current.cartItems[0].quantity).toBe(1);
      expect(result.current.cartQuantity).toBe(1);
    });

    it('should add item with custom quantity', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1, 3);
      });

      expect(result.current.cartItems[0].quantity).toBe(3);
      expect(result.current.cartQuantity).toBe(3);
    });

    it('should update quantity when adding existing item', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1, 2);
      });

      act(() => {
        result.current.addToCart(mockProduct1, 3);
      });

      expect(result.current.cartItems).toHaveLength(1);
      expect(result.current.cartItems[0].quantity).toBe(5);
      expect(result.current.cartQuantity).toBe(5);
    });

    it('should respect max amount when adding', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct2, 10); // max is 5
      });

      expect(result.current.cartItems[0].quantity).toBe(5);
    });

    it('should respect max amount when updating existing item', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct2, 3);
      });

      act(() => {
        result.current.addToCart(mockProduct2, 5); // 3 + 5 = 8, max is 5
      });

      expect(result.current.cartItems[0].quantity).toBe(5);
    });

    it('should add multiple different items', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1, 2);
        result.current.addToCart(mockProduct2, 3);
      });

      expect(result.current.cartItems).toHaveLength(2);
      expect(result.current.cartQuantity).toBe(5);
    });
  });

  describe('removeFromCart', () => {
    it('should remove item from cart', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
        result.current.addToCart(mockProduct2);
      });

      expect(result.current.cartItems).toHaveLength(2);

      act(() => {
        result.current.removeFromCart('product-1');
      });

      expect(result.current.cartItems).toHaveLength(1);
      expect(result.current.cartItems[0].sys.id).toBe('product-2');
    });

    it('should do nothing when removing non-existent item', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      act(() => {
        result.current.removeFromCart('non-existent-id');
      });

      expect(result.current.cartItems).toHaveLength(1);
    });
  });

  describe('updateQuantity', () => {
    it('should update item quantity', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1, 2);
      });

      act(() => {
        result.current.updateQuantity('product-1', 5);
      });

      expect(result.current.cartItems[0].quantity).toBe(5);
    });

    it('should respect max amount when updating', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct2, 2);
      });

      act(() => {
        result.current.updateQuantity('product-2', 10); // max is 5
      });

      expect(result.current.cartItems[0].quantity).toBe(5);
    });

    it('should remove item when quantity is 0', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1, 2);
      });

      act(() => {
        result.current.updateQuantity('product-1', 0);
      });

      expect(result.current.cartItems).toHaveLength(0);
    });

    it('should remove item when quantity is negative', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1, 2);
      });

      act(() => {
        result.current.updateQuantity('product-1', -5);
      });

      expect(result.current.cartItems).toHaveLength(0);
    });
  });

  describe('clearCart', () => {
    it('should clear all items from cart', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1, 2);
        result.current.addToCart(mockProduct2, 3);
      });

      expect(result.current.cartItems).toHaveLength(2);

      act(() => {
        result.current.clearCart();
      });

      expect(result.current.cartItems).toHaveLength(0);
      expect(result.current.cartQuantity).toBe(0);
    });
  });

  describe('isInCart', () => {
    it('should return true when item is in cart', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1);
      });

      expect(result.current.isInCart('product-1')).toBe(true);
    });

    it('should return false when item is not in cart', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      expect(result.current.isInCart('product-1')).toBe(false);
    });
  });

  describe('getItemQuantity', () => {
    it('should return correct quantity for item in cart', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1, 5);
      });

      expect(result.current.getItemQuantity('product-1')).toBe(5);
    });

    it('should return 0 for item not in cart', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      expect(result.current.getItemQuantity('product-1')).toBe(0);
    });
  });

  describe('canAddToCart', () => {
    it('should return max amount when item not in cart', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      expect(result.current.canAddToCart('product-1', 10)).toBe(10);
    });

    it('should return remaining amount when item partially in cart', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1, 3);
      });

      expect(result.current.canAddToCart('product-1', 10)).toBe(7);
    });

    it('should return 0 when cart is at max', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct2, 5); // max is 5
      });

      expect(result.current.canAddToCart('product-2', 5)).toBe(0);
    });
  });

  describe('cart visibility', () => {
    it('should open and close cart', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      expect(result.current.isOpen).toBe(false);

      act(() => {
        result.current.openCart();
      });

      expect(result.current.isOpen).toBe(true);

      act(() => {
        result.current.closeCart();
      });

      expect(result.current.isOpen).toBe(false);
    });
  });

  describe('localStorage persistence', () => {
    it('should save cart to localStorage', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1, 2);
      });

      const saved = localStorageMock.getItem('shopping-cart');
      expect(saved).toBeTruthy();

      const parsed = JSON.parse(saved!);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].sys.id).toBe('product-1');
      expect(parsed[0].quantity).toBe(2);
    });

    it('should load cart from localStorage on mount', () => {
      // Pre-populate localStorage
      const cartData = [
        { ...mockProduct1, quantity: 3 },
        { ...mockProduct2, quantity: 2 },
      ];
      localStorageMock.setItem('shopping-cart', JSON.stringify(cartData));

      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      expect(result.current.cartItems).toHaveLength(2);
      expect(result.current.cartQuantity).toBe(5);
    });

    it('should handle corrupted localStorage data gracefully', () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation();

      localStorageMock.setItem('shopping-cart', 'invalid json');

      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      expect(result.current.cartItems).toHaveLength(0);
      expect(consoleError).toHaveBeenCalled();

      consoleError.mockRestore();
    });

    it('should handle non-array localStorage data', () => {
      localStorageMock.setItem('shopping-cart', JSON.stringify({ invalid: 'data' }));

      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      expect(result.current.cartItems).toHaveLength(0);
    });
  });

  describe('cartQuantity calculation', () => {
    it('should calculate total quantity correctly', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1, 3);
        result.current.addToCart(mockProduct2, 5);
      });

      expect(result.current.cartQuantity).toBe(8);
    });

    it('should update total quantity when items are modified', () => {
      const { result } = renderHook(() => useShoppingCart(), { wrapper });

      act(() => {
        result.current.addToCart(mockProduct1, 5);
      });

      expect(result.current.cartQuantity).toBe(5);

      act(() => {
        result.current.updateQuantity('product-1', 10);
      });

      expect(result.current.cartQuantity).toBe(10);
    });
  });
});
