/*global assert*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testToObjectFromKV = void 0;

var
/*istanbul ignore next*/
_toObjectFromKV = _interopRequireDefault(require("../toObjectFromKV"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var testToObjectFromKV = {
  'generate object from array of pairs': function
  /*istanbul ignore next*/
  generateObjectFromArrayOfPairs() {
    var obj =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _toObjectFromKV[
    /*istanbul ignore next*/
    "default"])([['foo', 5], [10, [1, 2]]]);
    assert.deepEqual(obj, {
      foo: 5,
      10: [1, 2]
    });
  },
  'generate empty object from empty array': function
  /*istanbul ignore next*/
  generateEmptyObjectFromEmptyArray() {
    var obj =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _toObjectFromKV[
    /*istanbul ignore next*/
    "default"])([]);
    assert.deepEqual(obj, {});
  }
};

/*istanbul ignore next*/
exports.testToObjectFromKV = testToObjectFromKV;