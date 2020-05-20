'use strict';
/**
 * Returns true if value is a Graph
 *
 * @param {*} value
 * @return {bool}
 */

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isGraph;

function isGraph(value) {
  // We are not using instanceof to avoid circular dependencies
  return value && typeof value.addNode === 'function';
}