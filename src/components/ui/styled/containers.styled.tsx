import styled from '@emotion/styled';
import { css } from '@emotion/react';

export const Container = styled.div`
  width: 100%;
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 ${props => props.theme.spacing.md};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    padding: 0 ${props => props.theme.spacing.lg};
  }

  @media (min-width: ${props => props.theme.breakpoints.lg}) {
    padding: 0 ${props => props.theme.spacing.xl};
  }
`;

export const Section = styled.section<{ spacing?: 'small' | 'medium' | 'large' }>`
  padding: ${props => {
    const spacingMap = {
      small: props.theme.spacing.xl,
      medium: props.theme.spacing.xxl,
      large: `calc(${props.theme.spacing.xxl} * 2)`,
    };
    return `${spacingMap[props.spacing || 'medium']} 0`;
  }};
`;

export const FlexContainer = styled.div<{
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly';
  gap?: string;
  wrap?: boolean;
}>`
  display: flex;
  flex-direction: ${props => props.direction || 'row'};
  align-items: ${props => {
    const alignMap = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      stretch: 'stretch',
    };
    return alignMap[props.align || 'stretch'];
  }};
  justify-content: ${props => {
    const justifyMap = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
      between: 'space-between',
      around: 'space-around',
      evenly: 'space-evenly',
    };
    return justifyMap[props.justify || 'start'];
  }};
  gap: ${props => props.gap || props.theme.spacing.md};
  flex-wrap: ${props => props.wrap ? 'wrap' : 'nowrap'};
`;

export const GridContainer = styled.div<{
  columns?: number;
  gap?: string;
  responsive?: boolean;
  minWidth?: string;
}>`
  display: grid;
  gap: ${props => props.gap || props.theme.spacing.lg};

  ${props => props.responsive !== false ? css`
    grid-template-columns: repeat(auto-fill, minmax(${props.minWidth || '280px'}, 1fr));

    @media (min-width: ${props.theme.breakpoints.md}) {
      grid-template-columns: repeat(auto-fill, minmax(${props.minWidth || '350px'}, 1fr));
    }
  ` : css`
    grid-template-columns: repeat(${props.columns || 1}, 1fr);

    @media (min-width: ${props.theme.breakpoints.md}) {
      grid-template-columns: repeat(${props.columns || 2}, 1fr);
    }

    @media (min-width: ${props.theme.breakpoints.lg}) {
      grid-template-columns: repeat(${props.columns || 3}, 1fr);
    }
  `}
`;

export const Overlay = styled.div<{ visible?: boolean; opacity?: number }>`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: ${props => `rgba(0, 0, 0, ${props.opacity || 0.5})`};
  backdrop-filter: blur(4px);
  z-index: ${props => props.theme.layers.overlay};
  display: ${props => props.visible ? 'block' : 'none'};
  transition: opacity ${props => props.theme.transitions.normal};
`;

export const Modal = styled.div<{ isOpen?: boolean }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${props => props.theme.colors.surface};
  border-radius: ${props => props.theme.radii.lg};
  box-shadow: ${props => props.theme.shadows.xl};
  z-index: ${props => props.theme.layers.modal};
  padding: ${props => props.theme.spacing.xl};
  max-width: 90%;
  max-height: 90vh;
  overflow-y: auto;
  display: ${props => props.isOpen ? 'block' : 'none'};

  @media (min-width: ${props => props.theme.breakpoints.md}) {
    max-width: 600px;
  }
`;

export const Sidebar = styled.aside<{ position?: 'left' | 'right'; width?: string }>`
  position: fixed;
  top: 0;
  ${props => props.position === 'right' ? 'right: 0' : 'left: 0'};
  height: 100vh;
  width: ${props => props.width || '280px'};
  background-color: ${props => props.theme.colors.surface};
  border-${props => props.position === 'right' ? 'left' : 'right'}: 1px solid ${props => props.theme.colors.border};
  z-index: ${props => props.theme.layers.sticky};
  overflow-y: auto;
  transition: transform ${props => props.theme.transitions.normal};
`;

export const PageWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: ${props => props.theme.colors.background};
`;

export const MainContent = styled.main`
  flex: 1;
  display: flex;
  flex-direction: column;
`;