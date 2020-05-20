'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = toObjectFromKeys;

var
/*istanbul ignore next*/
_forEach = _interopRequireDefault(require("./forEach"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Returns an object, given an array of keys and an default value.
 * Like dict.fromkeys in Python.
 *
 * @param {Iterable} keys Container of keys
 * @param {*} optValue the value, default is null
 * @return {!Object}
 */
function toObjectFromKeys(keys) {
  /*istanbul ignore next*/
  var optValue = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
  var result = {};

  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _forEach[
  /*istanbul ignore next*/
  "default"])(keys, function (key) {
    result[key] = optValue;
  });
  return result;
}