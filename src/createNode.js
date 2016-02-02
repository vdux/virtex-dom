/**
 * Imports
 */

import createElement from '@f/create-element'
import setAttribute from './setAttribute'
import forEach from '@f/foreach'

/**
 * Create a DOM element
 */

function createNode (vnode, children, element) {
  const type = vnode.type
  let node

  if (!element) {
    if (type === '#text') {
      vnode.element = document.createTextNode(vnode.props.nodeValue)
      return vnode
    }

    node = vnode.element = createElement(type)
  } else {
    node = vnode.element = element
  }

  forEach(child => node.appendChild(child.element), children)
  forEach((value, name) => setAttribute(node, name, value), vnode.props)
  return vnode
}

/**
 * Exports
 */

export default createNode
