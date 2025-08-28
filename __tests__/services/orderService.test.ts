/**
 * OrderService Test Suite
 * Tests for order submission functionality
 */

import { orderService } from '@/services/orderService'
import { createMockVerkrijgbaar, createMockCustomer } from '../test-utils'
import { Customer, OrderResponse } from '@/types'

describe('OrderService', () => {
  // Save the original fetch
  const originalFetch = global.fetch
  
  beforeEach(() => {
    // Reset fetch mock before each test
    global.fetch = jest.fn()
    // Clear environment variables
    process.env.NEXT_PUBLIC_SITE_URL = ''
  })
  
  afterEach(() => {
    // Restore original fetch
    global.fetch = originalFetch
    jest.clearAllMocks()
  })

  describe('submitOrder', () => {
    const mockCustomer = createMockCustomer()
    const mockCartItems = [
      { ...createMockVerkrijgbaar(), quantity: 2 },
      { ...createMockVerkrijgbaar(), quantity: 1 },
    ]

    it('should successfully submit an order with valid data', async () => {
      const mockResponse: OrderResponse = {
        success: true,
        message: 'Order placed successfully',
        orderId: 'ORD-12345',
        totalItems: 3,
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await orderService.submitOrder(mockCartItems, mockCustomer)

      expect(result).toEqual(mockResponse)
      expect(global.fetch).toHaveBeenCalledTimes(1)
      expect(global.fetch).toHaveBeenCalledWith(
        '/.netlify/functions/submit-order',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: expect.any(String),
        })
      )
    })

    it('should handle order submission without customer info', async () => {
      const mockResponse: OrderResponse = {
        success: true,
        message: 'Order placed successfully',
        orderId: 'ORD-12346',
        totalItems: 3,
      }

      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      })

      const result = await orderService.submitOrder(mockCartItems)
      expect(result).toEqual(mockResponse)
    })

    it('should handle server error responses', async () => {
      const errorMessage = 'Server error occurred'
      ;(global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 500,
        json: async () => ({ message: errorMessage }),
      })

      const result = await orderService.submitOrder(mockCartItems, mockCustomer)

      expect(result.success).toBe(false)
      expect(result.message).toBe(errorMessage)
    })

    it('should handle network errors gracefully', async () => {
      const networkError = new Error('Network request failed')
      ;(global.fetch as jest.Mock).mockRejectedValueOnce(networkError)

      const result = await orderService.submitOrder(mockCartItems, mockCustomer)

      expect(result.success).toBe(false)
      expect(result.message).toBe('Network request failed')
    })

    it('should use fallback error message for unknown errors', async () => {
      ;(global.fetch as jest.Mock).mockRejectedValueOnce('Unknown error')

      const result = await orderService.submitOrder(mockCartItems, mockCustomer)

      expect(result.success).toBe(false)
      expect(result.message).toBe('Er ging iets mis. Probeer het later opnieuw.')
    })
  })

  describe('mockSubmitOrder', () => {
    beforeEach(() => {
      jest.useFakeTimers()
    })

    afterEach(() => {
      jest.useRealTimers()
    })

    it('should simulate successful order submission', async () => {
      const mockCartItems = [
        { ...createMockVerkrijgbaar(), quantity: 2 },
      ]
      const mockCustomer = createMockCustomer()

      const orderPromise = orderService.mockSubmitOrder(mockCartItems, mockCustomer)
      
      // Fast-forward time by 1500ms (mock delay)
      jest.advanceTimersByTime(1500)
      
      const result = await orderPromise

      expect(result.success).toBe(true)
      expect(result.orderId).toMatch(/^MOCK-\d+-[A-Z0-9]+$/)
      expect(result.message).toContain(mockCustomer.name)
      expect(result.totalItems).toBe(2)
    })

    it('should handle mock submission without customer info', async () => {
      const mockCartItems = [
        { ...createMockVerkrijgbaar(), quantity: 1 },
      ]

      const orderPromise = orderService.mockSubmitOrder(mockCartItems)
      jest.advanceTimersByTime(1500)
      const result = await orderPromise

      expect(result.success).toBe(true)
      expect(result.message).toContain('Onbekend')
      expect(result.totalItems).toBe(1)
    })
  })
})