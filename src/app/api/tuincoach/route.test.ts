/**
 * @jest-environment @edge-runtime/jest-environment
 */

import { POST } from './route';
import { NextRequest } from 'next/server';

// Helper function to create a mock NextRequest
function createMockRequest(body: any): NextRequest {
  const request = {
    json: async () => body,
  } as NextRequest;
  return request;
}

describe('/api/tuincoach', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    // Reset environment variables before each test
    process.env = {
      ...originalEnv,
      CLOUDFLARE_ACCOUNT_ID: 'test-account-id',
      CLOUDFLARE_API_TOKEN: 'test-api-token',
    };
    // Reset fetch mock
    global.fetch = jest.fn();
  });

  afterEach(() => {
    process.env = originalEnv;
    jest.resetAllMocks();
  });

  it('should return 400 when question is missing', async () => {
    const request = createMockRequest({});

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Vraag is verplicht');
  });

  it('should return 400 when question is empty', async () => {
    const request = createMockRequest({ question: '   ' });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(400);
    expect(data.error).toBe('Vraag is verplicht');
  });

  it('should return 500 when Cloudflare credentials are missing', async () => {
    delete process.env.CLOUDFLARE_ACCOUNT_ID;
    delete process.env.CLOUDFLARE_API_TOKEN;

    const request = createMockRequest({ question: 'Hoe zaai ik tomaten?' });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Server configuratie fout');
  });

  it('should return answer when request is successful', async () => {
    const mockResponse = {
      result: {
        response: 'Zaai tomaten in maart-april binnenshuis.',
      },
    };

    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    });

    const request = createMockRequest({ question: 'Hoe zaai ik tomaten?' });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.answer).toBe('Zaai tomaten in maart-april binnenshuis.');
    expect(global.fetch).toHaveBeenCalledTimes(1);
  });

  it('should return 500 when Cloudflare API fails', async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      text: async () => 'API Error',
    });

    const request = createMockRequest({ question: 'Hoe zaai ik tomaten?' });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('AI service niet beschikbaar');
  });

  it('should handle unexpected errors gracefully', async () => {
    (global.fetch as jest.Mock).mockRejectedValueOnce(new Error('Network error'));

    const request = createMockRequest({ question: 'Hoe zaai ik tomaten?' });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(500);
    expect(data.error).toBe('Er ging iets fout. Probeer het opnieuw.');
  });
});
