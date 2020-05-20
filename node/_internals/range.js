'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = range;

var
/*istanbul ignore next*/
_genRange = _interopRequireDefault(require("./genRange"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Implements Python's range function, returns an array.
 *
 * If one argument n is passed, iterates over 0...n.
 * If two arguments i,j are passed, iterates over i...j.
 * If three arguments i,j,k are passed, iterates over i, i+k, i+2k, ...j
 *
 * @param {?number=} optStart Number to start from
 * @param {?number=} optEnd Number to count to
 * @param {?number=} optStep Step size
 * @return {!Array}
 */
function range(optStart, optEnd, optStep) {
  return Array.from(
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _genRange[
  /*istanbul ignore next*/
  "default"])(optStart, optEnd, optStep));
}