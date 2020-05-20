'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  betweenness: true,
  eigenvector: true
};
exports.eigenvector = exports.betweenness = void 0;

var
/*istanbul ignore next*/
betweenness = _interopRequireWildcard(require("./betweenness"));

/*istanbul ignore next*/
exports.betweenness = betweenness;

/*istanbul ignore next*/
Object.keys(betweenness).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return betweenness[key];
    }
  });
});

var
/*istanbul ignore next*/
eigenvector = _interopRequireWildcard(require("./eigenvector"));

/*istanbul ignore next*/
exports.eigenvector = eigenvector;

/*istanbul ignore next*/
Object.keys(eigenvector).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return eigenvector[key];
    }
  });
});

/*istanbul ignore next*/ function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }