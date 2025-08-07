import { getAllArticles, getArticle, getAllTips, getTip } from '@/lib/contentful/api';

// Mock the fetch function
global.fetch = jest.fn();

// Mock environment variables
process.env.CONTENTFUL_SPACE_ID = 'test-space-id';
process.env.CONTENTFUL_ACCESS_TOKEN = 'test-access-token';

describe('API functions', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getAllArticles', () => {
    it('should fetch all articles successfully', async () => {
      const mockResponse = {
        data: {
          knowledgeArticleCollection: {
            items: [
              {
                sys: { id: '1' },
                title: 'Test Article',
                slug: 'test-article',
                summary: 'Test summary',
                date: '2024-01-01',
                articleImage: { url: 'test.jpg' }
              }
            ]
          }
        }
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await getAllArticles();

      expect(fetch).toHaveBeenCalledWith(
        'https://graphql.contentful.com/content/v1/spaces/test-space-id',
        expect.objectContaining({
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer test-access-token',
          }
        })
      );

      expect(result).toEqual(mockResponse.data.knowledgeArticleCollection.items);
    });

    it('should throw error on HTTP failure', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      });

      await expect(getAllArticles()).rejects.toThrow('HTTP error! status: 404, statusText: Not Found');
    });

    it('should throw error on GraphQL errors', async () => {
      const mockResponse = {
        errors: [{ message: 'GraphQL error' }]
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      await expect(getAllArticles()).rejects.toThrow('GraphQL errors:');
    });
  });

  describe('getArticle', () => {
    it('should fetch a single article by slug', async () => {
      const mockArticle = {
        sys: { id: '1' },
        title: 'Test Article',
        slug: 'test-article',
        summary: 'Test summary',
        date: '2024-01-01',
        articleImage: { url: 'test.jpg' }
      };

      const mockResponse = {
        data: {
          knowledgeArticleCollection: {
            items: [mockArticle]
          }
        }
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await getArticle('test-article');

      expect(result).toEqual(mockArticle);
    });

    it('should return undefined for non-existent article', async () => {
      const mockResponse = {
        data: {
          knowledgeArticleCollection: {
            items: []
          }
        }
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await getArticle('non-existent');

      expect(result).toBeUndefined();
    });
  });

  describe('getAllTips', () => {
    it('should fetch all tips successfully', async () => {
      const mockResponse = {
        data: {
          tipsCollection: {
            items: [
              {
                sys: { id: '1' },
                title: 'Test Tip',
                slug: 'test-tip',
                summary: 'Test summary',
                date: '2024-01-01',
                articleImage: { url: 'test.jpg' }
              }
            ]
          }
        }
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await getAllTips();

      expect(result).toEqual(mockResponse.data.tipsCollection.items);
    });
  });

  describe('getTip', () => {
    it('should fetch a single tip by slug', async () => {
      const mockTip = {
        sys: { id: '1' },
        title: 'Test Tip',
        slug: 'test-tip',
        summary: 'Test summary',
        date: '2024-01-01',
        articleImage: { url: 'test.jpg' }
      };

      const mockResponse = {
        data: {
          tipsCollection: {
            items: [mockTip]
          }
        }
      };

      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => mockResponse
      });

      const result = await getTip('test-tip');

      expect(result).toEqual(mockTip);
    });
  });

  describe('error scenarios', () => {
    it('should handle network errors', async () => {
      (fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

      await expect(getAllArticles()).rejects.toThrow('Network error');
    });

    it('should handle malformed JSON response', async () => {
      (fetch as jest.Mock).mockResolvedValueOnce({
        ok: true,
        json: async () => { throw new Error('Invalid JSON'); }
      });

      await expect(getAllArticles()).rejects.toThrow('Invalid JSON');
    });
  });
});