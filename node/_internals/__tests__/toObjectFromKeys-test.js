/*global assert */
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testToObjectFromKeys = void 0;

var
/*istanbul ignore next*/
_toObjectFromKeys = _interopRequireDefault(require("../toObjectFromKeys"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var testToObjectFromKeys = {
  'without default value (null)': function
  /*istanbul ignore next*/
  withoutDefaultValueNull() {
    var keys = ['foo', 'bar', 'baz'];
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _toObjectFromKeys[
    /*istanbul ignore next*/
    "default"])(keys), {
      foo: null,
      bar: null,
      baz: null
    });
  },
  'with default value': function
  /*istanbul ignore next*/
  withDefaultValue() {
    var keys = ['foo', 'bar', 'baz'];
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _toObjectFromKeys[
    /*istanbul ignore next*/
    "default"])(keys, 42), {
      foo: 42,
      bar: 42,
      baz: 42
    });
  }
};

/*istanbul ignore next*/
exports.testToObjectFromKeys = testToObjectFromKeys;