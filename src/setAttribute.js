/**
 * Imports
 */

import {actions} from 'virtex'
import setValue from './setValue'

/**
 * Vars
 */

const {removeAttribute} = actions

/**
 * Set an attribute on an element
 */

function setAttribute (dispatch, node, name, value) {
  if (typeof value === 'function') {
    value = value(node, name, false)
  }

  if (value === undefined || value === null) {
    if (node.hasAttribute(name)) {
      dispatch(removeAttribute(node, name))
    }
    return
  }

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
    case 'key':
    // Don't set the 'key' attribute
      break
    default:
      node.setAttribute(name, value)
  }
}

/**
 * Exports
 */

export default setAttribute
