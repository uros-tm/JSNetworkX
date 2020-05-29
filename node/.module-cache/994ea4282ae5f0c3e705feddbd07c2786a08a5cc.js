'use strict';

/*istanbul ignore next*/ function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  centrality: true,
  clique: true,
  cluster: true,
  dag: true,
  graphical: true,
  isomorphism: true,
  operators: true,
  shortestPaths: true
};
exports.shortestPaths = exports.operators = exports.isomorphism = exports.graphical = exports.dag = exports.cluster = exports.clique = exports.centrality = void 0;

var
/*istanbul ignore next*/
centrality = _interopRequireWildcard(require("./centrality"));

/*istanbul ignore next*/
exports.centrality = centrality;

/*istanbul ignore next*/
Object.keys(centrality).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return centrality[key];
    }
  });
});

var
/*istanbul ignore next*/
clique = _interopRequireWildcard(require("./clique"));

/*istanbul ignore next*/
exports.clique = clique;

/*istanbul ignore next*/
Object.keys(clique).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return clique[key];
    }
  });
});

var
/*istanbul ignore next*/
cluster = _interopRequireWildcard(require("./cluster"));

/*istanbul ignore next*/
exports.cluster = cluster;

/*istanbul ignore next*/
Object.keys(cluster).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return cluster[key];
    }
  });
});

var
/*istanbul ignore next*/
dag = _interopRequireWildcard(require("./dag"));

/*istanbul ignore next*/
exports.dag = dag;

/*istanbul ignore next*/
Object.keys(dag).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return dag[key];
    }
  });
});

var
/*istanbul ignore next*/
graphical = _interopRequireWildcard(require("./graphical"));

/*istanbul ignore next*/
exports.graphical = graphical;

/*istanbul ignore next*/
Object.keys(graphical).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return graphical[key];
    }
  });
});

var
/*istanbul ignore next*/
isomorphism = _interopRequireWildcard(require("./isomorphism"));

/*istanbul ignore next*/
exports.isomorphism = isomorphism;

/*istanbul ignore next*/
Object.keys(isomorphism).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return isomorphism[key];
    }
  });
});

var
/*istanbul ignore next*/
operators = _interopRequireWildcard(require("./operators"));

/*istanbul ignore next*/
exports.operators = operators;

/*istanbul ignore next*/
Object.keys(operators).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return operators[key];
    }
  });
});

var
/*istanbul ignore next*/
shortestPaths = _interopRequireWildcard(require("./shortestPaths"));

/*istanbul ignore next*/
exports.shortestPaths = shortestPaths;

/*istanbul ignore next*/
Object.keys(shortestPaths).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return shortestPaths[key];
    }
  });
});

/*istanbul ignore next*/ function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }