/**
 * Imports
 */

import createElement from '@f/create-element'
import setAttribute from './setAttribute'
import forEach from '@f/foreach'

/**
 * Create a DOM element
 */

function createNode (vnode, children) {
  const type = vnode.type

  if (type === '#text') {
    vnode.element = document.createTextNode(vnode.props.nodeValue)
    return vnode
  }

  const node = vnode.element = createElement(type)
  forEach((value, name) => setAttribute(node, name, value), vnode.props)
  forEach(child => node.appendChild(child.element), children)

  return vnode
}

/**
 * Exports
 */

export default createNode
