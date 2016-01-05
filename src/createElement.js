/**
 * Imports
 */

import setAttribute from './setAttribute'
import forEach from '@f/foreach'
import svg from './svg'

/**
 * Constants
 */

const cache = {}

/**
 * Create a DOM element
 */

function createElement (doc, vnode) {
  if (vnode.type === '#text') {
    return doc.createTextNode(vnode.props.nodeValue)
  }

  const {type, props, children} = vnode
  let cached = cache[type]

  if (typeof cached === 'undefined') {
    cached = cache[type] = svg.isElement(type)
      ? doc.createElementNS(svg.namespace, type)
      : doc.createElement(type)
  }

  const node = cached.cloneNode(false)

  if (props !== null) {
    forEach(props, (val, key) => {
      if (val !== null && val !== undefined) {
        setAttribute(node, key, val)
      }
    })
  }

  for (let i = 0, len = children.length; i < len; ++i) {
    node.appendChild(children[i].el)
  }

  return node
}

/**
 * Exports
 */

export default createElement
