import { Global, css, useTheme } from '@emotion/react';

export function GlobalStyles() {
  const theme = useTheme();

  return (
    <Global
      key={theme.colors.background}
      styles={css`
        *, *::before, *::after {
          box-sizing: border-box;
        }
        
        * {
          margin: 0;
          padding: 0;
        }

        html {
          font-size: 16px;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          width: 100%;
        }

        body {
          font-family: ${theme.typography.fontFamily};
          font-size: 16px;
          line-height: ${theme.typography.lineHeight.normal};
          color: ${theme.colors.text};
          background-color: ${theme.colors.background};
          word-break: break-word;
          transition: background-color ${theme.transitions.normal}, color ${theme.transitions.normal};
          padding: 0;
          margin: 0;
          width: 100%;
          max-width: 100vw;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: ${theme.typography.fontFamilyHeading};
          line-height: ${theme.typography.lineHeight.tight};
          margin-bottom: ${theme.spacing.md};
        }

        h1 {
          font-size: ${theme.typography.fontSize['4xl']};
          font-weight: ${theme.typography.fontWeight.bold};
        }

        h2 {
          font-size: ${theme.typography.fontSize['3xl']};
        }

        h3 {
          font-size: ${theme.typography.fontSize['2xl']};
        }

        h4 {
          font-size: ${theme.typography.fontSize.xl};
        }

        h5 {
          font-size: ${theme.typography.fontSize.lg};
        }

        h6 {
          font-size: ${theme.typography.fontSize.base};
        }

        a {
          color: ${theme.colors.primary};
          text-decoration: none;
          height: 100%;
          border-radius: 5px;
          transition: color ${theme.transitions.fast};

          &:focus {
            outline: 2px solid ${theme.colors.primary};
            outline-offset: 2px;
          }
        }

        .skip-link:focus {
          position: fixed !important;
          left: 1rem !important;
          top: 1rem !important;
          width: auto !important;
          height: auto !important;
          padding: 0.75rem 1.5rem !important;
          background: ${theme.colors.primary} !important;
          color: white !important;
          z-index: 10000 !important;
          text-decoration: none !important;
          border-radius: 4px !important;
          font-weight: 600 !important;
        }

        button {
          cursor: pointer;
          font-family: inherit;
          font-size: inherit;
          transition: all ${theme.transitions.fast};

          &:focus {
            outline: 2px solid ${theme.colors.primary};
            outline-offset: 2px;
          }

          &:disabled {
            cursor: not-allowed;
            opacity: 0.6;
          }
        }

        input, textarea, select {
          font-family: inherit;
          font-size: inherit;
        }

        ul, ol {
          margin-bottom: ${theme.spacing.md};
          padding-left: ${theme.spacing.lg};
        }

        li {
          margin-bottom: ${theme.spacing.xs};
        }

        code {
          font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
          background-color: ${theme.colors.surface};
          padding: 0.125rem 0.25rem;
          border-radius: ${theme.radii.sm};
          font-size: 0.875em;
        }

        pre {
          font-family: 'Consolas', 'Monaco', 'Courier New', monospace;
          background-color: ${theme.colors.surface};
          padding: ${theme.spacing.md};
          border-radius: ${theme.radii.md};
          overflow-x: auto;
          margin-bottom: ${theme.spacing.md};

          code {
            background-color: transparent;
            padding: 0;
          }
        }

        blockquote {
          border-left: 4px solid ${theme.colors.primary};
          padding-left: ${theme.spacing.md};
          margin: ${theme.spacing.md} 0;
          font-style: italic;
          color: ${theme.colors.textSecondary};
        }
          
        table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          margin: 1rem 0;
          border-radius: 6px;
          background-color: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        th {
          background: ${theme.colors.primaryDark};
          color: hsl(0, 0%, 100%);
          font-weight: 700;
          padding: 14px 18px;
          text-align: left;
          vertical-align: top;
          border-bottom: 2px solid ${theme.colors.primaryDark};
          border-right: 1px solid rgba(255, 255, 255, 0.2);
          font-size: 0.95rem;
          letter-spacing: 0.5px;
          font-family: ${theme.typography.fontFamilyHeading};

          p {
            margin-bottom: 0;
          }
        }
        
        th:last-child {
          border-right: none;
        }

        td {
          padding: 12px 18px;
          text-align: left;
          vertical-align: top;
          border-bottom: 1px solid ${theme.colors.border};
          border-right: 1px solid ${theme.colors.border};
          font-size: 0.9rem;

          p {
            margin: 0;
          }
        }
        
        td:last-child {
          border-right: none;
        }

        tbody tr:last-child td {
          border-bottom: none;
        }

        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border-width: 0;
        }

        section {
          max-width: 1200px;
          padding: 0 1rem;
          margin: 2rem 0;

          @media (min-width: ${theme.breakpoints.md}) {
            width: calc(100% - 4rem);
            padding: 0 2rem;
            margin: 3rem auto;
          }

          @media (min-width: ${theme.breakpoints.lg}) {
            width: calc(100% - 10rem);
            margin: 5rem auto;
          }
        }

        button, .button, a.button, a.button--cta {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          width: auto;
          border-radius: 40px;
          background-color: transparent;
          color: ${theme.colors.primary} !important;
          font-family: var(--font-pacaembu);
          font-size: 0.9rem;
          transition: all 0.3s ease;
          text-decoration: none !important;
          text-align: center;
          padding: 0.5rem 1.5rem;
          cursor: pointer;
          border: 1px solid ${theme.colors.primary};
          outline: none;
          position: relative;

          @media (min-width: ${theme.breakpoints.lg}) {
            width: fit-content;
          }

          &:hover {
            background-color: ${theme.colors.primary};
            color: hsl(0, 0%, 100%) !important;
            border-color: ${theme.colors.primary};
            text-decoration: none;
          }
          
          &:hover span,
          &:hover svg {
            color: hsl(0, 0%, 100%) !important;
          }

          &:active {
            transform: translateY(0);
          }

          &--cta {
            flex-shrink: 0;
            z-index: 2;

            svg, .stack-action-icon {
              width: 15px;
              transition: all 0.2s ease-in-out;
            }

            &:active {
              background-image: linear-gradient(rgb(0 0 0 / 40%) 0 0);
            }
          }

          &--ter {
            background-color: none;
            color: ${theme.colors.textSecondary};
            border: none;
            padding: 0.5rem 1rem;

            &:hover {
              text-decoration: underline;
            }
          }

          &.wrong,
          &.correct {
            color: ${theme.colors.text};
          }

          &.wrong {
            background-color: ${theme.colors.error};
            border: 1px solid ${theme.colors.error};
          }

          &.correct {
            background-color: ${theme.colors.success};
            border: 1px solid ${theme.colors.success};
          }
        }

        button[disabled] {
          pointer-events: none;
          opacity: 0.8;
        }
      `}
    />
  );
}