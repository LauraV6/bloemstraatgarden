import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { MockedProvider } from '@apollo/client/testing';
import { useAvailableItems, useTips, useArticles } from '@/hooks/useContentful';
import { GET_AVAILABLE_ITEMS, GET_TIPS, GET_ARTICLES } from '@/lib/apollo/queries';

const mockAvailableItems = [
  {
    sys: { id: '1' },
    title: 'Plant 1',
    amount: '5',
    date: '2024-01-15',
    postImage: { url: 'https://example.com/plant1.jpg' }
  },
  {
    sys: { id: '2' },
    title: 'Plant 2',
    amount: '3',
    date: '2024-01-16',
    postImage: { url: 'https://example.com/plant2.jpg' }
  }
];

const mockTips = [
  {
    sys: { id: '1' },
    title: 'Tip 1',
    content: { json: {} },
    category: 'Verzorging'
  },
  {
    sys: { id: '2' },
    title: 'Tip 2',
    content: { json: {} },
    category: 'Water geven'
  }
];

const mockArticles = [
  {
    sys: { id: '1' },
    title: 'Article 1',
    slug: 'article-1',
    date: '2024-01-15',
    postImage: { url: 'https://example.com/article1.jpg' },
    excerpt: 'This is article 1'
  },
  {
    sys: { id: '2' },
    title: 'Article 2',
    slug: 'article-2',
    date: '2024-01-16',
    postImage: { url: 'https://example.com/article2.jpg' },
    excerpt: 'This is article 2'
  }
];

describe('useContentful hooks', () => {
  describe('useAvailableItems', () => {
    it('fetches available items successfully', async () => {
      const mocks = [
        {
          request: {
            query: GET_AVAILABLE_ITEMS,
          },
          result: {
            data: {
              postsBlockCollection: {
                items: mockAvailableItems
              }
            }
          }
        }
      ];

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      );

      const { result } = renderHook(() => useAvailableItems(), { wrapper });

      // Initially loading
      expect(result.current.loading).toBe(true);
      expect(result.current.items).toEqual([]);
      expect(result.current.error).toBeUndefined();

      // Wait for data
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.items).toEqual(mockAvailableItems);
      expect(result.current.error).toBeUndefined();
    });

    it('handles error when fetching available items', async () => {
      const mocks = [
        {
          request: {
            query: GET_AVAILABLE_ITEMS,
          },
          error: new Error('Failed to fetch')
        }
      ];

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      );

      const { result } = renderHook(() => useAvailableItems(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.items).toEqual([]);
      expect(result.current.error).toBeDefined();
    });
  });

  describe('useTips', () => {
    it('fetches tips successfully', async () => {
      const mocks = [
        {
          request: {
            query: GET_TIPS,
          },
          result: {
            data: {
              tipsCollection: {
                items: mockTips
              }
            }
          }
        }
      ];

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      );

      const { result } = renderHook(() => useTips(), { wrapper });

      // Initially loading
      expect(result.current.loading).toBe(true);
      expect(result.current.tips).toEqual([]);

      // Wait for data
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.tips).toEqual(mockTips);
      expect(result.current.error).toBeUndefined();
    });
  });

  describe('useArticles', () => {
    it('fetches articles successfully', async () => {
      const mocks = [
        {
          request: {
            query: GET_ARTICLES,
          },
          result: {
            data: {
              postsCollection: {
                items: mockArticles
              }
            }
          }
        }
      ];

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      );

      const { result } = renderHook(() => useArticles(), { wrapper });

      // Initially loading
      expect(result.current.loading).toBe(true);
      expect(result.current.articles).toEqual([]);

      // Wait for data
      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.articles).toEqual(mockArticles);
      expect(result.current.error).toBeUndefined();
    });

    it('handles empty articles collection', async () => {
      const mocks = [
        {
          request: {
            query: GET_ARTICLES,
          },
          result: {
            data: {
              postsCollection: {
                items: []
              }
            }
          }
        }
      ];

      const wrapper = ({ children }: { children: React.ReactNode }) => (
        <MockedProvider mocks={mocks} addTypename={false}>
          {children}
        </MockedProvider>
      );

      const { result } = renderHook(() => useArticles(), { wrapper });

      await waitFor(() => {
        expect(result.current.loading).toBe(false);
      });

      expect(result.current.articles).toEqual([]);
      expect(result.current.error).toBeUndefined();
    });
  });
});