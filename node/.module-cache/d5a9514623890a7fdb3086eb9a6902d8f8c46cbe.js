/*global assert */
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testIsMap = void 0;

var
/*istanbul ignore next*/
_isMap = _interopRequireDefault(require("../isMap"));

var
/*istanbul ignore next*/
_Map = _interopRequireDefault(require("../Map"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var testIsMap = {
  'returns true for maps': function
  /*istanbul ignore next*/
  returnsTrueForMaps() {
    assert(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _isMap[
    /*istanbul ignore next*/
    "default"])(new
    /*istanbul ignore next*/
    _Map[
    /*istanbul ignore next*/
    "default"]()));
  },
  'doesn\'t consider normal objects as Map': function
  /*istanbul ignore next*/
  doesnTConsiderNormalObjectsAsMap() {
    assert(!
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _isMap[
    /*istanbul ignore next*/
    "default"])({}));
  }
};

/*istanbul ignore next*/
exports.testIsMap = testIsMap;