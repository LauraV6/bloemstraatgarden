import styled from '@emotion/styled';

export const FooterContainer = styled.footer`
  position: relative;
  overflow-x: clip;
  overflow-y: visible;
`;

export const FooterContent = styled.div`
  position: relative;
  display: flex;
  gap: 25px;
  background-color: ${props => props.theme.colors.green5};
`;

export const Container = styled.div`
  display: grid;
  gap: 15px;
  max-width: 1200px;
  padding: 0 ${props => props.theme.spacing.md};
  margin: ${props => props.theme.spacing.xl} 0;
  z-index: 1;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    display: flex;
    align-items: center;
    gap: 80px;
    width: calc(100% - 4rem);
    padding: 0 ${props => props.theme.spacing.xl};
    margin: 3rem auto;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    gap: 100px;
    width: calc(100% - 10rem);
    margin: 4rem auto;
  }
`;

export const LogoLink = styled.a`
  display: contents;

  svg {
    max-height: 40px;

    @media (min-width: ${props => props.theme.breakpoints.md}) {
      max-height: 60px;
    }
  }
`;

export const IntroSection = styled.p`
  max-width: 380px;
  margin: 0;

  @media (max-width: ${props => props.theme.breakpoints.md}) {
    display: none;
  }
`;

export const FooterLeave = styled.div`
  position: absolute;
  --footer-leave-max-width: 140px;
  right: 20px;
  bottom: -20px;
  user-select: none;
  pointer-events: none;
  z-index: 1;

  img {
    display: block !important;
    opacity: 1 !important;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    --footer-leave-max-width: 180px;
    right: 40px;
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    --footer-leave-max-width: 240px;
    bottom: -30px;
    right: 60px;
  }
`;

export const Copyright = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  font-size: 0.9em;
  color: ${props => props.theme.colors.white};
  background-color: ${props => props.theme.colors.primaryDark};
  filter: brightness(0.9);
  padding: ${props => props.theme.spacing.md};
  z-index: 2;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  }
`;