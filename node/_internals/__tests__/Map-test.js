/*istanbul ignore next*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testMap = void 0;

var
/*istanbul ignore next*/
_Map = _interopRequireDefault(require("../Map"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*global utils, assert, regeneratorRuntime*/
var toIterator = utils.toIterator;
var testMap = {
  beforeEach: function
  /*istanbul ignore next*/
  beforeEach() {
    this.map = new
    /*istanbul ignore next*/
    _Map[
    /*istanbul ignore next*/
    "default"]();
    this.map.set('0', 0);
    this.map.set('1', 1);
    this.map.set('2', 2);
  },
  'new Map()': {
    'no data': function
    /*istanbul ignore next*/
    noData() {
      assert.equal(new
      /*istanbul ignore next*/
      _Map[
      /*istanbul ignore next*/
      "default"]().size, 0, 'Empty constructor');
    },
    'from array of pairs': function
    /*istanbul ignore next*/
    fromArrayOfPairs() {
      var data = [[1, 2], [3, 4], [5, 6]];
      var map = new
      /*istanbul ignore next*/
      _Map[
      /*istanbul ignore next*/
      "default"](data);
      assert.equal(map.size, 3);
      assert.equal(map.get(1), 2);
      assert.equal(map.get(3), 4);
      assert.equal(map.get(5), 6);
    },
    'from iterator': function
    /*istanbul ignore next*/
    fromIterator() {
      var data = [[1, 2], [3, 4], [5, 6]];
      var iter = toIterator(data);
      var map = new
      /*istanbul ignore next*/
      _Map[
      /*istanbul ignore next*/
      "default"](iter);
      assert.equal(map.size, 3);
      assert.equal(map.get(1), 2);
      assert.equal(map.get(3), 4);
      assert.equal(map.get(5), 6);
    },
    'from object': function
    /*istanbul ignore next*/
    fromObject() {
      var data = {
        1: 2,
        3: 4
      };
      var map = new
      /*istanbul ignore next*/
      _Map[
      /*istanbul ignore next*/
      "default"](data);
      assert.equal(map.size, 2);
      assert.equal(map.get(1), 2);
      assert.equal(map.get(3), 4);
    }
  },
  '#set() && #get()': {
    'integer keys': function
    /*istanbul ignore next*/
    integerKeys() {
      var map = new
      /*istanbul ignore next*/
      _Map[
      /*istanbul ignore next*/
      "default"]();
      map.set(0, 1);
      map.set(1, 2);
      assert.strictEqual(map.get(0), 1);
      assert.strictEqual(map.get(1), 2);
    },
    'string keys': function
    /*istanbul ignore next*/
    stringKeys() {
      var map = new
      /*istanbul ignore next*/
      _Map[
      /*istanbul ignore next*/
      "default"]();
      map.set('0', 1);
      map.set('1', 2);
      assert.strictEqual(map.get('0'), 1);
      assert.strictEqual(map.get('1'), 2);
    },
    'integers and strings are treated separately': function
    /*istanbul ignore next*/
    integersAndStringsAreTreatedSeparately() {
      var map = new
      /*istanbul ignore next*/
      _Map[
      /*istanbul ignore next*/
      "default"]();
      map.set(0, 1);
      map.set('0', 2);
      assert.strictEqual(map.get(0), 1);
      assert.strictEqual(map.get('0'), 2);
    },
    'arrays of primitive are considered equal': function
    /*istanbul ignore next*/
    arraysOfPrimitiveAreConsideredEqual() {
      var map = new
      /*istanbul ignore next*/
      _Map[
      /*istanbul ignore next*/
      "default"]();
      map.set([1, 2], 1);
      assert.strictEqual(map.get([1, 2]), 1);
    },
    'object keys with same toString result are considered equal': function
    /*istanbul ignore next*/
    objectKeysWithSameToStringResultAreConsideredEqual() {
      var map = new
      /*istanbul ignore next*/
      _Map[
      /*istanbul ignore next*/
      "default"]();
      var obj1 = {
        toString: function
        /*istanbul ignore next*/
        toString() {
          return 'foo';
        }
      };
      var obj2 = {
        toString: function
        /*istanbul ignore next*/
        toString() {
          return 'bar';
        }
      };
      var obj3 = {
        toString: function
        /*istanbul ignore next*/
        toString() {
          return 'bar';
        }
      };
      map.set(obj1, 1);
      map.set(obj2, 2);
      assert.strictEqual(map.get(obj1), 1);
      assert.strictEqual(map.get(obj3), 2);
    }
  },
  '#entries()': function
  /*istanbul ignore next*/
  entries() {
    assert(regeneratorRuntime.isGeneratorFunction(this.map.entries), 'is generator');
    assert.deepEqual(Array.from(this.map.entries()).sort(), [['0', 0], ['1', 1], ['2', 2]]);
  },
  '#keys()': function
  /*istanbul ignore next*/
  keys() {
    assert(regeneratorRuntime.isGeneratorFunction(this.map.keys), 'is generator');
    assert.deepEqual(Array.from(this.map.keys()).sort(), ['0', '1', '2']);
  },
  '#values()': function
  /*istanbul ignore next*/
  values() {
    assert(regeneratorRuntime.isGeneratorFunction(this.map.values), 'is generator');
    assert.deepEqual(Array.from(this.map.values()).sort(), [0, 1, 2]);
  }
};

/*istanbul ignore next*/
exports.testMap = testMap;