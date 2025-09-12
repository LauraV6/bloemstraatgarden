import styled from '@emotion/styled';

export const AnswersList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  list-style: none;
  padding: 0;
  margin: 0;
  width: 100%;
  max-width: 500px;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    gap: 0.75rem;
    max-width: 100%;
  }
`;

export const AnswerItem = styled.li``;

export const AnswerButton = styled.button`
  width: 100%;
  padding: 1rem 1.5rem;
  border-radius: 40px;
  border: 1px solid ${props => props.theme.colors.primary};
  background-color: transparent;
  color: ${props => props.theme.colors.primary};
  font-size: ${props => props.theme.typography.fontSize.base};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
  line-height: 1.4;
  word-wrap: break-word;
  
  @media (max-width: ${props => props.theme.breakpoints.sm}) {
    padding: 0.75rem 1rem;
    font-size: ${props => props.theme.typography.fontSize.sm};
    border-radius: 30px;
  }
  
  &:hover:not(:disabled) {
    background-color: ${props => props.theme.colors.primary};
    color: white !important;
  }
  
  &:active:not(:disabled) {
    transform: translateY(0);
  }
  
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
  
  &.selected {
    background-color: ${props => props.theme.colors.primary};
    border-color: ${props => props.theme.colors.primary};
    color: white !important;
  }
  
  &.correct {
    background-color: ${props => props.theme.colors.success};
    border-color: ${props => props.theme.colors.success};
    color: white !important;
  }
  
  &.wrong {
    background-color: ${props => props.theme.colors.error};
    border-color: ${props => props.theme.colors.error};
    color: white !important;
  }
`;