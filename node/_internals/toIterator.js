'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = toIterator;

var
/*istanbul ignore next*/
_isArrayLike = _interopRequireDefault(require("./isArrayLike"));

var
/*istanbul ignore next*/
_isIterator = _interopRequireDefault(require("./isIterator"));

var
/*istanbul ignore next*/
_isIterable = _interopRequireDefault(require("./isIterable"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Returns an iterator object for the given array, array-like object
 * or object. Should behave like Python's iter:
 * http://docs.python.org/library/functions.html#iter
 *
 *
 * The iterator object implements the goog.iter.Iterator interface.
 *
 * @param {Iterable} seq
 * @return {!Iterator}
 */
function toIterator(seq) {
  /*jshint expr:true*/
  if (
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _isIterator[
  /*istanbul ignore next*/
  "default"])(seq)) {
    return seq;
  } else if (
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _isIterable[
  /*istanbul ignore next*/
  "default"])(seq)) {
    return seq[Symbol.iterator]();
  } else if (Array.isArray(seq) ||
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _isArrayLike[
  /*istanbul ignore next*/
  "default"])(seq)) {
    return (
      /*istanbul ignore next*/

      /*#__PURE__*/
      regeneratorRuntime.mark(function
      /*istanbul ignore next*/
      _callee(seq)
      /*istanbul ignore next*/
      {
        var i, l;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                i = 0, l = seq.length;

              case 1:
                if (!(i < l)) {
                  _context.next = 7;
                  break;
                }

                _context.next = 4;
                return seq[i];

              case 4:
                i++;
                _context.next = 1;
                break;

              case 7:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      })(seq)
    );
  } else {
    throw new TypeError('Unable to convert ' + seq + ' to an iterator');
  }
}