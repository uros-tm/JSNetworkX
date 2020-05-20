'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var JSNetworkXException = function
/*istanbul ignore next*/
JSNetworkXException(message) {
  /*istanbul ignore next*/
  _classCallCheck(this, JSNetworkXException);

  this.name = 'JSNetworkXException';
  this.message = message;
};

/*istanbul ignore next*/
exports["default"] = JSNetworkXException;