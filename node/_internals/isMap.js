'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = isMap;

var
/*istanbul ignore next*/
_Map = _interopRequireDefault(require("./Map"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Tests whether the value is a Map.
 *
 * @param {*} v The value to test
 * @return {bool}
 */
function isMap(v) {
  return v instanceof
  /*istanbul ignore next*/
  _Map[
  /*istanbul ignore next*/
  "default"];
}