/*global assert */
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testIsIterable = void 0;

var
/*istanbul ignore next*/
_Map = _interopRequireDefault(require("../Map"));

var
/*istanbul ignore next*/
_Set = _interopRequireDefault(require("../Set"));

var
/*istanbul ignore next*/
_isIterable = _interopRequireDefault(require("../isIterable"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var testIsIterable = {
  'Maps are iterable': function
  /*istanbul ignore next*/
  MapsAreIterable() {
    assert(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _isIterable[
    /*istanbul ignore next*/
    "default"])(new
    /*istanbul ignore next*/
    _Map[
    /*istanbul ignore next*/
    "default"]()));
  },
  'Sets are iterable': function
  /*istanbul ignore next*/
  SetsAreIterable() {
    assert(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _isIterable[
    /*istanbul ignore next*/
    "default"])(new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]()));
  }
};

/*istanbul ignore next*/
exports.testIsIterable = testIsIterable;