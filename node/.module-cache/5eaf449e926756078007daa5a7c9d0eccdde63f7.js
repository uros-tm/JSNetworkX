'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = forEach;

var
/*istanbul ignore next*/
_isIterable = _interopRequireDefault(require("./isIterable"));

var
/*istanbul ignore next*/
_isIterator = _interopRequireDefault(require("./isIterator"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Helper to iterate over sequence types (arrays, array-like objects,
 * objects, etc)
 *
 * @param {Iterable} seq
 * @param {function(this:T, ...)} callback
 * @param {T=} optThisObj
 * @template T
 */
function forEach(seq, callback, optThisObj) {
  if (Array.isArray(seq)) {
    var _i = 0;
    var l = seq.length;

    if (optThisObj) {
      for (; _i < l; _i++) {
        callback.call(optThisObj, seq[_i], _i);
      }
    } else {
      for (; _i < l; _i++) {
        callback(seq[_i], _i);
      }
    }

    return;
  }

  if (
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _isIterable[
  /*istanbul ignore next*/
  "default"])(seq)) {
    seq = seq[Symbol.iterator]();
  }

  if (
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _isIterator[
  /*istanbul ignore next*/
  "default"])(seq)) {
    var v;
    var i; // Avoiding call if it is not necessary is faster in some browsers

    if (optThisObj !== undefined) {
      /*istanbul ignore next*/
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator = seq[Symbol.iterator](), _step;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion = true) {
          /*istanbul ignore next*/
          v = _step.value;
          i += 1;
          callback.call(optThisObj, v, i);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } else {
      /*istanbul ignore next*/
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator2 = seq[Symbol.iterator](), _step2;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion2 = true) {
          /*istanbul ignore next*/
          v = _step2.value;
          i += 1;
          callback(v, i);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } else if (seq &&
  /*istanbul ignore next*/
  _typeof(seq) === 'object') {
    if (optThisObj) {
      for (var prop in seq) {
        callback.call(optThisObj, seq[prop], prop);
      }
    } else {
      for (var _prop in seq) {
        callback(seq[_prop], _prop);
      }
    }
  }
}