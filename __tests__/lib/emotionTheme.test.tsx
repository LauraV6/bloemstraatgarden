import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@emotion/react';
import emotionTheme from '@/lib/emotionTheme';
import styled from '@emotion/styled';

// Create a test component that uses the theme
const TestComponent = styled.div`
  color: ${({ theme }) => theme.colors.primary};
  padding: ${({ theme }) => theme.spacing.md};
  font-size: ${({ theme }) => theme.typography.fontSize.base};
`;

describe('Emotion Theme', () => {
  it('has all required color properties', () => {
    expect(emotionTheme.colors).toHaveProperty('primary');
    expect(emotionTheme.colors).toHaveProperty('secondary');
    expect(emotionTheme.colors).toHaveProperty('surface');
    expect(emotionTheme.colors).toHaveProperty('text');
    expect(emotionTheme.colors).toHaveProperty('textSecondary');
    expect(emotionTheme.colors).toHaveProperty('border');
    expect(emotionTheme.colors).toHaveProperty('background');
    expect(emotionTheme.colors).toHaveProperty('green50');
    expect(emotionTheme.colors).toHaveProperty('green100');
  });

  it('has all required breakpoint properties', () => {
    expect(emotionTheme.breakpoints).toHaveProperty('xs');
    expect(emotionTheme.breakpoints).toHaveProperty('sm');
    expect(emotionTheme.breakpoints).toHaveProperty('md');
    expect(emotionTheme.breakpoints).toHaveProperty('lg');
    expect(emotionTheme.breakpoints).toHaveProperty('xl');
    expect(emotionTheme.breakpoints).toHaveProperty('2xl');
  });

  it('has all required spacing properties', () => {
    expect(emotionTheme.spacing).toHaveProperty('xs');
    expect(emotionTheme.spacing).toHaveProperty('sm');
    expect(emotionTheme.spacing).toHaveProperty('md');
    expect(emotionTheme.spacing).toHaveProperty('lg');
    expect(emotionTheme.spacing).toHaveProperty('xl');
    expect(emotionTheme.spacing).toHaveProperty('xxl');
  });

  it('has all required typography properties', () => {
    expect(emotionTheme.typography).toHaveProperty('fontFamily');
    expect(emotionTheme.typography).toHaveProperty('fontFamilyMono');
    expect(emotionTheme.typography).toHaveProperty('fontSize');
    expect(emotionTheme.typography).toHaveProperty('fontWeight');
    expect(emotionTheme.typography).toHaveProperty('lineHeight');
    expect(emotionTheme.typography).toHaveProperty('letterSpacing');
  });

  it('has all required shadow properties', () => {
    expect(emotionTheme.shadows).toHaveProperty('sm');
    expect(emotionTheme.shadows).toHaveProperty('md');
    expect(emotionTheme.shadows).toHaveProperty('lg');
    expect(emotionTheme.shadows).toHaveProperty('xl');
  });

  it('has all required animation properties', () => {
    expect(emotionTheme.animation).toHaveProperty('duration');
    expect(emotionTheme.animation).toHaveProperty('easing');
  });

  it('provides theme to components correctly', () => {
    render(
      <ThemeProvider theme={emotionTheme}>
        <TestComponent data-testid="themed-component">
          Test Content
        </TestComponent>
      </ThemeProvider>
    );

    const component = screen.getByTestId('themed-component');
    expect(component).toBeInTheDocument();
    expect(component).toHaveTextContent('Test Content');
  });

  it('has valid breakpoint values', () => {
    const breakpoints = emotionTheme.breakpoints;

    // Check that breakpoints are strings with px units
    expect(breakpoints.xs).toMatch(/^\d+px$/);
    expect(breakpoints.sm).toMatch(/^\d+px$/);
    expect(breakpoints.md).toMatch(/^\d+px$/);
    expect(breakpoints.lg).toMatch(/^\d+px$/);
    expect(breakpoints.xl).toMatch(/^\d+px$/);
    expect(breakpoints['2xl']).toMatch(/^\d+px$/);
  });

  it('has valid spacing values', () => {
    const spacing = emotionTheme.spacing;

    // Check that spacing values are strings with rem units
    expect(spacing.xs).toMatch(/^\d+(\.\d+)?rem$/);
    expect(spacing.sm).toMatch(/^\d+(\.\d+)?rem$/);
    expect(spacing.md).toMatch(/^\d+(\.\d+)?rem$/);
    expect(spacing.lg).toMatch(/^\d+(\.\d+)?rem$/);
    expect(spacing.xl).toMatch(/^\d+(\.\d+)?rem$/);
    expect(spacing.xxl).toMatch(/^\d+(\.\d+)?rem$/);
  });

  it('has valid color values', () => {
    const colors = emotionTheme.colors;

    // Check that colors are valid hex or rgb values
    const hexOrRgbRegex = /^(#[0-9A-Fa-f]{6}|rgb\(\d+,\s*\d+,\s*\d+\)|rgba\(\d+,\s*\d+,\s*\d+,\s*[\d.]+\))$/;

    Object.values(colors).forEach(color => {
      if (typeof color === 'string') {
        expect(color).toMatch(hexOrRgbRegex);
      }
    });
  });
});