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
  let hooks = node.$__hooks

  if (typeof value === 'function') {
    value = value(node, name, false)
    if (!hooks) hooks = node.$__hooks || []
    if (hooks.indexOf(name) === -1) {
      hooks.push(name)
    }
  } else if (hooks) {
    const idx = hooks.indexOf(name)
    if (idx !== -1) hooks.splice(idx, 1)
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
      default:
        node.setAttribute(name, value)
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
