const React = require('react')

const styled = (Component) => {
  const StyledComponent = (stylesFn) => {
    return React.forwardRef((props, ref) => {
      const { as: AsComponent = Component, ...restProps } = props

      // Filter out props that start with $ (transient props)
      const filteredProps = Object.keys(restProps).reduce((acc, key) => {
        if (!key.startsWith('$')) {
          acc[key] = restProps[key]
        }
        return acc
      }, {})

      if (typeof AsComponent === 'string') {
        return React.createElement(AsComponent, { ...filteredProps, ref })
      }

      return React.createElement(AsComponent, { ...filteredProps, ref })
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