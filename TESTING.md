# Testing Guide

## Running Tests

- **Run all tests**: `npm test`
- **Run tests in watch mode**: `npm run test:watch`
- **Run tests with coverage**: `npm run test:coverage`

## Test Structure

Tests are located alongside their source files with the `.test.ts` or `.test.tsx` extension.

Example: `src/app/api/tuincoach/route.test.ts` tests `src/app/api/tuincoach/route.ts`

## Writing Tests

### API Route Tests

For Next.js API routes, use the `@edge-runtime/jest-environment`:

```typescript
/**
 * @jest-environment @edge-runtime/jest-environment
 */

import { POST } from './route';

describe('API Route', () => {
  it('should work', async () => {
    const request = { json: async () => ({ data: 'test' }) };
    const response = await POST(request);
    // assertions...
  });
});
```

### Component Tests

For React components, use React Testing Library (default jsdom environment):

```typescript
import { render, screen } from '@testing-library/react';
import MyComponent from './MyComponent';

describe('MyComponent', () => {
  it('renders correctly', () => {
    render(<MyComponent />);
    expect(screen.getByText('Hello')).toBeInTheDocument();
  });
});
```

## CI/CD Pipeline

The GitHub Actions workflow runs automatically on:
- Push to `main` or `api-tuincoach` branches
- Pull requests to `main`

### Required GitHub Secrets

Add these secrets in your GitHub repository settings (Settings → Secrets and variables → Actions):

- `CLOUDFLARE_ACCOUNT_ID`: Your Cloudflare account ID
- `CLOUDFLARE_API_TOKEN`: Your Cloudflare API token

The CI pipeline will:
1. Install dependencies
2. Run linter
3. Run tests
4. Build the project
