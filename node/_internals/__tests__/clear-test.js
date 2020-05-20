/*istanbul ignore next*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testClear = void 0;

var
/*istanbul ignore next*/
_clear = _interopRequireDefault(require("../clear"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*jshint strict:false, node:true*/

/*global assert */
var testClear = {
  'emptys object': function
  /*istanbul ignore next*/
  emptysObject() {
    var obj = {
      foo: 1,
      bar: 2
    };

    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _clear[
    /*istanbul ignore next*/
    "default"])(obj);
    assert.deepEqual(obj, {});
  },
  'only removes own properties': function
  /*istanbul ignore next*/
  onlyRemovesOwnProperties() {
    var proto = {
      foo: 'bar'
    };
    var obj = Object.create(proto);

    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _clear[
    /*istanbul ignore next*/
    "default"])(obj);
    assert.property(obj, 'foo');
  }
};

/*istanbul ignore next*/
exports.testClear = testClear;