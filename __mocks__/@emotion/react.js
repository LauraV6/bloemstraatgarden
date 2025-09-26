const React = require('react')

export const jsx = (type, props, key) => React.createElement(type, { ...props, key })
export const jsxs = jsx
export const Fragment = React.Fragment

export const ThemeProvider = ({ children }) => children

export const css = () => {}

export const keyframes = () => 'animation-name'

export const jsx = (type, props, key) => React.createElement(type, { ...props, key })
export const jsxs = jsx
export const Fragment = React.Fragment

export const Global = ({ styles, children }) => children

export const useTheme = () => ({
  colors: {
    primary: '#000000',
    secondary: '#666666',
    surface: '#ffffff',
    text: '#000000',
    textSecondary: '#666666',
    border: '#e0e0e0',
    background: '#f5f5f5'
  },
  breakpoints: {
    xs: '320px',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  },
  shadows: {
    sm: '0 1px 2px rgba(0, 0, 0, 0.05)',
    md: '0 4px 6px rgba(0, 0, 0, 0.1)',
    lg: '0 10px 15px rgba(0, 0, 0, 0.1)',
    xl: '0 20px 25px rgba(0, 0, 0, 0.1)'
  }
})