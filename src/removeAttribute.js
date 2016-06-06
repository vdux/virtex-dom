/**
 * Imports
 */

import setValue from '@f/set-value'

/**
 * Remove an attribute from an element
 */

function removeAttribute (node, name, prevValue) {
  if (typeof prevValue === 'function') {
    prevValue(node, name, true)
    return
  }

  switch (name) {
    case 'checked':
    case 'disabled':
    case 'selected':
      node[name] = false
      break
    case 'innerHTML':
      node.innerHTML = ''
      break
    case 'value':
      setValue(node, null)
      break
    default:
      node.removeAttribute(name)
      break
  }
}

/**
 * Exports
 */

export default removeAttribute
