/*global utils, assert*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testGenPermutations = void 0;

var
/*istanbul ignore next*/
_genPermutations = _interopRequireDefault(require("../genPermutations"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var testGenPermutations = {
  permutations: function
  /*istanbul ignore next*/
  permutations() {
    var permutations =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _genPermutations[
    /*istanbul ignore next*/
    "default"])([0, 1, 2]);
    assert(utils.isIterator(permutations));
    assert.deepEqual(Array.from(permutations), [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]]);
  },
  'permutations size < elements': function
  /*istanbul ignore next*/
  permutationsSizeElements() {
    var permutations =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _genPermutations[
    /*istanbul ignore next*/
    "default"])([0, 1, 2], 2);
    assert(utils.isIterator(permutations));
    assert.deepEqual(Array.from(permutations), [[0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]]);
  },
  'permutations size > elements': function
  /*istanbul ignore next*/
  permutationsSizeElements() {
    var permutations =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _genPermutations[
    /*istanbul ignore next*/
    "default"])([0, 1, 2, 3], 5);
    assert(utils.isIterator(permutations));
    assert.deepEqual(Array.from(permutations), []);
  },
  'empty sequence': function
  /*istanbul ignore next*/
  emptySequence() {
    var permutations =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _genPermutations[
    /*istanbul ignore next*/
    "default"])([]);
    assert(utils.isIterator(permutations));
    assert.deepEqual(Array.from(permutations), [[]]);
  }
};

/*istanbul ignore next*/
exports.testGenPermutations = testGenPermutations;