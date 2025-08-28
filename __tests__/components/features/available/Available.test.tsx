import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import Available from '@/components/features/available/Available';
import { ShoppingCartProvider, useShoppingCart } from '@/context/ShoppingCartContext';

// Mock FontAwesome icons
jest.mock('@fortawesome/react-fontawesome', () => ({
  FontAwesomeIcon: ({ icon }: any) => <span data-testid={`icon-${icon}`} />
}));

// Mock Next Image
jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, priority, ...props }: any) => (
    <img src={src} alt={alt} data-priority={priority} {...props} />
  ),
}));

// Mock shopping cart context
const mockAddToCart = jest.fn();
const mockCanAddToCart = jest.fn();
const mockGetItemQuantity = jest.fn();

jest.mock('@/context/ShoppingCartContext', () => ({
  ShoppingCartProvider: ({ children }: any) => <div>{children}</div>,
  useShoppingCart: jest.fn()
}));

describe('Available', () => {
  const mockAvailablePosts = [
    {
      sys: { id: 'plant-1' },
      title: 'Monstera',
      amount: '5',
      date: '2024-01-15',
      postImage: { url: 'https://example.com/monstera.jpg', title: 'Monstera plant' }
    },
    {
      sys: { id: 'plant-2' },
      title: 'Ficus',
      amount: '3',
      date: '2024-01-16',
      postImage: { url: 'https://example.com/ficus.jpg', title: 'Ficus plant' }
    }
  ];

  beforeEach(() => {
    jest.clearAllMocks();
    mockCanAddToCart.mockReturnValue(5);
    mockGetItemQuantity.mockReturnValue(0);
    (useShoppingCart as jest.Mock).mockReturnValue({
      addToCart: mockAddToCart,
      canAddToCart: mockCanAddToCart,
      getItemQuantity: mockGetItemQuantity,
    });
  });

  describe('With available posts', () => {
    it('renders all available posts', () => {
      render(<Available availablePosts={mockAvailablePosts} />);

      expect(screen.getByText('Monstera')).toBeInTheDocument();
      expect(screen.getByText('Ficus')).toBeInTheDocument();
    });

    it('displays amount and date for each post', () => {
      render(<Available availablePosts={mockAvailablePosts} />);

      expect(screen.getByText('Aantal beschikbaar: 5')).toBeInTheDocument();
      expect(screen.getByText('Aantal beschikbaar: 3')).toBeInTheDocument();
      expect(screen.getByText('2024-01-15')).toBeInTheDocument();
      expect(screen.getByText('2024-01-16')).toBeInTheDocument();
    });

    it('renders images with correct priority', () => {
      render(<Available availablePosts={mockAvailablePosts} />);

      const images = screen.getAllByRole('img');
      expect(images[0]).toHaveAttribute('data-priority', 'true');
      expect(images[1]).toHaveAttribute('data-priority', 'true');
    });

    it('handles quantity increment and decrement', () => {
      render(<Available availablePosts={mockAvailablePosts} />);

      const incrementButtons = screen.getAllByLabelText('Verhoog hoeveelheid');
      const decrementButtons = screen.getAllByLabelText('Verminder hoeveelheid');
      const quantityInputs = screen.getAllByLabelText('Selecteer hoeveelheid') as HTMLInputElement[];

      // Initial value should be 1
      expect(quantityInputs[0].value).toBe('1');

      // Increment
      fireEvent.click(incrementButtons[0]);
      expect(quantityInputs[0].value).toBe('2');

      // Increment again
      fireEvent.click(incrementButtons[0]);
      expect(quantityInputs[0].value).toBe('3');

      // Decrement
      fireEvent.click(decrementButtons[0]);
      expect(quantityInputs[0].value).toBe('2');
    });

    it('prevents decrementing below 1', () => {
      render(<Available availablePosts={mockAvailablePosts} />);

      const decrementButton = screen.getAllByLabelText('Verminder hoeveelheid')[0];
      const quantityInput = screen.getAllByLabelText('Selecteer hoeveelheid')[0] as HTMLInputElement;

      expect(quantityInput.value).toBe('1');
      fireEvent.click(decrementButton);
      expect(quantityInput.value).toBe('1');
    });

    it('adds items to cart when button is clicked', async () => {
      render(<Available availablePosts={mockAvailablePosts} />);

      const addButtons = screen.getAllByRole('button', { name: /Voeg toe aan winkelwagen/i });
      fireEvent.click(addButtons[0]);

      expect(mockAddToCart).toHaveBeenCalledWith(mockAvailablePosts[0], 1);
    });

    it('shows "Toegevoegd!" message after adding to cart', async () => {
      render(<Available availablePosts={mockAvailablePosts} />);

      const addButtons = screen.getAllByRole('button', { name: /Voeg toe aan winkelwagen/i });
      fireEvent.click(addButtons[0]);

      expect(screen.getByText('Toegevoegd!')).toBeInTheDocument();

      // Message should disappear after 2 seconds
      await waitFor(() => {
        expect(screen.queryByText('Toegevoegd!')).not.toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('handles manual quantity input', () => {
      render(<Available availablePosts={mockAvailablePosts} />);

      const quantityInput = screen.getAllByLabelText('Selecteer hoeveelheid')[0] as HTMLInputElement;
      
      fireEvent.change(quantityInput, { target: { value: '3' } });
      expect(quantityInput.value).toBe('3');
    });

    it('disables add button when max quantity reached', () => {
      mockCanAddToCart.mockReturnValue(0);
      render(<Available availablePosts={mockAvailablePosts} />);

      const addButton = screen.getAllByRole('button', { name: /Maximum bereikt/i })[0];
      expect(addButton).toBeDisabled();
      expect(screen.getByText('Maximum bereikt')).toBeInTheDocument();
    });

    it('respects maximum available quantity', () => {
      mockCanAddToCart.mockReturnValue(2);
      render(<Available availablePosts={mockAvailablePosts} />);

      const incrementButton = screen.getAllByLabelText('Verhoog hoeveelheid')[0];
      const quantityInput = screen.getAllByLabelText('Selecteer hoeveelheid')[0] as HTMLInputElement;

      fireEvent.click(incrementButton); // 1 -> 2
      expect(quantityInput.value).toBe('2');

      fireEvent.click(incrementButton); // Should stay at 2
      expect(quantityInput.value).toBe('2');
    });

    it('resets quantity after order is placed', () => {
      const { rerender } = render(<Available availablePosts={mockAvailablePosts} />);

      const quantityInput = screen.getAllByLabelText('Selecteer hoeveelheid')[0] as HTMLInputElement;
      fireEvent.change(quantityInput, { target: { value: '3' } });
      expect(quantityInput.value).toBe('3');

      // Simulate cart being cleared (order placed)
      mockGetItemQuantity.mockReturnValue(0);
      rerender(<Available availablePosts={mockAvailablePosts} />);

      expect(quantityInput.value).toBe('1');
    });

    it('applies custom className', () => {
      const { container } = render(
        <Available availablePosts={mockAvailablePosts} className="custom-class" />
      );

      expect(container.firstChild).toHaveClass('custom-class');
    });
  });

  describe('Without available posts', () => {
    it('renders empty state with default content', () => {
      render(<Available availablePosts={[]} />);

      expect(screen.getByText('Geen planten beschikbaar')).toBeInTheDocument();
      expect(screen.getByText(/Momenteel zijn er geen planten op voorraad/)).toBeInTheDocument();
    });

    it('renders empty state with custom content', () => {
      render(
        <Available 
          availablePosts={[]} 
          title="Uitverkocht"
          description="Alles is uitverkocht!"
        />
      );

      expect(screen.getByText('Uitverkocht')).toBeInTheDocument();
      expect(screen.getByText('Alles is uitverkocht!')).toBeInTheDocument();
    });

    it('renders empty state image', () => {
      render(<Available availablePosts={[]} />);

      const image = screen.getByAltText('Geen planten beschikbaar illustratie');
      expect(image).toHaveAttribute('src', '/notAvailable.png');
    });

    it('has proper accessibility attributes for empty state', () => {
      render(<Available availablePosts={[]} />);

      expect(screen.getByRole('status')).toBeInTheDocument();
      expect(screen.getByRole('status')).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Cart integration', () => {
    it('adds multiple quantities to cart', () => {
      render(<Available availablePosts={mockAvailablePosts} />);

      const quantityInput = screen.getAllByLabelText('Selecteer hoeveelheid')[0] as HTMLInputElement;
      const addButton = screen.getAllByRole('button', { name: /Voeg toe aan winkelwagen/i })[0];

      fireEvent.change(quantityInput, { target: { value: '3' } });
      fireEvent.click(addButton);

      expect(mockAddToCart).toHaveBeenCalledWith(mockAvailablePosts[0], 3);
    });

    it('shows correct available quantity when items in cart', () => {
      mockGetItemQuantity.mockReturnValue(2);
      mockCanAddToCart.mockReturnValue(3); // 5 total - 2 in cart = 3 available

      render(<Available availablePosts={mockAvailablePosts} />);

      const quantityInput = screen.getAllByLabelText('Selecteer hoeveelheid')[0] as HTMLInputElement;
      
      // Should be able to add up to 3 more
      fireEvent.change(quantityInput, { target: { value: '3' } });
      expect(quantityInput.value).toBe('3');

      // Should not be able to add 4
      fireEvent.change(quantityInput, { target: { value: '4' } });
      expect(quantityInput.value).toBe('3');
    });
  });
});