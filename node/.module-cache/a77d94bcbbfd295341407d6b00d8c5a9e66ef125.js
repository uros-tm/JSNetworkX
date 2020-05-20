'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = size;

var
/*istanbul ignore next*/
_isArrayLike = _interopRequireDefault(require("./isArrayLike"));

var
/*istanbul ignore next*/
_isGraph = _interopRequireDefault(require("./isGraph"));

var
/*istanbul ignore next*/
_isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));

var
/*istanbul ignore next*/
_size = _interopRequireDefault(require("lodash/size"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Returns the number of elements in the container. That is
 * the number of elements in the array or object or the length
 * of a string.
 *
 * @param {(string|Object|ArrayLike|Graph)} obj
 *    Object to determine the length of
 *
 * @return {number} The number of elements
 * @throws {TypeError} When length cannot be determined
 */
function size(obj) {
  if (
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _isGraph[
  /*istanbul ignore next*/
  "default"])(obj)) {
    return obj.numberOfNodes();
  } else if (typeof obj === 'string' ||
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _isArrayLike[
  /*istanbul ignore next*/
  "default"])(obj)) {
    return obj.length;
  } else if (
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _isPlainObject[
  /*istanbul ignore next*/
  "default"])(obj)) {
    return (
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _size[
      /*istanbul ignore next*/
      "default"])(obj)
    );
  } else {
    throw new TypeError('Expected a graph object, array, string or object, but got %s instead',
    /*istanbul ignore next*/
    _typeof(obj));
  }
}