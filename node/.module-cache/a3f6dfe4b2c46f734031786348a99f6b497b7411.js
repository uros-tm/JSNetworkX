'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = toMapFromKeys;

var
/*istanbul ignore next*/
_Map = _interopRequireDefault(require("./Map"));

var
/*istanbul ignore next*/
_forEach = _interopRequireDefault(require("./forEach"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Same as 'toObjectFromKeys' but returns a Map instead of an object.
 *
 * @param {Iterable} keys Container of keys
 * @param {*} opt_value the value, default is null
 *
 * @return {!Map}
 */
function toMapFromKeys(keys, optValue) {
  if (optValue == null) {
    // && opt_value == undefined
    optValue = null;
  }

  var result = new
  /*istanbul ignore next*/
  _Map[
  /*istanbul ignore next*/
  "default"]();

  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _forEach[
  /*istanbul ignore next*/
  "default"])(keys, function (key) {
    result.set(key, optValue);
  });
  return result;
}