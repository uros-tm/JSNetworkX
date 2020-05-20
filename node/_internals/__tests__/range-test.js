/*global assert*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testRange = void 0;

var
/*istanbul ignore next*/
_range = _interopRequireDefault(require("../range"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var testRange = {
  'end': function
  /*istanbul ignore next*/
  end() {
    var r =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _range[
    /*istanbul ignore next*/
    "default"])(5);
    assert.deepEqual(r, [0, 1, 2, 3, 4]);
  },
  'start - end': function
  /*istanbul ignore next*/
  startEnd() {
    var r =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _range[
    /*istanbul ignore next*/
    "default"])(5, 10);
    assert.deepEqual(r, [5, 6, 7, 8, 9]);
  },
  'start - end - step': function
  /*istanbul ignore next*/
  startEndStep() {
    var r =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _range[
    /*istanbul ignore next*/
    "default"])(0, 10, 2);
    assert.deepEqual(r, [0, 2, 4, 6, 8]);
  },
  'no arguments': function
  /*istanbul ignore next*/
  noArguments() {
    var r =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _range[
    /*istanbul ignore next*/
    "default"])();
    assert.deepEqual(r, []);
  },
  'negative step': function
  /*istanbul ignore next*/
  negativeStep() {
    var r =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _range[
    /*istanbul ignore next*/
    "default"])(10, 5, -1);
    assert.deepEqual(r, [10, 9, 8, 7, 6]);
  }
};

/*istanbul ignore next*/
exports.testRange = testRange;