'use strict';
/**
 * @fileoverview
 * A shim for ES6 maps and support for custom hash functions via toString()
 * and does not accept arrays as keys (just like Python does not accept lists).
 */

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var
/*istanbul ignore next*/
_clear2 = _interopRequireDefault(require("./clear"));

var
/*istanbul ignore next*/
_isIterable = _interopRequireDefault(require("./isIterable"));

var
/*istanbul ignore next*/
_isFunction = _interopRequireDefault(require("lodash/isFunction"));

var
/*istanbul ignore next*/
_isObject = _interopRequireDefault(require("lodash/isObject"));

var
/*istanbul ignore next*/
_isArrayLike = _interopRequireDefault(require("./isArrayLike"));

var
/*istanbul ignore next*/
_size = _interopRequireDefault(require("lodash/size"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Map =
/*#__PURE__*/
function () {
  /**
   * @param {Iterable=} opt_data An object, array or iterator to
   *  populate the map with. If 'data' is an array or iterable, each element is
   *  expected to be a 2-tuple. The first element will be the key and second the
   *  value.
   *  If it is an object, the property names will be the keys and the value the
   *  values.
   */
  function
  /*istanbul ignore next*/
  Map(optData) {
    /*istanbul ignore next*/
    _classCallCheck(this, Map);

    // Can't use class syntax because of generator functions
    this._stringValues = Object.create(null); // strings

    this._numberValues = Object.create(null); // numbers

    this._values = Object.create(null); // every other value

    this._keys = Object.create(null);

    if (optData != null) {
      if (
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _isIterable[
      /*istanbul ignore next*/
      "default"])(optData)) {
        /*istanbul ignore next*/
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (
          /*istanbul ignore next*/
          var _iterator = optData[Symbol.iterator](), _step;
          /*istanbul ignore next*/
          !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
          /*istanbul ignore next*/
          _iteratorNormalCompletion = true) {
            /*istanbul ignore next*/
            var _step$value = _slicedToArray(_step.value, 2),
                key = _step$value[0],
                value = _step$value[1];

            this.set(key, value);
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
      } else if (
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _isArrayLike[
      /*istanbul ignore next*/
      "default"])(optData)) {
        for (var i = 0; i < optData.length; i++) {
          /*istanbul ignore next*/
          var _optData$i = _slicedToArray(optData[i], 2),
              key = _optData$i[0],
              value = _optData$i[1];

          this.set(key, value);
        }
      } else if (
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _isObject[
      /*istanbul ignore next*/
      "default"])(optData)) {
        for (var key in optData) {
          this.set(isNaN(+key) ? key : +key, optData[key]);
        }
      }
    }
  }
  /**
   * Returns the appropriate storage object for a given key.
   *
   * @param {*} key
   * @return {Object}
   * @private
   */


  _createClass(Map, [{
    key: "_getStorage",
    value: function _getStorage(key) {
      switch (
      /*istanbul ignore next*/
      _typeof(key)) {
        case 'number':
          return this._numberValues;

        case 'string':
          return this._stringValues;

        default:
          return this._values;
      }
    }
    /**
     * Returns the value for the given key.
     *
     * Unlike native ES6 maps, this also accepts a default value which is returned
     * if the map does not contain the value.
     *
     * @param {*} key
     * @param {*=} optDefaultValue
     *
     * @return {*}
     * @export
     */

  }, {
    key: "get",
    value: function get(key, optDefaultValue) {
      var storage = this._getStorage(key);

      return key in storage ? storage[key] : optDefaultValue;
    }
    /**
     * Returns true if the key is in the map.
     *
     * @param {*} key
     *
     * @return {boolean}
     * @export
     */

  }, {
    key: "has",
    value: function has(key) {
      return key in this._getStorage(key);
    }
    /**
     * Adds the value and key to the map.
     *
     * @param {*} key
     * @param {*} value
     *
     * @return {Map} the map object itself
     * @export
     */

  }, {
    key: "set",
    value: function set(key, value) {
      var values = this._getStorage(key);

      values[key] = value; // save actual key value

      if (values === this._values) {
        this._keys[key] = key;
      }

      return this;
    }
    /**
     * Remove value with given key.
     *
     * @param {*} key
     *
     * @return {boolean}
     * @export
     */

  }, {
    key: "delete",
    value: function _delete(key) {
      var values = this._getStorage(key);

      if (key in values) {
        delete values[key];

        if (values === this._values) {
          delete this._keys[key];
        }

        return true;
      }

      return false;
    }
    /**
     * Returns an array of (key, value) tuples.
     *
     * @return {!Iterator}
     * @export
    */

  }, {
    key: "entries",
    value:
    /*#__PURE__*/
    regeneratorRuntime.mark(function entries() {
      var key;
      return regeneratorRuntime.wrap(function entries$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.t0 = regeneratorRuntime.keys(this._numberValues);

            case 1:
              if ((_context.t1 = _context.t0()).done) {
                _context.next = 7;
                break;
              }

              key = _context.t1.value;
              _context.next = 5;
              return [+key, this._numberValues[key]];

            case 5:
              _context.next = 1;
              break;

            case 7:
              _context.t2 = regeneratorRuntime.keys(this._stringValues);

            case 8:
              if ((_context.t3 = _context.t2()).done) {
                _context.next = 14;
                break;
              }

              key = _context.t3.value;
              _context.next = 12;
              return [key, this._stringValues[key]];

            case 12:
              _context.next = 8;
              break;

            case 14:
              _context.t4 = regeneratorRuntime.keys(this._values);

            case 15:
              if ((_context.t5 = _context.t4()).done) {
                _context.next = 21;
                break;
              }

              key = _context.t5.value;
              _context.next = 19;
              return [this._keys[key], this._values[key]];

            case 19:
              _context.next = 15;
              break;

            case 21:
            case "end":
              return _context.stop();
          }
        }
      }, entries, this);
    })
    /**
     * Returns an iterator over keys.
     *
     * @return {!Iterator}
     * @export
    */

  }, {
    key: "keys",
    value:
    /*#__PURE__*/
    regeneratorRuntime.mark(function keys() {
      var key;
      return regeneratorRuntime.wrap(function keys$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.t0 = regeneratorRuntime.keys(this._numberValues);

            case 1:
              if ((_context2.t1 = _context2.t0()).done) {
                _context2.next = 7;
                break;
              }

              key = _context2.t1.value;
              _context2.next = 5;
              return +key;

            case 5:
              _context2.next = 1;
              break;

            case 7:
              _context2.t2 = regeneratorRuntime.keys(this._stringValues);

            case 8:
              if ((_context2.t3 = _context2.t2()).done) {
                _context2.next = 14;
                break;
              }

              key = _context2.t3.value;
              _context2.next = 12;
              return key;

            case 12:
              _context2.next = 8;
              break;

            case 14:
              _context2.t4 = regeneratorRuntime.keys(this._values);

            case 15:
              if ((_context2.t5 = _context2.t4()).done) {
                _context2.next = 21;
                break;
              }

              key = _context2.t5.value;
              _context2.next = 19;
              return this._keys[key];

            case 19:
              _context2.next = 15;
              break;

            case 21:
            case "end":
              return _context2.stop();
          }
        }
      }, keys, this);
    })
    /**
     * Returns an array of values.
     *
     * @return {!Array}
     * @export
    */

  }, {
    key: "values",
    value:
    /*#__PURE__*/
    regeneratorRuntime.mark(function values() {
      var key;
      return regeneratorRuntime.wrap(function values$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.t0 = regeneratorRuntime.keys(this._numberValues);

            case 1:
              if ((_context3.t1 = _context3.t0()).done) {
                _context3.next = 7;
                break;
              }

              key = _context3.t1.value;
              _context3.next = 5;
              return this._numberValues[key];

            case 5:
              _context3.next = 1;
              break;

            case 7:
              _context3.t2 = regeneratorRuntime.keys(this._stringValues);

            case 8:
              if ((_context3.t3 = _context3.t2()).done) {
                _context3.next = 14;
                break;
              }

              key = _context3.t3.value;
              _context3.next = 12;
              return this._stringValues[key];

            case 12:
              _context3.next = 8;
              break;

            case 14:
              _context3.t4 = regeneratorRuntime.keys(this._values);

            case 15:
              if ((_context3.t5 = _context3.t4()).done) {
                _context3.next = 21;
                break;
              }

              key = _context3.t5.value;
              _context3.next = 19;
              return this._values[key];

            case 19:
              _context3.next = 15;
              break;

            case 21:
            case "end":
              return _context3.stop();
          }
        }
      }, values, this);
    })
    /**
     * Returns the number of element in the map.
     *
     * @return {number}
     * @export
    */

  }, {
    key: "clear",

    /**
     * Empties the map.
     *
     * @export
    */
    value: function clear() {
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _clear2[
      /*istanbul ignore next*/
      "default"])(this._stringValues);

      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _clear2[
      /*istanbul ignore next*/
      "default"])(this._numberValues);

      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _clear2[
      /*istanbul ignore next*/
      "default"])(this._values);

      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _clear2[
      /*istanbul ignore next*/
      "default"])(this._keys);
    }
    /**
     * Executes the provided callback for each item in the map.
     *
     * @param {function(*,*)} callback A function which gets the key as first
     *  argument and value as second argument.
     * @param {*=} opt_this Object/value to set this to inside the callback
     * @export
    */

  }, {
    key: "forEach",
    value: function forEach(callback, optThis) {
      if (!
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _isFunction[
      /*istanbul ignore next*/
      "default"])(callback)) {
        throw new TypeError('callback must be a function');
      }

      /*istanbul ignore next*/
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator2 = this.entries()[Symbol.iterator](), _step2;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion2 = true) {
          /*istanbul ignore next*/
          var v = _step2.value;
          callback.call(optThis, v[1], v[0], this);
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
    /**
    * Returns an iterator for the map object.
    *
    * @return {Iterator}
    */

  }, {
    key: Symbol.iterator,
    value: function value() {
      return this.entries();
    }
  }, {
    key: "size",
    get: function get() {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _size[
        /*istanbul ignore next*/
        "default"])(this._values) +
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _size[
        /*istanbul ignore next*/
        "default"])(this._numberValues) +
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _size[
        /*istanbul ignore next*/
        "default"])(this._stringValues)
      );
    }
  }]);

  return Map;
}();

/*istanbul ignore next*/
exports["default"] = Map;