/**
 * Imports
 */

import createElement from '@f/create-element'
import setAttribute from './setAttribute'
import forEach from '@f/foreach'
import svg from './svg'

/**
 * Create a DOM element
 */

function createNode (vnode) {
  const type = vnode.type

  if (type === '#text') {
    vnode.element = document.createTextNode(vnode.props.nodeValue)
    return vnode
  }

  const node = vnode.element = createElement(type)
  forEach((value, name) => setAttribute(node, name, value), vnode.props)
  forEach(child => node.appendChild(child.el), vnode.children)

  return vnode
}

/**
 * Exports
 */

export default createNode
