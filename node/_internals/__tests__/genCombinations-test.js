/*global utils, assert*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testGenCombinations = void 0;

var
/*istanbul ignore next*/
_genCombinations = _interopRequireDefault(require("../genCombinations"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var testGenCombinations = {
  combinations: function
  /*istanbul ignore next*/
  combinations() {
    var combinations =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _genCombinations[
    /*istanbul ignore next*/
    "default"])([0, 1, 2, 3], 3);
    assert(utils.isIterator(combinations));
    assert.deepEqual(Array.from(combinations), [[0, 1, 2], [0, 1, 3], [0, 2, 3], [1, 2, 3]]);
  },
  'combinations size > elements': function
  /*istanbul ignore next*/
  combinationsSizeElements() {
    var combinations =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _genCombinations[
    /*istanbul ignore next*/
    "default"])([0, 1, 2, 3], 10);
    assert(utils.isIterator(combinations));
    assert.deepEqual(Array.from(combinations), []);
  },
  'empty sequence': function
  /*istanbul ignore next*/
  emptySequence() {
    var combinations =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _genCombinations[
    /*istanbul ignore next*/
    "default"])([], 2);
    assert(utils.isIterator(combinations));
    assert.deepEqual(Array.from(combinations), []);
  }
};

/*istanbul ignore next*/
exports.testGenCombinations = testGenCombinations;