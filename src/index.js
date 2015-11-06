/**
 * Imports
 */

import {actions} from 'virtex'
import setAttribute from './setAttribute'
import removeAttribute from './removeAttribute'
import createElement from './createElement'

/**
 * Vars
 */

const {
  CREATE_TEXT_NODE, CREATE_ELEMENT, SET_ATTRIBUTE,
  REMOVE_ATTRIBUTE, APPEND_CHILD, REPLACE_CHILD,
  INSERT_BEFORE, REMOVE_CHILD
} = actions.types

/**
 * Virtex DOM effects driver
 */

function dom (doc) {
  return ({dispatch}) => next => {
    return action => {
      switch (action.type) {
        case CREATE_TEXT_NODE:
          return doc.createTextNode(action.text)
        case CREATE_ELEMENT:
          return createElement(doc, dispatch, action.tag, action.attrs, action.children)
        case SET_ATTRIBUTE:
          return setAttribute(dispatch, action.node, action.name, action.value)
        case REMOVE_ATTRIBUTE:
          return removeAttribute(action.node, action.name)
        case APPEND_CHILD:
          return action.node.appendChild(action.oldChild)
        case REMOVE_CHILD:
          return action.node.removeChild(action.oldChild)
        case REPLACE_CHILD:
          return action.node.replaceChild(action.newChild, action.oldChild)
        case INSERT_BEFORE:
          return action.node.insertBefore(action.newChild, action.oldChild)
      }

      return next(action)
    }
  }
}

/**
 * Exports
 */

export default dom
