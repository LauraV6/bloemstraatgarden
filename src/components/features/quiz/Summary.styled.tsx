import styled from '@emotion/styled';

export const SummaryContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  width: 100%;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 1rem;
    gap: 1.5rem;
  }
  
  h2 {
    color: ${props => props.theme.colors.primary};
    font-size: ${props => props.theme.typography.fontSize['2xl']};
    margin-bottom: 0.5rem;
    line-height: 1.3;
    
    @media (min-width: ${props => props.theme.breakpoints.md}) {
      font-size: ${props => props.theme.typography.fontSize['3xl']};
      margin-bottom: 1rem;
    }
  }
`;

export const SummaryStates = styled.div`
  display: flex;
  gap: 2rem;
  justify-content: center;
  margin: 1rem auto;
  width: 100%;
  flex-wrap: wrap;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 0.5rem;
    margin: 0;
  }
`;

export const Score = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  border-radius: ${props => props.theme.radii.lg};
  background-color: ${props => props.theme.colors.transparent1};
  padding: 1rem;
  min-width: 100px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0.75rem;
    min-width: 80px;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 1.5rem;
    min-width: 150px;
  }
`;

export const ScoreNumber = styled.span`
  font-size: 1.2em;
  font-family: ${props => props.theme.typography.fontFamilyHeading};
  color: ${props => props.theme.colors.primary};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  
  @media (min-width: ${props => props.theme.breakpoints.sm}) {
    font-size: 2em;
  }

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: 3em;
  }
`;

export const SummaryAnswers = styled.ol`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 2rem 0;
  width: 100%;

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    gap: 2.5rem;
  }

  li {
    width: 100%;
    
    > div {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.75rem;
      width: 100%;
      text-align: center;

      span {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 35px;
        height: 35px;
        font-size: 1.1em;
        color: white;
        background-color: ${props => props.theme.colors.primary};
        border-radius: 50%;
        margin: 0 auto 0.5rem;
      }

      p {
        margin: 0;
      }
    }
  }
`;

interface UserAnswerProps {
  $status?: 'correct' | 'wrong' | 'skipped';
}

export const UserAnswer = styled.p<UserAnswerProps>`
  width: fit-content;
  max-width: 100%;
  background-color: ${props => props.theme.colors.border};
  font-family: ${props => props.theme.typography.fontFamilyHeading};
  border-radius: ${props => props.theme.radii.md};
  padding: 0.5rem 1rem;
  margin: 0 auto;
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  font-size: ${props => props.theme.typography.fontSize.sm};
  word-wrap: break-word;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 0.75rem 1.5rem;
    font-size: ${props => props.theme.typography.fontSize.base};
  }

  ${props => props.$status === 'wrong' && `
    background-color: ${props.theme.colors.error};
    color: ${props.theme.colors.errorBright};
  `}

  ${props => props.$status === 'correct' && `
    background-color: ${props.theme.colors.success};
    color: ${props.theme.colors.primaryDark};
  `}
`;

export const QuestionAnswer = styled.p`
  color: ${props => props.theme.colors.secondary};
  font-family: ${props => props.theme.typography.fontFamilyHeading};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
`;

export const QuestionTitle = styled.h4`
  margin: 0;
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.normal};
  color: ${props => props.theme.colors.text};
  line-height: 1.4;
  
  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.typography.fontSize.lg};
    line-height: 1.5;
  }
`;