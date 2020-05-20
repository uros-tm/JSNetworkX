'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var
/*istanbul ignore next*/
_tinySprintf = _interopRequireDefault(require("tiny-sprintf"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var undef;

/*istanbul ignore next*/
_tinySprintf[
/*istanbul ignore next*/
"default"].j = function (value) {
  if (value === undef) {
    return undef + '';
  }

  try {
    return JSON.stringify(value);
  } catch (e) {
    return value + '';
  }
};

/*istanbul ignore next*/
var _default =
/*istanbul ignore next*/
_tinySprintf[
/*istanbul ignore next*/
"default"];

/*istanbul ignore next*/
exports["default"] = _default;