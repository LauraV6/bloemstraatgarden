import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import GlobalError from '@/app/global-error';

describe('GlobalError', () => {
  const mockReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders global error message', () => {
    const error = new Error('Global error occurred');
    render(<GlobalError error={error} reset={mockReset} />);

    expect(screen.getByText('Er ging iets mis!')).toBeInTheDocument();
    expect(screen.getByText(/Er is een kritieke fout opgetreden/)).toBeInTheDocument();
  });

  it('displays error details when available', () => {
    const error = new Error('Critical system failure');
    render(<GlobalError error={error} reset={mockReset} />);

    expect(screen.getByText('Critical system failure')).toBeInTheDocument();
  });

  it('handles error without message gracefully', () => {
    const error = new Error();
    render(<GlobalError error={error} reset={mockReset} />);

    expect(screen.getByText('Er ging iets mis!')).toBeInTheDocument();
    expect(screen.getByText(/Er is een kritieke fout opgetreden/)).toBeInTheDocument();
  });

  it('calls reset when refresh button is clicked', () => {
    const error = new Error('Test error');
    render(<GlobalError error={error} reset={mockReset} />);

    const refreshButton = screen.getByRole('button', { name: /Ververs pagina/i });
    fireEvent.click(refreshButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('renders html and body elements', () => {
    const error = new Error('Test error');
    const { container } = render(<GlobalError error={error} reset={mockReset} />);

    // Check for html element
    const htmlElement = container.querySelector('html');
    expect(htmlElement).toBeInTheDocument();
    expect(htmlElement).toHaveAttribute('lang', 'nl');

    // Check for body element
    const bodyElement = container.querySelector('body');
    expect(bodyElement).toBeInTheDocument();
  });

  it('renders with correct document structure', () => {
    const error = new Error('Test error');
    const { container } = render(<GlobalError error={error} reset={mockReset} />);

    const mainContent = container.querySelector('body > div');
    expect(mainContent).toBeInTheDocument();
  });
});