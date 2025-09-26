import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import NotFoundPage from '@/app/not-found';

// Mock next/link
jest.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  ),
}));

describe('NotFoundPage', () => {
  it('renders 404 message', () => {
    render(<NotFoundPage />);

    expect(screen.getByText('404')).toBeInTheDocument();
    expect(screen.getByText(/Pagina niet gevonden/i)).toBeInTheDocument();
  });

  it('displays helpful message', () => {
    render(<NotFoundPage />);

    expect(screen.getByText(/De pagina die je zoekt bestaat niet/i)).toBeInTheDocument();
  });

  it('renders home link', () => {
    render(<NotFoundPage />);

    const homeLink = screen.getByRole('link', { name: /Terug naar home/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders with correct structure', () => {
    const { container } = render(<NotFoundPage />);

    const mainContent = container.firstChild;
    expect(mainContent).toBeInTheDocument();
  });
});