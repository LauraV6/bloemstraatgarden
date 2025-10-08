import styled from '@emotion/styled';

export const QuestionSection = styled.div`
  display: grid;
  gap: 20px;
  padding: ${props => props.theme.spacing.lg};
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.menu};
  border-radius: ${props => props.theme.radii.md};
  margin-top: ${props => props.theme.spacing.lg};

  h4 {
    color: ${props => props.theme.colors.text};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: 0;
  }
`;

export const TextArea = styled.textarea`
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radii.md};
  padding: ${props => props.theme.spacing.sm};
  background-color: ${props => props.theme.colors.background};
  font-family: inherit;
  font-size: 1rem;
  width: 100%;
  resize: vertical;
`;

export const StyledButton = styled.button`
  width: 100%;
  resize: vertical;
`;

export const AnswerBox = styled.div`
  background-color: ${props => props.theme.colors.green5};
  border: 1px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.radii.md};
  padding: ${props => props.theme.spacing.md};
  margin-top: ${props => props.theme.spacing.sm};

  h5 {
    color: ${props => props.theme.colors.text};
    margin-top: 0;
    margin-bottom: ${props => props.theme.spacing.sm};
  }

  p {
    color: ${props => props.theme.colors.text};
    line-height: 1.6;
    white-space: pre-wrap;
  }
`;