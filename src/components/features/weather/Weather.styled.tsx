import styled from '@emotion/styled';

export const WeatherContainer = styled.div`
  flex-shrink: 0;
  bottom: 1rem;
  right: 1rem;
  color: #ffffff;
  background-color: hsla(106, 78%, 21%, 80%);
  border-radius: 10px;
  font-size: 0.9em;
  padding: 10px;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    bottom: 0;
    right: 2rem;
    font-size: 1em;
    padding: 1rem;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    position: relative;
    right: 0;
    background-color: rgb(255 255 255 / 20%);
    padding: 1.5rem 2rem;
  }
`;

export const WeatherContent = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  svg {
    width: 20px;
  }

  span {
    flex-shrink: 0;

    &::first-letter {
      text-transform: capitalize;
    }
  }
`;