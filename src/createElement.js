/**
 * Imports
 */

import {setAttribute, appendChild} from 'virtex'

/**
 * Create a DOM element
 */

function createElement (doc, dispatch, tag, attrs, children) {
  const node = doc.createElement(tag)

  if (attrs) {
    for (let name in attrs) {
      dispatch(setAttribute(node, name, attrs[name]))
    }
  }

  if (children) {
    for(let i = 0; i < children.length; i++) {
      dispatch(appendChild(node, children[i]))
    }
  }

  return node
}

/**
 * Exports
 */

export default createElement
