import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import HomePage from '@/app/page';

// Mock the components used in HomePage
jest.mock('@/components/features/posts', () => ({
  PostsApolloWrapper: () => <div data-testid="posts-apollo">Posts</div>
}));

jest.mock('@/components/features/available', () => ({
  AvailableWrapper: () => <div data-testid="available-wrapper">Available</div>
}));

jest.mock('@/components/features/tips', () => ({
  TipsWrapper: () => <div data-testid="tips-wrapper">Tips</div>
}));

jest.mock('@/components/features/states', () => ({
  StatesWrapper: () => <div data-testid="states-wrapper">States</div>
}));

jest.mock('@/components/ui/FadeInView', () => ({
  __esModule: true,
  default: ({ children }: { children: React.ReactNode }) => <div>{children}</div>
}));

describe('HomePage', () => {
  it('renders the home page with all sections', () => {
    render(<HomePage />);

    // Check if all main components are rendered
    expect(screen.getByTestId('posts-apollo')).toBeInTheDocument();
    expect(screen.getByTestId('available-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('tips-wrapper')).toBeInTheDocument();
    expect(screen.getByTestId('states-wrapper')).toBeInTheDocument();
  });

  it('renders page structure correctly', () => {
    const { container } = render(<HomePage />);

    // Check if main element exists
    const mainElement = container.querySelector('main');
    expect(mainElement).toBeInTheDocument();
  });
});