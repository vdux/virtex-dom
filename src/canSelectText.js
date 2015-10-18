/**
 * Check if an element can have selectable text
 */

const selectable = /^text|search|password|tel|url$/

function canSelectText (node) {
  return node.tagName === 'INPUT' && selectable.test(node.type)
}

/**
 * Exports
 */

export default canSelectText
