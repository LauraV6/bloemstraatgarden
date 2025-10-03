import styled from '@emotion/styled';

export const PostItem = styled.article`
  position: relative;
  transition: ease-in-out 0.2s;
  height: 100%;
  min-width: 80vw;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    min-width: auto;
    box-shadow: ${props => props.theme.shadows.md};
  }

  button {
    border: 1px solid ${props => props.theme.colors.white};
    
    span {
      color: ${props => props.theme.colors.white};
    }

  &:hover,
  &:active,
  &:focus {
    transform: scale(1.05);
    cursor: pointer;

    button {
      background-color: ${props => props.theme.colors.primary};
      border: 1px solid ${props => props.theme.colors.primary};
      cursor: pointer;
    }
  }

  &:active {
    button {
      background-image: linear-gradient(rgba(0, 0, 0, 0.4) 0px, rgba(0, 0, 0, 0.4) 0px);
    }
  }
`;

export const PostItemImage = styled.div`
  position: relative;
  min-height: 200px;
  height: 100%;

  img {
    display: block;
    object-fit: cover;
    height: 100%;
    width: 100%;
    text-indent: 10px;
    text-transform: capitalize;
    border-radius: 5px;
    color: ${props => props.theme.colors.white};
    filter: brightness(90%);
    margin: 0;
  }

  span {
    min-height: 100%;
  }

  &::after {
    content: "";
    position: absolute;
    background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.45) 100%);
    inset: 0px;
    pointer-events: none;
    border-radius: 5px;
    z-index: 0;
  }
`;

export const PostItemContent = styled.div`
  position: absolute;
  bottom: 1.7rem;
  left: 1.5rem;
  z-index: 1;

  h3, h4 {
    margin-bottom: 10px;
    color: ${props => props.theme.colors.white};
  }
`;