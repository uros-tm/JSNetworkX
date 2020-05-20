'use strict';

/*istanbul ignore next*/
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

/*istanbul ignore next*/ function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

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