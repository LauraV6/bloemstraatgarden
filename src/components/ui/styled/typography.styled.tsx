import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Heading = styled.h1<{ level?: 1 | 2 | 3 | 4 | 5 | 6 }>`
  margin: 0 0 ${props => props.theme.spacing.md} 0;
  font-family: ${props => props.theme.typography.fontFamilyHeading};
  font-weight: ${props => props.theme.typography.fontWeight.bold};
  line-height: ${props => props.theme.typography.lineHeight.tight};
  color: ${props => props.theme.colors.text};

  ${props => {
    const sizes = {
      1: props.theme.typography.fontSize['4xl'],
      2: props.theme.typography.fontSize['3xl'],
      3: props.theme.typography.fontSize['2xl'],
      4: props.theme.typography.fontSize.xl,
      5: props.theme.typography.fontSize.lg,
      6: props.theme.typography.fontSize.base,
    };
    return css`
      font-size: ${sizes[props.level || 1]};
    `;
  }}
`;

export const Title = styled.h2`
  margin: 0 0 ${props => props.theme.spacing.lg} 0;
  font-family: ${props => props.theme.typography.fontFamilyHeading};
  font-size: ${props => props.theme.typography.fontSize['2xl']};
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  line-height: ${props => props.theme.typography.lineHeight.tight};
  color: ${props => props.theme.colors.primary};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    font-size: ${props => props.theme.typography.fontSize['3xl']};
  }
`;

export const Subtitle = styled.h3`
  margin: 0 0 ${props => props.theme.spacing.md} 0;
  font-size: ${props => props.theme.typography.fontSize.xl};
  font-weight: ${props => props.theme.typography.fontWeight.medium};
  line-height: ${props => props.theme.typography.lineHeight.normal};
  color: ${props => props.theme.colors.textSecondary};
`;

export const Paragraph = styled.p`
  margin: 0 0 ${props => props.theme.spacing.md} 0;
  font-size: ${props => props.theme.typography.fontSize.base};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
  color: ${props => props.theme.colors.text};

  &:last-child {
    margin-bottom: 0;
  }
`;

export const Lead = styled.p`
  font-size: ${props => props.theme.typography.fontSize.lg};
  line-height: ${props => props.theme.typography.lineHeight.relaxed};
  color: ${props => props.theme.colors.textSecondary};
  margin: 0 0 ${props => props.theme.spacing.lg} 0;
`;

export const Small = styled.small`
  font-size: ${props => props.theme.typography.fontSize.sm};
  line-height: ${props => props.theme.typography.lineHeight.normal};
  color: ${props => props.theme.colors.textMuted};
`;

export const Strong = styled.strong`
  font-weight: ${props => props.theme.typography.fontWeight.semibold};
  color: inherit;
`;

export const Emphasis = styled.em`
  font-style: italic;
  color: inherit;
`;

export const Link = styled.a`
  color: ${props => props.theme.colors.primary};
  text-decoration: none;
  transition: color ${props => props.theme.transitions.fast};
  cursor: pointer;

  &:hover {
    color: ${props => props.theme.colors.primaryDark};
    text-decoration: underline;
  }

  &:focus-visible {
    outline: 2px solid ${props => props.theme.colors.primary};
    outline-offset: 2px;
    border-radius: 2px;
  }
`;

export const TextMuted = styled.span`
  color: ${props => props.theme.colors.textMuted};
`;

export const TextPrimary = styled.span`
  color: ${props => props.theme.colors.primary};
`;

export const TextSecondary = styled.span`
  color: ${props => props.theme.colors.secondary};
`;

export const TextError = styled.span`
  color: ${props => props.theme.colors.errorBright};
`;

export const TextSuccess = styled.span`
  color: ${props => props.theme.colors.success};
`;

export const List = styled.ul`
  margin: 0 0 ${props => props.theme.spacing.md} 0;
  padding-left: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text};

  li {
    margin-bottom: ${props => props.theme.spacing.xs};
    line-height: ${props => props.theme.typography.lineHeight.relaxed};
  }
`;

export const OrderedList = styled.ol`
  margin: 0 0 ${props => props.theme.spacing.md} 0;
  padding-left: ${props => props.theme.spacing.xl};
  color: ${props => props.theme.colors.text};

  li {
    margin-bottom: ${props => props.theme.spacing.xs};
    line-height: ${props => props.theme.typography.lineHeight.relaxed};
  }
`;

export const Truncate = styled.span<{ lines?: number }>`
  ${props => props.lines ? css`
    display: -webkit-box;
    -webkit-line-clamp: ${props.lines};
    -webkit-box-orient: vertical;
    overflow: hidden;
  ` : css`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  `}
`;