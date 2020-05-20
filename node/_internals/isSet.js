'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isSet;

var
/*istanbul ignore next*/
_Set = _interopRequireDefault(require("./Set"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Tests whether the value is a Map.
 *
 * @param {*} v The value to test
 * @return {bool}
 */
function isSet(v) {
  return v instanceof
  /*istanbul ignore next*/
  _Set[
  /*istanbul ignore next*/
  "default"];
}