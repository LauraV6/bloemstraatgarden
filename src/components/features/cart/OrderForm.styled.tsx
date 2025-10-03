import styled from '@emotion/styled';

export const OrderFormContainer = styled.div`
  width: 100%;
`;

export const OrderFormHeader = styled.div`
  margin-bottom: 1rem;
  
  h3 {
    margin-top: 1.2rem;
  }
`;

export const BackButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 1rem;
  border: 1px solid ${props => props.theme.colors.primaryDark};
  background: transparent;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;

  &:hover:not(:disabled) {
    border-color: ${props => props.theme.colors.primary};
    color: ${props => props.theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const OrderFormElement = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
`;

export const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  
  label {
    font-size: 0.875rem;
    font-weight: 500;
  }
`;

export const RequiredIndicator = styled.span`
  color: ${props => props.theme.colors.errorBright};
`;

export const FormInput = styled.input<{ hasError?: boolean }>`
  padding: 0.75rem;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 0.375rem;
  font-size: 1rem;
  background: ${props => props.theme.colors.background};
  color: ${props => props.theme.colors.text};
  transition: all 0.2s ease;

  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
    opacity: 0.6;
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  ${props => props.hasError && `
    border-color: ${props.theme.colors.errorBright};

    &:focus {
      box-shadow: 0 0 0 3px ${props.theme.colors.error};
    }
  `}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: ${props => props.theme.colors.gray[200]};
  }
`;

export const ErrorMessage = styled.span`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  color: ${props => props.theme.colors.errorBright};

  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: ${props => props.theme.colors.primary};
  width: 100%;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  padding: 0.8rem 0;
  cursor: pointer;
  transition: all 0.2s ease;

  span {
    color: ${props => props.theme.colors.white};
  }

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;