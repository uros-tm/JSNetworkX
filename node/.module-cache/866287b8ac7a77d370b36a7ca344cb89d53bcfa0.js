'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function sorter(a, b) {
  return b[0] - a[0];
}
/**
 * A simple priority queue implementation.
 */


/*istanbul ignore next*/
var PriorityQueue = /*#__PURE__*/function () {
  /**
   * Accepts an iterable that emits `[priority, value]` pairs. Iterates over the
   * iterable only once.
   *
   * `priority` must be a number.
   *
   * @param {Iterable} iterable
   */
  function
  /*istanbul ignore next*/
  PriorityQueue(iterable) {
    /*istanbul ignore next*/
    _classCallCheck(this, PriorityQueue);

    this._values = [];

    if (iterable != null) {
      /*istanbul ignore next*/
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator = iterable[Symbol.iterator](), _step;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion = true) {
          /*istanbul ignore next*/
          var _step$value = _slicedToArray(_step.value, 2),
              priority = _step$value[0],
              value = _step$value[1];

          this._values.push([priority, value]);
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

      this._values.sort(sorter);
    }
  }
  /**
   * Adds a value to the queue. It will be inserted into the queue according to
   * `priority`.
   *
   * @param {number} priority
   * @param {*} value
   */


  _createClass(PriorityQueue, [{
    key: "enqueue",
    value: function enqueue(priority, value) {
      this._values.push([priority, value]);

      this._values.sort(sorter);
    }
    /**
     * Removes and returns the smallest [priority, value] tuple from the queue.
     *
     * @return {?}
     */

  }, {
    key: "dequeue",
    value: function dequeue() {
      return this._values.pop();
    }
    /**
     * Returns the current size of the queue.
     *
     * @return {number}
     */

  }, {
    key: "size",
    get: function get() {
      return this._values.length;
    }
  }]);

  return PriorityQueue;
}();

/*istanbul ignore next*/
exports["default"] = PriorityQueue;