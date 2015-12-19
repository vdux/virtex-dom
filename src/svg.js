/**
 * Imports
 */

import {isElement} from 'is-svg-element'
import getNamespaceOfAttribute from 'svg-attribute-namespace'

/**
 * Constants
 */

const namespace = 'http://www.w3.org/2000/svg'

/**
 * Svg stuff
 */

function isAttribute (name) {
  return getNamespaceOfAttribute(name) !== undefined
}

export default {
  isElement,
  isAttribute,
  getNamespaceOfAttribute,
  namespace
}
