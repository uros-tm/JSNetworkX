/*global assert*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testGenRange = void 0;

var
/*istanbul ignore next*/
_ = require("../");

var testGenRange = {
  'end': function
  /*istanbul ignore next*/
  end() {
    var range =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    genRange)(5);
    assert(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    isIterator)(range));
    assert.deepEqual(Array.from(range), [0, 1, 2, 3, 4]);
  },
  'start - end': function
  /*istanbul ignore next*/
  startEnd() {
    var range =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    genRange)(5, 10);
    assert(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    isIterator)(range));
    assert.deepEqual(Array.from(range), [5, 6, 7, 8, 9]);
  },
  'start - end - step': function
  /*istanbul ignore next*/
  startEndStep() {
    var range =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    genRange)(0, 10, 2);
    assert(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    isIterator)(range));
    assert.deepEqual(Array.from(range), [0, 2, 4, 6, 8]);
  },
  'no arguments': function
  /*istanbul ignore next*/
  noArguments() {
    var range =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    genRange)();
    assert(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    isIterator)(range));
    assert.deepEqual(Array.from(range), []);
  },
  'negative step': function
  /*istanbul ignore next*/
  negativeStep() {
    var range =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    genRange)(10, 5, -1);
    assert(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    isIterator)(range));
    assert.deepEqual(Array.from(range), [10, 9, 8, 7, 6]);
  }
};

/*istanbul ignore next*/
exports.testGenRange = testGenRange;