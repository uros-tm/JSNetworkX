/*istanbul ignore next*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testIsArrayLike = void 0;

var
/*istanbul ignore next*/
_isArrayLike = _interopRequireDefault(require("../isArrayLike"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*jshint strict:false, node:true*/

/*global assert */
var testIsArrayLike = {
  'arrays': function
  /*istanbul ignore next*/
  arrays() {
    var data = [1, 2, 3];
    assert(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _isArrayLike[
    /*istanbul ignore next*/
    "default"])(data));
  },
  'objects with a numeric length property': function
  /*istanbul ignore next*/
  objectsWithANumericLengthProperty() {
    var obj = {
      length: 3
    };
    assert(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _isArrayLike[
    /*istanbul ignore next*/
    "default"])(obj));
  },
  'not objects with a non-numeric length property': function
  /*istanbul ignore next*/
  notObjectsWithANonNumericLengthProperty() {
    var obj = {
      length: 'foo'
    };
    assert(!
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _isArrayLike[
    /*istanbul ignore next*/
    "default"])(obj));
  },
  'not strings': function
  /*istanbul ignore next*/
  notStrings() {
    assert(!
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _isArrayLike[
    /*istanbul ignore next*/
    "default"])('foo'));
  },
  'not functions': function
  /*istanbul ignore next*/
  notFunctions() {
    assert(!
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _isArrayLike[
    /*istanbul ignore next*/
    "default"])(function () {}));
  }
};

/*istanbul ignore next*/
exports.testIsArrayLike = testIsArrayLike;