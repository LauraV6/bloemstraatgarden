const React = require('react')

const styled = (Component, options) => {
  const StyledComponent = (stylesFn) => {
    return React.forwardRef((props, ref) => {
      let filteredProps = { ...props }

      // Filter out props that shouldn't be forwarded to DOM
      if (options?.shouldForwardProp) {
        filteredProps = Object.keys(props).reduce((acc, key) => {
          if (options.shouldForwardProp(key)) {
            acc[key] = props[key]
          }
          return acc
        }, {})
      }

      const { as: AsComponent = Component, ...restProps } = filteredProps

      if (typeof AsComponent === 'string') {
        return React.createElement(AsComponent, { ...restProps, ref })
      }

      return React.createElement(AsComponent, { ...restProps, ref })
    })
  }

  // Support styled.div, styled.button, etc.
  return StyledComponent
}

// Add common HTML elements
const elements = [
  'div', 'span', 'button', 'a', 'section', 'article',
  'header', 'footer', 'main', 'nav', 'aside',
  'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p',
  'ul', 'ol', 'li', 'img', 'input', 'form',
  'time', 'figure', 'figcaption', 'table', 'thead', 'tbody',
  'tr', 'td', 'th', 'label', 'select', 'option', 'textarea'
]

elements.forEach(element => {
  styled[element] = styled(element)
})

export default styled