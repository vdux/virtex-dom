/**
 * Imports
 */

import {actions} from 'virtex'
import updateElement from './updateElement'
import createElement from './createElement'

/**
 * Constants
 */

const {
  CREATE_NODE, UPDATE_NODE, REMOVE_NODE,
  REPLACE_NODE, INSERT_NODE
} = actions.types

/**
 * Virtex DOM effects driver
 */

function dom (doc) {
  return ({dispatch}) => next => {
    return action => {
      switch (action.type) {
        case CREATE_NODE:
          return createElement(doc, action.vnode)
        case REMOVE_NODE: {
          const {node} = action
          return node.parentNode.removeChild(node)
        }
        case REPLACE_NODE: {
          const {node, newNode} = action
          return node.parentNode.replaceChild(newNode, node)
        }
        case INSERT_NODE: {
          const {node, newNode, pos} = action
          return node.insertBefore(newNode, node.childNodes[pos] || null)
        }
      }

      return next(action)
    }
  }
}

/**
 * Exports
 */

export default dom
