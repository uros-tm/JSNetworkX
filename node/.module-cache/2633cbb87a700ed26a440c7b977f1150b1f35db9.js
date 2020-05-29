'use strict';

/*istanbul ignore next*/ function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var
/*istanbul ignore next*/
_WorkerSettings = _interopRequireDefault(require("./WorkerSettings"));

var
/*istanbul ignore next*/
_initializeBrowserWorker = _interopRequireDefault(require("./initializeBrowserWorker"));

var
/*istanbul ignore next*/
jsnx = _interopRequireWildcard(require("./"));

/*istanbul ignore next*/ function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

Object.defineProperty(jsnx, 'workerPath', {
  set: function
  /*istanbul ignore next*/
  set(value) {
    /*istanbul ignore next*/
    _WorkerSettings[
    /*istanbul ignore next*/
    "default"].workerPath = value;
  },
  get: function
  /*istanbul ignore next*/
  get() {
    return (
      /*istanbul ignore next*/
      _WorkerSettings[
      /*istanbul ignore next*/
      "default"].workerPath
    );
  }
});

/*istanbul ignore next*/
_WorkerSettings[
/*istanbul ignore next*/
"default"].methodLookupFunction = function (name)
/*istanbul ignore next*/
{
  return jsnx[name];
};

/*istanbul ignore next*/
(0,
/*istanbul ignore next*/
_initializeBrowserWorker[
/*istanbul ignore next*/
"default"])();

/*istanbul ignore next*/
var _default = jsnx;

/*istanbul ignore next*/
exports["default"] = _default;