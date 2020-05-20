/*global utils, assert*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testIteritems = void 0;

var
/*istanbul ignore next*/
_iteritems = _interopRequireDefault(require("../iteritems"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var testIteritems = function testIteritems() {
  var obj = {
    foo: 5,
    bar: [1, 2],
    5: 42
  };
  var iter =
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _iteritems[
  /*istanbul ignore next*/
  "default"])(obj);
  assert(utils.isIterator(iter));
  assert.sameMembersDeep(Array.from(iter), [['5', 42], ['bar', [1, 2]], ['foo', 5]]);
};

/*istanbul ignore next*/
exports.testIteritems = testIteritems;