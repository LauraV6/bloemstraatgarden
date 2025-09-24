import styled from '@emotion/styled';

export const ErrorContainer = styled.div`
  position: relative;
  width: 100%;
  max-width: unset;
  height: 380px;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 113px 0px 0px;
  margin: 0px;

  @media (min-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 600px;
    padding: 154px 0px 0px;
  }

  > * {
    text-align: center;
  }
`;

export const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;

  > * {
    color: var(--color-error-bright);
  }
`;

export const ErrorMessage = styled.p`
  margin-bottom: 1.5rem;
`;

export const RetryButton = styled.button`
  transition: background-color 0.3s ease, transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);

    .retry-icon {
      transform: rotate(180deg);
    }
  }

  &:active {
    transform: translateY(0);
  }

  .retry-icon {
    font-size: 1rem;
    transition: transform 0.3s ease;
    margin-right: 0.5rem;
  }
`;

export const FullPageWrapper = styled.div`
  min-height: 50vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;