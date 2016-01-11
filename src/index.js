/**
 * Imports
 */

import replaceElement from '@f/replace-element'
import insertElement from '@f/insert-element'
import removeElement from '@f/remove-element'
import updateNode from './updateNode'
import createNode from './createNode'
import forEach from '@f/foreach'
import {actions} from 'virtex'

/**
 * Constants
 */

const {CREATE_NODE, UPDATE_NODE, REMOVE_NODE, REPLACE_NODE, INSERT_NODE} = actions.types

/**
 * Virtex DOM effects driver
 */

function dom ({dispatch}) {
  return next => action => {
    switch (action.type) {
      case CREATE_NODE:
        return createNode(action.vnode, action.children)
      case UPDATE_NODE:
        return updateNode(action.prev, action.vnode)
      case REMOVE_NODE:
        removeElement(action.vnode.element)
        return action.vnode
      case REPLACE_NODE:
        replaceElement(action.vnode.element, action.prev.element)
        return action.vnode
      case INSERT_NODE:
        insertElement(action.vnode.element, action.newVnode.element, action.pos)
        return action.vnode
    }

    return next(action)
  }
}

/**
 * Setup the cached element property on a vnode tree. Useful for server-side
 * rendering
 */

function reconstitute (vnode, element) {
  vnode.element = element
  forEach( (vnode, i) => reconstitute(vnode, element.childNodes[i]), vnode.children)
}

/**
 * Exports
 */

export default dom
export {
  reconstitute
}
