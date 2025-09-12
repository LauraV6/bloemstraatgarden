import styled from '@emotion/styled';

export const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 3rem 1rem;
`;

export const ErrorIcon = styled.div`
  font-size: 3rem;
  margin-bottom: 1rem;

  > * {
    color: var(--color-error-bright);
  }
`;

export const ErrorMessage = styled.p`
  color: var(--color-font-light);
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