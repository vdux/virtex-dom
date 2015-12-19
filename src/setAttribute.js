/**
 * Imports
 */

import {actions} from 'virtex'
import setValue from './setValue'
import svg from './svg'

/**
 * Constants
 */

const {removeAttribute} = actions

/**
 * Set an attribute on an element
 */

function setAttribute (dispatch, node, name, value) {
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
        node[name] = value
        break
      case 'value':
        setValue(node, value)
        break
      case svg.isAttribute(name):
        const attrNamespace = getNamespaceOfAttribute(name)
        node.setAttributeNS(attrNamespace, name, value)
        break
      default:
        node.setAttribute(name, value)
        break
    }
  } else {
    dispatch(removeAttribute(node, name))
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
