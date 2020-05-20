'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = max;

var
/*istanbul ignore next*/
_forEach = _interopRequireDefault(require("./forEach"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Returns the maximum value from an iterable. It uses the optional callback
 * function to determine the value to compare.
 *
 * @param {Iterable} iterable
 * @param {function(?): ?} map
 * @return {?}
 */
function max(iterable, map) {
  var maxComparisonValue = -Infinity;
  var maxValue;

  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _forEach[
  /*istanbul ignore next*/
  "default"])(iterable, function (value) {
    var comparisonValue = map ? map(value) : value;

    if (comparisonValue > maxComparisonValue) {
      maxComparisonValue = comparisonValue;
      maxValue = value;
    }
  });
  return maxValue;
}