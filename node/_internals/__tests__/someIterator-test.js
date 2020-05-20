/*globals assert, utils*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testSomeIterator = void 0;

var
/*istanbul ignore next*/
_someIterator = _interopRequireDefault(require("../someIterator"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var testSomeIterator = function testSomeIterator() {
  assert.ok(
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _someIterator[
  /*istanbul ignore next*/
  "default"])(utils.genRange(10), function (x)
  /*istanbul ignore next*/
  {
    return x % 2 === 0;
  }));
  assert.ok(!
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _someIterator[
  /*istanbul ignore next*/
  "default"])(utils.genRange(3), function (x)
  /*istanbul ignore next*/
  {
    return x === 5;
  }));
  assert.ok(!
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _someIterator[
  /*istanbul ignore next*/
  "default"])(utils.genRange(0), function ()
  /*istanbul ignore next*/
  {
    return true;
  }));
};

/*istanbul ignore next*/
exports.testSomeIterator = testSomeIterator;