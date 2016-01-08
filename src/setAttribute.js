/**
 * Imports
 */

import removeAttribute from './removeAttribute'
import isValidAttr from '@f/is-valid-attr'
import setAttr from '@f/set-attribute'
import setValue from '@f/set-value'

/**
 * Set an attribute on an element
 */

function setAttribute (node, name, value) {
  if (typeof value === 'function') {
    value = value(node, name)
  }

  if (isValidAttr(value)) {
    switch (name) {
      case 'nodeValue':
      case 'checked':
      case 'disabled':
      case 'selected':
      case 'innerHTML':
      case 'textContent':
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
    removeAttribute(node, name)
  }
}

/**
 * Exports
 */

export default setAttribute
