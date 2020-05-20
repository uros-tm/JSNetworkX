/*istanbul ignore next*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testSize = void 0;

var
/*istanbul ignore next*/
_size = _interopRequireDefault(require("../size"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*jshint strict:false, node:true*/

/*global assert */
var testSize = {
  'of array': function
  /*istanbul ignore next*/
  ofArray() {
    var data = [1, 2, 3];
    assert.equal(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _size[
    /*istanbul ignore next*/
    "default"])(data), data.length);
  },
  'of array-like object': function
  /*istanbul ignore next*/
  ofArrayLikeObject() {
    var obj = {
      length: 10
    };
    assert.equal(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _size[
    /*istanbul ignore next*/
    "default"])(obj), obj.length);
  },
  'of string': function
  /*istanbul ignore next*/
  ofString() {
    var str = 'foobar';
    assert.equal(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _size[
    /*istanbul ignore next*/
    "default"])(str), str.length);
  },
  'of object (number of properties)': function
  /*istanbul ignore next*/
  ofObjectNumberOfProperties() {
    var obj = {
      foo: 42,
      bar: 42
    };
    assert.equal(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _size[
    /*istanbul ignore next*/
    "default"])(obj), Object.keys(obj).length);
  },
  'of graph': false //TODO

};

/*istanbul ignore next*/
exports.testSize = testSize;