/*global assert */
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testIsSet = void 0;

var
/*istanbul ignore next*/
_isSet = _interopRequireDefault(require("../isSet"));

var
/*istanbul ignore next*/
_Set = _interopRequireDefault(require("../Set"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var testIsSet = {
  'returns true for sets': function
  /*istanbul ignore next*/
  returnsTrueForSets() {
    assert(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _isSet[
    /*istanbul ignore next*/
    "default"])(new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]()));
  },
  'doesn\'t consider normal objects as Set': function
  /*istanbul ignore next*/
  doesnTConsiderNormalObjectsAsSet() {
    assert(!
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _isSet[
    /*istanbul ignore next*/
    "default"])({}));
  }
};

/*istanbul ignore next*/
exports.testIsSet = testIsSet;