import styled from '@emotion/styled';
import { keyframes, ThemeProvider } from '@emotion/react';

const fadeIn = keyframes`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`;

const slideUp = keyframes`
  from {
    transform: translateY(20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

const pulseOpacity = keyframes`
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.9;
    transform: scale(0.98);
  }
`;

export const CartOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.65);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 1rem;
  animation: ${fadeIn} 0.2s ease-in-out;
`;

export const CartPopupContainer = styled.div`
  background-color: ${props => props.theme.colors.surface || 'hsl(132, 16%, 94%)'}; /* --color-green-5 light */
  border-radius: 12px;
  width: 100%;
  max-width: 500px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
  animation: ${slideUp} 0.3s ease-out;

  /* Dark theme override */
  [data-theme="dark"] & {
    background-color: hsl(152, 100%, 11%); /* --color-green-5 dark */
  }
`;

export const CartHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-radius: 12px 12px 0 0;
  padding: 1.5rem 1.5rem 0;

  h2 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin: 0;
    color: hsl(130, 47%, 42%); /* --color-green-2 */
    font-size: 1.25rem;

    @media (min-width: ${props => props.theme.breakpoints.md}) {
      font-size: 1.5rem;
    }
  }
`;

export const CartBadge = styled.span`
  background-color: hsl(130, 47%, 42%);
  color: white;
  border-radius: 20px;
  padding: 0.4rem 0.6rem;
  font-size: 0.875rem;
  font-weight: 600;
  line-height: 1;
  margin-left: 0.5rem;
`;

export const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: transform 0.2s ease;
  border-radius: 20px;
  width: 35px;
  height: 35px;
  padding: 0;

  &:hover {
    transform: scale(1.1);
    background: hsl(0, 0%, 80%, 0.2);

    * {
      color: hsl(0, 76.10%, 41%);
      opacity: 1;
    }
  }
`;

export const CartContent = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 1.5rem;
`;

export const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1rem;
`;

export const CartFooter = styled.div`
  display: flex;
  gap: 1rem;

  button {
    flex: 1;
    padding: 0.75rem 1rem;
    border: none;
    border-radius: 6px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }
`;

export const ClearButton = styled.button`
  background-color: transparent !important;
  color: hsl(130, 47%, 42%) !important; /* --color-green-2 */
  border: 2px solid hsl(130, 41%, 51%) !important; /* --color-green-3 */

  &:hover {
    background-color: hsl(130, 47%, 42%) !important; /* --color-green-2 */
    color: white !important;
  }
`;

export const CheckoutButton = styled.button`
  background-color: hsl(130, 47%, 42%) !important; /* --color-green-2 */
  color: white !important;

  &:hover {
    background-color: hsl(152, 100%, 21%) !important; /* --color-green-1 */
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }
`;

export const CartItem = styled.div`
  display: flex;
  gap: 1rem;
  background-color: ${props => props.theme.colors.background || 'rgba(255, 255, 255, 0.6)'}; /* --color-transparent-1 */
  border: 1px solid ${props => props.theme.colors.border || 'rgba(255, 255, 255, 0.6)'};
  border-radius: 8px;
  transition: transform 0.2s ease;
  padding: 1rem;

  /* Dark theme override */
  [data-theme="dark"] & {
    background-color: rgba(255, 255, 255, 0.05); /* --color-transparent-1 dark */
    border-color: rgba(255, 255, 255, 0.05);
  }

  &:hover {
    transform: translateX(4px);
  }
`;

export const CartItemImage = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 6px;
  overflow: hidden;
  flex-shrink: 0;
  background-color: white;
`;

export const CartItemDetails = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  h3 {
    margin: 0;
    font-size: 1rem;
    color: hsl(130, 47%, 42%); /* --color-green-2 */

    @media (min-width: ${props => props.theme.breakpoints.md}) {
      font-size: 1.125rem;
    }
  }
`;

export const CartItemInfo = styled.p`
  font-size: 0.875rem;
  color: hsl(130, 41%, 51%); /* --color-green-3 */
  margin: 0;
`;

export const CartItemQuantity = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  margin-top: 0.5rem;
`;

export const QuantityButton = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  border: 1px solid hsl(130, 41%, 51%); /* --color-green-3 */
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  font-size: 0.75rem;
  padding: 0;

  &:hover {
    background-color: hsl(130, 47%, 42%); /* --color-green-2 */
    color: white;
    border-color: hsl(130, 47%, 42%); /* --color-green-2 */
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
    background-color: ${props => props.theme.colors.textSecondary || 'hsla(0, 0%, 80%, 0.5)'};
    border: transparent;
  }
`;

export const QuantityValue = styled.span`
  font-weight: 600;
  min-width: 30px;
  text-align: center;
  color: ${props => props.theme.colors.textSecondary};
`;

export const RemoveButton = styled.button`
  background: none;
  border: none;
  color: ${props => props.theme.colors.textSecondary} !important;
  cursor: pointer;
  width: 30px;
  height: 30px;
  font-size: 1.1rem;
  transition: all 0.2s ease;
  align-self: flex-start;
  padding: 0;

  &:hover {
    transform: scale(1.1);
    background-color: transparent;
    opacity: 1;

    * {
      color: hsl(0, 72%, 51%);
    }
  }
`;

export const SuccessMessage = styled.div`
  display: grid;
  justify-items: center;
  border: 1px solid hsl(130, 47%, 42%); /* --color-green-2 */
  background: ${props => props.theme.colors.green5};
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  animation: ${slideUp} 0.3s ease;
  max-width: 100%;
  box-sizing: border-box;

  svg * {
    color: hsl(130, 41%, 51%); /* --color-green-3 */
  }

  .successIcon {
    font-size: 2rem;
    margin-bottom: 0.5rem;
    display: block;
  }

  p {
    margin: 0.5rem 0;
    font-weight: 600;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }

  small {
    display: block;
    margin-top: 0.5rem;
    opacity: 0.9;
    font-size: 0.875rem;
    word-wrap: break-word;
    overflow-wrap: break-word;
  }
`;

export const ErrorMessage = styled.div`
  background: linear-gradient(135deg, #f87171 0%, #ef4444 100%);
  color: white;
  padding: 1rem;
  border-radius: 8px;
  text-align: center;
  animation: ${slideUp} 0.3s ease;
  max-width: 100%;
  box-sizing: border-box;

  p {
    margin: 0;
    font-weight: 600;
  }
`;

export const LoadingMessage = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${props => props.theme.colors.green5};
  border-radius: 12px;
  border: 1px solid hsl(130, 47%, 42%); /* --color-green-2 */
  margin-bottom: 1rem;
  animation: ${pulseOpacity} 2s ease-in-out infinite;

  svg {
    font-size: 2rem;
    margin-bottom: 1rem;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  }

  svg * {
    color: hsl(152, 100%, 21%); /* --color-green-1 */
  }

  p {
    margin: 0;
    font-weight: 600;
    letter-spacing: 0.5px;
  }
`;