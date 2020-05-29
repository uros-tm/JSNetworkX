'use strict';
/**
 * Returns true of the array is an object and has a numerical length property.
 *
 * @param {?} v
 * @return {bool}
 */

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isArrayLike;

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function isArrayLike(v) {
  return v &&
  /*istanbul ignore next*/
  _typeof(v) === 'object' && typeof v.length === 'number' && typeof v !== 'function';
}