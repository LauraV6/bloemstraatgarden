# Testing Documentation

## 📋 Overview

This project uses a comprehensive testing strategy with Jest and React Testing Library to ensure code quality, reliability, and performance.

## 🚀 Quick Start

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- OrderService

# Run tests matching pattern
npm test -- --testNamePattern="should add item to cart"
```

## 📊 Test Coverage

Current coverage thresholds:
- **Global**: 80% lines, 80% statements, 70% branches, 70% functions
- **Services**: 90% all metrics
- **Performance**: 85% lines, 85% statements, 80% branches, 80% functions

View coverage report:
```bash
npm run test:coverage
# Open coverage/index.html in browser
```

## 🏗️ Test Structure

```
__tests__/
├── components/         # Component tests
│   ├── Available.test.tsx
│   └── Weather.test.tsx
├── context/           # Context/Hook tests
│   └── ShoppingCartContext.test.tsx
├── lib/               # Library tests
│   ├── api.test.ts
│   └── performance/
│       └── webVitals.test.ts
├── services/          # Service tests
│   └── orderService.test.ts
├── utils/             # Utility tests
│   └── DateFormatter.test.tsx
└── test-utils.tsx     # Testing utilities
```

## 🧪 Testing Patterns

### Component Testing

```typescript
import { render, screen, fireEvent } from '../test-utils'
import userEvent from '@testing-library/user-event'

describe('Component', () => {
  it('should handle user interactions', async () => {
    const user = userEvent.setup()
    render(<Component />)
    
    await user.click(screen.getByRole('button'))
    expect(screen.getByText('Success')).toBeInTheDocument()
  })
})
```

### Hook Testing

```typescript
import { renderHook, act } from '@testing-library/react'

describe('useCustomHook', () => {
  it('should update state', () => {
    const { result } = renderHook(() => useCustomHook())
    
    act(() => {
      result.current.updateValue('new value')
    })
    
    expect(result.current.value).toBe('new value')
  })
})
```

### Service Testing

```typescript
describe('OrderService', () => {
  it('should submit order successfully', async () => {
    global.fetch = jest.fn().mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true })
    })
    
    const result = await orderService.submitOrder(items)
    expect(result.success).toBe(true)
  })
})
```

## 🔧 Test Utilities

### Custom Render
The custom render function includes all necessary providers:

```typescript
import { render } from '@/__tests__/test-utils'

// Automatically wraps with ShoppingCartProvider
render(<Component />)
```

### Test Factories
Generate test data easily:

```typescript
import { factories } from '@/__tests__/test-utils'

const mockProduct = factories.verkrijgbaar()
const mockTip = factories.tip()
const mockCustomer = factories.customer()
```

### Accessibility Testing

```typescript
import { expectToBeAccessible } from '@/__tests__/test-utils'

it('should be accessible', () => {
  const { container } = render(<Component />)
  expectToBeAccessible(container)
})
```

## 🎯 What to Test

### Priority Order
1. **Critical User Paths**: Shopping cart, order submission
2. **Business Logic**: Price calculations, inventory management
3. **Data Transformations**: API response parsing
4. **Error Handling**: Network failures, validation errors
5. **Accessibility**: ARIA labels, keyboard navigation
6. **Performance**: Render times, large data sets

### Test Types

#### Unit Tests
- Pure functions
- Individual components in isolation
- Service methods
- Custom hooks

#### Integration Tests
- Component interactions
- Context providers
- API integrations
- Form submissions

#### Performance Tests
- Component render times
- Large list rendering
- Memory leaks
- Bundle size

## 🛠️ Debugging Tests

### Debug Output
```typescript
import { screen, debug } from '@testing-library/react'

// Debug entire document
debug()

// Debug specific element
debug(screen.getByRole('button'))
```

### VS Code Debugging
1. Add breakpoint in test
2. Run "Jest Current File" debug configuration
3. Step through test execution

### Common Issues

**Issue**: `Cannot find module '@/...'`
```bash
# Clear Jest cache
npm test -- --clearCache
```

**Issue**: `Warning: ReactDOM.render is no longer supported`
```javascript
// Already suppressed in jest.setup.js
```

**Issue**: `ReferenceError: fetch is not defined`
```javascript
// Mock fetch in your test
global.fetch = jest.fn()
```

## 📈 CI/CD Pipeline

The GitHub Actions workflow runs on every push and PR:

1. **Test Job**: Runs tests on Node 18.x and 20.x
2. **Lint Job**: ESLint and TypeScript checks
3. **Build Job**: Verifies production build
4. **Security Job**: npm audit and Snyk scan
5. **Performance Job**: Lighthouse CI tests
6. **Coverage**: Uploads to Codecov

### Required Secrets
Add these to GitHub repository settings:
- `CONTENTFUL_SPACE_ID`
- `CONTENTFUL_ACCESS_TOKEN`
- `CODECOV_TOKEN` (optional)
- `SNYK_TOKEN` (optional)
- `NETLIFY_AUTH_TOKEN` (for preview deploys)
- `NETLIFY_SITE_ID` (for preview deploys)
- `SLACK_WEBHOOK` (for notifications)

## 📝 Writing New Tests

### Checklist
- [ ] Test happy path
- [ ] Test error cases
- [ ] Test edge cases
- [ ] Test accessibility
- [ ] Mock external dependencies
- [ ] Clean up after tests
- [ ] Use descriptive test names
- [ ] Group related tests with `describe`

### Naming Convention
```typescript
describe('ComponentName', () => {
  describe('Feature/Method', () => {
    it('should [expected behavior] when [condition]', () => {
      // Test implementation
    })
  })
})
```

## 🚦 Test Quality Metrics

### Good Tests Are:
- **Fast**: < 100ms per test
- **Isolated**: No dependencies between tests
- **Repeatable**: Same result every run
- **Self-Validating**: Clear pass/fail
- **Timely**: Written with the code

### Red Flags:
- Tests that sometimes fail
- Tests requiring specific order
- Tests with hardcoded delays
- Tests checking implementation details
- Tests with no assertions

## 📚 Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/)
- [Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)
- [Kent C. Dodds Testing Articles](https://kentcdodds.com/testing)

## 🤝 Contributing

When adding new features:
1. Write tests first (TDD)
2. Ensure all tests pass
3. Maintain coverage thresholds
4. Update this documentation if needed

## 📞 Support

For testing questions or issues:
- Check existing test examples
- Review this documentation
- Ask in team chat
- Create an issue with `testing` label