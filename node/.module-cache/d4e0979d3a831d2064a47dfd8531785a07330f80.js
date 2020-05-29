'use strict';

/*istanbul ignore next*/ function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  toArray: true,
  algorithms: true,
  classes: true,
  convert: true,
  drawing: true,
  exceptions: true,
  generators: true,
  relabel: true,
  Map: true,
  Set: true,
  forEach: true
};
Object.defineProperty(exports, "Map", {
  enumerable: true,
  get: function get() {
    return _Map["default"];
  }
});
Object.defineProperty(exports, "Set", {
  enumerable: true,
  get: function get() {
    return _Set["default"];
  }
});
Object.defineProperty(exports, "forEach", {
  enumerable: true,
  get: function get() {
    return _forEach["default"];
  }
});
exports.relabel = exports.generators = exports.exceptions = exports.drawing = exports.convert = exports.classes = exports.algorithms = exports.toArray = void 0;

var
/*istanbul ignore next*/
algorithms = _interopRequireWildcard(require("./algorithms"));

/*istanbul ignore next*/
exports.algorithms = algorithms;

/*istanbul ignore next*/
Object.keys(algorithms).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return algorithms[key];
    }
  });
});

var
/*istanbul ignore next*/
classes = _interopRequireWildcard(require("./classes"));

/*istanbul ignore next*/
exports.classes = classes;

/*istanbul ignore next*/
Object.keys(classes).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return classes[key];
    }
  });
});

var
/*istanbul ignore next*/
convert = _interopRequireWildcard(require("./convert"));

/*istanbul ignore next*/
exports.convert = convert;

/*istanbul ignore next*/
Object.keys(convert).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return convert[key];
    }
  });
});

var
/*istanbul ignore next*/
drawing = _interopRequireWildcard(require("./drawing"));

/*istanbul ignore next*/
exports.drawing = drawing;

/*istanbul ignore next*/
Object.keys(drawing).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return drawing[key];
    }
  });
});

var
/*istanbul ignore next*/
exceptions = _interopRequireWildcard(require("./exceptions"));

/*istanbul ignore next*/
exports.exceptions = exceptions;

/*istanbul ignore next*/
Object.keys(exceptions).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return exceptions[key];
    }
  });
});

var
/*istanbul ignore next*/
generators = _interopRequireWildcard(require("./generators"));

/*istanbul ignore next*/
exports.generators = generators;

/*istanbul ignore next*/
Object.keys(generators).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return generators[key];
    }
  });
});

var
/*istanbul ignore next*/
relabel = _interopRequireWildcard(require("./relabel"));

/*istanbul ignore next*/
exports.relabel = relabel;

/*istanbul ignore next*/
Object.keys(relabel).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return relabel[key];
    }
  });
});

var
/*istanbul ignore next*/
_Map = _interopRequireDefault(require("./_internals/Map"));

var
/*istanbul ignore next*/
_Set = _interopRequireDefault(require("./_internals/Set"));

var
/*istanbul ignore next*/
_forEach = _interopRequireDefault(require("./_internals/forEach"));

var
/*istanbul ignore next*/
_observer = require("./contrib/observer");

/*istanbul ignore next*/
Object.keys(_observer).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _observer[key];
    }
  });
});

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var toArray = Array.from;

/*istanbul ignore next*/
exports.toArray = toArray;