'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = mapSequence;

var
/*istanbul ignore next*/
_isPlainObject = _interopRequireDefault(require("lodash/isPlainObject"));

var
/*istanbul ignore next*/
_mapValues = _interopRequireDefault(require("lodash/mapValues"));

var
/*istanbul ignore next*/
_isArrayLike = _interopRequireDefault(require("./isArrayLike"));

var
/*istanbul ignore next*/
_isIterable = _interopRequireDefault(require("./isIterable"));

var
/*istanbul ignore next*/
_isIterator = _interopRequireDefault(require("./isIterator"));

var
/*istanbul ignore next*/
_mapIterator = _interopRequireDefault(require("./mapIterator"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var nativeMap = Array.prototype.map;
/**
 * Helper to map sequence types (arrays, array-like objects, objects, etc).
 * Note that if an array-like object is passed, an array is returned:
 *
 * Array -> Array
 * ArrayLike -> Array
 * Iterator -> Iterator
 * Iterable -> Iterator
 * Object -> Object
 *
 * @param {Iterable} sequence
 * @param {function(this:T,...)} callback
 * @param {T=} this_obj
 * @template T
 *
 * @return {(Array|Object|Iterator)}
 */

function mapSequence(sequence, callback, thisObj) {
  if (
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _isArrayLike[
  /*istanbul ignore next*/
  "default"])(sequence)) {
    return nativeMap.call(sequence, callback, thisObj);
  } else if (
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _isIterable[
  /*istanbul ignore next*/
  "default"])(sequence)) {
    sequence = sequence[Symbol.iterator]();
  }

  if (
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _isIterator[
  /*istanbul ignore next*/
  "default"])(sequence)) {
    return (
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _mapIterator[
      /*istanbul ignore next*/
      "default"])(sequence, callback, thisObj)
    );
  } else if (
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _isPlainObject[
  /*istanbul ignore next*/
  "default"])(sequence)) {
    return (
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _mapValues[
      /*istanbul ignore next*/
      "default"])(sequence, callback, thisObj)
    );
  } else {
    throw new TypeError("Can't map value of type %s",
    /*istanbul ignore next*/
    _typeof(sequence));
  }
}