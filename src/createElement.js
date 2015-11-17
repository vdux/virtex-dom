/**
 * Imports
 */

import {actions} from 'virtex'
import forEach from 'foreach'
import svg from './svg'

/**
 * Constants
 */

const {setAttribute} = actions
const cache = {}

/**
 * Create a DOM element
 */

function createElement (doc, dispatch, vnode) {
  if (vnode.type === '#text') {
    return doc.createTextNode(vnode.attrs.nodeValue)
  }

  const {type, attrs, children} = vnode
  let cached = cache[type]

  if (typeof cached === 'undefined') {
    cached = cache[type] = svg.isElement(type)
      ? doc.createElementNS(svg.namespace, type)
      : doc.createElement(type)
  }

  const node = cached.cloneNode(false)

  if (attrs !== null) {
    for (let key in attrs) {
      const val = attrs[key]
      if (val !== null && val !== undefined) {
        dispatch(setAttribute(node, key, val))
      }
    }
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
