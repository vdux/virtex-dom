/**
 * Imports
 */

import replaceElement from '@f/replaceElement'
import insertElement from '@f/insert-element'
import removeElement from '@f/removeElement'
import updateNode from './updateNode'
import createNode from './createNode'
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
        return createNode(action.vnode)
      case UPDATE_NODE:
        return updateNode(action.prev, action.vnode)
      case REMOVE_NODE:
        return removeElement(action.vnode.element)
      case REPLACE_NODE:
        return replaceElement(action.vnode.element, action.prev.element)
      case INSERT_NODE:
        return insertElement(action.vnode.element, action.newVnode.element, action.pos)
    }

    return next(action)
  }
}

/**
 * Exports
 */

export default dom
