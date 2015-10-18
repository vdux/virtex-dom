/**
 * Imports
 */

import setAttribute from './setAttribute'

/**
 * Create a DOM element
 */

function createElement (tag, attrs, children) {
  const node = doc.createElement(tag)

  if (attrs) {
    for (let name in attrs) {
      setAttribute(node, name, attrs[name])
    }
  }

  if (children) {
    for (let i = 0; i < children.length; i++) {
      node.appendChild(children[i])
    }
  }

  return node
}

/**
 * Exports
 */

export default createElement
