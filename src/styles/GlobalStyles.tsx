import { Global, css, useTheme } from '@emotion/react';

export function GlobalStyles() {
  const theme = useTheme();

  // Force re-render by using a key based on theme
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
          overflow-x: hidden;
          width: 100%;
        }

        :root {
          --color-1: ${theme.colors.surface};
          --color-2: ${theme.colors.background};
          --color-3: ${theme.colors.border};
          --color-4: ${theme.colors.primary};
          --color-font: ${theme.colors.text};
          --color-font-light: ${theme.colors.textSecondary};
          --color-text-muted: ${theme.colors.textMuted};
          --color-green-1: ${theme.colors.primaryDark};
          --color-green-2: ${theme.colors.primary};
          --color-green-5: ${theme.colors.green5};
          --color-blue: ${theme.colors.secondary};
          --color-error: ${theme.colors.error};
          --color-error-bright: ${theme.colors.errorBright};
          --color-correct: ${theme.colors.success};
          --color-transparent: ${theme.colors.transparent};
          --color-transparent-1: ${theme.colors.transparent1};
          --color-menu: ${theme.colors.menu};
          --font-pacaembu: ${theme.typography.fontFamilyHeading};
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
          overflow-x: hidden;
          width: 100%;
          max-width: 100vw;
        }
        
        /* Prevent flash of wrong theme */
        html[data-theme="dark"] body,
        html.dark body {
          background-color: #1a1d23;
          color: #e1e1e1;
        }
        
        html[data-theme="dark"] h1,
        html[data-theme="dark"] h2,
        html[data-theme="dark"] h3,
        html[data-theme="dark"] h5,
        html[data-theme="dark"] h6 {
          color: #e1e1e1 !important;
        }
        
        html[data-theme="light"] body,
        html.light body {
          background-color: #fffef9;
          color: #111827;
        }
        
        html[data-theme="light"] h1,
        html[data-theme="light"] h2,
        html[data-theme="light"] h3,
        html[data-theme="light"] h5,
        html[data-theme="light"] h6 {
          color: #111827 !important;
        }

        h1, h2, h3, h4, h5, h6 {
          font-family: ${theme.typography.fontFamilyHeading};
          line-height: ${theme.typography.lineHeight.tight};
          color: ${theme.colors.text};
          margin-bottom: ${theme.spacing.md};
        }

        h1 {
          font-size: ${theme.typography.fontSize['4xl']};
          font-weight: ${theme.typography.fontWeight.bold};
        }

        h2 {
          font-size: 1.5em;
        }

        h3 {
          font-size: ${theme.typography.fontSize['3xl']};
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

        p {
          margin-bottom: ${theme.spacing.md};
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
          
          &:focus {
            outline: 2px solid ${theme.colors.primary};
            outline-offset: 2px;
          }
        }

        img {
          max-width: 100%;
          height: auto;
          display: block;
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

        hr {
          border: none;
          border-top: 1px solid ${theme.colors.border};
          margin: ${theme.spacing.xl} 0;
        }

        table {
          width: 100%;
          border-collapse: separate;
          border-spacing: 0;
          margin: 1rem 0;
          border-radius: 6px;
          background-color: ${theme.colors.background};
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        thead {
          background: ${theme.colors.primary};
          background: linear-gradient(135deg, ${theme.colors.primary} 0%, ${theme.colors.primaryDark} 100%);
        }
        
        thead tr {
          background: ${theme.colors.primary} !important;
        }

        th {
          background: ${theme.colors.transparent} !important;
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
          background-color: ${theme.colors.surface};
          color: ${theme.colors.text};
          font-size: 0.9rem;

          p {
            margin: 0;
          }
        }
        
        td:last-child {
          border-right: none;
        }

        tbody tr {
          background-color: ${theme.colors.surface};
        }

        tbody tr:last-child td {
          border-bottom: none;
        }
        
        tbody tr:nth-child(even) {
          background-color: ${theme.colors.surface};
        }
        
        tbody tr:nth-child(even) td {
          background-color: ${theme.colors.surface};
        }

        /* Responsive tables */
        @media (max-width: ${theme.breakpoints.md}) {
          table {
            font-size: 0.85rem;
            margin: 1rem 0;
          }
          
          th, td {
            padding: 10px 14px;
          }
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

        main {
          transition: 0.3s;
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

        /* Logo text - black in light mode, white in dark mode */
        .st3 {
          fill: #000000 !important; /* Default to black */
        }
        
        [data-theme="light"] .st3 {
          fill: #000000 !important;
        }
        
        [data-theme="dark"] .st3 {
          fill: #ffffff !important;
        }

        /* Button styles - Match Dark/Light toggle design */
        button, .button, a.button, a.button--cta {
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

          /* CTA variant */
          &--cta {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            gap: 10px;
            flex-shrink: 0;
            z-index: 2;

            svg, .stack-action-icon {
              width: 15px;
              transition: all 0.2s ease-in-out;
            }

            &:active {
              background-image: linear-gradient(rgb(0 0 0 / 40%) 0 0);
            }

            &.whapp {
              background-color: #25d366;
              border-color: #25d366;
              color: white;

              &:hover {
                background-color: #1da851;
                border-color: #1da851;
              }
            }

            &.linkedin {
              background-color: #0077b5;
              border-color: #0077b5;
              color: white;

              &:hover {
                background-color: #005885;
                border-color: #005885;
              }
            }

            &.insta {
              background: linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%);
              border: 1px solid #e6683c;
              color: white;

              &:hover {
                background: linear-gradient(45deg, #e6683c 0%, #dc2743 25%, #cc2366 50%, #bc1888 75%, #a8197e 100%);
              }
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
        
        /* Homepage hero dark mode overlay */
        .homepage-hero {
          position: relative !important;
        }
        
        [data-theme="dark"] .homepage-hero::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: #1a1a1ae6;
          z-index: 1;
          pointer-events: none;
        }
      `}
    />
  );
}