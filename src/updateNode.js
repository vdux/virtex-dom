/**
 * Imports
 */

import removeAttribute from './removeAttribute'
import setAttribute from './setAttribute'
import isUndefined from '@f/is-undefined'
import forEach from '@f/foreach'

/**
 * Update element
 */

function updateElement (prev, next) {
  const node = next.element = prev.element

  /**
   * Diff attributes
   */

  const pattrs = prev.props
  const nattrs = next.props

  forEach((val, key) => {
    if (!nattrs || isUndefined(nattrs[key])) {
      removeAttribute(node, key)
    }
  }, pattrs)

  forEach((val, key) => {
    if (!pattrs || val !== pattrs[key]) {
      setAttribute(node, key, val, pattrs[key])
    }
  }, nattrs)

  return next
}

/**
 * Exports
 */

export default updateElement
