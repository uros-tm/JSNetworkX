/*global assert*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testNodesAreEqual = void 0;

var
/*istanbul ignore next*/
_nodesAreEqual = _interopRequireDefault(require("../nodesAreEqual"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var testNodesAreEqual = {
  equal: function
  /*istanbul ignore next*/
  equal() {
    assert.ok(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _nodesAreEqual[
    /*istanbul ignore next*/
    "default"])(42, 42));
    assert.ok(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _nodesAreEqual[
    /*istanbul ignore next*/
    "default"])('foo', 'foo'));
    assert.ok(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _nodesAreEqual[
    /*istanbul ignore next*/
    "default"])([1, 2, 3], [1, 2, 3]));
    var foo = {
      toString: function
      /*istanbul ignore next*/
      toString()
      /*istanbul ignore next*/
      {
        return '42';
      }
    };
    var bar = {
      toString: function
      /*istanbul ignore next*/
      toString()
      /*istanbul ignore next*/
      {
        return '42';
      }
    };
    assert.ok(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _nodesAreEqual[
    /*istanbul ignore next*/
    "default"])(foo, bar));
  },
  'not equal': function
  /*istanbul ignore next*/
  notEqual() {
    assert.ok(!
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _nodesAreEqual[
    /*istanbul ignore next*/
    "default"])(1, 2));
    assert.ok(!
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _nodesAreEqual[
    /*istanbul ignore next*/
    "default"])(42, '42'));
  }
};

/*istanbul ignore next*/
exports.testNodesAreEqual = testNodesAreEqual;