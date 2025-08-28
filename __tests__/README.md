# Test Suite Documentation

## Overview
This test suite provides comprehensive coverage for the Bloemstraat Garden application, ensuring reliability and maintainability of the codebase.

## Test Structure

### Unit Tests
- **Components**: Testing React components in isolation
- **Context**: Testing state management and context providers
- **Services**: Testing API and business logic services
- **Utilities**: Testing helper functions and utilities

### Test Coverage Goals
- Global: 80% statements, 70% branches, 80% lines, 70% functions
- Services: 90% for all metrics (critical business logic)

## Running Tests

```bash
# Run all tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run specific test file
npm test -- ShoppingCartContext.test.tsx

# Run tests in watch mode
npm test -- --watch
```

## Best Practices

1. **Isolation**: Each test should be independent
2. **Mocking**: Mock external dependencies appropriately
3. **Descriptive Names**: Test descriptions should clearly state what is being tested
4. **Arrange-Act-Assert**: Follow the AAA pattern
5. **Clean Up**: Always clean up after tests (localStorage, mocks, etc.)

## Test Categories

### Component Tests
- Render without errors
- User interactions work correctly
- Props are handled properly
- Accessibility features are present

### Context Tests
- State management works correctly
- Actions update state as expected
- Local storage integration works

### Service Tests
- API calls are made correctly
- Error handling works properly
- Response data is processed correctly

### Performance Tests
- Web vitals are tracked
- Performance metrics are logged
- Analytics integration works