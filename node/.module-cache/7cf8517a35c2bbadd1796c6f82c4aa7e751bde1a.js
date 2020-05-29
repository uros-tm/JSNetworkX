'use strict';
/**
 * Returns true if the two values are equal node values. If the values are
 * primitives, they are compared directly. If they are objects, their string
 * representation is compared.
 *
 * @param {Node} a
 * @param {Node} b
 * @return {boolean}
 */

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = nodesAreEqual;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function nodesAreEqual(a, b) {
  return a === b ||
  /*istanbul ignore next*/
  _typeof(a) === 'object' && a.toString() === b.toString();
}