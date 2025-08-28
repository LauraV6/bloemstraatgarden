/**
 * Web Vitals Test Suite
 * Professional tests for performance monitoring utilities
 */

import { sendToAnalytics, reportWebVitals, measurePerformance, reportRenderPerformance } from '@/lib/performance/webVitals'
import { onCLS, onFCP, onLCP, onTTFB, onINP } from 'web-vitals'
import type { Metric } from 'web-vitals'

// Mock web-vitals library
jest.mock('web-vitals', () => ({
  onCLS: jest.fn(),
  onFCP: jest.fn(),
  onLCP: jest.fn(),
  onTTFB: jest.fn(),
  onINP: jest.fn(),
}))

describe('Web Vitals Performance Monitoring', () => {
  let consoleLogSpy: jest.SpyInstance
  let consoleWarnSpy: jest.SpyInstance
  let consoleErrorSpy: jest.SpyInstance
  let gtagSpy: jest.Mock
  let originalEnv: string

  beforeEach(() => {
    // Save original NODE_ENV
    originalEnv = process.env.NODE_ENV
    process.env.NODE_ENV = 'development'

    // Setup console spies
    consoleLogSpy = jest.spyOn(console, 'log').mockImplementation()
    consoleWarnSpy = jest.spyOn(console, 'warn').mockImplementation()
    consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation()

    // Setup gtag mock
    gtagSpy = jest.fn()
    global.window = Object.create(window)
    Object.defineProperty(window, 'gtag', {
      value: gtagSpy,
      writable: true,
      configurable: true,
    })

    // Mock navigator connection
    Object.defineProperty(navigator, 'connection', {
      value: { effectiveType: '4g' },
      writable: true,
      configurable: true,
    })

    // Mock performance API with proper typing
    const mockPerformance = {
      mark: jest.fn(),
      measure: jest.fn(),
      getEntriesByName: jest.fn().mockReturnValue([
        { duration: 123.45, name: 'test-mark' },
      ]),
    }
    
    Object.defineProperty(global, 'performance', {
      value: mockPerformance,
      writable: true,
      configurable: true,
    })

    // Clear all mocks
    jest.clearAllMocks()
  })

  afterEach(() => {
    // Restore original NODE_ENV
    process.env.NODE_ENV = originalEnv
    
    // Restore console methods
    consoleLogSpy.mockRestore()
    consoleWarnSpy.mockRestore()
    consoleErrorSpy.mockRestore()
    
    // Clear all mocks
    jest.clearAllMocks()
  })

  describe('sendToAnalytics', () => {
    const mockMetric: Metric = {
      name: 'CLS',
      value: 0.15,
      rating: 'needs-improvement',
      delta: 0.1,
      entries: [],
      id: 'test-id',
      navigationType: 'navigate',
    }

    it('should log metrics in development mode', () => {
      sendToAnalytics(mockMetric)

      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[Web Vitals] CLS:',
        expect.objectContaining({
          value: 0.15,
          rating: 'needs-improvement',
        })
      )
    })

    it('should warn about poor performance', () => {
      sendToAnalytics(mockMetric)

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '⚠️ Poor CLS performance detected:',
        expect.objectContaining({
          value: 0.15,
          threshold: '< 0.1',
          recommendation: expect.stringContaining('layout shifts'),
        })
      )
    })

    it('should not warn about good performance', () => {
      const goodMetric: Metric = {
        ...mockMetric,
        rating: 'good',
        value: 0.05,
      }

      sendToAnalytics(goodMetric)

      expect(consoleWarnSpy).not.toHaveBeenCalled()
    })

    it.skip('should send data to Google Analytics when available', () => {
      sendToAnalytics(mockMetric)

      expect(gtagSpy).toHaveBeenCalledWith(
        'event',
        'CLS',
        expect.objectContaining({
          event_category: 'Web Vitals',
          value: 0.15,
          event_label: 'test-id',
        })
      )
    })

    it('should handle different metric types correctly', () => {
      const lcpMetric: Metric = {
        ...mockMetric,
        name: 'LCP',
        value: 3000,
      }

      sendToAnalytics(lcpMetric)

      expect(gtagSpy).toHaveBeenCalledWith(
        'event',
        'LCP',
        expect.objectContaining({
          value: 3000,
        })
      )
    })

    it('should handle missing gtag gracefully', () => {
      delete (window as any).gtag

      expect(() => sendToAnalytics(mockMetric)).not.toThrow()
    })

    it('should not log in production mode', () => {
      process.env.NODE_ENV = 'production'

      sendToAnalytics(mockMetric)

      expect(consoleLogSpy).not.toHaveBeenCalled()
    })

    it('should detect connection speed correctly', () => {
      sendToAnalytics(mockMetric)

      expect(gtagSpy).toHaveBeenCalledWith(
        'event',
        expect.any(String),
        expect.objectContaining({
          connection_speed: '4g',
        })
      )
    })

    it('should handle missing connection API', () => {
      delete (navigator as any).connection

      sendToAnalytics(mockMetric)

      expect(gtagSpy).toHaveBeenCalledWith(
        'event',
        expect.any(String),
        expect.objectContaining({
          connection_speed: 'unknown',
        })
      )
    })
  })

  describe('reportWebVitals', () => {
    it('should register all web vitals callbacks', () => {
      reportWebVitals()

      expect(onCLS).toHaveBeenCalledWith(sendToAnalytics)
      expect(onFCP).toHaveBeenCalledWith(sendToAnalytics)
      expect(onINP).toHaveBeenCalledWith(sendToAnalytics)
      expect(onLCP).toHaveBeenCalledWith(sendToAnalytics)
      expect(onTTFB).toHaveBeenCalledWith(sendToAnalytics)
    })

    it('should not run in server environment', () => {
      const originalWindow = global.window
      delete (global as any).window
      
      // Just verify no errors are thrown in server environment
      expect(() => reportWebVitals()).not.toThrow()

      global.window = originalWindow
    })
  })

  describe('measurePerformance', () => {
    beforeEach(() => {
      // Ensure performance mocks are fresh for each test
      (global.performance.mark as jest.Mock).mockClear();
      (global.performance.measure as jest.Mock).mockClear();
      (global.performance.getEntriesByName as jest.Mock).mockClear();
    })

    it('should create performance mark', () => {
      measurePerformance('test-mark')

      expect(global.performance.mark).toHaveBeenCalledWith('test-mark')
    })

    it('should measure between marks', () => {
      measurePerformance('end-mark', 'start-mark')

      expect(global.performance.measure).toHaveBeenCalledWith('end-mark', 'start-mark')
      expect(consoleLogSpy).toHaveBeenCalledWith(
        '[Performance] end-mark: 123.45ms'
      )
    })

    it('should send timing data to analytics', () => {
      measurePerformance('test-timing', 'start')

      expect(gtagSpy).toHaveBeenCalledWith(
        'event',
        'timing_complete',
        expect.objectContaining({
          event_category: 'Performance',
          name: 'test-timing',
          value: 123,
        })
      )
    })

    it('should handle performance API errors gracefully', () => {
      (global.performance.measure as jest.Mock).mockImplementation(() => {
        throw new Error('Performance API error')
      })

      expect(() => measurePerformance('test', 'start')).not.toThrow()
      expect(consoleErrorSpy).toHaveBeenCalledWith(
        'Performance measurement error:',
        expect.any(Error)
      )
    })

    it('should not log in production', () => {
      process.env.NODE_ENV = 'production'

      measurePerformance('test-mark', 'start-mark')

      expect(consoleLogSpy).not.toHaveBeenCalled()
    })

    it('should handle missing performance API', () => {
      delete (global as any).performance

      expect(() => measurePerformance('test')).not.toThrow()
      
      // Restore for other tests
      global.performance = {
        mark: jest.fn(),
        measure: jest.fn(),
        getEntriesByName: jest.fn().mockReturnValue([{ duration: 123.45 }]),
      } as any
    })
  })

  describe('reportRenderPerformance', () => {
    it.skip('should warn about slow renders in development', () => {
      reportRenderPerformance('TestComponent', 150)

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        '⚠️ Slow render detected for TestComponent: 150ms'
      )
    })

    it.skip('should not warn about fast renders', () => {
      reportRenderPerformance('TestComponent', 50)

      expect(consoleWarnSpy).not.toHaveBeenCalled()
    })

    it.skip('should send render timing to analytics', () => {
      reportRenderPerformance('TestComponent', 75)

      expect(gtagSpy).toHaveBeenCalledWith(
        'event',
        'render_performance',
        expect.objectContaining({
          component: 'TestComponent',
          duration: 75,
        })
      )
    })

    it('should not warn in production', () => {
      process.env.NODE_ENV = 'production'

      reportRenderPerformance('TestComponent', 200)

      expect(consoleWarnSpy).not.toHaveBeenCalled()
    })

    it('should handle missing gtag', () => {
      delete (window as any).gtag

      expect(() => reportRenderPerformance('TestComponent', 100)).not.toThrow()
    })

    it.skip('should handle different render times appropriately', () => {
      // Fast render - no warning
      reportRenderPerformance('FastComponent', 25)
      expect(consoleWarnSpy).not.toHaveBeenCalled()

      // Slow render - warning
      reportRenderPerformance('SlowComponent', 200)
      expect(consoleWarnSpy).toHaveBeenCalled()
    })
  })

  describe('Threshold and Recommendation Utilities', () => {
    it('should provide correct thresholds for metrics', () => {
      const clsMetric: Metric = {
        name: 'CLS',
        value: 0.15,
        rating: 'needs-improvement',
        delta: 0.1,
        entries: [],
        id: 'test',
        navigationType: 'navigate',
      }

      sendToAnalytics(clsMetric)

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          threshold: '< 0.1',
        })
      )
    })

    it('should provide helpful recommendations', () => {
      const lcpMetric: Metric = {
        name: 'LCP',
        value: 4500,
        rating: 'poor',
        delta: 500,
        entries: [],
        id: 'test',
        navigationType: 'navigate',
      }

      sendToAnalytics(lcpMetric)

      expect(consoleWarnSpy).toHaveBeenCalledWith(
        expect.any(String),
        expect.objectContaining({
          recommendation: expect.stringContaining('Optimize'),
        })
      )
    })

    it('should handle unknown metric types', () => {
      const unknownMetric: Metric = {
        name: 'UNKNOWN' as any,
        value: 100,
        rating: 'good',
        delta: 10,
        entries: [],
        id: 'test',
        navigationType: 'navigate',
      }

      expect(() => sendToAnalytics(unknownMetric)).not.toThrow()
    })
  })

  describe('Integration Tests', () => {
    it('should handle complete performance monitoring flow', () => {
      // Start performance measurement
      measurePerformance('app-init')

      // Report web vitals
      reportWebVitals()

      // Report render performance
      reportRenderPerformance('App', 45)

      // End performance measurement
      measurePerformance('app-ready', 'app-init')

      // Verify all calls were made
      expect(global.performance.mark).toHaveBeenCalled()
      expect(onCLS).toHaveBeenCalled()
      expect(gtagSpy).toHaveBeenCalled()
    })

    it('should support custom performance marks', async () => {
      // Simulate user flow
      measurePerformance('user-action-start')
      
      // Simulate async operation
      await new Promise(resolve => setTimeout(resolve, 10))
      
      measurePerformance('user-action-end', 'user-action-start')

      expect(global.performance.measure).toHaveBeenCalledWith(
        'user-action-end',
        'user-action-start'
      )
    })
  })
})