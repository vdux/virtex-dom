/**
 * Imports
 */

import removeAttribute from './removeAttribute'
import setValue from '@f/set-value'
import svg from './svg'

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
        const attrNamespace = svg.getNamespaceOfAttribute(name)
        if (attrNamespace !== null) {
          node.setAttributeNS(attrNamespace, name, value)
        } else {
          node.setAttribute(name, value)
        }
        break
    }
  } else {
    removeAttribute(node, name)
  }
}

function isValidAttr (val) {
  switch (typeof val) {
    case 'string':
    case 'number':
      return true
    case 'boolean':
      return val
    default:
      return false
  }
}

/**
 * Exports
 */

export default setAttribute
