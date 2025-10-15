import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@emotion/react';
import OrderForm from './OrderForm';
import { lightTheme } from '@/styles/theme';

describe('OrderForm', () => {
  const mockOnSubmit = jest.fn();
  const mockOnBack = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderOrderForm = (isSubmitting = false) => {
    return render(
      <ThemeProvider theme={lightTheme}>
        <OrderForm
          onSubmit={mockOnSubmit}
          onBack={mockOnBack}
          isSubmitting={isSubmitting}
        />
      </ThemeProvider>
    );
  };

  describe('rendering', () => {
    it('should render form elements', () => {
      renderOrderForm();

      expect(screen.getByText('Contactgegevens')).toBeInTheDocument();
      expect(screen.getByLabelText(/Naam/)).toBeInTheDocument();
      expect(screen.getByLabelText(/E-mailadres/)).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /Bestelling verzenden/ })).toBeInTheDocument();
    });

    it('should show back button', () => {
      renderOrderForm();

      expect(screen.getByText('Terug naar winkelwagen')).toBeInTheDocument();
    });

    it('should mark required fields', () => {
      renderOrderForm();

      const requiredMarkers = screen.getAllByText('*');
      expect(requiredMarkers).toHaveLength(2);
    });
  });

  describe('name validation', () => {
    it('should show error when name is empty on blur', async () => {
      const user = userEvent.setup();
      renderOrderForm();

      const nameInput = screen.getByLabelText(/Naam/);

      await user.click(nameInput);
      await user.tab(); // Blur

      await waitFor(() => {
        expect(screen.getByText('Naam is verplicht')).toBeInTheDocument();
      });
    });

    it('should show error when name is less than 2 characters', async () => {
      const user = userEvent.setup();
      renderOrderForm();

      const nameInput = screen.getByLabelText(/Naam/);

      await user.type(nameInput, 'A');
      await user.tab(); // Blur

      await waitFor(() => {
        expect(screen.getByText('Naam moet minimaal 2 karakters bevatten')).toBeInTheDocument();
      });
    });

    it('should clear error when valid name is entered', async () => {
      const user = userEvent.setup();
      renderOrderForm();

      const nameInput = screen.getByLabelText(/Naam/);

      // First trigger error
      await user.click(nameInput);
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText('Naam is verplicht')).toBeInTheDocument();
      });

      // Then fix it
      await user.click(nameInput);
      await user.type(nameInput, 'John Doe');

      await waitFor(() => {
        expect(screen.queryByText('Naam is verplicht')).not.toBeInTheDocument();
      });
    });

    it('should accept name with minimum 2 characters', async () => {
      const user = userEvent.setup();
      renderOrderForm();

      const nameInput = screen.getByLabelText(/Naam/);
      await user.type(nameInput, 'Jo');
      await user.tab();

      await waitFor(() => {
        expect(screen.queryByText('Naam moet minimaal 2 karakters bevatten')).not.toBeInTheDocument();
      });
    });
  });

  describe('email validation', () => {
    it('should show error when email is empty on blur', async () => {
      const user = userEvent.setup();
      renderOrderForm();

      const emailInput = screen.getByLabelText(/E-mailadres/);

      await user.click(emailInput);
      await user.tab(); // Blur

      await waitFor(() => {
        expect(screen.getByText('E-mailadres is verplicht')).toBeInTheDocument();
      });
    });

    it('should show error for invalid email format', async () => {
      const user = userEvent.setup();
      renderOrderForm();

      const emailInput = screen.getByLabelText(/E-mailadres/);

      await user.type(emailInput, 'invalid-email');
      await user.tab(); // Blur

      await waitFor(() => {
        expect(screen.getByText('Voer een geldig e-mailadres in')).toBeInTheDocument();
      });
    });

    it('should accept valid email', async () => {
      const user = userEvent.setup();
      renderOrderForm();

      const emailInput = screen.getByLabelText(/E-mailadres/);

      await user.type(emailInput, 'test@example.com');
      await user.tab();

      await waitFor(() => {
        expect(screen.queryByText('Voer een geldig e-mailadres in')).not.toBeInTheDocument();
      });
    });

    it('should reject email without @', async () => {
      const user = userEvent.setup();
      renderOrderForm();

      const emailInput = screen.getByLabelText(/E-mailadres/);

      await user.type(emailInput, 'testexample.com');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText('Voer een geldig e-mailadres in')).toBeInTheDocument();
      });
    });

    it('should reject email without domain', async () => {
      const user = userEvent.setup();
      renderOrderForm();

      const emailInput = screen.getByLabelText(/E-mailadres/);

      await user.type(emailInput, 'test@');
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText('Voer een geldig e-mailadres in')).toBeInTheDocument();
      });
    });

    it('should accept email with subdomain', async () => {
      const user = userEvent.setup();
      renderOrderForm();

      const emailInput = screen.getByLabelText(/E-mailadres/);

      await user.type(emailInput, 'test@mail.example.com');
      await user.tab();

      await waitFor(() => {
        expect(screen.queryByText('Voer een geldig e-mailadres in')).not.toBeInTheDocument();
      });
    });
  });

  describe('form submission', () => {
    it('should submit valid form', async () => {
      const user = userEvent.setup();
      renderOrderForm();

      const nameInput = screen.getByLabelText(/Naam/);
      const emailInput = screen.getByLabelText(/E-mailadres/);
      const submitButton = screen.getByRole('button', { name: /Bestelling verzenden/ });

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          name: 'John Doe',
          email: 'john@example.com',
        });
      });
    });

    it('should trim whitespace from inputs', async () => {
      const user = userEvent.setup();
      renderOrderForm();

      const nameInput = screen.getByLabelText(/Naam/);
      const emailInput = screen.getByLabelText(/E-mailadres/);
      const submitButton = screen.getByRole('button', { name: /Bestelling verzenden/ });

      await user.type(nameInput, '  John Doe  ');
      await user.type(emailInput, '  john@example.com  ');
      await user.click(submitButton);

      await waitFor(() => {
        expect(mockOnSubmit).toHaveBeenCalledWith({
          name: 'John Doe',
          email: 'john@example.com',
        });
      });
    });

    it('should not submit with empty name', async () => {
      const user = userEvent.setup();
      renderOrderForm();

      const emailInput = screen.getByLabelText(/E-mailadres/);
      const submitButton = screen.getByRole('button', { name: /Bestelling verzenden/ });

      await user.type(emailInput, 'john@example.com');
      await user.click(submitButton);

      expect(mockOnSubmit).not.toHaveBeenCalled();
      await waitFor(() => {
        expect(screen.getByText('Naam is verplicht')).toBeInTheDocument();
      });
    });

    it('should not submit with empty email', async () => {
      const user = userEvent.setup();
      renderOrderForm();

      const nameInput = screen.getByLabelText(/Naam/);
      const submitButton = screen.getByRole('button', { name: /Bestelling verzenden/ });

      await user.type(nameInput, 'John Doe');
      await user.click(submitButton);

      expect(mockOnSubmit).not.toHaveBeenCalled();
      await waitFor(() => {
        expect(screen.getByText('E-mailadres is verplicht')).toBeInTheDocument();
      });
    });

    it('should not submit with invalid email', async () => {
      const user = userEvent.setup();
      renderOrderForm();

      const nameInput = screen.getByLabelText(/Naam/);
      const emailInput = screen.getByLabelText(/E-mailadres/);
      const submitButton = screen.getByRole('button', { name: /Bestelling verzenden/ });

      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'invalid-email');
      await user.click(submitButton);

      expect(mockOnSubmit).not.toHaveBeenCalled();
      await waitFor(() => {
        expect(screen.getByText('Voer een geldig e-mailadres in')).toBeInTheDocument();
      });
    });

    it('should show all errors on submit attempt', async () => {
      const user = userEvent.setup();
      renderOrderForm();

      const submitButton = screen.getByRole('button', { name: /Bestelling verzenden/ });

      await user.click(submitButton);

      await waitFor(() => {
        expect(screen.getByText('Naam is verplicht')).toBeInTheDocument();
        expect(screen.getByText('E-mailadres is verplicht')).toBeInTheDocument();
      });
    });
  });

  describe('back button', () => {
    it('should call onBack when clicked', async () => {
      const user = userEvent.setup();
      renderOrderForm();

      const backButton = screen.getByRole('button', { name: /Terug naar winkelwagen/ });
      await user.click(backButton);

      expect(mockOnBack).toHaveBeenCalledTimes(1);
    });

    it('should disable back button when submitting', () => {
      renderOrderForm(true);

      const backButton = screen.getByRole('button', { name: /Terug naar winkelwagen/ });
      expect(backButton).toBeDisabled();
    });
  });

  describe('submitting state', () => {
    it('should disable inputs when submitting', () => {
      renderOrderForm(true);

      const nameInput = screen.getByLabelText(/Naam/);
      const emailInput = screen.getByLabelText(/E-mailadres/);

      expect(nameInput).toBeDisabled();
      expect(emailInput).toBeDisabled();
    });

    it('should disable submit button when submitting', () => {
      renderOrderForm(true);

      const submitButton = screen.getByRole('button', { name: /Bestelling verzenden\.\.\./ });
      expect(submitButton).toBeDisabled();
    });

    it('should show loading text when submitting', () => {
      renderOrderForm(true);

      expect(screen.getByText('Bestelling verzenden...')).toBeInTheDocument();
    });

    it('should show normal text when not submitting', () => {
      renderOrderForm(false);

      expect(screen.getByRole('button', { name: /^Bestelling verzenden$/ })).toBeInTheDocument();
    });
  });

  describe('accessibility', () => {
    it('should have proper aria attributes', () => {
      renderOrderForm();

      const nameInput = screen.getByLabelText(/Naam/);
      const emailInput = screen.getByLabelText(/E-mailadres/);

      expect(nameInput).toHaveAttribute('aria-required', 'true');
      expect(emailInput).toHaveAttribute('aria-required', 'true');
    });

    it('should link errors to inputs', async () => {
      const user = userEvent.setup();
      renderOrderForm();

      const nameInput = screen.getByLabelText(/Naam/);

      await user.click(nameInput);
      await user.tab();

      await waitFor(() => {
        expect(nameInput).toHaveAttribute('aria-invalid', 'true');
        expect(nameInput).toHaveAttribute('aria-describedby', 'name-error');
      });
    });

    it('should have role alert on error messages', async () => {
      const user = userEvent.setup();
      renderOrderForm();

      const nameInput = screen.getByLabelText(/Naam/);

      await user.click(nameInput);
      await user.tab();

      await waitFor(() => {
        const errorMessage = screen.getByRole('alert');
        expect(errorMessage).toHaveTextContent('Naam is verplicht');
      });
    });

    it('should have autocomplete attributes', () => {
      renderOrderForm();

      const nameInput = screen.getByLabelText(/Naam/);
      const emailInput = screen.getByLabelText(/E-mailadres/);

      expect(nameInput).toHaveAttribute('autocomplete', 'name');
      expect(emailInput).toHaveAttribute('autocomplete', 'email');
    });
  });

  describe('real-time validation', () => {
    it('should validate on blur, not on change initially', async () => {
      const user = userEvent.setup();
      renderOrderForm();

      const nameInput = screen.getByLabelText(/Naam/);

      await user.type(nameInput, 'A');

      // Error should not show while typing
      expect(screen.queryByText('Naam moet minimaal 2 karakters bevatten')).not.toBeInTheDocument();

      await user.tab(); // Blur

      // Error should show after blur
      await waitFor(() => {
        expect(screen.getByText('Naam moet minimaal 2 karakters bevatten')).toBeInTheDocument();
      });
    });

    it('should validate on change after field is touched', async () => {
      const user = userEvent.setup();
      renderOrderForm();

      const nameInput = screen.getByLabelText(/Naam/);

      // First blur to mark as touched
      await user.click(nameInput);
      await user.tab();

      await waitFor(() => {
        expect(screen.getByText('Naam is verplicht')).toBeInTheDocument();
      });

      // Now typing should update validation
      await user.click(nameInput);
      await user.clear(nameInput);
      await user.type(nameInput, 'John Doe');

      await waitFor(() => {
        expect(screen.queryByText('Naam is verplicht')).not.toBeInTheDocument();
      });
    });
  });

  describe('form placeholders', () => {
    it('should have helpful placeholders', () => {
      renderOrderForm();

      const nameInput = screen.getByPlaceholderText('Voer uw naam in');
      const emailInput = screen.getByPlaceholderText('uw.email@voorbeeld.nl');

      expect(nameInput).toBeInTheDocument();
      expect(emailInput).toBeInTheDocument();
    });
  });
});
