import styled from '@emotion/styled';

export const TipsGridContainer = styled.div`
  display: flex;
  gap: 1.3rem;

  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    overflow: auto hidden;

    > div {
      flex: 0 0 65vw;
    }
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 2rem;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr;
    gap: 2.5rem;
  }

  > article {
    &:first-of-type {
      @media (min-width: ${props => props.theme.breakpoints.md}) {
        grid-row-start: 1;
        grid-row-end: 3;

        .tip-item__img {
          height: 100%;
        }
      }
    }
  }
`;