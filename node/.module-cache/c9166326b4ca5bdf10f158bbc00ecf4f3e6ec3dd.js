/*global assert */
'use strict';
/*jshint ignore:start*/

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testToMapFromKeys = void 0;

var
/*istanbul ignore next*/
_Map = _interopRequireDefault(require("../Map"));

var
/*istanbul ignore next*/
_toMapFromKeys = _interopRequireDefault(require("../toMapFromKeys"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*jshint ignore:end*/
var testToMapFromKeys = {
  'without default value (null)': function
  /*istanbul ignore next*/
  withoutDefaultValueNull() {
    var keys = ['foo', 'bar', 'baz'];
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _toMapFromKeys[
    /*istanbul ignore next*/
    "default"])(keys), new
    /*istanbul ignore next*/
    _Map[
    /*istanbul ignore next*/
    "default"]({
      foo: null,
      bar: null,
      baz: null
    }));
  },
  'with default value': function
  /*istanbul ignore next*/
  withDefaultValue() {
    var keys = ['foo', 'bar', 'baz'];
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _toMapFromKeys[
    /*istanbul ignore next*/
    "default"])(keys, 42), new
    /*istanbul ignore next*/
    _Map[
    /*istanbul ignore next*/
    "default"]({
      foo: 42,
      bar: 42,
      baz: 42
    }));
  }
};

/*istanbul ignore next*/
exports.testToMapFromKeys = testToMapFromKeys;