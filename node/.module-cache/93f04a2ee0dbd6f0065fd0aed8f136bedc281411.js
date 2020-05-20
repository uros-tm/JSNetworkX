/*global assert, sinon */

/*eslint camelcase:0*/
'use strict';

/*istanbul ignore next*/
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

/*istanbul ignore next*/ function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

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