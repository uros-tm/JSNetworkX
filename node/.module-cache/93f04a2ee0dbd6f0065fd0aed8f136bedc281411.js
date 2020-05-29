/*global assert, sinon */

/*eslint camelcase:0*/
'use strict';

/*istanbul ignore next*/ function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testDelegate = void 0;

var
/*istanbul ignore next*/
_delegate = _interopRequireDefault(require("../delegate"));

var
/*istanbul ignore next*/
jsnx = _interopRequireWildcard(require("../../"));

var
/*istanbul ignore next*/
_child_process = _interopRequireDefault(require("child_process"));

/*istanbul ignore next*/ function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var testDelegate = {
  beforeEach: function
  /*istanbul ignore next*/
  beforeEach() {
    this.origSpawn =
    /*istanbul ignore next*/
    _child_process[
    /*istanbul ignore next*/
    "default"].spawn;
    this.spy =
    /*istanbul ignore next*/
    _child_process[
    /*istanbul ignore next*/
    "default"].spawn = sinon.spy();
  },
  afterEach: function
  /*istanbul ignore next*/
  afterEach() {
    /*istanbul ignore next*/
    _child_process[
    /*istanbul ignore next*/
    "default"].spawn = this.origSpawn;
  },
  'it returns a promise': function
  /*istanbul ignore next*/
  itReturnsAPromise() {
    var promise =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _delegate[
    /*istanbul ignore next*/
    "default"])('testFunction');
    return assert.isFunction(promise.then);
  }
};

/*istanbul ignore next*/
exports.testDelegate = testDelegate;