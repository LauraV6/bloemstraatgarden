import styled from '@emotion/styled';

export const StatesSection = styled.section`
  max-width: 1200px;
  padding: 0 1rem;
  margin: 2rem 0;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    width: calc(100% - 4rem);
    padding: 0 2rem;
    margin: 3rem auto;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    width: calc(100% - 10rem);
    margin: 5rem auto;
  }

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    display: none;
  }
`;

export const StatesContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin: 0 -1rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row;
    width: calc(100% + 4rem);
    margin: 4rem -2rem 0 -2rem;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    margin: 8rem -2rem 0 -2rem;
  }
`;

export const StatesItem = styled.div<{ isSecond?: boolean }>`
  display: flex;
  align-items: center;
  gap: 20px;
  padding: 1rem 2rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row;
    width: 100%;
    padding: 0 2rem;
  }

  svg {
    height: 24px;
    color: ${props => props.theme.colors.primaryDark};

    @media (min-width: ${props => props.theme.breakpoints.md}) {
      height: 28px;
    }

    path {
      fill: ${props => props.theme.colors.primaryDark};
    }
  }

  ${props => props.isSecond && `
    border-style: solid;
    border-width: 1px 0px;
    border-color: ${props.theme.colors.transparent};

    @media (min-width: ${props.theme.breakpoints.md}) {
      border-width: 0px 1px;
    }
  `}
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;

  h4 {
    color: ${props => props.theme.colors.text};
    font-size: 1em;
    margin: 0;
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    margin: 0;
  }
`;

// Grid layout for States skeleton
export const StateGrid = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    flex-direction: row;
    gap: 2rem;
  }
`;

export const State = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
`;

export const StateNumber = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;