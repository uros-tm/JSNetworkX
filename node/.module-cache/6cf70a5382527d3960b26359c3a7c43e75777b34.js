'use strict';

/*istanbul ignore next*/
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

/*istanbul ignore next*/ function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }