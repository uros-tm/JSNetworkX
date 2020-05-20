/*globals assert*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testGcd = void 0;

var
/*istanbul ignore next*/
_gcd = _interopRequireDefault(require("../gcd"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var testGcd = function testGcd() {
  assert.strictEqual(
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _gcd[
  /*istanbul ignore next*/
  "default"])(48, 18), 6);
  assert.strictEqual(
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _gcd[
  /*istanbul ignore next*/
  "default"])(54, 24), 6);
  assert.strictEqual(
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _gcd[
  /*istanbul ignore next*/
  "default"])(48, 180), 12);
};

/*istanbul ignore next*/
exports.testGcd = testGcd;