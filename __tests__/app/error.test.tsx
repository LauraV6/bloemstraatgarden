import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ErrorBoundary from '@/app/error';

describe('ErrorBoundary', () => {
  const mockReset = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders error message', () => {
    const error = new Error('Test error message');
    render(<ErrorBoundary error={error} reset={mockReset} />);

    expect(screen.getByText('Er ging iets mis!')).toBeInTheDocument();
    expect(screen.getByText(/Er is een fout opgetreden/)).toBeInTheDocument();
  });

  it('displays error message when provided', () => {
    const error = new Error('Specific error occurred');
    render(<ErrorBoundary error={error} reset={mockReset} />);

    expect(screen.getByText('Specific error occurred')).toBeInTheDocument();
  });

  it('handles error without message', () => {
    const error = new Error();
    render(<ErrorBoundary error={error} reset={mockReset} />);

    expect(screen.getByText('Er ging iets mis!')).toBeInTheDocument();
    expect(screen.queryByText('undefined')).not.toBeInTheDocument();
  });

  it('calls reset function when button is clicked', () => {
    const error = new Error('Test error');
    render(<ErrorBoundary error={error} reset={mockReset} />);

    const resetButton = screen.getByRole('button', { name: /Probeer opnieuw/i });
    fireEvent.click(resetButton);

    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it('renders with correct styling', () => {
    const error = new Error('Test error');
    const { container } = render(<ErrorBoundary error={error} reset={mockReset} />);

    const errorContainer = container.firstChild;
    expect(errorContainer).toBeInTheDocument();
  });
});