import {
  isProduction,
  isDevelopment,
  getEnvironment,
  checkRequiredEnvVars,
  getApiUrl,
  getContentfulConfig
} from '@/lib/utils/envCheck';

describe('Environment Check Utilities', () => {
  const originalEnv = process.env;

  beforeEach(() => {
    jest.resetModules();
    process.env = { ...originalEnv };
  });

  afterAll(() => {
    process.env = originalEnv;
  });

  describe('isProduction', () => {
    it('returns true when NODE_ENV is production', () => {
      process.env.NODE_ENV = 'production';
      expect(isProduction()).toBe(true);
    });

    it('returns false when NODE_ENV is not production', () => {
      process.env.NODE_ENV = 'development';
      expect(isProduction()).toBe(false);
    });
  });

  describe('isDevelopment', () => {
    it('returns true when NODE_ENV is development', () => {
      process.env.NODE_ENV = 'development';
      expect(isDevelopment()).toBe(true);
    });

    it('returns false when NODE_ENV is not development', () => {
      process.env.NODE_ENV = 'production';
      expect(isDevelopment()).toBe(false);
    });
  });

  describe('getEnvironment', () => {
    it('returns current NODE_ENV value', () => {
      process.env.NODE_ENV = 'test';
      expect(getEnvironment()).toBe('test');
    });

    it('returns development as default', () => {
      delete process.env.NODE_ENV;
      expect(getEnvironment()).toBe('development');
    });
  });

  describe('checkRequiredEnvVars', () => {
    it('returns true when all required vars are present', () => {
      process.env.CONTENTFUL_SPACE_ID = 'test-space';
      process.env.CONTENTFUL_ACCESS_TOKEN = 'test-token';

      const result = checkRequiredEnvVars(['CONTENTFUL_SPACE_ID', 'CONTENTFUL_ACCESS_TOKEN']);
      expect(result).toBe(true);
    });

    it('returns false when required vars are missing', () => {
      delete process.env.CONTENTFUL_SPACE_ID;

      const result = checkRequiredEnvVars(['CONTENTFUL_SPACE_ID']);
      expect(result).toBe(false);
    });

    it('returns true for empty array', () => {
      const result = checkRequiredEnvVars([]);
      expect(result).toBe(true);
    });
  });

  describe('getApiUrl', () => {
    it('returns API URL from environment', () => {
      process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com';
      expect(getApiUrl()).toBe('https://api.example.com');
    });

    it('returns default API URL when not set', () => {
      delete process.env.NEXT_PUBLIC_API_URL;
      expect(getApiUrl()).toBe('http://localhost:3000/api');
    });

    it('handles trailing slashes', () => {
      process.env.NEXT_PUBLIC_API_URL = 'https://api.example.com/';
      expect(getApiUrl()).toBe('https://api.example.com');
    });
  });

  describe('getContentfulConfig', () => {
    it('returns contentful configuration', () => {
      process.env.CONTENTFUL_SPACE_ID = 'test-space';
      process.env.CONTENTFUL_ACCESS_TOKEN = 'test-token';
      process.env.CONTENTFUL_PREVIEW_TOKEN = 'preview-token';

      const config = getContentfulConfig();

      expect(config).toEqual({
        spaceId: 'test-space',
        accessToken: 'test-token',
        previewToken: 'preview-token',
        environment: 'master'
      });
    });

    it('uses custom environment when provided', () => {
      process.env.CONTENTFUL_SPACE_ID = 'test-space';
      process.env.CONTENTFUL_ACCESS_TOKEN = 'test-token';
      process.env.CONTENTFUL_ENVIRONMENT = 'staging';

      const config = getContentfulConfig();

      expect(config.environment).toBe('staging');
    });

    it('returns partial config when some values are missing', () => {
      process.env.CONTENTFUL_SPACE_ID = 'test-space';
      delete process.env.CONTENTFUL_ACCESS_TOKEN;

      const config = getContentfulConfig();

      expect(config.spaceId).toBe('test-space');
      expect(config.accessToken).toBeUndefined();
    });
  });
});

// Mock the functions if they don't exist yet
export function isProduction(): boolean {
  return process.env.NODE_ENV === 'production';
}

export function isDevelopment(): boolean {
  return process.env.NODE_ENV === 'development';
}

export function getEnvironment(): string {
  return process.env.NODE_ENV || 'development';
}

export function checkRequiredEnvVars(vars: string[]): boolean {
  return vars.every(varName => process.env[varName] !== undefined);
}

export function getApiUrl(): string {
  const url = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api';
  return url.endsWith('/') ? url.slice(0, -1) : url;
}

export function getContentfulConfig() {
  return {
    spaceId: process.env.CONTENTFUL_SPACE_ID,
    accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
    previewToken: process.env.CONTENTFUL_PREVIEW_TOKEN,
    environment: process.env.CONTENTFUL_ENVIRONMENT || 'master'
  };
}