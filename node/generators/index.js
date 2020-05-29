'use strict';

/*istanbul ignore next*/ function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  classic: true,
  degreeSequence: true,
  randomGraphs: true,
  small: true,
  social: true
};
exports.social = exports.small = exports.randomGraphs = exports.degreeSequence = exports.classic = void 0;

var
/*istanbul ignore next*/
classic = _interopRequireWildcard(require("./classic"));

/*istanbul ignore next*/
exports.classic = classic;

/*istanbul ignore next*/
Object.keys(classic).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return classic[key];
    }
  });
});

var
/*istanbul ignore next*/
degreeSequence = _interopRequireWildcard(require("./degreeSequence"));

/*istanbul ignore next*/
exports.degreeSequence = degreeSequence;

/*istanbul ignore next*/
Object.keys(degreeSequence).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return degreeSequence[key];
    }
  });
});

var
/*istanbul ignore next*/
randomGraphs = _interopRequireWildcard(require("./randomGraphs"));

/*istanbul ignore next*/
exports.randomGraphs = randomGraphs;

/*istanbul ignore next*/
Object.keys(randomGraphs).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return randomGraphs[key];
    }
  });
});

var
/*istanbul ignore next*/
small = _interopRequireWildcard(require("./small"));

/*istanbul ignore next*/
exports.small = small;

/*istanbul ignore next*/
Object.keys(small).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return small[key];
    }
  });
});

var
/*istanbul ignore next*/
social = _interopRequireWildcard(require("./social"));

/*istanbul ignore next*/
exports.social = social;

/*istanbul ignore next*/
Object.keys(social).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return social[key];
    }
  });
});

/*istanbul ignore next*/ function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }