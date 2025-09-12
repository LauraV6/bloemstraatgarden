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
  border: 1px solid hsl(152, 100%, 21%); /* --color-green-1 */
  background: transparent;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  
  &:hover:not(:disabled) {
    border-color: hsl(130, 47%, 42%); /* --color-green-2 */
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
  color: hsl(0, 72%, 51%);
`;

export const FormInput = styled.input<{ hasError?: boolean }>`
  padding: 0.75rem;
  border: 1px solid hsl(152, 100%, 21%); /* --color-green-1 */
  border-radius: 0.375rem;
  font-size: 1rem;
  background: ${props => props.theme.colors.background || 'rgba(255, 255, 255, 0.6)'}; /* --color-transparent-1 */
  color: ${props => props.theme.colors.text};
  transition: all 0.2s ease;
  
  /* Dark theme override */
  [data-theme="dark"] & {
    background: rgba(255, 255, 255, 0.05); /* --color-transparent-1 dark */
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
    opacity: 0.6;
  }
  
  &:focus {
    outline: none;
    border-color: hsl(130, 47%, 42%); /* --color-green-2 */
  }
  
  ${props => props.hasError && `
    border-color: hsl(0, 72%, 51%);
    
    &:focus {
      box-shadow: 0 0 0 3px rgba(220, 38, 38, 0.1);
    }
  `}
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background: hsl(128, 22%, 85%, .2);
    
    [data-theme="dark"] & {
      background: hsl(132, 4%, 26%);
    }
  }
`;

export const ErrorMessage = styled.span`
  display: flex;
  align-items: center;
  gap: 0.375rem;
  font-size: 0.875rem;
  color: hsl(0, 72%, 51%);
  
  svg {
    width: 1rem;
    height: 1rem;
  }
`;

export const FormFooter = styled.div`
  /* Container for form footer elements if needed */
`;

export const SubmitButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  background-color: hsl(130, 47%, 42%); /* --color-green-2 */
  color: hsl(0, 0%, 100%);
  width: 100%;
  font-weight: 600;
  border: none;
  border-radius: 6px;
  font-size: 1rem;
  padding: 0.8rem 0;
  cursor: pointer;
  transition: all 0.2s ease;

  &:hover:not(:disabled) {
    background-color: hsl(152, 100%, 21%); /* --color-green-1 */
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    transform: none;
    box-shadow: none;
  }
`;