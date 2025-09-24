import styled from '@emotion/styled';

export const SidebarContainer = styled.aside`
`;

export const SidebarContent = styled.div`
  position: sticky;
  top: calc(82px + ${props => props.theme.spacing.xl});
`;

export const IntroSection = styled.div`
  border: 1px solid ${props => props.theme.colors.border};
  background-color: ${props => props.theme.colors.menu};
  border-radius: ${props => props.theme.radii.md};
  margin-bottom: ${props => props.theme.spacing.xl};

  img {
    object-fit: cover;
    object-position: center;
    width: 100%;
    max-height: 250px;
    border-radius: ${props => props.theme.radii.md} ${props => props.theme.radii.md} 0 0;
    filter: brightness(1.1);
  }
`;

export const TestSection = styled.div`
  background-color: ${props => props.theme.colors.green5};
  border-radius: ${props => props.theme.radii.md};

  a {
    width: 100%;
    margin-top: ${props => props.theme.spacing.md};
  }
`;

export const SidebarSection = styled.div`
  display: grid;
  gap: 20px;
  padding: ${props => props.theme.spacing.lg};

  p {
    color: ${props => props.theme.colors.textSecondary};
    margin-bottom: 0;
  }
`;