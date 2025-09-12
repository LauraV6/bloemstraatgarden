import styled from '@emotion/styled';

export const CookieConsentContainer = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(45, 128, 24, 0.95);
  backdrop-filter: blur(10px);
  color: white;
  padding: 1.5rem;
  z-index: 1000;
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.1);
  border-top: 2px solid rgba(255, 255, 255, 0.1);

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    padding: 1rem;
  }
`;

export const Content = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: column;
    text-align: center;
    gap: 1rem;
  }
`;

export const Text = styled.div`
  flex: 1;

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.2rem;
    font-weight: 600;
  }

  p {
    margin: 0;
    font-size: 0.9rem;
    line-height: 1.4;
    opacity: 0.9;
  }
`;

export const Buttons = styled.div`
  display: flex;
  gap: 1rem;
  flex-shrink: 0;

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    flex-direction: column;
    width: 100%;
  }
`;

export const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  min-width: 120px;

  @media (max-width: ${props => props.theme.breakpoints.xs}) {
    min-width: auto;
    width: 100%;
  }

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  }

  &:active {
    transform: translateY(0);
  }
`;

export const AcceptButton = styled(Button)`
  background: white;
  color: #2d8018;

  &:hover {
    background: #f8f9fa;
  }
`;

export const DeclineButton = styled(Button)`
  background: transparent;
  color: white;
  border: 2px solid rgba(255, 255, 255, 0.3);

  &:hover {
    background: rgba(255, 255, 255, 0.1);
    border-color: rgba(255, 255, 255, 0.5);
  }
`;