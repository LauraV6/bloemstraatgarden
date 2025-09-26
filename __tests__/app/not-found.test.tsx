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

    expect(screen.getByText(/Pagina niet gevonden/i)).toBeInTheDocument();
    expect(screen.getByAltText('Pagina niet gevonden illustratie')).toBeInTheDocument();
  });

  it('displays helpful message', () => {
    render(<NotFoundPage />);

    expect(screen.getByText(/Er zijn genoeg andere verhalen te lezen/i)).toBeInTheDocument();
  });

  it('renders home link', () => {
    render(<NotFoundPage />);

    const homeLink = screen.getByRole('link', { name: /Terug naar startpagina/i });
    expect(homeLink).toBeInTheDocument();
    expect(homeLink).toHaveAttribute('href', '/');
  });

  it('renders with correct structure', () => {
    const { container } = render(<NotFoundPage />);

    const mainContent = container.firstChild;
    expect(mainContent).toBeInTheDocument();
  });
});