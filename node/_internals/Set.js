'use strict';
/**
 * @fileoverview
 * A shim for ES6 maps and support for custom hash functions via toString().
 */

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.symmetricDifference = symmetricDifference;
exports.union = union;
exports["default"] = void 0;

var
/*istanbul ignore next*/
_Map = _interopRequireDefault(require("./Map"));

var
/*istanbul ignore next*/
_toIterator = _interopRequireDefault(require("./toIterator"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Set =
/*#__PURE__*/
function () {
  /**
   * @param {Iterable} opt_data An object, array or iterator to populate the set
   * with.
   */
  function
  /*istanbul ignore next*/
  Set(optData) {
    /*istanbul ignore next*/
    _classCallCheck(this, Set);

    this._map = new
    /*istanbul ignore next*/
    _Map[
    /*istanbul ignore next*/
    "default"]();

    if (optData != null) {
      /*istanbul ignore next*/
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator =
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _toIterator[
        /*istanbul ignore next*/
        "default"])(optData)[Symbol.iterator](), _step;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion = true) {
          /*istanbul ignore next*/
          var v = _step.value;
          this.add(v);
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
    }
  }
  /**
   * Returns true if the key is in the map.
   *
   * @param {*} value
   *
   * @return {boolean}
   */


  _createClass(Set, [{
    key: "has",
    value: function has(value) {
      return this._map.has(value);
    }
    /**
     * Adds the value and key to the map.
     *
     * @param {*} value
     *
     * @export
     */

  }, {
    key: "add",
    value: function add(value) {
      this._map.set(value, true);
    }
    /**
     * Remove value with given key.
     *
     * @param {*} value
     *
     * @export
     */

  }, {
    key: "delete",
    value: function _delete(value) {
      return this._map[
      /*istanbul ignore next*/
      "delete"](value);
    }
    /**
     * Returns an array of values.
     *
     * @return {!Iterator}
     * @export
     */

  }, {
    key: "values",
    value: function values() {
      return this._map.keys();
    }
    /**
     * Returns an array of values.
     *
     * @return {!Iterator}
     * @export
     */

  }, {
    key: "keys",
    value: function keys() {
      return this.values();
    }
    /**
     * Returns an array of values.
     *
     * @return {!Iterator}
     * @export
     */

  }, {
    key: "entries",
    value:
    /*#__PURE__*/
    regeneratorRuntime.mark(function entries() {
      var _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, v;

      return regeneratorRuntime.wrap(function entries$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 3;
              _iterator2 = this.values()[Symbol.iterator]();

            case 5:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context.next = 12;
                break;
              }

              v = _step2.value;
              _context.next = 9;
              return [v, v];

            case 9:
              _iteratorNormalCompletion2 = true;
              _context.next = 5;
              break;

            case 12:
              _context.next = 18;
              break;

            case 14:
              _context.prev = 14;
              _context.t0 = _context["catch"](3);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t0;

            case 18:
              _context.prev = 18;
              _context.prev = 19;

              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }

            case 21:
              _context.prev = 21;

              if (!_didIteratorError2) {
                _context.next = 24;
                break;
              }

              throw _iteratorError2;

            case 24:
              return _context.finish(21);

            case 25:
              return _context.finish(18);

            case 26:
            case "end":
              return _context.stop();
          }
        }
      }, entries, this, [[3, 14, 18, 26], [19,, 21, 25]]);
    })
    /**
     * Returns the number of element in the set.
     *
     * @return {number}
     * @export
     */

  }, {
    key: "clear",

    /**
     * Empties the set.
     *
     * @export
     */
    value: function clear() {
      this._map.clear();
    }
    /**
     * Executes the provided callback for each item in the set.
     *
     * @param {function(*)} callback A function which gets the key as first
     *  argument and value as second argument.
     * @param {*=} opt_this Object/value to set this to inside the callback
     * @export
    */

  }, {
    key: "forEach",
    value: function forEach(callback, optThis) {
      /*istanbul ignore next*/
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator3 = this.values()[Symbol.iterator](), _step3;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion3 = true) {
          /*istanbul ignore next*/
          var v = _step3.value;
          callback.call(optThis, v, v, this);
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
    /** EXTENSIONS **/

    /**
     * The following methods are not part of the ES6 Set class but are provided
     * for convenience. Once Sets become more widely available, we could simply
     * extend the native Set class.
     */

    /**
     * Returns a new set with the values of this set, not found in the other
     * sets.
     *
     * @param {...(Set|Array)} others
     */

  }, {
    key: "difference",
    value: function difference() {
      var result = new Set(this);

      /*istanbul ignore next*/
      for (var _len = arguments.length, others = new Array(_len), _key = 0; _key < _len; _key++) {
        others[_key] = arguments[_key];
      }

      for (var i = 0, l = others.length; i < l; i++) {
        /*istanbul ignore next*/
        var _iteratorNormalCompletion4 = true;
        var _didIteratorError4 = false;
        var _iteratorError4 = undefined;

        try {
          for (
          /*istanbul ignore next*/
          var _iterator4 = others[i][Symbol.iterator](), _step4;
          /*istanbul ignore next*/
          !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done);
          /*istanbul ignore next*/
          _iteratorNormalCompletion4 = true) {
            /*istanbul ignore next*/
            var v = _step4.value;
            result[
            /*istanbul ignore next*/
            "delete"](v);
          }
        } catch (err) {
          _didIteratorError4 = true;
          _iteratorError4 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }
          } finally {
            if (_didIteratorError4) {
              throw _iteratorError4;
            }
          }
        }
      }

      return result;
    }
    /**
     * Returns a new set containing only elements found in this and every
     * other set/array.
     *
     * @param {...(Set|Array)} others
     */

  }, {
    key: "intersection",
    value: function intersection() {
      var result = new Set();

      /*istanbul ignore next*/
      for (var _len2 = arguments.length, others = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        others[_key2] = arguments[_key2];
      }

      /*istanbul ignore next*/
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator5 = this[Symbol.iterator](), _step5;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion5 = true) {
          /*istanbul ignore next*/
          var v = _step5.value;

          /* eslint-disable no-loop-func */
          if (others.every(function (other)
          /*istanbul ignore next*/
          {
            return other.has(v);
          })) {
            result.add(v);
          }
          /* eslint-enable no-loop-func */

        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      return result;
    }
    /**
     * Removes and returns an element from the set.
     *
     * @return {?}
     */

  }, {
    key: "pop",
    value: function pop() {
      try {
        var value = this.values().next().value;
        this[
        /*istanbul ignore next*/
        "delete"](value);
        return value;
      } catch (ex) {} // eslint-disable-line no-empty

    }
    /**
     * Returns an iterator for the set object.
     *
     * @return {Iterator}
     */

  }, {
    key: Symbol.iterator,
    value: function value() {
      return this.values();
    }
  }, {
    key: "size",
    get: function get() {
      return this._map.size;
    }
  }]);

  return Set;
}();

/*istanbul ignore next*/
exports["default"] = Set;

function symmetricDifference(a, b) {
  var c = new Set(a);

  /*istanbul ignore next*/
  var _iteratorNormalCompletion6 = true;
  var _didIteratorError6 = false;
  var _iteratorError6 = undefined;

  try {
    for (
    /*istanbul ignore next*/
    var _iterator6 = b[Symbol.iterator](), _step6;
    /*istanbul ignore next*/
    !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done);
    /*istanbul ignore next*/
    _iteratorNormalCompletion6 = true) {
      /*istanbul ignore next*/
      var v = _step6.value;

      if (a.has(v)) {
        c[
        /*istanbul ignore next*/
        "delete"](v);
      } else {
        c.add(v);
      }
    }
  } catch (err) {
    _didIteratorError6 = true;
    _iteratorError6 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
        _iterator6["return"]();
      }
    } finally {
      if (_didIteratorError6) {
        throw _iteratorError6;
      }
    }
  }

  return c;
}

function union(a, b) {
  var c = new Set(a);

  /*istanbul ignore next*/
  var _iteratorNormalCompletion7 = true;
  var _didIteratorError7 = false;
  var _iteratorError7 = undefined;

  try {
    for (
    /*istanbul ignore next*/
    var _iterator7 = b[Symbol.iterator](), _step7;
    /*istanbul ignore next*/
    !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done);
    /*istanbul ignore next*/
    _iteratorNormalCompletion7 = true) {
      /*istanbul ignore next*/
      var v = _step7.value;
      c.add(v);
    }
  } catch (err) {
    _didIteratorError7 = true;
    _iteratorError7 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
        _iterator7["return"]();
      }
    } finally {
      if (_didIteratorError7) {
        throw _iteratorError7;
      }
    }
  }

  return c;
}