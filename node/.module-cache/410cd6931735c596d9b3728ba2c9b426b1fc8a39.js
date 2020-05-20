'use strict';
/**
 * Returns true if the callback function returns true for any of the elements
 * of the iterator.
 *
 * @param {Iterator} iterator
 * @param {function} callback
 * @return {boolean}
 */

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = someIterator;

function someIterator(iterator, callback) {
  /*istanbul ignore next*/
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (
    /*istanbul ignore next*/
    var _iterator = iterator[Symbol.iterator](), _step;
    /*istanbul ignore next*/
    !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
    /*istanbul ignore next*/
    _iteratorNormalCompletion = true) {
      /*istanbul ignore next*/
      var value = _step.value;

      if (callback(value)) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return false;
}