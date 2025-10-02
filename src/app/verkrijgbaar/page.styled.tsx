import styled from '@emotion/styled';

export const HeroWrapper = styled.div`
  section[role="banner"] {
    background-color: ${({ theme }) => theme.colors.primaryDark};
  }
  
  #hero-title {
    color: hsl(0, 0%, 100%) !important;
    font-size: 1.5rem;

    + p {
      color: hsl(0, 0%, 100%) !important;
    }
  
    @media (min-width: ${props => props.theme?.breakpoints?.md || '768px'}) {
      font-size: 3rem;
      margin-bottom: 2rem;
    }
    
    @media (min-width: ${props => props.theme?.breakpoints?.lg || '1024px'}) {
      font-size: 4rem;
    }
  }
`;

export const Breadcrumbs = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  font-size: 0.9rem;
  
  a {
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    
    &:hover {
      color: ${({ theme }) => theme.colors.primaryDark};
      text-decoration: underline;
    }
  }
  
  svg {
    width: 12px;
    height: 12px;
    color: ${({ theme }) => theme.colors.textMuted};
  }
`;