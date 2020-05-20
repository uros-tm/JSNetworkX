'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var
/*istanbul ignore next*/
_JSNetworkXUnfeasible2 = _interopRequireDefault(require("./JSNetworkXUnfeasible"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Exception for algorithms that should return a path when running
 * on graphs where such a path does not exist.
 */
var JSNetworkXNoPath =
/*#__PURE__*/
function (_JSNetworkXUnfeasible) {
  _inherits(JSNetworkXNoPath, _JSNetworkXUnfeasible);

  function
  /*istanbul ignore next*/
  JSNetworkXNoPath(message) {
    /*istanbul ignore next*/
    var _this;

    _classCallCheck(this, JSNetworkXNoPath);

    /*istanbul ignore next*/
    _this = _possibleConstructorReturn(this, _getPrototypeOf(JSNetworkXNoPath).call(this, message));

    /*istanbul ignore next*/
    _this.name = 'JSNetworkXNoPath';

    /*istanbul ignore next*/
    return _this;
  }

  return JSNetworkXNoPath;
}(
/*istanbul ignore next*/
_JSNetworkXUnfeasible2[
/*istanbul ignore next*/
"default"]);

/*istanbul ignore next*/
exports["default"] = JSNetworkXNoPath;