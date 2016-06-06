/**
 * Imports
 */

import removeAttribute from './removeAttribute'
import isValidAttr from '@f/is-valid-attr'
import applyStyles from '@f/apply-styles'
import setAttr from '@f/set-attribute'
import focus from '@f/focus-element'
import setValue from '@f/set-value'

/**
 * Set an attribute on an element
 */

function setAttribute (node, name, value, prevValue) {
  if (typeof value === 'function') {
    value(node, name)
    return
  }

  if (name === 'style') {
    applyStyles(node, value, prevValue)
  } else if (isValidAttr(value)) {
    switch (name) {
      case 'autofocus':
        if (value && value !== prevValue) {
          setTimeout(() => focus(node))
        }
        break
      case 'nodeValue':
      case 'checked':
      case 'disabled':
      case 'selected':
      case 'innerHTML':
      case 'textContent':
      case 'defaultValue':
      case 'defaultChecked':
        node[name] = value
        break
      case 'value':
        setValue(node, value)
        break
      default:
        setAttr(node, name, value)
        break
    }
  } else {
    removeAttribute(node, name, prevValue)
  }
}

/**
 * Exports
 */

export default setAttribute
