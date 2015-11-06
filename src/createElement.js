/**
 * Imports
 */

import {actions} from 'virtex'
import forEach from './forEach'
import svg from './svg'

/**
 * Constants
 */

const {setAttribute} = actions
const cache = {}

/**
 * Create a DOM element
 */

function createElement (doc, dispatch, tag, attrs, children) {
  if (typeof cache[tag] === 'undefined') {
    cache[tag] = svg.isElement(tag)
      ? doc.createElementNS(svg.namespace, tag)
      : doc.createElement(tag)
  }

  const node = cache[tag].cloneNode(false)

  if (attrs !== null) {
    for (let key in attrs) {
      const val = attrs[key]
      if (val !== null && val !== undefined) {
        dispatch(setAttribute(node, key, val))
      }
    }
  }

  for (let i = 0, len = children.length; i < len; ++i) {
    node.appendChild(children[i])
  }

  return node
}

/**
 * Exports
 */

export default createElement
