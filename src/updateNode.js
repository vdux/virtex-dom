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
    const pval = pattrs[key]
    if (!pattrs || val !== pval) {
      setAttribute(node, key, val, pval)
    }
  }, nattrs)

  return next
}

/**
 * Exports
 */

export default updateElement
