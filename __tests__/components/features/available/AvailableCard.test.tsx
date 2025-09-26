import React from 'react';
import { render, screen, fireEvent, waitFor } from '../../../test-utils';
import '@testing-library/jest-dom';
import AvailableCard from '@/components/features/available/AvailableCard';
import { useShoppingCart } from '@/context/ShoppingCartContext';

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
  useShoppingCart: jest.fn()
}));

describe('AvailableCard', () => {
  const mockItem = {
    sys: { id: 'plant-1' },
    title: 'Monstera',
    amount: '5',
    date: '2024-01-15',
    postImage: { url: 'https://example.com/monstera.jpg' }
  };

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

  describe('Basic rendering', () => {
    it('renders item title and details', () => {
      render(<AvailableCard item={mockItem} />);

      expect(screen.getByText('Monstera')).toBeInTheDocument();
      expect(screen.getByText('Aantal beschikbaar: 5')).toBeInTheDocument();
      expect(screen.getByText('2024-01-15')).toBeInTheDocument();
    });

    it('renders image with correct attributes', () => {
      render(<AvailableCard item={mockItem} index={0} />);

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('src', 'https://example.com/monstera.jpg');
      expect(image).toHaveAttribute('alt', 'Monstera');
      expect(image).toHaveAttribute('data-priority', 'true');
    });

    it('uses lazy loading for items after index 3', () => {
      render(<AvailableCard item={mockItem} index={4} />);

      const image = screen.getByRole('img');
      expect(image).toHaveAttribute('data-priority', 'false');
    });
  });

  describe('Quantity management', () => {
    it('handles quantity increment and decrement', () => {
      render(<AvailableCard item={mockItem} />);

      const incrementButton = screen.getByLabelText('Verhoog hoeveelheid');
      const decrementButton = screen.getByLabelText('Verminder hoeveelheid');
      const quantityInput = screen.getByLabelText('Selecteer hoeveelheid') as HTMLInputElement;

      // Initial value should be 1
      expect(quantityInput.value).toBe('1');

      // Increment
      fireEvent.click(incrementButton);
      expect(quantityInput.value).toBe('2');

      // Increment again
      fireEvent.click(incrementButton);
      expect(quantityInput.value).toBe('3');

      // Decrement
      fireEvent.click(decrementButton);
      expect(quantityInput.value).toBe('2');
    });

    it('prevents decrementing below 1', () => {
      render(<AvailableCard item={mockItem} />);

      const decrementButton = screen.getByLabelText('Verminder hoeveelheid');
      const quantityInput = screen.getByLabelText('Selecteer hoeveelheid') as HTMLInputElement;

      expect(quantityInput.value).toBe('1');
      expect(decrementButton).toBeDisabled();
    });

    it('handles manual quantity input', () => {
      render(<AvailableCard item={mockItem} />);

      const quantityInput = screen.getByLabelText('Selecteer hoeveelheid') as HTMLInputElement;
      
      fireEvent.change(quantityInput, { target: { value: '3' } });
      expect(quantityInput.value).toBe('3');
    });

    it('respects maximum available quantity', () => {
      mockCanAddToCart.mockReturnValue(2);
      render(<AvailableCard item={mockItem} />);

      const incrementButton = screen.getByLabelText('Verhoog hoeveelheid');
      const quantityInput = screen.getByLabelText('Selecteer hoeveelheid') as HTMLInputElement;

      fireEvent.click(incrementButton); // 1 -> 2
      expect(quantityInput.value).toBe('2');

      expect(incrementButton).toBeDisabled(); // Should be disabled at max
    });
  });

  describe('Add to cart functionality', () => {
    it('adds items to cart when button is clicked', () => {
      render(<AvailableCard item={mockItem} />);

      const addButton = screen.getByRole('button', { name: /Voeg toe aan winkelwagen/i });
      fireEvent.click(addButton);

      expect(mockAddToCart).toHaveBeenCalledWith(mockItem, 1);
    });

    it('shows "Toegevoegd!" message after adding to cart', async () => {
      render(<AvailableCard item={mockItem} />);

      const addButton = screen.getByRole('button', { name: /Voeg toe aan winkelwagen/i });
      fireEvent.click(addButton);

      expect(screen.getByText('Toegevoegd!')).toBeInTheDocument();

      // Message should disappear after 2 seconds
      await waitFor(() => {
        expect(screen.queryByText('Toegevoegd!')).not.toBeInTheDocument();
      }, { timeout: 3000 });
    });

    it('adds multiple quantities to cart', () => {
      render(<AvailableCard item={mockItem} />);

      const quantityInput = screen.getByLabelText('Selecteer hoeveelheid') as HTMLInputElement;
      const addButton = screen.getByRole('button', { name: /Voeg toe aan winkelwagen/i });

      fireEvent.change(quantityInput, { target: { value: '3' } });
      fireEvent.click(addButton);

      expect(mockAddToCart).toHaveBeenCalledWith(mockItem, 3);
    });

    it('disables add button when max quantity reached', () => {
      mockCanAddToCart.mockReturnValue(0);
      render(<AvailableCard item={mockItem} />);

      const addButton = screen.getByRole('button', { name: /Maximum bereikt/i });
      expect(addButton).toBeDisabled();
      expect(screen.getByText('Maximum bereikt')).toBeInTheDocument();
    });
  });

  describe('Cart integration', () => {
    it('shows correct available quantity when items in cart', () => {
      mockGetItemQuantity.mockReturnValue(2);
      mockCanAddToCart.mockReturnValue(3); // 5 total - 2 in cart = 3 available

      render(<AvailableCard item={mockItem} />);

      const quantityInput = screen.getByLabelText('Selecteer hoeveelheid') as HTMLInputElement;
      
      // Should be able to add up to 3 more
      fireEvent.change(quantityInput, { target: { value: '3' } });
      expect(quantityInput.value).toBe('3');

      // Should not be able to add 4
      fireEvent.change(quantityInput, { target: { value: '4' } });
      expect(quantityInput.value).toBe('3');
    });

    it('resets quantity after order is placed', () => {
      // Initially, simulate item is in cart
      mockGetItemQuantity.mockReturnValue(2);
      const { rerender } = render(<AvailableCard item={mockItem} />);

      const incrementButton = screen.getByLabelText('Verhoog hoeveelheid');
      fireEvent.click(incrementButton);
      fireEvent.click(incrementButton);
      
      // Verify quantity was changed
      const quantityInputBefore = screen.getByLabelText('Selecteer hoeveelheid') as HTMLInputElement;
      expect(quantityInputBefore.value).toBe('3');
      
      // Simulate cart being cleared (order placed)
      mockGetItemQuantity.mockReturnValue(0);
      rerender(<AvailableCard item={mockItem} />);

      const quantityInput = screen.getByLabelText('Selecteer hoeveelheid') as HTMLInputElement;
      expect(quantityInput.value).toBe('1');
    });
  });
});