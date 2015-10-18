/**
 * Imports
 */

import canSelectText from './canSelectText'

/**
 * Set an element's value
 */

function setValue (node, value) {
  if (node.ownerDocument.activeElement === node && canSelectText(node)) {
    const start = node.selectionStart
    const end = node.selectionEnd
    node.value = value
    node.setSelectionRange(start, end)
  } else {
    node.value = value
  }
}

/**
 * Exports
 */

export default setValue
