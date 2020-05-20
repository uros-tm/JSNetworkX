'use strict';
/**
 * Returns true if object implement the @@iterator method.
 *
 * @param {*} obj

 * @return {boolean}
 */

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isIterable;

function isIterable(obj) {
  return typeof obj[Symbol.iterator] === 'function';
}