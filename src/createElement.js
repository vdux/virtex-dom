/**
 * Imports
 */

import {actions} from 'virtex'
import forEach from './forEach'

/**
 * Vars
 */

const {setAttribute} = actions

/**
 * Create a DOM element
 */

function createElement (doc, dispatch, tag, attrs, children) {
  const node = doc.createElement(tag)

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
