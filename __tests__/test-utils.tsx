/**
 * Test Utilities
 * Testing utilities for React components
 */

import React, { ReactElement } from 'react'
import { render, RenderOptions } from '@testing-library/react'
import { ShoppingCartProvider } from '@/context/ShoppingCartContext'
import { Verkrijgbaar, Tip, Article } from '@/types/contentful'

// Custom render function that includes all providers
interface AllTheProvidersProps {
  children: React.ReactNode
}

const AllTheProviders: React.FC<AllTheProvidersProps> = ({ children }) => {
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

// Simple test data factories without faker
export const createMockVerkrijgbaar = (overrides?: Partial<Verkrijgbaar>): Verkrijgbaar => ({
  sys: {
    id: 'test-id-' + Math.random().toString(36).substr(2, 9),
  },
  title: 'Test Plant',
  amount: '5',
  date: '2024-01-15',
  postImage: {
    url: 'https://example.com/image.jpg',
    title: 'Test Image',
  },
  ...overrides,
})

export const createMockCustomer = () => ({
  name: 'Test User',
  email: 'test@example.com',
  phone: '+31612345678',
  message: 'Test message',
})

export const createMockTip = (overrides?: Partial<Tip>): Tip => ({
  sys: {
    id: 'tip-' + Math.random().toString(36).substr(2, 9),
  },
  title: 'Test Tip',
  slug: 'test-tip',
  summary: 'This is a test tip summary',
  details: {
    json: {
      nodeType: 'document',
      data: {},
      content: [
        {
          nodeType: 'paragraph',
          data: {},
          content: [
            {
              nodeType: 'text',
              value: 'Test content',
              marks: [],
              data: {},
            },
          ],
        },
      ],
    },
    links: {
      assets: {
        block: [],
      },
    },
  },
  date: '2024-01-15',
  articleImage: {
    url: 'https://example.com/tip-image.jpg',
    title: 'Tip Image',
  },
  ...overrides,
})

// Mock API responses helper
export const mockFetch = (response: any) => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: true,
    json: async () => response,
    status: 200,
    statusText: 'OK',
  })
}

export const mockFetchError = (status = 500, message = 'Server Error') => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    json: async () => ({ error: message }),
    status,
    statusText: message,
  })
}