import styled from '@emotion/styled';

export const HeroWrapper = styled.div`
  /* Set primary background color for the hero section */
  section[role="banner"] {
    background-color: ${({ theme }) => theme.colors.primaryDark} !important;
  }
  
  /* Force ALL h1 elements to be white */
  h1, 
  & h1,
  * h1,
  section h1,
  header h1,
  div h1,
  #hero-title {
    color: hsl(0, 0%, 100%) !important;
    color: white !important;
  }
  
  /* Force ALL p elements to be white */
  p,
  & p,
  * p,
  section p,
  header p,
  div p {
    color: hsl(0, 0%, 100%) !important;
    color: white !important;
  }
  
  /* Override any nested styles */
  * {
    h1, p {
      color: hsl(0, 0%, 100%) !important;
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
    transition: color ${({ theme }) => theme.transitions.fast};
    
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
  
  span {
    color: ${({ theme }) => theme.colors.textSecondary};
  }
`;

export const VerkrijgbaarSection = styled.section`
  max-width: 1200px;
  padding: 0 1rem;
  margin: 2rem 0;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    width: calc(100% - 4rem);
    padding: 0 2rem;
    margin: 3rem auto;
  }

  @media (min-width: ${({ theme }) => theme.breakpoints.lg}) {
    width: calc(100% - 10rem);
    margin: 5rem auto;
  }
`;