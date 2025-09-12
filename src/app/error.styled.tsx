import styled from '@emotion/styled';

export const ErrorContainer = styled.div`
  display: flex;
  min-height: calc(100vh - 200px);
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background: ${props => props.theme.colors.surface};
`;

export const ErrorContent = styled.div`
  text-align: center;
  max-width: 600px;
  width: 100%;
  padding: 3rem;
  background: ${props => props.theme.colors.background};
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.lg};
  
  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: ${props => props.theme.colors.error};
  }
  
  p {
    font-size: 1.125rem;
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: 2rem;
    line-height: 1.6;
  }
`;

export const ErrorDetails = styled.details`
  margin: 2rem 0;
  padding: 1rem;
  background: rgba(239, 68, 68, 0.1);
  border: 1px solid ${props => props.theme.colors.error};
  border-radius: 8px;
  text-align: left;
  
  summary {
    cursor: pointer;
    font-weight: 500;
    color: ${props => props.theme.colors.error};
    padding: 0.5rem;
    
    &:hover {
      text-decoration: underline;
    }
  }
  
  pre {
    margin-top: 1rem;
    padding: 1rem;
    background: ${props => props.theme.colors.surface};
    border-radius: 4px;
    overflow: auto;
    font-size: 0.875rem;
    font-family: monospace;
    line-height: 1.5;
    color: ${props => props.theme.colors.text};
  }
`;

export const StackTrace = styled.pre`
  margin-top: 1rem;
  max-height: 300px;
  overflow-y: auto;
`;

export const ErrorActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
`;

export const RetryButton = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  background-color: ${props => props.theme.colors.primary};
  color: white;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    filter: brightness(0.9);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const HomeLink = styled.a`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 500;
  background-color: transparent;
  color: ${props => props.theme.colors.primary};
  border: 2px solid ${props => props.theme.colors.primary};
  text-decoration: none;
  cursor: pointer;
  transition: all 0.2s ease;
  display: inline-block;
  
  &:hover {
    background-color: ${props => props.theme.colors.primary};
    color: white;
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;