/**
 * Imports
 */

import setAttribute from './setAttribute'
import removeAttribute from './removeAttribute'
import createElement from './createElement'

/**
 * Virtex DOM effects driver
 */

function dom (doc) {
  return ({dispatch}) => next => action => handle(doc, dispatch, next, action)
}

function handle (doc, dispatch, next, action) {
  const {type, payload} = action

  switch (type) {
    case 'CREATE_TEXT_NODE':
      return doc.createTextNode(payload)
    case 'CREATE_ELEMENT':
      return createElement(doc, dispatch, payload.tag, payload.attrs, payload.children)
    case 'SET_ATTRIBUTE':
      return setAttribute(dispatch, payload.node, payload.name, payload.value)
    case 'REMOVE_ATTRIBUTE':
      return removeAttribute(payload.node, payload.name, payload.priorValue)
    case 'APPEND_CHILD':
      return payload.node.appendChild(payload.childNode)
    case 'REPLACE_CHILD':
      return payload.node.replaceChild(payload.newChild, payload.oldChild)
    case 'INSERT_BEFORE':
      return payload.node.insertBefore(payload.newChild, payload.oldChild)
    case 'REMOVE_CHILD':
      return payload.node.removeChild(payload.childNode)
    default:
      return next(action)
  }
}

/**
 * Exports
 */

export default dom
