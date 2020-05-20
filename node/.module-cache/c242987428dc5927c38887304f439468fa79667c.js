'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = zipSequence;

var
/*istanbul ignore next*/
_isArrayLike = _interopRequireDefault(require("./isArrayLike"));

var
/*istanbul ignore next*/
_isIterator = _interopRequireDefault(require("./isIterator"));

var
/*istanbul ignore next*/
_zipIterator = _interopRequireDefault(require("./zipIterator"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function zipArray() {
  /*istanbul ignore next*/
  for (var _len = arguments.length, varArgs = new Array(_len), _key = 0; _key < _len; _key++) {
    varArgs[_key] = arguments[_key];
  }

  // Pre-allocation arrays speeds up assignment drastically, so we want to
  // optimize for that case
  var length = varArgs.length;
  var min = Infinity;
  var i;
  var result;
  var nextZip = new Array(length); // first pass

  for (i = 0; i < length; i++) {
    var array = varArgs[i];
    var arrayLength = array.length;

    if (arrayLength < min) {
      min = arrayLength;

      if (min === 0) {
        return []; // backout early
      }
    }

    nextZip[i] = array[0];
  }

  result = new Array(min);
  result[0] = nextZip;

  for (i = 1; i < min; i++) {
    nextZip = new Array(length);

    for (var j = 0; j < length; j++) {
      nextZip[j] = varArgs[j][i];
    }

    result[i] = nextZip;
  }

  return result;
}
/**
 * Helper to zip sequence types (arrays, array-like objects, objects, etc).
 * All arguments must be the same type. The first argument is used to determine
 * the type.
 * This behaves the same as Python's zip function, i.e. the result has the
 * length of the shortest input.
 *
 * Array -> Array
 * Array-like -> Array
 * Iterator -> Iterator
 *
 * @param {...(Iterable)} var_args
 *
 * @return {!(Array|Iterator)}
 */


function zipSequence() {
  /*istanbul ignore next*/
  for (var _len2 = arguments.length, varArgs = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    varArgs[_key2] = arguments[_key2];
  }

  var first = varArgs[0];

  if (
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _isArrayLike[
  /*istanbul ignore next*/
  "default"])(first)) {
    return zipArray.apply(null, varArgs);
  } else if (
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _isIterator[
  /*istanbul ignore next*/
  "default"])(first)) {
    return (
      /*istanbul ignore next*/
      _zipIterator[
      /*istanbul ignore next*/
      "default"].apply(null, varArgs)
    );
  } else {
    throw new TypeError('Expected an iterator, array-like object or object, but got %s instead', first);
  }
}