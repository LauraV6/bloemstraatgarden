import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.lg};
`;

export const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

export const Label = styled.label`
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  color: ${props => props.theme.colors.text};
`;

export const Input = styled.input`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.typography.fontSize.base};
  font-family: ${props => props.theme.typography.fontFamily};
  line-height: ${props => props.theme.typography.lineHeight.normal};
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radii.md};
  transition: all ${props => props.theme.transitions.fast};

  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }

  &:disabled {
    background-color: ${props => props.theme.colors.green5};
    cursor: not-allowed;
    opacity: 0.6;
  }

  &[type="number"] {
    -moz-appearance: textfield;

    &::-webkit-inner-spin-button,
    &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;

export const Textarea = styled.textarea`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.typography.fontSize.base};
  font-family: ${props => props.theme.typography.fontFamily};
  line-height: ${props => props.theme.typography.lineHeight.normal};
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radii.md};
  resize: vertical;
  min-height: 100px;
  transition: all ${props => props.theme.transitions.fast};

  &::placeholder {
    color: ${props => props.theme.colors.textMuted};
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }

  &:disabled {
    background-color: ${props => props.theme.colors.green5};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const Select = styled.select`
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  font-size: ${props => props.theme.typography.fontSize.base};
  font-family: ${props => props.theme.typography.fontFamily};
  line-height: ${props => props.theme.typography.lineHeight.normal};
  color: ${props => props.theme.colors.text};
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radii.md};
  cursor: pointer;
  transition: all ${props => props.theme.transitions.fast};

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
    box-shadow: 0 0 0 3px ${props => props.theme.colors.primary}20;
  }

  &:disabled {
    background-color: ${props => props.theme.colors.green5};
    cursor: not-allowed;
    opacity: 0.6;
  }
`;

export const Checkbox = styled('input')<{ type?: string }>`
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: ${(props: any) => props.theme.colors.primary};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
Checkbox.defaultProps = { type: 'checkbox' };

export const Radio = styled('input')<{ type?: string }>`
  width: 20px;
  height: 20px;
  cursor: pointer;
  accent-color: ${(props: any) => props.theme.colors.primary};

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
Radio.defaultProps = { type: 'radio' };

export const CheckboxGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  cursor: pointer;

  label {
    cursor: pointer;
    user-select: none;
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${props => props.theme.spacing.sm};
`;

export const RadioOption = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  cursor: pointer;

  label {
    cursor: pointer;
    user-select: none;
  }
`;

export const FieldError = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.errorBright};
  margin-top: ${props => props.theme.spacing.xs};
`;

export const FieldHint = styled.span`
  font-size: ${props => props.theme.typography.fontSize.sm};
  color: ${props => props.theme.colors.textMuted};
  margin-top: ${props => props.theme.spacing.xs};
`;

export const InputGroup = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  ${Input} {
    flex: 1;
  }
`;

export const InputAddon = styled.span<{ position?: 'left' | 'right' }>`
  position: absolute;
  ${props => props.position === 'right' ? 'right: 0' : 'left: 0'};
  padding: ${props => props.theme.spacing.sm} ${props => props.theme.spacing.md};
  color: ${props => props.theme.colors.textMuted};
  pointer-events: none;
`;

export const QuantityInput = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.xs};

  input {
    width: 60px;
    text-align: center;
  }

  button {
    width: 32px;
    height: 32px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background-color: ${props => props.theme.colors.surface};
    border: 1px solid ${props => props.theme.colors.border};
    color: ${props => props.theme.colors.text};
    cursor: pointer;
    transition: all ${props => props.theme.transitions.fast};

    &:hover:not(:disabled) {
      background-color: ${props => props.theme.colors.primary};
      border-color: ${props => props.theme.colors.primary};
      color: ${props => props.theme.colors.white};
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }
`;