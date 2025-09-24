import styled from '@emotion/styled';

export const ErrorContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: unset;
  min-height: 380px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 113px 0px 0px;
  margin: 0px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 800px;
    padding: 154px 0px 0px;
  }
  
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 1;
  }
`;

export const ErrorContent = styled.div`
  text-align: center;
  max-width: 600px;
  width: 100%;
  padding: 1rem;
  background: ${props => props.theme.colors.background};
  border-radius: 12px;
  box-shadow: ${props => props.theme.shadows.lg};
  margin: 1rem;
  z-index: 2;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 3rem;
    margin: 2rem;
  }
  
  p {
    font-size: 1.125rem;
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
    color: ${props => props.theme.colors.errorBright};
    padding: 0.5rem;
    
    &:hover {
      text-decoration: underline;
    }
  }
`;

export const StackTrace = styled.pre`
    padding: 1rem;
    background: ${props => props.theme.colors.surface};
    border-radius: 4px;
    overflow: auto;
    font-size: 0.875rem;
    font-family: monospace;
    line-height: 1.5;
    color: ${props => props.theme.colors.text};`;

export const ErrorActions = styled.div`
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;
  margin-top: 2rem;
`;