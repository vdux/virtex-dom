/**
 * Imports
 */

import {types} from 'virtex'
import setAttribute from './setAttribute'
import removeAttribute from './removeAttribute'
import createElement from './createElement'

/**
 * Virtex DOM effects driver
 */

function dom (doc) {
  return ({dispatch}) => next => action => {
    switch (type) {
      case types.CREATE_TEXT_NODE:
        return doc.createTextNode(payload)
      case types.CREATE_ELEMENT:
        return createElement(doc, dispatch, payload.tag, payload.attrs, payload.children)
      case types.SET_ATTRIBUTE:
        return setAttribute(payload.node, payload.name, payload.value)
      case types.REMOVE_ATTRIBUTE:
        return removeAttribute(payload.node, payload.name, payload.priorValue)
      case types.APPEND_CHILD:
        return payload.node.appendChild(payload.childNode)
      case types.REPLACE_CHILD:
        return payload.node.replaceChild(payload.newChild, payload.oldChild)
      case types.REMOVE_CHILD:
        return payload.node.removeChild(payload.childNode)
      default:
        return next(action)
    }
  }
}

/**
 * Exports
 */

export default dom
