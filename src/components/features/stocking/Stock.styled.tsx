import styled from '@emotion/styled';

export const Boxing = styled.div`
  background-color: ${props => props.theme.colors.green5};
  border-radius: 5px;
  padding: 1.2rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 3rem 5rem;
  }

  /* Override text colors for dark mode */
  h3 {
    color: ${props => props.theme.colors.text} !important;
  }

  p {
    color: ${props => props.theme.colors.textSecondary} !important;
  }

  /* Remove button styling from here - rely on global styles */
`;

export const Story = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const StoryContainer = styled.div`
  display: grid;
  gap: 1rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    grid-template-columns: 1fr 1fr;
    align-items: center;
    justify-content: space-between;
    width: 100%;

    img {
      max-width: 65%;
    }
  }
`;

export const StoryText = styled.div`
  display: grid;
  gap: 1rem;

  h2 {
    color: ${props => props.theme.colors.text};
  }

  p {
    margin: 0;
    color: ${props => props.theme.colors.textSecondary};
  }
`;

export const StoryAdding = styled.div`
  position: relative;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
    justify-content: flex-end;
  }

  .react-loading-skeleton, 
  img {
    width: 100%;
    height: 100%;
    max-height: 200px;
    object-fit: cover;
    border-radius: 5px;

    @media (min-width: ${props => props.theme.breakpoints.md}) {
      height: 100%;
      min-height: 265px;
      max-height: auto;
    }
  }
`;