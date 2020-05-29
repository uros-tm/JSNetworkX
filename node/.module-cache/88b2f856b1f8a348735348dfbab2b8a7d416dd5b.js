'use strict';

/*istanbul ignore next*/ function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

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

/*istanbul ignore next*/ function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }