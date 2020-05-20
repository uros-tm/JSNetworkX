/*jshint latedef:false*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = deepcopy;

var
/*istanbul ignore next*/
_clone = _interopRequireDefault(require("lodash/clone"));

var
/*istanbul ignore next*/
_isGraph = _interopRequireDefault(require("./isGraph"));

var
/*istanbul ignore next*/
_isMap = _interopRequireDefault(require("./isMap"));

var
/*istanbul ignore next*/
_isSet = _interopRequireDefault(require("./isSet"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function deepcopyInstance(obj, stackA, stackB) {
  // temporary constructor, we don't know if the original expects
  // parameter

  /**
   * @constructor
   */
  var T_ = function T_() {};

  T_.prototype = obj.constructor.prototype;
  var ownProps = {};
  var prop;
  var instance; // collect instance properties

  for (prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      ownProps[prop] = obj[prop];
    }
  } // deepcopy them


  ownProps = deepcopyImplementation(ownProps, stackA, stackB); // create a new instance and assign properties

  instance = new T_();

  for (prop in ownProps) {
    instance[prop] = ownProps[prop];
  }

  return instance;
}

function deepcopyImplementation(value, stackA, stackB) {
  return (
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _clone[
    /*istanbul ignore next*/
    "default"])(value, true, function (v) {
      if (
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _isMap[
      /*istanbul ignore next*/
      "default"])(v) ||
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _isSet[
      /*istanbul ignore next*/
      "default"])(v) ||
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _isGraph[
      /*istanbul ignore next*/
      "default"])(v)) {
        var copy = deepcopyInstance(v, stackA, stackB);
        stackA.push(v);
        stackB.push(copy);
        return copy;
      }
    }, null, null, stackA, stackB)
  );
}
/**
 * Creates a deep copy of the value, also of maps and sets.
 *
 * @param {*} value The value to be cloned
 * @return {?}
 */


function deepcopy(value) {
  return deepcopyImplementation(value, [], []);
}