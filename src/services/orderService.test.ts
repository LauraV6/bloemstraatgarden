import { orderService } from './orderService';
import { Verkrijgbaar } from '@/types/contentful';
import { Customer } from '@/types/features/order';

// Mock cart items
const mockCartItem1 = {
  sys: { id: 'item-1' },
  title: 'Tomaten',
  amount: 10,
  quantity: 3,
  postImage: { url: 'test.jpg', title: 'Test' },
  date: '2024-01-01',
} as Verkrijgbaar & { quantity: number };

const mockCartItem2 = {
  sys: { id: 'item-2' },
  title: 'Komkommers',
  amount: 5,
  quantity: 2,
  postImage: { url: 'test2.jpg', title: 'Test2' },
  date: '2024-01-02',
} as Verkrijgbaar & { quantity: number };

const mockCustomer: Customer = {
  name: 'John Doe',
  email: 'john@example.com',
  phone: '0612345678',
};

describe('OrderService', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe('submitOrder', () => {
    it('should submit order successfully', async () => {
      const mockResponse = {
        success: true,
        orderId: 'ORDER-12345',
        message: 'Order submitted successfully',
        totalItems: 5,
      };

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse,
      });

      const result = await orderService.submitOrder(
        [mockCartItem1, mockCartItem2],
        mockCustomer
      );

      expect(result.success).toBe(true);
      expect(result.orderId).toBe('ORDER-12345');
      expect(global.fetch).toHaveBeenCalledTimes(1);
      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/submit-order'),
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: expect.any(String),
        })
      );
    });

    it('should include customer info in request', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      await orderService.submitOrder([mockCartItem1], mockCustomer);

      const fetchCall = (global.fetch as jest.Mock).mock.calls[0];
      const requestBody = JSON.parse(fetchCall[1].body);

      expect(requestBody.customer).toEqual(mockCustomer);
      expect(requestBody.items).toHaveLength(1);
    });

    it('should format cart items correctly', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      await orderService.submitOrder([mockCartItem1, mockCartItem2]);

      const fetchCall = (global.fetch as jest.Mock).mock.calls[0];
      const requestBody = JSON.parse(fetchCall[1].body);

      expect(requestBody.items).toHaveLength(2);
      expect(requestBody.items[0]).toEqual({
        sys: mockCartItem1.sys,
        title: mockCartItem1.title,
        amount: mockCartItem1.amount,
        quantity: mockCartItem1.quantity,
        postImage: mockCartItem1.postImage,
        date: mockCartItem1.date,
      });
    });

    it('should handle API error response', async () => {
      const errorMessage = 'Order failed';

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({ message: errorMessage }),
      });

      const result = await orderService.submitOrder([mockCartItem1]);

      expect(result.success).toBe(false);
      expect(result.message).toBe(errorMessage);
    });

    it('should handle API error without message', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        json: async () => ({}),
      });

      const result = await orderService.submitOrder([mockCartItem1]);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Order submission failed');
    });

    it('should handle network errors', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation();

      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Network error')
      );

      const result = await orderService.submitOrder([mockCartItem1]);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Network error');
      expect(consoleError).toHaveBeenCalledWith(
        'Order submission error:',
        expect.any(Error)
      );

      consoleError.mockRestore();
    });

    it('should handle unknown errors gracefully', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation();

      (global.fetch as jest.Mock).mockRejectedValueOnce('Unknown error');

      const result = await orderService.submitOrder([mockCartItem1]);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Er ging iets mis. Probeer het later opnieuw.');

      consoleError.mockRestore();
    });

    it('should use base URL with environment variable', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      await orderService.submitOrder([mockCartItem1]);

      expect(global.fetch).toHaveBeenCalledWith(
        expect.stringContaining('/.netlify/functions/submit-order'),
        expect.any(Object)
      );
    });

    it('should handle empty cart items', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      await orderService.submitOrder([], mockCustomer);

      const fetchCall = (global.fetch as jest.Mock).mock.calls[0];
      const requestBody = JSON.parse(fetchCall[1].body);

      expect(requestBody.items).toEqual([]);
    });

    it('should submit order without customer info', async () => {
      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => ({ success: true }),
      });

      await orderService.submitOrder([mockCartItem1]);

      const fetchCall = (global.fetch as jest.Mock).mock.calls[0];
      const requestBody = JSON.parse(fetchCall[1].body);

      expect(requestBody.customer).toBeUndefined();
    });
  });

  describe('mockSubmitOrder', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    it('should return successful mock order', async () => {
      const consoleLog = jest.spyOn(console, 'log').mockImplementation();

      const resultPromise = orderService.mockSubmitOrder(
        [mockCartItem1, mockCartItem2],
        mockCustomer
      );

      // Fast-forward time
      jest.advanceTimersByTime(1500);

      const result = await resultPromise;

      expect(result.success).toBe(true);
      expect(result.orderId).toMatch(/^MOCK-\d+-[A-Z0-9]+$/);
      expect(result.message).toContain('John Doe');
      expect(result.message).toContain('john@example.com');
      expect(result.totalItems).toBe(5);

      expect(consoleLog).toHaveBeenCalledWith(
        'Mock order received:',
        expect.objectContaining({
          orderId: expect.any(String),
          customer: {
            name: 'John Doe',
            email: 'john@example.com',
          },
          items: [mockCartItem1, mockCartItem2],
          totalItems: 5,
        })
      );

      consoleLog.mockRestore();
    });

    it('should handle missing customer name', async () => {
      const resultPromise = orderService.mockSubmitOrder([mockCartItem1]);

      jest.advanceTimersByTime(1500);

      const result = await resultPromise;

      expect(result.success).toBe(true);
      expect(result.message).toContain('Onbekend');
    });

    it('should generate unique order IDs', async () => {
      const promise1 = orderService.mockSubmitOrder([mockCartItem1]);
      jest.advanceTimersByTime(10);
      const promise2 = orderService.mockSubmitOrder([mockCartItem1]);

      jest.advanceTimersByTime(1500);

      const [result1, result2] = await Promise.all([promise1, promise2]);

      expect(result1.orderId).not.toBe(result2.orderId);
    });

    it('should calculate total items correctly', async () => {
      const resultPromise = orderService.mockSubmitOrder([
        mockCartItem1, // quantity: 3
        mockCartItem2, // quantity: 2
      ]);

      jest.advanceTimersByTime(1500);

      const result = await resultPromise;

      expect(result.totalItems).toBe(5);
    });

    it('should simulate network delay', async () => {
      const startTime = Date.now();

      const resultPromise = orderService.mockSubmitOrder([mockCartItem1]);

      // Should not resolve immediately
      expect(Date.now() - startTime).toBeLessThan(100);

      jest.advanceTimersByTime(1500);

      await resultPromise;

      // Timers should have advanced by 1500ms
      expect(jest.now()).toBeGreaterThanOrEqual(1500);
    });
  });

  describe('error scenarios', () => {
    it('should handle malformed JSON response', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation();

      (global.fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => {
          throw new Error('Invalid JSON');
        },
      });

      const result = await orderService.submitOrder([mockCartItem1]);

      expect(result.success).toBe(false);
      expect(consoleError).toHaveBeenCalled();

      consoleError.mockRestore();
    });

    it('should handle fetch rejection', async () => {
      const consoleError = jest.spyOn(console, 'error').mockImplementation();

      (global.fetch as jest.Mock).mockRejectedValueOnce(
        new Error('Connection timeout')
      );

      const result = await orderService.submitOrder([mockCartItem1]);

      expect(result.success).toBe(false);
      expect(result.message).toBe('Connection timeout');

      consoleError.mockRestore();
    });
  });
});
