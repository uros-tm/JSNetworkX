'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
var _exportNames = {
  generic: true,
  unweighted: true,
  weighted: true
};
exports.weighted = exports.unweighted = exports.generic = void 0;

var
/*istanbul ignore next*/
generic = _interopRequireWildcard(require("./generic"));

/*istanbul ignore next*/
exports.generic = generic;

/*istanbul ignore next*/
Object.keys(generic).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return generic[key];
    }
  });
});

var
/*istanbul ignore next*/
unweighted = _interopRequireWildcard(require("./unweighted"));

/*istanbul ignore next*/
exports.unweighted = unweighted;

/*istanbul ignore next*/
Object.keys(unweighted).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return unweighted[key];
    }
  });
});

var
/*istanbul ignore next*/
weighted = _interopRequireWildcard(require("./weighted"));

/*istanbul ignore next*/
exports.weighted = weighted;

/*istanbul ignore next*/
Object.keys(weighted).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  if (Object.prototype.hasOwnProperty.call(_exportNames, key)) return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return weighted[key];
    }
  });
});

/*istanbul ignore next*/ function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }