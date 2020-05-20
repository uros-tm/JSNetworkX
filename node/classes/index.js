'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  Graph: true,
  DiGraph: true,
  MultiGraph: true,
  MultiDiGraph: true,
  functions: true
};
Object.defineProperty(exports, "Graph", {
  enumerable: true,
  get: function get() {
    return _Graph["default"];
  }
});
Object.defineProperty(exports, "DiGraph", {
  enumerable: true,
  get: function get() {
    return _DiGraph["default"];
  }
});
Object.defineProperty(exports, "MultiGraph", {
  enumerable: true,
  get: function get() {
    return _MultiGraph["default"];
  }
});
Object.defineProperty(exports, "MultiDiGraph", {
  enumerable: true,
  get: function get() {
    return _MultiDiGraph["default"];
  }
});
exports.functions = void 0;

var
/*istanbul ignore next*/
_Graph = _interopRequireDefault(require("./Graph"));

var
/*istanbul ignore next*/
_DiGraph = _interopRequireDefault(require("./DiGraph"));

var
/*istanbul ignore next*/
_MultiGraph = _interopRequireDefault(require("./MultiGraph"));

var
/*istanbul ignore next*/
_MultiDiGraph = _interopRequireDefault(require("./MultiDiGraph"));

var
/*istanbul ignore next*/
functions = _interopRequireWildcard(require("./functions"));

/*istanbul ignore next*/
exports.functions = functions;

/*istanbul ignore next*/
Object.keys(functions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return functions[key];
    }
  });
});

/*istanbul ignore next*/ function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }