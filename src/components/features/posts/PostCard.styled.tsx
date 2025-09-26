import styled from '@emotion/styled';

export const PostCardContainer = styled.article`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 100%;
  gap: 0;
  transition: ease-in-out 0.2s;
  color: ${props => props.theme.colors.text};
  text-decoration: none;
  background-color: ${props => props.theme.colors.surface};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: 6px;
  overflow: hidden;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    box-shadow: ${props => props.theme.shadows.md};
  }

  a {
    text-decoration: none;
  }

  &:hover, &:active {
    @media (min-width: ${props => props.theme.breakpoints.md}) {
      transform: scale(1.05);
    }

    h2 {
      color: ${props => props.theme.colors.secondary};
    }
  }
`;

export const PostLink = styled.a`
  text-decoration: none;
`;

export const PostImageContainer = styled.div`
  position: relative;
  flex-shrink: 0;
  height: 200px;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    height: 250px;
  }

  img {
    display: block;
    object-fit: cover;
    height: auto;
    width: 100%;
    text-indent: 10px;
    text-transform: capitalize;
    color: ${props => props.theme.colors.white};
    border-radius: 5px 5px 0 0;
    filter: brightness(90%);
    margin: 0;
  }

  span {
    display: block;
    height: 100%;
  }
`;

export const PostContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  height: 100%;
  padding: 1.2rem;

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    padding: 1.7rem 1.5rem;
  }

  > * {
    margin: 0;
  }

  h2 {
    color: ${props => props.theme.colors.primary};
    line-height: 1.5;

    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: 1.2em;
    }
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    line-height: 1.6;
    margin: 0;
  }
`;

export const DateBadge = styled.time`
  position: absolute;
  top: ${props => props.theme.spacing.md};
  right: ${props => props.theme.spacing.md};
  font-size: 0.7em;
  color: ${props => props.theme.colors.black};
  background-color: hsl(0, 0%, 100%, .5);
  backdrop-filter: blur(5px);
  border-radius: 6px;
  padding: 0.3rem 0.6rem;
  z-index: 5;
`;

export const PostButton = styled.div`
  width: auto;
  margin-top: auto;
`;