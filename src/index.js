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

const {types} = actions
const {
  CREATE_TEXT_NODE, CREATE_ELEMENT, SET_ATTRIBUTE,
  REMOVE_ATTRIBUTE, APPEND_CHILD, REPLACE_CHILD,
  INSERT_BEFORE, REMOVE_CHILD
} = types

/**
 * Virtex DOM effects driver
 */

function dom (doc) {
  return ({dispatch}) => next => action => handle(doc, dispatch, next, action)
}

function handle (doc, dispatch, next, action) {
  switch (action.type) {
    case CREATE_TEXT_NODE:
      return doc.createTextNode(action.text)
    case CREATE_ELEMENT:
      return createElement(doc, dispatch, action.tag, action.attrs, action.children)
    case SET_ATTRIBUTE:
      return setAttribute(dispatch, action.node, action.name, action.value)
    case REMOVE_ATTRIBUTE:
      return removeAttribute(action.node, action.name, action.priorValue)
    case APPEND_CHILD:
      return action.node.appendChild(action.childNode)
    case REPLACE_CHILD:
      return action.node.replaceChild(action.newChild, action.oldChild)
    case INSERT_BEFORE:
      return action.node.insertBefore(action.newChild, action.oldChild)
    case REMOVE_CHILD:
      return action.node.removeChild(action.childNode)
  }

  return next(action)
}

/**
 * Exports
 */

export default dom
