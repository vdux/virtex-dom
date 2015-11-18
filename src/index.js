/**
 * Imports
 */

import {actions} from 'virtex'
import setAttribute from './setAttribute'
import removeAttribute from './removeAttribute'
import createElement from './createElement'

/**
 * Constants
 */

const {
  CREATE_ELEMENT, SET_ATTRIBUTE, REMOVE_ATTRIBUTE,
  APPEND_CHILD, REPLACE_NODE, INSERT_BEFORE,
  REMOVE_NODE
} = actions.types

/**
 * Virtex DOM effects driver
 */

function dom (doc) {
  return ({dispatch}) => next => {
    return action => {
      switch (action.type) {
        case CREATE_ELEMENT:
          return createElement(doc, dispatch, action.vnode)
        case SET_ATTRIBUTE:
          return setAttribute(dispatch, action.node, action.name, action.value)
        case REMOVE_ATTRIBUTE:
          return removeAttribute(action.node, action.name)
        case APPEND_CHILD:
          return action.node.appendChild(action.newNode)
        case REMOVE_NODE: {
          const {node} = action
          return node.parentNode.removeChild(node)
        }
        case REPLACE_NODE: {
          const {node, newNode} = action
          return node.parentNode.replaceChild(newNode, node)
        }
        case INSERT_BEFORE: {
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
