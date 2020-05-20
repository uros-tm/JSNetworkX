'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = toObjectFromKV;

var
/*istanbul ignore next*/
_forEach = _interopRequireDefault(require("./forEach"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Returns an object, given a container of (key, value) tuples.
 *
 * @param {Iterable} kvs Container of key,value tuples
 *
 * @return {!Object}
 */
function toObjectFromKV(kvs) {
  var obj = {};

  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _forEach[
  /*istanbul ignore next*/
  "default"])(kvs, function (kv) {
    obj[kv[0]] = kv[1];
  });
  return obj;
}