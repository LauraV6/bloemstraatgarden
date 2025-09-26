import styled from '@emotion/styled';

export const QuizContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  width: 100%;
  padding: 0;
  box-sizing: border-box;
  
  h2 {
    text-align: center;
    color: ${props => props.theme.colors.text};
    font-size: ${props => props.theme.typography.fontSize['lg']};
    margin: 0 0.5rem 1rem 0.5rem;
    font-weight: ${props => props.theme.typography.fontWeight.normal};
    line-height: 1.3;
    padding: 0 0.5rem;
    word-wrap: break-word;
    
    @media (min-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.typography.fontSize['2xl']};
      line-height: 1.4;
      margin-bottom: 1rem;
      padding: 0;
    }
    
    @media (max-width: ${props => props.theme.breakpoints.sm}) {
      font-size: ${props => props.theme.typography.fontSize.base};
      margin-bottom: 0.5rem;
    }
  }
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 1rem;
  }
`;

export const QuestionAmount = styled.div`
  position: absolute;
  top: -45px;
  right: 0;
  color: white;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 5px;
  padding: 3px 8px;
  font-size: ${props => props.theme.typography.fontSize.sm};
  font-weight: ${props => props.theme.typography.fontWeight.normal};
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    top: -27px;
    right: 10px;
    font-size: ${props => props.theme.typography.fontSize.xs};
    padding: 2px 6px;
  }
`;

interface ProgressBarProps {
  $status?: 'correct' | 'wrong' | 'answered' | '';
}

export const ProgressBar = styled.progress<ProgressBarProps>`
  width: 100%;
  height: 11px;
  border-radius: 20px;
  overflow: hidden;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    max-width: 340px;
  }

  &::-webkit-progress-bar {
    background-color: hsl(0, 0%, 97%);
    border: 1px solid hsl(0, 0%, 70%);
    border-radius: 20px;
  }

  &::-webkit-progress-value {
    background: var(--color-3);
    border-radius: 20px;
  }

  ${props => props.$status === 'answered' && `
    background: var(--color-3);
    
    &::-webkit-progress-value {
      background: var(--color-3);
    }
  `}

  ${props => props.$status === 'correct' && `
    background: var(--color-correct);
    
    &::-webkit-progress-value {
      background: var(--color-correct);
    }
  `}

  ${props => props.$status === 'wrong' && `
    background: var(--color-error);
    
    &::-webkit-progress-value {
      background: var(--color-error);
    }
  `}
`;