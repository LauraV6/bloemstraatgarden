import styled from '@emotion/styled';

export const TimerContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.7rem;
  width: 100%;
`;

interface TimerHeadingProps {
  $status?: 'correct' | 'wrong';
}

export const TimerHeading = styled.h3<TimerHeadingProps>`
  margin: 0;
  font-size: ${props => props.theme.typography.fontSize.base};
  color: ${props => props.theme.colors.text};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.typography.fontSize.lg};
  }

  ${props => props.$status === 'wrong' && `
    color: ${props.theme.colors.errorBright};
  `}

  ${props => props.$status === 'correct' && `
    color: ${props.theme.colors.primary};
  `}
`;

interface TimerProgressProps {
  $status?: 'correct' | 'wrong' | 'answered' | '';
}

export const TimerProgress = styled.progress<TimerProgressProps>`
  width: 100%;
  height: 8px;
  border-radius: 20px;
  overflow: hidden;
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    height: 11px;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    max-width: 340px;
  }

  &::-webkit-progress-bar {
    background-color: rgba(255, 255, 255, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.3);
    border-radius: 20px;
  }

  &::-webkit-progress-value {
    background: ${props => props.theme.colors.primary};
    border-radius: 20px;
    transition: all ${props => props.theme.transitions.fast};
  }

  ${props => props.$status === 'answered' && `
    &::-webkit-progress-value {
      background: ${props.theme.colors.primary};
    }
  `}

  ${props => props.$status === 'correct' && `
    &::-webkit-progress-value {
      background: ${props.theme.colors.success};
    }
  `}

  ${props => props.$status === 'wrong' && `
    &::-webkit-progress-value {
      background: ${props.theme.colors.errorBright};
    }
  `}
`;