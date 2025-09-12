import styled from '@emotion/styled';
import { keyframes, css } from '@emotion/react';

const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

export const AvailableCardContainer = styled.div`
  background-color: ${props => props.theme.colors.surface};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: ${props => props.theme.shadows.md};
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${props => props.theme.shadows.lg};
  }
`;

export const ImageWrapper = styled.div`
  width: 100%;
  height: 200px;
  overflow: hidden;
  background-color: ${props => props.theme.colors.green5};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

export const CardContent = styled.div`
  padding: 1.5rem;

  h3 {
    margin: 0 0 1rem 0;
    color: ${props => props.theme.colors.primary};
    font-size: 1.25rem;
    font-weight: 600;
  }
`;

export const Amount = styled.p`
  background-color: ${props => props.theme.colors.transparent};
  font-weight: 600;
  color: ${props => props.theme.colors.textSecondary};
  width: fit-content;
  border-radius: 3px;
  padding: 5px 10px;
  margin-bottom: 1rem;
`;

export const Date = styled.p`
  font-size: 0.9rem;
  color: ${props => props.theme.colors.textMuted};
  margin-bottom: 0.5rem;
`;

export const Actions = styled.div`
  display: grid;
  gap: 0.75rem;
  margin-top: 1rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
    align-items: center;
  }
`;

export const QuantityContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid ${props => props.theme.colors.primaryDark};
  background-color: transparent;
  color: ${props => props.theme.colors.primaryDark};
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 0.75rem;
  padding: 0;

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.primary};
    color: white;
    border-color: ${props => props.theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: ${props => props.theme.colors.gray?.[200] || '#e5e7eb'};
    border-color: transparent;
  }
`;

export const QuantityInput = styled.input`
  width: 50px;
  height: 32px;
  text-align: center;
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  background-color: ${props => props.theme.colors.surface};

  &::-webkit-inner-spin-button,
  &::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: ${props => props.theme.colors.green5};
  }
`;

export const AddButton = styled.button<{ $justAdded?: boolean; $disabled?: boolean }>`
  flex: 1;
  padding: 0.8rem 0;
  border: none;
  border-radius: 6px;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: all 0.3s ease;

  * {
    color: white;
  }

  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.primaryDark};
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  &:active {
    transform: translateY(0);
  }

  ${props => props.$justAdded && css`
    animation: ${pulse} 0.4s ease;
    background-color: ${props.theme.colors.success};

    &:hover {
      background-color: ${props.theme.colors.success};
      transform: none;
    }
  `}

  ${props => props.$disabled && css`
    background-color: ${props.theme.colors.gray?.[300] || '#d1d5db'};
    color: ${props.theme.colors.gray?.[600] || '#4b5563'};
    cursor: not-allowed;
    opacity: 0.7;

    > * {
      color: ${props.theme.colors.gray?.[600] || '#4b5563'};
    }

    &:hover {
      background-color: ${props.theme.colors.gray?.[300] || '#d1d5db'};
      transform: none;
      box-shadow: none;
    }
  `}

  &:disabled {
    background-color: ${props => props.theme.colors.gray?.[300] || '#d1d5db'};
    color: ${props => props.theme.colors.gray?.[600] || '#4b5563'};
    cursor: not-allowed;
    opacity: 0.7;

    > * {
      color: ${props => props.theme.colors.gray?.[600] || '#4b5563'};
    }

    &:hover {
      background-color: ${props => props.theme.colors.gray?.[300] || '#d1d5db'};
      transform: none;
      box-shadow: none;
    }
  }

  svg {
    font-size: 1.125rem;
  }
`;

// Additional styled components for the available grid (if needed separately)
export const AvailableGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;
  background-color: ${props => props.theme.colors.green5};
  border-radius: 5px;
  padding: 1.5rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    gap: 2.5rem;
    padding: 2.5rem;
  }
`;