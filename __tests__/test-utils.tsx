/**
 * Test Utilities
 * Testing utilities for React components
 */

import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ShoppingCartProvider } from '@/context/ShoppingCartContext'
import { Verkrijgbaar, Tip, Article } from '@/types/contentful'

// Mock theme object that matches your application's theme structure
const mockTheme = {
  colors: {
    primary: '#000000',
    secondary: '#666666',
    surface: '#ffffff',
    text: '#000000',
    textSecondary: '#666666',
    border: '#e0e0e0',
    background: '#f5f5f5',
    error: '#ff0000',
    success: '#00ff00'
  },
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)'
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
    '2xl': '3rem'
  },
  fonts: {
    body: 'system-ui, sans-serif',
    heading: 'system-ui, sans-serif',
    mono: 'monospace'
  }
}

// Custom render function that includes all providers
interface AllTheProvidersProps {
  children: React.ReactNode
}

const AllTheProviders: React.FC<AllTheProvidersProps> = ({ children }) => {
  // Since styled components are reading theme from props,
  // we'll just wrap with ShoppingCartProvider
  // The theme will be provided via the styled components themselves
  return (
    <ShoppingCartProvider>
      {children}
    </ShoppingCartProvider>
  )
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => render(ui, { wrapper: AllTheProviders, ...options })

// Re-export everything
export * from '@testing-library/react'
export { customRender as render }

// Export mock theme for direct use in tests if needed
export { mockTheme }

// Mock data generators
export const mockArticle = (overrides: Partial<Article> = {}): Article => ({
  sys: {
    id: 'test-id',
    publishedAt: '2024-01-01T00:00:00Z',
    firstPublishedAt: '2024-01-01T00:00:00Z',
  },
  title: 'Test Article',
  slug: 'test-article',
  shortDescription: 'Test description',
  postImage: {
    url: 'https://example.com/image.jpg',
    description: 'Test image',
    width: 800,
    height: 600,
    title: 'Test Image',
    contentType: 'image/jpeg',
    fileName: 'test.jpg',
    size: 100000,
  },
  category: 'Test Category',
  ...overrides
})

export const mockVerkrijgbaar = (overrides: any = {}): Verkrijgbaar => ({
  sys: {
    id: 'test-id',
    publishedAt: '2024-01-01T00:00:00Z',
    firstPublishedAt: '2024-01-01T00:00:00Z',
    ...overrides.sys,
  },
  title: 'Test Product',
  amount: '10',
  date: '2024-01-01',
  postImage: {
    url: 'https://example.com/image.jpg',
    description: 'Test image',
    width: 800,
    height: 600,
    title: 'Test Image',
    contentType: 'image/jpeg',
    fileName: 'test.jpg',
    size: 100000,
  },
  ...overrides
})

export const mockTip = (overrides: Partial<Tip> = {}): Tip => ({
  sys: {
    id: 'test-id',
    publishedAt: '2024-01-01T00:00:00Z',
    firstPublishedAt: '2024-01-01T00:00:00Z',
  },
  title: 'Test Tip',
  slug: 'test-tip',
  shortDescription: 'Test description',
  postImage: {
    url: 'https://example.com/image.jpg',
    description: 'Test image',
    width: 800,
    height: 600,
    title: 'Test Image',
    contentType: 'image/jpeg',
    fileName: 'test.jpg',
    size: 100000,
  },
  category: 'Test Category',
  ...overrides
})

// Legacy aliases for backward compatibility
export const createMockVerkrijgbaar = mockVerkrijgbaar
export const createMockArticle = mockArticle
export const createMockTip = mockTip

// Mock customer helper
export const createMockCustomer = () => ({
  name: 'Test User',
  email: 'test@example.com'
})

export const mockCustomer = createMockCustomer()