/*global assert */
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testDeepcopy = void 0;

var
/*istanbul ignore next*/
_deepcopy = _interopRequireDefault(require("../deepcopy"));

var
/*istanbul ignore next*/
_Map = _interopRequireDefault(require("../Map"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var testDeepcopy = {
  'it deep copies normal objects and arrays': function
  /*istanbul ignore next*/
  itDeepCopiesNormalObjectsAndArrays() {
    var foo = [1, 2];
    var obj = {
      foo: foo,
      bar: ['bar', foo]
    };
    var copy =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _deepcopy[
    /*istanbul ignore next*/
    "default"])(obj);
    assert.deepEqualIdent(copy, obj);
  },
  'it deep copies maps': function
  /*istanbul ignore next*/
  itDeepCopiesMaps() {
    var foo = [1, 2, 3];
    var bar = new
    /*istanbul ignore next*/
    _Map[
    /*istanbul ignore next*/
    "default"]([[1, foo], [2, foo]]);
    var map = new
    /*istanbul ignore next*/
    _Map[
    /*istanbul ignore next*/
    "default"]([[1, foo], [2, bar]]);
    var copy =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _deepcopy[
    /*istanbul ignore next*/
    "default"])(map);
    assert.notEqual(map, copy);
    assert.strictEqual(map.get(1), map.get(2).get(1));
  }
};

/*istanbul ignore next*/
exports.testDeepcopy = testDeepcopy;