(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.jsnx = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/Arrays.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var shuffle = _babelHelpers.interopRequire(require("lodash/collection/shuffle"));

var sample = _babelHelpers.interopRequire(require("lodash/collection/sample"));

module.exports = { shuffle: shuffle, sample: sample };

},{"babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js","lodash/collection/sample":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/collection/sample.js","lodash/collection/shuffle":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/collection/shuffle.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/Map.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

/**
 * @fileoverview
 * A shim for ES6 maps and support for custom hash functions via toString()
 * and does not accept arrays as keys (just like Python does not accept lists).
 */

var clear = _babelHelpers.interopRequire(require("./clear"));

var isIterator = _babelHelpers.interopRequire(require("./isIterator"));

var isFunction = _babelHelpers.interopRequire(require("lodash/lang/isFunction"));

var isObject = _babelHelpers.interopRequire(require("lodash/lang/isObject"));

var isArrayLike = _babelHelpers.interopRequire(require("./isArrayLike"));

var size = _babelHelpers.interopRequire(require("lodash/collection/size"));

var Map = (function () {
  /**
   * @param {Iterable=} opt_data An object, array or iterator to
   *  populate the map with. If 'data' is an array or iterable, each element is
   *  expected to be a 2-tuple. The first element will be the key and second the
   *  value.
   *  If it is an object, the property names will be the keys and the value the
   *  values.
   */

  function Map(optData) {
    _babelHelpers.classCallCheck(this, Map);

    // Can't use class syntax because of generator functions
    this._stringValues = Object.create(null); // strings
    this._numberValues = Object.create(null); // numbers
    this._values = Object.create(null); // every other value
    this._keys = Object.create(null);

    var key, value;

    if (optData != null) {
      if (isIterator(optData)) {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _core.$for.getIterator(optData), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _babelHelpers.slicedToArray(_step.value, 2);

            var key = _step$value[0];
            var value = _step$value[1];

            this.set(key, value);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"]) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }
      } else if (isArrayLike(optData)) {
        for (var i = 0; i < optData.length; i++) {
          var _ref = optData[i];

          var _ref2 = _babelHelpers.slicedToArray(_ref, 2);

          key = _ref2[0];
          value = _ref2[1];

          this.set(key, value);
        }
      } else if (isObject(optData)) {
        for (var key in optData) {
          this.set(isNaN(+key) ? key : +key, optData[key]);
        }
      }
    }
  }

  _babelHelpers.prototypeProperties(Map, null, (function () {
    var _babelHelpers$prototypeProperties = {
      _getStorage: {

        /**
         * Returns the appropriate storage object for a given key.
         *
         * @param {*} key
         * @return {Object}
         * @private
         */

        value: function _getStorage(key) {
          switch (typeof key) {
            case "number":
              return this._numberValues;
            case "string":
              return this._stringValues;
            default:
              return this._values;
          }
        },
        writable: true,
        configurable: true
      },
      get: {

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

        value: function get(key, optDefaultValue) {
          var storage = this._getStorage(key);
          return key in storage ? storage[key] : optDefaultValue;
        },
        writable: true,
        configurable: true
      },
      has: {

        /**
         * Returns true if the key is in the map.
         *
         * @param {*} key
         *
         * @return {boolean}
         * @export
         */

        value: function has(key) {
          return key in this._getStorage(key);
        },
        writable: true,
        configurable: true
      },
      set: {

        /**
         * Adds the value and key to the map.
         *
         * @param {*} key
         * @param {*} value
         *
         * @return {Map} the map object itself
         * @export
         */

        value: function set(key, value) {
          var values = this._getStorage(key);
          values[key] = value;

          // save actual key value
          if (values === this._values) {
            this._keys[key] = key;
          }

          return this;
        },
        writable: true,
        configurable: true
      },
      "delete": {

        /**
         * Remove value with given key.
         *
         * @param {*} key
         *
         * @return {boolean}
         * @export
         */

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
        },
        writable: true,
        configurable: true
      },
      entries: {

        /**
         * Returns an array of (key, value) tuples.
         *
         * @return {!Iterator}
         * @export
        */

        value: _regeneratorRuntime.mark(function entries() {
          var _this = this;

          var key;
          return _regeneratorRuntime.wrap(function entries$(context$3$0) {
            while (1) switch (context$3$0.prev = context$3$0.next) {
              case 0:
                context$3$0.t4 = _regeneratorRuntime.keys(_this._numberValues);

              case 1:
                if ((context$3$0.t5 = context$3$0.t4()).done) {
                  context$3$0.next = 7;
                  break;
                }

                key = context$3$0.t5.value;
                context$3$0.next = 5;
                return [+key, _this._numberValues[key]];

              case 5:
                context$3$0.next = 1;
                break;

              case 7:
                context$3$0.t6 = _regeneratorRuntime.keys(_this._stringValues);

              case 8:
                if ((context$3$0.t7 = context$3$0.t6()).done) {
                  context$3$0.next = 14;
                  break;
                }

                key = context$3$0.t7.value;
                context$3$0.next = 12;
                return [key, _this._stringValues[key]];

              case 12:
                context$3$0.next = 8;
                break;

              case 14:
                context$3$0.t8 = _regeneratorRuntime.keys(_this._values);

              case 15:
                if ((context$3$0.t9 = context$3$0.t8()).done) {
                  context$3$0.next = 21;
                  break;
                }

                key = context$3$0.t9.value;
                context$3$0.next = 19;
                return [_this._keys[key], _this._values[key]];

              case 19:
                context$3$0.next = 15;
                break;

              case 21:
              case "end":
                return context$3$0.stop();
            }
          }, entries, this);
        }),
        writable: true,
        configurable: true
      },
      keys: {

        /**
         * Returns an iterator over keys.
         *
         * @return {!Iterator}
         * @export
        */

        value: _regeneratorRuntime.mark(function keys() {
          var _this = this;

          var key;
          return _regeneratorRuntime.wrap(function keys$(context$3$0) {
            while (1) switch (context$3$0.prev = context$3$0.next) {
              case 0:
                context$3$0.t10 = _regeneratorRuntime.keys(_this._numberValues);

              case 1:
                if ((context$3$0.t11 = context$3$0.t10()).done) {
                  context$3$0.next = 7;
                  break;
                }

                key = context$3$0.t11.value;
                context$3$0.next = 5;
                return +key;

              case 5:
                context$3$0.next = 1;
                break;

              case 7:
                context$3$0.t12 = _regeneratorRuntime.keys(_this._stringValues);

              case 8:
                if ((context$3$0.t13 = context$3$0.t12()).done) {
                  context$3$0.next = 14;
                  break;
                }

                key = context$3$0.t13.value;
                context$3$0.next = 12;
                return key;

              case 12:
                context$3$0.next = 8;
                break;

              case 14:
                context$3$0.t14 = _regeneratorRuntime.keys(_this._values);

              case 15:
                if ((context$3$0.t15 = context$3$0.t14()).done) {
                  context$3$0.next = 21;
                  break;
                }

                key = context$3$0.t15.value;
                context$3$0.next = 19;
                return _this._keys[key];

              case 19:
                context$3$0.next = 15;
                break;

              case 21:
              case "end":
                return context$3$0.stop();
            }
          }, keys, this);
        }),
        writable: true,
        configurable: true
      },
      values: {

        /**
         * Returns an array of values.
         *
         * @return {!Array}
         * @export
        */

        value: _regeneratorRuntime.mark(function values() {
          var _this = this;

          var key;
          return _regeneratorRuntime.wrap(function values$(context$3$0) {
            while (1) switch (context$3$0.prev = context$3$0.next) {
              case 0:
                context$3$0.t16 = _regeneratorRuntime.keys(_this._numberValues);

              case 1:
                if ((context$3$0.t17 = context$3$0.t16()).done) {
                  context$3$0.next = 7;
                  break;
                }

                key = context$3$0.t17.value;
                context$3$0.next = 5;
                return _this._numberValues[key];

              case 5:
                context$3$0.next = 1;
                break;

              case 7:
                context$3$0.t18 = _regeneratorRuntime.keys(_this._stringValues);

              case 8:
                if ((context$3$0.t19 = context$3$0.t18()).done) {
                  context$3$0.next = 14;
                  break;
                }

                key = context$3$0.t19.value;
                context$3$0.next = 12;
                return _this._stringValues[key];

              case 12:
                context$3$0.next = 8;
                break;

              case 14:
                context$3$0.t20 = _regeneratorRuntime.keys(_this._values);

              case 15:
                if ((context$3$0.t21 = context$3$0.t20()).done) {
                  context$3$0.next = 21;
                  break;
                }

                key = context$3$0.t21.value;
                context$3$0.next = 19;
                return _this._values[key];

              case 19:
                context$3$0.next = 15;
                break;

              case 21:
              case "end":
                return context$3$0.stop();
            }
          }, values, this);
        }),
        writable: true,
        configurable: true
      },
      size: {

        /**
         * Returns the number of element in the map.
         *
         * @return {number}
         * @export
        */

        get: function () {
          return size(this._values) + size(this._numberValues) + size(this._stringValues);
        },
        configurable: true
      },
      clear: {

        /**
         * Empties the map.
         *
         * @export
        */

        value: (function (_clear) {
          var _clearWrapper = function clear() {
            return _clear.apply(this, arguments);
          };

          _clearWrapper.toString = function () {
            return _clear.toString();
          };

          return _clearWrapper;
        })(function () {
          clear(this._stringValues);
          clear(this._numberValues);
          clear(this._values);
          clear(this._keys);
        }),
        writable: true,
        configurable: true
      },
      forEach: {

        /**
         * Executes the provided callback for each item in the map.
         *
         * @param {function(*,*)} callback A function which gets the key as first
         *  argument and value as second argument.
         * @param {*=} opt_this Object/value to set this to inside the callback
         * @export
        */

        value: function forEach(callback, optThis) {
          if (!isFunction(callback)) {
            throw new TypeError("callback must be a function");
          }
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = _core.$for.getIterator(this.entries()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var v = _step.value;

              callback.call(optThis, v[1], v[0], this);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        },
        writable: true,
        configurable: true
      }
    };
    _babelHelpers$prototypeProperties[_core.Symbol.iterator] = {

      /**
      * Returns an iterator for the map object.
      *
      * @return {Iterator}
      */

      value: function () {
        return this.entries();
      },
      writable: true,
      configurable: true
    };
    return _babelHelpers$prototypeProperties;
  })());

  return Map;
})();

module.exports = Map;

},{"./clear":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/clear.js","./isArrayLike":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isArrayLike.js","./isIterator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isIterator.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js","babel-runtime/regenerator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/regenerator/index.js","lodash/collection/size":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/collection/size.js","lodash/lang/isFunction":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isFunction.js","lodash/lang/isObject":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isObject.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/PriorityQueue.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

function sorter(a, b) {
  return b[0] - a[0];
}

/**
 * A simple priority queue implementation.
 */

var PriorityQueue = (function () {

  /**
   * Accepts an iterable that emits `[priority, value]` pairs. Iterates over the
   * iterable only once.
   *
   * `priority` must be a number.
   *
   * @param {Iterable} iterable
   */

  function PriorityQueue(iterable) {
    _babelHelpers.classCallCheck(this, PriorityQueue);

    this._values = [];
    if (iterable != null) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _core.$for.getIterator(iterable), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _babelHelpers.slicedToArray(_step.value, 2);

          var priority = _step$value[0];
          var value = _step$value[1];

          this._values.push([priority, value]);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"]) {
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

  _babelHelpers.prototypeProperties(PriorityQueue, null, {
    enqueue: {

      /**
       * Adds a value to the queue. It will be inserted into the queue according to
       * `priority`.
       *
       * @param {number} priority
       * @param {*} value
       */

      value: function enqueue(priority, value) {
        this._values.push([priority, value]);
        this._values.sort(sorter);
      },
      writable: true,
      configurable: true
    },
    dequeue: {

      /**
       * Removes and returns the smallest [priority, value] tuple from the queue.
       *
       * @return {?}
       */

      value: function dequeue() {
        return this._values.pop();
      },
      writable: true,
      configurable: true
    },
    size: {

      /**
       * Returns the current size of the queue.
       *
       * @return {number}
       */

      get: function () {
        return this._values.length;
      },
      configurable: true
    }
  });

  return PriorityQueue;
})();

module.exports = PriorityQueue;

},{"babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/Set.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

/**
 * @fileoverview
 * A shim for ES6 maps and support for custom hash functions via toString().
 */

/*jshint ignore:start */

var Map = _babelHelpers.interopRequire(require("./Map"));

/*jshint ignore:end */

var toIterator = require("./toIterator");

var Set = (function () {

  /**
   * @param {Iterable} opt_data An object, array or iterator to populate the set
   * with.
   */

  function Set(optData) {
    _babelHelpers.classCallCheck(this, Set);

    this._map = new Map();

    if (optData != null) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _core.$for.getIterator(toIterator(optData)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var v = _step.value;

          this.add(v);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"]) {
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

  _babelHelpers.prototypeProperties(Set, null, (function () {
    var _babelHelpers$prototypeProperties = {
      has: {

        /**
         * Returns true if the key is in the map.
         *
         * @param {*} value
         *
         * @return {boolean}
         */

        value: function has(value) {
          return this._map.has(value);
        },
        writable: true,
        configurable: true
      },
      add: {

        /**
         * Adds the value and key to the map.
         *
         * @param {*} value
         *
         * @export
         */

        value: function add(value) {
          this._map.set(value, true);
        },
        writable: true,
        configurable: true
      },
      "delete": {

        /**
         * Remove value with given key.
         *
         * @param {*} value
         *
         * @export
         */

        value: function _delete(value) {
          return this._map["delete"](value);
        },
        writable: true,
        configurable: true
      },
      values: {

        /**
         * Returns an array of values.
         *
         * @return {!Iterator}
         * @export
         */

        value: function values() {
          return this._map.keys();
        },
        writable: true,
        configurable: true
      },
      keys: {

        /**
         * Returns an array of values.
         *
         * @return {!Iterator}
         * @export
         */

        value: function keys() {
          return this.values();
        },
        writable: true,
        configurable: true
      },
      entries: {

        /**
         * Returns an array of values.
         *
         * @return {!Iterator}
         * @export
         */

        value: _regeneratorRuntime.mark(function entries() {
          var _this = this;

          var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, v;

          return _regeneratorRuntime.wrap(function entries$(context$3$0) {
            while (1) switch (context$3$0.prev = context$3$0.next) {
              case 0:
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                context$3$0.prev = 3;
                _iterator = _core.$for.getIterator(_this.values());

              case 5:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  context$3$0.next = 12;
                  break;
                }

                v = _step.value;
                context$3$0.next = 9;
                return [v, v];

              case 9:
                _iteratorNormalCompletion = true;
                context$3$0.next = 5;
                break;

              case 12:
                context$3$0.next = 18;
                break;

              case 14:
                context$3$0.prev = 14;
                context$3$0.t22 = context$3$0["catch"](3);
                _didIteratorError = true;
                _iteratorError = context$3$0.t22;

              case 18:
                context$3$0.prev = 18;
                context$3$0.prev = 19;

                if (!_iteratorNormalCompletion && _iterator["return"]) {
                  _iterator["return"]();
                }

              case 21:
                context$3$0.prev = 21;

                if (!_didIteratorError) {
                  context$3$0.next = 24;
                  break;
                }

                throw _iteratorError;

              case 24:
                return context$3$0.finish(21);

              case 25:
                return context$3$0.finish(18);

              case 26:
              case "end":
                return context$3$0.stop();
            }
          }, entries, this, [[3, 14, 18, 26], [19,, 21, 25]]);
        }),
        writable: true,
        configurable: true
      },
      size: {

        /**
         * Returns the number of element in the set.
         *
         * @return {number}
         * @export
         */

        get: function () {
          return this._map.size;
        },
        configurable: true
      },
      clear: {

        /**
         * Empties the set.
         *
         * @export
         */

        value: function clear() {
          this._map.clear();
        },
        writable: true,
        configurable: true
      },
      forEach: {

        /**
         * Executes the provided callback for each item in the set.
         *
         * @param {function(*)} callback A function which gets the key as first
         *  argument and value as second argument.
         * @param {*=} opt_this Object/value to set this to inside the callback
         * @export
        */

        value: function forEach(callback, optThis) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = _core.$for.getIterator(this.values()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var v = _step.value;

              callback.call(optThis, v, v, this);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        },
        writable: true,
        configurable: true
      },
      difference: {

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

        value: function difference() {
          for (var _len = arguments.length, others = Array(_len), _key = 0; _key < _len; _key++) {
            others[_key] = arguments[_key];
          }

          var result = new Set(this);
          for (var i = 0, l = others.length; i < l; i++) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = _core.$for.getIterator(others[i]), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var v = _step.value;

                result["delete"](v);
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator["return"]) {
                  _iterator["return"]();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          }
          return result;
        },
        writable: true,
        configurable: true
      },
      intersection: {

        /**
         * Returns a new set containing only elements found in this and every
         * other set/array.
         *
         * @param {...(Set|Array)} others
         */

        value: function intersection() {
          for (var _len = arguments.length, others = Array(_len), _key = 0; _key < _len; _key++) {
            others[_key] = arguments[_key];
          }

          var result = new Set();
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = _core.$for.getIterator(this), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var v = _step.value;

              if (others.every(function (other) {
                return other.has(v);
              })) {
                result.add(v);
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return result;
        },
        writable: true,
        configurable: true
      },
      pop: {

        /**
         * Removes and returns an element from the set.
         *
         * @return {?}
         */

        value: function pop() {
          try {
            var value = this.values().next().value;
            this["delete"](value);
            return value;
          } catch (ex) {}
        },
        writable: true,
        configurable: true
      }
    };
    _babelHelpers$prototypeProperties[_core.Symbol.iterator] = {

      /**
       * Returns an iterator for the set object.
       *
       * @return {Iterator}
       */

      value: function () {
        return this.values();
      },
      writable: true,
      configurable: true
    };
    return _babelHelpers$prototypeProperties;
  })());

  return Set;
})();

module.exports = Set;

},{"./Map":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/Map.js","./toIterator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/toIterator.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js","babel-runtime/regenerator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/regenerator/index.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/clear.js":[function(require,module,exports){
"use strict";

/**
 * Removes every property of the object.
 *
 * @param {Object} obj
 */
module.exports = clear;

function clear(obj) {
  for (var prop in obj) {
    delete obj[prop];
  }
}

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/clone.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var clone = _babelHelpers.interopRequire(require("lodash/lang/clone"));

module.exports = clone;

},{"babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js","lodash/lang/clone":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/clone.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/deepcopy.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

/**
 * Creates a deep copy of the value, also of maps and sets.
 *
 * @param {*} value The value to be cloned
 * @return {?}
 */
module.exports = deepcopy;

var baseClone = _babelHelpers.interopRequire(require("lodash/internal/baseClone"));

var isGraph = _babelHelpers.interopRequire(require("./isGraph"));

var isMap = _babelHelpers.interopRequire(require("./isMap"));

var isSet = _babelHelpers.interopRequire(require("./isSet"));

function deepcopyInstance(obj, stackA, stackB) {
  // temporary constructor, we don't know if the original expects
  // parameter
  /**
   * @constructor
   */
  var T_ = function T_() {};
  T_.prototype = obj.constructor.prototype;
  var ownProps = {};
  var prop;
  var instance;

  // collect instance properties
  for (prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      ownProps[prop] = obj[prop];
    }
  }

  // deepcopy them
  ownProps = deepcopyImplementation(ownProps, stackA, stackB);

  // create a new instance and assign properties
  instance = new T_();
  for (prop in ownProps) {
    instance[prop] = ownProps[prop];
  }

  return instance;
}

function deepcopyImplementation(value, stackA, stackB) {
  return baseClone(value, true, function (v) {
    if (isMap(v) || isSet(v) || isGraph(v)) {
      var copy = deepcopyInstance(v, stackA, stackB);
      stackA.push(v);
      stackB.push(copy);
      return copy;
    }
  }, null, null, stackA, stackB);
}
function deepcopy(value) {
  return deepcopyImplementation(value, [], []);
}

/*jshint latedef:false*/

},{"./isGraph":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isGraph.js","./isMap":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isMap.js","./isSet":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isSet.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js","lodash/internal/baseClone":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseClone.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/deepmerge.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var merge = _babelHelpers.interopRequire(require("lodash/object/merge"));

module.exports = merge;

},{"babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js","lodash/object/merge":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/object/merge.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/delegateToWorker.js":[function(require,module,exports){
(function (global){
"use strict";

var _core = require("babel-runtime/core-js")["default"];

var _babelHelpers = require("babel-runtime/helpers")["default"];

/**
 * DON'T CALL THIS FUNCTION EXPLICITLY. It's inserted by a transform.
 *
 * Tries to create a worker and pass the arguments to it. Copying large graphs
 * is not very fast, but still faster than running most algorithms
 * synchronously.
 *
 * Falls back to synchronous execution if browser doesn't support workers.
 *
 * This returns a promise which gets resolved with the result sent from the
 * worker or the synchronous functions.
 *
 * @param {string} method The name on the root jsnx object to execute.
 * @param {Array} args An array of arguments to send to the worker.
 *    Some types, such as graphs, are converted to a different format first.
 * @return {Promise}
 */
module.exports = delegateToWorker;

var delegate = _babelHelpers.interopRequire(require("./delegate"));

var _message = require("./message");

var isSupported = _message.isSupported;
var serialize = _message.serialize;
var deserialize = _message.deserialize;

var delegateImplementation;
if (typeof global.Worker === "function") {
  // Workers are supported
  delegateImplementation = function (method, args) {
    var serializedArgs = new Array(args.length);
    var serializable = args.every(function (arg, i) {
      var supported = isSupported(arg);
      if (supported) {
        serializedArgs[i] = serialize(arg);
      }
      return supported;
    });

    if (!serializable) {
      console.info("At least one argument can't be serialized and sent to the worker. " + ("We will run " + method + " in the same thread instead."));
      delegate(method, args);
    }

    return new _core.Promise(function (resolve, reject) {
      var worker = new global.Worker("{{BUNDLE}}");
      worker.addEventListener("message", function (oEvent) {
        resolve(deserialize(oEvent.data));
      }, false);
      worker.addEventListener("error", reject, false);
      worker.postMessage({ method: method, args: serializedArgs });
    });
  };
} else {
  delegateImplementation = function (method, args) {
    console.info("Workers are not supported in this environment, so \"" + method + "\" will " + "run in the same thread instead. This might block the environment.");
    delegate(method, args);
  };
}
function delegateToWorker(method, args) {
  return delegateImplementation(method, args);
}

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./delegate":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/delegateToWorker.js","./message":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/message.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/fillArray.js":[function(require,module,exports){
"use strict";

/**
 * Creates an array of `n` elements, each being `value`.
 *
 * @param {number} n Number of elements in the array
 * @param {?} value The value to put in each location
 * @return {Array}
 */
module.exports = fillArray;

function fillArray(n, value) {
  var array = new Array(n);
  for (var i = 0; i < n; i++) {
    array[i] = value;
  }
  return array;
}

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/forEach.js":[function(require,module,exports){
"use strict";

var _core = require("babel-runtime/core-js")["default"];

var _babelHelpers = require("babel-runtime/helpers")["default"];

/**
 * Helper to iterate over sequence types (arrays, array-like objects,
 * objects, etc)
 *
 * @param {Iterable} seq
 * @param {function(this:T, ...)} callback
 * @param {T=} optThisObj
 * @template T
 */
module.exports = forEach;

var _forEach = _babelHelpers.interopRequire(require("lodash/collection/forEach"));

var isIterable = _babelHelpers.interopRequire(require("./isIterable"));

var isIterator = _babelHelpers.interopRequire(require("./isIterator"));

function forEach(seq, callback, optThisObj) {
  if (Array.isArray(seq)) {
    seq.forEach(callback, optThisObj);
    return;
  }
  if (isIterable(seq)) {
    seq = _core.$for.getIterator(seq);
  }
  if (isIterator(seq)) {
    var v;
    var i;
    // Avoiding call if it is not necessary is faster in some browsers
    if (optThisObj !== undefined) {
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _core.$for.getIterator(seq), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          v = _step.value;

          i += 1;
          callback.call(optThisObj, v, i);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } else {
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _core.$for.getIterator(seq), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          v = _step2.value;

          i += 1;
          callback(v, i);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  } else if (seq && typeof seq === "object") {
    _forEach(seq, callback, optThisObj);
  }
}

},{"./isIterable":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isIterable.js","./isIterator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isIterator.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js","lodash/collection/forEach":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/collection/forEach.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/gcd.js":[function(require,module,exports){
"use strict";

/**
 * Computes the greatest common divisor of two numbers using Euclid's algorithm.
 *
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
module.exports = gcd;

function gcd(a, b) {
  while (b !== 0) {
    var _ = a;
    a = b;
    b = _ % b;
  }
  return a;
}

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/genCombinations.js":[function(require,module,exports){
"use strict";

var _core = require("babel-runtime/core-js")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _babelHelpers = require("babel-runtime/helpers")["default"];

var genCombinations = _regeneratorRuntime.mark(

/**
 * Implements Python's itertools.combinations
 *
 * Return r length subsequences of elements from the input iterable.
 *
 * @param {Iterable} iterable
 * @param {number} r
 *
 * @return {Iterator}
 */
function genCombinations(iterable, r) {
  var pool, n, indicies, reversedIndicies, i, k, j;
  return _regeneratorRuntime.wrap(function genCombinations$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        pool = _core.Array.from(iterable);
        n = pool.length;

        if (!(r > n)) {
          context$1$0.next = 4;
          break;
        }

        return context$1$0.abrupt("return");

      case 4:
        indicies = range(r);
        reversedIndicies = reversed(indicies);
        context$1$0.next = 8;
        return indicies.map(function (i) {
          return pool[i];
        });

      case 8:
        if (!true) {
          context$1$0.next = 25;
          break;
        }

        k = 0;

      case 10:
        if (!(k < reversedIndicies.length)) {
          context$1$0.next = 17;
          break;
        }

        i = reversedIndicies[k];

        if (!(indicies[i] !== i + n - r)) {
          context$1$0.next = 14;
          break;
        }

        return context$1$0.abrupt("break", 17);

      case 14:
        k++;
        context$1$0.next = 10;
        break;

      case 17:
        if (!(reversedIndicies.length === k)) {
          context$1$0.next = 19;
          break;
        }

        return context$1$0.abrupt("return");

      case 19:
        indicies[i] += 1;
        for (j = i + 1; j < r; j++) {
          indicies[j] = indicies[j - 1] + 1;
        }
        context$1$0.next = 23;
        return indicies.map(function (i) {
          return pool[i];
        });

      case 23:
        context$1$0.next = 8;
        break;

      case 25:
      case "end":
        return context$1$0.stop();
    }
  }, genCombinations, this);
});

module.exports = genCombinations;

var range = _babelHelpers.interopRequire(require("./range"));

function reversed(array) {
  return array.slice().reverse();
}
// genCombinations('ABCD', 2) --> AB AC AD BC BD CD
// genCombinations(range(4), 3) --> 012 013 023 123

},{"./range":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/range.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js","babel-runtime/regenerator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/regenerator/index.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/genPermutations.js":[function(require,module,exports){
"use strict";

var _core = require("babel-runtime/core-js")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _babelHelpers = require("babel-runtime/helpers")["default"];

var genPermutations = _regeneratorRuntime.mark(

/**
 * Implements Python's itertools.permutations
 *
 * Return successive r length permutations of elements in the iterable.
 * *
 * @param {Iterable} iterable
 * @param {number=} opt_r
 *
 * @return {Iterator}
 */
function genPermutations(iterable, r) {
  var pool, n, indicies, cycles, rangeR, k, i, index, j;
  return _regeneratorRuntime.wrap(function genPermutations$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        pool = _core.Array.from(iterable);
        n = pool.length;

        r = r == null ? n : r;

        if (!(r > n)) {
          context$1$0.next = 5;
          break;
        }

        return context$1$0.abrupt("return");

      case 5:
        indicies = range(n);
        cycles = range(n, n - r, -1);
        rangeR = range(r - 1, -1, -1);
        context$1$0.next = 10;
        return indicies.slice(0, r).map(function (i) {
          return pool[i];
        });

      case 10:
        if (!true) {
          context$1$0.next = 35;
          break;
        }

        k = 0;

      case 12:
        if (!(k < rangeR.length)) {
          context$1$0.next = 31;
          break;
        }

        i = rangeR[k];

        cycles[i] -= 1;
        index = indicies[i];

        if (!(cycles[i] === 0)) {
          context$1$0.next = 22;
          break;
        }

        indicies.splice(i, 1);
        indicies.push(index);
        cycles[i] = n - i;
        context$1$0.next = 28;
        break;

      case 22:
        j = cycles[i];

        indicies[i] = indicies[indicies.length - j];
        indicies[indicies.length - j] = index;
        context$1$0.next = 27;
        return indicies.slice(0, r).map(function (i) {
          return pool[i];
        });

      case 27:
        return context$1$0.abrupt("break", 31);

      case 28:
        k++;
        context$1$0.next = 12;
        break;

      case 31:
        if (!(rangeR.length === k)) {
          context$1$0.next = 33;
          break;
        }

        return context$1$0.abrupt("return");

      case 33:
        context$1$0.next = 10;
        break;

      case 35:
      case "end":
        return context$1$0.stop();
    }
  }, genPermutations, this);
});

module.exports = genPermutations;

var range = _babelHelpers.interopRequire(require("./range"));

// genPermutations('ABCD', 2) --> AB AC AD BA BC BD CA CB CD DA DB DC
// genPermutations(range(3)) --> 012 021 102 120 201 210

},{"./range":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/range.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js","babel-runtime/regenerator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/regenerator/index.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/genRange.js":[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var genRange = _regeneratorRuntime.mark(

/**
 * Implements Python's range function, returns an iterator.
 *
 * If one argument n is passed, iterates over 0...n.
 * If two arguments i,j are passed, iterates over i...j.
 * If three arguments i,j,k are passed, iterates over i, i+k, i+2k, ...j
 *
 * @param {?number=} opt_start Number to start from
 * @param {?number=} opt_end Number to count to
 * @param {?number=} opt_step Step size
 * @return {!Iterator}
 */
function genRange(optStart, optEnd, optStep) {
  var negative, i;
  return _regeneratorRuntime.wrap(function genRange$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(optStart == null)) {
          context$1$0.next = 4;
          break;
        }

        return context$1$0.abrupt("return");

      case 4:
        if (!(optEnd == null)) {
          context$1$0.next = 10;
          break;
        }

        optEnd = optStart;
        optStart = 0;
        optStep = 1;
        context$1$0.next = 16;
        break;

      case 10:
        if (!(optStep == null)) {
          context$1$0.next = 14;
          break;
        }

        optStep = 1;
        context$1$0.next = 16;
        break;

      case 14:
        if (!(optStep === 0)) {
          context$1$0.next = 16;
          break;
        }

        throw new RangeError("opt_step can't be 0");

      case 16:
        negative = optStep < 0;
        i = optStart;

      case 18:
        if (!(negative && i > optEnd || !negative && i < optEnd)) {
          context$1$0.next = 24;
          break;
        }

        context$1$0.next = 21;
        return i;

      case 21:
        i += optStep;
        context$1$0.next = 18;
        break;

      case 24:
      case "end":
        return context$1$0.stop();
    }
  }, genRange, this);
});

module.exports = genRange;

},{"babel-runtime/regenerator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/regenerator/index.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/getDefault.js":[function(require,module,exports){
"use strict";

/**
 * Returns the second argument if the first argument is null or undefined.
 *
 * @param {*} value
 * @param {*} defaultValue
 * @return {?}
 */
module.exports = get;

function get(value, defaultValue) {
  return value == null ? defaultValue : value;
}

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/index.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var Arrays = _babelHelpers.interopRequire(require("./Arrays"));

var Map = _babelHelpers.interopRequire(require("./Map"));

var PriorityQueue = _babelHelpers.interopRequire(require("./PriorityQueue"));

var Set = _babelHelpers.interopRequire(require("./Set"));

var clone = _babelHelpers.interopRequire(require("./clone"));

var clear = _babelHelpers.interopRequire(require("./clear"));

var deepcopy = _babelHelpers.interopRequire(require("./deepcopy"));

var deepmerge = _babelHelpers.interopRequire(require("./deepmerge"));

var gcd = _babelHelpers.interopRequire(require("./gcd"));

var genCombinations = _babelHelpers.interopRequire(require("./genCombinations"));

var genPermutations = _babelHelpers.interopRequire(require("./genPermutations"));

var genRange = _babelHelpers.interopRequire(require("./genRange"));

var getDefault = _babelHelpers.interopRequire(require("./getDefault"));

var fillArray = _babelHelpers.interopRequire(require("./fillArray"));

var forEach = _babelHelpers.interopRequire(require("./forEach"));

var isArrayLike = _babelHelpers.interopRequire(require("./isArrayLike"));

var isBoolean = _babelHelpers.interopRequire(require("./isBoolean"));

var isGraph = _babelHelpers.interopRequire(require("./isGraph"));

var isIterable = _babelHelpers.interopRequire(require("./isIterable"));

var isIterator = _babelHelpers.interopRequire(require("./isIterator"));

var isMap = _babelHelpers.interopRequire(require("./isMap"));

var isPlainObject = _babelHelpers.interopRequire(require("./isPlainObject"));

var mapIterator = _babelHelpers.interopRequire(require("./mapIterator"));

var mapSequence = _babelHelpers.interopRequire(require("./mapSequence"));

var max = _babelHelpers.interopRequire(require("./max"));

var next = _babelHelpers.interopRequire(require("./next"));

var nodesAreEqual = _babelHelpers.interopRequire(require("./nodesAreEqual"));

var range = _babelHelpers.interopRequire(require("./range"));

var someIterator = _babelHelpers.interopRequire(require("./someIterator"));

var toIterator = _babelHelpers.interopRequire(require("./toIterator"));

var _tuple = require("./tuple");

var tuple = _babelHelpers.interopRequireWildcard(_tuple);

var size = _babelHelpers.interopRequire(require("./size"));

var sprintf = _babelHelpers.interopRequire(require("./sprintf"));

var zipIterator = _babelHelpers.interopRequire(require("./zipIterator"));

var zipSequence = _babelHelpers.interopRequire(require("./zipSequence"));

exports.Arrays = Arrays;
exports.Map = Map;
exports.PriorityQueue = PriorityQueue;
exports.Set = Set;
exports.clone = clone;
exports.clear = clear;
exports.deepcopy = deepcopy;
exports.deepmerge = deepmerge;
exports.gcd = gcd;
exports.genCombinations = genCombinations;
exports.genPermutations = genPermutations;
exports.genRange = genRange;
exports.getDefault = getDefault;
exports.fillArray = fillArray;
exports.forEach = forEach;
exports.isArrayLike = isArrayLike;
exports.isBoolean = isBoolean;
exports.isGraph = isGraph;
exports.isIterable = isIterable;
exports.isIterator = isIterator;
exports.isMap = isMap;
exports.isPlainObject = isPlainObject;
exports.mapIterator = mapIterator;
exports.mapSequence = mapSequence;
exports.max = max;
exports.next = next;
exports.nodesAreEqual = nodesAreEqual;
exports.range = range;
exports.someIterator = someIterator;
exports.toIterator = toIterator;
exports.tuple = tuple;
exports.size = size;
exports.sprintf = sprintf;
exports.zipIterator = zipIterator;
exports.zipSequence = zipSequence;

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(_tuple));

Object.defineProperty(exports, "__esModule", {
  value: true
});

},{"./Arrays":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/Arrays.js","./Map":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/Map.js","./PriorityQueue":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/PriorityQueue.js","./Set":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/Set.js","./clear":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/clear.js","./clone":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/clone.js","./deepcopy":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/deepcopy.js","./deepmerge":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/deepmerge.js","./fillArray":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/fillArray.js","./forEach":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/forEach.js","./gcd":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/gcd.js","./genCombinations":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/genCombinations.js","./genPermutations":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/genPermutations.js","./genRange":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/genRange.js","./getDefault":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/getDefault.js","./isArrayLike":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isArrayLike.js","./isBoolean":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isBoolean.js","./isGraph":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isGraph.js","./isIterable":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isIterable.js","./isIterator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isIterator.js","./isMap":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isMap.js","./isPlainObject":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isPlainObject.js","./mapIterator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/mapIterator.js","./mapSequence":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/mapSequence.js","./max":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/max.js","./next":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/next.js","./nodesAreEqual":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/nodesAreEqual.js","./range":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/range.js","./size":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/size.js","./someIterator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/someIterator.js","./sprintf":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/sprintf.js","./toIterator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/toIterator.js","./tuple":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/tuple.js","./zipIterator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/zipIterator.js","./zipSequence":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/zipSequence.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isArrayLike.js":[function(require,module,exports){
"use strict";

/**
 * Returns true of the array is an object and has a numerical length property.
 *
 * @param {?} v
 * @return {bool}
 */
module.exports = isArrayLike;

function isArrayLike(v) {
  return v && typeof v === "object" && typeof v.length === "number" && typeof v !== "function";
}

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isBoolean.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var isBoolean = _babelHelpers.interopRequire(require("lodash/lang/isBoolean"));

module.exports = isBoolean;

},{"babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js","lodash/lang/isBoolean":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isBoolean.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isGraph.js":[function(require,module,exports){
"use strict";

/**
 * Returns true if value is a Graph
 *
 * @param {*} value
 * @return {bool}
 */
module.exports = isGraph;

function isGraph(value) {
  // We are not using instanceof to avoid circular dependencies
  return value && typeof value.addNode === "function";
}

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isIterable.js":[function(require,module,exports){
"use strict";

var _core = require("babel-runtime/core-js")["default"];

/**
 * Returns true if object implement the @@iterator method.
 *
 * @param {*} obj

 * @return {boolean}
 */
module.exports = isIterable;

function isIterable(obj) {
  return typeof obj[_core.Symbol.iterator] === "function";
}

},{"babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isIterator.js":[function(require,module,exports){
"use strict";

/**
 * Returns true if object is an iterator
 *
 * @param {*} obj
 *
 * @return {boolean}
 */
module.exports = isIterator;

function isIterator(obj) {
  return typeof obj.next === "function";
}

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isMap.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

/**
 * Tests whether the value is a Map.
 *
 * @param {*} v The value to test
 * @return {bool}
 */
module.exports = isMap;

var Map = _babelHelpers.interopRequire(require("./Map"));

function isMap(v) {
  return v instanceof Map;
}

},{"./Map":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/Map.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isPlainObject.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var isPlainObject = _babelHelpers.interopRequire(require("lodash/lang/isPlainObject"));

module.exports = isPlainObject;

},{"babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js","lodash/lang/isPlainObject":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isPlainObject.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isSet.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

/**
 * Tests whether the value is a Map.
 *
 * @param {*} v The value to test
 * @return {bool}
 */
module.exports = isSet;

var Set = _babelHelpers.interopRequire(require("./Set"));

function isSet(v) {
  return v instanceof Set;
}

},{"./Set":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/Set.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/mapIterator.js":[function(require,module,exports){
"use strict";

var _core = require("babel-runtime/core-js")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var mapIterator = _regeneratorRuntime.mark(

/**
 * Returns a new iterator which maps every value from the provided iterator via
 * the callback function.
 *
 * @param {Iterator} iterator
 * @param {function} map
 * @param {?=} opt_this_obj
 * @return {Iterator}
 */
function mapIterator(iterator, map, optThisObj) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, v;

  return _regeneratorRuntime.wrap(function mapIterator$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 3;
        _iterator = _core.$for.getIterator(iterator);

      case 5:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 12;
          break;
        }

        v = _step.value;
        context$1$0.next = 9;
        return map.call(optThisObj, v);

      case 9:
        _iteratorNormalCompletion = true;
        context$1$0.next = 5;
        break;

      case 12:
        context$1$0.next = 18;
        break;

      case 14:
        context$1$0.prev = 14;
        context$1$0.t70 = context$1$0["catch"](3);
        _didIteratorError = true;
        _iteratorError = context$1$0.t70;

      case 18:
        context$1$0.prev = 18;
        context$1$0.prev = 19;

        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }

      case 21:
        context$1$0.prev = 21;

        if (!_didIteratorError) {
          context$1$0.next = 24;
          break;
        }

        throw _iteratorError;

      case 24:
        return context$1$0.finish(21);

      case 25:
        return context$1$0.finish(18);

      case 26:
      case "end":
        return context$1$0.stop();
    }
  }, mapIterator, this, [[3, 14, 18, 26], [19,, 21, 25]]);
});

module.exports = mapIterator;

},{"babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/regenerator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/regenerator/index.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/mapSequence.js":[function(require,module,exports){
"use strict";

var _core = require("babel-runtime/core-js")["default"];

var _babelHelpers = require("babel-runtime/helpers")["default"];

/**
 * Helper to map sequence types (arrays, array-like objects, objects, etc).
 * Note that if an array-like object is passed, an array is returned:
 *
 * Array -> Array
 * ArrayLike -> Array
 * Iterator -> Iterator
 * Iterable -> Iterator
 * Object -> Object
 *
 * @param {Iterable} sequence
 * @param {function(this:T,...)} callback
 * @param {T=} this_obj
 * @template T
 *
 * @return {(Array|Object|Iterator)}
 */
module.exports = mapSequence;

var isPlainObject = _babelHelpers.interopRequire(require("lodash/lang/isPlainObject"));

var mapValues = _babelHelpers.interopRequire(require("lodash/object/mapValues"));

var isArrayLike = _babelHelpers.interopRequire(require("./isArrayLike"));

var isIterable = _babelHelpers.interopRequire(require("./isIterable"));

var isIterator = _babelHelpers.interopRequire(require("./isIterator"));

var mapIterator = _babelHelpers.interopRequire(require("./mapIterator"));

var nativeMap = Array.prototype.map;
function mapSequence(sequence, callback, thisObj) {
  if (isArrayLike(sequence)) {
    return nativeMap.call(sequence, callback, thisObj);
  } else if (isIterable(sequence)) {
    sequence = _core.$for.getIterator(sequence);
  }
  if (isIterator(sequence)) {
    return mapIterator(sequence, callback, thisObj);
  } else if (isPlainObject(sequence)) {
    return mapValues(sequence, callback, thisObj);
  } else {
    throw new TypeError("Can't map value of type %s", typeof sequence);
  }
}

},{"./isArrayLike":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isArrayLike.js","./isIterable":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isIterable.js","./isIterator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isIterator.js","./mapIterator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/mapIterator.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js","lodash/lang/isPlainObject":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isPlainObject.js","lodash/object/mapValues":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/object/mapValues.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/max.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

/**
 * Returns the maximum value from an iterable. It uses the optional callback
 * function to determine the value to compare.
 *
 * @param {Iterable} iterable
 * @param {function(?): ?} map
 * @return {?}
 */
module.exports = max;

var forEach = _babelHelpers.interopRequire(require("./forEach"));

function max(iterable, map) {
  var maxComparisonValue = -Infinity;
  var maxValue;

  forEach(iterable, function (value) {
    var comparisonValue = map ? map(value) : value;
    if (comparisonValue > maxComparisonValue) {
      maxComparisonValue = comparisonValue;
      maxValue = value;
    }
  });

  return maxValue;
}

},{"./forEach":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/forEach.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/message.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

/**
 * Returns true if the value can be properly serialized, otherwise false.
 *
 * @param {*} value
 * @return {boolean}
 */
exports.isSupported = isSupported;
exports.serialize = serialize;
exports.deserialize = deserialize;

var isIterable = _babelHelpers.interopRequire(require("./isIterable"));

var isPlainObject = _babelHelpers.interopRequire(require("./isPlainObject"));

var Map = _babelHelpers.interopRequire(require("./Map"));

var Set = _babelHelpers.interopRequire(require("./Set"));

var classes = _babelHelpers.interopRequireWildcard(require("../classes"));

var KEY = "__type-jsnx__";

/**
 * @fileoverview
 * Helper methods to serialize and unserialize data for communicating with
 * workers.
 */

function serializeSet(value) {
  // TODO: serialize nested values
  return (function () {
    var _ref = {};

    _babelHelpers.defineProperty(_ref, KEY, "Set");

    _babelHelpers.defineProperty(_ref, "data", _core.Array.from(value.values()));

    return _ref;
  })();
}

function deserializeSet(value) {
  return new Set(value.data);
}

function serializeMap(value) {
  // TODO: serialize nested values
  return (function () {
    var _ref = {};

    _babelHelpers.defineProperty(_ref, KEY, "Map");

    _babelHelpers.defineProperty(_ref, "data", (function () {
      var _data = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _core.$for.getIterator(value), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var _step$value = _babelHelpers.slicedToArray(_step.value, 2);

          var k = _step$value[0];
          var v = _step$value[1];

          _data.push([k, serialize(v)]);
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      return _data;
    })());

    return _ref;
  })();
}

function deserializeMap(value) {
  return new Map(value.data.map(function (kv) {
    return (kv[1] = deserialize(kv[1]), kv);
  }));
}

function serializeGraph(value) {
  // TODO: serialize complex edge and node data
  return (function () {
    var _ref = {};

    _babelHelpers.defineProperty(_ref, KEY, value.constructor.__name__);

    _babelHelpers.defineProperty(_ref, "data", value.graph);

    _babelHelpers.defineProperty(_ref, "nodes", _core.Array.from(value.node));

    _babelHelpers.defineProperty(_ref, "edges", value.edges(null, true));

    return _ref;
  })();
}

function deserializeGraph(value) {
  var G = new classes[value[KEY]](value.edges, value.data);
  G.addNodesFrom(value.nodes);
  return G;
}
function isSupported(value) {
  var type = typeof value;
  return (
    // Primitives
    value == null || type === "string" || type === "number" || type === "boolean" ||

    // Objects and arrays (we just assume they contain only primitives)
    isPlainObject(value) || Array.isArray(value) ||

    // Our custom collections (shallow)
    value instanceof Map || value instanceof Set ||

    // Graphs
    value.constructor.__name__ === "Graph" || value.constructor.__name__ === "DiGraph" ||

    // Generic iterables
    isIterable(value)
  );
}

function serialize(value) {
  // primitives
  var type = typeof value;
  if (!value || type === "string" || type === "number" || type === "boolean") {
    return value;
  }
  // Collections
  if (value instanceof Set) {
    return serializeSet(value);
  } else if (value instanceof Map) {
    return serializeMap(value);
  }
  // Graphs
  else if (value.constructor.__name__ === "Graph" || value.constructor.__name__ === "DiGraph") {
    return serializeGraph(value);
  }
  // Iterables
  else if (isIterable(value)) {
    // We keep it simple for now and don't serialize the values of the iterable
    // itself
    return _core.Array.from(value);
  }
  // TODO: Handle arrays and objects better

  // default
  return value;
}

function deserialize(value) {
  // primitives
  var type = typeof value;
  if (!value || type === "string" || type === "number" || type === "boolean") {
    return value;
  }
  // custom serializtion?
  if (value[KEY]) {
    switch (value[KEY]) {
      case "Map":
        return deserializeMap(value);
      case "Set":
        return deserializeSet(value);
      case "Graph":
      case "DiGraph":
        return deserializeGraph(value);
    }
  }
  // TODO: Handle arrays and objects better

  // default
  return value;
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

},{"../classes":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/index.js","./Map":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/Map.js","./Set":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/Set.js","./isIterable":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isIterable.js","./isPlainObject":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isPlainObject.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/next.js":[function(require,module,exports){
"use strict";

/**
 * Returns the next value of an iterator or throws an error if the iterator was
 * already consumed.
 *
 * @param {Iterator} iterator
 * @return {?}
 */
module.exports = next;

function next(iterator) {
  var result = iterator.next();
  if (result.done) {
    throw new Error("Iterator is already exhausted");
  }
  return result.value;
}

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/nodesAreEqual.js":[function(require,module,exports){
"use strict";

/**
 * Returns true if the two values are equal node values. If the values are
 * primitives, they are compared directly. If they are objects, their string
 * representation is compared.
 *
 * @param {Node} a
 * @param {Node} b
 * @return {boolean}
 */
module.exports = nodesAreEqual;

function nodesAreEqual(a, b) {
  return a === b || typeof a === "object" && a.toString() === b.toString();
}

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/range.js":[function(require,module,exports){
"use strict";

var _core = require("babel-runtime/core-js")["default"];

var _babelHelpers = require("babel-runtime/helpers")["default"];

/**
 * Implements Python's range function, returns an array.
 *
 * If one argument n is passed, iterates over 0...n.
 * If two arguments i,j are passed, iterates over i...j.
 * If three arguments i,j,k are passed, iterates over i, i+k, i+2k, ...j
 *
 * @param {?number=} optStart Number to start from
 * @param {?number=} optEnd Number to count to
 * @param {?number=} optStep Step size
 * @return {!Array}
 */
module.exports = range;

var genRange = _babelHelpers.interopRequire(require("./genRange"));

function range(optStart, optEnd, optStep) {
  return _core.Array.from(genRange(optStart, optEnd, optStep));
}

},{"./genRange":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/genRange.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/size.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

/**
 * Returns the number of elements in the container. That is
 * the number of elements in the array or object or the length
 * of a string.
 *
 * @param {(string|Object|ArrayLike|Graph)} obj
 *    Object to determine the length of
 *
 * @return {number} The number of elements
 * @throws {TypeError} When length cannot be determined
 */
module.exports = size;

var isArrayLike = _babelHelpers.interopRequire(require("./isArrayLike"));

var isGraph = _babelHelpers.interopRequire(require("./isGraph"));

var isPlainObject = _babelHelpers.interopRequire(require("lodash/lang/isPlainObject"));

var objectSize = _babelHelpers.interopRequire(require("lodash/collection/size"));

function size(obj) {
  if (isGraph(obj)) {
    return obj.numberOfNodes();
  } else if (typeof obj === "string" || isArrayLike(obj)) {
    return obj.length;
  } else if (isPlainObject(obj)) {
    return objectSize(obj);
  } else {
    throw new TypeError("Expected a graph object, array, string or object, but got %s instead", typeof obj);
  }
}

},{"./isArrayLike":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isArrayLike.js","./isGraph":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isGraph.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js","lodash/collection/size":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/collection/size.js","lodash/lang/isPlainObject":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isPlainObject.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/someIterator.js":[function(require,module,exports){
"use strict";

var _core = require("babel-runtime/core-js")["default"];

/**
 * Returns true if the callback function returns true for any of the elements
 * of the iterator.
 *
 * @param {Iterator} iterator
 * @param {function} callback
 * @return {boolean}
 */
module.exports = someIterator;

function someIterator(iterator, callback) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _core.$for.getIterator(iterator), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;

      if (callback(value)) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return false;
}

},{"babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/sprintf.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var sprintf = _babelHelpers.interopRequire(require("tiny-sprintf"));

sprintf.j = function (value) {
  try {
    return JSON.stringify(value);
  } catch (e) {
    return value;
  }
};

module.exports = sprintf;

},{"babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js","tiny-sprintf":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/tiny-sprintf/dist/sprintf.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/toIterator.js":[function(require,module,exports){
"use strict";

var _core = require("babel-runtime/core-js")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _babelHelpers = require("babel-runtime/helpers")["default"];

/**
 * Returns an iterator object for the given array, array-like object
 * or object. Should behave like Python's iter:
 * http://docs.python.org/library/functions.html#iter
 *
 *
 * The iterator object implements the goog.iter.Iterator interface.
 *
 * @param {Iterable} seq
 * @return {!Iterator}
 */
module.exports = toIterator;

var isArrayLike = _babelHelpers.interopRequire(require("./isArrayLike"));

var isIterator = _babelHelpers.interopRequire(require("./isIterator"));

var isIterable = _babelHelpers.interopRequire(require("./isIterable"));

function toIterator(seq) {
  /*jshint expr:true*/
  if (isIterator(seq)) {
    return seq;
  } else if (isIterable(seq)) {
    return _core.$for.getIterator(seq);
  } else if (Array.isArray(seq) || isArrayLike(seq)) {
    return _regeneratorRuntime.mark(function callee$1$0(seq) {
      var i, l;
      return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
        while (1) switch (context$2$0.prev = context$2$0.next) {
          case 0:
            i = 0, l = seq.length;

          case 1:
            if (!(i < l)) {
              context$2$0.next = 7;
              break;
            }

            context$2$0.next = 4;
            return seq[i];

          case 4:
            i++;
            context$2$0.next = 1;
            break;

          case 7:
          case "end":
            return context$2$0.stop();
        }
      }, callee$1$0, this);
    })(seq);
  } else {
    throw new TypeError("Unable to convert " + seq + " to an iterator");
  }
}

},{"./isArrayLike":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isArrayLike.js","./isIterable":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isIterable.js","./isIterator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isIterator.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js","babel-runtime/regenerator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/regenerator/index.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/tuple.js":[function(require,module,exports){
"use strict";

/**
 * This function always returns the same instance of an array for a given number
 * of arguments.
 * It should be used instead of creating temporary arrays, if the arrays are
 * consumed immediately anyways.
 *
 * @param {...*} var_args The elemens of the tuple
 * @return {Array}
 */
exports.tuple2 = tuple2;
exports.tuple3 = tuple3;
exports.tuple4 = tuple4;

/**
 * Same as tuple2, but sets the values on container instead of the allocated
 * array here. Useful to reuse an existing array.
 *
 * @param {...*} var_args The elemens of the tuple
 * @param {Array} opt_container If present, set values there instead
 * @return {Array}
 */
exports.tuple2c = tuple2c;
exports.tuple3c = tuple3c;
exports.tuple4c = tuple4c;
exports.createTupleFactory = createTupleFactory;

var t2 = new Array(2);
var t3 = new Array(3);
var t4 = new Array(4);
function tuple2(x, y) {
  t2[0] = x;
  t2[1] = y;
  return t2;
}

function tuple3(x, y, z) {
  t3[0] = x;
  t3[1] = y;
  t3[2] = z;
  return t3;
}

function tuple4(a, b, c, d) {
  t4[0] = a;
  t4[1] = b;
  t4[2] = c;
  t4[3] = d;
  return t4;
}

function tuple2c(x, y, container) {
  container.length = 2;
  container[0] = x;
  container[1] = y;
  return container;
}

function tuple3c(x, y, z, container) {
  container.length = 3;
  container[0] = x;
  container[1] = y;
  container[2] = z;
  return container;
}

function tuple4c(a, b, c, d, container) {
  container.length = 4;
  container[0] = a;
  container[1] = b;
  container[2] = c;
  container[3] = d;
  return container;
}

function createTupleFactory(count) {
  var t = new Array(count);
  switch (count) {
    case 2:
      return function (a, b) {
        t[0] = a;
        t[1] = b;
        return t;
      };
    case 3:
      return function (a, b, c) {
        t[0] = a;
        t[1] = b;
        t[2] = c;
        return t;
      };
    default:
      throw new Error("Typle size not supported.");
  }
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/zipIterator.js":[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var zipIterator = _regeneratorRuntime.mark(

/**
 * Takes a number of iterators and returns a new iterator which emits an array
 * of each of the iterators next values. Stops when the shortest iterator is
 * exhausted.
 *
 * @param {...Iterator} var_args
 * @return {Iterator}
 */
function zipIterator() {
  var _arguments = arguments;
  var varArgs, length, done, nextZip, i, next;
  return _regeneratorRuntime.wrap(function zipIterator$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        varArgs = _arguments;
        length = varArgs.length;

      case 2:
        if (!true) {
          context$1$0.next = 21;
          break;
        }

        done = false;
        nextZip = new Array(length);
        i = 0;

      case 6:
        if (!(i < length)) {
          context$1$0.next = 15;
          break;
        }

        next = varArgs[i].next();

        if (!next.done) {
          context$1$0.next = 11;
          break;
        }

        done = true;
        return context$1$0.abrupt("break", 15);

      case 11:
        nextZip[i] = next.value;

      case 12:
        i++;
        context$1$0.next = 6;
        break;

      case 15:
        if (!done) {
          context$1$0.next = 17;
          break;
        }

        return context$1$0.abrupt("break", 21);

      case 17:
        context$1$0.next = 19;
        return nextZip;

      case 19:
        context$1$0.next = 2;
        break;

      case 21:
      case "end":
        return context$1$0.stop();
    }
  }, zipIterator, this);
});

module.exports = zipIterator;

// TODO: Use rest parameter once 6to5 is fixed (2.0)

},{"babel-runtime/regenerator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/regenerator/index.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/zipSequence.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

/**
 * Helper to zip sequence types (arrays, array-like objects, objects, etc).
 * All arguments must be the same type. The first argument is used to determine
 * the type.
 * This behaves the same as Python's zip function, i.e. the result has the
 * length of the shortest input.
 *
 * Array -> Array
 * Array-like -> Array
 * Iterator -> Iterator
 *
 * @param {...(Iterable)} var_args
 *
 * @return {!(Array|Iterator)}
 */
module.exports = zipSequence;

var isArrayLike = _babelHelpers.interopRequire(require("./isArrayLike"));

var isIterator = _babelHelpers.interopRequire(require("./isIterator"));

var zipIterator = _babelHelpers.interopRequire(require("./zipIterator"));

function zipArray() {
  for (var _len = arguments.length, varArgs = Array(_len), _key = 0; _key < _len; _key++) {
    varArgs[_key] = arguments[_key];
  }

  // Pre-allocation arrays speeds up assignment drastically, so we want to
  // optimize for that case
  var length = varArgs.length;
  var min = Infinity;
  var i;
  var result;
  var nextZip = new Array(length);

  // first pass
  for (i = 0; i < length; i++) {
    var array = varArgs[i];
    var arrayLength = array.length;
    if (arrayLength < min) {
      min = arrayLength;
      if (min === 0) {
        return []; // backout early
      }
    }
    nextZip[i] = array[0];
  }
  result = new Array(min);
  result[0] = nextZip;

  for (i = 1; i < min; i++) {
    nextZip = new Array(length);
    for (var j = 0; j < length; j++) {
      nextZip[j] = varArgs[j][i];
    }
    result[i] = nextZip;
  }
  return result;
}
function zipSequence() {
  for (var _len = arguments.length, varArgs = Array(_len), _key = 0; _key < _len; _key++) {
    varArgs[_key] = arguments[_key];
  }

  var first = varArgs[0];

  if (isArrayLike(first)) {
    return zipArray.apply(null, varArgs);
  } else if (isIterator(first)) {
    return zipIterator.apply(null, varArgs);
  } else {
    throw new TypeError("Expected an iterator, array-like object or object, but got %s instead", first);
  }
}

},{"./isArrayLike":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isArrayLike.js","./isIterator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/isIterator.js","./zipIterator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/zipIterator.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/centrality/betweenness.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

exports.betweennessCentrality = betweennessCentrality;
exports.genBetweennessCentrality = genBetweennessCentrality;
exports.edgeBetweennessCentrality = edgeBetweennessCentrality;
exports.genEdgeBetweennessCentrality = genEdgeBetweennessCentrality;

var delegate = _babelHelpers.interopRequire(require("../../_internals/delegate"));

"use strict";

var _internals = require("../../_internals");

var Arrays = _internals.Arrays;
var Map = _internals.Map;
var PriorityQueue = _internals.PriorityQueue;
var getDefault = _internals.getDefault;
var tuple2 = _internals.tuple2;

var betweennessCentralityArgs;

function betweennessCentrality(G) {
  var _this = this;

  var optArgDict = arguments[1] === undefined ? {} : arguments[1];

  // TODO: Use destructuring defaults once 6to5 supports it
  // {k=null, normalized=true, weight=null, endpoints=false}
  var k = optArgDict.k;
  var normalized = optArgDict.normalized;
  var weight = optArgDict.weight;
  var endpoints = optArgDict.endpoints;

  normalized = normalized == null ? true : normalized;
  endpoints = endpoints == null ? false : endpoints;

  var betweenness = new Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, v;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          context$2$0.prev = 3;
          _iterator = _core.$for.getIterator(G);

        case 5:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            context$2$0.next = 12;
            break;
          }

          v = _step.value;
          context$2$0.next = 9;
          return tuple2(v, 0);

        case 9:
          _iteratorNormalCompletion = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t71 = context$2$0["catch"](3);
          _didIteratorError = true;
          _iteratorError = context$2$0.t71;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case "end":
          return context$2$0.stop();
      }
    }, callee$1$0, _this, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());

  var nodes = G.nodes();
  if (k != null) {
    nodes = Arrays.sample(nodes, k);
  }

  nodes.forEach(function (s) {
    // single source shortest paths

    var _ref = weight == null ? singleSourceShortestPathBasic(G, s) : // use BFS
    singleSourceDijkstraPathBasic(G, s, weight);

    var _ref2 = _babelHelpers.slicedToArray(_ref, 3);

    var S = _ref2[0];
    var P = _ref2[1];
    var sigma = _ref2[2];
    // use Dijkstra's algorithm
    // accumulation
    betweenness = endpoints ? accumulateEndpoints(betweenness, S, P, sigma, s) : accumulateBasic(betweenness, S, P, sigma, s);
  });
  // rescaling
  return rescale(betweenness, G.order(), normalized, G.isDirected(), k);
}

function genBetweennessCentrality(G, optArgDict) {
  return delegate("betweennessCentrality", [G, optArgDict]);
}

;

var edgeBetweennessCentralityArgs;

function edgeBetweennessCentrality(G) {
  var _this = this;

  var optArgDict = arguments[1] === undefined ? {} : arguments[1];

  // TODO: Use destructuring defaults once 6to5 supports it
  var normalized = optArgDict.normalized;
  var weight = optArgDict.weight;

  normalized = normalized == null ? true : normalized;

  var betweenness = new Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, v;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          context$2$0.prev = 3;
          _iterator = _core.$for.getIterator(G);

        case 5:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            context$2$0.next = 12;
            break;
          }

          v = _step.value;
          context$2$0.next = 9;
          return tuple2(v, 0);

        case 9:
          _iteratorNormalCompletion = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t72 = context$2$0["catch"](3);
          _didIteratorError = true;
          _iteratorError = context$2$0.t72;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case "end":
          return context$2$0.stop();
      }
    }, callee$1$0, _this, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _core.$for.getIterator(G.edgesIter()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var edge = _step.value;

      betweenness.set(edge, 0);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var nodes = G.nodes();
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = _core.$for.getIterator(G), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var s = _step2.value;

      // single source shortest paths

      var _ref = weight == null ? singleSourceShortestPathBasic(G, s) : // use BFS
      singleSourceDijkstraPathBasic(G, s, weight);

      var _ref2 = _babelHelpers.slicedToArray(_ref, 3);

      var S = _ref2[0];
      var P = _ref2[1];
      var sigma = _ref2[2];
      // use Dijkstra's algorithm
      // accumulation
      betweenness = accumulateEdges(betweenness, S, P, sigma, s);
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  // rescaling
  var _iteratorNormalCompletion3 = true;
  var _didIteratorError3 = false;
  var _iteratorError3 = undefined;

  try {
    for (var _iterator3 = _core.$for.getIterator(G), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
      var n = _step3.value;

      betweenness["delete"](n);
    }
  } catch (err) {
    _didIteratorError3 = true;
    _iteratorError3 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
        _iterator3["return"]();
      }
    } finally {
      if (_didIteratorError3) {
        throw _iteratorError3;
      }
    }
  }

  return rescaleE(betweenness, G.order(), normalized, G.isDirected());
}

function genEdgeBetweennessCentrality(G, optArgDict) {
  return delegate("edgeBetweennessCentrality", [G, optArgDict]);
}

;

function singleSourceShortestPathBasic(G, s) {
  var _this = this;

  var S = [];
  var P = new Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _v;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          context$2$0.prev = 3;
          _iterator = _core.$for.getIterator(G);

        case 5:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _v = _step.value;
          context$2$0.next = 9;
          return tuple2(_v, []);

        case 9:
          _iteratorNormalCompletion = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t73 = context$2$0["catch"](3);
          _didIteratorError = true;
          _iteratorError = context$2$0.t73;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case "end":
          return context$2$0.stop();
      }
    }, callee$1$0, _this, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());
  var sigma = new Map(_regeneratorRuntime.mark(function callee$1$1() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _v;

    return _regeneratorRuntime.wrap(function callee$1$1$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          context$2$0.prev = 3;
          _iterator = _core.$for.getIterator(G);

        case 5:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _v = _step.value;
          context$2$0.next = 9;
          return tuple2(_v, 0);

        case 9:
          _iteratorNormalCompletion = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t74 = context$2$0["catch"](3);
          _didIteratorError = true;
          _iteratorError = context$2$0.t74;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case "end":
          return context$2$0.stop();
      }
    }, callee$1$1, _this, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());
  var D = new Map();

  sigma.set(s, 1);
  D.set(s, 0);
  var Q = [s];
  while (Q.length > 0) {
    // use BFS to find shortest paths
    var v = Q.shift();
    S.push(v);
    var Dv = D.get(v);
    var sigmav = sigma.get(v);
    G.neighbors(v).forEach(function (w) {
      if (!D.has(w)) {
        Q.push(w);
        D.set(w, Dv + 1);
      }
      if (D.get(w) === Dv + 1) {
        // this is a shortest path, count paths
        sigma.set(w, sigma.get(w) + sigmav);
        P.get(w).push(v); // predecessors
      }
    });
  }
  return [S, P, sigma];
}

function singleSourceDijkstraPathBasic(G, s) {
  var _this = this;

  var weight = arguments[2] === undefined ? "weight" : arguments[2];

  // modified from Eppstein
  var S = [];
  var P = new Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _v;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          context$2$0.prev = 3;
          _iterator = _core.$for.getIterator(G);

        case 5:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _v = _step.value;
          context$2$0.next = 9;
          return tuple2(_v, []);

        case 9:
          _iteratorNormalCompletion = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t75 = context$2$0["catch"](3);
          _didIteratorError = true;
          _iteratorError = context$2$0.t75;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case "end":
          return context$2$0.stop();
      }
    }, callee$1$0, _this, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());
  var sigma = new Map(_regeneratorRuntime.mark(function callee$1$1() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _v;

    return _regeneratorRuntime.wrap(function callee$1$1$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          context$2$0.prev = 3;
          _iterator = _core.$for.getIterator(G);

        case 5:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _v = _step.value;
          context$2$0.next = 9;
          return tuple2(_v, 0);

        case 9:
          _iteratorNormalCompletion = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t76 = context$2$0["catch"](3);
          _didIteratorError = true;
          _iteratorError = context$2$0.t76;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case "end":
          return context$2$0.stop();
      }
    }, callee$1$1, _this, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());
  var D = new Map();

  sigma.set(s, 1);
  var seen = new Map([tuple2(s, 0)]);
  // use Q as heap with (distance,node id) tuples
  var Q = new PriorityQueue();
  Q.enqueue(0, [s, s]);
  while (Q.size > 0) {
    var _Q$dequeue = Q.dequeue();

    var _Q$dequeue2 = _babelHelpers.slicedToArray(_Q$dequeue, 2);

    var dist = _Q$dequeue2[0];

    var _Q$dequeue2$1 = _babelHelpers.slicedToArray(_Q$dequeue2[1], 2);

    var pred = _Q$dequeue2$1[0];
    var v = _Q$dequeue2$1[1];

    if (D.has(v)) {
      continue; // already searched this node.
    }
    sigma.set(v, sigma.get(v) + sigma.get(pred)); // count paths
    S.push(v);
    D.set(v, dist);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _core.$for.getIterator(G.get(v)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _babelHelpers.slicedToArray(_step.value, 2);

        var w = _step$value[0];
        var edgedata = _step$value[1];

        var vw_dist = dist + getDefault(edgedata[weight], 1);
        if (!D.has(w) && (!seen.has(w) || vw_dist < seen.get(w))) {
          seen.set(w, vw_dist);
          Q.enqueue(vw_dist, [v, w]);
          sigma.set(w, 0);
          P.set(w, [v]);
        } else if (vw_dist === seen.get(w)) {
          // handle equal paths
          sigma.set(w, sigma.get(w) + sigma.get(v));
          P.get(w).push(v);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
  return [S, P, sigma];
}

function accumulateBasic(betweenness, S, P, sigma, s) {
  var _this = this;

  var delta = new Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _s;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          context$2$0.prev = 3;
          _iterator = _core.$for.getIterator(S);

        case 5:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _s = _step.value;
          context$2$0.next = 9;
          return tuple2(_s, 0);

        case 9:
          _iteratorNormalCompletion = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t77 = context$2$0["catch"](3);
          _didIteratorError = true;
          _iteratorError = context$2$0.t77;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case "end":
          return context$2$0.stop();
      }
    }, callee$1$0, _this, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());

  while (S.length > 0) {
    var w = S.pop();
    var coeff = (1 + delta.get(w)) / sigma.get(w);
    P.get(w).forEach(function (v) {
      delta.set(v, delta.get(v) + sigma.get(v) * coeff);
    });
    // handle object nodes
    if (w !== s || typeof w === "object" && w.toString() !== s.toString()) {
      betweenness.set(w, betweenness.get(w) + delta.get(w));
    }
  }
  return betweenness;
}

function accumulateEndpoints(betweenness, S, P, sigma, s) {
  var _this = this;

  betweenness.set(s, betweenness.get(s) + S.length - 1);
  var delta = new Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _s;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          context$2$0.prev = 3;
          _iterator = _core.$for.getIterator(S);

        case 5:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _s = _step.value;
          context$2$0.next = 9;
          return tuple2(_s, 0);

        case 9:
          _iteratorNormalCompletion = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t78 = context$2$0["catch"](3);
          _didIteratorError = true;
          _iteratorError = context$2$0.t78;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case "end":
          return context$2$0.stop();
      }
    }, callee$1$0, _this, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());

  while (S.length > 0) {
    var w = S.pop();
    var coeff = (1 + delta.get(w)) / sigma.get(w);
    P.get(w).forEach(function (v) {
      delta.set(v, delta.get(v) + sigma.get(v) * coeff);
    });
    // handle object nodes
    if (w !== s || typeof w === "object" && w.toString() !== s.toString()) {
      betweenness.set(w, betweenness.get(w) + delta.get(w) + 1);
    }
  }
  return betweenness;
}

function accumulateEdges(betweenness, S, P, sigma, s) {
  var _this = this;

  var delta = new Map(_regeneratorRuntime.mark(function callee$1$0() {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _s;

    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          context$2$0.prev = 3;
          _iterator = _core.$for.getIterator(S);

        case 5:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            context$2$0.next = 12;
            break;
          }

          _s = _step.value;
          context$2$0.next = 9;
          return tuple2(_s, 0);

        case 9:
          _iteratorNormalCompletion = true;
          context$2$0.next = 5;
          break;

        case 12:
          context$2$0.next = 18;
          break;

        case 14:
          context$2$0.prev = 14;
          context$2$0.t79 = context$2$0["catch"](3);
          _didIteratorError = true;
          _iteratorError = context$2$0.t79;

        case 18:
          context$2$0.prev = 18;
          context$2$0.prev = 19;

          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }

        case 21:
          context$2$0.prev = 21;

          if (!_didIteratorError) {
            context$2$0.next = 24;
            break;
          }

          throw _iteratorError;

        case 24:
          return context$2$0.finish(21);

        case 25:
          return context$2$0.finish(18);

        case 26:
        case "end":
          return context$2$0.stop();
      }
    }, callee$1$0, _this, [[3, 14, 18, 26], [19,, 21, 25]]);
  })());

  while (S.length > 0) {
    var w = S.pop();
    var coeff = (1 + delta.get(w)) / sigma.get(w);
    P.get(w).forEach(function (v) {
      var c = sigma.get(v) * coeff;
      var edge = [v, w];
      if (!betweenness.has(edge)) {
        edge = [w, v];
      }
      betweenness.set(edge, betweenness.get(edge) + c);
      delta.set(v, delta.get(v) + c);
    });
    // handle object nodes
    if (w !== s || typeof w === "object" && w.toString() !== s.toString()) {
      betweenness.set(w, betweenness.get(w) + delta.get(w));
    }
  }
  return betweenness;
}

function rescale(betweenness, n, optNormalized, _x, optK) {
  var optDirected = arguments[3] === undefined ? false : arguments[3];

  var scale;
  if (optNormalized) {
    scale = n <= 2 ? null : 1 / ((n - 1) * (n - 2));
  } else {
    // rescale by 2 for undirected graphs
    scale = !optDirected ? 1 / 2 : null;
  }
  if (scale != null) {
    if (optK != null) {
      scale = scale * n / optK;
    }
    betweenness.forEach(function (v, k) {
      return betweenness.set(k, v * scale);
    });
  }
  return betweenness;
}

function rescaleE(betweenness, n, optNormalized, optDirected) {
  var scale;
  if (optNormalized) {
    scale = n <= 1 ? null : 1 / (n * (n - 1));
  } else {
    // rescale by 2 for undirected graphs
    scale = !optDirected ? 1 / 2 : null;
  }
  if (scale != null) {
    betweenness.forEach(function (v, k) {
      return betweenness.set(k, v * scale);
    });
  }
  return betweenness;
}
Object.defineProperty(exports, "__esModule", {
  value: true
});

},{"../../_internals":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/index.js","../../_internals/delegate":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/delegateToWorker.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js","babel-runtime/regenerator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/regenerator/index.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/centrality/index.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _betweenness = require("./betweenness");

var betweenness = _babelHelpers.interopRequireWildcard(_betweenness);

exports.betweenness = betweenness;

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(_betweenness));

Object.defineProperty(exports, "__esModule", {
  value: true
});

},{"./betweenness":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/centrality/betweenness.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/clique.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var findCliques = _regeneratorRuntime.mark(function findCliques(G) {
  var adj, subgraph, candidates, Q, u, ext_u, stack, q, adj_q, subgraph_q, candidates_q, _ref, _ref2;

  return _regeneratorRuntime.wrap(function findCliques$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(G.numberOfNodes() === 0)) {
          context$1$0.next = 2;
          break;
        }

        return context$1$0.abrupt("return", []);

      case 2:
        adj = new Map(mapIterator(G, function (u) {
          var neighbors = new Set(G.neighborsIter(u));
          neighbors["delete"](u);
          return tuple2(u, neighbors);
        }));
        subgraph = new Set(G);
        candidates = new Set(G);
        Q = [null];
        u = max(subgraph, function (u) {
          return candidates.intersection(adj.get(u)).size;
        });
        ext_u = candidates.difference(adj.get(u));
        stack = [];

      case 9:
        if (!true) {
          context$1$0.next = 35;
          break;
        }

        if (!(ext_u.size > 0)) {
          context$1$0.next = 25;
          break;
        }

        q = ext_u.pop();

        candidates["delete"](q);
        Q[Q.length - 1] = q;
        adj_q = adj.get(q);
        subgraph_q = subgraph.intersection(adj_q);

        if (!(subgraph_q.size === 0)) {
          context$1$0.next = 21;
          break;
        }

        context$1$0.next = 19;
        return Q.slice();

      case 19:
        context$1$0.next = 23;
        break;

      case 21:
        candidates_q = candidates.intersection(adj_q);

        if (candidates_q.size > 0) {
          stack.push([subgraph, candidates, ext_u]);
          Q.push(null);
          subgraph = subgraph_q;
          candidates = candidates_q;
          u = max(subgraph, function (u) {
            return candidates.intersection(adj.get(u)).size;
          });
          ext_u = candidates.difference(adj.get(u));
        }

      case 23:
        context$1$0.next = 33;
        break;

      case 25:
        if (!(Q.length === 0 || stack.length === 0)) {
          context$1$0.next = 27;
          break;
        }

        return context$1$0.abrupt("break", 35);

      case 27:
        Q.pop();
        _ref = stack.pop();
        _ref2 = _babelHelpers.slicedToArray(_ref, 3);
        subgraph = _ref2[0];
        candidates = _ref2[1];
        ext_u = _ref2[2];

      case 33:
        context$1$0.next = 9;
        break;

      case 35:
      case "end":
        return context$1$0.stop();
    }
  }, findCliques, this);
});

var findCliquesRecursive = _regeneratorRuntime.mark(function findCliquesRecursive(G) {
  var expand = _regeneratorRuntime.mark(function expand(subgraph, candidates) {
    var u, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, q, adj_q, subgraph_q, candidates_q;

    return _regeneratorRuntime.wrap(function expand$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          u = max(subgraph, function (u) {
            return candidates.intersection(adj.get(u)).size;
          });
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          context$2$0.prev = 4;
          _iterator = _core.$for.getIterator(candidates.difference(adj.get(u)));

        case 6:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            context$2$0.next = 24;
            break;
          }

          q = _step.value;

          candidates["delete"](q);
          Q.push(q);
          adj_q = adj.get(q);
          subgraph_q = subgraph.intersection(adj_q);

          if (!(subgraph_q.size === 0)) {
            context$2$0.next = 17;
            break;
          }

          context$2$0.next = 15;
          return Q.slice();

        case 15:
          context$2$0.next = 20;
          break;

        case 17:
          candidates_q = candidates.intersection(adj_q);

          if (!(candidates_q.size > 0)) {
            context$2$0.next = 20;
            break;
          }

          return context$2$0.delegateYield(expand(subgraph_q, candidates_q), "t58", 20);

        case 20:
          Q.pop();

        case 21:
          _iteratorNormalCompletion = true;
          context$2$0.next = 6;
          break;

        case 24:
          context$2$0.next = 30;
          break;

        case 26:
          context$2$0.prev = 26;
          context$2$0.t59 = context$2$0["catch"](4);
          _didIteratorError = true;
          _iteratorError = context$2$0.t59;

        case 30:
          context$2$0.prev = 30;
          context$2$0.prev = 31;

          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }

        case 33:
          context$2$0.prev = 33;

          if (!_didIteratorError) {
            context$2$0.next = 36;
            break;
          }

          throw _iteratorError;

        case 36:
          return context$2$0.finish(33);

        case 37:
          return context$2$0.finish(30);

        case 38:
        case "end":
          return context$2$0.stop();
      }
    }, expand, this, [[4, 26, 30, 38], [31,, 33, 37]]);
  });

  var adj, Q;
  return _regeneratorRuntime.wrap(function findCliquesRecursive$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!(G.size === 0)) {
          context$1$0.next = 3;
          break;
        }

        context$1$0.next = 3;
        return [];

      case 3:
        adj = new Map(mapIterator(G, function (u) {
          var neighbors = new Set(G.neighborsIter(u));
          neighbors["delete"](u);
          return tuple2(u, neighbors);
        }));
        Q = [];
        return context$1$0.delegateYield(expand(new Set(G), new Set(G)), "t60", 6);

      case 6:
      case "end":
        return context$1$0.stop();
    }
  }, findCliquesRecursive, this);
});

exports.findCliques = findCliques;
exports.genFindCliques = genFindCliques;
exports.findCliquesRecursive = findCliquesRecursive;
exports.genFindCliquesRecursive = genFindCliquesRecursive;
exports.graphCliqueNumber = graphCliqueNumber;
exports.genGraphCliqueNumber = genGraphCliqueNumber;
exports.graphNumberOfCliques = graphNumberOfCliques;
exports.genGraphNumberOfCliques = genGraphNumberOfCliques;
exports.numberOfCliques = numberOfCliques;
exports.genNumberOfCliques = genNumberOfCliques;

var delegate = _babelHelpers.interopRequire(require("../_internals/delegate"));

"use strict";

var _internals = require("../_internals");

var Map = _internals.Map;
var Set = _internals.Set;
var mapIterator = _internals.mapIterator;
var max = _internals.max;
var tuple2 = _internals.tuple2;

function genFindCliques(G) {
  return delegate("findCliques", [G]);
}

;

function genFindCliquesRecursive(G) {
  return delegate("findCliquesRecursive", [G]);
}

;

function graphCliqueNumber(G, optCliques) {
  if (optCliques == null) {
    optCliques = findCliques(G);
  }
  return max(optCliques, function (c) {
    return c.length;
  }).length;
}

function genGraphCliqueNumber(G, optCliques) {
  return delegate("graphCliqueNumber", [G, optCliques]);
}

;

function graphNumberOfCliques(G, optCliques) {
  if (optCliques == null) {
    optCliques = findCliques(G);
  }
  return _core.Array.from(optCliques).length;
}

function genGraphNumberOfCliques(G, optCliques) {
  return delegate("graphNumberOfCliques", [G, optCliques]);
}

;

function numberOfCliques(G, optNodes, optCliques) {
  optCliques = _core.Array.from(optCliques || findCliques(G));

  if (optNodes == null) {
    optNodes = G.nodes(); // none, get entire graph
  }

  var numcliq;
  if (!Array.isArray(optNodes)) {
    var v = optNodes;
    numcliq = optCliques.filter(function (c) {
      return new Set(c).has(v);
    }).length;
  } else {
    optCliques = optCliques.map(function (c) {
      return new Set(c);
    });
    numcliq = new Map();
    optNodes.forEach(function (v) {
      numcliq.set(v, optCliques.filter(function (c) {
        return c.has(v);
      }).length);
    });
  }
  return numcliq;
}

function genNumberOfCliques(G, optNodes, optCliques) {
  return delegate("numberOfCliques", [G, optNodes, optCliques]);
}

;
Object.defineProperty(exports, "__esModule", {
  value: true
});

/*jshint ignore:start*/

/*jshint ignore:end*/

},{"../_internals":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/index.js","../_internals/delegate":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/delegateToWorker.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js","babel-runtime/regenerator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/regenerator/index.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/cluster.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var trianglesAndDegreeIter = _regeneratorRuntime.mark(function trianglesAndDegreeIter(G, optNodes) {
  var nodesNbrs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, v, vNbrs, vset, ntriangles, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, w, wset;

  return _regeneratorRuntime.wrap(function trianglesAndDegreeIter$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!G.isMultigraph()) {
          context$1$0.next = 2;
          break;
        }

        throw new JSNetworkXError("Not defined for multigraphs.");

      case 2:
        nodesNbrs = mapIterator(optNodes == null ? G : G.nbunchIter(optNodes), function (n) {
          return tuple2(n, G.get(n));
        });
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 6;
        _iterator = _core.$for.getIterator(nodesNbrs);

      case 8:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 39;
          break;
        }

        _step$value = _babelHelpers.slicedToArray(_step.value, 2);
        v = _step$value[0];
        vNbrs = _step$value[1];
        vset = new Set(vNbrs.keys());

        vset["delete"](v);
        ntriangles = 0;
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 18;

        for (_iterator2 = _core.$for.getIterator(vset); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          w = _step2.value;
          wset = new Set(G.get(w).keys());

          wset["delete"](w);
          ntriangles += vset.intersection(wset).size;
        }
        context$1$0.next = 26;
        break;

      case 22:
        context$1$0.prev = 22;
        context$1$0.t61 = context$1$0["catch"](18);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t61;

      case 26:
        context$1$0.prev = 26;
        context$1$0.prev = 27;

        if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
          _iterator2["return"]();
        }

      case 29:
        context$1$0.prev = 29;

        if (!_didIteratorError2) {
          context$1$0.next = 32;
          break;
        }

        throw _iteratorError2;

      case 32:
        return context$1$0.finish(29);

      case 33:
        return context$1$0.finish(26);

      case 34:
        context$1$0.next = 36;
        return tuple3(v, vset.size, ntriangles);

      case 36:
        _iteratorNormalCompletion = true;
        context$1$0.next = 8;
        break;

      case 39:
        context$1$0.next = 45;
        break;

      case 41:
        context$1$0.prev = 41;
        context$1$0.t62 = context$1$0["catch"](6);
        _didIteratorError = true;
        _iteratorError = context$1$0.t62;

      case 45:
        context$1$0.prev = 45;
        context$1$0.prev = 46;

        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }

      case 48:
        context$1$0.prev = 48;

        if (!_didIteratorError) {
          context$1$0.next = 51;
          break;
        }

        throw _iteratorError;

      case 51:
        return context$1$0.finish(48);

      case 52:
        return context$1$0.finish(45);

      case 53:
      case "end":
        return context$1$0.stop();
    }
  }, trianglesAndDegreeIter, this, [[6, 41, 45, 53], [18, 22, 26, 34], [27,, 29, 33], [46,, 48, 52]]);
});

var weightedTrianglesAndDegreeIter = _regeneratorRuntime.mark(function weightedTrianglesAndDegreeIter(G, optNodes) {
  var optWeight = arguments[2] === undefined ? "weight" : arguments[2];

  var maxWeight, nodesNbrs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, i, nbrs, inbrs, weightedTriangles, seen, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, j, weightij, jnbrs, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, k, weightjk, weightki;

  return _regeneratorRuntime.wrap(function weightedTrianglesAndDegreeIter$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        if (!G.isMultigraph()) {
          context$1$0.next = 2;
          break;
        }

        throw new JSNetworkXError("Not defined for multigraphs.");

      case 2:
        maxWeight = optWeight == null || G.edges().length === 0 ? 1 : max(mapIterator(G.edgesIter(true), function (_ref) {
          var _ref2 = _babelHelpers.slicedToArray(_ref, 3);

          var u = _ref2[0];
          var v = _ref2[1];
          var data = _ref2[2];
          return getDefault(data[optWeight], 1);
        }));
        nodesNbrs = mapIterator(optNodes == null ? G : G.nbunchIter(optNodes), function (n) {
          return tuple2(n, G.get(n));
        });
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 7;
        _iterator = _core.$for.getIterator(nodesNbrs);

      case 9:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 67;
          break;
        }

        _step$value = _babelHelpers.slicedToArray(_step.value, 2);
        i = _step$value[0];
        nbrs = _step$value[1];
        inbrs = new Set(nbrs.keys()).difference([i]);
        weightedTriangles = 0;
        seen = new Set();
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 19;
        _iterator2 = _core.$for.getIterator(inbrs);

      case 21:
        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
          context$1$0.next = 48;
          break;
        }

        j = _step2.value;
        weightij = getDefault(nbrs.get(j)[optWeight], 1) / maxWeight;

        seen.add(j);
        jnbrs = new Set(G.get(j).keys()).difference(seen);
        _iteratorNormalCompletion3 = true;
        _didIteratorError3 = false;
        _iteratorError3 = undefined;
        context$1$0.prev = 29;

        for (_iterator3 = _core.$for.getIterator(inbrs.intersection(jnbrs)); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          k = _step3.value;
          weightjk = getDefault(G.get(j).get(k)[optWeight], 1) / maxWeight;
          weightki = getDefault(nbrs.get(k)[optWeight], 1) / maxWeight;

          weightedTriangles += Math.pow(weightij * weightjk * weightki, 1 / 3);
        }
        context$1$0.next = 37;
        break;

      case 33:
        context$1$0.prev = 33;
        context$1$0.t63 = context$1$0["catch"](29);
        _didIteratorError3 = true;
        _iteratorError3 = context$1$0.t63;

      case 37:
        context$1$0.prev = 37;
        context$1$0.prev = 38;

        if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
          _iterator3["return"]();
        }

      case 40:
        context$1$0.prev = 40;

        if (!_didIteratorError3) {
          context$1$0.next = 43;
          break;
        }

        throw _iteratorError3;

      case 43:
        return context$1$0.finish(40);

      case 44:
        return context$1$0.finish(37);

      case 45:
        _iteratorNormalCompletion2 = true;
        context$1$0.next = 21;
        break;

      case 48:
        context$1$0.next = 54;
        break;

      case 50:
        context$1$0.prev = 50;
        context$1$0.t64 = context$1$0["catch"](19);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t64;

      case 54:
        context$1$0.prev = 54;
        context$1$0.prev = 55;

        if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
          _iterator2["return"]();
        }

      case 57:
        context$1$0.prev = 57;

        if (!_didIteratorError2) {
          context$1$0.next = 60;
          break;
        }

        throw _iteratorError2;

      case 60:
        return context$1$0.finish(57);

      case 61:
        return context$1$0.finish(54);

      case 62:
        context$1$0.next = 64;
        return tuple3(i, inbrs.size, weightedTriangles * 2);

      case 64:
        _iteratorNormalCompletion = true;
        context$1$0.next = 9;
        break;

      case 67:
        context$1$0.next = 73;
        break;

      case 69:
        context$1$0.prev = 69;
        context$1$0.t65 = context$1$0["catch"](7);
        _didIteratorError = true;
        _iteratorError = context$1$0.t65;

      case 73:
        context$1$0.prev = 73;
        context$1$0.prev = 74;

        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }

      case 76:
        context$1$0.prev = 76;

        if (!_didIteratorError) {
          context$1$0.next = 79;
          break;
        }

        throw _iteratorError;

      case 79:
        return context$1$0.finish(76);

      case 80:
        return context$1$0.finish(73);

      case 81:
      case "end":
        return context$1$0.stop();
    }
  }, weightedTrianglesAndDegreeIter, this, [[7, 69, 73, 81], [19, 50, 54, 62], [29, 33, 37, 45], [38,, 40, 44], [55,, 57, 61], [74,, 76, 80]]);
});

exports.triangles = triangles;
exports.genTriangles = genTriangles;
exports.averageClustering = averageClustering;
exports.genAverageClustering = genAverageClustering;
exports.clustering = clustering;
exports.genClustering = genClustering;
exports.transitivity = transitivity;
exports.genTransitivity = genTransitivity;
exports.squareClustering = squareClustering;
exports.genSquareClustering = genSquareClustering;

var delegate = _babelHelpers.interopRequire(require("../_internals/delegate"));

"use strict";

var JSNetworkXError = require("../exceptions/JSNetworkXError");

var _internals = require("../_internals");

var Map = _internals.Map;
var Set = _internals.Set;
var genCombinations = _internals.genCombinations;
var getDefault = _internals.getDefault;
var mapIterator = _internals.mapIterator;
var max = _internals.max;
var next = _internals.next;
var tuple2 = _internals.tuple2;
var tuple3 = _internals.tuple3;

function triangles(G, optNodes) {
  if (G.isDirected()) {
    throw new JSNetworkXError("triangles() is not defined for directed graphs.");
  }

  if (optNodes != null && G.hasNode(optNodes)) {
    // return single value
    return Math.floor(next(trianglesAndDegreeIter(G, optNodes))[2] / 2);
  }

  return new Map(mapIterator(trianglesAndDegreeIter(G, optNodes), function (_ref) {
    var _ref2 = _babelHelpers.slicedToArray(_ref, 3);

    var v = _ref2[0];
    var _ = _ref2[1];
    var triangles = _ref2[2];
    return tuple2(v, Math.floor(triangles / 2), v);
  }));
}

function genTriangles(G, optNodes) {
  return delegate("triangles", [G, optNodes]);
}

;

function averageClustering(G, optNodes, optWeight) {
  var optCountZeros = arguments[3] === undefined ? true : arguments[3];

  var clusters = _core.Array.from(clustering(G, optNodes, optWeight).values());

  if (!optCountZeros) {
    clusters = clusters.filter(function (v) {
      return v > 0;
    });
  }
  return clusters.reduce(function (s, x) {
    return s + x;
  }, 0) / clusters.length;
}

function genAverageClustering(G, optNodes, optWeight, optCountZeros) {
  return delegate("averageClustering", [G, optNodes, optWeight, optCountZeros]);
}

;

function clustering(G, optNodes, optWeight) {
  if (G.isDirected()) {
    throw new JSNetworkXError("Clustering algorithms are not defined for directed graphs.");
  }

  var trianglesIter = optWeight == null ? trianglesAndDegreeIter(G, optNodes) : weightedTrianglesAndDegreeIter(G, optNodes, optWeight);

  var clusters = new Map(mapIterator(trianglesIter, function (_ref) {
    var _ref2 = _babelHelpers.slicedToArray(_ref, 3);

    var node = _ref2[0];
    var degree = _ref2[1];
    var triangles = _ref2[2];

    return tuple2(node, triangles === 0 ? 0 : triangles / (degree * (degree - 1)));
  }));

  return G.hasNode(optNodes) ? next(clusters.values()) : clusters;
}

function genClustering(G, optNodes, optWeight) {
  return delegate("clustering", [G, optNodes, optWeight]);
}

;

function transitivity(G) {
  var triangles = 0; // 6 times number of triangles
  var triples = 0; // 2 times number of connected triples

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _core.$for.getIterator(trianglesAndDegreeIter(G)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _babelHelpers.slicedToArray(_step.value, 3);

      var node = _step$value[0];
      var degree = _step$value[1];
      var triangles_ = _step$value[2];

      triples += degree * (degree - 1);
      triangles += triangles_;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return triangles === 0 ? 0 : triangles / triples;
}

function genTransitivity(G) {
  return delegate("transitivity", [G]);
}

;

function squareClustering(G, optNodes) {
  var nodesIter = optNodes == null ? G : G.nbunchIter(optNodes);
  var clustering = new Map();

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _core.$for.getIterator(nodesIter), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var v = _step.value;

      clustering.set(v, 0);
      var potential = 0;

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _core.$for.getIterator(genCombinations(G.get(v).keys(), 2)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var _step2$value = _babelHelpers.slicedToArray(_step2.value, 2);

          var u = _step2$value[0];
          var w = _step2$value[1];

          var squares = new Set(G.get(u).keys()).intersection(new Set(G.get(w).keys()));
          squares["delete"](v);
          squares = squares.size;

          clustering.set(v, clustering.get(v) + squares);
          var degm = squares + 1;
          if (G.get(u).has(w)) {
            degm += 1;
          }
          potential += (G.get(u).size - degm) * (G.get(w).size - degm) + squares;
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }

      if (potential > 0) {
        clustering.set(v, clustering.get(v) / potential);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  if (G.hasNode(optNodes)) {
    return next(clustering.values()); // return single value
  }
  return clustering;
}

function genSquareClustering(G, optNodes) {
  return delegate("squareClustering", [G, optNodes]);
}

;
Object.defineProperty(exports, "__esModule", {
  value: true
});

/*jshint ignore:start*/

/*jshint ignore:end*/

},{"../_internals":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/index.js","../_internals/delegate":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/delegateToWorker.js","../exceptions/JSNetworkXError":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/JSNetworkXError.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js","babel-runtime/regenerator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/regenerator/index.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/dag.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

exports.isDirectedAcyclicGraph = isDirectedAcyclicGraph;
exports.genIsDirectedAcyclicGraph = genIsDirectedAcyclicGraph;
exports.topologicalSort = topologicalSort;
exports.genTopologicalSort = genTopologicalSort;
exports.topologicalSortRecursive = topologicalSortRecursive;
exports.genTopologicalSortRecursive = genTopologicalSortRecursive;
exports.isAperiodic = isAperiodic;
exports.genIsAperiodic = genIsAperiodic;

var delegate = _babelHelpers.interopRequire(require("../_internals/delegate"));

"use strict";

var JSNetworkXError = _babelHelpers.interopRequire(require("../exceptions/JSNetworkXError"));

var JSNetworkXUnfeasible = _babelHelpers.interopRequire(require("../exceptions/JSNetworkXUnfeasible"));

var _internals = require("../_internals");

var Map = _internals.Map;
var Set = _internals.Set;
var forEach = _internals.forEach;
var gcd = _internals.gcd;

function isDirectedAcyclicGraph(G) {
  try {
    topologicalSort(G);
    return true;
  } catch (ex) {
    if (ex instanceof JSNetworkXUnfeasible) {
      return false;
    }
    throw ex;
  }
}

function genIsDirectedAcyclicGraph(G) {
  return delegate("isDirectedAcyclicGraph", [G]);
}

;

function topologicalSort(G, optNbunch) {
  if (!G.isDirected()) {
    throw new JSNetworkXError("Topological sort not defined on undirected graphs.");
  }

  // nonrecursive version
  var seen = new Set();
  var orderExplored = []; // provide order and
  // fast search without more general priorityDictionary
  var explored = new Set();

  if (optNbunch == null) {
    optNbunch = G.nodesIter();
  }

  forEach(optNbunch, function (v) {
    // process all vertices in G
    if (explored.has(v)) {
      return; // continue
    }

    var fringe = [v]; // nodes yet to look at
    while (fringe.length > 0) {
      var w = fringe[fringe.length - 1]; // depth first search
      if (explored.has(w)) {
        // already looked down this branch
        fringe.pop();
        continue;
      }
      seen.add(w); // mark as seen
      // Check successors for cycles for new nodes
      var newNodes = [];
      /*jshint loopfunc:true*/
      G.get(w).forEach(function (_, n) {
        if (!explored.has(n)) {
          if (seen.has(n)) {
            // CYCLE !!
            throw new JSNetworkXUnfeasible("Graph contains a cycle.");
          }
          newNodes.push(n);
        }
      });
      if (newNodes.length > 0) {
        // add new nodes to fringe
        fringe.push.apply(fringe, newNodes);
      } else {
        explored.add(w);
        orderExplored.unshift(w);
      }
    }
  });

  return orderExplored;
}

function genTopologicalSort(G, optNbunch) {
  return delegate("topologicalSort", [G, optNbunch]);
}

;

function topologicalSortRecursive(G, optNbunch) {
  if (!G.isDirected()) {
    throw new JSNetworkXError("Topological sort not defined on undirected graphs.");
  }

  // function for recursive dfs
  /**
   * @param {Graph} G graph
   * @param {Set} seen
   * @param {Array} explored
   * @param {string} v
   * @return {boolean}
   */
  function _dfs(G, seen, explored, v) {
    seen.add(v);
    G.get(v).forEach(function (_, w) {
      if (!seen.has(w)) {
        if (!_dfs(G, seen, explored, w)) {
          return false;
        }
      } else if (seen.has(w) && explored.indexOf(w) === -1) {
        throw new JSNetworkXUnfeasible("Graph contains a cycle.");
      }
    });
    explored.unshift(v);
    return true;
  }

  var seen = new Set();
  var explored = [];

  if (optNbunch == null) {
    optNbunch = G.nodesIter();
  }

  forEach(optNbunch, function (v) {
    if (explored.indexOf(v) === -1) {
      if (!_dfs(G, seen, explored, v)) {
        throw new JSNetworkXUnfeasible("Graph contains a cycle.");
      }
    }
  });

  return explored;
}

function genTopologicalSortRecursive(G, optNbunch) {
  return delegate("topologicalSortRecursive", [G, optNbunch]);
}

;

function isAperiodic(_x) {
  var _left;

  var _again = true;

  _function: while (_again) {
    _again = false;
    var G = _x;
    next = levels = thisLevel = g = l = nextLevel = i = u = undefined;

    if (!G.isDirected()) {
      throw new JSNetworkXError("is_aperiodic not defined for undirected graphs.");
    }

    var next = G.nodesIter().next();
    if (next.done) {
      return true;
    }
    var levels = new Map();
    levels.set(next.value, 0);
    var thisLevel = [next.value];
    var g = 0;
    var l = 1;

    while (thisLevel.length > 0) {
      var nextLevel = [];
      for (var i = 0; i < thisLevel.length; i++) {
        var u = thisLevel[i];
        /*jshint loopfunc:true*/
        G.get(u).forEach(function (_, v) {
          if (levels.has(v)) {
            // non-tree edge
            g = gcd(g, levels.get(u) - levels.get(v) + 1);
          } else {
            // tree edge
            nextLevel.push(v);
            levels.set(v, l);
          }
        });
      }
      thisLevel = nextLevel;
      l += 1;
    }

    if (levels.size === G.numberOfNodes()) {
      return g === 1;
    }

    if (!(_left = g === 1)) {
      return _left;
    }

    _x = G.subgraph(new Set(G.nodes()).difference(levels.keys()));
    _again = true;
    continue _function;
  }
}

function genIsAperiodic(G) {
  return delegate("isAperiodic", [G]);
}

;
Object.defineProperty(exports, "__esModule", {
  value: true
});

/*jshint ignore:start*/

/*jshint ignore:end*/

},{"../_internals":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/index.js","../_internals/delegate":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/delegateToWorker.js","../exceptions/JSNetworkXError":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/JSNetworkXError.js","../exceptions/JSNetworkXUnfeasible":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/JSNetworkXUnfeasible.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/graphical.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

exports.isGraphical = isGraphical;
exports.genIsGraphical = genIsGraphical;
exports.isValidDegreeSequence = isValidDegreeSequence;
exports.genIsValidDegreeSequence = genIsValidDegreeSequence;
exports.isValidDegreeSequenceHavelHakimi = isValidDegreeSequenceHavelHakimi;
exports.genIsValidDegreeSequenceHavelHakimi = genIsValidDegreeSequenceHavelHakimi;
exports.isValidDegreeSequenceErdosGallai = isValidDegreeSequenceErdosGallai;
exports.genIsValidDegreeSequenceErdosGallai = genIsValidDegreeSequenceErdosGallai;

var delegate = _babelHelpers.interopRequire(require("../_internals/delegate"));

"use strict";

var _exceptions = require("../exceptions");

var JSNetworkXException = _exceptions.JSNetworkXException;
var JSNetworkXUnfeasible = _exceptions.JSNetworkXUnfeasible;

var fillArray = _babelHelpers.interopRequire(require("../_internals/fillArray"));

function isGraphical(sequence) {
  var optMethod = arguments[1] === undefined ? "hh" : arguments[1];

  switch (optMethod) {
    case "eg":
      return isValidDegreeSequenceErdosGallai(_core.Array.from(sequence));
    case "hh":
      return isValidDegreeSequenceHavelHakimi(_core.Array.from(sequence));
    default:
      throw new JSNetworkXException("`opt_method` must be 'eg' or 'hh'");
  }
}

function genIsGraphical(sequence, optMethod) {
  return delegate("isGraphical", [sequence, optMethod]);
}

;

function isValidDegreeSequence(sequence, optMethod) {
  return isGraphical(sequence, optMethod);
}

function genIsValidDegreeSequence(sequence, optMethod) {
  return delegate("isValidDegreeSequence", [sequence, optMethod]);
}

;

function basicGraphicalTests(sequence) {
  // sort and perform some simple tests on the sequence
  if (!sequence.every(function (x) {
    return Math.floor(x) === x;
  })) {
    // list of positive intengers
    throw new JSNetworkXUnfeasible();
  }

  var numberOfNodes = sequence.length;
  var numDegress = fillArray(numberOfNodes, 0);
  var maxDegree = 0;
  var minDegree = numberOfNodes;
  var degreeSum = 0;
  var n = 0;

  for (var i = 0; i < numberOfNodes; i++) {
    var degree = sequence[i];
    // Reject if degree is negative or larger than the sequence length
    if (degree < 0 || degree >= numberOfNodes) {
      throw new JSNetworkXUnfeasible();
    }
    // process only the non-zero integers
    else if (degree > 0) {
      maxDegree = Math.max(maxDegree, degree);
      minDegree = Math.min(minDegree, degree);
      degreeSum += degree;
      n += 1;
      numDegress[degree] += 1;
    }
  }
  // Reject sequence if it has odd sum or is over-saturated
  if (degreeSum % 2 === 1 || degreeSum > n * (n - 1)) {
    throw new JSNetworkXUnfeasible();
  }
  return [maxDegree, minDegree, degreeSum, n, numDegress];
}

function isValidDegreeSequenceHavelHakimi(degreeSequence) {
  var _;
  var maxDegree;
  var minDegree;
  var n;
  var numDegrees;

  try {
    var _ref = basicGraphicalTests(degreeSequence);

    var _ref2 = _babelHelpers.slicedToArray(_ref, 5);

    maxDegree = _ref2[0];
    minDegree = _ref2[1];
    _ = _ref2[2];
    n = _ref2[3];
    numDegrees = _ref2[4];
  } catch (ex) {
    if (ex instanceof JSNetworkXUnfeasible) {
      return false;
    } else {
      throw ex;
    }
  }
  // Accept if sequence has no non-zero degrees or passes the ZZ condition
  if (n === 0 || 4 * minDegree * n >= Math.pow(maxDegree + minDegree + 1, 2)) {
    return true;
  }

  var modstubs = fillArray(maxDegree + 1, 0);
  // successively reduce degree sequence by removing node of maximum degree
  while (n > 0) {
    // Retrieve the maximum degree in the sequence
    while (numDegrees[maxDegree] === 0) {
      maxDegree -= 1;
    }
    // If there are not enough stubs to connect to, then the sequence is not
    // graphical
    if (maxDegree > n - 1) {
      return false;
    }

    // Remove largest stub in list
    numDegrees[maxDegree] -= 1;
    n -= 1;
    // Reduce the next maxDegree largest stubs
    var mslen = 0;
    var k = maxDegree;
    for (var i = 0; i < maxDegree; i++) {
      while (numDegrees[k] === 0) {
        k -= 1;
      }
      numDegrees[k] -= 1;
      n -= 1;
      if (k > 1) {
        modstubs[mslen] = k - 1;
        mslen += 1;
      }
    }
    // Add back to the list any non-zero stubs that were removed
    for (i = 0; i < mslen; i++) {
      var stub = modstubs[i];
      numDegrees[stub] += 1;
      n += 1;
    }
  }
  return true;
}

function genIsValidDegreeSequenceHavelHakimi(degreeSequence) {
  return delegate("isValidDegreeSequenceHavelHakimi", [degreeSequence]);
}

;

function isValidDegreeSequenceErdosGallai(degreeSequence) {
  var maxDegree;
  var minDegree;
  var _;
  var n;
  var numDegrees;

  try {
    var _ref = basicGraphicalTests(degreeSequence);

    var _ref2 = _babelHelpers.slicedToArray(_ref, 5);

    maxDegree = _ref2[0];
    minDegree = _ref2[1];
    _ = _ref2[2];
    n = _ref2[3];
    numDegrees = _ref2[4];
  } catch (ex) {
    if (ex instanceof JSNetworkXUnfeasible) {
      return false;
    } else {
      throw ex;
    }
  }
  // Accept if sequence has no non-zero degrees or passes the ZZ condition
  if (n === 0 || 4 * minDegree * n >= Math.pow(maxDegree + minDegree + 1, 2)) {
    return true;
  }

  // Perform the EG checks using the reformulation of Zverovich and Zverovich
  var k = 0;
  var degreeSum = 0;
  var sumnj = 0;
  var sumjnj = 0;

  for (var dk = maxDegree; dk >= minDegree; dk -= 1) {
    if (dk < k + 1) {
      // Check if already past Durfee index
      return true;
    }
    if (numDegrees[dk] > 0) {
      var runSize = numDegrees[dk]; // Process a run of identical-valued degrees
      if (dk < k + runSize) {
        // Check if end of run is past Durfee index
        runSize = dk - k; // Adjust back to Durfee index
      }
      degreeSum += runSize * dk;
      for (var v = 0; v < runSize; v++) {
        sumnj += numDegrees[k + v];
        sumjnj += (k + v) * numDegrees[k + v];
      }
      k += runSize;
      if (degreeSum > k * (n - 1) - k * sumnj + sumjnj) {
        return false;
      }
    }
  }
  return true;
}

function genIsValidDegreeSequenceErdosGallai(degreeSequence) {
  return delegate("isValidDegreeSequenceErdosGallai", [degreeSequence]);
}

;
Object.defineProperty(exports, "__esModule", {
  value: true
});

},{"../_internals/delegate":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/delegateToWorker.js","../_internals/fillArray":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/fillArray.js","../exceptions":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/index.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/index.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _centrality = require("./centrality");

var centrality = _babelHelpers.interopRequireWildcard(_centrality);

var _clique = require("./clique");

var clique = _babelHelpers.interopRequireWildcard(_clique);

var _cluster = require("./cluster");

var cluster = _babelHelpers.interopRequireWildcard(_cluster);

var _dag = require("./dag");

var dag = _babelHelpers.interopRequireWildcard(_dag);

var _graphical = require("./graphical");

var graphical = _babelHelpers.interopRequireWildcard(_graphical);

var _isomorphism = require("./isomorphism");

var isomorphism = _babelHelpers.interopRequireWildcard(_isomorphism);

var _shortestPaths = require("./shortestPaths");

var shortestPaths = _babelHelpers.interopRequireWildcard(_shortestPaths);

exports.centrality = centrality;
exports.clique = clique;
exports.cluster = cluster;
exports.dag = dag;
exports.graphical = graphical;
exports.isomorphism = isomorphism;
exports.shortestPaths = shortestPaths;

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(_centrality));

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(_clique));

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(_cluster));

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(_dag));

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(_graphical));

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(_isomorphism));

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(_shortestPaths));

Object.defineProperty(exports, "__esModule", {
  value: true
});

},{"./centrality":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/centrality/index.js","./clique":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/clique.js","./cluster":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/cluster.js","./dag":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/dag.js","./graphical":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/graphical.js","./isomorphism":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/isomorphism/index.js","./shortestPaths":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/shortestPaths/index.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/isomorphism/index.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(require("./isomorph")));

Object.defineProperty(exports, "__esModule", {
  value: true
});

},{"./isomorph":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/isomorphism/isomorph.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/isomorphism/isomorph.js":[function(require,module,exports){
"use strict";

var _core = require("babel-runtime/core-js")["default"];

var _babelHelpers = require("babel-runtime/helpers")["default"];

exports.couldBeIsomorphic = couldBeIsomorphic;
exports.genCouldBeIsomorphic = genCouldBeIsomorphic;
exports.fastCouldBeIsomorphic = fastCouldBeIsomorphic;
exports.genFastCouldBeIsomorphic = genFastCouldBeIsomorphic;
exports.fasterCouldBeIsomorphic = fasterCouldBeIsomorphic;
exports.genFasterCouldBeIsomorphic = genFasterCouldBeIsomorphic;

var delegate = _babelHelpers.interopRequire(require("../../_internals/delegate"));

"use strict";

var numberOfCliques = require("../clique").numberOfCliques;

var triangles = require("../cluster").triangles;

function couldBeIsomorphic(G1, G2) {
  // Check global properties
  if (G1.order() !== G2.order()) {
    return false;
  }

  // Check local properties
  var degree1 = G1.degree();
  var triangles1 = triangles(G1);
  var cliques1 = numberOfCliques(G1);
  var props1 = [];
  degree1.forEach(function (_, v) {
    props1.push([degree1.get(v), triangles1.get(v), cliques1.get(v)]);
  });
  props1.sort(function (a, b) {
    return a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
  });

  var degree2 = G2.degree();
  var triangles2 = triangles(G2);
  var cliques2 = numberOfCliques(G2);
  var props2 = [];
  degree2.forEach(function (_, v) {
    props2.push([degree2.get(v), triangles2.get(v), cliques2.get(v)]);
  });
  props2.sort(function (a, b) {
    return a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
  });

  return props1.every(function (a, i) {
    var b = props2[i];
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
  });
}

function genCouldBeIsomorphic(G1, G2) {
  return delegate("couldBeIsomorphic", [G1, G2]);
}

;

function fastCouldBeIsomorphic(G1, G2) {
  // Check global properties
  if (G1.order() !== G2.order()) {
    return false;
  }

  // Check local properties
  var degree1 = G1.degree();
  var triangles1 = triangles(G1);
  var props1 = [];
  degree1.forEach(function (_, v) {
    props1.push([degree1.get(v), triangles1.get(v)]);
  });
  props1.sort(function (a, b) {
    return a[0] - b[0] || a[1] - b[1];
  });

  var degree2 = G2.degree();
  var triangles2 = triangles(G2);
  var props2 = [];
  degree2.forEach(function (_, v) {
    props2.push([degree2.get(v), triangles2.get(v)]);
  });
  props2.sort(function (a, b) {
    return a[0] - b[0] || a[1] - b[1];
  });

  return props1.every(function (a, i) {
    var b = props2[i];
    return a[0] === b[0] && a[1] === b[1];
  });
}

function genFastCouldBeIsomorphic(G1, G2) {
  return delegate("fastCouldBeIsomorphic", [G1, G2]);
}

;

function fasterCouldBeIsomorphic(G1, G2) {
  // Check global properties
  if (G1.order() !== G2.order()) {
    return false;
  }

  // Check local properties
  var degree1 = _core.Array.from(G1.degree().values());
  degree1.sort(function (a, b) {
    return a - b;
  });

  var degree2 = _core.Array.from(G2.degree().values());
  degree2.sort(function (a, b) {
    return a - b;
  });

  return degree1.every(function (v, i) {
    return v === degree2[i];
  });
}

function genFasterCouldBeIsomorphic(G1, G2) {
  return delegate("fasterCouldBeIsomorphic", [G1, G2]);
}

;
Object.defineProperty(exports, "__esModule", {
  value: true
});

},{"../../_internals/delegate":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/delegateToWorker.js","../clique":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/clique.js","../cluster":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/cluster.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/shortestPaths/index.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _unweighted = require("./unweighted");

var unweighted = _babelHelpers.interopRequireWildcard(_unweighted);

exports.unweighted = unweighted;

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(_unweighted));

Object.defineProperty(exports, "__esModule", {
  value: true
});

},{"./unweighted":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/shortestPaths/unweighted.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/shortestPaths/unweighted.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

exports.singleSourceShortestPathLength = singleSourceShortestPathLength;
exports.genSingleSourceShortestPathLength = genSingleSourceShortestPathLength;
exports.allPairsShortestPathLength = allPairsShortestPathLength;
exports.genAllPairsShortestPathLength = genAllPairsShortestPathLength;
exports.bidirectionalShortestPath = bidirectionalShortestPath;
exports.genBidirectionalShortestPath = genBidirectionalShortestPath;
exports.singleSourceShortestPath = singleSourceShortestPath;
exports.genSingleSourceShortestPath = genSingleSourceShortestPath;
exports.allPairsShortestPath = allPairsShortestPath;
exports.genAllPairsShortestPath = genAllPairsShortestPath;
exports.predecessor = predecessor;
exports.genPredecessor = genPredecessor;

var delegate = _babelHelpers.interopRequire(require("../../_internals/delegate"));

"use strict";

var JSNetworkXNoPath = require("../../exceptions").JSNetworkXNoPath;

var _internals = require("../../_internals");

var Map = _internals.Map;
var getDefault = _internals.getDefault;
var nodesAreEqual = _internals.nodesAreEqual;
var sprintf = _internals.sprintf;

function singleSourceShortestPathLength(G, source, optCutoff) {
  var seen = new Map(); // level (number of hops) when seen n BFS
  var level = 0; // the current level
  // map of nodes to check at next level
  var nextlevel = new Map([[source, 1]]);

  while (nextlevel.size > 0) {
    var thislevel = nextlevel;
    nextlevel = new Map();
    /*jshint loopfunc:true*/
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _core.$for.getIterator(thislevel.keys()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var v = _step.value;

        if (!seen.has(v)) {
          seen.set(v, level);
          G.get(v).forEach(function (_, n) {
            return nextlevel.set(n, 1);
          });
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    if (optCutoff != null && optCutoff <= level) {
      break;
    }
    level += 1;
  }
  return seen;
}

function genSingleSourceShortestPathLength(G, source, optCutoff) {
  return delegate("singleSourceShortestPathLength", [G, source, optCutoff]);
}

;

function allPairsShortestPathLength(G, optCutoff) {
  var paths = new Map();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _core.$for.getIterator(G), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var n = _step.value;

      paths.set(n, singleSourceShortestPathLength(G, n, optCutoff));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return paths;
}

function genAllPairsShortestPathLength(G, optCutoff) {
  return delegate("allPairsShortestPathLength", [G, optCutoff]);
}

;

function bidirectionalShortestPath(G, source, target) {
  // call helper to do the real work

  var _bidirectionalPredSucc = bidirectionalPredSucc(G, source, target);

  var _bidirectionalPredSucc2 = _babelHelpers.slicedToArray(_bidirectionalPredSucc, 3);

  var pred = _bidirectionalPredSucc2[0];
  var succ = _bidirectionalPredSucc2[1];
  var w = _bidirectionalPredSucc2[2];

  // build path from pred+w+succ
  var path = [];
  // from source to w
  while (w != null) {
    path.push(w);
    w = pred.get(w);
  }
  w = succ.get(path[0]);
  path.reverse();
  // from w to target
  while (w != null) {
    path.push(w);
    w = succ.get(w);
  }
  return path;
}

function genBidirectionalShortestPath(G, source, target) {
  return delegate("bidirectionalShortestPath", [G, source, target]);
}

;

function bidirectionalPredSucc(G, source, target) {
  // does BFS from both source and target and meets in the middle
  if (nodesAreEqual(source, target)) {
    return [new Map([[source, null]]), new Map([[target, null]]), source];
  }

  // handle either directed or undirected
  var Gpred, Gsucc;
  if (G.isDirected()) {
    Gpred = G.predecessorsIter.bind(G);
    Gsucc = G.successorsIter.bind(G);
  } else {
    Gpred = G.neighborsIter.bind(G);
    Gsucc = G.neighborsIter.bind(G);
  }

  // predecesssor and successors in search
  var pred = new Map([[source, null]]);
  var succ = new Map([[target, null]]);
  //
  // initialize fringes, start with forward
  var forwardFringe = [source];
  var reverseFringe = [target];
  var thisLevel;
  var v, w;

  /*jshint newcap:false*/
  while (forwardFringe.length > 0 && reverseFringe.length > 0) {
    if (forwardFringe.length <= reverseFringe.length) {
      thisLevel = forwardFringe;
      forwardFringe = [];
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _core.$for.getIterator(thisLevel), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          v = _step.value;
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = _core.$for.getIterator(Gsucc(v)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              w = _step2.value;

              if (!pred.has(w)) {
                forwardFringe.push(w);
                pred.set(w, v);
              }
              if (succ.has(w)) {
                return [pred, succ, w]; // found path
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } else {
      thisLevel = reverseFringe;
      reverseFringe = [];
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (var _iterator3 = _core.$for.getIterator(thisLevel), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
          v = _step3.value;
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (var _iterator4 = _core.$for.getIterator(Gpred(v)), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
              w = _step4.value;

              if (!succ.has(w)) {
                reverseFringe.push(w);
                succ.set(w, v);
              }
              if (pred.has(w)) {
                return [pred, succ, w]; // found path
              }
            }
          } catch (err) {
            _didIteratorError4 = true;
            _iteratorError4 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
                _iterator4["return"]();
              }
            } finally {
              if (_didIteratorError4) {
                throw _iteratorError4;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError3 = true;
        _iteratorError3 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
            _iterator3["return"]();
          }
        } finally {
          if (_didIteratorError3) {
            throw _iteratorError3;
          }
        }
      }
    }
  }
  throw new JSNetworkXNoPath(sprintf("No path between `%j` and `%j`.", source, target));
}

function singleSourceShortestPath(G, source, optCutoff) {
  var level = 0;
  var nextlevel = new Map([[source, 1]]);
  var paths = new Map([[source, [source]]]);
  if (optCutoff === 0) {
    return paths;
  }
  /*jshint loopfunc:true*/
  while (nextlevel.size > 0) {
    var thislevel = nextlevel;
    nextlevel = new Map();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _core.$for.getIterator(thislevel.keys()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var v = _step.value;
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = _core.$for.getIterator(G.get(v).keys()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var w = _step2.value;

            if (!paths.has(w)) {
              paths.set(w, paths.get(v).concat([w]));
              nextlevel.set(w, 1);
            }
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    level += 1;
    if (optCutoff != null && optCutoff <= level) {
      break;
    }
  }
  return paths;
}

function genSingleSourceShortestPath(G, source, optCutoff) {
  return delegate("singleSourceShortestPath", [G, source, optCutoff]);
}

;

function allPairsShortestPath(G, optCutoff) {
  var paths = new Map();
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _core.$for.getIterator(G), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var n = _step.value;

      paths.set(n, singleSourceShortestPath(G, n, optCutoff));
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return paths;
}

function genAllPairsShortestPath(G, optCutoff) {
  return delegate("allPairsShortestPath", [G, optCutoff]);
}

;

function predecessor(G, source) {
  var optArgs = arguments[2] === undefined ? {} : arguments[2];

  // TODO: use parameter destructuring
  // {target, cutoff, returnSeen}
  var target = optArgs.target;
  var cutoff = optArgs.cutoff;
  var returnSeen = optArgs.returnSeen;

  var level = 0;
  var nextlevel = [source];
  var seen = new Map([[source, level]]);
  var pred = new Map([[source, []]]);

  /*jshint loopfunc:true*/
  while (nextlevel.length > 0) {
    level += 1;
    var thislevel = nextlevel;
    nextlevel = [];
    thislevel.forEach(function (v) {
      G.get(v).forEach(function (_, w) {
        if (!seen.has(w)) {
          pred.set(w, [v]);
          seen.set(w, level);
          nextlevel.push(w);
        } else if (seen.get(w) === level) {
          // add v to predecesssor list if it
          pred.get(w).push(v); // is at the correct level
        }
      });
    });
    if (cutoff != null && cutoff <= level) {
      break;
    }
  }

  if (target != null) {
    if (returnSeen) {
      return pred.has(target) ? [pred.get(target), seen.get(target)] : [[], -1];
    } else {
      return getDefault(pred.get(target), []);
    }
  }
  return returnSeen ? [pred, seen] : pred;
}

function genPredecessor(G, source, optArgs) {
  return delegate("predecessor", [G, source, optArgs]);
}

;
Object.defineProperty(exports, "__esModule", {
  value: true
});

},{"../../_internals":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/index.js","../../_internals/delegate":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/delegateToWorker.js","../../exceptions":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/index.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/browser.js":[function(require,module,exports){
(function (global){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _internalsMessage = require("./_internals/message");

var serialize = _internalsMessage.serialize;
var deserialize = _internalsMessage.deserialize;

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(require("./")));

if (!global.document) {
  // inside worker
  global.onmessage = function (event) {
    var args = event.data.args.map(deserialize);
    var result = exports[event.data.method].apply(null, args);
    global.postMessage(serialize(result));
    global.close();
  };
}
Object.defineProperty(exports, "__esModule", {
  value: true
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/index.js","./_internals/message":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/message.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/DiGraph.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var Graph = _babelHelpers.interopRequire(require("./Graph"));

/*jshint ignore:start*/

var Map = _babelHelpers.interopRequire(require("../_internals/Map"));

/*jshint ignore:end*/

var JSNetworkXError = _babelHelpers.interopRequire(require("../exceptions/JSNetworkXError"));

var convert = _babelHelpers.interopRequire(require("../convert"));

var _internals = require("../_internals");

var clear = _internals.clear;
var clone = _internals.clone;
var createTupleFactory = _internals.createTupleFactory;
var deepcopy = _internals.deepcopy;
var forEach = _internals.forEach;
var isBoolean = _internals.isBoolean;
var isPlainObject = _internals.isPlainObject;
var mapIterator = _internals.mapIterator;
var next = _internals.next;
var size = _internals.size;
var sprintf = _internals.sprintf;
var tuple2 = _internals.tuple2;
var tuple3 = _internals.tuple3;
var tuple3c = _internals.tuple3c;
var zipIterator = _internals.zipIterator;

/**
 * Base class for directed graphs.
 *
 * A DiGraph stores nodes and edges with optional data, or attributes.
 *
 * DiGraphs hold directed edges.  Self loops are allowed but multiple
 * (parallel) edges are not.
 *
 * Nodes can be arbitrary (hashable) Python objects with optional
 * key/value attributes.
 *
 * Edges are represented as links between nodes with optional
 * key/value attributes.
 *
 * @see Graph
 * @see MultiGraph
 * @see MultiDiGraph
 *
 * @param {?=} optData
 *      Data to initialize graph.  If data=None (default) an empty
 *      graph is created.  The data can be an edge list, or any
 *      NetworkX graph object.
 *
 * @param {Object=} optAttr
 *       Attributes to add to graph as key=value pairs.
 *
 * @extends Graph
 * @constructor
 */

var DiGraph = (function (Graph) {
  function DiGraph(optData, optAttr) {
    _babelHelpers.classCallCheck(this, DiGraph);

    // makes it possible to call DiGraph without new
    if (!(this instanceof DiGraph)) {
      return new DiGraph(optData, optAttr);
    }

    this.graph = {}; // dictionary for graph attributes
    this.node = new Map(); // dictionary for node attributes
    // We store two adjacency lists:
    // the  predecessors of node n are stored in the dict self.pred
    // the successors of node n are stored in the dict self.succ=self.adj
    this.adj = new Map(); // empty adjacency dictionary
    this.pred = new Map(); // predecessor
    this.succ = this.adj; // successor

    //attempt to load graph with data
    if (optData != null) {
      convert.toNetworkxGraph(optData, this);
    }
    // load graph attributes (must be afte convert)
    _core.Object.assign(this.graph, optAttr || {});
    this.edge = this.adj;
  }

  _babelHelpers.inherits(DiGraph, Graph);

  _babelHelpers.prototypeProperties(DiGraph, {
    __name__: {

      /**
       * Holds the graph type (class) name for information.
       * This is compatible to Pythons __name__ property.
       *
       * @type {string}
       */

      get: function () {
        return "DiGraph";
      },
      configurable: true
    }
  }, {
    addNode: {

      /**
       * Add a single node n and update node attributes.
       *
       * @see #add_nodes_from
       *
       * @param {Node} n Node
       * @param {Object=} opt_attr_dict Dictionary of node attributes.
       *      Key/value pairs will update existing data associated with the node.
       *
       * @override
       * @export
       */

      value: function addNode(n) {
        var optAttrDict = arguments[1] === undefined ? {} : arguments[1];

        if (!isPlainObject(optAttrDict)) {
          throw new JSNetworkXError("The opt_attr_dict argument must be an object.");
        }

        if (!this.succ.has(n)) {
          this.succ.set(n, new Map());
          this.pred.set(n, new Map());
          this.node.set(n, optAttrDict);
        } else {
          // update attr even if node already exists
          _core.Object.assign(this.node.get(n), optAttrDict);
        }
      },
      writable: true,
      configurable: true
    },
    addNodesFrom: {

      /**
       * Add multiple nodes.
       *
       * @see #add_node
       *
       * @param {NodeContainer} nodes
       *      A container of nodes (list, dict, set, etc.).
       *      OR
       *      A container of (node, attribute dict) tuples.
       *
       * @param {Object=} opt_attr  Update attributes for all nodes in nodes.
       *       Node attributes specified in nodes as a tuple
       *       take precedence over attributes specified generally.
       *
       * @override
       * @export
       */

      value: function addNodesFrom(nodes) {
        var optAttr = arguments[1] === undefined ? {} : arguments[1];

        // if an object, only iterate over the keys
        forEach(nodes, function (n) {
          var newnode = !this.succ.has(n);

          // test whether n is a (node, attr) tuple
          if (Array.isArray(n) && n.length === 2 && isPlainObject(n[1])) {
            var nn = n[0];
            var ndict = n[1];

            if (!this.succ.has(nn)) {
              this.succ.set(nn, new Map());
              this.pred.set(nn, new Map());
              var newdict = clone(optAttr);
              _core.Object.assign(newdict, ndict);
              this.node.set(nn, newdict);
            } else {
              var olddict = this.node.get(nn);
              _core.Object.assign(olddict, optAttr, ndict);
            }
          } else if (newnode) {
            this.succ.set(n, new Map());
            this.pred.set(n, new Map());
            this.node.set(n, clone(optAttr));
          } else {
            _core.Object.assign(this.node.get(n), optAttr);
          }
        }, this);
      },
      writable: true,
      configurable: true
    },
    removeNode: {

      /**
       * Remove node n.
       *
       * Removes the node n and all adjacent edges.
       * Attempting to remove a non-existent node will raise an exception.
       *
       * @see #remove_nodes_from
       *
       * @param {Node} n  A node in the graph
       *
       * @override
       * @export
       */

      value: function removeNode(n) {
        if (this.node["delete"](n)) {
          var nbrs = this.succ.get(n);
          nbrs.forEach(function (_, u) {
            this.pred.get(u)["delete"](n); // remove all edges n-u in digraph
          }, this);
          this.succ["delete"](n); // remove node from succ
          this.pred.get(n).forEach(function (_, u) {
            this.succ.get(u)["delete"](n); // remove all edges n-u in digraph
          }, this);
          this.pred["delete"](n); // remove node from pred
        } else {
          throw new JSNetworkXError(sprintf("The node \"%j\" is not in the graph", n));
        }
      },
      writable: true,
      configurable: true
    },
    removeNodesFrom: {

      /**
       * Remove multiple nodes.
       *
       * @see #remove_node
       *
       * @param {NodeContainer} nodes  A container of nodes.
       *      If a node in the container is not in the graph it is silently ignored.
       *
       * @override
       * @export
       */

      value: function removeNodesFrom(nodes) {
        forEach(nodes, function (n) {
          if (this.succ.has(n)) {
            var succs = this.succ.get(n);

            this.node["delete"](n);
            succs.forEach(function (_, u) {
              // remove all edges n-u in digraph
              this.pred.get(u)["delete"](n);
            }, this);
            this.succ["delete"](n); // remove node from succ
            this.pred.get(n).forEach(function (_, u) {
              // remove all edges n-u in digraph
              this.succ.get(u)["delete"](n);
            }, this);
            this.pred["delete"](n); // remove node from pred
          }
        }, this);
      },
      writable: true,
      configurable: true
    },
    addEdge: {

      /**
       * Add an edge between u and v.
       *
       * The nodes u and v will be automatically added if they are
       * not already in the graph.
       *
       * Edge attributes can be specified with keywords or by providing
       * a dictionary with key/value pairs.
       *
       * @see #add_edges_from
       *
       * Note: Adding an edge that already exists updates the edge data.
       *
       *       Many NetworkX algorithms designed for weighted graphs use as
       *       the edge weight a numerical value assigned to a keyword
       *       which by default is 'weight'.
       *
       * @param {Node} u Node
       * @param {Node} v Node
       * @param {Object=} opt_attr_dict Dictionary of edge attributes.
       *      Key/value pairs will update existing data associated with the edge.
       *
       * @override
       * @export
       */

      value: function addEdge(u, v) {
        var optAttrDict = arguments[2] === undefined ? {} : arguments[2];

        if (!isPlainObject(optAttrDict)) {
          throw new JSNetworkXError("The optAttrDict argument must be a plain object.");
        }

        // add nodes
        if (!this.succ.has(u)) {
          this.succ.set(u, new Map());
          this.pred.set(u, new Map());
          this.node.set(u, {});
        }

        if (!this.succ.has(v)) {
          this.succ.set(v, new Map());
          this.pred.set(v, new Map());
          this.node.set(v, {});
        }

        // add the edge
        var datadict = this.adj.get(u).get(v) || {};
        _core.Object.assign(datadict, optAttrDict);
        this.succ.get(u).set(v, datadict);
        this.pred.get(v).set(u, datadict);
      },
      writable: true,
      configurable: true
    },
    addEdgesFrom: {

      /**
       * Add all the edges in ebunch.
       *
       * Notes:
       * Adding the same edge twice has no effect but any edge data
       * will be updated when each duplicate edge is added.
       *
       * @see #add_edge
       * @see #add_weighted_edges_from
       *
       * @param {?} ebunch container of edges
       *      Each edge given in the container will be added to the
       *      graph. The edges must be given as as 2-tuples (u,v) or
       *      3-tuples (u,v,d) where d is a dictionary containing edge data.
       *
       * @param {Object=} opt_attr_dict Dictionary of edge attributes.
       *      Dictionary of edge attributes.  Key/value pairs will
       *      update existing data associated with each edge.
       *
       * @override
       * @export
       */

      value: function addEdgesFrom(ebunch) {
        var optAttrDict = arguments[1] === undefined ? {} : arguments[1];

        if (!isPlainObject(optAttrDict)) {
          throw new JSNetworkXError("The opt_attr_dict argument must be an object.");
        }

        // process ebunch
        forEach(ebunch, function (edge) {
          var length = size(edge);
          var u, v, edgeData;
          if (length === 3) {
            u = edge[0];
            v = edge[1];
            edgeData = edge[2];
          } else if (length === 2) {
            u = edge[0];
            v = edge[1];
            edgeData = {};
          } else {
            throw new JSNetworkXError(sprintf("Edge tuple \"%j\" must be a 2-tuple or 3-tuple.", edge));
          }

          if (!this.succ.has(u)) {
            this.succ.set(u, new Map());
            this.pred.set(u, new Map());
            this.node.set(u, {});
          }
          if (!this.succ.has(v)) {
            this.succ.set(v, new Map());
            this.pred.set(v, new Map());
            this.node.set(v, {});
          }

          var datadict = this.adj.get(u).get(v) || {};
          _core.Object.assign(datadict, optAttrDict, edgeData);
          this.succ.get(u).set(v, datadict);
          this.pred.get(v).set(u, datadict);
        }, this);
      },
      writable: true,
      configurable: true
    },
    removeEdge: {

      /**
       * Remove the edge between u and v.
       *
       * @see #remove_edges_from
       *
       * @param {Node} u Node
       * @param {Node} v Node
       *
       * @override
       * @export
       */

      value: function removeEdge(u, v) {
        var edge = this.succ.get(u);
        if (edge !== undefined && edge["delete"](v)) {
          this.pred.get(v)["delete"](u);
        } else {
          throw new JSNetworkXError(sprintf("The edge \"%j-%j\" is not in the graph", u, v));
        }
      },
      writable: true,
      configurable: true
    },
    removeEdgesFrom: {

      /**
       * Remove all edges specified in ebunch.
       *
       * Notes: Will fail silently if an edge in ebunch is not in the graph.
       *
       * @param {?} ebunch 1list or container of edge tuples
       *      Each edge given in the list or container will be removed
       *      from the graph. The edges can be:
       *          - 2-tuples (u,v) edge between u and v.
       *          - 3-tuples (u,v,k) where k is ignored.
       *
       * @override
       * @export
       */

      value: function removeEdgesFrom(ebunch) {
        forEach(ebunch, function (edge) {
          var u = edge[0]; // ignore edge data if present
          var v = edge[1];

          try {
            this.succ.get(u)["delete"](v);
            this.pred.get(v)["delete"](u);
          } catch (ex) {}
        }, this);
      },
      writable: true,
      configurable: true
    },
    hasSuccessor: {

      /**
       * Return True if node u has successor v.
       *
       * This is true if graph has the edge u->v.
       *
       * @param {Node} u Node
       * @param {Node} v Node
       *
       * @return {boolean} True if node u has successor v
       *
       * @export
       */

      value: function hasSuccessor(u, v) {
        return this.succ.has(u) && this.succ.get(u).has(v);
      },
      writable: true,
      configurable: true
    },
    hasPredecessor: {

      /**
       * Return True if node u has predecessor v.
       *
       * This is true if graph has the edge u<-v.
       *
       * @param {Node} u Node
       * @param {Node} v Node
       *
       * @return {boolean} True if node u has predecessor v
       *
       * @export
       */

      value: function hasPredecessor(u, v) {
        return this.pred.has(u) && this.pred.get(u).has(v);
      },
      writable: true,
      configurable: true
    },
    successorsIter: {

      /**
       * Return an iterator over successor nodes of n.
       *
       * {@code neighbors_iter()} and {@code successors_iter()} are the same.
       *
       * @param {Node} n Node
       *
       * @return {!Iterator} Iterator over successor nodes of n
       *
       * @export
       */

      value: function successorsIter(n) {
        var nbrs = this.succ.get(n);
        if (nbrs !== undefined) {
          return nbrs.keys();
        }
        throw new JSNetworkXError(sprintf("The node \"%j\" is not in the digraph.", n));
      },
      writable: true,
      configurable: true
    },
    predecessorsIter: {

      /**
       * Return an iterator over predecessor nodes of n.
       *
       * @param {Node} n Node
       *
       * @return {!Iterator} Iterator over predecessor nodes of n
       *
       * @export
       */

      value: function predecessorsIter(n) {
        var nbrs = this.pred.get(n);
        if (nbrs !== undefined) {
          return nbrs.keys();
        }
        throw new JSNetworkXError(sprintf("The node \"%j\" is not in the digraph.", n));
      },
      writable: true,
      configurable: true
    },
    successors: {

      /**
       * Return a list of successor nodes of n.
       *
       * {@code neighbors()} and {@code successors()} are the same.
       *
       * @param {Node} n Node
       *
       * @return {!Array} List of successor nodes of n
       *
       * @export
       */

      value: function successors(n) {
        return _core.Array.from(this.successorsIter(n));
      },
      writable: true,
      configurable: true
    },
    predecessors: {

      /**
       * Return list of predecessor nodes of n.
       *
       * @param {Node} n Node
       *
       * @return {!Array} List of predecessor nodes of n
       *
       * @export
       */

      value: function predecessors(n) {
        return _core.Array.from(this.predecessorsIter(n));
      },
      writable: true,
      configurable: true
    },
    neighbors: {

      // digraph definitions
      /**
       * @see #successors
       *
       * @override
       * @export
       */

      get: function () {
        return this.successors;
      },
      configurable: true
    },
    neighborsIter: {

      /**
       * @see #successors_iter
       *
       * @override
       * @export
       */

      get: function () {
        return this.successorsIter;
      },
      configurable: true
    },
    edgesIter: {

      /**
       * Return an iterator over the edges.
       *
       * Edges are returned as tuples with optional data
       * in the order (node, neighbor, data).
       *
       * @see #edges
       *
       * Note:
       *
       *      Nodes in nbunch that are not in the graph will be (quietly) ignored.
       *
       * @param {?(NodeContainer|boolean)=} opt_nbunch A container of nodes.
       *       The container will be iterated through once.
       *
       * @param {?boolean=} opt_data
       *      If True, return edge attribute dict in 3-tuple (u,v,data).
       *
       * @return {!Iterator} An iterator of (u,v) or (u,v,d) tuples of edges.
       *
       * @override
       * @export
       */

      value: _regeneratorRuntime.mark(function edgesIter(optNbunch) {
        var _this = this;

        var optData = arguments[1] === undefined ? false : arguments[1];

        var nodesNbrs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, nodeNbrs, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, nbrData, result;

        return _regeneratorRuntime.wrap(function edgesIter$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              // handle calls with opt_data being the only argument
              if (isBoolean(optNbunch)) {
                optData = optNbunch;
                optNbunch = undefined;
              }

              if (optNbunch === undefined) {
                nodesNbrs = _this.adj;
              } else {
                nodesNbrs = mapIterator(_this.nbunchIter(optNbunch), function (n) {
                  return tuple2(n, _this.adj.get(n));
                });
              }

              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              context$2$0.prev = 5;
              _iterator = _core.$for.getIterator(nodesNbrs);

            case 7:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                context$2$0.next = 40;
                break;
              }

              nodeNbrs = _step.value;
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              context$2$0.prev = 12;
              _iterator2 = _core.$for.getIterator(nodeNbrs[1]);

            case 14:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                context$2$0.next = 23;
                break;
              }

              nbrData = _step2.value;
              result = [nodeNbrs[0], nbrData[0]];

              if (optData) {
                result[2] = nbrData[1];
              }
              context$2$0.next = 20;
              return result;

            case 20:
              _iteratorNormalCompletion2 = true;
              context$2$0.next = 14;
              break;

            case 23:
              context$2$0.next = 29;
              break;

            case 25:
              context$2$0.prev = 25;
              context$2$0.t23 = context$2$0["catch"](12);
              _didIteratorError2 = true;
              _iteratorError2 = context$2$0.t23;

            case 29:
              context$2$0.prev = 29;
              context$2$0.prev = 30;

              if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                _iterator2["return"]();
              }

            case 32:
              context$2$0.prev = 32;

              if (!_didIteratorError2) {
                context$2$0.next = 35;
                break;
              }

              throw _iteratorError2;

            case 35:
              return context$2$0.finish(32);

            case 36:
              return context$2$0.finish(29);

            case 37:
              _iteratorNormalCompletion = true;
              context$2$0.next = 7;
              break;

            case 40:
              context$2$0.next = 46;
              break;

            case 42:
              context$2$0.prev = 42;
              context$2$0.t24 = context$2$0["catch"](5);
              _didIteratorError = true;
              _iteratorError = context$2$0.t24;

            case 46:
              context$2$0.prev = 46;
              context$2$0.prev = 47;

              if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
              }

            case 49:
              context$2$0.prev = 49;

              if (!_didIteratorError) {
                context$2$0.next = 52;
                break;
              }

              throw _iteratorError;

            case 52:
              return context$2$0.finish(49);

            case 53:
              return context$2$0.finish(46);

            case 54:
            case "end":
              return context$2$0.stop();
          }
        }, edgesIter, this, [[5, 42, 46, 54], [12, 25, 29, 37], [30,, 32, 36], [47,, 49, 53]]);
      }),
      writable: true,
      configurable: true
    },
    outEdgesIter: {

      // alias out_edges to edges

      /**
       * @see #edges_iter
       */

      value: function outEdgesIter(optNbunch, optData) {
        return this.edgesIter(optNbunch, optData);
      },
      writable: true,
      configurable: true
    },
    outEdges: {

      /**
       * @see Graph#edges
       */

      value: function outEdges(optNbunch, optData) {
        return this.edges(optNbunch, optData);
      },
      writable: true,
      configurable: true
    },
    inEdgesIter: {

      /**
       * Return an iterator over the incoming edges.
       *
       * @see #edges_iter
       *
       *
       * @param {(?NodeContainer|boolean)=} opt_nbunch A container of nodes.
       *       The container will be iterated through once.
       *
       * @param {?boolean=} opt_data
       *      If True, return edge attribute dict in 3-tuple (u,v,data).
       *
       * @return {!Iterator} An iterator of (u,v) or (u,v,d) tuples of
       *      incoming edges.
       *
       * @export
       */

      value: _regeneratorRuntime.mark(function inEdgesIter(optNbunch) {
        var _this = this;

        var optData = arguments[1] === undefined ? false : arguments[1];

        var nodesNbrs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, nodeNbrs, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, nbrData, result;

        return _regeneratorRuntime.wrap(function inEdgesIter$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              // handle calls with opt_data being the only argument
              if (isBoolean(optNbunch)) {
                optData = optNbunch;
                optNbunch = undefined;
              }

              if (optNbunch === undefined) {
                nodesNbrs = _this.pred;
              } else {
                nodesNbrs = mapIterator(_this.nbunchIter(optNbunch), function (n) {
                  return tuple2(n, _this.pred.get(n));
                });
              }

              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              context$2$0.prev = 5;
              _iterator = _core.$for.getIterator(nodesNbrs);

            case 7:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                context$2$0.next = 40;
                break;
              }

              nodeNbrs = _step.value;
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              context$2$0.prev = 12;
              _iterator2 = _core.$for.getIterator(nodeNbrs[1]);

            case 14:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                context$2$0.next = 23;
                break;
              }

              nbrData = _step2.value;
              result = [nbrData[0], nodeNbrs[0]];

              if (optData) {
                result[2] = nbrData[1];
              }
              context$2$0.next = 20;
              return result;

            case 20:
              _iteratorNormalCompletion2 = true;
              context$2$0.next = 14;
              break;

            case 23:
              context$2$0.next = 29;
              break;

            case 25:
              context$2$0.prev = 25;
              context$2$0.t25 = context$2$0["catch"](12);
              _didIteratorError2 = true;
              _iteratorError2 = context$2$0.t25;

            case 29:
              context$2$0.prev = 29;
              context$2$0.prev = 30;

              if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                _iterator2["return"]();
              }

            case 32:
              context$2$0.prev = 32;

              if (!_didIteratorError2) {
                context$2$0.next = 35;
                break;
              }

              throw _iteratorError2;

            case 35:
              return context$2$0.finish(32);

            case 36:
              return context$2$0.finish(29);

            case 37:
              _iteratorNormalCompletion = true;
              context$2$0.next = 7;
              break;

            case 40:
              context$2$0.next = 46;
              break;

            case 42:
              context$2$0.prev = 42;
              context$2$0.t26 = context$2$0["catch"](5);
              _didIteratorError = true;
              _iteratorError = context$2$0.t26;

            case 46:
              context$2$0.prev = 46;
              context$2$0.prev = 47;

              if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
              }

            case 49:
              context$2$0.prev = 49;

              if (!_didIteratorError) {
                context$2$0.next = 52;
                break;
              }

              throw _iteratorError;

            case 52:
              return context$2$0.finish(49);

            case 53:
              return context$2$0.finish(46);

            case 54:
            case "end":
              return context$2$0.stop();
          }
        }, inEdgesIter, this, [[5, 42, 46, 54], [12, 25, 29, 37], [30,, 32, 36], [47,, 49, 53]]);
      }),
      writable: true,
      configurable: true
    },
    inEdges: {

      /**
       * Return a list of the incoming edges.
       *
       * @see #edges
       *
       * @param {NodeContainer} opt_nbunch A container of nodes.
       *       The container will be iterated through once.
       *
       * @param {boolean} opt_data
       *      If True, return edge attribute dict in 3-tuple (u,v,data).
       *
       * @return {!Array} A list of incoming edges
       *
       * @export
       */

      value: function inEdges(optNbunch) {
        var optData = arguments[1] === undefined ? false : arguments[1];

        return _core.Array.from(this.inEdgesIter(optNbunch, optData));
      },
      writable: true,
      configurable: true
    },
    degreeIter: {

      /**
       * Return an iterator for (node, degree).
       *
       * The node degree is the number of edges adjacent to the node.
       *
       * @see #degree
       * @see #in_degree
       * @see #out_degree
       * @see #in_degree_iter
       * @see #out_degree_iter
       *
       *
       * @param {(Node|NodeContainer)=} opt_nbunch  A container of nodes.
       *       The container will be iterated through once.
       *
       * @param {string=} opt_weight
       *       The edge attribute that holds the numerical value used
       *       as a weight.  If None, then each edge has weight 1.
       *       The degree is the sum of the edge weights adjacent to the node.
       *
       *
       * WARNING: Since both parameters are optional, and the weight attribute
       * name could be equal to a node name, nbunch as to be set to null explicitly
       * to use the second argument as weight attribute name.
       *
       * @return {!Iterator}  The iterator returns two-tuples of (node, degree).
       *
       * @override
       * @export
       */

      value: function degreeIter(optNbunch, optWeight) {
        var _this = this;

        var nodesNbrs;

        if (optNbunch == null) {
          nodesNbrs = zipIterator(this.succ.entries(), this.pred.entries());
        } else {
          var tuple2Succ = createTupleFactory(2);
          var tuple2Pred = createTupleFactory(2);
          nodesNbrs = zipIterator(mapIterator(this.nbunchIter(optNbunch), function (n) {
            return tuple2Succ(n, _this.succ.get(n));
          }), mapIterator(this.nbunchIter(optNbunch), function (n) {
            return tuple2Pred(n, _this.pred.get(n));
          }));
        }

        if (optWeight == null) {
          return mapIterator(nodesNbrs, function (_ref) {
            var _ref2 = _babelHelpers.slicedToArray(_ref, 2);

            var _ref2$0 = _babelHelpers.slicedToArray(_ref2[0], 2);

            var node = _ref2$0[0];
            var succ = _ref2$0[1];

            var _ref2$1 = _babelHelpers.slicedToArray(_ref2[1], 2);

            var u = _ref2$1[0];
            var pred = _ref2$1[1];
            return [node, pred.size + succ.size];
          });
        } else {
          // edge weighted graph - degree is sum of edge weights
          return mapIterator(nodesNbrs, function (_ref) {
            var _ref2 = _babelHelpers.slicedToArray(_ref, 2);

            var _ref2$0 = _babelHelpers.slicedToArray(_ref2[0], 2);

            var node = _ref2$0[0];
            var succ = _ref2$0[1];

            var _ref2$1 = _babelHelpers.slicedToArray(_ref2[1], 2);

            var _ = _ref2$1[0];
            var pred = _ref2$1[1];

            var sum = 0;

            function sumData(data) {
              var weight = data[optWeight];
              sum += weight != null ? +weight : 1;
            }

            succ.forEach(sumData);
            pred.forEach(sumData);

            return [node, sum];
          });
        }
      },
      writable: true,
      configurable: true
    },
    inDegreeIter: {

      /**
       * Return an iterator for (node, in-degree).
       *
       * The node in-degree is the number of edges pointing in to the node.
       *
       * @see #degree
       * @see #in_degree
       * @see #out_degree
       * @see #out_degree_iter
       *
       * @param {(Node|NodeContainer)=} opt_nbunch  A container of nodes.
       *       The container will be iterated through once.
       *
       * @param {string=} opt_weight
       *       The edge attribute that holds the numerical value used
       *       as a weight.  If None, then each edge has weight 1.
       *       The degree is the sum of the edge weights adjacent to the node.
       *
       *
       * WARNING: Since both parameters are optional, and the weight attribute
       * name could be equal to a node name, nbunch as to be set to null explicitly
       * to use the second argument as weight attribute name.
       *
       * @return {Iterator}  The iterator returns two-tuples of (node, in-degree).
       *
       * @export
       */

      value: function inDegreeIter(optNbunch, optWeight) {
        var _this = this;

        var nodesNbrs;

        if (optNbunch == null) {
          nodesNbrs = this.pred;
        } else {
          nodesNbrs = mapIterator(this.nbunchIter(optNbunch), function (n) {
            return tuple2(n, _this.pred.get(n));
          });
        }

        if (optWeight == null) {
          return mapIterator(nodesNbrs, function (_ref) {
            var _ref2 = _babelHelpers.slicedToArray(_ref, 2);

            var node = _ref2[0];
            var pred = _ref2[1];
            return [node, pred.size];
          });
        } else {
          return mapIterator(nodesNbrs, function (_ref) {
            var _ref2 = _babelHelpers.slicedToArray(_ref, 2);

            var node = _ref2[0];
            var pred = _ref2[1];

            var sum = 0;
            pred.forEach(function (data) {
              var weight = data[optWeight];
              sum += weight != null ? +weight : 1;
            });
            return [node, sum];
          });
        }
      },
      writable: true,
      configurable: true
    },
    outDegreeIter: {

      /**
       * Return an iterator for (node, out-degree).
       *
       * The node out-degree is the number of edges pointing in to the node.
       *
       * @see #degree
       * @see #in_degree
       * @see #out_degree
       * @see #in_degree_iter
       *
       * @param {NodeContainer=} opt_nbunch  A container of nodes.
       *       The container will be iterated through once.
       *
       * @param {string=} opt_weight
       *       The edge attribute that holds the numerical value used
       *       as a weight.  If None, then each edge has weight 1.
       *       The degree is the sum of the edge weights adjacent to the node.
       *
       *
       * WARNING: Since both parameters are optional, and the weight attribute
       * name could be equal to a node name, nbunch as to be set to null explicitly
       * to use the second argument as weight attribute name.
       *
       * @return {Iterator}  The iterator returns two-tuples of (node, out-degree).
       * @export
       */

      value: function outDegreeIter(optNbunch, optWeight) {
        var _this = this;

        var nodesNbrs;

        if (optNbunch == null) {
          nodesNbrs = this.succ;
        } else {
          nodesNbrs = mapIterator(this.nbunchIter(optNbunch), function (n) {
            return tuple2(n, _this.succ.get(n));
          });
        }

        if (optWeight == null) {
          return mapIterator(nodesNbrs, function (_ref) {
            var _ref2 = _babelHelpers.slicedToArray(_ref, 2);

            var node = _ref2[0];
            var succ = _ref2[1];
            return [node, succ.size];
          });
        } else {
          return mapIterator(nodesNbrs, function (_ref) {
            var _ref2 = _babelHelpers.slicedToArray(_ref, 2);

            var node = _ref2[0];
            var succ = _ref2[1];

            var sum = 0;
            succ.forEach(function (data) {
              var weight = data[optWeight];
              sum += weight != null ? +weight : 1;
            });
            return [node, sum];
          });
        }
      },
      writable: true,
      configurable: true
    },
    inDegree: {

      /**
       * Return the in-degree of a node or nodes.
       *
       * The node in-degree is the number of edges pointing in to the node.
       *
       * @see #degree
       * @see #out_degree
       * @see #in_degree_iter
       *
       *
       * @param {NodeContainer=} opt_nbunch  A container of nodes.
       *       The container will be iterated through once.
       *
       * @param {string=} opt_weight
       *       The edge attribute that holds the numerical value used
       *       as a weight.  If None, then each edge has weight 1.
       *       The degree is the sum of the edge weights adjacent to the node.
       *
       *
       * WARNING: Since both parameters are optional, and the weight attribute
       * name could be equal to a node name, nbunch as to be set to null explicitly
       * to use the second argument as weight attribute name.
       *
       * @return {(number|Map)}
       *       A dictionary with nodes as keys and in-degree as values or
       *       a number if a single node is specified.
       *
       * @export
       */

      value: function inDegree(optNbunch, optWeight) {
        if (optNbunch != null && this.hasNode(optNbunch)) {
          // return a single node
          return next(this.inDegreeIter(optNbunch, optWeight))[1];
        } else {
          return new Map(this.inDegreeIter(optNbunch, optWeight));
        }
      },
      writable: true,
      configurable: true
    },
    outDegree: {

      /**
       * Return the out-degree of a node or nodes.
       *
       * The node out-degree is the number of edges pointing out of the node.
       *
       * @see #degree
       * @see #out_degree
       * @see #in_degree_iter
       *
       *
       * @param {NodeContainer=} opt_nbunch  A container of nodes.
       *       The container will be iterated through once.
       *
       * @param {string=} opt_weight
       *       The edge attribute that holds the numerical value used
       *       as a weight.  If None, then each edge has weight 1.
       *       The degree is the sum of the edge weights adjacent to the node.
       *
       *
       * WARNING: Since both parameters are optional, and the weight attribute
       * name could be equal to a node name, nbunch as to be set to null explicitly
       * to use the second argument as weight attribute name.
       *
       * @return {(number|Map)}
       *       A dictionary with nodes as keys and in-degree as values or
       *       a number if a single node is specified.
       *
       * @export
       */

      value: function outDegree(optNbunch, optWeight) {
        if (optNbunch != null && this.hasNode(optNbunch)) {
          // return a single node
          return next(this.outDegreeIter(optNbunch, optWeight))[1];
        } else {
          return new Map(this.outDegreeIter(optNbunch, optWeight));
        }
      },
      writable: true,
      configurable: true
    },
    clear: {

      /**
       * Remove all nodes and edges from the graph.
       *
       * This also removes the name, and all graph, node, and edge attributes.
       *
       * @override
       * @export
       */

      value: (function (_clear) {
        var _clearWrapper = function clear() {
          return _clear.apply(this, arguments);
        };

        _clearWrapper.toString = function () {
          return _clear.toString();
        };

        return _clearWrapper;
      })(function () {
        this.succ.clear();
        this.pred.clear();
        this.node.clear();
        clear(this.graph);
      }),
      writable: true,
      configurable: true
    },
    isMultigraph: {

      /**
       * Return True if graph is a multigraph, False otherwise.
       *
       * @return {boolean} True if graph is a multigraph, False otherwise.
       *
       * @override
       * @export
       */

      value: function isMultigraph() {
        return false;
      },
      writable: true,
      configurable: true
    },
    isDirected: {

      /**
       * Return True if graph is directed, False otherwise.
       *
       * @return {boolean}  True if graph is directed, False otherwise.
       *
       * @override
       * @export
       */

      value: function isDirected() {
        return true;
      },
      writable: true,
      configurable: true
    },
    toDirected: {

      /**
       * Return a directed copy of the graph.
       *
       * Notes:
       *
       *      This returns a "deepcopy" of the edge, node, and
       *      graph attributes which attempts to completely copy
       *      all of the data and references.
       *
       *      This is in contrast to the similar D = new DiGraph(G) which returns a
       *      shallow copy of the data.
       *
       * @return {!DiGraph} A deepcopy of the graph
       *
       * @override
       * @export
       */

      value: function toDirected() {
        return deepcopy(this);
      },
      writable: true,
      configurable: true
    },
    toUndirected: {

      /**
      * Return an undirected representation of the digraph.
      *
      * Notes:
      *
      * If edges in both directions (u,v) and (v,u) exist in the
      * graph, attributes for the new undirected edge will be a combination of
      * the attributes of the directed edges.  The edge data is updated
      * in the (arbitrary) order that the edges are encountered.  For
      * more customized control of the edge attributes use add_edge().
      *
      * This returns a "deepcopy" of the edge, node, and
      * graph attributes which attempts to completely copy
      * all of the data and references.
      *
      * This is in contrast to the similar G=DiGraph(D) which returns a
      * shallow copy of the data.
      *
      * @param {boolean=} opt_reciprocal
      *      If True only keep edges that appear in both directions
      *      in the original digraph.
      *
      * @return {!Graph}
      *      An undirected graph with the same name and nodes and
      *      with edge (u,v,data) if either (u,v,data) or (v,u,data)
      *      is in the digraph.  If both edges exist in digraph and
      *      their edge data is different, only one edge is created
      *      with an arbitrary choice of which edge data to use.
      *      You must check and correct for this manually if desired.
      *
      * @override
      * @export
      */

      value: function toUndirected(optReciprocal) {
        var H = new Graph();
        H.name = this.name;
        H.addNodesFrom(this);

        var thisPred = this.pred;

        if (optReciprocal) {
          H.addEdgesFrom(_regeneratorRuntime.mark(function callee$2$0() {
            var _this = this;

            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, nodeData, node, predecessors, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, nbrData;

            return _regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  context$3$0.prev = 3;
                  _iterator = _core.$for.getIterator(_this.adjacencyIter());

                case 5:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    context$3$0.next = 39;
                    break;
                  }

                  nodeData = _step.value;
                  node = nodeData[0];
                  predecessors = thisPred.get(node);
                  _iteratorNormalCompletion2 = true;
                  _didIteratorError2 = false;
                  _iteratorError2 = undefined;
                  context$3$0.prev = 12;
                  _iterator2 = _core.$for.getIterator(nodeData[1]);

                case 14:
                  if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                    context$3$0.next = 22;
                    break;
                  }

                  nbrData = _step2.value;

                  if (!predecessors.has(nbrData[0])) {
                    context$3$0.next = 19;
                    break;
                  }

                  context$3$0.next = 19;
                  return tuple3(node, nbrData[0], deepcopy(nbrData[1]));

                case 19:
                  _iteratorNormalCompletion2 = true;
                  context$3$0.next = 14;
                  break;

                case 22:
                  context$3$0.next = 28;
                  break;

                case 24:
                  context$3$0.prev = 24;
                  context$3$0.t27 = context$3$0["catch"](12);
                  _didIteratorError2 = true;
                  _iteratorError2 = context$3$0.t27;

                case 28:
                  context$3$0.prev = 28;
                  context$3$0.prev = 29;

                  if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                    _iterator2["return"]();
                  }

                case 31:
                  context$3$0.prev = 31;

                  if (!_didIteratorError2) {
                    context$3$0.next = 34;
                    break;
                  }

                  throw _iteratorError2;

                case 34:
                  return context$3$0.finish(31);

                case 35:
                  return context$3$0.finish(28);

                case 36:
                  _iteratorNormalCompletion = true;
                  context$3$0.next = 5;
                  break;

                case 39:
                  context$3$0.next = 45;
                  break;

                case 41:
                  context$3$0.prev = 41;
                  context$3$0.t28 = context$3$0["catch"](3);
                  _didIteratorError = true;
                  _iteratorError = context$3$0.t28;

                case 45:
                  context$3$0.prev = 45;
                  context$3$0.prev = 46;

                  if (!_iteratorNormalCompletion && _iterator["return"]) {
                    _iterator["return"]();
                  }

                case 48:
                  context$3$0.prev = 48;

                  if (!_didIteratorError) {
                    context$3$0.next = 51;
                    break;
                  }

                  throw _iteratorError;

                case 51:
                  return context$3$0.finish(48);

                case 52:
                  return context$3$0.finish(45);

                case 53:
                case "end":
                  return context$3$0.stop();
              }
            }, callee$2$0, this, [[3, 41, 45, 53], [12, 24, 28, 36], [29,, 31, 35], [46,, 48, 52]]);
          }).call(this));
        } else {
          H.addEdgesFrom(_regeneratorRuntime.mark(function callee$2$1() {
            var _this = this;

            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, nodeData, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, nbrData;

            return _regeneratorRuntime.wrap(function callee$2$1$(context$3$0) {
              while (1) switch (context$3$0.prev = context$3$0.next) {
                case 0:
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  context$3$0.prev = 3;
                  _iterator = _core.$for.getIterator(_this.adjacencyIter());

                case 5:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    context$3$0.next = 36;
                    break;
                  }

                  nodeData = _step.value;
                  _iteratorNormalCompletion2 = true;
                  _didIteratorError2 = false;
                  _iteratorError2 = undefined;
                  context$3$0.prev = 10;
                  _iterator2 = _core.$for.getIterator(nodeData[1]);

                case 12:
                  if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                    context$3$0.next = 19;
                    break;
                  }

                  nbrData = _step2.value;
                  context$3$0.next = 16;
                  return tuple3(nodeData[0], nbrData[0], deepcopy(nbrData[1]));

                case 16:
                  _iteratorNormalCompletion2 = true;
                  context$3$0.next = 12;
                  break;

                case 19:
                  context$3$0.next = 25;
                  break;

                case 21:
                  context$3$0.prev = 21;
                  context$3$0.t29 = context$3$0["catch"](10);
                  _didIteratorError2 = true;
                  _iteratorError2 = context$3$0.t29;

                case 25:
                  context$3$0.prev = 25;
                  context$3$0.prev = 26;

                  if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                    _iterator2["return"]();
                  }

                case 28:
                  context$3$0.prev = 28;

                  if (!_didIteratorError2) {
                    context$3$0.next = 31;
                    break;
                  }

                  throw _iteratorError2;

                case 31:
                  return context$3$0.finish(28);

                case 32:
                  return context$3$0.finish(25);

                case 33:
                  _iteratorNormalCompletion = true;
                  context$3$0.next = 5;
                  break;

                case 36:
                  context$3$0.next = 42;
                  break;

                case 38:
                  context$3$0.prev = 38;
                  context$3$0.t30 = context$3$0["catch"](3);
                  _didIteratorError = true;
                  _iteratorError = context$3$0.t30;

                case 42:
                  context$3$0.prev = 42;
                  context$3$0.prev = 43;

                  if (!_iteratorNormalCompletion && _iterator["return"]) {
                    _iterator["return"]();
                  }

                case 45:
                  context$3$0.prev = 45;

                  if (!_didIteratorError) {
                    context$3$0.next = 48;
                    break;
                  }

                  throw _iteratorError;

                case 48:
                  return context$3$0.finish(45);

                case 49:
                  return context$3$0.finish(42);

                case 50:
                case "end":
                  return context$3$0.stop();
              }
            }, callee$2$1, this, [[3, 38, 42, 50], [10, 21, 25, 33], [26,, 28, 32], [43,, 45, 49]]);
          }).call(this));
        }

        H.graph = deepcopy(this.graph);
        H.node = deepcopy(this.node);
        return H;
      },
      writable: true,
      configurable: true
    },
    reverse: {

      /**
      * Return the reverse of the graph.
      *
      * The reverse is a graph with the same nodes and edges
      * but with the directions of the edges reversed.
      *
      * @param {boolean=} opt_copy (default=True)
      *      If True, return a new DiGraph holding the reversed edges.
      *      If False, reverse the reverse graph is created using
      *      the original graph (this changes the original graph).
      *
      * @return {!DiGraph} A copy of the graph or the graph itself
      *
      * @export
      */

      value: function reverse() {
        var optCopy = arguments[0] === undefined ? true : arguments[0];

        var H;
        if (optCopy) {
          H = new this.constructor(null, { name: "Reverse of (" + this.name + ")" });
          H.addNodesFrom(this);
          H.addEdgesFrom(mapIterator(this.edgesIter(null, true), function (edge) {
            return tuple3c(edge[1], edge[0], deepcopy(edge[2]), edge);
          }));
          H.graph = deepcopy(this.graph);
          H.node = deepcopy(this.node);
        } else {
          var thisPred = this.pred;
          var thisSucc = this.succ;

          this.succ = thisPred;
          this.pred = thisSucc;
          this.adj = this.succ;
          H = this;
        }
        return H;
      },
      writable: true,
      configurable: true
    },
    subgraph: {

      /**
      * Return the subgraph induced on nodes in nbunch.
      *
      * The induced subgraph of the graph contains the nodes in nbunch
      * and the edges between those nodes.
      *
      * Notes:
      *
      * The graph, edge or node attributes just point to the original graph.
      * So changes to the node or edge structure will not be reflected in
      * the original graph while changes to the attributes will.
      *
      * To create a subgraph with its own copy of the edge/node attributes use:
      * nx.Graph(G.subgraph(nbunch))
      *
      * If edge attributes are containers, a deep copy can be obtained using:
      * G.subgraph(nbunch).copy()
      *
      * For an inplace reduction of a graph to a subgraph you can remove nodes:
      * G.remove_nodes_from([ n in G if n not in set(nbunch)])
      *
      * @param {NodeContainer} nbunch
      *      A container of nodes which will be iterated through once.
      *
      * @return {DiGraph} A subgraph of the graph with the same edge
      *   attributes.
      *
      *
      * @override
      * @export
      */

      value: function subgraph(nbunch) {
        var bunch = this.nbunchIter(nbunch);
        var n;
        // create new graph and copy subgraph into it
        var H = new this.constructor();
        // copy node and attribute dictionaries
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _core.$for.getIterator(bunch), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            n = _step.value;

            H.node.set(n, this.node.get(n));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"]) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        // namespace shortcuts for speed
        var HSucc = H.succ;
        var HPred = H.pred;

        // add nodes
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = _core.$for.getIterator(H), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            n = _step2.value;

            HSucc.set(n, new Map());
            HPred.set(n, new Map());
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        // add edges
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = _core.$for.getIterator(HSucc), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var unbrs = _step3.value;

            var _unbrs = _babelHelpers.slicedToArray(unbrs, 2);

            var u = _unbrs[0];
            var Hnbrs = _unbrs[1];
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = _core.$for.getIterator(this.succ.get(u)), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var vdataddict = _step4.value;

                var _vdataddict = _babelHelpers.slicedToArray(vdataddict, 2);

                var v = _vdataddict[0];
                var datadict = _vdataddict[1];

                if (HSucc.has(v)) {
                  // add both representations of edge: u-v and v-u
                  Hnbrs.set(v, datadict);
                  HPred.get(v).set(u, datadict);
                }
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
                  _iterator4["return"]();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        H.graph = this.graph;
        return H;
      },
      writable: true,
      configurable: true
    }
  });

  return DiGraph;
})(Graph);

module.exports = DiGraph;

// pass

},{"../_internals":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/index.js","../_internals/Map":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/Map.js","../convert":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/convert.js","../exceptions/JSNetworkXError":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/JSNetworkXError.js","./Graph":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/Graph.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js","babel-runtime/regenerator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/regenerator/index.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/Graph.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var KeyError = _babelHelpers.interopRequire(require("../exceptions/KeyError"));

/* jshint ignore:start */

var Map = _babelHelpers.interopRequire(require("../_internals/Map"));

var Set = _babelHelpers.interopRequire(require("../_internals/Set"));

/* jshint ignore:end */

var JSNetworkXError = _babelHelpers.interopRequire(require("../exceptions/JSNetworkXError"));

var isBoolean = _babelHelpers.interopRequire(require("lodash/lang/isBoolean"));

var isString = _babelHelpers.interopRequire(require("lodash/lang/isString"));

var convert = _babelHelpers.interopRequire(require("../convert"));

var _internals = require("../_internals");

var clear = _internals.clear;
var clone = _internals.clone;
var deepcopy = _internals.deepcopy;
var forEach = _internals.forEach;
var isPlainObject = _internals.isPlainObject;
var mapIterator = _internals.mapIterator;
var mapSequence = _internals.mapSequence;
var toIterator = _internals.toIterator;
var sprintf = _internals.sprintf;
var tuple2 = _internals.tuple2;
var tuple2c = _internals.tuple2c;
var tuple3 = _internals.tuple3;
var tuple3c = _internals.tuple3c;
var zipSequence = _internals.zipSequence;

/*jshint expr:false*/

/*
 * Base class for undirected graphs.
 *
 * A Graph stores nodes and edges with optional data, or attributes.
 *
 * Graphs hold undirected edges.  Self loops are allowed but multiple
 * (parallel) edges are not.
 *
 * Nodes can be arbitrary (hashable) Python objects with optional
 * key/value attributes.
 *
 * Edges are represented as links between nodes with optional
 * key/value attributes.
 *
 * See Also
 * --------
 * DiGraph
 * MultiGraph
 * MultiDiGraph
 *
 * @param {*=} opt_data Data to initialize graph.  If data=None (default) an
 *       empty graph is created. The data can be an edge list, or any
 *       NetworkX graph object.
 * @param {Object=} opt_attr (default= no attributes)
 *       Attributes to add to graph as key=value pairs.
 */

var Graph = (function () {
  function Graph(optData, optAttr) {
    _babelHelpers.classCallCheck(this, Graph);

    // makes it possible to call Graph without new
    if (!(this instanceof Graph)) {
      return new Graph(optData, optAttr);
    }

    this.graph = {}; // dictionary for graph attributes
    this.node = new Map(); // empty node dict (created before convert)
    this.adj = new Map(); // empty adjacency dict

    // attempt to load graph with data
    if (optData != null) {
      convert.toNetworkxGraph(optData, this);
    }

    // load graph attributes (must be after convert)
    if (optAttr) {
      _core.Object.assign(this.graph, optAttr);
    }
    this.edge = this.adj;
  }

  _babelHelpers.prototypeProperties(Graph, {
    __name__: {

      /**
       * Holds the graph type (class) name for information.
       * This is compatible to Pythons __name__ property.
       *
       * @type {string}
       */

      get: function () {
        return "Graph";
      },
      configurable: true
    }
  }, (function () {
    var _babelHelpers$prototypeProperties = {
      name: {

        /**
         * Gets or sets the name of the graph.
         *
         * @param {string=} opt_name Graph name.
         *
         * @return {(string|undefined)} Graph name if no parameter was passed.
         * @export
         */

        get: function () {
          return this.graph.name || "";
        },
        set: function (name) {
          this.graph.name = name;
        },
        configurable: true
      },
      toString: {

        // Implements __str__
        /**
         * Return the graph name
         *
         * @return {string} Graph name.
         * @export
         */

        value: function toString() {
          return this.name;
        },
        writable: true,
        configurable: true
      },
      forEach: {

        /* for convenience */

        value: function forEach(callback, optThisValue) {
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = _core.$for.getIterator(this.adj.keys()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var n = _step.value;

              if (optThisValue) {
                callback.call(optThisValue, n);
              } else {
                callback(n);
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        },
        writable: true,
        configurable: true
      },
      get: {

        // __contains__ is not supported, has_node has to be used

        // __len__ is not supported, number_of_nodes or order has to be used

        // Implements __getitem__
        /**
         * Return a dict of neighbors of node n.
         *
         * @param {Node} n  A node in the graph.
         *
         * @return {!Map} The adjacency dictionary for nodes
         *   connected to n.
         * @export
         */

        value: function get(n) {
          var value = this.adj.get(n);
          if (typeof value === "undefined") {
            throw new KeyError("Graph does not contain node " + n + ".");
          }
          return value;
        },
        writable: true,
        configurable: true
      },
      addNode: {

        /**
         * Add a single node n and update node attributes.
         *
         * Since JavaScript does not provide keyword arguments,
         * all attributes must be passed in an object as second
         * argument.
         *
         * @param {!Node} n A node.
         * @param {Object=} opt_attr_dict Dictionary of node attributes.
         *      Key/value pairs will update existing data associated with the node.
         * @export
         */

        value: function addNode(n) {
          var optAttrDict = arguments[1] === undefined ? {} : arguments[1];

          if (!isPlainObject(optAttrDict)) {
            throw new JSNetworkXError("The attr_dict argument must be an object.");
          }

          if (!this.node.has(n)) {
            this.adj.set(n, new Map());
            this.node.set(n, optAttrDict);
          } else {
            // update attr even if node already exists
            _core.Object.assign(this.node.get(n), optAttrDict);
          }
        },
        writable: true,
        configurable: true
      },
      addNodesFrom: {

        /**
         * Add multiple nodes.
         *
         * Since JavaScript does not provide keyword arguments,
         * all attributes must be passed in an object as second
         * argument.
         *
         * @param {!NodeContainer} nodes
         *       A container of nodes (Array, Object, Array-like).
         *       OR
         *       A container of (node, attribute dict) tuples.
         *
         * @param {Object=} opt_attr  Update attributes for all nodes in nodes.
         *       Node attributes specified in nodes as a tuple
         *       take precedence over attributes specified generally.
         * @export
         */

        value: function addNodesFrom(nodes) {
          var optAttr = arguments[1] === undefined ? {} : arguments[1];

          forEach(nodes, function (node) {
            if (Array.isArray(node) && node.length === 2 && isPlainObject(node[1])) {
              var _node = _babelHelpers.slicedToArray(node, 2);

              var nn = _node[0];
              var ndict = _node[1];

              if (!this.adj.has(nn)) {
                this.adj.set(nn, new Map());
                var newdict = clone(optAttr);
                this.node.set(nn, _core.Object.assign(newdict, ndict));
              } else {
                var olddict = this.node.get(nn);
                _core.Object.assign(olddict, optAttr, ndict);
              }
              return; // continue next iteration
            }
            var newnode = !this.node.has(node);
            if (newnode) {
              this.adj.set(node, new Map());
              this.node.set(node, clone(optAttr));
            } else {
              _core.Object.assign(this.node.get(node), optAttr);
            }
          }, this);
        },
        writable: true,
        configurable: true
      },
      removeNode: {

        /**
         * Remove node n.
         *
         * Removes the node n and all adjacent edges.
         * Attempting to remove a non-existent node will raise an exception.
         *
         * @param {Node} n A node in the graph.
         * @export
         */

        value: function removeNode(n) {
          var adj = this.adj;

          if (this.node["delete"](n)) {
            adj.get(n).forEach(function (_, u) {
              return adj.get(u)["delete"](n) // remove all edges n-u in graph
              ;
            });
            adj["delete"](n); // now remove node
          } else {
            throw new JSNetworkXError("The node %s is not in the graph", n);
          }
        },
        writable: true,
        configurable: true
      },
      removeNodesFrom: {

        /**
         * Remove multiple nodes.
         *
         * @param {NodeContainer} nodes A container of nodes
         *      If a node in the container is not in the graph it is silently ignored.
         *
         * @export
         */

        value: function removeNodesFrom(nodes) {
          var adj = this.adj;
          var node = this.node;

          forEach(nodes, function (n) {
            if (node["delete"](n)) {
              adj.get(n).forEach(function (_, u) {
                return adj.get(u)["delete"](n);
              });
              adj["delete"](n);
            }
          });
        },
        writable: true,
        configurable: true
      },
      nodesIter: {

        /**
         * Return an iterator over the nodes.
         *
         * @param {boolean=} opt_data (default false) If false the iterator returns
         *   nodes. If true return a two-tuple of node and node data dictionary.
         *
         * @return {Iterator} of nodes If data=true the iterator gives
         *           two-tuples containing (node, node data, dictionary).
         * @export
         */

        value: function nodesIter(optData) {
          if (optData) {
            return toIterator(this.node);
          }
          return this.node.keys();
        },
        writable: true,
        configurable: true
      },
      nodes: {

        /**
         * Return a list of the nodes in the graph.
         *
         * @param {boolean=} opt_data (default false) If false the iterator returns
         *   nodes. If true return a two-tuple of node and node data dictionary.
         *
         * @return {!Array} of nodes If data=true a list of two-tuples containing
         *           (node, node data dictionary).
         * @export
         */

        value: function nodes(optData) {
          return _core.Array.from(optData ? this.node.entries() : this.node.keys());
        },
        writable: true,
        configurable: true
      },
      numberOfNodes: {

        /**
         * Return the number of nodes in the graph.
         *
         * @return {number} The number of nodes in the graph.
         * @export
         */

        value: function numberOfNodes() {
          return this.node.size;
        },
        writable: true,
        configurable: true
      },
      order: {

        /**
         * Return the number of nodes in the graph.
         *
         * @return {number} The number of nodes in the graph.
         * @export
         */

        value: function order() {
          return this.node.size;
        },
        writable: true,
        configurable: true
      },
      hasNode: {

        /**
         * Return true if the graph contains the node n.
         *
         * @param {!(Node|NodeContainer)} n node.
         *
         * @return {boolean}
         * @export
         */

        value: function hasNode(n) {
          return this.node.has(n);
        },
        writable: true,
        configurable: true
      },
      addEdge: {

        /**
         * Add an edge between u and v.
         *
         * The nodes u and v will be automatically added if they are
         * not already in the graph.
         *
         * Edge attributes can be specified by providing
         * a dictionary with key/value pairs.
         *
         * Unlike in Python, attributes can only be defined
         * via the dictionary.
         *
         * @param {Node} u Node.
         * @param {Node} v Node.
         * @param {?Object=} opt_attr_dict Dictionary of edge attributes.
         *      Key/value pairs will update existing data associated with the edge.
         *
         * @export
         */

        value: function addEdge(u, v, optAttrDict) {
          if (optAttrDict && !isPlainObject(optAttrDict)) {
            throw new JSNetworkXError("The attr_dict argument must be an object.");
          }

          // add nodes
          if (!this.node.has(u)) {
            this.adj.set(u, new Map());
            this.node.set(u, {});
          }
          if (!this.node.has(v)) {
            this.adj.set(v, new Map());
            this.node.set(v, {});
          }

          // add the edge
          var datadict = this.adj.get(u).get(v) || {};
          _core.Object.assign(datadict, optAttrDict);
          this.adj.get(u).set(v, datadict);
          this.adj.get(v).set(u, datadict);
        },
        writable: true,
        configurable: true
      },
      addEdgesFrom: {

        /**
         * Add all the edges in ebunch.
         *
         * Adding the same edge twice has no effect but any edge data
         * will be updated when each duplicate edge is added.
         *
         * Edge attributes specified in edges as a tuple take precedence
         * over attributes specified generally.
         *
         * @param {Iterable} ebunch container of edges
         *      Each edge given in the container will be added to the
         *      graph. The edges must be given as as 2-tuples (u,v) or
         *      3-tuples (u,v,d) where d is a dictionary containing edge
         *      data.
         *
         * @param {Object=} opt_attr_dict
         *     Dictionary of edge attributes.  Key/value pairs will
         *     update existing data associated with each edge.
         * @export
         */

        value: function addEdgesFrom(ebunch, optAttrDict) {
          if (optAttrDict && !isPlainObject(optAttrDict)) {
            throw new JSNetworkXError("The attr_dict argument must be an object.");
          }

          // process ebunch
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = _core.$for.getIterator(ebunch), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var tuple = _step.value;

              if (tuple.length == null) {
                throw new JSNetworkXError(sprintf("Edge tuple %j must be a 2-tuple or 3-tuple.", tuple));
              }

              var _tuple = _babelHelpers.slicedToArray(tuple, 3);

              var u = _tuple[0];
              var v = _tuple[1];
              var data = _tuple[2];

              if (!isPlainObject(data)) {
                data = {};
              }
              if (u == null || v == null || tuple[3] != null) {
                throw new JSNetworkXError(sprintf("Edge tuple %j must be a 2-tuple or 3-tuple.", tuple));
              }

              if (!this.node.has(u)) {
                this.adj.set(u, new Map());
                this.node.set(u, {});
              }
              if (!this.node.has(v)) {
                this.adj.set(v, new Map());
                this.node.set(v, {});
              }

              // add the edge
              var datadict = this.adj.get(u).get(v) || {};
              _core.Object.assign(datadict, optAttrDict, data);
              this.adj.get(u).set(v, datadict);
              this.adj.get(v).set(u, datadict);
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }
        },
        writable: true,
        configurable: true
      },
      addWeightedEdgesFrom: {

        /**
         * Add all the edges in ebunch as weighted edges with specified weights.
         *
         *
         * Adding the same edge twice for Graph/DiGraph simply updates
         * the edge data.  For MultiGraph/MultiDiGraph, duplicate edges
         * are stored.
         *
         * Since JavaScript does not support keyword arguments, all attributes
         * must be passed in the attr object.
         *
         * @param {?} ebunch  container of edges
         *      Each edge given in the list or container will be added
         *      to the graph. The edges must be given as 3-tuples (u,v,w)
         *      where w is a number.
         *
         * @param {string=} opt_weight (default 'weight')
         *      The attribute name for the edge weights to be added.
         *
         * @param {Object=} opt_attr Edge attributes to add/update for all edges.
         *
         * @export
         */

        value: function addWeightedEdgesFrom(ebunch, optWeight, optAttr) {
          optAttr = optAttr || {};
          if (!isString(optWeight)) {
            optAttr = optWeight;
            optWeight = "weight";
          }

          this.addEdgesFrom(mapSequence(ebunch, function (e) {
            var attr = {};
            attr[optWeight] = e[2];
            if (attr[optWeight] == null) {
              // simulate too few value to unpack error
              throw new TypeError("Values must consist of three elements: %s.", e);
            }
            return [e[0], e[1], attr];
          }), optAttr);
        },
        writable: true,
        configurable: true
      },
      removeEdge: {

        /**
         * Remove the edge between u and v.
         *
         * @param {Node} u Node.
         * @param {Node} v Node.
         *
         * @export
         */

        value: function removeEdge(u, v) {
          var node = this.adj.get(u);
          if (node != null) {
            node["delete"](v);
            // self-loop needs only one entry removed
            var vnode = this.adj.get(v);
            if (vnode !== node) {
              vnode["delete"](u);
            }
          } else {
            throw new JSNetworkXError("The edge %s-%s is not in the graph", u, v);
          }
        },
        writable: true,
        configurable: true
      },
      removeEdgesFrom: {

        /**
         * Remove all edges specified in ebunch.
         *
         * Notes: Will fail silently if an edge in ebunch is not in the graph.
         *
         * @param {?} ebunch 1list or container of edge tuples
         *      Each edge given in the list or container will be removed
         *      from the graph. The edges can be:
         *          - 2-tuples (u,v) edge between u and v.
         *          - 3-tuples (u,v,k) where k is ignored.
         * @export
         */

        value: function removeEdgesFrom(ebunch) {
          var adj = this.adj;
          forEach(ebunch, function (_ref) {
            var _ref2 = _babelHelpers.slicedToArray(_ref, 2);

            var u = _ref2[0];
            var v = _ref2[1];

            var unode = adj.get(u);
            if (unode != null && unode.has(v)) {
              unode["delete"](v);
              var vnode = adj.get(v);
              if (vnode !== unode) {
                vnode["delete"](u);
              }
            }
          });
        },
        writable: true,
        configurable: true
      },
      hasEdge: {

        /**
         * Return True if the edge (u,v) is in the graph.
         *
         * @param {Node} u Node.
         * @param {Node} v Node.
         *
         * @return {boolean} True if edge is in the graph, False otherwise.
         * @export
         */

        value: function hasEdge(u, v) {
          var unode = this.adj.get(u);
          return unode && unode.has(v);
        },
        writable: true,
        configurable: true
      },
      neighbors: {

        /**
         * Return a list of the nodes connected to the node n.
         *
         * @param {!Node} n A node in the graph.
         *
         * @return {!Array} A list of nodes that are adjacent to n.
         * @export
         */

        value: function neighbors(n) {
          return _core.Array.from(this.neighborsIter(n));
        },
        writable: true,
        configurable: true
      },
      neighborsIter: {

        /**
         * Return an iterator over all neighbors of node n.
         *
         * @param {!Node} n A node in the graph.
         *
         * @return {!Iterator} A list of nodes that are adjacent to n.
         * @export
         */

        value: function neighborsIter(n) {
          var node = this.adj.get(n);
          if (node != null) {
            return node.keys();
          } else {
            throw new JSNetworkXError("The node %s is not in the graph.", n);
          }
        },
        writable: true,
        configurable: true
      },
      edges: {

        /**
         * Return a list of edges.
         *
         * Edges are returned as tuples with optional data
         * in the order (node, neighbor, data).
         *
         * Note: Nodes in nbunch that are not in the graph will be (quietly) ignored.
         * For directed graphs this returns the out-edges.
         *
         * @param {?NodeContainer=} opt_nbunch A container of nodes.
         *      The container will be iterated through once.
         * @param {?boolean=} opt_data Return two tuples (u,v) (False)
         *      or three-tuples (u,v,data) (True).
         *
         * @return {!Array} list of edge tuples
         *      Edges that are adjacent to any node in nbunch, or a list
         *      of all edges if nbunch is not specified.
         * @export
         */

        value: function edges(optNbunch, optData) {
          return _core.Array.from(this.edgesIter(optNbunch, optData));
        },
        writable: true,
        configurable: true
      },
      edgesIter: {

        /**
         * Return an iterator over the edges.
         *
         * Edges are returned as tuples with optional data
         * in the order (node, neighbor, data).
         *
         * Note: Nodes in nbunch that are not in the graph will be (quietly) ignored.
         * For directed graphs this returns the out-edges.
         *
         * @param {?(NodeContainer|boolean)=} opt_nbunch A container of nodes.
         *      The container will be iterated through once.
         * @param {?boolean=} opt_data Return two tuples (u,v) (False)
         *      or three-tuples (u,v,data) (True).
         *
         * @return {!Iterator} list of edge tuples
         *      Edges that are adjacent to any node in nbunch, or a list
         *      of all edges if nbunch is not specified.
         * @export
         */

        value: _regeneratorRuntime.mark(function edgesIter(optNbunch, optData) {
          var _this = this;

          var seen, nodesNbrs, adj, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, nodeData, node, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, neighborsData;

          return _regeneratorRuntime.wrap(function edgesIter$(context$3$0) {
            while (1) switch (context$3$0.prev = context$3$0.next) {
              case 0:

                // handle calls with data being the only argument
                if (isBoolean(optNbunch)) {
                  optData = optNbunch;
                  optNbunch = null;
                }

                seen = new Set();

                if (optNbunch == null) {
                  nodesNbrs = _this.adj.entries();
                } else {
                  adj = _this.adj;

                  nodesNbrs = mapIterator(_this.nbunchIter(optNbunch), function (n) {
                    return tuple2(n, adj.get(n));
                  });
                }

                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                context$3$0.prev = 6;
                _iterator = _core.$for.getIterator(nodesNbrs);

              case 8:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  context$3$0.next = 49;
                  break;
                }

                nodeData = _step.value;
                node = nodeData[0];
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                context$3$0.prev = 14;
                _iterator2 = _core.$for.getIterator(nodeData[1].entries());

              case 16:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  context$3$0.next = 30;
                  break;
                }

                neighborsData = _step2.value;

                if (seen.has(neighborsData[0])) {
                  context$3$0.next = 27;
                  break;
                }

                if (!optData) {
                  context$3$0.next = 25;
                  break;
                }

                neighborsData.unshift(node);
                context$3$0.next = 23;
                return neighborsData;

              case 23:
                context$3$0.next = 27;
                break;

              case 25:
                context$3$0.next = 27;
                return [node, neighborsData[0]];

              case 27:
                _iteratorNormalCompletion2 = true;
                context$3$0.next = 16;
                break;

              case 30:
                context$3$0.next = 36;
                break;

              case 32:
                context$3$0.prev = 32;
                context$3$0.t31 = context$3$0["catch"](14);
                _didIteratorError2 = true;
                _iteratorError2 = context$3$0.t31;

              case 36:
                context$3$0.prev = 36;
                context$3$0.prev = 37;

                if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                  _iterator2["return"]();
                }

              case 39:
                context$3$0.prev = 39;

                if (!_didIteratorError2) {
                  context$3$0.next = 42;
                  break;
                }

                throw _iteratorError2;

              case 42:
                return context$3$0.finish(39);

              case 43:
                return context$3$0.finish(36);

              case 44:
                seen.add(node);
                nodeData.length = 0;

              case 46:
                _iteratorNormalCompletion = true;
                context$3$0.next = 8;
                break;

              case 49:
                context$3$0.next = 55;
                break;

              case 51:
                context$3$0.prev = 51;
                context$3$0.t32 = context$3$0["catch"](6);
                _didIteratorError = true;
                _iteratorError = context$3$0.t32;

              case 55:
                context$3$0.prev = 55;
                context$3$0.prev = 56;

                if (!_iteratorNormalCompletion && _iterator["return"]) {
                  _iterator["return"]();
                }

              case 58:
                context$3$0.prev = 58;

                if (!_didIteratorError) {
                  context$3$0.next = 61;
                  break;
                }

                throw _iteratorError;

              case 61:
                return context$3$0.finish(58);

              case 62:
                return context$3$0.finish(55);

              case 63:
              case "end":
                return context$3$0.stop();
            }
          }, edgesIter, this, [[6, 51, 55, 63], [14, 32, 36, 44], [37,, 39, 43], [56,, 58, 62]]);
        }),
        writable: true,
        configurable: true
      },
      getEdgeData: {

        /**
         * Return the attribute dictionary associated with edge (u,v).
         *
         * @param {Node} u Node.
         * @param {Node} v Node.
         * @param {T=} opt_default (default=null)
         *      Value to return if the edge (u,v) is not found.
         *
         * @return {(Object|T)} The edge attribute dictionary.
         * @template T
         *
         * @export
         */

        value: function getEdgeData(u, v, optDefault) {
          var nbrs = this.adj.get(u);
          if (nbrs != null) {
            var data = nbrs.get(v);
            if (data != null) {
              return data;
            }
          }
          return optDefault;
        },
        writable: true,
        configurable: true
      },
      adjacencyList: {

        /**
         * Return an adjacency list representation of the graph.
         *
         * The output adjacency list is in the order of G.nodes().
         * For directed graphs, only outgoing adjacencies are included.
         *
         * @return {!Array.<Array>} The adjacency structure of the graph as a
         *      list of lists.
         * @export
         */

        value: function adjacencyList() {
          return _core.Array.from(mapIterator(this.adjacencyIter(), function (_ref) {
            var _ref2 = _babelHelpers.slicedToArray(_ref, 2);

            var _ = _ref2[0];
            var adj = _ref2[1];
            return _core.Array.from(adj.keys());
          }));
        },
        writable: true,
        configurable: true
      },
      adjacencyIter: {

        /**
         * Return an iterator of (node, adjacency dict) tuples for all nodes.
         *
         *
         * @return {!Iterator} An array of (node, adjacency dictionary)
         *      for all nodes in the graph.
         * @export
         */

        value: function adjacencyIter() {
          return this.adj.entries();
        },
        writable: true,
        configurable: true
      },
      degree: {

        /**
         * Return the degree of a node or nodes.
         *
         * The node degree is the number of edges adjacent to that node.
         *
         * WARNING: Since both parameters are optional, and the weight attribute
         * name could be equal to a node name, nbunch as to be set to null explicitly
         * to use the second argument as weight attribute name.
         *
         * @param {(Node|NodeContainer)=} opt_nbunch (default=all nodes)
         *      A container of nodes.  The container will be iterated
         *      through once.
         *
         * @param {string=} opt_weight (default=None)
         *      The edge attribute that holds the numerical value used
         *      as a weight.  If null or not defined, then each edge has weight 1.
         *      The degree is the sum of the edge weights adjacent to the node.
         *
         * @return {!(number|Map)} A dictionary with nodes as keys and
         * degree as values or a number if a single node is specified.
         * @export
         */

        value: function degree(optNbunch, optWeight) {
          if (optNbunch != null && this.hasNode(optNbunch)) {
            // return a single node
            return this.degreeIter(optNbunch, optWeight).next().value[1];
          } else {
            return new Map(this.degreeIter(optNbunch, optWeight));
          }
        },
        writable: true,
        configurable: true
      },
      degreeIter: {

        /**
         * Return an array for (node, degree).
         *
         *
         * @param {(Node|NodeContainer)=} opt_nbunch (default=all nodes)
         *       A container of nodes.  The container will be iterated
         *       through once.
         * @param {string=} opt_weight (default=None)
         *      The edge attribute that holds the numerical value used
         *      as a weight.  If null or not defined, then each edge has weight 1.
         *      The degree is the sum of the edge weights adjacent to the node.
         *
         * WARNING: Since both parameters are optional, and the weight attribute
         * name could be equal to a node name, nbunch as to be set to null explicitly
         * to use the second argument as weight attribute name.
         *
         * @return {!Iterator} of two-tuples of (node, degree).
         *
         * @export
         */

        value: function degreeIter(optNbunch, optWeight) {
          var nodesNbrs;
          var iterator;

          if (optNbunch == null) {
            nodesNbrs = this.adj.entries();
          } else {
            var adj = this.adj;
            nodesNbrs = mapIterator(this.nbunchIter(optNbunch), function (n) {
              return tuple2(n, adj.get(n));
            });
          }

          if (!optWeight) {
            iterator = mapIterator(nodesNbrs, function (_ref) {
              var _ref2 = _babelHelpers.slicedToArray(_ref, 2);

              var node = _ref2[0];
              var nbrs = _ref2[1];

              return [node, nbrs.size + +nbrs.has(node)];
            });
          } else {
            iterator = mapIterator(nodesNbrs, function (_ref) {
              var _ref2 = _babelHelpers.slicedToArray(_ref, 2);

              var n = _ref2[0];
              var nbrs = _ref2[1];

              var sum = 0;

              nbrs.forEach(function (data) {
                var weight = data[optWeight];
                sum += +(weight != null ? weight : 1);
              });

              if (nbrs.has(n)) {
                var weight = nbrs.get(n)[optWeight];
                sum += +(weight != null ? weight : 1);
              }

              return [n, sum];
            });
          }

          return iterator;
        },
        writable: true,
        configurable: true
      },
      clear: {

        /**
         * Remove all nodes and edges from the graph.
         *
         * This also removes the name, and all graph, node, and edge attributes.
         *
         * @export
         */

        value: (function (_clear) {
          var _clearWrapper = function clear() {
            return _clear.apply(this, arguments);
          };

          _clearWrapper.toString = function () {
            return _clear.toString();
          };

          return _clearWrapper;
        })(function () {
          this.name = "";
          this.adj.clear();
          this.node.clear();
          clear(this.graph);
        }),
        writable: true,
        configurable: true
      },
      copy: {

        /**
         * Return a copy of the graph.
         *
         * This makes a complete copy of the graph including all of the
         * node or edge attributes.
         *
         * @return {!Graph}
         * @export
         */

        value: function copy() {
          return deepcopy(this);
        },
        writable: true,
        configurable: true
      },
      isMultigraph: {

        /**
         * Return True if graph is a multigraph, False otherwise.
         *
         * @return {boolean} True if graph is a multigraph, False otherwise.
         * @export
         */

        value: function isMultigraph() {
          return false;
        },
        writable: true,
        configurable: true
      },
      isDirected: {

        /**
         * Return True if graph is directed, False otherwise.
         *
         * @return {boolean}  True if graph is directed, False otherwise.
         * @export
         */

        value: function isDirected() {
          return false;
        },
        writable: true,
        configurable: true
      },
      toDirected: {

        /**
         * Return a directed representation of the graph.
         *
         * This returns a "deepcopy" of the edge, node, and
         * graph attributes which attempts to completely copy
         * all of the data and references.
         *
         * This is in contrast to the similar D=DiGraph(G) which returns a
         * shallow copy of the data.
         *
         * @return {!DiGraph}
         * @export
         */

        value: function toDirected() {
          var G = new (require("./DiGraph"))();
          G.name = this.name;
          G.addNodesFrom(this);
          G.addEdgesFrom(_regeneratorRuntime.mark(function callee$3$0() {
            var _this = this;

            var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, nd, u, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, nbr;

            return _regeneratorRuntime.wrap(function callee$3$0$(context$4$0) {
              while (1) switch (context$4$0.prev = context$4$0.next) {
                case 0:
                  _iteratorNormalCompletion = true;
                  _didIteratorError = false;
                  _iteratorError = undefined;
                  context$4$0.prev = 3;
                  _iterator = _core.$for.getIterator(_this.adjacencyIter());

                case 5:
                  if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                    context$4$0.next = 37;
                    break;
                  }

                  nd = _step.value;
                  u = nd[0];
                  _iteratorNormalCompletion2 = true;
                  _didIteratorError2 = false;
                  _iteratorError2 = undefined;
                  context$4$0.prev = 11;
                  _iterator2 = _core.$for.getIterator(nd[1]);

                case 13:
                  if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                    context$4$0.next = 20;
                    break;
                  }

                  nbr = _step2.value;
                  context$4$0.next = 17;
                  return tuple3(u, nbr[0], deepcopy(nbr[1]));

                case 17:
                  _iteratorNormalCompletion2 = true;
                  context$4$0.next = 13;
                  break;

                case 20:
                  context$4$0.next = 26;
                  break;

                case 22:
                  context$4$0.prev = 22;
                  context$4$0.t33 = context$4$0["catch"](11);
                  _didIteratorError2 = true;
                  _iteratorError2 = context$4$0.t33;

                case 26:
                  context$4$0.prev = 26;
                  context$4$0.prev = 27;

                  if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                    _iterator2["return"]();
                  }

                case 29:
                  context$4$0.prev = 29;

                  if (!_didIteratorError2) {
                    context$4$0.next = 32;
                    break;
                  }

                  throw _iteratorError2;

                case 32:
                  return context$4$0.finish(29);

                case 33:
                  return context$4$0.finish(26);

                case 34:
                  _iteratorNormalCompletion = true;
                  context$4$0.next = 5;
                  break;

                case 37:
                  context$4$0.next = 43;
                  break;

                case 39:
                  context$4$0.prev = 39;
                  context$4$0.t34 = context$4$0["catch"](3);
                  _didIteratorError = true;
                  _iteratorError = context$4$0.t34;

                case 43:
                  context$4$0.prev = 43;
                  context$4$0.prev = 44;

                  if (!_iteratorNormalCompletion && _iterator["return"]) {
                    _iterator["return"]();
                  }

                case 46:
                  context$4$0.prev = 46;

                  if (!_didIteratorError) {
                    context$4$0.next = 49;
                    break;
                  }

                  throw _iteratorError;

                case 49:
                  return context$4$0.finish(46);

                case 50:
                  return context$4$0.finish(43);

                case 51:
                case "end":
                  return context$4$0.stop();
              }
            }, callee$3$0, this, [[3, 39, 43, 51], [11, 22, 26, 34], [27,, 29, 33], [44,, 46, 50]]);
          }).call(this));
          G.graph = deepcopy(this.graph);
          G.node = deepcopy(this.node);

          return G;
        },
        writable: true,
        configurable: true
      },
      toUndirected: {

        /**
         * Return an undirected copy of the graph.
         *
         * This returns a "deepcopy" of the edge, node, and
         * graph attributes which attempts to completely copy
         * all of the data and references.
         *
         * This is in contrast to the similar G=DiGraph(D) which returns a
         * shallow copy of the data.
         *
         * @return {!Graph}
         * @export
         */

        value: function toUndirected() {
          return deepcopy(this);
        },
        writable: true,
        configurable: true
      },
      subgraph: {

        /**
         * Return the subgraph induced on nodes in nbunch.
         *
         * The induced subgraph of the graph contains the nodes in nbunch
         * and the edges between those nodes.
         *
         * The graph, edge or node attributes just point to the original graph.
         * So changes to the node or edge structure will not be reflected in
         * the original graph while changes to the attributes will.
         *
         * To create a subgraph with its own copy of the edge/node attributes use:
         * `jsnx.Graph(G.subgraph(nbunch))`.
         *
         * If edge attributes are containers, a deep copy can be obtained using:
         * `G.subgraph(nbunch).copy()`
         *
         * For an inplace reduction of a graph to a subgraph you can remove nodes:
         *
         * ```
         * G.removeNodesFrom(G.nodes().filter(function(n) {
         *      return nbunch.indexOf(n) > -1;
         * }))
         * ```
         *
         * @param {NodeContainer} nbunch
         *      A container of nodes which will be iterated through once.
         *
         * @return {Graph}
         * @export
         */

        value: function subgraph(nbunch) {
          var bunch = this.nbunchIter(nbunch);
          var n;

          // create new graph and copy subgraph into it
          var H = new this.constructor();
          // copy node and attribute dictionaries
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = _core.$for.getIterator(bunch), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              n = _step.value;

              H.node.set(n, this.node.get(n));
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          // namespace shortcuts for speed
          var HAdj = H.adj;
          var thisAdj = this.adj;

          // add nodes and edges (undirected method)
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (var _iterator2 = _core.$for.getIterator(H), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
              n = _step2.value;

              var Hnbrs = new Map();
              HAdj.set(n, Hnbrs);

              var _iteratorNormalCompletion3 = true;
              var _didIteratorError3 = false;
              var _iteratorError3 = undefined;

              try {
                for (var _iterator3 = _core.$for.getIterator(thisAdj.get(n)), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                  var nbrdata = _step3.value;

                  var nbr = nbrdata[0];
                  var data = nbrdata[1];
                  if (HAdj.has(nbr)) {
                    // add both representations of edge: n-nbr and nbr-n
                    Hnbrs.set(nbr, data);
                    HAdj.get(nbr).set(n, data);
                  }
                }
              } catch (err) {
                _didIteratorError3 = true;
                _iteratorError3 = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
                    _iterator3["return"]();
                  }
                } finally {
                  if (_didIteratorError3) {
                    throw _iteratorError3;
                  }
                }
              }
            }
          } catch (err) {
            _didIteratorError2 = true;
            _iteratorError2 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                _iterator2["return"]();
              }
            } finally {
              if (_didIteratorError2) {
                throw _iteratorError2;
              }
            }
          }

          H.graph = this.graph;

          return H;
        },
        writable: true,
        configurable: true
      },
      nodesWithSelfloops: {

        /**
         * Return a list of nodes with self loops.
         *
         * A node with a self loop has an edge with both ends adjacent
         * to that node.
         *
         * @return {Array.<string>} A list of nodes with self loops.
         * @export
         */

        value: function nodesWithSelfloops() {
          var nodes = [];
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = _core.$for.getIterator(this.adj.entries()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var nd = _step.value;

              if (nd[1].has(nd[0])) {
                nodes.push(nd[0]);
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return nodes;
        },
        writable: true,
        configurable: true
      },
      selfloopEdges: {

        /**
         * Return a list of selfloop edges.
         *
         * A selfloop edge has the same node at both ends.
         *
         * @param {boolean=} opt_data (default=False)
         *      Return selfloop edges as two tuples (u,v) (data=False)
         *      or three-tuples (u,v,data) (data=True).
         *
         * @return {Array}  A list of all selfloop edges.
         * @export
         */

        value: function selfloopEdges(optData) {
          var edges = [];

          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = _core.$for.getIterator(this.adj.entries()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var nd = _step.value;

              var _nd = _babelHelpers.slicedToArray(nd, 2);

              var node = _nd[0];
              var nbrs = _nd[1];

              if (nbrs.has(node)) {
                if (optData) {
                  edges.push(tuple3c(node, node, nbrs.get(node), nd));
                } else {
                  edges.push(tuple2c(node, node, nd));
                }
              }
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          return edges;
        },
        writable: true,
        configurable: true
      },
      numberOfSelfloops: {

        /**
         * Return the number of selfloop edges.
         *
         * A selfloop edge has the same node at both ends.
         *
         * @return {number} The number of selfloops.
         * @export
         */

        value: function numberOfSelfloops() {
          return this.selfloopEdges().length;
        },
        writable: true,
        configurable: true
      },
      size: {

        /**
         * Return the number of edges.
         *
         * @param {string=} opt_weight The edge attribute that holds the numerical
         *      value used as a weight.  If not defined, then each edge has weight 1.
         *
         * @return {number} The number of edges or sum of edge weights in the graph.
         * @export
         */

        value: function size(optWeight) {
          var s = 0;
          var _iteratorNormalCompletion = true;
          var _didIteratorError = false;
          var _iteratorError = undefined;

          try {
            for (var _iterator = _core.$for.getIterator(this.degree(null, optWeight).values()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
              var v = _step.value;

              s += v;
            }
          } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
              }
            } finally {
              if (_didIteratorError) {
                throw _iteratorError;
              }
            }
          }

          s = s / 2;

          if (optWeight == null) {
            return Math.floor(s); // int(s)
          } else {
            return s; // no need to cast to float
          }
        },
        writable: true,
        configurable: true
      },
      numberOfEdges: {

        /**
         * Return the number of edges between two nodes.
         *
         * @param {!Node=} u node.
         * @param {!Node=} v node
         *       If u and v are specified, return the number of edges between
         *       u and v. Otherwise return the total number of all edges.
         *
         * @return {number} The number of edges in the graph.
         *      If nodes u and v are specified return the number of edges between
         *      those nodes.
         * @export
         */

        value: function numberOfEdges(u, v) {
          if (u == null) {
            return Math.floor(this.size());
          }
          if (this.adj.get(u).has(v)) {
            return 1;
          } else {
            return 0;
          }
        },
        writable: true,
        configurable: true
      },
      addStar: {

        /**
         * Add a star.
         *
         * The first node in nodes is the middle of the star.  It is connected
         * to all other nodes.
         *
         * @param {NodeContainer} nodes A container of nodes.
         * @param {Object=} opt_attr  Attributes to add to every edge in star.
         * @export
         */

        value: function addStar(nodes, optAttr) {
          var niter = toIterator(nodes);
          var v = niter.next().value;
          var edges = mapIterator(niter, function (n) {
            return tuple2(v, n);
          });
          this.addEdgesFrom(edges, optAttr);
        },
        writable: true,
        configurable: true
      },
      addPath: {

        /**
         * Add a path.
         *
         * @param {NodeContainer} nodes A container of nodes.
         *      A path will be constructed from the nodes (in order)
         *      and added to the graph.
         * @param {Object=} opt_attr Attributes to add to every edge in path.
         * @export
         */

        value: function addPath(nodes, optAttr) {
          var nlist = _core.Array.from(nodes);
          var edges = zipSequence(nlist.slice(0, nlist.length - 1), nlist.slice(1));
          this.addEdgesFrom(edges, optAttr);
        },
        writable: true,
        configurable: true
      },
      addCycle: {

        /**
         * Add a cycle.
         *
         * @param {NodeContainer} nodes A container of nodes.
         *      A cycle will be constructed from the nodes (in order)
         *      and added to the graph.
         * @param {Object=} opt_attr  Attributes to add to every edge in cycle.
         * @export
         */

        value: function addCycle(nodes, optAttr) {
          var nlist = _core.Array.from(nodes);
          var edges = zipSequence(nlist, nlist.slice(1).concat([nlist[0]]));
          this.addEdgesFrom(edges, optAttr);
        },
        writable: true,
        configurable: true
      },
      nbunchIter: {

        /**
         * Return an iterator of nodes contained in nbunch that are
         * also in the graph.
         *
         * The nodes in nbunch are checked for membership in the graph
         * and if not are silently ignored.
         *
         * Notes
         * -----
         * When nbunch is an iterator, the returned iterator yields values
         * directly from nbunch, becoming exhausted when nbunch is exhausted.
         *
         * To test whether nbunch is a single node, one can use
         * "if(this.has_node(nbunch)", even after processing with this routine.
         *
         * If nbunch is not a node or a (possibly empty) sequence/iterator
         * or not defined, an Error is raised.
         *
         * @param {(Node|NodeContainer)=} opt_nbunch (default=all nodes)
         *      A container of nodes.  The container will be iterated
         *      through once.
         *
         * @return {!Iterator} An iterator over nodes in nbunch
         *      that are also in the graph.
         *      If nbunch is null or not defined, iterate over all nodes in the graph.
         * @export
         */

        value: _regeneratorRuntime.mark(function nbunchIter(optNbunch) {
          var _this = this;

          var adj, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, n;

          return _regeneratorRuntime.wrap(function nbunchIter$(context$3$0) {
            while (1) switch (context$3$0.prev = context$3$0.next) {
              case 0:
                if (!(optNbunch == null)) {
                  context$3$0.next = 4;
                  break;
                }

                return context$3$0.delegateYield(_this.adj.keys(), "t35", 2);

              case 2:
                context$3$0.next = 44;
                break;

              case 4:
                if (!_this.hasNode(optNbunch)) {
                  context$3$0.next = 9;
                  break;
                }

                context$3$0.next = 7;
                return optNbunch;

              case 7:
                context$3$0.next = 44;
                break;

              case 9:
                adj = _this.adj;
                context$3$0.prev = 10;
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                context$3$0.prev = 14;
                _iterator = _core.$for.getIterator(toIterator(optNbunch));

              case 16:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  context$3$0.next = 24;
                  break;
                }

                n = _step.value;

                if (!adj.has(n)) {
                  context$3$0.next = 21;
                  break;
                }

                context$3$0.next = 21;
                return n;

              case 21:
                _iteratorNormalCompletion = true;
                context$3$0.next = 16;
                break;

              case 24:
                context$3$0.next = 30;
                break;

              case 26:
                context$3$0.prev = 26;
                context$3$0.t36 = context$3$0["catch"](14);
                _didIteratorError = true;
                _iteratorError = context$3$0.t36;

              case 30:
                context$3$0.prev = 30;
                context$3$0.prev = 31;

                if (!_iteratorNormalCompletion && _iterator["return"]) {
                  _iterator["return"]();
                }

              case 33:
                context$3$0.prev = 33;

                if (!_didIteratorError) {
                  context$3$0.next = 36;
                  break;
                }

                throw _iteratorError;

              case 36:
                return context$3$0.finish(33);

              case 37:
                return context$3$0.finish(30);

              case 38:
                context$3$0.next = 44;
                break;

              case 40:
                context$3$0.prev = 40;
                context$3$0.t37 = context$3$0["catch"](10);

                if (!(context$3$0.t37 instanceof TypeError)) {
                  context$3$0.next = 44;
                  break;
                }

                throw new JSNetworkXError("nbunch is not a node or a sequence of nodes");

              case 44:
              case "end":
                return context$3$0.stop();
            }
          }, nbunchIter, this, [[10, 40], [14, 26, 30, 38], [31,, 33, 37]]);
        }),
        writable: true,
        configurable: true
      }
    };
    _babelHelpers$prototypeProperties[_core.Symbol.iterator] = {
      value: function () {
        return this.node.keys();
      },
      writable: true,
      configurable: true
    };
    return _babelHelpers$prototypeProperties;
  })());

  return Graph;
})();

module.exports = Graph;
// helper dict to keep track of multiply stored edges
// include all nodes
/*jshint expr:true*/
// if nbunch is a single node
// if nbunch is a sequence of nodes

},{"../_internals":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/index.js","../_internals/Map":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/Map.js","../_internals/Set":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/Set.js","../convert":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/convert.js","../exceptions/JSNetworkXError":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/JSNetworkXError.js","../exceptions/KeyError":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/KeyError.js","./DiGraph":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/DiGraph.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js","babel-runtime/regenerator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/regenerator/index.js","lodash/lang/isBoolean":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isBoolean.js","lodash/lang/isString":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isString.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/MultiDiGraph.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var yieldEdges = _regeneratorRuntime.mark(function yieldEdges(nodesNbrs, data, keys, type) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, n, nbrs, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, nbr, keydict, key, result;

  return _regeneratorRuntime.wrap(function yieldEdges$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 3;
        _iterator = _core.$for.getIterator(nodesNbrs);

      case 5:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 48;
          break;
        }

        _step$value = _babelHelpers.slicedToArray(_step.value, 2);
        n = _step$value[0];
        nbrs = _step$value[1];
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 12;
        _iterator2 = _core.$for.getIterator(nbrs);

      case 14:
        if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
          context$1$0.next = 31;
          break;
        }

        _step2$value = _babelHelpers.slicedToArray(_step2.value, 2);
        nbr = _step2$value[0];
        keydict = _step2$value[1];
        context$1$0.t51 = _regeneratorRuntime.keys(keydict);

      case 19:
        if ((context$1$0.t52 = context$1$0.t51()).done) {
          context$1$0.next = 28;
          break;
        }

        key = context$1$0.t52.value;
        result = type === "out" ? [n, nbr] : [nbr, n];

        if (keys) {
          result[2] = isNaN(key) ? key : +key;
        }
        if (data) {
          result.push(keydict[key]);
        }
        context$1$0.next = 26;
        return result;

      case 26:
        context$1$0.next = 19;
        break;

      case 28:
        _iteratorNormalCompletion2 = true;
        context$1$0.next = 14;
        break;

      case 31:
        context$1$0.next = 37;
        break;

      case 33:
        context$1$0.prev = 33;
        context$1$0.t53 = context$1$0["catch"](12);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t53;

      case 37:
        context$1$0.prev = 37;
        context$1$0.prev = 38;

        if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
          _iterator2["return"]();
        }

      case 40:
        context$1$0.prev = 40;

        if (!_didIteratorError2) {
          context$1$0.next = 43;
          break;
        }

        throw _iteratorError2;

      case 43:
        return context$1$0.finish(40);

      case 44:
        return context$1$0.finish(37);

      case 45:
        _iteratorNormalCompletion = true;
        context$1$0.next = 5;
        break;

      case 48:
        context$1$0.next = 54;
        break;

      case 50:
        context$1$0.prev = 50;
        context$1$0.t54 = context$1$0["catch"](3);
        _didIteratorError = true;
        _iteratorError = context$1$0.t54;

      case 54:
        context$1$0.prev = 54;
        context$1$0.prev = 55;

        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }

      case 57:
        context$1$0.prev = 57;

        if (!_didIteratorError) {
          context$1$0.next = 60;
          break;
        }

        throw _iteratorError;

      case 60:
        return context$1$0.finish(57);

      case 61:
        return context$1$0.finish(54);

      case 62:
      case "end":
        return context$1$0.stop();
    }
  }, yieldEdges, this, [[3, 50, 54, 62], [12, 33, 37, 45], [38,, 40, 44], [55,, 57, 61]]);
});

var yieldDegree = _regeneratorRuntime.mark(function yieldDegree(graph, edges, nBunch, weight) {
  var nodesNbrs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, n, nbrs, sum, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, keydict, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _step3$value;

  return _regeneratorRuntime.wrap(function yieldDegree$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        nodesNbrs = nBunch == null ? edges : mapIterator(graph.nbunchIter(nBunch), function (n) {
          return tuple2(n, edges.get(n));
        });

        if (!(weight == null)) {
          context$1$0.next = 52;
          break;
        }

        _iteratorNormalCompletion = true;
        _didIteratorError = false;
        _iteratorError = undefined;
        context$1$0.prev = 5;
        _iterator = _core.$for.getIterator(nodesNbrs);

      case 7:
        if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
          context$1$0.next = 36;
          break;
        }

        _step$value = _babelHelpers.slicedToArray(_step.value, 2);
        n = _step$value[0];
        nbrs = _step$value[1];
        sum = 0;
        _iteratorNormalCompletion2 = true;
        _didIteratorError2 = false;
        _iteratorError2 = undefined;
        context$1$0.prev = 15;

        for (_iterator2 = _core.$for.getIterator(nbrs.values()); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          keydict = _step2.value;

          sum += _core.Object.keys(keydict).length;
        }
        context$1$0.next = 23;
        break;

      case 19:
        context$1$0.prev = 19;
        context$1$0.t55 = context$1$0["catch"](15);
        _didIteratorError2 = true;
        _iteratorError2 = context$1$0.t55;

      case 23:
        context$1$0.prev = 23;
        context$1$0.prev = 24;

        if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
          _iterator2["return"]();
        }

      case 26:
        context$1$0.prev = 26;

        if (!_didIteratorError2) {
          context$1$0.next = 29;
          break;
        }

        throw _iteratorError2;

      case 29:
        return context$1$0.finish(26);

      case 30:
        return context$1$0.finish(23);

      case 31:
        context$1$0.next = 33;
        return [n, sum];

      case 33:
        _iteratorNormalCompletion = true;
        context$1$0.next = 7;
        break;

      case 36:
        context$1$0.next = 42;
        break;

      case 38:
        context$1$0.prev = 38;
        context$1$0.t56 = context$1$0["catch"](5);
        _didIteratorError = true;
        _iteratorError = context$1$0.t56;

      case 42:
        context$1$0.prev = 42;
        context$1$0.prev = 43;

        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }

      case 45:
        context$1$0.prev = 45;

        if (!_didIteratorError) {
          context$1$0.next = 48;
          break;
        }

        throw _iteratorError;

      case 48:
        return context$1$0.finish(45);

      case 49:
        return context$1$0.finish(42);

      case 50:
        context$1$0.next = 80;
        break;

      case 52:
        _iteratorNormalCompletion3 = true;
        _didIteratorError3 = false;
        _iteratorError3 = undefined;
        context$1$0.prev = 55;
        _iterator3 = _core.$for.getIterator(nodesNbrs);

      case 57:
        if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
          context$1$0.next = 66;
          break;
        }

        _step3$value = _babelHelpers.slicedToArray(_step3.value, 2);
        n = _step3$value[0];
        nbrs = _step3$value[1];
        context$1$0.next = 63;
        return [n, sumEdgeAttribute(nbrs, weight, 1)];

      case 63:
        _iteratorNormalCompletion3 = true;
        context$1$0.next = 57;
        break;

      case 66:
        context$1$0.next = 72;
        break;

      case 68:
        context$1$0.prev = 68;
        context$1$0.t57 = context$1$0["catch"](55);
        _didIteratorError3 = true;
        _iteratorError3 = context$1$0.t57;

      case 72:
        context$1$0.prev = 72;
        context$1$0.prev = 73;

        if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
          _iterator3["return"]();
        }

      case 75:
        context$1$0.prev = 75;

        if (!_didIteratorError3) {
          context$1$0.next = 78;
          break;
        }

        throw _iteratorError3;

      case 78:
        return context$1$0.finish(75);

      case 79:
        return context$1$0.finish(72);

      case 80:
      case "end":
        return context$1$0.stop();
    }
  }, yieldDegree, this, [[5, 38, 42, 50], [15, 19, 23, 31], [24,, 26, 30], [43,, 45, 49], [55, 68, 72, 80], [73,, 75, 79]]);
});

var DiGraph = _babelHelpers.interopRequire(require("./DiGraph"));

var MultiGraph = _babelHelpers.interopRequire(require("./MultiGraph"));

var JSNetworkXError = _babelHelpers.interopRequire(require("../exceptions/JSNetworkXError"));

var _internals = require("../_internals");

var Map = _internals.Map;
var clone = _internals.clone;
var deepcopy = _internals.deepcopy;
var getDefault = _internals.getDefault;
var isPlainObject = _internals.isPlainObject;
var mapIterator = _internals.mapIterator;
var sprintf = _internals.sprintf;
var tuple2 = _internals.tuple2;
var tuple4 = _internals.tuple4;
var createTupleFactory = _internals.createTupleFactory;
var zipIterator = _internals.zipIterator;

/**
 * A directed graph class that can store multiedges.
 *
 * Multiedges are multiple edges between two nodes. Each edge can hold optional
 * data or attributes.
 *
 * A MultiDiGraph holds directed edges. Self loops are allowed. Edges are
 * respresented as links between nodes with optional key/value attributes.
 *
 * ### Example
 *
 * Create an empty graph structure (a "null graph") with no nodes and no edges:
 *
 * ```
 * var G = new jsnx.MultiDiGraph();
 * ```
 *
 * G can be grown in several ways.
 *
 * #### Nodes
 *
 * Add one node at a time:
 *
 * ```
 * G.addNode(1);
 * ```
 *
 * Add the nodes from any iterable:
 *
 * ```
 * G.addNodesFrom([2,3]);
 * var H = new jsnx.Graph();
 * H.addPath([0,1,2,3,4,5]);
 * G.addNodesFrom(H);
 * ```
 *
 * In addition to strings and integers, any object that implements a custom
 * `toString` method can represent a node.
 *
 * #### Edges
 *
 * `G` can also be grown by adding edges. Add one edge,
 *
 * ```
 * G.addEdge(1, 2);
 * ```
 *
 * a list of edges,
 *
 * ```
 * G.addEdgesFrom([[1,2], [1,3]]);
 * ```
 *
 * or a collection of edges
 *
 * ```
 * G.addEdgesFrom(H.edges());
 * ```
 *
 * If some edges connect nodes not yet in the graph, the nodes are added
 * automatically. If an edge already exists, an additional edge is created and
 * stored using a key to identify the edge. By default the key is the lowest
 * unused integer.
 *
 * ```
 * G.addEdgesFrom([[4,5,{route:282}], [4,5,{route:37}]]);
 * G.get(4);
 * // Map {5: {0: {}, 1: {route: 282}, 2: {route: 37}}}
 *
 * #### Attributes
 *
 * Each graph, node and edge can hold key/value attribute pairs in an associated
 * attribute object. By default these are empty, but can be added or changed
 * using `addEdge` or `addNode`.
 *
 * ```
 * G.addNode(1, {time: '5pm'});
 * G.addNodesFrom([3], {time: '2pm'});
 * G.nodes(true);
 * // [[1, {time: '5pm'}], [3, {time: '2pm'}]]
 * ```
 *
 * Add edge attributes using `addEdge` and `addEdgesFrom`:
 *
 * ```
 * G.addEdge(1, 2, {weight: 4.7});
 * G.addEdgesFrom([[3,4], [4,5]], {color: 'red'});
 * G.addEdgesFrom([[1,2,{color: 'blue'}], [2,3,{weight: 8}]]);
 * ```
 */

var MultiDiGraph = (function (DiGraph) {

  /**
   * @param {(Object|Array|Graph)} optData Data to initialize graph.
   *   If no data is passed, an empty graph is created. The data can be an edge
   *   list, or any JSNetworkX graph object.
   * @param {Object=} opt_attr (default= no attributes)
   *       Attributes to add to graph as key=value pairs.
   */

  function MultiDiGraph(optData, optAttr) {
    _babelHelpers.classCallCheck(this, MultiDiGraph);

    if (!(this instanceof MultiDiGraph)) {
      return new MultiDiGraph(optData, optAttr);
    }
    _babelHelpers.get(_core.Object.getPrototypeOf(MultiDiGraph.prototype), "constructor", this).call(this, optData, optAttr);
  }

  _babelHelpers.inherits(MultiDiGraph, DiGraph);

  _babelHelpers.prototypeProperties(MultiDiGraph, {
    __name__: {

      /**
       * Holds the graph type (class) name for information.
       *
       * @type {string}
       */

      get: function () {
        return "MultiDiGraph";
      },
      configurable: true
    }
  }, {
    addEdge: {

      /**
       * Add an edge between u and v.
       *
       * The nodes u and v will be automatically added if they are not already in
       * the graph.
       *
       * Edge attributes can be specified by providing an object with key/value
       * pairs.
       *
       * ### Note
       *
       * To replace/update edge data, use the optional key argument to identify a
       * unique edge. Otherwise a new edge will be created.
       *
       * ### Example
       *
       * The following add the edge e=(1,2) to graph G:
       *
       * ```
       * var G = new jsnx.MultiDiGraph();
       * G.addEdge(1, 2);
       * G.addEdgesFrom([[1,2]]);
       * ```
       *
       * Associate data to edges using keywords:
       *
       * ```
       * G.addEdge(1, 2, {weight: 3});
       * G.addEdge(1, 2, 0, {weight: 4}); // update data for key=0
       * G.addEdge(1, 3, {weight: 7, capacity: 15, length: 342.7});
       * ```
       * @param {Node} u
       * @param {Node} v
       * @param {(string|number)} optKey (default=lowest unused integer) Used to
       *   distinguish multiedges between a pair of nodes.
       * @param {Object} opAttrDict Object of edge attributes. Key/value pairs will
       *   update existing data associated with the edge.
       */

      value: function addEdge(u, v, optKey, optAttrDict) {
        if (optKey && typeof optKey === "object") {
          optAttrDict = optKey;
          optKey = null;
        }

        if (optAttrDict && !isPlainObject(optAttrDict)) {
          throw new JSNetworkXError("The optAttrDict argument must be a plain object.");
        }

        // add nodes
        var keydict;
        if (!this.succ.has(u)) {
          this.succ.set(u, new Map());
          this.pred.set(u, new Map());
          this.node.set(u, {});
        }
        if (!this.succ.has(v)) {
          this.succ.set(v, new Map());
          this.pred.set(v, new Map());
          this.node.set(v, {});
        }
        if (this.succ.get(u).has(v)) {
          keydict = this.get(u).get(v);
          if (optKey == null) {
            // find unique integer key
            optKey = _core.Object.keys(keydict).length;
            while (keydict[optKey]) {
              optKey += 1;
            }
          }
          keydict[optKey] = _core.Object.assign(getDefault(keydict[optKey], {}), optAttrDict);
        } else {
          // selfloops work this way without special treatment
          if (optKey == null) {
            optKey = 0;
          }
          keydict = _babelHelpers.defineProperty({}, optKey, _core.Object.assign({}, optAttrDict));
          this.succ.get(u).set(v, keydict);
          this.pred.get(v).set(u, keydict);
        }
      },
      writable: true,
      configurable: true
    },
    removeEdge: {

      /**
       * Remove an edge between u and v.
       *
       * ### Example
       *
       * ```
       * var G = new jsnx.MultiDiGraph();
       * G.addPath([0,1,2,3]);
       * G.removeEdge(0, 1);
       * ```
       *
       * For multiple edges:
       *
       * ```
       * var G = new jsnx.MultiDiGraph();
       * G.addEdgesFrom([[1,2], [1,2], [1,2]]);
       * G.removeEdge(1, 2); // remove a single (arbitrary) edge
       * ```
       *
       * For edges with keys:
       *
       * ```
       * var G = new jsnx.MultiDiGraph();
       * G.addEdge(1, 2, 'first');
       * G.addEdge(1, 2, 'second');
       * G.removeEdge(1, 2, 'second');
       * ```
       * @param {Node} u
       * @param {Node} v
       * @param {(string|number)} optKey Used to distinguish multiple edges between
       *   a pair of nodes. If undefined, remove a single (arbitrary) edge between
       *   u and v.
       */

      value: function removeEdge(u, v, optKey) {
        var keydict;
        var neightborsOfU = this.adj.get(u);
        if (neightborsOfU) {
          keydict = neightborsOfU.get(v);
        }
        if (keydict == null) {
          throw new JSNetworkXError(sprintf("The edge %j-%j is not in the graph", u, v));
        }

        // remove the edge with specified data
        if (optKey == null) {
          for (var key in keydict) {
            delete keydict[key];
            break;
          }
        } else {
          if (!keydict[optKey]) {
            throw new JSNetworkXError(sprintf("The edge %j-%j with key %j is not in the graph", u, v, optKey));
          }
          delete keydict[optKey];
        }
        if (_core.Object.keys(keydict).length === 0) {
          // remove the key entries if last edge
          this.succ.get(u)["delete"](v);
          this.pred.get(v)["delete"](u);
        }
      },
      writable: true,
      configurable: true
    },
    edgesIter: {

      /**
       * Return an iterator over the edges.
       *
       * Edges are returned as tuples with optional data and keys in the order
       * `(node, neighbor, key, data)`.
       *
       * ### Note
       *
       * Nodes in `optNbunch` that are not in the graph will be (quietly) ignored.
       * For directed graphs this returns the out-edges.
       *
       * ### Example
       *
       * ```
       * var G = new jsnx.MultiDiGraph();
       * G.addPath([0,1,2,3]);
       * Array.from(G.edgesIter());
       * // [[0,1], [1,2], [2,3]]
       * Array.from(G.edgesIter(true));
       * // [[0,1,{}], [1,2,{}], [2,3,{}]]
       * Array.from(G.edgesIter([0,2]));
       * // [[0,1], [2,3]]
       * ```
       *
       * @alias outEdgesIter
       *
       * @param {Iterable} optNbunch (default=all nodes) A container of nodes.
       *   The container will be iterated over only once.
       * @param {boolean} optData (default=false) If true, return edge attribute
       *   dictionaries with each edge.
       * @param {boolean} optKeys (default=flase) If true, return edge keys with
       *   each edge.
       * @return {Iterator} An iterator of `(u,v)`, `(u,v,d)` or `(u,v,key,d)` edges
       */

      value: _regeneratorRuntime.mark(function edgesIter(optNbunch) {
        var _this = this;

        var optData = arguments[1] === undefined ? false : arguments[1];
        var optKeys = arguments[2] === undefined ? false : arguments[2];
        var nodesNbrs;
        return _regeneratorRuntime.wrap(function edgesIter$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              if (typeof optNbunch === "boolean") {
                optKeys = optData;
                optData = optNbunch;
                optNbunch = null;
              }

              nodesNbrs = optNbunch == null ? _this.adj : mapIterator(_this.nbunchIter(optNbunch), function (n) {
                return tuple2(n, _this.adj.get(n));
              });
              return context$2$0.delegateYield(yieldEdges(nodesNbrs, optData, optKeys, "out"), "t43", 3);

            case 3:
            case "end":
              return context$2$0.stop();
          }
        }, edgesIter, this);
      }),
      writable: true,
      configurable: true
    },
    outEdgesIter: {

      /**
       * @alias edgesIter
       */

      value: function outEdgesIter(optNbunch, optData, optKeys) {
        return this.edgesIter(optNbunch, optData, optKeys);
      },
      writable: true,
      configurable: true
    },
    outEdges: {

      /**
       * Return a list of the outgoing edges.
       *
       * Edges are returned as tuples with optional data and keys in the order
       * `(node, neighbor, key, data)`.
       *
       * ### Note
       *
       * Nodes in `optNbunch` that are not in the graph will be (quietly) ignored.
       * For directed graphs `edges()` is the same as `outEdges()`.
       *
       * @see inEdges
       *
       * @param {Iterable} optNbunch (default=all nodes) A container of nodes.
       *   The container will be iterated over only once.
       * @param {boolean} optData (default=false) If true, return edge attribute
       *   dictionaries with each edge.
       * @param {boolean} optKeys (default=flase) If true, return edge keys with
       *   each edge.
       * @return {Array} A list of `(u,v)`, `(u,v,d)` or `(u,v,key,d)` tuples of
       *   edges
       */

      value: function outEdges(optNbunch, optData, optKeys) {
        return _core.Array.from(this.outEdgesIter(optNbunch, optData, optKeys));
      },
      writable: true,
      configurable: true
    },
    inEdgesIter: {

      /**
       * Return an iterator over the incoming edges.
       *
       * Edges are returned as tuples with optional data and keys in the order
       * `(node, neighbor, key, data)`.
       *
       * @see edgesIter
       *
       * @param {Iterable=} optNbunch (default=all nodes) A container of nodes.
       *   The container will be iterated over only once.
       * @param {boolean=} optData (default=false) If true, return edge attribute
       *   dictionaries with each edge.
       * @param {boolean=} optKeys (default=flase) If true, return edge keys with
       *   each edge.
       * @return {Iterator} An iterator of `(u,v)`, `(u,v,d)` or `(u,v,key,d)` edges
       */

      value: _regeneratorRuntime.mark(function inEdgesIter(optNbunch) {
        var _this = this;

        var optData = arguments[1] === undefined ? false : arguments[1];
        var optKeys = arguments[2] === undefined ? false : arguments[2];
        var nodesNbrs;
        return _regeneratorRuntime.wrap(function inEdgesIter$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              if (typeof optNbunch === "boolean") {
                optKeys = optData;
                optData = optNbunch;
                optNbunch = null;
              }

              nodesNbrs = optNbunch == null ? _this.pred : mapIterator(_this.nbunchIter(optNbunch), function (n) {
                return tuple2(n, _this.pred.get(n));
              });
              return context$2$0.delegateYield(yieldEdges(nodesNbrs, optData, optKeys, "in"), "t44", 3);

            case 3:
            case "end":
              return context$2$0.stop();
          }
        }, inEdgesIter, this);
      }),
      writable: true,
      configurable: true
    },
    inEdges: {

      /**
       * Return a list of the incoming edges.
       *
       * @see outEdges
       *
       * @param {Iterable=} optNbunch (default=all nodes) A container of nodes.
       *   The container will be iterated over only once.
       * @param {boolean=} optData (default=false) If true, return edge attribute
       *   dictionaries with each edge.
       * @param {boolean=} optKeys (default=flase) If true, return edge keys with
       *   each edge.
       * @return {Array} A list of `(u,v)`, `(u,v,d)` or `(u,v,key,d)` tuples of
       *   edges
       */

      value: function inEdges(optNbunch, optData, optKeys) {
        return _core.Array.from(this.inEdgesIter(optNbunch, optData, optKeys));
      },
      writable: true,
      configurable: true
    },
    degreeIter: {

      /**
       * Return an iterator for `(node, degree)`.
       *
       * The node degree is the number of edges adjacent to the node.
       *
       * ### Example
       *
       * ```
       * var G = new jsnx.MultiDiGraph();
       * G.addPath([0,1,2,3]);
       * Array.from(G.degreeIter([0,1]));
       * // [[0,1], [1,2]]
       * ```
       *
       * @param {Iterable=} optNbunch (default=all nodes) A container of nodes.
       *   The container will be iterated through once.
       * @param {string=} optString (default=null)
       *   The edge attribute that holds the numerical value used as a weight. If
       *   None, then each edge has weight 1.
       *   The degree is the sum of the edge weights.
       * @return {Iterator} The iterator returns two-tuples of `(node, degree)`.
       */

      value: _regeneratorRuntime.mark(function degreeIter(optNbunch, optWeight) {
        var _this = this;

        var tuple2Succ, tuple2Pred, nodesNbrs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, _step$value$0, n, succ, _step$value$1, _, pred, keydict, inDegree, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, outDegree, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _step4$value, _step4$value$0, _step4$value$1;

        return _regeneratorRuntime.wrap(function degreeIter$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              tuple2Succ = createTupleFactory(2);
              tuple2Pred = createTupleFactory(2);
              nodesNbrs = optNbunch == null ? zipIterator(_this.succ.entries(), _this.pred.entries()) : zipIterator(mapIterator(_this.nbunchIter(optNbunch), function (n) {
                return tuple2Succ(n, _this.succ.get(n));
              }), mapIterator(_this.nbunchIter(optNbunch), function (n) {
                return tuple2Pred(n, _this.pred.get(n));
              }));

              if (!(optWeight == null)) {
                context$2$0.next = 78;
                break;
              }

              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              context$2$0.prev = 7;
              _iterator = _core.$for.getIterator(nodesNbrs);

            case 9:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                context$2$0.next = 62;
                break;
              }

              _step$value = _babelHelpers.slicedToArray(_step.value, 2);
              _step$value$0 = _babelHelpers.slicedToArray(_step$value[0], 2);
              n = _step$value$0[0];
              succ = _step$value$0[1];
              _step$value$1 = _babelHelpers.slicedToArray(_step$value[1], 2);
              _ = _step$value$1[0];
              pred = _step$value$1[1];
              inDegree = 0;
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              context$2$0.prev = 21;

              for (_iterator2 = _core.$for.getIterator(pred.values()); !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                keydict = _step2.value;

                inDegree += _core.Object.keys(keydict).length;
              }
              context$2$0.next = 29;
              break;

            case 25:
              context$2$0.prev = 25;
              context$2$0.t45 = context$2$0["catch"](21);
              _didIteratorError2 = true;
              _iteratorError2 = context$2$0.t45;

            case 29:
              context$2$0.prev = 29;
              context$2$0.prev = 30;

              if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                _iterator2["return"]();
              }

            case 32:
              context$2$0.prev = 32;

              if (!_didIteratorError2) {
                context$2$0.next = 35;
                break;
              }

              throw _iteratorError2;

            case 35:
              return context$2$0.finish(32);

            case 36:
              return context$2$0.finish(29);

            case 37:
              outDegree = 0;
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              context$2$0.prev = 41;

              for (_iterator3 = _core.$for.getIterator(succ.values()); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                keydict = _step3.value;

                inDegree += _core.Object.keys(keydict).length;
              }
              context$2$0.next = 49;
              break;

            case 45:
              context$2$0.prev = 45;
              context$2$0.t46 = context$2$0["catch"](41);
              _didIteratorError3 = true;
              _iteratorError3 = context$2$0.t46;

            case 49:
              context$2$0.prev = 49;
              context$2$0.prev = 50;

              if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
                _iterator3["return"]();
              }

            case 52:
              context$2$0.prev = 52;

              if (!_didIteratorError3) {
                context$2$0.next = 55;
                break;
              }

              throw _iteratorError3;

            case 55:
              return context$2$0.finish(52);

            case 56:
              return context$2$0.finish(49);

            case 57:
              context$2$0.next = 59;
              return [n, inDegree + outDegree];

            case 59:
              _iteratorNormalCompletion = true;
              context$2$0.next = 9;
              break;

            case 62:
              context$2$0.next = 68;
              break;

            case 64:
              context$2$0.prev = 64;
              context$2$0.t47 = context$2$0["catch"](7);
              _didIteratorError = true;
              _iteratorError = context$2$0.t47;

            case 68:
              context$2$0.prev = 68;
              context$2$0.prev = 69;

              if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
              }

            case 71:
              context$2$0.prev = 71;

              if (!_didIteratorError) {
                context$2$0.next = 74;
                break;
              }

              throw _iteratorError;

            case 74:
              return context$2$0.finish(71);

            case 75:
              return context$2$0.finish(68);

            case 76:
              context$2$0.next = 110;
              break;

            case 78:
              _iteratorNormalCompletion4 = true;
              _didIteratorError4 = false;
              _iteratorError4 = undefined;
              context$2$0.prev = 81;
              _iterator4 = _core.$for.getIterator(nodesNbrs);

            case 83:
              if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                context$2$0.next = 96;
                break;
              }

              _step4$value = _babelHelpers.slicedToArray(_step4.value, 2);
              _step4$value$0 = _babelHelpers.slicedToArray(_step4$value[0], 2);
              n = _step4$value$0[0];
              succ = _step4$value$0[1];
              _step4$value$1 = _babelHelpers.slicedToArray(_step4$value[1], 2);
              _ = _step4$value$1[0];
              pred = _step4$value$1[1];
              context$2$0.next = 93;
              return [n, sumEdgeAttribute(pred, optWeight, 1) + sumEdgeAttribute(succ, optWeight, 1)];

            case 93:
              _iteratorNormalCompletion4 = true;
              context$2$0.next = 83;
              break;

            case 96:
              context$2$0.next = 102;
              break;

            case 98:
              context$2$0.prev = 98;
              context$2$0.t48 = context$2$0["catch"](81);
              _didIteratorError4 = true;
              _iteratorError4 = context$2$0.t48;

            case 102:
              context$2$0.prev = 102;
              context$2$0.prev = 103;

              if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
                _iterator4["return"]();
              }

            case 105:
              context$2$0.prev = 105;

              if (!_didIteratorError4) {
                context$2$0.next = 108;
                break;
              }

              throw _iteratorError4;

            case 108:
              return context$2$0.finish(105);

            case 109:
              return context$2$0.finish(102);

            case 110:
            case "end":
              return context$2$0.stop();
          }
        }, degreeIter, this, [[7, 64, 68, 76], [21, 25, 29, 37], [30,, 32, 36], [41, 45, 49, 57], [50,, 52, 56], [69,, 71, 75], [81, 98, 102, 110], [103,, 105, 109]]);
      }),
      writable: true,
      configurable: true
    },
    inDegreeIter: {

      /**
       * Return an iterator for `(node, in-degree)`.
       *
       * The node in-degree is the number of edges pointing to the node.
       *
       * ### Example
       *
       * ```
       * var G = new jsnx.MultiDiGraph();
       * G.addPath([0,1,2,3]);
       * Array.from(G.degreeIter([0,1]));
       * // [[0,0], [1,1]]
       * ```
       *
       * @param {Iterable=} optNbunch (default=all nodes) A container of nodes.
       *   The container will be iterated through once.
       * @param {string=} optString (default=null)
       *   The edge attribute that holds the numerical value used as a weight. If
       *   None, then each edge has weight 1.
       *   The degree is the sum of the edge weights.
       * @return {Iterator} The iterator returns two-tuples of `(node, degree)`.
       */

      value: _regeneratorRuntime.mark(function inDegreeIter(optNbunch, optWeight) {
        var _this = this;

        return _regeneratorRuntime.wrap(function inDegreeIter$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              return context$2$0.delegateYield(yieldDegree(_this, _this.pred, optNbunch, optWeight), "t49", 1);

            case 1:
            case "end":
              return context$2$0.stop();
          }
        }, inDegreeIter, this);
      }),
      writable: true,
      configurable: true
    },
    outDegreeIter: {

      /**
       * Return an iterator for `(node, out-degree)`.
       *
       * The node out-degree is the number of edges pointing out of the node.
       *
       * ### Example
       *
       * ```
       * var G = new jsnx.MultiDiGraph();
       * G.addPath([0,1,2,3]);
       * Array.from(G.degreeIter([0,1]));
       * // [[0,1], [1,1]]
       * ```
       *
       * @param {Iterable=} optNbunch (default=all nodes) A container of nodes.
       *   The container will be iterated through once.
       * @param {string=} optString (default=null)
       *   The edge attribute that holds the numerical value used as a weight. If
       *   None, then each edge has weight 1.
       *   The degree is the sum of the edge weights.
       * @return {Iterator} The iterator returns two-tuples of `(node, degree)`.
       */

      value: _regeneratorRuntime.mark(function outDegreeIter(optNbunch, optWeight) {
        var _this = this;

        return _regeneratorRuntime.wrap(function outDegreeIter$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              return context$2$0.delegateYield(yieldDegree(_this, _this.succ, optNbunch, optWeight), "t50", 1);

            case 1:
            case "end":
              return context$2$0.stop();
          }
        }, outDegreeIter, this);
      }),
      writable: true,
      configurable: true
    },
    isMultigraph: {

      /**
       * Return True if graph is a multigraph, False otherwise.
       *
       * @return {boolean} True if graph is a multigraph, False otherwise.
       */

      value: function isMultigraph() {
        return true;
      },
      writable: true,
      configurable: true
    },
    isDirected: {

      /**
       * Return True if graph is directed, False otherwise.
       *
       * @return {boolean}  True if graph is directed, False otherwise.
       */

      value: function isDirected() {
        return true;
      },
      writable: true,
      configurable: true
    },
    toDirected: {

      /**
       * Return a directed copy of the graph.
       *
       * ### Notes
       *
       * This returns a deep copy of the edge, node, and
       * graph attributes which attempts to completely copy
       * all of the data and references.
       *
       * This is in contrast to the similar `var G = new MultiDiGraph(D);`, which
       * returns a shallow copy of the data.
       *
       * @return {MultiDiGraph} A deep copy of the graph.
       */

      value: function toDirected() {
        return deepcopy(this);
      },
      writable: true,
      configurable: true
    },
    toUndirected: {

      /**
       * Return an undirected representation of the digraph.
       *
       * ### Notes
       *
       * The result is an undirected graph with the same name, nodes and
       * with edge `(u,v,data)` if either `(u,v,data)` or `(v,u,data)`
       * is in the digraph.  If both edges exist in digraph and
       * their edge data is different, only one edge is created
       * with an arbitrary choice of which edge data to use.
       * You must check and correct for this manually if desired.
       *
       * This returns a deep copy of the edge, node, and
       * graph attributes which attempts to completely copy
       * all of the data and references.
       *
       * This is in contrast to the similar `var G = new MultiGraph(D);`, which
       * returns a shallow copy of the data.
       *
       * @param {boolean=} optReciprocal If true, only keep edges that appear in
       *   both directions in the original digraph.
       * @return {MultiGraph}
       */

      value: function toUndirected(optReciprocal) {
        var H = new MultiGraph();
        H.name = this.name;
        H.addNodesFrom(this);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _core.$for.getIterator(this.adjacencyIter()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _babelHelpers.slicedToArray(_step.value, 2);

            var u = _step$value[0];
            var nbrs = _step$value[1];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = _core.$for.getIterator(nbrs), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _step2$value = _babelHelpers.slicedToArray(_step2.value, 2);

                var v = _step2$value[0];
                var keydict = _step2$value[1];

                for (var key in keydict) {
                  if (!optReciprocal || this.hasEdge(v, u, key)) {
                    H.addEdge(u, v, key, deepcopy(keydict[key]));
                  }
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                  _iterator2["return"]();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"]) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        H.graph = deepcopy(this.graph);
        H.node = deepcopy(this.node);
        return H;
      },
      writable: true,
      configurable: true
    },
    subgraph: {

      /**
       * Return the subgraph induced on nodes in `nbunch`.
       *
       * The induced subgraph of the graph contains the nodes in `optNbunch` and the
       * edges between those nodes.
       *
       * ### Notes
       *
       * The graph, edge or node attributes just point to the original graph.
       * So changes to the node or edge structure will not be reflected in
       * the original graph while changes to the attributes will.
       *
       * To create a subgraph with its own copy of the edge/node attributes use:
       * `jsnx.MultiDiGraph(G.subgraph(nbunch))`.
       *
       * ### Example
       *
       * ```
       * var G = new jsnx.MultiDiGraph();
       * G.addPath([0,1,2,3]);
       * var H = G.subgraph([0,1,2]);
       * H.edges();
       * // [[0,1], [1,2]]
       * ```
       *
       * @param {Iterable} nBunch A container of nodes which will be iterated
       *   through once.
       * @return {MultiDiGraph}
       */

      value: function subgraph(nBunch) {
        var bunch = this.nbunchIter(nBunch);
        // create new graph and copy subgraph into it
        var H = new this.constructor();
        // copy node and attribute dictionaries
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _core.$for.getIterator(bunch), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var n = _step.value;

            H.node.set(n, this.node.get(n));
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"]) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var HSucc = H.succ;
        var HPred = H.pred;
        var thisSucc = this.succ;

        // add nodes
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = _core.$for.getIterator(H), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var n = _step2.value;

            HSucc.set(n, new Map());
            HPred.set(n, new Map());
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        // add edges
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = _core.$for.getIterator(HSucc), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var _step3$value = _babelHelpers.slicedToArray(_step3.value, 2);

            var u = _step3$value[0];
            var HNbrs = _step3$value[1];
            var _iteratorNormalCompletion4 = true;
            var _didIteratorError4 = false;
            var _iteratorError4 = undefined;

            try {
              for (var _iterator4 = _core.$for.getIterator(thisSucc.get(u)), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                var _step4$value = _babelHelpers.slicedToArray(_step4.value, 2);

                var v = _step4$value[0];
                var keydict = _step4$value[1];

                if (HSucc.has(v)) {
                  // add both representations of edge: u-v and v-u
                  // they share the same keydict
                  var keydictCopy = clone(keydict);
                  HNbrs.set(v, keydictCopy);
                  HPred.get(v).set(u, keydictCopy);
                }
              }
            } catch (err) {
              _didIteratorError4 = true;
              _iteratorError4 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion4 && _iterator4["return"]) {
                  _iterator4["return"]();
                }
              } finally {
                if (_didIteratorError4) {
                  throw _iteratorError4;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        H.graph = this.graph;
        return H;
      },
      writable: true,
      configurable: true
    },
    reverse: {

      /**
       * Return the reverse of the graph.
       *
       * The reverse is a graph with the same nodes and edges but with the
       * directions of the edges reversed.
       *
       * @param {boolean=} optCopy If true, return a new MultiDiGraph holding the
       *   reversed edges. If false, the reverse graph is created using the original
       *   graph (this changes the original graph).
       * @return {?MultiDiGraph}
       */

      value: function reverse() {
        var optCopy = arguments[0] === undefined ? true : arguments[0];

        var H;
        if (optCopy) {
          H = new this.constructor(null, { name: sprintf("Reverse of (%s)", this.name) });

          H.addNodesFrom(this);
          H.addEdgesFrom(mapIterator(this.edges(true, true), function (_ref) {
            var _ref2 = _babelHelpers.slicedToArray(_ref, 4);

            var u = _ref2[0];
            var v = _ref2[1];
            var key = _ref2[2];
            var data = _ref2[3];
            return tuple4(v, u, key, deepcopy(data));
          }));
          H.graph = deepcopy(this.graph);
          H.node = deepcopy(this.node);
        } else {
          var _ref = [this.succ, this.pred];

          var _ref2 = _babelHelpers.slicedToArray(_ref, 2);

          this.pred = _ref2[0];
          this.succ = _ref2[1];

          this.adj = this.succ;
          H = this;
        }
        return H;
      },
      writable: true,
      configurable: true
    }
  });

  return MultiDiGraph;
})(DiGraph);

module.exports = MultiDiGraph;

// Simulate multiple inheritance by merging prototypes
_core.Object.getOwnPropertyNames(MultiGraph.prototype).forEach(function (prop) {
  if (!MultiDiGraph.prototype.hasOwnProperty(prop)) {
    MultiDiGraph.prototype[prop] = MultiGraph.prototype[prop];
  }
});

function sumEdgeAttribute(nbrs, attribute, def) {
  var sum = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _core.$for.getIterator(nbrs.values()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var keydict = _step.value;

      for (var key in keydict) {
        sum += getDefault(keydict[key][attribute], def);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return sum;
}

},{"../_internals":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/index.js","../exceptions/JSNetworkXError":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/JSNetworkXError.js","./DiGraph":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/DiGraph.js","./MultiGraph":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/MultiGraph.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js","babel-runtime/regenerator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/regenerator/index.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/MultiGraph.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var Graph = _babelHelpers.interopRequire(require("./Graph"));

var JSNetworkXError = _babelHelpers.interopRequire(require("../exceptions/JSNetworkXError"));

var _internals = require("../_internals");

var Map = _internals.Map;
var Set = _internals.Set;
var clone = _internals.clone;
var deepcopy = _internals.deepcopy;
var forEach = _internals.forEach;
var getDefault = _internals.getDefault;
var isArrayLike = _internals.isArrayLike;
var isPlainObject = _internals.isPlainObject;
var mapIterator = _internals.mapIterator;
var nodesAreEqual = _internals.nodesAreEqual;
var sprintf = _internals.sprintf;
var tuple2 = _internals.tuple2;

/**
 * An undirected graph class that can store multiedges.
 *
 * Multiedges are multiple edges between two nodes.  Each edge
 * can hold optional data or attributes. A MultiGraph holds undirected edges.
 * Self loops are allowed.
 *
 * Edges are represented as links between nodes with optional
 * key/value attributes.
 *
 * ### Examples
 *
 * Create an empty graph structure (a "null graph") with no nodes and no edges.
 *
 * ```
 * var G = jsnx.MultiGraph();
 * ```
 *
 * G can be grown in several ways.
 *
 * #### Nodes
 *
 * Add one node at a time:
 *
 * ```
 * G.addNode(1);
 * ```
 *
 * Add the nodes from any iterable:
 *
 * ```
 * G.addNodesFrom([2, 3]);
 * var H = jsnx.Graph();
 * H.addPath([0,1,2,3,4,5,6,7,8,9]);
 * G.addNodesFrom(h);
 * ```
 *
 * In addition to strings and integers, any object that implements a custom
 * `toString` method can be used as node. For example, arrays:
 *
 * ```
 * G.addNode([1,2]);
 * ```
 *
 * #### Edges
 *
 * A graph can also be grown by adding edges.
 *
 * Add one edge,
 *
 * ```
 * G.addEdge(1, 2);
 * ```
 *
 * a list or collection of edges,
 *
 * ```
 * G.addEdgesFrom([[1,2], [1,3]]);
 * G.addEdgesFrom(H.edges());
 * ```
 *
 * If some edges connect nodes not yet in the graph, the nodes are added
 * automatically. If an edge already exists, an addition edge is created and
 * stored using a key to identify the edge. By default, the key is the lowest
 * unused integer.
 *
 * ```
 * G.addEdgesFrom([[4,5,{route: 282}], [4,5,{route: 37}]]);
 * G.get(4);
 * // Map { 3: {0: {}}, 5: {0: {}, 1: {route: 282}, 2: {route: 37}}}
 * ```
 *
 * #### Attributes
 *
 * Each graph, node and edge can hold key/value attribute pairs in an associated
 * attribute "dictionary" (object). By defauly these are empty, but can be added
 * or changed using `addEdge` or `addNode`.
 *
 * ```
 * var G = jsnx.MultiGraph(null, {day: Friday}):
 * G.graph
 * // {day: 'Friday'}
 *
 * G.addNode(1, {time: '5pm'});
 * G.addNodesFrom([3], {time: '2pm'});
 * G.nodes(true);
 * // [[1, {time: '5pm'}], [3, {time: '2pm'}]]
 * ```
 *
 * @see Graph
 * @see DiGraph
 * @see MultiDiGraph
 *
 */

var MultiGraph = (function (Graph) {

  /**
   * @param {?=} optData Data to initialze graph.
   *      If no data is provided, an empty graph is created. The data can be
   *      an edge list or any graph object.
   * @param {Object=} optAttr Attributes to add to graph as key=value pairs.
   */

  function MultiGraph(optData, optAttr) {
    _babelHelpers.classCallCheck(this, MultiGraph);

    // makes it possible to call jsnx.Graph without new
    if (!(this instanceof MultiGraph)) {
      return new MultiGraph(optData, optAttr);
    }
    _babelHelpers.get(_core.Object.getPrototypeOf(MultiGraph.prototype), "constructor", this).call(this, optData, optAttr);
  }

  _babelHelpers.inherits(MultiGraph, Graph);

  _babelHelpers.prototypeProperties(MultiGraph, {
    __name__: {

      /**
       * Holds the graph type (class) name for information.
       * This is compatible to Pythons __name__ property.
       *
       * @type {string}
       */

      get: function () {
        return "MultiGraph";
      },
      configurable: true
    }
  }, {
    addEdge: {

      /**
       * Add an edge between u and v.
       *
       * The nodes u and v will be automatically added if they are
       * not already in the graph.
       *
       * Edge attributes can be specified with keywords or by providing
       * a dictionary with key/value pairs.
       *
       * ### Notes:
       *
       * To replace/update edge data, use the optional key argument
       * to identify a unique edge.  Otherwise a new edge will be created.
       *
       * NetworkX algorithms designed for weighted graphs cannot use
       * multigraphs directly because it is not clear how to handle
       * multiedge weights.  Convert to Graph using edge attribute
       * 'weight' to enable weighted graph algorithms.
       *
       * ### Example
       *
       * The following all add the edge [1,2] to the graph G:
       *
       * ```
       * var G = jsnx.MultiGraph();
       * var e = [1,2];
       * G.addEdge(1, 2);
       * G.addEdge.apply(G, e);
       * G.addEdgesFrom([e]);
       * ```
       * Associate data to edges by passing a data object:
       *
       * ```
       * G.addEdge(1, 2, {weight: 3});
       * G.addEdge(1, 2, 0, {weight: 4}); // update data for key=0
       * G.addEdge(1, 3, {weight: 7, capacity: 15, length: 342.7});
       * ```
       * @see #addEdgesFrom
       *
       * @param {Node} u node
       * @param {Node} v node
       * @param {?(number|string)=} optKey identifier
       *      Used to distinguish multiedges between a pair of nodes. Default is
       *      the lowest unused integer.
       * @param {?Object=} optAttrDict  Dictionary of edge attributes.
       *      Key/value pairs will update existing data associated with the edge.
       */

      value: function addEdge(u, v, optKey, optAttrDict) {
        var type = typeof optKey;
        if (optKey != null && type !== "number" && type !== "string") {
          optAttrDict = optKey;
          optKey = null;
        }

        // set up attribute dict
        if (optAttrDict && !isPlainObject(optAttrDict)) {
          throw new JSNetworkXError("The optAttrDict argument must be an object.");
        }

        // add nodes
        if (!this.adj.has(u)) {
          this.adj.set(u, new Map());
          this.node.set(u, {});
        }
        if (!this.adj.has(v)) {
          this.adj.set(v, new Map());
          this.node.set(v, {});
        }

        var keydict;
        if (this.adj.get(u).has(v)) {
          keydict = this.adj.get(u).get(v);
          if (optKey == null) {
            // find a unique integer key
            // other methods might be better here?
            optKey = _core.Object.keys(keydict).length;
            while (keydict[optKey]) {
              // ok, because values are objects only
              optKey += 1;
            }
          }
          var datadict = keydict[optKey] || {};
          keydict[optKey] = _core.Object.assign(datadict, optAttrDict);
        } else {
          // selfloops work this way without special treatment
          if (optKey == null) {
            optKey = 0;
          }
          keydict = Object.create(null);
          keydict[optKey] = _core.Object.assign({}, optAttrDict);
          this.adj.get(u).set(v, keydict);
          this.adj.get(v).set(u, keydict);
        }
      },
      writable: true,
      configurable: true
    },
    addEdgesFrom: {

      /**
       * Add all the edges in `ebunch`.
       *
       * Adding the same edge twice has no effect but any edge data will be updated
       * when each duplicate edge is added.
       *
       * Edge attributes specified in edges as a tuple take precedence over the
       * attributes specified generally.
       *
       * ### Example
       *
       * ```
       * var G = new jsnx.MultiGraph();
       * G.addEdgesFrom([[0,1], [1,2]]);
       * ```
       *
       * Associate data to edges
       *
       * ```
       * G.addEdgesFrom([[1,2], [2,3]], {weight: 3});
       * G.addEdgesFrom([[1,2], [2,3]], {label: 'WN2898'});
       * ```
       *
       * @see #addEdge
       * @see #addWeightedEdgesFrom
       *
       *
       * @param {Iterable} ebunch container of edges
       *      Each edge given in the container will be added to the
       *      graph. The edges can be:
       *
       *          - 2-tuples (u,v) or
       *          - 3-tuples (u,v,d) for an edge attribute dict d or
       *          - 4-tuples (u,v,k,d) for an edge identified by key k
       *
       * @param {Object=} optAttrDict Dictionary of edge attributes.
       *       Key/value pairs will update existing data associated with each edge.
       */

      value: function addEdgesFrom(ebunch, optAttrDict) {
        var _this = this;

        if (optAttrDict && !isPlainObject(optAttrDict)) {
          throw new JSNetworkXError("The optAttrDict argument must be an object.");
        }

        // process ebunch
        forEach(ebunch, function (edge) {
          var u;
          var v;
          var key;
          var data;

          switch (edge.length) {
            case 4:
              u = edge[0];
              v = edge[1];
              key = edge[2];
              data = edge[3];
              break;
            case 3:
              u = edge[0];
              v = edge[1];
              data = edge[2];
              break;
            case 2:
              u = edge[0];
              v = edge[1];
              break;
            default:
              if (!isArrayLike(edge)) {
                throw new TypeError("Elements in edgelists must be tuples.");
              }
              throw new JSNetworkXError(sprintf("Edge tuple %j must be a 2-tuple, 3-tuple or 4-tuple.", edge));
          }

          var keydict = _this.adj.has(u) ? _this.adj.get(u).get(v) || Object.create(null) : Object.create(null);

          if (key == null) {
            // find a unique integer key
            // other methods might be better here?
            key = _core.Object.keys(keydict).length;
            while (keydict[key]) {
              key += 1;
            }
          }
          var datadict = keydict[key] || {};
          _core.Object.assign(datadict, optAttrDict, data);
          _this.addEdge(u, v, key, datadict);
        });
      },
      writable: true,
      configurable: true
    },
    removeEdge: {

      /**
       * Remove an edge between u and v.
       *
       * ### Example
       *
       * ```
       * var G = new jsnx.MultiGraph();
       * G.addPath([0,1,2,3]);
       * G.removeEdge(0, 1);
       * ```
       *
       * For multiple edges
       *
       * ```
       * var G = new jsnx.MultiGraph();
       * G.addEdgesFrom([[1,2], [1,2], [1,2]]);
       * G.removeEdge(1, 2); // remove a single edge
       * ```
       *
       * For edges with keys
       *
       * ```
       * var G = new jsnx.MultiGraph();
       * G.addEdge(1, 2, 'first');
       * G.addEdge(1, 2, 'second');
       * G.removeEdge(1, 2, 'second');
       * ```
       *
       * @see #removeEdgesFrom
       *
       * @param {Node} u
       * @param {Node} v
       * @param {(number|string)=} optKey
       *      Used to distinguish multiple edges between a pair of nodes.
       *      If null or undefined remove a single (arbitrary) edge between u and v.
       */

      value: function removeEdge(u, v, optKey) {
        var keydict;
        var neightborsOfU = this.adj.get(u);
        if (neightborsOfU) {
          keydict = neightborsOfU.get(v);
        }
        if (keydict == null) {
          throw new JSNetworkXError(sprintf("The edge %j-%j is not in the graph", u, v));
        }

        // remove the edge with specified data
        if (optKey == null) {
          for (var key in keydict) {
            delete keydict[key];
            break;
          }
        } else {
          if (!keydict[optKey]) {
            throw new JSNetworkXError(sprintf("The edge %j-%j with key %j is not in the graph", u, v, optKey));
          }
          delete keydict[optKey];
        }
        if (_core.Object.keys(keydict).length === 0) {
          // remove the key entries if last edge
          neightborsOfU["delete"](v);
          if (!nodesAreEqual(u, v)) {
            this.adj.get(v)["delete"](u);
          }
        }
      },
      writable: true,
      configurable: true
    },
    removeEdgesFrom: {

      /**
       * Remove all edges specified in `ebunch`.
       *
       * Will fail silently if an edge in `ebunch` is not in the graph.
       *
       * ### Example
       *
       * ```
       * var G = new jsnx.MultiGraph();
       * G.addPath([0,1,2,3]);
       * var ebunch = [[1,2], [2,3]];
       * G.removeEdgesFrom(ebunch);
       * ```
       *
       * Removing multiple copies of edges.
       *
       * ```
       * var G = new jsnx.MultiGraph();
       * G.addEdgesFrom([[1,2], [1,2], [1,2]]);
       * G.removeEdgesFrom([[1,2], [1,2]]);
       * G.edges();
       * // [[1,2]]
       * ```
       *
       * @see #removeEdge
       *
       * @param {?} ebunch list or container of edge tuples
       *      Each edge given in the list or container will be removed
       *      from the graph. The edges can be:
       *
       *        - 2-tuples (u,v) All edges between u and v are removed.
       *        - 3-tuples (u,v,key) The edge identified by key is removed.
       */

      value: function removeEdgesFrom(ebunch) {
        var _this = this;

        forEach(ebunch, function (edge) {
          try {
            _this.removeEdge(edge[0], edge[1], edge[2]);
          } catch (ex) {
            if (!(ex instanceof JSNetworkXError)) {
              throw ex;
            }
          }
        });
      },
      writable: true,
      configurable: true
    },
    hasEdge: {

      /**
       * Return True if the graph has an edge between nodes u and v.
       *
       * ### Example
       *
       * ```
       * var G = new jsnx.MultiGraph();
       * G.addPath([0,1,2,3]);
       * G.hasEdge(0,1);
       * // true
       * G.addEdge(0, 1, 'a');
       * G.hasEdge(0, 1, 'a');
       * // true
       * ```
       *
       * The following syntax are equivalent:
       *
       * ```
       * G.hasEdge(0, 1);
       * // true
       * G.get(0).has(1);
       * // true
       * ```
       *
       * @param {Node} u node
       * @param {Node} v node
       * @param {(string|number)=} optKey If specified return true only
       *      if the edge with key is found.
       *
       * @return {boolean} true if edge is in the graph, false otherwise.
       */

      value: function hasEdge(u, v, optKey) {
        var neighborsOfU = this.adj.get(u);
        if (neighborsOfU) {
          return neighborsOfU.has(v) && (optKey == null || !!neighborsOfU.get(v)[optKey]);
        }
        return false;
      },
      writable: true,
      configurable: true
    },
    edges: {

      /**
       * Return a list of edges.
       *
       * Edges are returned as tuples with optional data and keys in the order
       * (node, neighbor, key, data).
       *
       * Nodes in `nbunch` that are not in the graph will be (quietly) ignored.
       *
       * ### Example
       *
       * ```
       * var G = new jsnx.MultiGraph();
       * G.addPath([0,1,2,3]);
       * G.edges();
       * // [[0,1], [1,2], [2,3]]
       * G.edges(true);
       * // [[0,1,{}], [1,2,{}], [2,3,{}]]
       * G.edges(false, true);
       * // [[0,1,0], [1,2,0], [2,3,0]]
       * G.edges(true, true);
       * // [[0,1,0,{}], [1,2,0,{}], [2,3,0,{}]]
       * G.edges([0,3]);
       * // [[0,1], [3, 2]]
       * G.edges(0);
       * // [[0,1]]
       * ```
       *
       * @see #edgesIter
       *
       * @param {?NodeContainer=} optNbunch A container of nodes.
       *      The container will be iterated through once.
       * @param {?boolean=} optData (default=False)
       *      Return two tuples (u,v) (False) or three-tuples (u,v,data) (True).
       * @param {?boolean=} optKeys (default=False)
       *      Return two tuples (u,v) (False) or three-tuples (u,v,key) (True).
       *
       * @return {!Array} list of edge tuples
       *      Edges that are adjacent to any node in nbunch, or a list
       *      of all edges if nbunch is not specified.
       */

      value: function edges(optNbunch, optData, optKeys) {
        return _core.Array.from(this.edgesIter(optNbunch, optData, optKeys));
      },
      writable: true,
      configurable: true
    },
    edgesIter: {

      /**
       * Return an iterator over edges.
       *
       * Edges are returned as tuples with optional data and keys
       * in the order (node, neighbor, key, data).
       *
       * Nodes in nbunch that are not in the graph will be (quietly) ignored.
       *
       * ### Example
       *
       * ```
       * var G = new jsnx.MultiGraph();
       * G.addPath([0,1,2,3]);
       * Array.from(G.edgesIter);
       * // [[0,1], [1,2], [2,3]]
       * Array.from(G.edges(true));
       * // [[0,1,{}], [1,2,{}], [2,3,{}]]
       * Array.from(G.edges(false, true));
       * // [[0,1,0], [1,2,0], [2,3,0]]
       * Array.from(G.edges(true, true));
       * // [[0,1,0,{}], [1,2,0,{}], [2,3,0,{}]]
       * Array.from(G.edges([0,3]));
       * // [[0,1], [3, 2]]
       * Array.from(G.edges(0));
       * // [[0,1]]
       * ```
       *
       * @see #edges
       *
       * @param {?(NodeContainer|boolean)=} optNbunch A container of nodes.
       *      The container will be iterated through once.
       * @param {?boolean=} optData (default=False)
       *      If True, return edge attribute dict with each edge.
       * @param {?boolean=} optKeys (default=False)
       *      If True, return edge keys with each edge.
       *
       * @return {!Iterator}
       *      An iterator of (u,v), (u,v,d) or (u,v,key,d) tuples of edges.
       *
       * @override
       * @export
       */

      value: _regeneratorRuntime.mark(function edgesIter(optNbunch) {
        var _this = this;

        var optData = arguments[1] === undefined ? false : arguments[1];
        var optKeys = arguments[2] === undefined ? false : arguments[2];

        var seen, nodesNbrs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, n, nbrs, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, nbr, keydict, key, tuple;

        return _regeneratorRuntime.wrap(function edgesIter$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              if (typeof optNbunch === "boolean") {
                optKeys = optData;
                optData = optNbunch;
                optNbunch = null;
              }

              seen = new Set();
              nodesNbrs = optNbunch == null ? _this.adj : mapIterator(_this.nbunchIter(optNbunch), function (n) {
                return tuple2(n, _this.adj.get(n));
              });
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              context$2$0.prev = 6;
              _iterator = _core.$for.getIterator(nodesNbrs);

            case 8:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                context$2$0.next = 53;
                break;
              }

              _step$value = _babelHelpers.slicedToArray(_step.value, 2);
              n = _step$value[0];
              nbrs = _step$value[1];
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              context$2$0.prev = 15;
              _iterator2 = _core.$for.getIterator(nbrs);

            case 17:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                context$2$0.next = 36;
                break;
              }

              _step2$value = _babelHelpers.slicedToArray(_step2.value, 2);
              nbr = _step2$value[0];
              keydict = _step2$value[1];

              if (seen.has(nbr)) {
                context$2$0.next = 33;
                break;
              }

              context$2$0.t38 = _regeneratorRuntime.keys(keydict);

            case 23:
              if ((context$2$0.t39 = context$2$0.t38()).done) {
                context$2$0.next = 32;
                break;
              }

              key = context$2$0.t39.value;
              tuple = [n, nbr];

              if (optKeys) {
                tuple[2] = key;
              }
              if (optData) {
                tuple.push(keydict[key]);
              }
              context$2$0.next = 30;
              return tuple;

            case 30:
              context$2$0.next = 23;
              break;

            case 32:
              seen.add(n);

            case 33:
              _iteratorNormalCompletion2 = true;
              context$2$0.next = 17;
              break;

            case 36:
              context$2$0.next = 42;
              break;

            case 38:
              context$2$0.prev = 38;
              context$2$0.t40 = context$2$0["catch"](15);
              _didIteratorError2 = true;
              _iteratorError2 = context$2$0.t40;

            case 42:
              context$2$0.prev = 42;
              context$2$0.prev = 43;

              if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                _iterator2["return"]();
              }

            case 45:
              context$2$0.prev = 45;

              if (!_didIteratorError2) {
                context$2$0.next = 48;
                break;
              }

              throw _iteratorError2;

            case 48:
              return context$2$0.finish(45);

            case 49:
              return context$2$0.finish(42);

            case 50:
              _iteratorNormalCompletion = true;
              context$2$0.next = 8;
              break;

            case 53:
              context$2$0.next = 59;
              break;

            case 55:
              context$2$0.prev = 55;
              context$2$0.t41 = context$2$0["catch"](6);
              _didIteratorError = true;
              _iteratorError = context$2$0.t41;

            case 59:
              context$2$0.prev = 59;
              context$2$0.prev = 60;

              if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
              }

            case 62:
              context$2$0.prev = 62;

              if (!_didIteratorError) {
                context$2$0.next = 65;
                break;
              }

              throw _iteratorError;

            case 65:
              return context$2$0.finish(62);

            case 66:
              return context$2$0.finish(59);

            case 67:
            case "end":
              return context$2$0.stop();
          }
        }, edgesIter, this, [[6, 55, 59, 67], [15, 38, 42, 50], [43,, 45, 49], [60,, 62, 66]]);
      }),
      writable: true,
      configurable: true
    },
    getEdgeData: {

      /**
       * Return the attribute dictionary associated with edge (u,v).
       *
       * ### Example
       *
       * ```
       * var G = jsnx.MultiGraph();
       * G.addPath([0,1,2,3]);
       * G.getEdgeData(0, 1);
       * // {0: {}}
       * G.getEdgeData('a', 'b', null, 0); // edge not in graph, return 0
       * // 0
       * ```
       *
       * @param {Node} u node
       * @param {Node} v node
       * @param {(string|number)=} optKey Return data only for the edge with
       *      specified key.
       * @param {T=} optDefault Value to return if the edge (u,v) is not found.
       *
       * @return {(Object|T)} The edge attribute dictionary.
       * @template T
       */

      value: function getEdgeData(u, v, optKey, optDefault) {
        var neightborsOfU = this.adj.get(u);
        if (neightborsOfU) {
          if (optKey == null) {
            return neightborsOfU.get(v) || optDefault;
          }
          return neightborsOfU.has(v) && neightborsOfU.get(v)[optKey] || optDefault;
        }
      },
      writable: true,
      configurable: true
    },
    degreeIter: {

      /**
       * Return an iterator for (node, degree).
       *
       * The node degree is the number of edges adjacent to the node.
       *
       * ### Example
       *
       * ```
       * var G = new jsnx.Graph();
       * G.addPath([0,1,2,3]);
       * Array.from(G.degreeIter(0));
       * // [[0,1]]  // node 0 with degree 1
       * Array.from(G.degreeIter([0,1]));
       * // [[0,1], [1,2]]
       *
       * @see #degree
       *
       * @param {?(Node|NodeContainer)=} optNbunch  A container of nodes
       *      The container will be iterated through once.
       * @param {?string=} optWeight  The edge attribute that holds the numerical
       *      value used as a weight.  If undefined, then each edge has weight 1.
       *      The degree is the sum of the edge weights adjacent to the node.
       *
       * @return {!Iterator} The iterator returns two-tuples of (node, degree).
       */

      value: _regeneratorRuntime.mark(function degreeIter(optNbunch, optWeight) {
        var _this = this;

        var nodesNbrs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, n, nbrs, deg, keydict, key;

        return _regeneratorRuntime.wrap(function degreeIter$(context$2$0) {
          while (1) switch (context$2$0.prev = context$2$0.next) {
            case 0:
              if (typeof optNbunch === "string") {
                optWeight = optNbunch;
                optNbunch = null;
              }
              nodesNbrs = optNbunch == null ? _this.adj : mapIterator(_this.nbunchIter(optNbunch), function (n) {
                return tuple2(n, _this.adj.get(n));
              });
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              context$2$0.prev = 5;
              _iterator = _core.$for.getIterator(nodesNbrs);

            case 7:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                context$2$0.next = 25;
                break;
              }

              _step$value = _babelHelpers.slicedToArray(_step.value, 2);
              n = _step$value[0];
              nbrs = _step$value[1];
              deg = 0;

              if (!(optWeight == null)) {
                context$2$0.next = 18;
                break;
              }

              nbrs.forEach(function (keydict) {
                return deg += _core.Object.keys(keydict).length;
              });
              context$2$0.next = 16;
              return [n, deg + +(nbrs.has(n) && _core.Object.keys(nbrs.get(n)).length)];

            case 16:
              context$2$0.next = 22;
              break;

            case 18:
              // edge weighted graph - degree is sum of nbr edge weights
              nbrs.forEach(function (keydict) {
                for (var key in keydict) {
                  deg += getDefault(keydict[key][optWeight], 1);
                }
              });

              if (nbrs.has(n)) {
                keydict = nbrs.get(n);

                for (key in keydict) {
                  deg += getDefault(keydict[key][optWeight], 1);
                }
              }

              context$2$0.next = 22;
              return [n, deg];

            case 22:
              _iteratorNormalCompletion = true;
              context$2$0.next = 7;
              break;

            case 25:
              context$2$0.next = 31;
              break;

            case 27:
              context$2$0.prev = 27;
              context$2$0.t42 = context$2$0["catch"](5);
              _didIteratorError = true;
              _iteratorError = context$2$0.t42;

            case 31:
              context$2$0.prev = 31;
              context$2$0.prev = 32;

              if (!_iteratorNormalCompletion && _iterator["return"]) {
                _iterator["return"]();
              }

            case 34:
              context$2$0.prev = 34;

              if (!_didIteratorError) {
                context$2$0.next = 37;
                break;
              }

              throw _iteratorError;

            case 37:
              return context$2$0.finish(34);

            case 38:
              return context$2$0.finish(31);

            case 39:
            case "end":
              return context$2$0.stop();
          }
        }, degreeIter, this, [[5, 27, 31, 39], [32,, 34, 38]]);
      }),
      writable: true,
      configurable: true
    },
    isMultigraph: {

      /**
       * Return true if graph is a multigraph, false otherwise.
       *
       * @return {boolean} true if graph is a multigraph, false otherwise.
       */

      value: function isMultigraph() {
        return true;
      },
      writable: true,
      configurable: true
    },
    isDirected: {

      /**
       * Return true if graph is directed, false otherwise.
       *
       * @return {boolean}  True if graph is directed, False otherwise.
       */

      value: function isDirected() {
        return false;
      },
      writable: true,
      configurable: true
    },
    toDirected: {

      /**
       * Return a directed representation of the graph.
       *
       * ### Notes
       *
       * This returns a "deepcopy" of the edge, node, and graph attributes which
       * attempts to completely copy all of the data and references.
       *
       * This is in contrast to the similar D = DiGraph(G) which returns a shallow
       * copy of the data.
       *
       * ### Example
       *
       * ```
       * var G = new jsnx.MultiGraph();
       * G.addPath([0,1]);
       * var H = G.toDirected();
       * G.edges();
       * // [[0,1], [1,0]]
       * ```
       *
       * If already directed, return a (deep) copy
       *
       * ```
       * var G = new jsnx.MultiDiGraph();
       * G.addPath([0,1]);
       * var H = G.toDirected();
       * G.edges();
       * // [[0,1]]
       * ```
       *
       * @return {!MultiDiGraph}
       *      A directed graph with the same name, same nodes, and with
       *      each edge (u,v,data) replaced by two directed edges
       *      (u,v,data) and (v,u,data).
       */

      value: function toDirected() {
        var G = new (require("./MultiDiGraph"))();
        G.addNodesFrom(this);
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _core.$for.getIterator(this.adjacencyIter()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _babelHelpers.slicedToArray(_step.value, 2);

            var u = _step$value[0];
            var nbrs = _step$value[1];
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = _core.$for.getIterator(nbrs), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _step2$value = _babelHelpers.slicedToArray(_step2.value, 2);

                var v = _step2$value[0];
                var keydict = _step2$value[1];

                for (var key in keydict) {
                  G.addEdge(u, v, key, deepcopy(keydict[key]));
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                  _iterator2["return"]();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"]) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        G.graph = deepcopy(this.graph);
        G.node = deepcopy(this.node);
        return G;
      },
      writable: true,
      configurable: true
    },
    selfloopEdges: {

      /**
       * Return a list of selfloop edges.
       *
       * ### Example
       *
       * ```
       * var G = new jsnx.MultiGraph();
       * G.addEdge(1, 1);
       * G.addEdge(1, 2);
       * G.selfloopEdges();
       * // [[1,1]]
       * G.selfloopEdges(true);
       * // [[1,1,{}]]
       * G.selfloopEdges(false, true);
       * // [[1,1,0]]
       * G.selfloopEdges(true, true);
       * // [[1,1,0,{}]]
       *
       * @see #nodesWithSelfloops
       * @see #numberOfSelfloops
       *
       *
       * @param {boolean=} optData  (default=False)
       *      Return selfloop edges as two tuples (u,v) (data=False)
       *      or three-tuples (u,v,data) (data=True)
       * @param {boolean=} optKeys  (default=False)
       *       If True, return edge keys with each edge
       *
       * @return {Array} A list of all selfloop edges
       */

      value: function selfloopEdges() {
        var optData = arguments[0] === undefined ? false : arguments[0];
        var optKeys = arguments[1] === undefined ? false : arguments[1];

        var edges = [];
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _core.$for.getIterator(this.adj), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var _step$value = _babelHelpers.slicedToArray(_step.value, 2);

            var n = _step$value[0];
            var nbrs = _step$value[1];

            if (nbrs.has(n)) {
              var keydict = nbrs.get(n);
              for (var key in keydict) {
                var edge = [n, n];
                if (optKeys) {
                  edge[2] = key;
                }
                if (optData) {
                  edge.push(keydict[key]);
                }
                edges.push(edge);
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"]) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return edges;
      },
      writable: true,
      configurable: true
    },
    numberOfEdges: {

      /**
       * Return the number of edges between two nodes.
       *
       * ### Example
       *
       * ```
       * var G = new jsnx.MultiGraph();
       * G.addPath([0,1,2,3]);
       * G.numberOfEdges();
       * // 3
       * G.numberOfEdges(0,1);
       * // 1
       * ```
       *
       * @see #size
       *
       * @param {Node=} optU node
       * @param {Node=} optV node
       *      If u and v are specified, return the number of edges between
       *      u and v. Otherwise return the total number of all edges.
       *
       * @return {number} The number of edges in the graph.
       *      If nodes u and v are specified return the number of edges between
       *      those nodes.
       */

      value: function numberOfEdges(optU, optV) {
        if (optU == null || optV == null) {
          return this.size();
        }

        var neightborsOfU = this.get(optU);
        if (neightborsOfU) {
          return neightborsOfU.has(optV) ? _core.Object.keys(neightborsOfU.get(optV)).length : 0;
        }
        return 0;
      },
      writable: true,
      configurable: true
    },
    subgraph: {

      /**
       * Return the subgraph induced on nodes in nbunch.
       *
       * The induced subgraph of the graph contains the nodes in nbunch and the
       * edges between those nodes.
       *
       * ### Notes
       *
       * The graph, edge or node attributes just point to the original graph.
       * So changes to the node or edge structure will not be reflected in
       * the original graph while changes to the attributes will.
       *
       * To create a subgraph with its own copy of the edge/node attributes use:
       * `jsnx.Graph(G.subgraph(nbunch))`
       *
       * If edge attributes are containers, a deep copy can be obtained using:
       * `G.subgraph(nbunch).copy()`.
       *
       * ### Example
       *
       * ```
       * var G = new jsnx.Graph();
       * G.addPath([0,1,2,3]);
       * var H = G.subgraph([0,1,2]);
       * H.edges();
       * // [[0,1], [1,2]]
       * ```
       *
       * @param {NodeContainer=} nbunch A container of nodes which will be
       *      iterated through once.
       * @return {MultiGraph} A subgraph of the graph with the same edge attributes.
       */

      value: function subgraph(nbunch) {
        var bunch = this.nbunchIter(nbunch);
        // create new graph and copy subgraph into it
        var H = new this.constructor();
        // copy node and attribute dictionaries
        this.node.forEach(function (d, n) {
          return H.node.set(n, d);
        });
        // namespace shortcuts for speed
        var HAdj = H.adj,
            thisAdj = this.adj;

        // add nodes and edges (undirected method)
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _core.$for.getIterator(bunch), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var n = _step.value;

            var Hnbrs = new Map();
            HAdj.set(n, Hnbrs);

            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = _core.$for.getIterator(thisAdj.get(n)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var _step2$value = _babelHelpers.slicedToArray(_step2.value, 2);

                var nbr = _step2$value[0];
                var edgedict = _step2$value[1];

                if (HAdj.has(nbr)) {
                  // add both representations of edge: n-nbr and nbr-n
                  // they share the same edgedict
                  var ed = clone(edgedict);
                  Hnbrs.set(nbr, ed);
                  HAdj.get(nbr).set(n, ed);
                }
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
                  _iterator2["return"]();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"]) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        H.graph = this.graph;
        return H;
      },
      writable: true,
      configurable: true
    }
  });

  return MultiGraph;
})(Graph);

module.exports = MultiGraph;

},{"../_internals":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/index.js","../exceptions/JSNetworkXError":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/JSNetworkXError.js","./Graph":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/Graph.js","./MultiDiGraph":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/MultiDiGraph.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js","babel-runtime/regenerator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/regenerator/index.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/functions.js":[function(require,module,exports){
"use strict";

var _core = require("babel-runtime/core-js")["default"];

var _babelHelpers = require("babel-runtime/helpers")["default"];

/**
 * Return a copy of the graph nodes in a list.
 *
 * @param {Graph} G Graph
 * @return {Array} List of nodes
 */
exports.nodes = nodes;

/**
 * Return an iterator over the graph nodes.
 *
 * @param {Graph} G Graph
 * @return {Iterator} Iterator over graph nodes
 */
exports.nodesIter = nodesIter;

/**
 * Return a list of edges adjacent to nodes in nbunch.
 *
 * Return all edges if nbunch is unspecified or nbunch=None.
 * For digraphs, edges=out_edges
 *
 * @param {Graph} G Graph
 * @param {NodeContainer=} opt_nbunch Nodes
 * @return {Array} List of edges
 */
exports.edges = edges;

/**
 * Return iterator over  edges adjacent to nodes in nbunch.
 *
 * Return all edges if nbunch is unspecified or nbunch=None.
 * For digraphs, edges=out_edges
 *
 * @param {Graph} G Graph
 * @param {NodeContainer=} opt_nbunch Nodes
 * @return {Iterator} Iterator over edges
 */
exports.edgesIter = edgesIter;

/**
 * Return degree of single node or of nbunch of nodes.
 * If nbunch is omitted, then return degrees of *all* nodes.
 *
 * @param {Graph} G Graph
 * @param {NodeContainer=} opt_nbunch Nodes
 * @param {string=} opt_weight Weight attribute name
 * @return {(number|Map)} Degree of node(s)
 */
exports.degree = degree;

/**
 * Return a list of nodes connected to node n.
 *
 * @param {Graph} G Graph
 * @param {Node} n Node
 * @return {Array} List of nodes
 */
exports.neighbors = neighbors;

/**
 * Return the number of nodes in the graph.
 *
 * @param {Graph} G Graph
 * @return {number} Number of nodes
 */
exports.numberOfNodes = numberOfNodes;

/**
 * Return the number of edges in the graph.
 *
 * @param {Graph} G Graph
 * @return {number} Number of edges
 */
exports.numberOfEdges = numberOfEdges;

/**
 * Return the density of a graph.
 * The density for undirected graphs is
 *
 * ```math
 * d = \frac{2m}{n(n-1)}
 * ```
 *
 * and for directed graphs is
 *
 * ```math
 * \frac{m}{n(n-1)}
 * ```
 *
 * where n is the number of nodes and m is the number of edges in G
 *
 * The density is 0 for an graph without edges and 1.0 for a complete graph.
 * The density of multigraphs can be higher than 1.
 *
 * @param {Graph} G Graph
 * @return {number} Density
 */
exports.density = density;

/**
 * Return a list of the frequency of each degree value.
 *
 * Note: the bins are width one, hence list.length can be large
 * (Order(number_of_edges))
 *
 *
 * @param {Graph} G Graph
 * @return {Array} A list of frequencies of degrees.
 *      The degree values are the index in the list.
 */
exports.degreeHistogram = degreeHistogram;

/**
 * Return True if graph is directed.
 *
 * @param {Graph} G Graph
 * @return {boolean}  True if graph is directed
 */
exports.isDirected = isDirected;

/**
 * Modify graph to prevent addition of nodes or edges.
 *
 * This does not prevent modification of edge data.
 * To "unfreeze" a graph you must make a copy.
 *
 * @see #is_frozen
 *
 * @param {Graph} G Graph
 * @return {Graph} A reference to the input graph
 */
exports.freeze = freeze;

/**
 * Return True if graph is frozen.
 *
 * @see #freeze
 *
 * @param {Graph} G Graph
 * @return {boolean}  True if graph is frozen.
 */
exports.isFrozen = isFrozen;

/**
 * Return the subgraph induced on nodes in nbunch.
 *
 * Note:  subgraph(G) calls G.subgraph()
 *
 * @param {Graph} G Graph
 * @param {NodeContainer} nbunch
 *      A container of nodes that will be iterated through once (thus
 *      it should be an iterator or be iterable).  Each element of the
 *      container should be a valid node type: any hashable type except
 *      None.  If nbunch is None, return all edges data in the graph.
 *      Nodes in nbunch that are not in the graph will be (quietly)
 *      ignored.
 * @return {Graph} Subgraph
 */
exports.subgraph = subgraph;

/**
 * Return a copy of the graph G with all of the edges removed.
 *
 * Notes: Graph, node, and edge data is not propagated to the new graph.
 *
 * @param {Graph} G Graph
 * @param {boolean} opt_with_nodes (default=True)
 *      Include nodes.
 *
 * @return {Graph} A copy of the graph
 */
exports.createEmptyCopy = createEmptyCopy;

/**
 * Print short summary of information for the graph G or the node n.
 *
 * @param {Graph} G Graph
 * @param {Node=} opt_n A node in the graph G
 * @return {string} Info
 */
exports.info = info;

/**
 * Set node attributes from dictionary of nodes and values
 *
 * @param {Graph} G Graph
 * @param {string} name Attribute name
 * @param {(Object|Map)} attributes Dictionary of attributes keyed by node
 */
exports.setNodeAttributes = setNodeAttributes;

/**
 * Get node attributes from graph
 *
 * @param {Graph} G Graph
 * @param {string} name Attribute name
 * @return {!Map} Dictionary of attributes keyed by node.
 */
exports.getNodeAttributes = getNodeAttributes;

/**
 * Set edge attributes from dictionary of edge tuples and values
 *
 * @param {Graph} G Graph
 * @param {string} name Attribute name
 * @param {Map} attributes
 *    Dictionary of attributes keyed by edge (tuple).
 */
exports.setEdgeAttributes = setEdgeAttributes;

/**
 * Get edge attributes from graph
 *
 * Since keys can only be strings in JavaScript, the edge is returned as
 * {@code "node1,node2"} string. You'd have to call {@code .split(',')} on
 * the keys to extract the actual node names.
 *
 * @param {Graph} G Graph
 * @param {string} name Attribute name
 * @return {!Map} Dictionary of attributes keyed by edge.
 */
exports.getEdgeAttributes = getEdgeAttributes;

var JSNetworkXError = _babelHelpers.interopRequire(require("../exceptions/JSNetworkXError"));

var _internals = require("../_internals");

var fillArray = _internals.fillArray;
var isMap = _internals.isMap;
var isPlainObject = _internals.isPlainObject;
var sprintf = _internals.sprintf;

function nodes(G) {
  return G.nodes();
}

function nodesIter(G) {
  return G.nodesIter();
}

function edges(G, optNbunch) {
  return G.edges(optNbunch);
}

function edgesIter(G, optNbunch) {
  return G.edgesIter(optNbunch);
}

function degree(G, optNbunch, optWeight) {
  return G.degree(optNbunch, optWeight);
}

function neighbors(G, n) {
  return G.neighbors(n);
}

function numberOfNodes(G) {
  return G.numberOfNodes();
}

function numberOfEdges(G) {
  return G.numberOfEdges();
}

function density(G) {
  var n = G.numberOfNodes();
  var m = G.numberOfEdges();
  var d;

  if (m === 0) {
    // includes cases n === 0 and n === 1
    d = 0;
  } else {
    if (G.isDirected()) {
      d = m / (n * (n - 1));
    } else {
      d = m * 2 / (n * (n - 1));
    }
  }

  return d;
}

function degreeHistogram(G) {
  var degseq = _core.Array.from(G.degree().values());
  var dmax = Math.max.apply(Math, degseq) + 1;
  var freq = fillArray(dmax, 0);

  degseq.forEach(function (d) {
    freq[d] += 1;
  });

  return freq;
}

function isDirected(G) {
  return G.isDirected();
}

function freeze(G) {
  function frozen() {
    throw new JSNetworkXError("Frozen graph can't be modified");
  }

  // This double assignment is necessary for the closure compiler
  G.addNode = frozen;
  G.addNodesFrom = frozen;
  G.removeNode = frozen;
  G.removeNodesFrom = frozen;
  G.addEdge = frozen;
  G.addEdgesFrom = frozen;
  G.removeEdge = frozen;
  G.removeEdgesFrom = frozen;
  G.clear = frozen;
  G.frozen = true;
  return G;
}

function isFrozen(G) {
  return !!G.frozen;
}

function subgraph(G, nbunch) {
  return G.subgraph(nbunch);
}

function createEmptyCopy(G) {
  var optWithNodes = arguments[1] === undefined ? true : arguments[1];

  var H = new G.constructor();
  if (optWithNodes) {
    H.addNodesFrom(G);
  }
  return H;
}

function info(G, optN) {
  var result = "";
  if (optN == null) {
    var template = "Name: %s\n" + "Type: %s\n" + "Number of nodes: %s\n" + "Number of edges: %s\n";
    var nnodes = G.numberOfNodes();
    result = sprintf(template, G.name, G.constructor.__name__, nnodes, G.numberOfEdges());
    if (nnodes > 0) {
      if (G.isDirected()) {
        var inDegree = 0;
        var outDegree = 0;
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = _core.$for.getIterator(G.inDegree().values()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var degree = _step.value;

            inDegree += degree;
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator["return"]) {
              _iterator["return"]();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = _core.$for.getIterator(G.outDegree().values()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            degree = _step2.value;

            outDegree += degree;
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
              _iterator2["return"]();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        result += sprintf("Average in degree: %s\nAverage out degree: %s", (inDegree / nnodes).toFixed(4), (outDegree / nnodes).toFixed(4));
      } else {
        var sum = 0;
        var _iteratorNormalCompletion3 = true;
        var _didIteratorError3 = false;
        var _iteratorError3 = undefined;

        try {
          for (var _iterator3 = _core.$for.getIterator(G.degree().values()), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
            var v = _step3.value;

            sum += v;
          }
        } catch (err) {
          _didIteratorError3 = true;
          _iteratorError3 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion3 && _iterator3["return"]) {
              _iterator3["return"]();
            }
          } finally {
            if (_didIteratorError3) {
              throw _iteratorError3;
            }
          }
        }

        result += sprintf("Average degree: %s", (sum / nnodes).toFixed(4));
      }
    }
  } else {
    if (!G.hasNode(optN)) {
      throw new JSNetworkXError(sprintf("Node %j not in graph.", optN));
    }
    result = sprintf("Node %j has the following properties:\nDegree: %s\nNeighbors: %s", optN, G.degree(optN), G.neighbors(optN).map(function (n) {
      return JSON.stringify(n);
    }).join(" "));
  }
  return result;
}

function setNodeAttributes(G, name, attributes) {
  if (isMap(attributes)) {
    attributes.forEach(function (value, node) {
      return G.node.get(node)[name] = value;
    });
  } else if (isPlainObject(attributes)) {
    for (var node in attributes) {
      node = isNaN(node) ? node : +node;
      G.node.get(node)[name] = attributes[node];
    }
  } else {
    throw new TypeError("Attributes must be a Map or a plain object");
  }
}

function getNodeAttributes(G, name) {
  var dict = new _core.Map();
  G.node.forEach(function (node, data) {
    if (data.hasOwnProperty(name)) {
      dict.set(node, data[name]);
    }
  });
  return dict;
}

function setEdgeAttributes(G, name, attributes) {
  attributes.forEach(function (edge, value) {
    G.get(edge[0]).get(edge[1])[name] = value;
  });
}

function getEdgeAttributes(G, name) {
  var dict = new _core.Map();
  G.edges(null, true).forEach(function (edged) {
    if (edged[2].hasOwnProperty(name)) {
      var value = edged[2][name];
      edged.length = 2; // cut of data
      dict.set(edged, value);
    }
  });
  return dict;
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

},{"../_internals":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/index.js","../exceptions/JSNetworkXError":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/JSNetworkXError.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/index.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var Graph = _babelHelpers.interopRequire(require("./Graph"));

var DiGraph = _babelHelpers.interopRequire(require("./DiGraph"));

var MultiGraph = _babelHelpers.interopRequire(require("./MultiGraph"));

var MultiDiGraph = _babelHelpers.interopRequire(require("./MultiDiGraph"));

var _functions = require("./functions");

var functions = _babelHelpers.interopRequire(_functions);

exports.Graph = Graph;
exports.DiGraph = DiGraph;
exports.MultiGraph = MultiGraph;
exports.MultiDiGraph = MultiDiGraph;
exports.functions = functions;

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(_functions));

Object.defineProperty(exports, "__esModule", {
  value: true
});

},{"./DiGraph":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/DiGraph.js","./Graph":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/Graph.js","./MultiDiGraph":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/MultiDiGraph.js","./MultiGraph":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/MultiGraph.js","./functions":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/functions.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/contrib/convert.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

/**
 * This module provides functions to convert JSNetworkX graphs to and from
 * non-NetworkX formats.
 */

/**
 * Return adjacency representation of graph as a map of lists.
 *
 * Completely ignores edge data for MultiGraph and MultiDiGraph.
 *
 * @param {Graph} G A graph
 * @param {NodeContainer=} opt_nodelist Use only nods specified in nodelist.
 *
 * @return {!Map}
 */
exports.toMapOfLists = toMapOfLists;

/**
 * Return a graph from a map of lists.
 * *
 * @param {!Map} map A map of lists adjacency representation.
 * @param {Graph=} opt_create_using Use specified graph for result.
 *    Otherwise a new graph is created.
 *
 * @return {!Graph}
 */
exports.fromMapOfLists = fromMapOfLists;

/**
 * Return adjacency representation of graph as a map of maps.
 *
 * @param {Graph} G A jsnx Graph
 * @param {NodeContainer=} opt_nodelist Use only nodes specified in nodelist
 * @param {Object=} opt_edge_data If provided,  the value of the map will be
 *      set to edge_data for all edges.  This is useful to make
 *      an adjacency matrix type representation with 1 as the edge data.
 *      If opt_edge_data is null or undefined, the edge data in G is used to
 *      fill the values.
 *      If G is a multigraph, the edge data is a dict for each pair (u,v).
 *
 * @return {!Map}
 */
exports.toMapOfMaps = toMapOfMaps;

/**
 * Return a graph from a map of maps.
 *
 * @param {!Map} map A map of maps adjacency representation.
 * @param {Graph=} opt_create_using Use specified graph for result.
 *      Otherwise a new graph is created.
 * @param {boolean=} opt_multigraph_input (default=False)
 *      When True, the values of the inner dict are assumed
 *      to be containers of edge data for multiple edges.
 *      Otherwise this routine assumes the edge data are singletons.
 *
 * @return {Graph}
 */
exports.fromMapOfMaps = fromMapOfMaps;

var prepCreateUsing = _babelHelpers.interopRequire(require("./prepCreateUsing"));

var _internals = require("../_internals");

var Map = _internals.Map;
var Set = _internals.Set;
var isArrayLike = _internals.isArrayLike;
var tuple2 = _internals.tuple2;

function toMapOfLists(G, optNodelist) {
  var map = new Map();

  if (optNodelist != null) {
    _core.Array.from(optNodelist).forEach(function (n) {
      return map.set(n, G.neighbors(n).filter(function (v) {
        return optNodelist.indexOf(v) > -1;
      }));
    });
  } else {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _core.$for.getIterator(G), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var n = _step.value;

        map.set(n, G.neighbors(n));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  return map;
}

function fromMapOfLists(map, optCreateUsing) {
  var G = prepCreateUsing(optCreateUsing);
  G.addNodesFrom(map.keys());

  if (G.isMultigraph() && !G.isDirected()) {
    // a map_of_lists can't show multiedges.  BUT for undirected graphs,
    // each edge shows up twice in the map_of_lists.
    // So we need to treat this case separately.
    var seen = new Set();

    map.forEach(function (nbrlist, node) {
      nbrlist.forEach(function (nbr) {
        if (!seen.has(nbr)) {
          G.addEdge(node, nbr);
        }
      });
      seen.add(node); // don't allow reverse edge to show up
    });
  } else {
    map.forEach(function (nbrlist, node) {
      nbrlist.forEach(function (nbr) {
        return G.addEdge(node, nbr);
      });
    });
  }

  return G;
}

function toMapOfMaps(G, optNodelist, optEdgeData) {
  var mapOfMaps = new Map();

  if (optNodelist != null) {
    optNodelist = _core.Array.from(optNodelist);
    optNodelist.forEach(function (u) {
      var mapOfU = mapOfMaps.set(u, new Map());
      G.get(u).forEach(function (v, data) {
        if (optNodelist.indexOf(v) > -1) {
          mapOfU.set(v, optEdgeData == null ? data : optEdgeData);
        }
      });
    });
  } else {
    // nodelist is undefined
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _core.$for.getIterator(G.adjacencyIter()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _babelHelpers.slicedToArray(_step.value, 2);

        var nbrmap = _step$value[0];
        var u = _step$value[1];

        /*jshint loopfunc:true*/
        var mapOfU = mapOfMaps.set(u, new Map());
        nbrmap.forEach(function (data, v) {
          mapOfU.set(v, optEdgeData == null ? data : optEdgeData);
        });
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }

  return mapOfMaps;
}

function fromMapOfMaps(map, optCreateUsing, optMultigraphInput) {
  var G = prepCreateUsing(optCreateUsing);
  var seen = new Set(); // don't add both directions of undirected graph
  G.addNodesFrom(map.keys());

  // is map a MultiGraph or MultiDiGraph?
  if (optMultigraphInput) {
    // make a copy  of the list of edge data (but not the edge data)
    if (G.isDirected()) {
      map.forEach(function (nbrs, u) {
        if (isArrayLike(nbrs)) {
          // throw expection of not map (object)
          throw new TypeError("Value is not a map.");
        }
        nbrs.forEach(function (datadict, v) {
          for (var key in datadict) {
            var data = datadict[key];
            if (G.isMultigraph()) {
              G.addEdge(u, v, key, data);
            } else {
              G.addEdge(u, v, data);
            }
          }
        });
      });
    } else {
      // undirected
      var isMultigraph = G.isMultigraph();
      map.forEach(function (nbrs, u) {
        if (isArrayLike(nbrs)) {
          // throw exception of not map
          throw new TypeError("Not a map");
        }
        nbrs.forEach(function (datadict, v) {
          // this works because sets convert the value to their string
          // representation
          if (!seen.has(tuple2(u, v))) {
            for (var key in datadict) {
              var data = datadict[key];
              if (isMultigraph) {
                G.addEdge(u, v, key, data);
              } else {
                G.addEdge(u, v, data);
              }
            }
            seen.add(tuple2(v, u));
          }
        });
      });
    }
  } else {
    // not a multigraph to multigraph transfer
    if (G.isMultigraph() && !G.isDirected()) {
      // map can have both representations u-v, v-u in dict.  Only add one.
      // We don't need this check for digraphs since we add both directions,
      // or for Graph() since it is done implicitly (parallel edges not allowed)
      map.forEach(function (nbrs, u) {
        if (isArrayLike(nbrs)) {
          // throw exception of not dict (object)
          throw new TypeError("Value is not a map");
        }
        nbrs.forEach(function (data, v) {
          if (!seen.has(tuple2(u, v))) {
            G.addEdge(u, v, data);
            seen.add(tuple2(v, u));
          }
        });
      });
    } else {
      map.forEach(function (nbrs, u) {
        if (isArrayLike(nbrs)) {
          // throw exception of not dict (object)
          throw new TypeError("Value is not a map");
        }
        nbrs.forEach(function (data, v) {
          G.addEdge(u, v, data);
        });
      });
    }
  }

  return G;
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

/*jshint ignore:start*/

/*jshint ignore:end*/

},{"../_internals":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/index.js","./prepCreateUsing":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/contrib/prepCreateUsing.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/contrib/observer.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

/**
 * Makes a graph observable, i.e. external code can bind event handlers to
 * be notified about changes in the graph (adding or removing nodes or edges).
 *
 * @param {Graph} G The graph to make observable
 * @return {Graph} The same graph passed as argument (not a new graph)
 */
exports.observe = observe;

/**
 * Removes the properties added to a graph for event handling.
 *
 * @param {Graph} G
 * @return {Graph} The graph passed to the function
 */
exports.unobserve = unobserve;

/**
 * Tests whether the graph is observable.
 *
 * @param {Graph} G
 * @return {boolean}
 */
exports.isObservable = isObservable;

/**
 * A simple event object to any data can be added. It provides four methods:
 *
 * - stopPropagation to indicated that subsequent event handlers should not be
 *   executed.
 * - isPropgationStopped to test the status (internal only)
 * - preventDefault to prevent the default action
 * - isDefaultPrevented to test the status
 */

var Event = (function () {

  /**
   * @param {string} type
   * @param {*} target
   */

  function Event(type, target) {
    _babelHelpers.classCallCheck(this, Event);

    this.type = type;
    this.target = target;
    this._defaultAction = true;
    this._propagate = true;
  }

  _babelHelpers.prototypeProperties(Event, null, {
    stopPropagation: {

      /**
       * When called, should prevent the execution of subsequent handlers.
       */

      value: function stopPropagation() {
        this._propagate = false;
      },
      writable: true,
      configurable: true
    },
    isPropgationStopped: {

      /**
       * Tests whether the propagation should be stopped.
       * @return {boolean}
       */

      value: function isPropgationStopped() {
        return !this._propagate;
      },
      writable: true,
      configurable: true
    },
    preventDefault: {

      /**
       * When called, should prevent the default action.
       */

      value: function preventDefault() {
        this._defaultAction = false;
      },
      writable: true,
      configurable: true
    },
    isDefaultPrevented: {

      /**
       * Tests whether the default action should be stopped.
       *
       * @return {boolean}
       */

      value: function isDefaultPrevented() {
        return !this._defaultAction;
      },
      writable: true,
      configurable: true
    }
  });

  return Event;
})();

function observe(G) {
  if (typeof G.on === "function") {
    // graph is already observable, do nothing
    return G;
  }

  var eventHandlers = {
    addNodes: [],
    removeNodes: [],
    addEdges: [],
    removeEdges: [],
    clear: []
  };
  var proto = G.constructor.prototype;

  function triggerHandlers(event, G, funcName, args) {
    var handlers = eventHandlers[event.type];
    if (!handlers) {
      return;
    }
    // run before handlers
    for (var i = 0, l = handlers.length; i < l && !event.isPropgationStopped(); i += 3) {
      if (handlers[i + 2]) {
        handlers[i].call(handlers[i + 1] || G, event);
      }
    }

    if (!event.isDefaultPrevented()) {
      if (args) {
        proto[funcName].apply(G, args);
      } else {
        proto[funcName].call(G);
      }
      if (!event.isPropgationStopped()) {
        // run after handlers
        for (i = 0, l = handlers.length; i < l && !event.isPropgationStopped(); i += 3) {
          if (!handlers[i + 2]) {
            handlers[i].call(handlers[i + 1] || G, event);
          }
        }
      }
    }
  }

  G.on = function (event, handler, thisObj, before) {
    if (!eventHandlers[event]) {
      throw new Error("Event \"" + event + "\" is not supported.");
    }
    eventHandlers[event].push(handler, thisObj, !!before);
  };

  G.off = function (event, handler, thisObj) {
    var handlers;
    var startIndex;
    var i;
    if (arguments.length === 1) {
      // Remove all event handlers
      eventHandlers[event].length = 0;
    } else if (arguments.length === 2) {
      // Remove particular handler or object only
      handlers = eventHandlers[event];
      startIndex = handlers.length - 2;
      if (typeof handler !== "function") {
        startIndex += 1;
      }
      for (i = startIndex; i > 0; i -= 2) {
        if (handlers[i] === handler) {
          handlers.splice(i, 3);
        }
      }
    } else {
      // Remove particular handler-object combination
      handlers = eventHandlers[event];
      startIndex = handlers.length - 2;
      for (i = startIndex; i > 0; i -= 2) {
        if (handlers[i] === handler && handlers[i + 1] === thisObj) {
          handlers.splice(i, 2);
        }
      }
    }
  };

  G.addNode = function (n) {
    var newNodes = G.hasNode(n) ? [] : [n];
    var event = new Event("addNodes", this);
    event.nodes = [n];
    event.newNodes = newNodes;

    triggerHandlers(event, this, "addNode", arguments);
  };

  G.addNodesFrom = function (nbunch) {
    var nodes = [];
    var newNodes = [];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _core.$for.getIterator(nbunch), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var bunch = _step.value;

        var v = Array.isArray(bunch) ? bunch[0] : bunch;
        nodes.push(Array.isArray(bunch) ? bunch.slice() : bunch);
        if (!G.hasNode(v)) {
          newNodes.push(v);
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var event = new Event("addNodes", this);
    event.nodes = nodes.filter(function (v) {
      return Array.isArray(v) ? v[0] : v;
    });
    event.newNodes = newNodes;

    var args = _core.Array.from(arguments);
    args[0] = nodes;

    triggerHandlers(event, this, "addNodesFrom", args);
  };

  G.addEdge = function (u, v) {
    var edges = [[u, v]];
    var newEdges = this.hasEdge(u, v) ? [] : edges;

    var event = new Event("addEdges", this);
    event.edges = edges;
    event.newEdges = newEdges;

    triggerHandlers(event, this, "addEdge", arguments);
  };

  G.addEdgesFrom = function (ebunch) {
    var edges = [];
    var newEdges = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _core.$for.getIterator(ebunch), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var bunch = _step.value;

        edges.push(bunch.slice());
        if (!this.hasEdge(bunch[0], bunch[1])) {
          newEdges.push(bunch.slice(0, 2));
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var event = new Event("addEdges", this);
    event.edges = edges;
    event.newEdges = newEdges;

    var args = _core.Array.from(arguments);
    args[0] = edges;

    triggerHandlers(event, this, "addEdgesFrom", args);
  };

  G.removeNode = function (n) {
    var event = new Event("removeNodes", this);
    event.nodes = [n];

    triggerHandlers(event, this, "removeNode", arguments);
  };

  G.removeNodesFrom = function (nbunch) {
    var nodes = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _core.$for.getIterator(nbunch), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var bunch = _step.value;

        nodes.push(Array.isArray(bunch) ? bunch.slice() : bunch);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var event = new Event("removeNodes", this);
    event.nodes = nodes;

    var args = _core.Array.from(arguments);
    args[0] = nodes;

    triggerHandlers(event, this, "removeNodesFrom", args);
  };

  G.removeEdge = function (u, v) {
    var event = new Event("removeEdges", this);
    event.edges = [[u, v]];

    triggerHandlers(event, this, "removeEdge", arguments);
  };

  G.removeEdgesFrom = function (ebunch) {
    var edges = [];
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _core.$for.getIterator(ebunch), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var bunch = _step.value;

        edges.push(bunch.slice());
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var event = new Event("removeEdges");
    event.edges = edges;

    var args = _core.Array.from(arguments);
    args[0] = edges;

    triggerHandlers(event, this, "removeEdgesFrom", args);
  };

  G.clear = function () {
    triggerHandlers(new Event("clear", this), this, "clear");
  };

  return G;
}

function unobserve(G) {
  var proto = G.constructor.prototype;

  if (typeof G.on !== "function") {
    // nothing to do
    return G;
  }

  G.addNode = proto.addNode;
  G.addNodesFrome = proto.addNodesFrom;
  G.addEdge = proto.addEdge;
  G.addEdgesFrome = proto.addEdgesFrom;
  G.removeNode = proto.removeNode;
  G.removeEdge = proto.removeEdge;
  G.removeNodesFrom = proto.removeNodesFrom;
  G.removeEdgesFrom = proto.removeEdgesFrom;
  G.clear = proto.clear;

  delete G.on;
  delete G.off;

  return G;
}

function isObservable(G) {
  return typeof G.on === "function" && typeof G.off === "function";
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

},{"babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/contrib/prepCreateUsing.js":[function(require,module,exports){
"use strict";

/**
 * Return a graph object ready to be populated.
 *
 * If create_using is null or undefined return the default (just jsnx.Graph())
 * If create_using.clear() works, assume it returns a graph object.
 * Otherwise raise an exception because create_using is not a jsnx graph.
 *
 * @param {Graph=} opt_create_using
 * @return {Graph}
 */
exports.prepCreateUsing = prepCreateUsing;

function prepCreateUsing(optCreateUsing) {
  var G;
  // can't use import statement because of circular dependency
  var Graph = require("../classes/Graph");

  if (optCreateUsing == null) {
    G = new Graph();
  } else {
    G = optCreateUsing;

    try {
      G.clear();
    } catch (e) {
      throw new TypeError("Input graph is not a jsnx graph type");
    }
  }
  return G;
}

module.exports = prepCreateUsing;
Object.defineProperty(exports, "__esModule", {
  value: true
});

},{"../classes/Graph":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/Graph.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/convert.js":[function(require,module,exports){
"use strict";

var _core = require("babel-runtime/core-js")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

/**
 * This module provides functions to convert
 * NetworkX graphs to and from other formats.
 *
 * The preferred way of converting data to a NetworkX graph
 * is through the graph constuctor.  The constructor calls
 * the to_networkx_graph() function which attempts to guess the
 * input type and convert it automatically.
 */

/*jshint ignore:start*/
var Map = require("./_internals/Map");
var Set = require("./_internals/Set");
/*jshint ignore:end*/

var convertMap = require("./contrib/convert");
var hasOwn = Object.prototype.hasOwnProperty;
var prepCreateUsing = require("./contrib/prepCreateUsing");
var _mapValues = require("lodash/object/mapValues");

var _require = require("./_internals");

var clone = _require.clone;
var forEach = _require.forEach;
var isMap = _require.isMap;
var isArrayLike = _require.isArrayLike;
var isPlainObject = _require.isPlainObject;

/**
 * Make a jsnx graph from a known data structure.
 *
 * @param {?} data An object to be converted
 *     Current known types are:
 *        any jsnx graph
 *        dict-of-dicts
 *        dict-of-lists
 *        list of edges
 *
 * @param {Graph=} opt_create_using NetworkX graph
 *     Use specified graph for result.  Otherwise a new graph is created.
 *
 * @param {boolean=} opt_multigraph_input (default false)
 *     If true and  data is a dict_of_dicts,
 *     try to create a multigraph assuming dict_of_dict_of_lists.
 *     If data and create_using are both multigraphs then create
 *     a multigraph from a multigraph.
 *
 * @return {Graph}
 * @export
 */
function toNetworkxGraph(data, optCreateUsing, optMultigraphInput) {
  var result = null;

  // jsnx graph
  if (hasOwn.call(data, "adj")) {
    try {
      result = convertMap.fromMapOfMaps(data.adj, optCreateUsing, data.isMultigraph());
      if (hasOwn.call(data, "graph") && typeof data.graph === "object") {
        result.graph = clone(data.graph);
      }
      if (hasOwn.call(data, "node") && isMap(data.node)) {
        result.node = new Map();
        data.node.forEach(function (element, k) {
          return result.node.set(k, clone(element));
        });
      }
      return result;
    } catch (ex) {
      throw ex;
    }
  }

  // map of maps / lists
  if (isMap(data)) {
    try {
      return convertMap.fromMapOfMaps(data, optCreateUsing, optMultigraphInput);
    } catch (e) {
      try {
        return convertMap.fromMapOfLists(data, optCreateUsing);
      } catch (ex) {
        throw new Error("Map data structure cannot be converted to a graph.");
      }
    }
  }

  // dict of dicts / lists
  if (isPlainObject(data)) {
    try {
      return fromDictOfDicts(data, optCreateUsing, optMultigraphInput);
    } catch (e) {
      try {
        return fromDictOfLists(data, optCreateUsing);
      } catch (ex) {
        throw new Error("Object data structure cannot be converted to a graph.");
      }
    }
  }

  // list of edges
  if (isArrayLike(data)) {
    try {
      return fromEdgelist(data, optCreateUsing);
    } catch (e) {
      throw new Error("Input is not a valid edge list");
    }
  }

  return result;
}

/**
 * Return a new undirected representation of the graph G.
 *
 * @param {Graph} G Graph to convert
 *
 * @return {!Graph}
 * @export
 */
function convertToUndirected(G) {
  return G.toUndirected();
}

/**
 * Return a new directed representation of the graph G.
 *
 * @param {Graph} G Graph to convert
 * @return {!Graph}
 * @export
 */
function convertToDirected(G) {
  return G.toDirected();
}

/**
 * Return adjacency representation of graph as a dictionary of lists.
 *
 * Completely ignores edge data for MultiGraph and MultiDiGraph.
 *
 * @param {Graph} G A jsnx graph
 * @param {NodeContainer=} opt_nodelist Use only nodes specified in nodelist
 *
 * @return {!Object.<Array>}
 * @export
 */
function toDictOfLists(G, optNodelist) {
  var contains = function contains(n) {
    return optNodelist.indexOf(n) > -1;
  };
  var d = Object.create(null);

  if (optNodelist == null) {
    optNodelist = G;
    contains = function (n) {
      return optNodelist.hasNode(n);
    };
  } else {
    optNodelist = _core.Array.from(optNodelist);
  }

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _core.$for.getIterator(optNodelist), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var n = _step.value;

      d[n] = G.neighbors(n).filter(contains);
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return d;
}

/**
 * Return a graph from a dictionary of lists.
 * *
 * @param {!Object.<Array>} d A dictionary of lists adjacency representation.
 * @param {Graph=} opt_create_using Use specified graph for result.
 *    Otherwise a new graph is created.
 *
 * @return {!Graph}
 * @export
 */
function fromDictOfLists(d, optCreateUsing) {
  var G = prepCreateUsing(optCreateUsing);

  // Convert numeric property names to numbers
  G.addNodesFrom(_regeneratorRuntime.mark(function callee$1$0() {
    var n;
    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.t0 = _regeneratorRuntime.keys(d);

        case 1:
          if ((context$2$0.t1 = context$2$0.t0()).done) {
            context$2$0.next = 7;
            break;
          }

          n = context$2$0.t1.value;
          context$2$0.next = 5;
          return isNaN(n) ? n : +n;

        case 5:
          context$2$0.next = 1;
          break;

        case 7:
        case "end":
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  })());

  var node;
  var nbrlist;
  if (G.isMultigraph() && !G.isDirected()) {
    // a dict_of_lists can't show multiedges.  BUT for undirected graphs,
    // each edge shows up twice in the dict_of_lists.
    // So we need to treat this case separately.
    var seen = new Set();

    for (node in d) {
      nbrlist = d[node];
      // treat numeric keys like numbers
      node = isNaN(node) ? node : +node;
      /*jshint loopfunc:true*/
      forEach(nbrlist, function (nbr) {
        if (!seen.has(nbr)) {
          G.addEdge(node, nbr);
        }
      });
      seen.add(node); // don't allow reverse edge to show up
    }
  } else {
    var edgeList = [];
    for (node in d) {
      nbrlist = d[node];
      // treat numeric keys like numbers
      node = isNaN(node) ? node : +node;
      forEach(nbrlist, function (nbr) {
        edgeList.push([node, nbr]);
      });
    }

    G.addEdgesFrom(edgeList);
  }

  return G;
}

/**
 * Return adjacency representation of graph as a dictionary of dictionaries.
 *
 * @param {Graph} G A jsnx Graph
 * @param {NodeContainer=} opt_nodelist Use only nodes specified in nodelist
 * @param {Object=} opt_edge_data If provided,  the value of the dictionary will
 *      be set to edge_data for all edges.  This is useful to make
 *      an adjacency matrix type representation with 1 as the edge data.
 *      If edgedata is null or undefined, the edgedata in G is used to fill
 *      the values.
 *      If G is a multigraph, the edgedata is a dict for each pair (u,v).
 *
 * @return {!Object.<Object>}
 * @export
 */
function toDictOfDicts(G, optNodelist, optEdgeData) {
  var dod = {};

  if (optNodelist != null) {
    optNodelist = _core.Array.from(optNodelist);
    if (optEdgeData != null) {
      optNodelist.forEach(function (u) {
        dod[u] = {};
        G.get(u).forEach(function (data, v) {
          if (optNodelist.indexOf(v) > -1) {
            dod[u][v] = optEdgeData;
          }
        });
      });
    } else {
      // nodelist and edge_data are defined
      optNodelist.forEach(function (u) {
        dod[u] = {};
        G.get(u).forEach(function (data, v) {
          if (optNodelist.indexOf(v) > -1) {
            dod[u][v] = data;
          }
        });
      });
    }
  } else {
    // nodelist is undefined
    if (optEdgeData != null) {
      // dn = [nbrdict, u]
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = _core.$for.getIterator(G.adjacencyIter()), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var dn = _step.value;

          /*jshint loopfunc:true*/
          dod[dn[1]] = _mapValues(dn[0], function () {
            return optEdgeData;
          });
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }
    } else {
      // edge_data is defined
      // dn = [nbrdict, u]
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = _core.$for.getIterator(G.adjacencyIter()), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var dn = _step2.value;

          dod[dn[1]] = clone(dn[0]);
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
            _iterator2["return"]();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }

  return dod;
}

/**
 * Return a graph from a dictionary of dictionaries.
 *
 * @param {!Object.<!Object>} d A dictionary of dictionaries adjacency
 *      representation.
 * @param {Graph=} opt_create_using Use specified graph for result.
 *      Otherwise a new graph is created.
 * @param {boolean=} opt_multigraph_input (default=False)
 *      When True, the values of the inner dict are assumed
 *      to be containers of edge data for multiple edges.
 *      Otherwise this routine assumes the edge data are singletons.
 *
 * @return {Graph}
 * @export
 */
function fromDictOfDicts(d, optCreateUsing, optMultigraphInput) {
  var G = prepCreateUsing(optCreateUsing);
  var seen = new Set();

  // Convert numeric property names to numbers
  G.addNodesFrom(_regeneratorRuntime.mark(function callee$1$0() {
    var n;
    return _regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          context$2$0.t2 = _regeneratorRuntime.keys(d);

        case 1:
          if ((context$2$0.t3 = context$2$0.t2()).done) {
            context$2$0.next = 7;
            break;
          }

          n = context$2$0.t3.value;
          context$2$0.next = 5;
          return isNaN(n) ? n : +n;

        case 5:
          context$2$0.next = 1;
          break;

        case 7:
        case "end":
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  })());

  // is dict a MultiGraph or MultiDiGraph?
  if (optMultigraphInput) {
    // make a copy  of the list of edge data (but not the edge data)
    if (G.isDirected()) {
      for (var u in d) {
        var nbrs = d[u];
        if (isArrayLike(nbrs)) {
          // throw exception of not dict (object)
          throw new TypeError("Inner object seems to be an array");
        }
        // treat numeric keys like numbers
        u = isNaN(u) ? u : +u;
        for (var v in nbrs) {
          var datadict = nbrs[v];
          // treat numeric keys like numbers
          v = isNaN(v) ? v : +v;
          for (var key in datadict) {
            if (G.isMultigraph()) {
              G.addEdge(u, v, key, datadict[key]);
            } else {
              G.addEdge(u, v, datadict[key]);
            }
          }
        }
      }
    } else {
      // undirected
      // don't add both directions of undirected graph
      for (var u in d) {
        var nbrs = d[u];
        if (isArrayLike(nbrs)) {
          // throw exception of not dict (object)
          throw new TypeError("Inner object seems to be an array");
        }
        // treat numeric keys like numbers
        u = isNaN(u) ? u : +u;
        for (var v in nbrs) {
          var datadict = nbrs[v];
          // treat numeric keys like numbers
          v = isNaN(v) ? v : +v;
          if (!seen.has([u, v])) {
            for (var key in datadict) {
              if (G.isMultigraph()) {
                G.addEdge(u, v, key, datadict[key]);
              } else {
                G.addEdge(u, v, datadict[key]);
              }
            }
            seen.add([v, u]);
          }
        }
      }
    }
  } else {
    // not a multigraph to multigraph transfer
    if (G.isMultigraph() && !G.isDirected()) {
      // d can have both representations u-v, v-u in dict.  Only add one.
      // We don't need this check for digraphs since we add both directions,
      // or for Graph() since it is done implicitly (parallel edges not allowed)
      for (var u in d) {
        var nbrs = d[u];
        if (isArrayLike(nbrs)) {
          // throw exception of not dict (object)
          throw new TypeError("Inner object seems to be an array");
        }
        // treat numeric keys like numbers
        u = isNaN(u) ? u : +u;
        for (var v in nbrs) {
          var data = nbrs[v];
          v = isNaN(v) ? v : +v;
          if (!seen.has([u, v])) {
            G.addEdge(u, v, data);
            seen.add([v, u]);
          }
        }
      }
    } else {
      for (var u in d) {
        var nbrs = d[u];
        if (isArrayLike(nbrs)) {
          // throw exception of not dict (object)
          throw new TypeError("Inner object seems to be an array");
        }
        // treat numeric keys like numbers
        u = isNaN(u) ? u : +u;
        for (var v in nbrs) {
          var data = nbrs[v];
          // treat numeric keys like numbers
          v = isNaN(v) ? v : +v;
          G.addEdge(u, v, data);
        }
      }
    }
  }

  return G;
}

/**
 * Return a list of edges in the graph.
 *
 * @param {Graph} G A jsnx graph
 * @param {NodeContainer=} opt_nodelist Use only nodes specified in nodelist
 *
 * @return {!Array}
 * @export
 */
function toEdgelist(G, optNodelist) {
  if (optNodelist != null) {
    return G.edges(optNodelist, true);
  } else {
    return G.edges(null, true);
  }
}

/**
 * Return a graph from a list of edges.
 *
 * @param {Array.<Array>} edgelist Edge tuples
 * @param {Graph=} opt_create_using Use specified graph for result.
 *      Otherwise a new graph is created.
 *
 * @return {!Graph}
 * @export
 */
function fromEdgelist(edgelist, optCreateUsing) {
  var G = prepCreateUsing(optCreateUsing);
  G.addEdgesFrom(edgelist);
  return G;
}

// NOT IMPLEMENTED

// to_numpy_matrix
// from_numpy_matrix
// to_numpy_recarray
// to_scipy_sparse_matrix
// from_scipy_sparse_matrix
// setup_module

module.exports = {
  toNetworkxGraph: toNetworkxGraph,
  convertToUndirected: convertToUndirected,
  convertToDirected: convertToDirected,
  toDictOfLists: toDictOfLists,
  fromDictOfLists: fromDictOfLists,
  toDictOfDicts: toDictOfDicts,
  fromDictOfDicts: fromDictOfDicts,
  toEdgelist: toEdgelist,
  fromEdgelist: fromEdgelist
};
/*jshint latedef:false*/

},{"./_internals":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/index.js","./_internals/Map":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/Map.js","./_internals/Set":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/Set.js","./contrib/convert":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/contrib/convert.js","./contrib/prepCreateUsing":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/contrib/prepCreateUsing.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/regenerator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/regenerator/index.js","lodash/object/mapValues":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/object/mapValues.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/drawing/index.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _svg = require("./svg");

var svg = _babelHelpers.interopRequire(_svg);

exports.svg = svg;

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(_svg));

Object.defineProperty(exports, "__esModule", {
  value: true
});

},{"./svg":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/drawing/svg.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/drawing/svg.js":[function(require,module,exports){
(function (global){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

/**
 * Draw graph G with D3.
 *
 *
 * @param {jsnx.classes.Graph} G The graph to draw
 * @param {?Object=} config A dictionary of configuration parameters
 *      for D3. The following options are available:
 *
 *      - element: DOMElement or selector string. REQUIRED
 *                 The element to draw the graph into.
 *      - d3: A reference to D3. Can be used if d3 is not global.
 *      - width: number The width of the drawing area in pixel.
 *               Default is the width of element.
 *      - height: number The height of the drawing are in pixel.
 *                Default is the height of element.
 *      - layout_attr: Object A dictionary of layout attributes.
 *              The default layout is force, so the the attributes
 *              can be size, linkDistance, linkStrength, friction,
 *              charge, theta and gravity. nodes and links are set
 *              through the graph
 *      - nodelist: Array An array of nodes to be drawn. Nodes not in the
 *          Graph are ignored
 *      - node_shape: string Name of a SVG element. Default is circle
 *      - node_attr: Object A dictionary of attributes to set on each
 *          node SVG element. See D3 documentation for more information.
 *      - node_style: Object A dictionary of CSS styles to set on each
 *          node SVG element. See D3 documentation for more information.
 *      - edge_attr: Object
 *      - edge_style: Object
 *      - with_labels: boolean (default=false) Set to true to draw labels
 *          on the nodes. Each label is a SVG text node.
 *      - labels: function or Dictionary ore string to return or retrieve the
 *          label for each node.
 *      - label_attr: Object
 *      - label_style: Object
 *      - with_edge_labels: boolean
 *      - edge_labels: function or Dictionary or string
 *      - edge_label_attr: Object
 *      - edge_label_style: Object
 *      - weighted: boolean
 *      - weights: string or function
 *      - edge_offset: number or function
 *      - pan_zoom: object with properties `enabled` (bool) and `scale` (bool)
 *
 *  @param {?boolean=} optBind Set to true to automatically update
 *      the output upon graph manipulation. Only works for adding nodes or edges
 *      for now.
 * @suppress {checkTypes}
 */
exports.draw = draw;

/**
 * @fileoverview
 *
 * D3(http://mbostock.github.com/d3/) is a powerful library to associate data
 * with elements and provides various helpful methods to visualize the data,
 * such as color generators, layouts and DOM manipulation methods.
 *
 * Note: D3 must be included before running these functions
 */

var _internals = require("../_internals");

var Map = _internals.Map;
var Set = _internals.Set;
var deepmerge = _internals.deepmerge;
var getDefault = _internals.getDefault;
var isArrayLike = _internals.isArrayLike;

var nullFunction = function nullFunction() {};

function angleFor(x1, y1, x2, y2) {
  return Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;
}

/**
 * Safely converts an iterator to an array. Because we often use tuples when
 * using generators internally, we have to be careful when converting the
 * generator to an array. Every element has to be converted explicitly.
 */
function toArray(iterator) {
  // shortcut. If the value is actually an array, we can just return it
  if (Array.isArray(iterator)) {
    return iterator;
  }
  var result = [];
  var i = 0;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _core.$for.getIterator(iterator), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var value = _step.value;

      result[i++] = Array.isArray(value) ? _core.Array.from(value) : value;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return result;
}

/**
 * Holds a reference to the last container element for convenience.
 *
 * @type {?(string|Element)}
 * @private
 */
var LAST_ELEMENT = null;

/**
 * Holds a reference to the last configuration for convenience.
 *
 * @type {Object}
 * @private
 */
var LAST_CONFIGURATION = null;

/**
 * A list of graph mutator methods.
 *
 * @type {Array.<string>}
 * @const
 * @private
 */
var MUTATOR_METHODS = ["addNode", "addNodesFrom", "addEdge", "addEdgesFrom", "removeNode", "removeNodesFrom", "removeEdge", "removeEdgesFrom", "clear"];

/**
 * The name of the attribute the D3 data is assigned to in the node and
 * edge data.
 *
 * @type {string}
 */
var D3_DATA_NAME = "__d3datum__";

/**
 * Keep a reference to d3.
 */
var d3 = global.d3;
function draw(G, config, optBind) {
  if (typeof config === "boolean") {
    optBind = config;
    config = null;
  }

  config = config || LAST_CONFIGURATION || {};
  LAST_CONFIGURATION = config;
  if (config.d3) {
    d3 = config.d3;
  }
  config = deepmerge({}, DEFAULT_CONFIG, config);

  if (!d3) {
    throw new Error("D3 requried for draw()");
  }

  if (config.element == null && LAST_ELEMENT == null) {
    throw new Error("Output element required for draw()");
  }

  // initialize
  LAST_ELEMENT = config.element || LAST_ELEMENT;

  // remove any possible previous graph
  d3.select(LAST_ELEMENT).select("svg.jsnx").remove();

  // set up base elements
  var container = d3.select(LAST_ELEMENT);
  var d3nodes = [];
  var d3links = [];
  var canvas = container.append("svg").classed("jsnx", true).attr("pointer-events", "all");
  var parent_container = canvas.append("g");
  var edge_selection = parent_container.append("g").classed("edges", true).selectAll("g.edge");
  var node_selection = parent_container.append("g").classed("nodes", true).selectAll("g.node");
  var force = d3.layout.force();
  var width = config.width || parseInt(container.style("width"), 10);
  var height = config.height || parseInt(container.style("height"), 10);
  var layout_attr = config.layoutAttr;
  var nodelist = config.nodelist || null;
  var label_func;
  var edge_label_func;
  var weight_func;
  var directed = G.isDirected();
  var weighted = config.weighted;
  var selections = {
    node_selection: node_selection,
    edge_selection: edge_selection
  };

  // determine node label function
  if (config.withLabels) {
    var labels = config.labels;
    switch (typeof labels) {
      case "object":
        label_func = function (d) {
          return getDefault(labels[d.node], "");
        };
        break;
      case "function":
        label_func = labels;
        break;
      case "string":
        label_func = function (d) {
          return d.data[labels];
        };
        break;
      default:
        label_func = function (d) {
          return d.node;
        };
    }
  }
  config.labels = label_func;

  // if the graph should be weighted, we need a weight function
  // these will be used as edge labels if no others are provided
  if (weighted) {
    var weights = config.weights;
    switch (typeof weigths) {
      case "object":
        weight_func = function (d) {
          return getDefault(weights[d.node], 1);
        };
        break;
      case "function":
        weight_func = weights;
        break;
      case "string":
        weight_func = function (d) {
          return getDefault(d.data[weights], 1);
        };
        break;
      default:
        weight_func = function (d) {
          return 1;
        };
    }
  }

  // determine edge labels
  if (config.withEdgeLabels) {
    var elabels = config.edgeLabels;

    if (weighted && elabels == null) {
      edge_label_func = weight_func;
    } else {
      switch (typeof elabels) {
        case "object":
          edge_label_func = function (d) {
            return getDefault(labels[d.node], "");
          };
          break;
        case "function":
          edge_label_func = elabels;
          break;
        case "string":
          edge_label_func = function (d) {
            return d.data[elabels];
          };
          break;
        default:
          edge_label_func = function (d) {
            return d.edge;
          };
      }
    }
    config.edgeLabels = edge_label_func;
  }

  // scale the width of the edge according to the weight
  if (weighted && config.weightedStroke) {
    var max_weight = 1;
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _core.$for.getIterator(G.edgesIter(null, true)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _step.value;
        var u = _step$value.u;
        var v = _step$value.v;
        var data = _step$value.data;

        var weight = weight_func({ data: data });
        if (weight > max_weight) {
          max_weight = weight;
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var scale = d3.scale.linear().range([2, config.edgeStyle["stroke-width"]]).domain([0, max_weight]);

    config.edgeStyle["stroke-width"] = function (d) {
      return scale(weight_func.call(this, d));
    };
  }

  // remove any possible previous graph
  canvas.select("svg.jsnx").remove();

  // set size and hide the wild movement of nodes at the beginning
  canvas.attr("width", width + "px").attr("height", height + "px").style("opacity", 0.000001).transition().duration(1000).style("opacity", 1);

  // initialize layout
  // don't let the user set these:
  var exclude = {
    size: true,
    nodes: true,
    links: true,
    start: true
  };

  for (var attr in layout_attr) {
    if (exclude[attr] !== true) {
      force[attr](layout_attr[attr]);
    }
  }
  force.nodes(d3nodes).links(d3links).size([width, height]);

  // set up zoom and pan behaviour
  var zoom = 1;
  var inv_scale = 1; // used to scale nodes and text accordingly

  if (config.panZoom.enabled) {
    (function () {
      var scaled = config.panZoom.scale;
      var zooming = false;
      var zoom_start_scale = 1;
      var zoom_start = zoom;

      canvas.call(d3.behavior.zoom().on("zoom", function () {
        var shiftKey = d3.event.sourceEvent.shiftKey,
            zoomed = scaled && shiftKey || !(scaled || shiftKey);

        // if the graph is zoomed, we have to keep track of the
        // ration it was zoomed by
        if (zoomed && !zooming) {
          zoom_start_scale = d3.event.scale;
          zoom_start = zoom;
          zooming = true;
        } else if (!zoomed && zooming) {
          zooming = false;
        }

        zoom = zoomed ? zoom_start * (d3.event.scale / zoom_start_scale) : zoom;
        inv_scale = !zoomed ? zoom / d3.event.scale : inv_scale;

        var tr = d3.event.translate;
        parent_container.attr("transform", "translate(" + tr[0] + "," + tr[1] + ")scale(" + d3.event.scale + ")");
        redraw();
      }));
    })();
  }

  var update_edge_position = nullFunction;
  var offset = config.edgeOffset;
  var node_radius = config.nodeAttr.r;
  var node_strw = config.nodeStyle["stroke-width"];

  if (config.nodeShape === "circle") {
    if (typeof node_radius !== "function") {
      node_radius = function () {
        return config.nodeAttr.r;
      };
    }
    if (typeof node_strw !== "function") {
      node_strw = function () {
        return config.nodeStyle["stroke-width"];
      };
    }
    offset = function (d) {
      return [node_radius(d.source) + node_strw(d.source), node_radius(d.target) + node_strw(d.target)];
    };
  } else {
    if (Array.isArray(offset)) {
      offset = function () {
        return config.edgeOffset;
      };
    } else if (typeof offset === "number") {
      offset = function () {
        return [config.edgeOffset, config.edgeOffset];
      };
    }
  }
  var strw = config.edgeStyle["stroke-width"];
  if (typeof strw !== "function") {
    strw = function () {
      return config.edgeStyle["stroke-width"];
    };
  }
  var label_offset = config.edgeLabelOffset;

  if (directed) {
    // don't rotate labels and draw curvy lines
    update_edge_position = function () {
      selections.edge_selection.each(function (d) {
        if (d.source !== d.target) {
          var $this = d3.select(this);
          var x1 = d.source.x;
          var y1 = d.source.y;
          var x2 = d.target.x;
          var y2 = d.target.y;
          var angle = angleFor(x1, y1, x2, y2);
          var dx = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          var offset_ = offset(d);

          offset_ = [offset_[0] * inv_scale, offset_[1] * inv_scale];

          $this.attr("transform", ["translate(", x1, ",", y1, ")", "rotate(", angle, ")"].join(""));

          var shift = strw(d) * inv_scale;
          var arrow_start_point = dx - offset_[1] - 2 * shift;
          var half_shift = shift / 2;
          $this.select(".line").attr("d", ["M", offset_[0], 0, "L", offset_[0], -half_shift, "L", arrow_start_point, -half_shift, "L", arrow_start_point, -shift, "L", dx - offset_[1], 0, "z"].join(" "));

          var scale = 1 / inv_scale;
          $this.select("text").attr("x", label_offset.x * scale + offset_[0] + (dx * scale - offset_[0] - offset_[1]) / 2).attr("y", -strw(d) / 2 + -label_offset.y * scale).attr("transform", "scale(" + inv_scale + ")");
        }
      });
    };
  } else {
    update_edge_position = function () {
      selections.edge_selection.each(function (d) {
        if (d.source !== d.target) {
          var $this = d3.select(this);
          var x1 = d.source.x;
          var y1 = d.source.y;
          var x2 = d.target.x;
          var y2 = d.target.y;
          var angle = angleFor(x1, y1, x2, y2);
          var dx = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
          var center = dx / 2;
          var offset_ = offset(d);

          offset_ = [offset_[0] * inv_scale, offset_[1] * inv_scale];

          var scale = 1 / inv_scale;
          var shift = strw(d) * inv_scale;
          var flip = angle > 90 && angle < 279;
          $this.attr("transform", ["translate(", x1, ",", y1, ")", "rotate(", angle, ")"].join(""));
          $this.select(".line").attr("d", ["M", offset_[0], shift / 4, "L", offset_[0], -shift / 4, "L", dx - offset_[1], -shift / 4, "L", dx - offset_[1], shift / 4, "z"].join(" "));
          if (config.withEdgeLabels) {
            $this.select("text").attr("x", (flip ? 1 : -1) * label_offset.x * scale + offset_[0] + (dx * scale - offset_[0] - offset_[1]) / 2).attr("y", -strw(d) / 4 + -label_offset.y * scale).attr("transform", "scale(" + inv_scale + ")" + (flip ? "rotate(180," + center * (1 / inv_scale) + ",0)" : ""));
          }
        }
      });
    };
  }

  var redraw = function redraw() {
    // update node position
    selections.node_selection.attr("transform", function (d) {
      return ["translate(", d.x, ",", d.y, ")", "scale(", inv_scale, ")"].join("");
    });

    update_edge_position();
  };

  force.on("tick", redraw);

  var nodes = G.nodesIter();
  var edges = G.edgesIter();

  if (nodelist) {
    // limit drawn nodes, disable binding
    optBind = false;
    nodes = G.nbunch_iter(nodelist);
    edges = G.edges_iter(nodelist);
  }

  // update d3 node and link data
  selections.node_selection = addNodes(G, nodes, force, node_selection, config);

  selections.edge_selection = addEdges(G, edges, force, edge_selection, edge_label_func);

  // apply attributes and styles
  updateNodeAttr(selections.node_selection, config);

  updateEdgeAttr(selections.edge_selection, config, null, directed);

  if (optBind) {
    bind(G, force, config, selections);
  } else {
    if (isBound(G)) {
      unbind(G);
    } else {
      clean(G);
    }
  }

  force.start();

  return force;
}

/**
* Helper function to create new node objects for the force layout and
* create the necessary SVG elements.
*
* @param {Graph} G
* @param {Iterable} nodes The nodes to include from the Graph
*      default are all nodes
* @param {d3.layout.force} force The layout
* @param {d3.selection} selection D3 DOM node selection of nodes
* @param {Object} Drawing configuration
*
* @return {!d3.selection} The new selection of SVG elements.
*/
function addNodes(G, nodes, force, selection, config) {
  // Get current data
  var layoutNodes = force.nodes();
  // add new data
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _core.$for.getIterator(nodes), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var node = _step.value;

      var data = G.node.get(node);
      var nobj = { node: node, data: data, G: G };
      layoutNodes.push(nobj);
      data[D3_DATA_NAME] = nobj;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  // update data join
  selection = selection.data(layoutNodes, nodeKeyFunction);
  // create new elements
  var drag = force.drag().on("dragstart", function (d) {
    // Prevent pan if node is dragged
    d3.event.sourceEvent.stopPropagation();
    if (config.stickyDrag) {
      d.fixed = true;
      d3.select(this).classed("fixed", true);
    }
  });
  var nsel = selection.enter().append("g").classed("node", true).call(drag);

  nsel.append(config.nodeShape).classed("node-shape", true);

  if (config.labels) {
    nsel.append("text").text(config.labels);
  }

  return selection;
}

/**
* Helper function to create new edge objects for the force layout.
*
* @param {Graph} G
* @param {Iterable} edges The nodes to include from the Graph
*      default are all nodes
* @param {d3.layout.force} force
* @param {d3.selection} selection D3 DOM node selection of nodes
* @param {Function=} opt_label_func Function to extract text for labels
*
* @return {!d3.selection}
*/
function addEdges(G, edges, force, selection, optLabelFunc) {
  // Get current data
  var layoutLinks = force.links();
  // add new data
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _core.$for.getIterator(edges), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _babelHelpers.slicedToArray(_step.value, 3);

      var u = _step$value[0];
      var v = _step$value[1];
      var data = _step$value[2];

      data = data || G.getEdgeData(u, v);
      var eobj = {
        edge: [u, v],
        source: G.node.get(u)[D3_DATA_NAME],
        target: G.node.get(v)[D3_DATA_NAME],
        data: data,
        G: G
      };
      layoutLinks.push(eobj);
      data[D3_DATA_NAME] = eobj;
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  // update data join
  selection = selection.data(layoutLinks, edgeKeyFunction);
  // create new elements
  var esel = selection.enter().append("g").classed("edge", true);
  esel.append("path").classed("line", true);

  if (optLabelFunc) {
    esel.append("text").text(optLabelFunc);
  }
  return selection;
}

/**
* Updates attributes of nodes.
*
* @param {d3.selection} selection
* @param {Object} config
* @param {Iterable=} opt_nodes a container of nodes. If set,
*      only update these nodes.
*/
function updateNodeAttr(selection, config, optNodes) {
  if (optNodes != null) {
    var newNodes = new Set();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _core.$for.getIterator(optNodes), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var node = _step.value;

        newNodes.add(isArrayLike(node) ? node[0] : node);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    selection = selection.filter(function (d) {
      return newNodes.has(d.node);
    });
  }
  selection.selectAll(".node-shape").attr(config.nodeAttr).style(config.nodeStyle);

  if (config.withLabels) {
    selection.selectAll("text").attr(config.labelAttr).style(config.labelStyle);
  }
}

/**
* Updates attributes of edges.
*
* @param {d3.selection} selection
* @param {Object} config
* @param {?=} optEdges If set, only updates the styles of the provided
*      edges
* @param {boolean=} optDirected
*/
function updateEdgeAttr(selection, config, optEdges, optDirected) {
  if (optEdges != null) {
    var newEdges = new Map();
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _core.$for.getIterator(optEdges), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _babelHelpers.slicedToArray(_step.value, 2);

        var u = _step$value[0];
        var v = _step$value[1];

        newEdges.set(u, v);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    selection = selection.filter(function (_ref) {
      var edge = _ref.edge;
      return newEdges.get(edge[0]) === edge[1] || optDirected || newEdges.get(edge[1]) === edge[0];
    });
  }

  selection.selectAll(".line").attr(config.edgeAttr).style(config.edgeStyle).style("stroke-width", 0);

  if (config.withEdgeLabels) {
    selection.selectAll("text").attr(config.edgeLabelAttr).style(config.edgeLabelStyle);
  }
}

/**
* Key function to extract the join value for the SVG nodes and the data.
*
* @param {Object} d The current datum
* @return {Node}
*/
function nodeKeyFunction(d) {
  return d.node;
}

/**
* Key function to extract the join value for the SVG nodes and the data.
*
* @param {Object} d The current datum
* @return {Array}
*/
function edgeKeyFunction(d) {
  return d.edge;
}

/**
* Helper function to remove node objects for the force layout.
*
* @param {Graph} G
* @param {Iterable} nodes to remove from the graph
* @param {d3.layout.force} force The force the nodes are bound to
* @param {d3.selection} selection Selection of node elements
*
* @return {d3.selection} Updated selection
*/
function removeNodes(G, nodes, force, selection) {
  // get current data set
  var data = force.nodes();

  // remove items from data
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _core.$for.getIterator(G.nbunchIter(nodes)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var node = _step.value;

      var index = data.indexOf(G.node.get(node)[D3_DATA_NAME]);
      if (index > -1) {
        data.splice(index, 1);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  // rebind data
  selection = selection.data(data, nodeKeyFunction);
  // remove SVG elements
  selection.exit().remove();
  return selection;
}

/**
* Helper function to remove edge objects for the force layout.
*
* @param {jsnx.classes.Graph} G
* @param {?} edges Edges to remove
* @param {d3.layout.force} force The force the edges are bound to
* @param {d3.selection} selection Selection of edge elements
*
* @return {!d3.selection} Updated selection
*/
function removeEdges(G, edges, force, selection) {
  // get current data set
  var data = force.links();
  // remove items from data
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _core.$for.getIterator(edges), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _babelHelpers.slicedToArray(_step.value, 2);

      var u = _step$value[0];
      var v = _step$value[1];

      var index = data.indexOf(G.getEdgeData(u, v, {})[D3_DATA_NAME]);
      if (index > -1) {
        data.splice(index, 1);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  // rebind data
  selection = selection.data(data, edgeKeyFunction);
  // remove SVG elements
  selection.exit().remove();
  return selection;
}

/**
* Binds the output to the graph. This overrides mutator methods. To "free"
* the graph, you can call jsnx.unbind (which is public)
*
* @param {Graph} G A Graph
* @param {d3.layout.force} force Force layout
* @param {Object} config The configuration for the output
* @param {{node_selection:d3.selection, edge_selection:d3.selection }} selections
*   Various D3 selections
*/
function bind(G, force, config, selections) {
  unbind(G, false);

  var proto = G.constructor.prototype;
  var edge_label_func = config.edgeLabels;
  var directed = G.isDirected();

  G.addNode = function (n, optAttr) {
    var new_node = !this.hasNode(n);
    proto.addNode.call(this, n, optAttr);

    if (new_node) {
      selections.node_selection = addNodes(this, [n], force, selections.node_selection, config);
    }

    // update node attributes
    updateNodeAttr(selections.node_selection, config, [n]);

    force.start();
  };

  G.addNodesFrom = function (nbunch, optAttr) {
    var _this = this;

    nbunch = toArray(nbunch);
    var new_nodes = nbunch.filter(function (node) {
      return !_this.hasNode(isArrayLike(node) ? node[0] : node);
    });

    proto.addNodesFrom.call(this, nbunch, optAttr);

    if (new_nodes.length > 0) {
      // add new nodes and update
      selections.node_selection = addNodes(this, new_nodes, force, selections.node_selection, config);
    }

    updateNodeAttr(selections.node_selection, config, nbunch);
    force.start();
  };

  G.addEdge = function (u, v, optAttr) {
    var _this = this;

    var new_edge = !this.hasEdge(u, v);
    var edges = [[u, v]];
    var new_nodes = new_edge ? (u === v ? [u] : edges[0]).filter(function (node) {
      return !_this.hasNode(node);
    }) : [];
    proto.addEdge.call(G, u, v, optAttr);

    if (new_nodes.length > 0) {
      selections.node_selection = addNodes(this, new_nodes, force, selections.node_selection, config);

      updateNodeAttr(selections.node_selection, config, new_nodes);
    }

    if (new_edge) {
      selections.edge_selection = addEdges(this, edges, force, selections.edge_selection, edge_label_func);
    }

    updateEdgeAttr(selections.edge_selection, config, edges, directed);
    force.start();
  };

  G.addEdgesFrom = function (ebunch, optAttr) {
    var new_edges = [];
    var new_nodes = [];
    var seen_edges = new Map();
    var seen_nodes = new Set();
    var directed = this.isDirected();

    ebunch = toArray(ebunch);

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = _core.$for.getIterator(ebunch), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = _babelHelpers.slicedToArray(_step.value, 2);

        var u = _step$value[0];
        var v = _step$value[1];

        if (!this.hasEdge(u, v) && seen_edges.get(u) !== v && (directed || seen_edges.get(v) === u)) {
          new_edges.push([u, v]);
          seen_edges.set(u, v);
          if (!this.hasNode(u) && !seen_nodes.has(u)) {
            new_nodes.push(u);
            seen_nodes.add(u);
          }
          if (!this.hasNode(v) && !seen_nodes.has(v)) {
            new_nodes.push(v);
            seen_nodes.add(v);
          }
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"]) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    proto.addEdgesFrom.call(G, ebunch, optAttr);

    if (new_nodes.length > 0) {
      selections.node_selection = addNodes(this, new_nodes, force, selections.node_selection, config);

      updateNodeAttr(selections.node_selection, config, new_nodes);
    }

    if (new_edges.length > 0) {
      selections.edge_selection = addEdges(this, new_edges, force, selections.edge_selection, edge_label_func);
    }

    updateEdgeAttr(selections.edge_selection, config, new_edges, directed);
    force.start();
  };

  G.removeNode = function (n) {
    if (this.hasNode(n)) {
      selections.node_selection = removeNodes(this, [n], force, selections.node_selection);
      var edges = this.edgesIter([n]);

      if (this.isDirected()) {
        edges = _regeneratorRuntime.mark(function callee$2$0(G, edges) {
          return _regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
            while (1) switch (context$3$0.prev = context$3$0.next) {
              case 0:
                return context$3$0.delegateYield(edges, "t84", 1);

              case 1:
                return context$3$0.delegateYield(G.inEdgesIter([n]), "t85", 2);

              case 2:
              case "end":
                return context$3$0.stop();
            }
          }, callee$2$0, this);
        })(this, edges);
      }

      selections.edge_selection = removeEdges(this, edges, force, selections.edge_selection);

      force.resume();
    }
    proto.removeNode.call(this, n);
  };

  G.removeNodesFrom = function (nbunch) {
    nbunch = toArray(nbunch);
    selections.node_selection = removeNodes(this, nbunch, force, selections.node_selection);

    var edges = this.edgesIter(nbunch);
    if (this.isDirected()) {
      edges = _regeneratorRuntime.mark(function callee$2$0(G, edges) {
        return _regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
          while (1) switch (context$3$0.prev = context$3$0.next) {
            case 0:
              return context$3$0.delegateYield(edges, "t86", 1);

            case 1:
              return context$3$0.delegateYield(G.inEdgesIter(nbunch), "t87", 2);

            case 2:
            case "end":
              return context$3$0.stop();
          }
        }, callee$2$0, this);
      })(this, edges);
    }

    selections.edge_selection = removeEdges(this, edges, force, selections.edge_selection);

    force.resume();
    proto.removeNodesFrom.call(this, nbunch);
  };

  G.removeEdge = function (u, v) {
    selections.edge_selection = removeEdges(this, [[u, v]], force, selections.edge_selection);

    force.resume();
    proto.removeEdge.call(this, u, v);
  };

  G.removeEdgesFrom = function (ebunch) {
    ebunch = toArray(ebunch);
    selections.edge_selection = removeEdges(this, ebunch, force, selections.edge_selection);

    force.resume();
    proto.removeEdgesFrom.call(G, ebunch);
  };

  G.clear = function () {
    selections.node_selection = selections.node_selection.data([], nodeKeyFunction);
    selections.node_selection.exit().remove();
    selections.edge_selection = selections.edge_selection.data([], edgeKeyFunction);
    selections.edge_selection.exit().remove();
    force.nodes([]).links([]).resume();
    proto.clear.call(this);
  };

  /**
   * @type boolean
   */
  G.bound = true;
}

/**
* Returns True if the graph is bound to an output.
*
* @param {Graph} G A Graph
* @return {boolean}
*/
function isBound(G) {
  return G.bound;
}

/**
* Resets mutator methods to the originals
*
* @param {} G graph
* @param {boolean=} opt_clean (default=True)
*    If true, all D3 data is removed from the graph
*/
function unbind(G) {
  var optClean = arguments[1] === undefined ? true : arguments[1];

  if (isBound(G)) {
    var proto = G.constructor.prototype;
    MUTATOR_METHODS.forEach(function (m) {
      return G[m] = proto[m];
    });
    delete G.bound;
    if (optClean) {
      clean(G);
    }
  }
}

/**
* Removes any D3 data from the Graph.
*
* @param {Graph} G A Graph
*/
function clean(G) {
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _core.$for.getIterator(G.nodesIter(true)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var _step$value = _babelHelpers.slicedToArray(_step.value, 2);

      var _ = _step$value[0];
      var data = _step$value[1];

      delete data[D3_DATA_NAME];
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = _core.$for.getIterator(G.edgesIter(null, true)), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = _babelHelpers.slicedToArray(_step2.value, 3);

      var u = _step2$value[0];
      var v = _step2$value[1];
      var data = _step2$value[2];

      delete data[D3_DATA_NAME];
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"]) {
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
* Default D3 configuration.
*
* @type Object
* @private
*/
var DEFAULT_CONFIG = {
  layoutAttr: {
    charge: -120,
    linkDistance: 60
  },
  nodeShape: "circle",
  nodeAttr: {
    r: 10 // radius of 10
  },
  nodeStyle: {
    "stroke-width": 2,
    stroke: "#333",
    fill: "#999",
    cursor: "pointer"
  },
  edgeAttr: {},
  edgeStyle: {
    fill: "#000",
    "stroke-width": 3
  },
  labelAttr: {},
  labelStyle: {
    "text-anchor": "middle",
    "dominant-baseline": "central",
    cursor: "pointer",
    "-webkit-user-select": "none",
    fill: "#000"
  },
  edgeLabelAttr: {},
  edgeLabelStyle: {
    "font-size": "0.8em",
    "text-anchor": "middle",
    "-webkit-user-select": "none"
  },
  edgeLabelOffset: {
    x: 0,
    y: 0.5
  },
  withLabels: false,
  withEdgeLabels: false,
  edgeOffset: 10,
  weighted: false,
  weights: "weight",
  weighted_stroke: true,
  panZoom: {
    enabled: true,
    scale: true
  }
};
Object.defineProperty(exports, "__esModule", {
  value: true
});

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../_internals":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/index.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js","babel-runtime/regenerator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/regenerator/index.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/JSNetworkXAlgorithmError.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

var JSNetworkXException = _babelHelpers.interopRequire(require("./JSNetworkXException"));

/**
 * Exception for unexpected termination of algorithms.
 * @constructor
 * @extends {JSNetworkXException}
 */

var JSNetworkXAlgorithmError = (function (JSNetworkXException) {
  function JSNetworkXAlgorithmError(message) {
    _babelHelpers.classCallCheck(this, JSNetworkXAlgorithmError);

    _babelHelpers.get(_core.Object.getPrototypeOf(JSNetworkXAlgorithmError.prototype), "constructor", this).call(this, message);
    this.name = "JSNetworkXAlgorithmError";
  }

  _babelHelpers.inherits(JSNetworkXAlgorithmError, JSNetworkXException);

  return JSNetworkXAlgorithmError;
})(JSNetworkXException);

module.exports = JSNetworkXAlgorithmError;

},{"./JSNetworkXException":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/JSNetworkXException.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/JSNetworkXError.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

var JSNetworkXException = _babelHelpers.interopRequire(require("./JSNetworkXException"));

var JSNetworkXError = (function (JSNetworkXException) {
  function JSNetworkXError(message) {
    _babelHelpers.classCallCheck(this, JSNetworkXError);

    _babelHelpers.get(_core.Object.getPrototypeOf(JSNetworkXError.prototype), "constructor", this).call(this, message);
    this.name = "JSNetworkXError";
  }

  _babelHelpers.inherits(JSNetworkXError, JSNetworkXException);

  return JSNetworkXError;
})(JSNetworkXException);

module.exports = JSNetworkXError;

},{"./JSNetworkXException":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/JSNetworkXException.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/JSNetworkXException.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var JSNetworkXException = (function (Error) {
  function JSNetworkXException(message) {
    _babelHelpers.classCallCheck(this, JSNetworkXException);

    this.name = "JSNetworkXException";
    this.message = message;
  }

  _babelHelpers.inherits(JSNetworkXException, Error);

  return JSNetworkXException;
})(Error);

module.exports = JSNetworkXException;

},{"babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/JSNetworkXNoPath.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

var JSNetworkXUnfeasible = _babelHelpers.interopRequire(require("./JSNetworkXUnfeasible"));

/**
 * Exception for algorithms that should return a path when running
 * on graphs where such a path does not exist.
 */

var JSNetworkXNoPath = (function (JSNetworkXUnfeasible) {
  function JSNetworkXNoPath(message) {
    _babelHelpers.classCallCheck(this, JSNetworkXNoPath);

    _babelHelpers.get(_core.Object.getPrototypeOf(JSNetworkXNoPath.prototype), "constructor", this).call(this, message);
    this.name = "JSNetworkXNoPath";
  }

  _babelHelpers.inherits(JSNetworkXNoPath, JSNetworkXUnfeasible);

  return JSNetworkXNoPath;
})(JSNetworkXUnfeasible);

module.exports = JSNetworkXNoPath;

},{"./JSNetworkXUnfeasible":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/JSNetworkXUnfeasible.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/JSNetworkXUnfeasible.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

var JSNetworkXAlgorithmError = _babelHelpers.interopRequire(require("./JSNetworkXAlgorithmError"));

/**
 * Exception raised by algorithms trying to solve a problem
 * instance that has no feasible solution.
 * @constructor
 * @extends {JSNetworkXAlgorithmError}
 */

var JSNetworkXUnfeasible = (function (JSNetworkXAlgorithmError) {
  function JSNetworkXUnfeasible(message) {
    _babelHelpers.classCallCheck(this, JSNetworkXUnfeasible);

    _babelHelpers.get(_core.Object.getPrototypeOf(JSNetworkXUnfeasible.prototype), "constructor", this).call(this, message);
    this.name = "JSNetworkXUnfeasible";
  }

  _babelHelpers.inherits(JSNetworkXUnfeasible, JSNetworkXAlgorithmError);

  return JSNetworkXUnfeasible;
})(JSNetworkXAlgorithmError);

module.exports = JSNetworkXUnfeasible;

},{"./JSNetworkXAlgorithmError":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/JSNetworkXAlgorithmError.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/KeyError.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var KeyError = (function (Error) {
  function KeyError(message) {
    _babelHelpers.classCallCheck(this, KeyError);

    this.name = "KeyError";
    this.message = message;
  }

  _babelHelpers.inherits(KeyError, Error);

  return KeyError;
})(Error);

module.exports = KeyError;

},{"babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/index.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var KeyError = _babelHelpers.interopRequire(require("./KeyError"));

var JSNetworkXAlgorithmError = _babelHelpers.interopRequire(require("./JSNetworkXAlgorithmError"));

var JSNetworkXError = _babelHelpers.interopRequire(require("./JSNetworkXError"));

var JSNetworkXException = _babelHelpers.interopRequire(require("./JSNetworkXException"));

var JSNetworkXNoPath = _babelHelpers.interopRequire(require("./JSNetworkXNoPath"));

var JSNetworkXUnfeasible = _babelHelpers.interopRequire(require("./JSNetworkXUnfeasible"));

exports.KeyError = KeyError;
exports.JSNetworkXAlgorithmError = JSNetworkXAlgorithmError;
exports.JSNetworkXError = JSNetworkXError;
exports.JSNetworkXException = JSNetworkXException;
exports.JSNetworkXNoPath = JSNetworkXNoPath;
exports.JSNetworkXUnfeasible = JSNetworkXUnfeasible;
Object.defineProperty(exports, "__esModule", {
  value: true
});

},{"./JSNetworkXAlgorithmError":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/JSNetworkXAlgorithmError.js","./JSNetworkXError":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/JSNetworkXError.js","./JSNetworkXException":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/JSNetworkXException.js","./JSNetworkXNoPath":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/JSNetworkXNoPath.js","./JSNetworkXUnfeasible":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/JSNetworkXUnfeasible.js","./KeyError":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/KeyError.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/generators/classic.js":[function(require,module,exports){
"use strict";

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

var _babelHelpers = require("babel-runtime/helpers")["default"];

var treeEdges = _regeneratorRuntime.mark(

/**
 * @param {number} n nodes
 * @param {number} r breadth
 * @return {Iterator}
 */
function treeEdges(n, r) {
  var nodes, parents, source, i, target;
  return _regeneratorRuntime.wrap(function treeEdges$(context$1$0) {
    while (1) switch (context$1$0.prev = context$1$0.next) {
      case 0:
        nodes = genRange(n);

        if (!(n === 0)) {
          context$1$0.next = 3;
          break;
        }

        return context$1$0.abrupt("return");

      case 3:
        parents = [next(nodes)];

      case 4:
        if (!(parents.length > 0)) {
          context$1$0.next = 20;
          break;
        }

        source = parents.shift();
        i = 0;

      case 7:
        if (!(i < r)) {
          context$1$0.next = 18;
          break;
        }

        target = nodes.next();

        if (!target.done) {
          context$1$0.next = 11;
          break;
        }

        return context$1$0.abrupt("return");

      case 11:
        target = target.value;
        parents.push(target);
        context$1$0.next = 15;
        return tuple2(source, target);

      case 15:
        i++;
        context$1$0.next = 7;
        break;

      case 18:
        context$1$0.next = 4;
        break;

      case 20:
      case "end":
        return context$1$0.stop();
    }
  }, treeEdges, this);
});

/**
 * Creates a full r-ary tree of n vertices.
 * Sometimes called a k-ary, n-ary, or m-ary tree.  "... all non-leaf
 * vertices have exactly r children and all levels are full except
 * for some rightmost position of the bottom level (if a leaf at the
 * bottom level is missing, then so are all of the leaves to its
 * right."
 *
 * @param {number} r branching factor of the tree
 * @param {number} n number of nodes in the tree
 * @param {Graph=} optCreateUsing
 *   Use specified type to construct graph
 * @return {Graph} An r-ary tree with n nodes.
 */
exports.fullRaryTree = fullRaryTree;

/**
 * Return the perfectly balanced r-tree of height h.
 *
 * This is the rooted tree where all leaves are at distance h from
 * the root. The root has degree r and all other internal nodes have
 * degree r+1.
 *
 * Node labels are the integers 0 (the root) up to  numberOfNodes - 1.
 *
 * Also refered to as a complete r-ary tree.
 *
 * @param {number} r  Branching factor of the tree
 * @param {number} h Height of the tree
 * @param {Graph} optCreateUsing
 *    Use specified type to construct graph
 * @return {Graph}
 */
exports.balancedTree = balancedTree;

//TODO: barbell_graph

/**
 * Return the complete graph `$K_n$ with n nodes.
 *
 * Node labels are the integers 0 to n-1.
 * @param {number} n The number of nodes to add to the graph
 * @param {Graph=} optCreateUsing Graph instance to empty and add nodes to.
 * @return {Graph}
 */
exports.completeGraph = completeGraph;

//TODO: complete_bipartite_graph
//TODO: circular_ladder_graph

/**
 * Return the cycle graph C_n over n nodes.
 *
 * C_n is the n-path with two end-nodes connected.
 *
 * Node labels are the integers 0 to n-1
 * If create_using is a DiGraph, the direction is in increasing order.
 *
 * @param {number} n The number of nodes to add to the graph
 * @param {Graph=} optCreateUsing Graph instance to empty and add nodes to.
 * @return {Graph}
 */
exports.cycleGraph = cycleGraph;

//TODO: dorogovtsev_goltsev_mendes_graph

/**
 * Return the empty graph with n nodes and zero edges.
 *
 * Node labels are the integers 0 to n-1
 *
 * ### Example
 *
 * ```
 * var G = jsnx.emptyGraph(10)
 * G.numberOfNodes()
 * // 10
 * G.numberOfEdges()
 * // 0
 * ```
 *
 * The variable create_using should point to a "graph"-like object that
 * will be cleaned (nodes and edges will be removed) and refitted as
 * an empty "graph" with n nodes with integer labels. This capability
 * is useful for specifying the class-nature of the resulting empty
 * "graph" (i.e. Graph, DiGraph, MyWeirdGraphClass, etc.).
 *
 * The variable create_using has two main uses:
 * Firstly, the variable create_using can be used to create an
 * empty digraph, network,etc.  For example,
 *
 * ```
 * var n = 10
 * var G = jsnx.emptyGraph(n, jsnx.DiGraph())
 * ```
 *
 * will create an empty digraph on n nodes.
 *
 * Secondly, one can pass an existing graph (digraph, pseudograph,
 * etc.) via create_using. For example, if G is an existing graph
 * (resp. digraph, pseudograph, etc.), then empty_graph(n,G)
 * will empty G (i.e. delete all nodes and edges using G.clear() in
 * base) and then add n nodes and zero edges, and return the modified
 * graph (resp. digraph, pseudograph, etc.).
 *
 * @see createEmptyCopy
 *
 * @param{?number=} optN The number of nodes to add to the graph
 * @param{?Graph=} optCreateUsing Graph instance to empty and
 *     add nodes to.
 * @return {Graph}
 */
exports.emptyGraph = emptyGraph;

/**
 * Return the 2d grid graph of mxn nodes,
 * each connected to its nearest neighbors.
 * Optional argument periodic=True will connect
 * boundary nodes via periodic boundary conditions.
 *
 * @param {number} rows Number of rows
 * @param {number} columns Number of columns
 * @param {boolean=} optPeriodic
 * @param {Graph=} optCreateUsing
 * @return {Graph}
 */
exports.grid2dGraph = grid2dGraph;

//TODO: grid_graph
//TODO: hypercube_graph
//TODO: ladder_graph
//TODO: lollipop_graph

/**
 * Return the Null graph with no nodes or edges.
 *
 * See `emptyGraph` for the use of `optCreateUsing`.
 *
 * @param {Graph=} optCreateUsing Graph instance to empty and add nodes to.
 * @return {Graph}
 */
exports.nullGraph = nullGraph;

/**
 * Return the Null graph with no nodes or edges.
 *
 * See `emptyGraph` for the use of `optCreateUsing`.
 *
 * @param {number} n The number of nodes to add to the graph
 * @param {Graph=} optCreateUsing Graph instance to empty and
 *      add nodes to.
 * @return {Graph}
 */
exports.pathGraph = pathGraph;

//TODO: star_graph

/**
 * Return the Trivial graph with one node (with integer label 0) and no edges.
 *
 * @param{Graph=} optCreateUsing Graph instance to empty and
 *      add nodes to.
 * @return {Graph}
 */
exports.trivialGraph = trivialGraph;

var Graph = _babelHelpers.interopRequire(require("../classes/Graph"));

var _internals = require("../_internals");

var genCombinations = _internals.genCombinations;
var genPermutations = _internals.genPermutations;
var genRange = _internals.genRange;
var isGraph = _internals.isGraph;
var mapIterator = _internals.mapIterator;
var next = _internals.next;
var range = _internals.range;
var tuple2 = _internals.tuple2;

function fullRaryTree(r, n, optCreateUsing) {
  var G = emptyGraph(n, optCreateUsing);
  G.addEdgesFrom(treeEdges(n, r));
  return G;
}

function balancedTree(r, h, optCreateUsing) {
  var n = r === 1 ? 2 : Math.floor((1 - Math.pow(r, h + 1)) / (1 - r));
  var G = emptyGraph(n, optCreateUsing);
  G.addEdgesFrom(treeEdges(n, r));
  return G;
}

function completeGraph(n, optCreateUsing) {
  var G = emptyGraph(n, optCreateUsing);
  G.name = "complete_graph(" + n + ")";
  if (n > 1) {
    G.addEdgesFrom(G.isDirected() ? genPermutations(range(n), 2) : genCombinations(range(n), 2));
  }
  return G;
}

function cycleGraph(n, optCreateUsing) {
  var G = pathGraph(n, optCreateUsing);
  G.name = "cycle_graph(" + n + ")";
  if (n > 1) {
    G.addEdge(n - 1, 0);
  }
  return G;
}

function emptyGraph(optN, optCreateUsing) {
  if (isGraph(optN)) {
    optCreateUsing = optN;
    optN = null;
  }
  if (optN == null) {
    optN = 0;
  }

  var G;

  if (optCreateUsing == null) {
    // default empty graph is a simple graph
    G = new Graph();
  } else {
    G = optCreateUsing;
    G.clear();
  }

  G.addNodesFrom(genRange(optN));
  G.name = "emptyGraph(" + optN + ")";
  return G;
}

function grid2dGraph(rows, columns, optPeriodic, optCreateUsing) {
  var G = emptyGraph(0, optCreateUsing);
  G.name = "grid2dGraph";
  var i;
  var j;
  for (i = 0; i < rows; i++) {
    for (j = 0; j < columns; j++) {
      G.addNode([i, j]);
    }
  }
  for (i = 1; i < rows; i++) {
    for (j = 0; j < columns; j++) {
      G.addEdge([i, j], [i - 1, j]);
    }
  }
  for (i = 0; i < rows; i++) {
    for (j = 1; j < columns; j++) {
      G.addEdge([i, j], [i, j - 1]);
    }
  }
  if (G.isDirected()) {
    for (i = 0; i < rows - 1; i++) {
      for (j = 0; j < columns; j++) {
        G.addEdge([i, j], [i + 1, j]);
      }
    }
    for (i = 0; i < rows; i++) {
      for (j = 0; j < columns - 1; j++) {
        G.addEdge([i, j], [i, j + 1]);
      }
    }
  }

  if (optPeriodic) {
    if (columns > 2) {
      for (i = 0; i < rows; i++) {
        G.addEdge([i, 0], [i, columns - 1]);
      }
      if (G.isDirected()) {
        for (i = 0; i < rows; i++) {
          G.addEdge([i, columns - 1], [i, 0]);
        }
      }
    }
    if (rows > 2) {
      for (j = 0; j < columns; j++) {
        G.addEdge([0, j], [rows - 1, j]);
      }
      if (G.isDirected()) {
        for (j = 0; j < columns; j++) {
          G.addEdge([rows - 1, j], [0, j]);
        }
      }
    }
    G.name = "periodicGrid2dGraph(" + rows + "," + columns + ")";
  }
  return G;
}

function nullGraph(optCreateUsing) {
  var G = emptyGraph(0, optCreateUsing);
  G.name = "nullGraph()";
  return G;
}

function pathGraph(n, optCreateUsing) {
  var G = emptyGraph(n, optCreateUsing);
  G.name = "pathGraph(" + n + ")";
  G.addEdgesFrom(mapIterator(genRange(n - 1), function (v) {
    return tuple2(v, v + 1);
  }));
  return G;
}

function trivialGraph(optCreateUsing) {
  var G = emptyGraph(1, optCreateUsing);
  G.name = "nullGraph()";
  return G;
}

//TODO: wheel_graph

Object.defineProperty(exports, "__esModule", {
  value: true
});

// helper function for trees
// yields edges in rooted tree at 0 with n nodes and branching ratio r

/*jshint unused:false*/

},{"../_internals":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/index.js","../classes/Graph":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/Graph.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js","babel-runtime/regenerator":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/regenerator/index.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/generators/degreeSequence.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _core = require("babel-runtime/core-js")["default"];

exports.havelHakimiGraph = havelHakimiGraph;
exports.genHavelHakimiGraph = genHavelHakimiGraph;

var delegate = _babelHelpers.interopRequire(require("../_internals/delegate"));

"use strict";

var JSNetworkXError = _babelHelpers.interopRequire(require("../exceptions/JSNetworkXError"));

var isValidDegreeSequence = require("../algorithms/graphical").isValidDegreeSequence;

var emptyGraph = require("./classic").emptyGraph;

var sprintf = _babelHelpers.interopRequire(require("../_internals/sprintf"));

function havelHakimiGraph(degreeSequence, optCreateUsing) {
  degreeSequence = _core.Array.from(degreeSequence);
  if (!isValidDegreeSequence(degreeSequence)) {
    throw new JSNetworkXError("Invalid degree sequence");
  }
  if (optCreateUsing != null) {
    if (optCreateUsing.isDirected()) {
      throw new JSNetworkXError("Directed Graph not supported");
    }
  }
  var numberOfNodes = degreeSequence.length;
  var G = emptyGraph(numberOfNodes, optCreateUsing);
  var numDegrees = new Array(numberOfNodes);
  for (var i = 0; i < numberOfNodes; i++) {
    numDegrees[i] = [];
  }

  var maxDegree = 0;
  var degreeSum = 0;
  var n = 0;

  for (i = 0; i < numberOfNodes; i++) {
    var degree = degreeSequence[i];
    // process only the non-zero integers
    if (degree > 0) {
      numDegrees[degree].push(n);
      maxDegree = Math.max(maxDegree, degree);
      degreeSum += degree;
      n += 1;
    }
  }

  // Return graph if no edges
  if (n === 0) {
    return G;
  }

  // form list of [stubs,name] for each node.
  var modstubs = new Array(maxDegree + 1);
  for (i = 0; i < maxDegree + 1; i++) {
    modstubs[i] = [0, 0];
  }
  // Successively reduce degree sequence by removing the maximum degree
  while (n > 0) {
    // Retrieve the maximum degree in the sequence
    while (numDegrees[maxDegree].length === 0) {
      maxDegree -= 1;
    }
    // If there are not enough stubs to connect to, then the sequence is not
    // graphical
    if (maxDegree > n - 1) {
      throw new JSNetworkXError("Non-graphical integer sequence");
    }
    // Remove largest stub in list
    var source = numDegrees[maxDegree].pop();
    n -= 1;
    // Reduce the next maxDegree largest stubs
    var mslen = 0;
    var k = maxDegree;
    for (i = 0; i < maxDegree; i++) {
      while (numDegrees[k].length === 0) {
        k -= 1;
      }
      var target = numDegrees[k].pop();
      G.addEdge(source, target);
      n -= 1;
      if (k > 1) {
        modstubs[mslen] = [k - 1, target];
        mslen += 1;
      }
    }
    // Add back to the list any nonzero stubs that were removed
    for (i = 0; i < mslen; i++) {
      var _modstubs$i = _babelHelpers.slicedToArray(modstubs[i], 2);

      var stubval = _modstubs$i[0];
      var stubtarget = _modstubs$i[1];

      numDegrees[stubval].push(stubtarget);
      n += 1;
    }
  }

  G.name = sprintf("havelHakimiGraph %s nodes %d edges", G.order(), G.size());
  return G;
}

function genHavelHakimiGraph(degreeSequence, optCreateUsing) {
  return delegate("havelHakimiGraph", [degreeSequence, optCreateUsing]);
}

;
Object.defineProperty(exports, "__esModule", {
  value: true
});

},{"../_internals/delegate":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/delegateToWorker.js","../_internals/sprintf":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/sprintf.js","../algorithms/graphical":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/graphical.js","../exceptions/JSNetworkXError":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/JSNetworkXError.js","./classic":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/generators/classic.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/generators/index.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _classic = require("./classic");

var classic = _babelHelpers.interopRequireWildcard(_classic);

var _degreeSequence = require("./degreeSequence");

var degreeSequence = _babelHelpers.interopRequireWildcard(_degreeSequence);

var _randomGraphs = require("./randomGraphs");

var randomGraphs = _babelHelpers.interopRequireWildcard(_randomGraphs);

var _small = require("./small");

var small = _babelHelpers.interopRequireWildcard(_small);

var _social = require("./social");

var social = _babelHelpers.interopRequireWildcard(_social);

exports.classic = classic;
exports.degreeSequence = degreeSequence;
exports.randomGraphs = randomGraphs;
exports.small = small;
exports.social = social;

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(_classic));

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(_degreeSequence));

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(_randomGraphs));

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(_small));

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(_social));

Object.defineProperty(exports, "__esModule", {
  value: true
});

},{"./classic":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/generators/classic.js","./degreeSequence":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/generators/degreeSequence.js","./randomGraphs":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/generators/randomGraphs.js","./small":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/generators/small.js","./social":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/generators/social.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/generators/randomGraphs.js":[function(require,module,exports){
"use strict";

var _core = require("babel-runtime/core-js")["default"];

var _babelHelpers = require("babel-runtime/helpers")["default"];

exports.fastGnpRandomGraph = fastGnpRandomGraph;
exports.genFastGnpRandomGraph = genFastGnpRandomGraph;
exports.gnpRandomGraph = gnpRandomGraph;
exports.genGnpRandomGraph = genGnpRandomGraph;
exports.binomialGraph = binomialGraph;
exports.genBinomialGraph = genBinomialGraph;
exports.erdosRenyiGraph = erdosRenyiGraph;
exports.genErdosRenyiGraph = genErdosRenyiGraph;

var delegate = _babelHelpers.interopRequire(require("../_internals/delegate"));

"use strict";

var DiGraph = _babelHelpers.interopRequire(require("../classes/DiGraph"));

var Graph = _babelHelpers.interopRequire(require("../classes/Graph"));

var _classic = require("./classic");

var completeGraph = _classic.completeGraph;
var emptyGraph = _classic.emptyGraph;

var _internals = require("../_internals");

var genCombinations = _internals.genCombinations;
var genPermutations = _internals.genPermutations;
var range = _internals.range;
var sprintf = _internals.sprintf;

function fastGnpRandomGraph(n, p) {
  var optDirected = arguments[2] === undefined ? false : arguments[2];

  var G = emptyGraph(n);
  G.name = sprintf("fastGnpRandomGraph(%s, %s)", n, p);

  if (p <= 0 || p >= 1) {
    return gnpRandomGraph(n, p, optDirected);
  }
  var v;
  var w = -1;
  var lp = Math.log(1 - p);
  var lr;

  if (optDirected) {
    // Nodes in graph are from 0,n-1 (start with v as the first node index).
    v = 0;
    G = new DiGraph(G);
    while (v < n) {
      lr = Math.log(1 - Math.random());
      w = w + 1 + Math.floor(lr / lp);
      if (v === w) {
        // avoid self loops
        w = w + 1;
      }
      while (w >= n && v < n) {
        w = w - n;
        v = v + 1;
        if (v === w) {
          // avoid self loops
          w = w + 1;
        }
      }
      if (v < n) {
        G.addEdge(v, w);
      }
    }
  } else {
    v = 1; // Nodes in graph are from 0, n-1 (this is the second node index).
    while (v < n) {
      lr = Math.log(1 - Math.random());
      w = w + 1 + Math.floor(lr / lp);
      while (w >= v && v < n) {
        w = w - v;
        v = v + 1;
      }
      if (v < n) {
        G.addEdge(v, w);
      }
    }
  }
  return G;
}

function genFastGnpRandomGraph(n, p, optDirected) {
  return delegate("fastGnpRandomGraph", [n, p, optDirected]);
}

;

function gnpRandomGraph(n, p, optDirected) {
  var G = optDirected ? new DiGraph() : new Graph();
  var edges;
  var rangeN = range(n);

  G.addNodesFrom(rangeN);
  G.name = sprintf("gnpRandomGraph(%s, %s)", n, p);
  if (p <= 0) {
    return G;
  }
  if (p >= 1) {
    return completeGraph(n, G);
  }

  edges = G.isDirected() ? genPermutations(rangeN, 2) : genCombinations(rangeN, 2);

  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = _core.$for.getIterator(edges), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var edge = _step.value;

      if (Math.random() < p) {
        G.addEdge(edge[0], edge[1]);
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"]) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return G;
}

function genGnpRandomGraph(n, p, optDirected) {
  return delegate("gnpRandomGraph", [n, p, optDirected]);
}

;

function binomialGraph(n, p, optDirected) {
  return gnpRandomGraph(n, p, optDirected);
}

function genBinomialGraph(n, p, optDirected) {
  return delegate("binomialGraph", [n, p, optDirected]);
}

;

function erdosRenyiGraph(n, p, optDirected) {
  return gnpRandomGraph(n, p, optDirected);
}

function genErdosRenyiGraph(n, p, optDirected) {
  return delegate("erdosRenyiGraph", [n, p, optDirected]);
}

;
Object.defineProperty(exports, "__esModule", {
  value: true
});

},{"../_internals":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/index.js","../_internals/delegate":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/delegateToWorker.js","../classes/DiGraph":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/DiGraph.js","../classes/Graph":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/Graph.js","./classic":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/generators/classic.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/generators/small.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

/**
 * Return a small undirected graph described by graph_description.
 *
 * @see makeSmallGraph.
 *
 * @param {Array} graphDescription
 *    Description of the graph to create in the form `{type, name, n, list}`.
 * @param {Graph=}
 *    optCreateUsing Graph instance to empty and add nodes to.
 *
 * @return {Graph}
 */
exports.makeSmallUndirectedGraph = makeSmallUndirectedGraph;

/**
 * Return the small graph described by graph_description.
 *
 * graphDescription is a list of the form `{type, name, n, list}`.
 *
 * Here `ltype` is one of `"adjacencylist"` or `"edgelist"`,
 * `name` is the name of the graph and `n` the number of nodes.
 * This constructs a graph of `n` nodes with integer labels 0,..,n-1.
 *
 * If `ltype="adjacencylist"` then `xlist` is an adjacency list
 * with exactly `n` entries, in with the `j`'th entry (which can be empty)
 * specifies the nodes connected to vertex `j`.
 *
 * E.g. the "square" graph `$C_4$` can be obtained by
 *
 * ```
 * var G = makeSmallGraph({
 *   type: "adjacencylist",
 *   name: "C_4",
 *   n: 4,
 *   list: [[2,4],[1,3],[2,4],[1,3]]
 * });
 * ```
 *
 * or, since we do not need to add edges twice,
 *
 * ```
 * var G = makeSmallGraph({
 *   type: "adjacencylist",
 *   name: "C_4",
 *   n: 4,
 *   list: [[2,4],[3],[4],[]]]
 * });
 *
 * If `ltype="edgelist"` then `xlist` is an edge list written as
 * `[[v1,w2],[v2,w2],...,[vk,wk]]`, where `vj` and `wj` integers in the range
 * 1,..,n
 *
 * E.g. the "square" graph `$C_4$` can be obtained by
 *
 * ```
 * var G = makeSmallGraph({
 *   type: "edgelist",
 *   name: "C_4",
 *   n: 4,
 *   list: [[1,2],[3,4],[2,3],[4,1]]]
 * });
 * ```
 *
 * Use the optCreateUsing argument to choose the graph class/type.
 *
 * @param {Array} graphDescription
 *    Description of the graph to create in the form `{type, name, n, list}`.
 * @param {Graph=} optCreateUsing Graph instance to empty and add nodes to.
 * @return {Graph}
 */
exports.makeSmallGraph = makeSmallGraph;

// TODO: LCF_graph

/**
 * Return the Bull graph.
 *
 * @param {Graph=} optCreateUsing  Graph instance to empty and add nodes to.
 * @return {Graph}
 */
exports.bullGraph = bullGraph;

// TODO: chvatal_graph
// TODO: cubical_graph
// TODO: desargues_graph
// TODO: diamond_graph
// TODO: dodecahedral_graph
// TODO: frucht_graph
// TODO: heawood_graph
// TODO: house_graph
// TODO: house_x_graph
// TODO: icosahedral_graph

/**
 * Return the Krackhardt Kite Social Network.
 *
 * A 10 actor social network introduced by David Krackhardt
 * to illustrate: degree, betweenness, centrality, closeness, etc.
 * The traditional labeling is:
 * Andre=1, Beverley=2, Carol=3, Diane=4,
 * Ed=5, Fernando=6, Garth=7, Heather=8, Ike=9, Jane=10.
 *
 * @param {Graph=} opt_create_using Graph instance to empty and add nodes to.
 * @return {Graph}
 */
exports.krackhardtKiteGraph = krackhardtKiteGraph;

var JSNetworkXError = _babelHelpers.interopRequire(require("../exceptions/JSNetworkXError"));

var emptyGraph = require("./classic").emptyGraph;

var forEach = require("../_internals").forEach;

function makeSmallUndirectedGraph(graphDescription, optCreateUsing) {
  if (optCreateUsing != null && optCreateUsing.isDirected()) {
    throw new JSNetworkXError("Directed Graph not supported");
  }
  return makeSmallGraph(graphDescription, optCreateUsing);
}

function makeSmallGraph(_ref, optCreateUsing) {
  var type = _ref.type;
  var name = _ref.name;
  var n = _ref.n;
  var list = _ref.list;

  var G = emptyGraph(n, optCreateUsing);
  var nodes = G.nodes();

  if (type === "adjacencylist") {
    if (list.length !== n) {
      throw new JSNetworkXError("invalid graphDescription");
    }
    nodes.forEach(function (v) {
      forEach(list[v], function (u) {
        return G.addEdge(u - 1, v);
      });
    });
  } else if (type === "edgelist") {
    forEach(list, function (_ref2) {
      var _ref22 = _babelHelpers.slicedToArray(_ref2, 2);

      var v = _ref22[0];
      var u = _ref22[1];

      v -= 1;
      u -= 1;
      if (v < 0 || v > n - 1 || u < 0 || u > n - 1) {
        throw new JSNetworkXError("invalid graphDescription");
      } else {
        G.addEdge(v, u);
      }
    });
  }
  G.name = name;
  return G;
}

function bullGraph(optCreateUsing) {
  var type = "adjacencylist";
  var name = "Bull Graph";
  var n = 5;
  var list = [[2, 3], [1, 3, 4], [1, 2, 5], [2], [3]];

  return makeSmallUndirectedGraph({ type: type, name: name, n: n, list: list }, optCreateUsing);
}

function krackhardtKiteGraph(optCreateUsing) {
  var type = "adjacencylist";
  var name = "Krackhardt Kite Social Network";
  var n = 10;
  var list = [[2, 3, 4, 6], [1, 4, 5, 7], [1, 4, 6], [1, 2, 3, 5, 6, 7], [2, 4, 7], [1, 3, 4, 7, 8], [2, 4, 5, 6, 8], [6, 7, 9], [8, 10], [9]];

  return makeSmallUndirectedGraph({ type: type, name: name, n: n, list: list }, optCreateUsing);
}

// TODO: moebius_kantor_graph
// TODO: octahedral_graph
// TODO: pappus_graph
// TODO: petersen_graph
// TODO: sedgewick_maze_graph
// TODO: tetrahedral_graph
// TODO: truncated_cube_graph
// TODO: truncated_tetrahedron_graph
// TODO: tutte_graph

Object.defineProperty(exports, "__esModule", {
  value: true
});

},{"../_internals":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/index.js","../exceptions/JSNetworkXError":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/JSNetworkXError.js","./classic":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/generators/classic.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/generators/social.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

/**
 * Return Zachary's Karate club graph.
 *
 * @return {Graph}
 */
exports.karateClubGraph = karateClubGraph;

/**
 * Return Davis Saouthern women social network.
 *
 * This is a bipartite graph.
 *
 * @return {Graph}
 */
exports.davisSouthernWomenGraph = davisSouthernWomenGraph;

/**
 * Return Florentine families graph.
 *
 * @return {Graph}
 */
exports.florentineFamiliesGraph = florentineFamiliesGraph;

/**
 * @fileoverview Famous social networkx
 */

var Graph = _babelHelpers.interopRequire(require("../classes/Graph"));

var range = _babelHelpers.interopRequire(require("../_internals/range"));

function karateClubGraph() {
  var G = new Graph();
  G.addNodesFrom(range(34));
  G.name = "Zachary's Karate Club";

  var zacharyData = ["0 1 1 1 1 1 1 1 1 0 1 1 1 1 0 0 0 1 0 1 0 1 0 0 0 0 0 0 0 0 0 1 0 0", "1 0 1 1 0 0 0 1 0 0 0 0 0 1 0 0 0 1 0 1 0 1 0 0 0 0 0 0 0 0 1 0 0 0", "1 1 0 1 0 0 0 1 1 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 1 0", "1 1 1 0 0 0 0 1 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0", "1 0 0 0 0 0 1 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0", "1 0 0 0 0 0 1 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0", "1 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0", "1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0", "1 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 1", "0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1", "1 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0", "1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0", "1 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0", "1 1 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1", "0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0", "1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1", "1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1", "1 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 1 0 0 1 1", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1 0 0 0 1 0 0", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 1 0 0", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 1", "0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 0 0 0 0 0 0 1", "0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 1", "0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 1 0 0 0 0 0 1 1", "0 1 0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1", "1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 0 0 1 0 0 0 1 1", "0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 1 0 0 1 0 1 0 1 1 0 0 0 0 0 1 1 1 0 1", "0 0 0 0 0 0 0 0 1 1 0 0 0 1 1 1 0 0 1 1 1 0 1 1 0 0 1 1 1 1 1 1 1 0"];

  zacharyData.forEach(function (line, row) {
    var thisrow = line.split(" ");
    thisrow.forEach(function (val, col) {
      if (val === "1") {
        G.addEdge(row, col); // col goes from 0,33
      }
    });
  });

  G.addNodesFrom([0, 1, 2, 3, 4, 5, 6, 7, 8, 10, 11, 12, 13, 16, 17, 19, 21], { club: "Mr. Hi" });
  G.addNodesFrom([9, 14, 15, 18, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33], { club: "Officer" });

  return G;
}

function davisSouthernWomenGraph() {
  var G = new Graph();
  // top nodes
  G.addNodesFrom(["Evelyn Jefferson", "Laura Mandeville", "Theresa Anderson", "Brenda Rogers", "Charlotte McDowd", "Frances Anderson", "Eleanor Nye", "Pearl Oglethorpe", "Ruth DeSand", "Verne Sanderson", "Myra Liddel", "Katherina Rogers", "Sylvia Avondale", "Nora Fayette", "Helen Lloyd", "Dorothy Murchison", "Olivia Carleton", "Flora Price"], { bipartite: 0 });

  // bottom nodes
  G.addNodesFrom(["E1", "E2", "E3", "E4", "E5", "E6", "E7", "E8", "E9", "E10", "E11", "E12", "E13", "E14"], { bipartite: 1 });

  G.add_edges_from([["Evelyn Jefferson", "E1"], ["Evelyn Jefferson", "E2"], ["Evelyn Jefferson", "E3"], ["Evelyn Jefferson", "E4"], ["Evelyn Jefferson", "E5"], ["Evelyn Jefferson", "E6"], ["Evelyn Jefferson", "E8"], ["Evelyn Jefferson", "E9"], ["Laura Mandeville", "E1"], ["Laura Mandeville", "E2"], ["Laura Mandeville", "E3"], ["Laura Mandeville", "E5"], ["Laura Mandeville", "E6"], ["Laura Mandeville", "E7"], ["Laura Mandeville", "E8"], ["Theresa Anderson", "E2"], ["Theresa Anderson", "E3"], ["Theresa Anderson", "E4"], ["Theresa Anderson", "E5"], ["Theresa Anderson", "E6"], ["Theresa Anderson", "E7"], ["Theresa Anderson", "E8"], ["Theresa Anderson", "E9"], ["Brenda Rogers", "E1"], ["Brenda Rogers", "E3"], ["Brenda Rogers", "E4"], ["Brenda Rogers", "E5"], ["Brenda Rogers", "E6"], ["Brenda Rogers", "E7"], ["Brenda Rogers", "E8"], ["Charlotte McDowd", "E3"], ["Charlotte McDowd", "E4"], ["Charlotte McDowd", "E5"], ["Charlotte McDowd", "E7"], ["Frances Anderson", "E3"], ["Frances Anderson", "E5"], ["Frances Anderson", "E6"], ["Frances Anderson", "E8"], ["Eleanor Nye", "E5"], ["Eleanor Nye", "E6"], ["Eleanor Nye", "E7"], ["Eleanor Nye", "E8"], ["Pearl Oglethorpe", "E6"], ["Pearl Oglethorpe", "E8"], ["Pearl Oglethorpe", "E9"], ["Ruth DeSand", "E5"], ["Ruth DeSand", "E7"], ["Ruth DeSand", "E8"], ["Ruth DeSand", "E9"], ["Verne Sanderson", "E7"], ["Verne Sanderson", "E8"], ["Verne Sanderson", "E9"], ["Verne Sanderson", "E12"], ["Myra Liddel", "E8"], ["Myra Liddel", "E9"], ["Myra Liddel", "E10"], ["Myra Liddel", "E12"], ["Katherina Rogers", "E8"], ["Katherina Rogers", "E9"], ["Katherina Rogers", "E10"], ["Katherina Rogers", "E12"], ["Katherina Rogers", "E13"], ["Katherina Rogers", "E14"], ["Sylvia Avondale", "E7"], ["Sylvia Avondale", "E8"], ["Sylvia Avondale", "E9"], ["Sylvia Avondale", "E10"], ["Sylvia Avondale", "E12"], ["Sylvia Avondale", "E13"], ["Sylvia Avondale", "E14"], ["Nora Fayette", "E6"], ["Nora Fayette", "E7"], ["Nora Fayette", "E9"], ["Nora Fayette", "E10"], ["Nora Fayette", "E11"], ["Nora Fayette", "E12"], ["Nora Fayette", "E13"], ["Nora Fayette", "E14"], ["Helen Lloyd", "E7"], ["Helen Lloyd", "E8"], ["Helen Lloyd", "E10"], ["Helen Lloyd", "E11"], ["Helen Lloyd", "E12"], ["Dorothy Murchison", "E8"], ["Dorothy Murchison", "E9"], ["Olivia Carleton", "E9"], ["Olivia Carleton", "E11"], ["Flora Price", "E9"], ["Flora Price", "E11"]]);

  return G;
}

function florentineFamiliesGraph() {
  var G = new Graph();
  G.addEdge("Acciaiuoli", "Medici");
  G.addEdge("Castellani", "Peruzzi");
  G.addEdge("Castellani", "Strozzi");
  G.addEdge("Castellani", "Barbadori");
  G.addEdge("Medici", "Barbadori");
  G.addEdge("Medici", "Ridolfi");
  G.addEdge("Medici", "Tornabuoni");
  G.addEdge("Medici", "Albizzi");
  G.addEdge("Medici", "Salviati");
  G.addEdge("Salviati", "Pazzi");
  G.addEdge("Peruzzi", "Strozzi");
  G.addEdge("Peruzzi", "Bischeri");
  G.addEdge("Strozzi", "Ridolfi");
  G.addEdge("Strozzi", "Bischeri");
  G.addEdge("Ridolfi", "Tornabuoni");
  G.addEdge("Tornabuoni", "Guadagni");
  G.addEdge("Albizzi", "Ginori");
  G.addEdge("Albizzi", "Guadagni");
  G.addEdge("Bischeri", "Guadagni");
  G.addEdge("Guadagni", "Lamberteschi");
  return G;
}

Object.defineProperty(exports, "__esModule", {
  value: true
});

},{"../_internals/range":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/range.js","../classes/Graph":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/Graph.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/index.js":[function(require,module,exports){
"use strict";

var _babelHelpers = require("babel-runtime/helpers")["default"];

var _algorithms = require("./algorithms");

var algorithms = _babelHelpers.interopRequireWildcard(_algorithms);

var _classes = require("./classes");

var classes = _babelHelpers.interopRequireWildcard(_classes);

var _convert = require("./convert");

var convert = _babelHelpers.interopRequireWildcard(_convert);

var _drawing = require("./drawing");

var drawing = _babelHelpers.interopRequireWildcard(_drawing);

var _exceptions = require("./exceptions");

var exceptions = _babelHelpers.interopRequireWildcard(_exceptions);

var _generators = require("./generators");

var generators = _babelHelpers.interopRequireWildcard(_generators);

var _relabel = require("./relabel");

var relabel = _babelHelpers.interopRequireWildcard(_relabel);

var Map = _babelHelpers.interopRequire(require("./_internals/Map"));

var Set = _babelHelpers.interopRequire(require("./_internals/Set"));

exports.Map = Map;
exports.Set = Set;
exports.algorithms = algorithms;
exports.classes = classes;
exports.convert = convert;
exports.drawing = drawing;
exports.exceptions = exceptions;
exports.generators = generators;
exports.relabel = relabel;

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(_algorithms));

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(_classes));

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(_convert));

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(_drawing));

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(require("./contrib/observer")));

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(_exceptions));

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(_generators));

_babelHelpers.defaults(exports, _babelHelpers.interopRequireWildcard(_relabel));

Object.defineProperty(exports, "__esModule", {
  value: true
});

},{"./_internals/Map":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/Map.js","./_internals/Set":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/Set.js","./algorithms":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/algorithms/index.js","./classes":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/index.js","./contrib/observer":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/contrib/observer.js","./convert":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/convert.js","./drawing":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/drawing/index.js","./exceptions":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/index.js","./generators":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/generators/index.js","./relabel":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/relabel.js","babel-runtime/helpers":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/relabel.js":[function(require,module,exports){
"use strict";

var _core = require("babel-runtime/core-js")["default"];

var DiGraph = require("./classes/DiGraph");
/*jshint ignore:start*/
var Map = require("./_internals/Map");
var Set = require("./_internals/Set");
/*jshint ignore:end*/

var _require = require("./exceptions");

var JSNetworkXError = _require.JSNetworkXError;
var JSNetworkXUnfeasible = _require.JSNetworkXUnfeasible;

var _require2 = require("./_internals");

var clone = _require2.clone;
var forEach = _require2.forEach;
var isMap = _require2.isMap;
var mapIterator = _require2.mapIterator;
var someIterator = _require2.someIterator;
var sprintf = _require2.sprintf;
var topologicalSort = _require2.topologicalSort;
var tuple2 = _require2.tuple2;
var tuple3c = _require2.tuple3c;
var tuple4c = _require2.tuple4c;

/**
 * Relabel the nodes of the graph G.
 *
 * Notes
 * -----
 * Only the nodes specified in the mapping will be relabeled.
 *
 * The setting copy=false modifies the graph in place.
 * This is not always possible if the mapping is circular.
 * In that case use copy=true.
 *
 * @see #convertNodeLabelsTo_integers
 *
 * @param {Graph} G A JSNetworkX graph
 * @param {(Object|Map|function(Node):Node)} mapping
 *      A dictionary with the old labels as keys and new labels as values.
 *      A partial mapping is allowed.
 * @param {boolean=} optCopy (default: true)
 *      If True return a copy or if False relabel the nodes in place.
 *
 * @return {Graph}
 * @export
 */
function relabelNodes(G, mapping) {
  var optCopy = arguments[2] === undefined ? true : arguments[2];

  // you can pass a function f(oldLabel)->newLabel
  // but we'll just make a dictionary here regardless
  var m = mapping;
  if (typeof mapping !== "function") {
    if (!isMap(m)) {
      m = new Map(m);
    }
  } else {
    m = new Map(mapIterator(G.nodesIter(), function (n) {
      return tuple2(n, mapping(n));
    }));
  }

  return optCopy ? relabelCopy(G, m) : relabelInplace(G, m);
}

/**
 * @param {Graph} G A JSNetworkX graph
 * @param {Map} mapping
 *      A dictionary with the old labels as keys and new labels as values.
 *      A partial mapping is allowed.
 *
 * @return .Graph}
 * @private
 */
function relabelInplace(G, mapping) {
  var oldLabels = new Set(mapping.keys());
  var nodes;

  if (someIterator(mapping.values(), function (v) {
    return oldLabels.has(v);
  })) {
    // labels sets overlap
    // can we topological sort and still do the relabeling?
    var D = new DiGraph(mapping);
    D.removeEdgesFrom(D.selfloopEdges());
    try {
      nodes = topologicalSort(D);
    } catch (e) {
      if (e instanceof JSNetworkXUnfeasible) {
        throw new JSNetworkXUnfeasible("The node label sets are overlapping and" + " no ordering can resolve the mapping." + " Use copy=True.");
      }
    }
    nodes.reverse(); // reverse topological order
  } else {
    // non-overlapping label sets
    nodes = oldLabels.values();
  }
  var multigraph = G.isMultigraph();
  var directed = G.isDirected();
  var newEdges;

  forEach(nodes, function (old) {
    var new_;
    if (mapping.has(old)) {
      new_ = mapping.get(old);
    } else {
      return; // continue
    }

    if (!G.hasNode(old)) {
      throw new JSNetworkXError(sprintf("Node %j is not in the graph.", old));
    }
    G.addNode(new_, G.node.get(old));
    if (multigraph) {
      newEdges = G.edges(old, true, true).map(function (d) {
        return tuple4c(new_, d[1], d[2], d[3], d);
      });

      if (directed) {
        newEdges = newEdges.concat(G.inEdges(old, true, true).map(function (d) {
          return tuple4c(d[0], new_, d[2], d[3], d);
        }));
      }
    } else {
      newEdges = G.edges(old, true).map(function (d) {
        return tuple3c(new_, d[1], d[2], d);
      });

      if (directed) {
        newEdges = newEdges.concat(G.inEdges(old, true).map(function (d) {
          return tuple3c(d[0], new_, d[2], d);
        }));
      }
    }
    G.removeNode(old);
    G.addEdgesFrom(newEdges);
  });
  return G;
}

/**
 * @param {Graph} G A JSNetworkX graph
 * @param {Map} mapping
 *      A dictionary with the old labels as keys and new labels as values.
 *      A partial mapping is allowed.
 *
 * @return {Graph}
 * @private
 */
function relabelCopy(G, mapping) {
  var H = new G.constructor();
  H.name = "(" + G.name + ")";
  if (G.isMultigraph()) {
    H.addEdgesFrom(mapIterator(G.edgesIter(null, true, true), function (d) {
      return tuple4c(mapping.has(d[0]) ? mapping.get(d[0]) : d[0], mapping.has(d[1]) ? mapping.get(d[1]) : d[1], d[2], clone(d[3]), d);
    }));
  } else {
    H.addEdgesFrom(mapIterator(G.edgesIter(null, true), function (d) {
      return tuple3c(mapping.has(d[0]) ? mapping.get(d[0]) : d[0], mapping.has(d[1]) ? mapping.get(d[1]) : d[1], clone(d[3]), d);
    }));
  }
  G.node.forEach(function (data, n) {
    return H.addNode(mapping.has(n) ? mapping.get(n) : n, clone(data));
  });
  _core.Object.assign(H.graph, clone(G.graph));

  return H;
}

/**
 * Return a copy of G node labels replaced with integers.
 *
 * @param {Graph} G A JSNetworkX graph
 * @param {?number=} optFirstLabel (default=0)
 *      An integer specifying the offset in numbering nodes.
 *      The n new integer labels are numbered firstLabel, ..., n-1+firstLabel.
 * @param {?string=} optOrdering (default="default")
 *      "default" : inherit node ordering from G.nodes()
 *      "sorted"  : inherit node ordering from sorted(G.nodes())
 *      "increasing degree" : nodes are sorted by increasing degree
 *      "decreasing degree" : nodes are sorted by decreasing degree
 * @param {?boolean=} optDiscardOldLabels (default=true)
 *      If true discard old labels. If false, create a node attribute
 *      'oldLabel' to hold the old labels.
 *
 * @return {Graph}
 * @export
 */
function convertNodeLabelsToIntegers(G) {
  var optFirstLabel = arguments[1] === undefined ? 0 : arguments[1];
  var optOrdering = arguments[2] === undefined ? "default" : arguments[2];
  var optDiscardOldLabels = arguments[3] === undefined ? true : arguments[3];

  //   This function strips information attached to the nodes and/or
  //   edges of a graph, and returns a graph with appropriate integer
  //   labels. One can view this as a re-labeling of the nodes. Be
  //   warned that the term "labeled graph" has a loaded meaning
  //   in graph theory. The fundamental issue is whether the names
  //   (labels) of the nodes (and edges) matter in deciding when two
  //   graphs are the same. For example, in problems of graph enumeration
  //   there is a distinct difference in techniques required when
  //   counting labeled vs. unlabeled graphs.
  //
  //   When implementing graph
  //   algorithms it is often convenient to strip off the original node
  //   and edge information and appropriately relabel the n nodes with
  //   the integer values 1,..,n. This is the purpose of this function,
  //   and it provides the option (see discardOldLabels variable) to either
  //   preserve the original labels in separate dicts (these are not
  //   returned but made an attribute of the new graph.

  if (typeof optOrdering === "boolean") {
    optDiscardOldLabels = optOrdering;
    optOrdering = "default";
  }

  switch (typeof optFirstLabel) {
    case "string":
      optOrdering = optFirstLabel;
      optFirstLabel = 0;
      break;
    case "boolean":
      optDiscardOldLabels = optFirstLabel;
      optFirstLabel = 0;
      break;
  }

  var mapping = new Map();
  var nodes;
  var dvPairs;
  var i;
  var j;
  var l;

  switch (optOrdering) {
    case "default":
      nodes = G.nodes();
      for (i = 0, j = optFirstLabel, l = nodes.length; i < l; i++, j++) {
        mapping.set(nodes[i], j);
      }
      break;
    case "sorted":
      nodes = G.nodes();
      nodes.sort();
      for (i = 0, j = optFirstLabel, l = nodes.length; i < l; i++, j++) {
        mapping.set(nodes[i], j);
      }
      break;
    case "increasing degree":
      dvPairs = _core.Array.from(G.degreeIter());
      dvPairs.sort(function (a, b) {
        return a[1] - b[1];
      });
      for (i = 0, j = optFirstLabel, l = dvPairs.length; i < l; i++, j++) {
        mapping.set(dvPairs[i][0], j);
      }
      break;
    case "decreasing degree":
      dvPairs = _core.Array.from(G.degreeIter());
      dvPairs.sort(function (a, b) {
        return b[1] - a[1];
      });
      for (i = 0, j = optFirstLabel, l = dvPairs.length; i < l; i++, j++) {
        mapping.set(dvPairs[i][0], j);
      }
      break;
    default:
      throw new JSNetworkXError(sprintf("Unkown node ordering: \"%s\"", optOrdering));
  }

  var H = relabelNodes(G, mapping);
  H.name = "(" + G.name + ")WithIntLabels";
  if (!optDiscardOldLabels) {
    H.nodeLabels = mapping;
  }
  return H;
}

module.exports = {
  relabelNodes: relabelNodes,
  convertNodeLabelsToIntegers: convertNodeLabelsToIntegers };

},{"./_internals":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/index.js","./_internals/Map":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/Map.js","./_internals/Set":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/_internals/Set.js","./classes/DiGraph":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/classes/DiGraph.js","./exceptions":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/exceptions/index.js","babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js":[function(require,module,exports){
/**
 * Core.js 0.6.1
 * https://github.com/zloirock/core-js
 * License: http://rock.mit-license.org
 * © 2015 Denis Pushkarev
 */
!function(global, framework, undefined){
'use strict';

/******************************************************************************
 * Module : common                                                            *
 ******************************************************************************/

  // Shortcuts for [[Class]] & property names
var OBJECT          = 'Object'
  , FUNCTION        = 'Function'
  , ARRAY           = 'Array'
  , STRING          = 'String'
  , NUMBER          = 'Number'
  , REGEXP          = 'RegExp'
  , DATE            = 'Date'
  , MAP             = 'Map'
  , SET             = 'Set'
  , WEAKMAP         = 'WeakMap'
  , WEAKSET         = 'WeakSet'
  , SYMBOL          = 'Symbol'
  , PROMISE         = 'Promise'
  , MATH            = 'Math'
  , ARGUMENTS       = 'Arguments'
  , PROTOTYPE       = 'prototype'
  , CONSTRUCTOR     = 'constructor'
  , TO_STRING       = 'toString'
  , TO_STRING_TAG   = TO_STRING + 'Tag'
  , TO_LOCALE       = 'toLocaleString'
  , HAS_OWN         = 'hasOwnProperty'
  , FOR_EACH        = 'forEach'
  , ITERATOR        = 'iterator'
  , FF_ITERATOR     = '@@' + ITERATOR
  , PROCESS         = 'process'
  , CREATE_ELEMENT  = 'createElement'
  // Aliases global objects and prototypes
  , Function        = global[FUNCTION]
  , Object          = global[OBJECT]
  , Array           = global[ARRAY]
  , String          = global[STRING]
  , Number          = global[NUMBER]
  , RegExp          = global[REGEXP]
  , Date            = global[DATE]
  , Map             = global[MAP]
  , Set             = global[SET]
  , WeakMap         = global[WEAKMAP]
  , WeakSet         = global[WEAKSET]
  , Symbol          = global[SYMBOL]
  , Math            = global[MATH]
  , TypeError       = global.TypeError
  , RangeError      = global.RangeError
  , setTimeout      = global.setTimeout
  , setImmediate    = global.setImmediate
  , clearImmediate  = global.clearImmediate
  , parseInt        = global.parseInt
  , isFinite        = global.isFinite
  , process         = global[PROCESS]
  , nextTick        = process && process.nextTick
  , document        = global.document
  , html            = document && document.documentElement
  , navigator       = global.navigator
  , define          = global.define
  , console         = global.console || {}
  , ArrayProto      = Array[PROTOTYPE]
  , ObjectProto     = Object[PROTOTYPE]
  , FunctionProto   = Function[PROTOTYPE]
  , Infinity        = 1 / 0
  , DOT             = '.';

// http://jsperf.com/core-js-isobject
function isObject(it){
  return it !== null && (typeof it == 'object' || typeof it == 'function');
}
function isFunction(it){
  return typeof it == 'function';
}
// Native function?
var isNative = ctx(/./.test, /\[native code\]\s*\}\s*$/, 1);

// Object internal [[Class]] or toStringTag
// http://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring
var toString = ObjectProto[TO_STRING];
function setToStringTag(it, tag, stat){
  if(it && !has(it = stat ? it : it[PROTOTYPE], SYMBOL_TAG))hidden(it, SYMBOL_TAG, tag);
}
function cof(it){
  return toString.call(it).slice(8, -1);
}
function classof(it){
  var O, T;
  return it == undefined ? it === undefined ? 'Undefined' : 'Null'
    : typeof (T = (O = Object(it))[SYMBOL_TAG]) == 'string' ? T : cof(O);
}

// Function
var call  = FunctionProto.call
  , apply = FunctionProto.apply
  , REFERENCE_GET;
// Partial apply
function part(/* ...args */){
  var fn     = assertFunction(this)
    , length = arguments.length
    , args   = Array(length)
    , i      = 0
    , _      = path._
    , holder = false;
  while(length > i)if((args[i] = arguments[i++]) === _)holder = true;
  return function(/* ...args */){
    var that    = this
      , _length = arguments.length
      , i = 0, j = 0, _args;
    if(!holder && !_length)return invoke(fn, args, that);
    _args = args.slice();
    if(holder)for(;length > i; i++)if(_args[i] === _)_args[i] = arguments[j++];
    while(_length > j)_args.push(arguments[j++]);
    return invoke(fn, _args, that);
  }
}
// Optional / simple context binding
function ctx(fn, that, length){
  assertFunction(fn);
  if(~length && that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    }
    case 2: return function(a, b){
      return fn.call(that, a, b);
    }
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    }
  } return function(/* ...args */){
      return fn.apply(that, arguments);
  }
}
// Fast apply
// http://jsperf.lnkit.com/fast-apply/5
function invoke(fn, args, that){
  var un = that === undefined;
  switch(args.length | 0){
    case 0: return un ? fn()
                      : fn.call(that);
    case 1: return un ? fn(args[0])
                      : fn.call(that, args[0]);
    case 2: return un ? fn(args[0], args[1])
                      : fn.call(that, args[0], args[1]);
    case 3: return un ? fn(args[0], args[1], args[2])
                      : fn.call(that, args[0], args[1], args[2]);
    case 4: return un ? fn(args[0], args[1], args[2], args[3])
                      : fn.call(that, args[0], args[1], args[2], args[3]);
    case 5: return un ? fn(args[0], args[1], args[2], args[3], args[4])
                      : fn.call(that, args[0], args[1], args[2], args[3], args[4]);
  } return              fn.apply(that, args);
}

// Object:
var create           = Object.create
  , getPrototypeOf   = Object.getPrototypeOf
  , setPrototypeOf   = Object.setPrototypeOf
  , defineProperty   = Object.defineProperty
  , defineProperties = Object.defineProperties
  , getOwnDescriptor = Object.getOwnPropertyDescriptor
  , getKeys          = Object.keys
  , getNames         = Object.getOwnPropertyNames
  , getSymbols       = Object.getOwnPropertySymbols
  , isFrozen         = Object.isFrozen
  , has              = ctx(call, ObjectProto[HAS_OWN], 2)
  // Dummy, fix for not array-like ES3 string in es5 module
  , ES5Object        = Object
  , Dict;
function toObject(it){
  return ES5Object(assertDefined(it));
}
function returnIt(it){
  return it;
}
function returnThis(){
  return this;
}
function get(object, key){
  if(has(object, key))return object[key];
}
function ownKeys(it){
  assertObject(it);
  return getSymbols ? getNames(it).concat(getSymbols(it)) : getNames(it);
}
// 19.1.2.1 Object.assign(target, source, ...)
var assign = Object.assign || function(target, source){
  var T = Object(assertDefined(target))
    , l = arguments.length
    , i = 1;
  while(l > i){
    var S      = ES5Object(arguments[i++])
      , keys   = getKeys(S)
      , length = keys.length
      , j      = 0
      , key;
    while(length > j)T[key = keys[j++]] = S[key];
  }
  return T;
}
function keyOf(object, el){
  var O      = toObject(object)
    , keys   = getKeys(O)
    , length = keys.length
    , index  = 0
    , key;
  while(length > index)if(O[key = keys[index++]] === el)return key;
}

// Array
// array('str1,str2,str3') => ['str1', 'str2', 'str3']
function array(it){
  return String(it).split(',');
}
var push    = ArrayProto.push
  , unshift = ArrayProto.unshift
  , slice   = ArrayProto.slice
  , splice  = ArrayProto.splice
  , indexOf = ArrayProto.indexOf
  , forEach = ArrayProto[FOR_EACH];
/*
 * 0 -> forEach
 * 1 -> map
 * 2 -> filter
 * 3 -> some
 * 4 -> every
 * 5 -> find
 * 6 -> findIndex
 */
function createArrayMethod(type){
  var isMap       = type == 1
    , isFilter    = type == 2
    , isSome      = type == 3
    , isEvery     = type == 4
    , isFindIndex = type == 6
    , noholes     = type == 5 || isFindIndex;
  return function(callbackfn/*, that = undefined */){
    var O      = Object(assertDefined(this))
      , that   = arguments[1]
      , self   = ES5Object(O)
      , f      = ctx(callbackfn, that, 3)
      , length = toLength(self.length)
      , index  = 0
      , result = isMap ? Array(length) : isFilter ? [] : undefined
      , val, res;
    for(;length > index; index++)if(noholes || index in self){
      val = self[index];
      res = f(val, index, O);
      if(type){
        if(isMap)result[index] = res;             // map
        else if(res)switch(type){
          case 3: return true;                    // some
          case 5: return val;                     // find
          case 6: return index;                   // findIndex
          case 2: result.push(val);               // filter
        } else if(isEvery)return false;           // every
      }
    }
    return isFindIndex ? -1 : isSome || isEvery ? isEvery : result;
  }
}
function createArrayContains(isContains){
  return function(el /*, fromIndex = 0 */){
    var O      = toObject(this)
      , length = toLength(O.length)
      , index  = toIndex(arguments[1], length);
    if(isContains && el != el){
      for(;length > index; index++)if(sameNaN(O[index]))return isContains || index;
    } else for(;length > index; index++)if(isContains || index in O){
      if(O[index] === el)return isContains || index;
    } return !isContains && -1;
  }
}
function generic(A, B){
  // strange IE quirks mode bug -> use typeof vs isFunction
  return typeof A == 'function' ? A : B;
}

// Math
var MAX_SAFE_INTEGER = 0x1fffffffffffff // pow(2, 53) - 1 == 9007199254740991
  , pow    = Math.pow
  , abs    = Math.abs
  , ceil   = Math.ceil
  , floor  = Math.floor
  , max    = Math.max
  , min    = Math.min
  , random = Math.random
  , trunc  = Math.trunc || function(it){
      return (it > 0 ? floor : ceil)(it);
    }
// 20.1.2.4 Number.isNaN(number)
function sameNaN(number){
  return number != number;
}
// 7.1.4 ToInteger
function toInteger(it){
  return isNaN(it) ? 0 : trunc(it);
}
// 7.1.15 ToLength
function toLength(it){
  return it > 0 ? min(toInteger(it), MAX_SAFE_INTEGER) : 0;
}
function toIndex(index, length){
  var index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
}
function lz(num){
  return num > 9 ? num : '0' + num;
}

function createReplacer(regExp, replace, isStatic){
  var replacer = isObject(replace) ? function(part){
    return replace[part];
  } : replace;
  return function(it){
    return String(isStatic ? it : this).replace(regExp, replacer);
  }
}
function createPointAt(toString){
  return function(pos){
    var s = String(assertDefined(this))
      , i = toInteger(pos)
      , l = s.length
      , a, b;
    if(i < 0 || i >= l)return toString ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff
      ? toString ? s.charAt(i) : a
      : toString ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  }
}

// Assertion & errors
var REDUCE_ERROR = 'Reduce of empty object with no initial value';
function assert(condition, msg1, msg2){
  if(!condition)throw TypeError(msg2 ? msg1 + msg2 : msg1);
}
function assertDefined(it){
  if(it == undefined)throw TypeError('Function called on null or undefined');
  return it;
}
function assertFunction(it){
  assert(isFunction(it), it, ' is not a function!');
  return it;
}
function assertObject(it){
  assert(isObject(it), it, ' is not an object!');
  return it;
}
function assertInstance(it, Constructor, name){
  assert(it instanceof Constructor, name, ": use the 'new' operator!");
}

// Property descriptors & Symbol
function descriptor(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  }
}
function simpleSet(object, key, value){
  object[key] = value;
  return object;
}
function createDefiner(bitmap){
  return DESC ? function(object, key, value){
    return defineProperty(object, key, descriptor(bitmap, value));
  } : simpleSet;
}
function uid(key){
  return SYMBOL + '(' + key + ')_' + (++sid + random())[TO_STRING](36);
}
function getWellKnownSymbol(name, setter){
  return (Symbol && Symbol[name]) || (setter ? Symbol : safeSymbol)(SYMBOL + DOT + name);
}
// The engine works fine with descriptors? Thank's IE8 for his funny defineProperty.
var DESC = !!function(){
      try {
        return defineProperty({}, 'a', {get: function(){ return 2 }}).a == 2;
      } catch(e){}
    }()
  , sid    = 0
  , hidden = createDefiner(1)
  , set    = Symbol ? simpleSet : hidden
  , safeSymbol = Symbol || uid;
function assignHidden(target, src){
  for(var key in src)hidden(target, key, src[key]);
  return target;
}

var SYMBOL_UNSCOPABLES = getWellKnownSymbol('unscopables')
  , ArrayUnscopables   = ArrayProto[SYMBOL_UNSCOPABLES] || {}
  , SYMBOL_TAG         = getWellKnownSymbol(TO_STRING_TAG)
  , SYMBOL_SPECIES     = getWellKnownSymbol('species')
  , SYMBOL_ITERATOR;
function setSpecies(C){
  if(DESC && (framework || !isNative(C)))defineProperty(C, SYMBOL_SPECIES, {
    configurable: true,
    get: returnThis
  });
}

/******************************************************************************
 * Module : common.export                                                     *
 ******************************************************************************/

var NODE = cof(process) == PROCESS
  , core = {}
  , path = framework ? global : core
  , old  = global.core
  , exportGlobal
  // type bitmap
  , FORCED = 1
  , GLOBAL = 2
  , STATIC = 4
  , PROTO  = 8
  , BIND   = 16
  , WRAP   = 32;
function $define(type, name, source){
  var key, own, out, exp
    , isGlobal = type & GLOBAL
    , target   = isGlobal ? global : (type & STATIC)
        ? global[name] : (global[name] || ObjectProto)[PROTOTYPE]
    , exports  = isGlobal ? core : core[name] || (core[name] = {});
  if(isGlobal)source = name;
  for(key in source){
    // there is a similar native
    own = !(type & FORCED) && target && key in target
      && (!isFunction(target[key]) || isNative(target[key]));
    // export native or passed
    out = (own ? target : source)[key];
    // prevent global pollution for namespaces
    if(!framework && isGlobal && !isFunction(target[key]))exp = source[key];
    // bind timers to global for call from export context
    else if(type & BIND && own)exp = ctx(out, global);
    // wrap global constructors for prevent change them in library
    else if(type & WRAP && !framework && target[key] == out){
      exp = function(param){
        return this instanceof out ? new out(param) : out(param);
      }
      exp[PROTOTYPE] = out[PROTOTYPE];
    } else exp = type & PROTO && isFunction(out) ? ctx(call, out) : out;
    // extend global
    if(framework && target && !own){
      if(isGlobal)target[key] = out;
      else delete target[key] && hidden(target, key, out);
    }
    // export
    if(exports[key] != out)hidden(exports, key, exp);
  }
}
// CommonJS export
if(typeof module != 'undefined' && module.exports)module.exports = core;
// RequireJS export
else if(isFunction(define) && define.amd)define(function(){return core});
// Export to global object
else exportGlobal = true;
if(exportGlobal || framework){
  core.noConflict = function(){
    global.core = old;
    return core;
  }
  global.core = core;
}

/******************************************************************************
 * Module : common.iterators                                                  *
 ******************************************************************************/

SYMBOL_ITERATOR = getWellKnownSymbol(ITERATOR);
var ITER  = safeSymbol('iter')
  , KEY   = 1
  , VALUE = 2
  , Iterators = {}
  , IteratorPrototype = {}
    // Safari has byggy iterators w/o `next`
  , BUGGY_ITERATORS = 'keys' in ArrayProto && !('next' in [].keys());
// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
setIterator(IteratorPrototype, returnThis);
function setIterator(O, value){
  hidden(O, SYMBOL_ITERATOR, value);
  // Add iterator for FF iterator protocol
  FF_ITERATOR in ArrayProto && hidden(O, FF_ITERATOR, value);
}
function createIterator(Constructor, NAME, next, proto){
  Constructor[PROTOTYPE] = create(proto || IteratorPrototype, {next: descriptor(1, next)});
  setToStringTag(Constructor, NAME + ' Iterator');
}
function defineIterator(Constructor, NAME, value, DEFAULT){
  var proto = Constructor[PROTOTYPE]
    , iter  = get(proto, SYMBOL_ITERATOR) || get(proto, FF_ITERATOR) || (DEFAULT && get(proto, DEFAULT)) || value;
  if(framework){
    // Define iterator
    setIterator(proto, iter);
    if(iter !== value){
      var iterProto = getPrototypeOf(iter.call(new Constructor));
      // Set @@toStringTag to native iterators
      setToStringTag(iterProto, NAME + ' Iterator', true);
      // FF fix
      has(proto, FF_ITERATOR) && setIterator(iterProto, returnThis);
    }
  }
  // Plug for library
  Iterators[NAME] = iter;
  // FF & v8 fix
  Iterators[NAME + ' Iterator'] = returnThis;
  return iter;
}
function defineStdIterators(Base, NAME, Constructor, next, DEFAULT, IS_SET){
  function createIter(kind){
    return function(){
      return new Constructor(this, kind);
    }
  }
  createIterator(Constructor, NAME, next);
  var entries = createIter(KEY+VALUE)
    , values  = createIter(VALUE);
  if(DEFAULT == VALUE)values = defineIterator(Base, NAME, values, 'values');
  else entries = defineIterator(Base, NAME, entries, 'entries');
  if(DEFAULT){
    $define(PROTO + FORCED * BUGGY_ITERATORS, NAME, {
      entries: entries,
      keys: IS_SET ? values : createIter(KEY),
      values: values
    });
  }
}
function iterResult(done, value){
  return {value: value, done: !!done};
}
function isIterable(it){
  var O      = Object(it)
    , Symbol = global[SYMBOL]
    , hasExt = (Symbol && Symbol[ITERATOR] || FF_ITERATOR) in O;
  return hasExt || SYMBOL_ITERATOR in O || has(Iterators, classof(O));
}
function getIterator(it){
  var Symbol  = global[SYMBOL]
    , ext     = it[Symbol && Symbol[ITERATOR] || FF_ITERATOR]
    , getIter = ext || it[SYMBOL_ITERATOR] || Iterators[classof(it)];
  return assertObject(getIter.call(it));
}
function stepCall(fn, value, entries){
  return entries ? invoke(fn, value) : fn(value);
}
function checkDangerIterClosing(fn){
  var danger = true;
  var O = {
    next: function(){ throw 1 },
    'return': function(){ danger = false }
  };
  O[SYMBOL_ITERATOR] = returnThis;
  try {
    fn(O);
  } catch(e){}
  return danger;
}
function closeIterator(iterator){
  var ret = iterator['return'];
  if(ret !== undefined)ret.call(iterator);
}
function safeIterClose(exec, iterator){
  try {
    exec(iterator);
  } catch(e){
    closeIterator(iterator);
    throw e;
  }
}
function forOf(iterable, entries, fn, that){
  safeIterClose(function(iterator){
    var f = ctx(fn, that, entries ? 2 : 1)
      , step;
    while(!(step = iterator.next()).done)if(stepCall(f, step.value, entries) === false){
      return closeIterator(iterator);
    }
  }, getIterator(iterable));
}

/******************************************************************************
 * Module : es6.symbol                                                        *
 ******************************************************************************/

// ECMAScript 6 symbols shim
!function(TAG, SymbolRegistry, AllSymbols, setter){
  // 19.4.1.1 Symbol([description])
  if(!isNative(Symbol)){
    Symbol = function(description){
      assert(!(this instanceof Symbol), SYMBOL + ' is not a ' + CONSTRUCTOR);
      var tag = uid(description)
        , sym = set(create(Symbol[PROTOTYPE]), TAG, tag);
      AllSymbols[tag] = sym;
      DESC && setter && defineProperty(ObjectProto, tag, {
        configurable: true,
        set: function(value){
          hidden(this, tag, value);
        }
      });
      return sym;
    }
    hidden(Symbol[PROTOTYPE], TO_STRING, function(){
      return this[TAG];
    });
  }
  $define(GLOBAL + WRAP, {Symbol: Symbol});
  
  var symbolStatics = {
    // 19.4.2.1 Symbol.for(key)
    'for': function(key){
      return has(SymbolRegistry, key += '')
        ? SymbolRegistry[key]
        : SymbolRegistry[key] = Symbol(key);
    },
    // 19.4.2.4 Symbol.iterator
    iterator: SYMBOL_ITERATOR || getWellKnownSymbol(ITERATOR),
    // 19.4.2.5 Symbol.keyFor(sym)
    keyFor: part.call(keyOf, SymbolRegistry),
    // 19.4.2.10 Symbol.species
    species: SYMBOL_SPECIES,
    // 19.4.2.13 Symbol.toStringTag
    toStringTag: SYMBOL_TAG = getWellKnownSymbol(TO_STRING_TAG, true),
    // 19.4.2.14 Symbol.unscopables
    unscopables: SYMBOL_UNSCOPABLES,
    pure: safeSymbol,
    set: set,
    useSetter: function(){setter = true},
    useSimple: function(){setter = false}
  };
  // 19.4.2.2 Symbol.hasInstance
  // 19.4.2.3 Symbol.isConcatSpreadable
  // 19.4.2.6 Symbol.match
  // 19.4.2.8 Symbol.replace
  // 19.4.2.9 Symbol.search
  // 19.4.2.11 Symbol.split
  // 19.4.2.12 Symbol.toPrimitive
  forEach.call(array('hasInstance,isConcatSpreadable,match,replace,search,split,toPrimitive'),
    function(it){
      symbolStatics[it] = getWellKnownSymbol(it);
    }
  );
  $define(STATIC, SYMBOL, symbolStatics);
  
  setToStringTag(Symbol, SYMBOL);
  
  $define(STATIC + FORCED * !isNative(Symbol), OBJECT, {
    // 19.1.2.7 Object.getOwnPropertyNames(O)
    getOwnPropertyNames: function(it){
      var names = getNames(toObject(it)), result = [], key, i = 0;
      while(names.length > i)has(AllSymbols, key = names[i++]) || result.push(key);
      return result;
    },
    // 19.1.2.8 Object.getOwnPropertySymbols(O)
    getOwnPropertySymbols: function(it){
      var names = getNames(toObject(it)), result = [], key, i = 0;
      while(names.length > i)has(AllSymbols, key = names[i++]) && result.push(AllSymbols[key]);
      return result;
    }
  });
  
  // 20.2.1.9 Math[@@toStringTag]
  setToStringTag(Math, MATH, true);
  // 24.3.3 JSON[@@toStringTag]
  setToStringTag(global.JSON, 'JSON', true);
}(safeSymbol('tag'), {}, {}, true);

/******************************************************************************
 * Module : es6.object.statics                                                *
 ******************************************************************************/

!function(){
  var objectStatic = {
    // 19.1.3.1 Object.assign(target, source)
    assign: assign,
    // 19.1.3.10 Object.is(value1, value2)
    is: function(x, y){
      return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
    }
  };
  // 19.1.3.19 Object.setPrototypeOf(O, proto)
  // Works with __proto__ only. Old v8 can't works with null proto objects.
  '__proto__' in ObjectProto && function(buggy, set){
    try {
      set = ctx(call, getOwnDescriptor(ObjectProto, '__proto__').set, 2);
      set({}, ArrayProto);
    } catch(e){ buggy = true }
    objectStatic.setPrototypeOf = setPrototypeOf = setPrototypeOf || function(O, proto){
      assertObject(O);
      assert(proto === null || isObject(proto), proto, ": can't set as prototype!");
      if(buggy)O.__proto__ = proto;
      else set(O, proto);
      return O;
    }
  }();
  $define(STATIC, OBJECT, objectStatic);
}();

/******************************************************************************
 * Module : es6.object.statics-accept-primitives                              *
 ******************************************************************************/

!function(){
  // Object static methods accept primitives
  function wrapObjectMethod(key, MODE){
    var fn  = Object[key]
      , exp = core[OBJECT][key]
      , f   = 0
      , o   = {};
    if(!exp || isNative(exp)){
      o[key] = MODE == 1 ? function(it){
        return isObject(it) ? fn(it) : it;
      } : MODE == 2 ? function(it){
        return isObject(it) ? fn(it) : true;
      } : MODE == 3 ? function(it){
        return isObject(it) ? fn(it) : false;
      } : MODE == 4 ? function(it, key){
        return fn(toObject(it), key);
      } : function(it){
        return fn(toObject(it));
      };
      try { fn(DOT) }
      catch(e){ f = 1 }
      $define(STATIC + FORCED * f, OBJECT, o);
    }
  }
  wrapObjectMethod('freeze', 1);
  wrapObjectMethod('seal', 1);
  wrapObjectMethod('preventExtensions', 1);
  wrapObjectMethod('isFrozen', 2);
  wrapObjectMethod('isSealed', 2);
  wrapObjectMethod('isExtensible', 3);
  wrapObjectMethod('getOwnPropertyDescriptor', 4);
  wrapObjectMethod('getPrototypeOf');
  wrapObjectMethod('keys');
  wrapObjectMethod('getOwnPropertyNames');
}();

/******************************************************************************
 * Module : es6.number.statics                                                *
 ******************************************************************************/

!function(isInteger){
  $define(STATIC, NUMBER, {
    // 20.1.2.1 Number.EPSILON
    EPSILON: pow(2, -52),
    // 20.1.2.2 Number.isFinite(number)
    isFinite: function(it){
      return typeof it == 'number' && isFinite(it);
    },
    // 20.1.2.3 Number.isInteger(number)
    isInteger: isInteger,
    // 20.1.2.4 Number.isNaN(number)
    isNaN: sameNaN,
    // 20.1.2.5 Number.isSafeInteger(number)
    isSafeInteger: function(number){
      return isInteger(number) && abs(number) <= MAX_SAFE_INTEGER;
    },
    // 20.1.2.6 Number.MAX_SAFE_INTEGER
    MAX_SAFE_INTEGER: MAX_SAFE_INTEGER,
    // 20.1.2.10 Number.MIN_SAFE_INTEGER
    MIN_SAFE_INTEGER: -MAX_SAFE_INTEGER,
    // 20.1.2.12 Number.parseFloat(string)
    parseFloat: parseFloat,
    // 20.1.2.13 Number.parseInt(string, radix)
    parseInt: parseInt
  });
// 20.1.2.3 Number.isInteger(number)
}(Number.isInteger || function(it){
  return !isObject(it) && isFinite(it) && floor(it) === it;
});

/******************************************************************************
 * Module : es6.math                                                          *
 ******************************************************************************/

// ECMAScript 6 shim
!function(){
  // 20.2.2.28 Math.sign(x)
  var E    = Math.E
    , exp  = Math.exp
    , log  = Math.log
    , sqrt = Math.sqrt
    , sign = Math.sign || function(x){
        return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
      };
  
  // 20.2.2.5 Math.asinh(x)
  function asinh(x){
    return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : log(x + sqrt(x * x + 1));
  }
  // 20.2.2.14 Math.expm1(x)
  function expm1(x){
    return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : exp(x) - 1;
  }
    
  $define(STATIC, MATH, {
    // 20.2.2.3 Math.acosh(x)
    acosh: function(x){
      return (x = +x) < 1 ? NaN : isFinite(x) ? log(x / E + sqrt(x + 1) * sqrt(x - 1) / E) + 1 : x;
    },
    // 20.2.2.5 Math.asinh(x)
    asinh: asinh,
    // 20.2.2.7 Math.atanh(x)
    atanh: function(x){
      return (x = +x) == 0 ? x : log((1 + x) / (1 - x)) / 2;
    },
    // 20.2.2.9 Math.cbrt(x)
    cbrt: function(x){
      return sign(x = +x) * pow(abs(x), 1 / 3);
    },
    // 20.2.2.11 Math.clz32(x)
    clz32: function(x){
      return (x >>>= 0) ? 32 - x[TO_STRING](2).length : 32;
    },
    // 20.2.2.12 Math.cosh(x)
    cosh: function(x){
      return (exp(x = +x) + exp(-x)) / 2;
    },
    // 20.2.2.14 Math.expm1(x)
    expm1: expm1,
    // 20.2.2.16 Math.fround(x)
    // TODO: fallback for IE9-
    fround: function(x){
      return new Float32Array([x])[0];
    },
    // 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
    hypot: function(value1, value2){
      var sum  = 0
        , len1 = arguments.length
        , len2 = len1
        , args = Array(len1)
        , larg = -Infinity
        , arg;
      while(len1--){
        arg = args[len1] = +arguments[len1];
        if(arg == Infinity || arg == -Infinity)return Infinity;
        if(arg > larg)larg = arg;
      }
      larg = arg || 1;
      while(len2--)sum += pow(args[len2] / larg, 2);
      return larg * sqrt(sum);
    },
    // 20.2.2.18 Math.imul(x, y)
    imul: function(x, y){
      var UInt16 = 0xffff
        , xn = +x
        , yn = +y
        , xl = UInt16 & xn
        , yl = UInt16 & yn;
      return 0 | xl * yl + ((UInt16 & xn >>> 16) * yl + xl * (UInt16 & yn >>> 16) << 16 >>> 0);
    },
    // 20.2.2.20 Math.log1p(x)
    log1p: function(x){
      return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : log(1 + x);
    },
    // 20.2.2.21 Math.log10(x)
    log10: function(x){
      return log(x) / Math.LN10;
    },
    // 20.2.2.22 Math.log2(x)
    log2: function(x){
      return log(x) / Math.LN2;
    },
    // 20.2.2.28 Math.sign(x)
    sign: sign,
    // 20.2.2.30 Math.sinh(x)
    sinh: function(x){
      return (abs(x = +x) < 1) ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (E / 2);
    },
    // 20.2.2.33 Math.tanh(x)
    tanh: function(x){
      var a = expm1(x = +x)
        , b = expm1(-x);
      return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
    },
    // 20.2.2.34 Math.trunc(x)
    trunc: trunc
  });
}();

/******************************************************************************
 * Module : es6.string                                                        *
 ******************************************************************************/

!function(fromCharCode){
  function assertNotRegExp(it){
    if(cof(it) == REGEXP)throw TypeError();
  }
  
  $define(STATIC, STRING, {
    // 21.1.2.2 String.fromCodePoint(...codePoints)
    fromCodePoint: function(x){
      var res = []
        , len = arguments.length
        , i   = 0
        , code
      while(len > i){
        code = +arguments[i++];
        if(toIndex(code, 0x10ffff) !== code)throw RangeError(code + ' is not a valid code point');
        res.push(code < 0x10000
          ? fromCharCode(code)
          : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00)
        );
      } return res.join('');
    },
    // 21.1.2.4 String.raw(callSite, ...substitutions)
    raw: function(callSite){
      var raw = toObject(callSite.raw)
        , len = toLength(raw.length)
        , sln = arguments.length
        , res = []
        , i   = 0;
      while(len > i){
        res.push(String(raw[i++]));
        if(i < sln)res.push(String(arguments[i]));
      } return res.join('');
    }
  });
  
  $define(PROTO, STRING, {
    // 21.1.3.3 String.prototype.codePointAt(pos)
    codePointAt: createPointAt(false),
    // 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])
    endsWith: function(searchString /*, endPosition = @length */){
      assertNotRegExp(searchString);
      var that = String(assertDefined(this))
        , endPosition = arguments[1]
        , len = toLength(that.length)
        , end = endPosition === undefined ? len : min(toLength(endPosition), len);
      searchString += '';
      return that.slice(end - searchString.length, end) === searchString;
    },
    // 21.1.3.7 String.prototype.includes(searchString, position = 0)
    includes: function(searchString /*, position = 0 */){
      assertNotRegExp(searchString);
      return !!~String(assertDefined(this)).indexOf(searchString, arguments[1]);
    },
    // 21.1.3.13 String.prototype.repeat(count)
    repeat: function(count){
      var str = String(assertDefined(this))
        , res = ''
        , n   = toInteger(count);
      if(0 > n || n == Infinity)throw RangeError("Count can't be negative");
      for(;n > 0; (n >>>= 1) && (str += str))if(n & 1)res += str;
      return res;
    },
    // 21.1.3.18 String.prototype.startsWith(searchString [, position ])
    startsWith: function(searchString /*, position = 0 */){
      assertNotRegExp(searchString);
      var that  = String(assertDefined(this))
        , index = toLength(min(arguments[1], that.length));
      searchString += '';
      return that.slice(index, index + searchString.length) === searchString;
    }
  });
}(String.fromCharCode);

/******************************************************************************
 * Module : es6.array.statics                                                 *
 ******************************************************************************/

!function(){
  $define(STATIC + FORCED * checkDangerIterClosing(Array.from), ARRAY, {
    // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
    from: function(arrayLike/*, mapfn = undefined, thisArg = undefined*/){
      var O       = Object(assertDefined(arrayLike))
        , mapfn   = arguments[1]
        , mapping = mapfn !== undefined
        , f       = mapping ? ctx(mapfn, arguments[2], 2) : undefined
        , index   = 0
        , length, result, step;
      if(isIterable(O)){
        result = new (generic(this, Array));
        safeIterClose(function(iterator){
          for(; !(step = iterator.next()).done; index++){
            result[index] = mapping ? f(step.value, index) : step.value;
          }
        }, getIterator(O));
      } else {
        result = new (generic(this, Array))(length = toLength(O.length));
        for(; length > index; index++){
          result[index] = mapping ? f(O[index], index) : O[index];
        }
      }
      result.length = index;
      return result;
    }
  });
  
  $define(STATIC, ARRAY, {
    // 22.1.2.3 Array.of( ...items)
    of: function(/* ...args */){
      var index  = 0
        , length = arguments.length
        , result = new (generic(this, Array))(length);
      while(length > index)result[index] = arguments[index++];
      result.length = length;
      return result;
    }
  });
  
  setSpecies(Array);
}();

/******************************************************************************
 * Module : es6.array.prototype                                               *
 ******************************************************************************/

!function(){
  $define(PROTO, ARRAY, {
    // 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
    copyWithin: function(target /* = 0 */, start /* = 0, end = @length */){
      var O     = Object(assertDefined(this))
        , len   = toLength(O.length)
        , to    = toIndex(target, len)
        , from  = toIndex(start, len)
        , end   = arguments[2]
        , fin   = end === undefined ? len : toIndex(end, len)
        , count = min(fin - from, len - to)
        , inc   = 1;
      if(from < to && to < from + count){
        inc  = -1;
        from = from + count - 1;
        to   = to + count - 1;
      }
      while(count-- > 0){
        if(from in O)O[to] = O[from];
        else delete O[to];
        to += inc;
        from += inc;
      } return O;
    },
    // 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
    fill: function(value /*, start = 0, end = @length */){
      var O      = Object(assertDefined(this))
        , length = toLength(O.length)
        , index  = toIndex(arguments[1], length)
        , end    = arguments[2]
        , endPos = end === undefined ? length : toIndex(end, length);
      while(endPos > index)O[index++] = value;
      return O;
    },
    // 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)
    find: createArrayMethod(5),
    // 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)
    findIndex: createArrayMethod(6)
  });
  
  if(framework){
    // 22.1.3.31 Array.prototype[@@unscopables]
    forEach.call(array('find,findIndex,fill,copyWithin,entries,keys,values'), function(it){
      ArrayUnscopables[it] = true;
    });
    SYMBOL_UNSCOPABLES in ArrayProto || hidden(ArrayProto, SYMBOL_UNSCOPABLES, ArrayUnscopables);
  }
}();

/******************************************************************************
 * Module : es6.iterators                                                     *
 ******************************************************************************/

!function(at){
  // 22.1.3.4 Array.prototype.entries()
  // 22.1.3.13 Array.prototype.keys()
  // 22.1.3.29 Array.prototype.values()
  // 22.1.3.30 Array.prototype[@@iterator]()
  defineStdIterators(Array, ARRAY, function(iterated, kind){
    set(this, ITER, {o: toObject(iterated), i: 0, k: kind});
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
  }, function(){
    var iter  = this[ITER]
      , O     = iter.o
      , kind  = iter.k
      , index = iter.i++;
    if(!O || index >= O.length){
      iter.o = undefined;
      return iterResult(1);
    }
    if(kind == KEY)  return iterResult(0, index);
    if(kind == VALUE)return iterResult(0, O[index]);
                     return iterResult(0, [index, O[index]]);
  }, VALUE);
  
  // argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
  Iterators[ARGUMENTS] = Iterators[ARRAY];
  
  // 21.1.3.27 String.prototype[@@iterator]()
  defineStdIterators(String, STRING, function(iterated){
    set(this, ITER, {o: String(iterated), i: 0});
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
  }, function(){
    var iter  = this[ITER]
      , O     = iter.o
      , index = iter.i
      , point;
    if(index >= O.length)return iterResult(1);
    point = at.call(O, index);
    iter.i += point.length;
    return iterResult(0, point);
  });
}(createPointAt(true));

/******************************************************************************
 * Module : web.immediate                                                     *
 ******************************************************************************/

// setImmediate shim
// Node.js 0.9+ & IE10+ has setImmediate, else:
isFunction(setImmediate) && isFunction(clearImmediate) || function(ONREADYSTATECHANGE){
  var postMessage      = global.postMessage
    , addEventListener = global.addEventListener
    , MessageChannel   = global.MessageChannel
    , counter          = 0
    , queue            = {}
    , defer, channel, port;
  setImmediate = function(fn){
    var args = [], i = 1;
    while(arguments.length > i)args.push(arguments[i++]);
    queue[++counter] = function(){
      invoke(isFunction(fn) ? fn : Function(fn), args);
    }
    defer(counter);
    return counter;
  }
  clearImmediate = function(id){
    delete queue[id];
  }
  function run(id){
    if(has(queue, id)){
      var fn = queue[id];
      delete queue[id];
      fn();
    }
  }
  function listner(event){
    run(event.data);
  }
  // Node.js 0.8-
  if(NODE){
    defer = function(id){
      nextTick(part.call(run, id));
    }
  // Modern browsers, skip implementation for WebWorkers
  // IE8 has postMessage, but it's sync & typeof its postMessage is object
  } else if(addEventListener && isFunction(postMessage) && !global.importScripts){
    defer = function(id){
      postMessage(id, '*');
    }
    addEventListener('message', listner, false);
  // WebWorkers
  } else if(isFunction(MessageChannel)){
    channel = new MessageChannel;
    port    = channel.port2;
    channel.port1.onmessage = listner;
    defer = ctx(port.postMessage, port, 1);
  // IE8-
  } else if(document && ONREADYSTATECHANGE in document[CREATE_ELEMENT]('script')){
    defer = function(id){
      html.appendChild(document[CREATE_ELEMENT]('script'))[ONREADYSTATECHANGE] = function(){
        html.removeChild(this);
        run(id);
      }
    }
  // Rest old browsers
  } else {
    defer = function(id){
      setTimeout(run, 0, id);
    }
  }
}('onreadystatechange');
$define(GLOBAL + BIND, {
  setImmediate:   setImmediate,
  clearImmediate: clearImmediate
});

/******************************************************************************
 * Module : es6.promise                                                       *
 ******************************************************************************/

// ES6 promises shim
// Based on https://github.com/getify/native-promise-only/
!function(Promise, test){
  isFunction(Promise) && isFunction(Promise.resolve)
  && Promise.resolve(test = new Promise(function(){})) == test
  || function(asap, RECORD){
    function isThenable(it){
      var then;
      if(isObject(it))then = it.then;
      return isFunction(then) ? then : false;
    }
    function handledRejectionOrHasOnRejected(promise){
      var record = promise[RECORD]
        , chain  = record.c
        , i      = 0
        , react;
      if(record.h)return true;
      while(chain.length > i){
        react = chain[i++];
        if(react.fail || handledRejectionOrHasOnRejected(react.P))return true;
      }
    }
    function notify(record, reject){
      var chain = record.c;
      if(reject || chain.length)asap(function(){
        var promise = record.p
          , value   = record.v
          , ok      = record.s == 1
          , i       = 0;
        if(reject && !handledRejectionOrHasOnRejected(promise)){
          setTimeout(function(){
            if(!handledRejectionOrHasOnRejected(promise)){
              if(NODE){
                if(!process.emit('unhandledRejection', value, promise)){
                  // default node.js behavior
                }
              } else if(isFunction(console.error)){
                console.error('Unhandled promise rejection', value);
              }
            }
          }, 1e3);
        } else while(chain.length > i)!function(react){
          var cb = ok ? react.ok : react.fail
            , ret, then;
          try {
            if(cb){
              if(!ok)record.h = true;
              ret = cb === true ? value : cb(value);
              if(ret === react.P){
                react.rej(TypeError(PROMISE + '-chain cycle'));
              } else if(then = isThenable(ret)){
                then.call(ret, react.res, react.rej);
              } else react.res(ret);
            } else react.rej(value);
          } catch(err){
            react.rej(err);
          }
        }(chain[i++]);
        chain.length = 0;
      });
    }
    function resolve(value){
      var record = this
        , then, wrapper;
      if(record.d)return;
      record.d = true;
      record = record.r || record; // unwrap
      try {
        if(then = isThenable(value)){
          wrapper = {r: record, d: false}; // wrap
          then.call(value, ctx(resolve, wrapper, 1), ctx(reject, wrapper, 1));
        } else {
          record.v = value;
          record.s = 1;
          notify(record);
        }
      } catch(err){
        reject.call(wrapper || {r: record, d: false}, err); // wrap
      }
    }
    function reject(value){
      var record = this;
      if(record.d)return;
      record.d = true;
      record = record.r || record; // unwrap
      record.v = value;
      record.s = 2;
      notify(record, true);
    }
    function getConstructor(C){
      var S = assertObject(C)[SYMBOL_SPECIES];
      return S != undefined ? S : C;
    }
    // 25.4.3.1 Promise(executor)
    Promise = function(executor){
      assertFunction(executor);
      assertInstance(this, Promise, PROMISE);
      var record = {
        p: this,      // promise
        c: [],        // chain
        s: 0,         // state
        d: false,     // done
        v: undefined, // value
        h: false      // handled rejection
      };
      hidden(this, RECORD, record);
      try {
        executor(ctx(resolve, record, 1), ctx(reject, record, 1));
      } catch(err){
        reject.call(record, err);
      }
    }
    assignHidden(Promise[PROTOTYPE], {
      // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
      then: function(onFulfilled, onRejected){
        var S = assertObject(assertObject(this)[CONSTRUCTOR])[SYMBOL_SPECIES];
        var react = {
          ok:   isFunction(onFulfilled) ? onFulfilled : true,
          fail: isFunction(onRejected)  ? onRejected  : false
        } , P = react.P = new (S != undefined ? S : Promise)(function(resolve, reject){
          react.res = assertFunction(resolve);
          react.rej = assertFunction(reject);
        }), record = this[RECORD];
        record.c.push(react);
        record.s && notify(record);
        return P;
      },
      // 25.4.5.1 Promise.prototype.catch(onRejected)
      'catch': function(onRejected){
        return this.then(undefined, onRejected);
      }
    });
    assignHidden(Promise, {
      // 25.4.4.1 Promise.all(iterable)
      all: function(iterable){
        var Promise = getConstructor(this)
          , values  = [];
        return new Promise(function(resolve, reject){
          forOf(iterable, false, push, values);
          var remaining = values.length
            , results   = Array(remaining);
          if(remaining)forEach.call(values, function(promise, index){
            Promise.resolve(promise).then(function(value){
              results[index] = value;
              --remaining || resolve(results);
            }, reject);
          });
          else resolve(results);
        });
      },
      // 25.4.4.4 Promise.race(iterable)
      race: function(iterable){
        var Promise = getConstructor(this);
        return new Promise(function(resolve, reject){
          forOf(iterable, false, function(promise){
            Promise.resolve(promise).then(resolve, reject);
          });
        });
      },
      // 25.4.4.5 Promise.reject(r)
      reject: function(r){
        return new (getConstructor(this))(function(resolve, reject){
          reject(r);
        });
      },
      // 25.4.4.6 Promise.resolve(x)
      resolve: function(x){
        return isObject(x) && RECORD in x && getPrototypeOf(x) === this[PROTOTYPE]
          ? x : new (getConstructor(this))(function(resolve, reject){
            resolve(x);
          });
      }
    });
  }(nextTick || setImmediate, safeSymbol('record'));
  setToStringTag(Promise, PROMISE);
  setSpecies(Promise);
  $define(GLOBAL + FORCED * !isNative(Promise), {Promise: Promise});
}(global[PROMISE]);

/******************************************************************************
 * Module : es6.collections                                                   *
 ******************************************************************************/

// ECMAScript 6 collections shim
!function(){
  var UID   = safeSymbol('uid')
    , O1    = safeSymbol('O1')
    , WEAK  = safeSymbol('weak')
    , LEAK  = safeSymbol('leak')
    , LAST  = safeSymbol('last')
    , FIRST = safeSymbol('first')
    , SIZE  = DESC ? safeSymbol('size') : 'size'
    , uid   = 0
    , tmp   = {};
  
  function getCollection(C, NAME, methods, commonMethods, isMap, isWeak){
    var ADDER = isMap ? 'set' : 'add'
      , proto = C && C[PROTOTYPE]
      , O     = {};
    function initFromIterable(that, iterable){
      if(iterable != undefined)forOf(iterable, isMap, that[ADDER], that);
      return that;
    }
    function fixSVZ(key, chain){
      var method = proto[key];
      if(framework)proto[key] = function(a, b){
        var result = method.call(this, a === 0 ? 0 : a, b);
        return chain ? this : result;
      };
    }
    if(!isNative(C) || !(isWeak || (!BUGGY_ITERATORS && has(proto, FOR_EACH) && has(proto, 'entries')))){
      // create collection constructor
      C = isWeak
        ? function(iterable){
            assertInstance(this, C, NAME);
            set(this, UID, uid++);
            initFromIterable(this, iterable);
          }
        : function(iterable){
            var that = this;
            assertInstance(that, C, NAME);
            set(that, O1, create(null));
            set(that, SIZE, 0);
            set(that, LAST, undefined);
            set(that, FIRST, undefined);
            initFromIterable(that, iterable);
          };
      assignHidden(assignHidden(C[PROTOTYPE], methods), commonMethods);
      isWeak || !DESC || defineProperty(C[PROTOTYPE], 'size', {get: function(){
        return assertDefined(this[SIZE]);
      }});
    } else {
      var Native = C
        , inst   = new C
        , chain  = inst[ADDER](isWeak ? {} : -0, 1)
        , buggyZero;
      // wrap to init collections from iterable
      if(checkDangerIterClosing(function(O){ new C(O) })){
        C = function(iterable){
          assertInstance(this, C, NAME);
          return initFromIterable(new Native, iterable);
        }
        C[PROTOTYPE] = proto;
        if(framework)proto[CONSTRUCTOR] = C;
      }
      isWeak || inst[FOR_EACH](function(val, key){
        buggyZero = 1 / key === -Infinity;
      });
      // fix converting -0 key to +0
      if(buggyZero){
        fixSVZ('delete');
        fixSVZ('has');
        isMap && fixSVZ('get');
      }
      // + fix .add & .set for chaining
      if(buggyZero || chain !== inst)fixSVZ(ADDER, true);
    }
    setToStringTag(C, NAME);
    setSpecies(C);
    
    O[NAME] = C;
    $define(GLOBAL + WRAP + FORCED * !isNative(C), O);
    
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    isWeak || defineStdIterators(C, NAME, function(iterated, kind){
      set(this, ITER, {o: iterated, k: kind});
    }, function(){
      var iter  = this[ITER]
        , kind  = iter.k
        , entry = iter.l;
      // revert to the last existing entry
      while(entry && entry.r)entry = entry.p;
      // get next entry
      if(!iter.o || !(iter.l = entry = entry ? entry.n : iter.o[FIRST])){
        // or finish the iteration
        iter.o = undefined;
        return iterResult(1);
      }
      // return step by kind
      if(kind == KEY)  return iterResult(0, entry.k);
      if(kind == VALUE)return iterResult(0, entry.v);
                       return iterResult(0, [entry.k, entry.v]);   
    }, isMap ? KEY+VALUE : VALUE, !isMap);
    
    return C;
  }
  
  function fastKey(it, create){
    // return primitive with prefix
    if(!isObject(it))return (typeof it == 'string' ? 'S' : 'P') + it;
    // can't set id to frozen object
    if(isFrozen(it))return 'F';
    if(!has(it, UID)){
      // not necessary to add id
      if(!create)return 'E';
      // add missing object id
      hidden(it, UID, ++uid);
    // return object id with prefix
    } return 'O' + it[UID];
  }
  function getEntry(that, key){
    // fast case
    var index = fastKey(key), entry;
    if(index != 'F')return that[O1][index];
    // frozen object case
    for(entry = that[FIRST]; entry; entry = entry.n){
      if(entry.k == key)return entry;
    }
  }
  function def(that, key, value){
    var entry = getEntry(that, key)
      , prev, index;
    // change existing entry
    if(entry)entry.v = value;
    // create new entry
    else {
      that[LAST] = entry = {
        i: index = fastKey(key, true), // <- index
        k: key,                        // <- key
        v: value,                      // <- value
        p: prev = that[LAST],          // <- previous entry
        n: undefined,                  // <- next entry
        r: false                       // <- removed
      };
      if(!that[FIRST])that[FIRST] = entry;
      if(prev)prev.n = entry;
      that[SIZE]++;
      // add to index
      if(index != 'F')that[O1][index] = entry;
    } return that;
  }

  var collectionMethods = {
    // 23.1.3.1 Map.prototype.clear()
    // 23.2.3.2 Set.prototype.clear()
    clear: function(){
      for(var that = this, data = that[O1], entry = that[FIRST]; entry; entry = entry.n){
        entry.r = true;
        if(entry.p)entry.p = entry.p.n = undefined;
        delete data[entry.i];
      }
      that[FIRST] = that[LAST] = undefined;
      that[SIZE] = 0;
    },
    // 23.1.3.3 Map.prototype.delete(key)
    // 23.2.3.4 Set.prototype.delete(value)
    'delete': function(key){
      var that  = this
        , entry = getEntry(that, key);
      if(entry){
        var next = entry.n
          , prev = entry.p;
        delete that[O1][entry.i];
        entry.r = true;
        if(prev)prev.n = next;
        if(next)next.p = prev;
        if(that[FIRST] == entry)that[FIRST] = next;
        if(that[LAST] == entry)that[LAST] = prev;
        that[SIZE]--;
      } return !!entry;
    },
    // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
    // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
    forEach: function(callbackfn /*, that = undefined */){
      var f = ctx(callbackfn, arguments[1], 3)
        , entry;
      while(entry = entry ? entry.n : this[FIRST]){
        f(entry.v, entry.k, this);
        // revert to the last existing entry
        while(entry && entry.r)entry = entry.p;
      }
    },
    // 23.1.3.7 Map.prototype.has(key)
    // 23.2.3.7 Set.prototype.has(value)
    has: function(key){
      return !!getEntry(this, key);
    }
  }
  
  // 23.1 Map Objects
  Map = getCollection(Map, MAP, {
    // 23.1.3.6 Map.prototype.get(key)
    get: function(key){
      var entry = getEntry(this, key);
      return entry && entry.v;
    },
    // 23.1.3.9 Map.prototype.set(key, value)
    set: function(key, value){
      return def(this, key === 0 ? 0 : key, value);
    }
  }, collectionMethods, true);
  
  // 23.2 Set Objects
  Set = getCollection(Set, SET, {
    // 23.2.3.1 Set.prototype.add(value)
    add: function(value){
      return def(this, value = value === 0 ? 0 : value, value);
    }
  }, collectionMethods);
  
  function defWeak(that, key, value){
    if(isFrozen(assertObject(key)))leakStore(that).set(key, value);
    else {
      has(key, WEAK) || hidden(key, WEAK, {});
      key[WEAK][that[UID]] = value;
    } return that;
  }
  function leakStore(that){
    return that[LEAK] || hidden(that, LEAK, new Map)[LEAK];
  }
  
  var weakMethods = {
    // 23.3.3.2 WeakMap.prototype.delete(key)
    // 23.4.3.3 WeakSet.prototype.delete(value)
    'delete': function(key){
      if(!isObject(key))return false;
      if(isFrozen(key))return leakStore(this)['delete'](key);
      return has(key, WEAK) && has(key[WEAK], this[UID]) && delete key[WEAK][this[UID]];
    },
    // 23.3.3.4 WeakMap.prototype.has(key)
    // 23.4.3.4 WeakSet.prototype.has(value)
    has: function(key){
      if(!isObject(key))return false;
      if(isFrozen(key))return leakStore(this).has(key);
      return has(key, WEAK) && has(key[WEAK], this[UID]);
    }
  };
  
  // 23.3 WeakMap Objects
  WeakMap = getCollection(WeakMap, WEAKMAP, {
    // 23.3.3.3 WeakMap.prototype.get(key)
    get: function(key){
      if(isObject(key)){
        if(isFrozen(key))return leakStore(this).get(key);
        if(has(key, WEAK))return key[WEAK][this[UID]];
      }
    },
    // 23.3.3.5 WeakMap.prototype.set(key, value)
    set: function(key, value){
      return defWeak(this, key, value);
    }
  }, weakMethods, true, true);
  
  // IE11 WeakMap frozen keys fix
  if(framework && new WeakMap().set(Object.freeze(tmp), 7).get(tmp) != 7){
    forEach.call(array('delete,has,get,set'), function(key){
      var method = WeakMap[PROTOTYPE][key];
      WeakMap[PROTOTYPE][key] = function(a, b){
        // store frozen objects on leaky map
        if(isObject(a) && isFrozen(a)){
          var result = leakStore(this)[key](a, b);
          return key == 'set' ? this : result;
        // store all the rest on native weakmap
        } return method.call(this, a, b);
      };
    });
  }
  
  // 23.4 WeakSet Objects
  WeakSet = getCollection(WeakSet, WEAKSET, {
    // 23.4.3.1 WeakSet.prototype.add(value)
    add: function(value){
      return defWeak(this, value, true);
    }
  }, weakMethods, false, true);
}();

/******************************************************************************
 * Module : es6.reflect                                                       *
 ******************************************************************************/

!function(){
  function Enumerate(iterated){
    var keys = [], key;
    for(key in iterated)keys.push(key);
    set(this, ITER, {o: iterated, a: keys, i: 0});
  }
  createIterator(Enumerate, OBJECT, function(){
    var iter = this[ITER]
      , keys = iter.a
      , key;
    do {
      if(iter.i >= keys.length)return iterResult(1);
    } while(!((key = keys[iter.i++]) in iter.o));
    return iterResult(0, key);
  });
  
  function wrap(fn){
    return function(it){
      assertObject(it);
      try {
        return fn.apply(undefined, arguments), true;
      } catch(e){
        return false;
      }
    }
  }
  
  function reflectGet(target, propertyKey/*, receiver*/){
    var receiver = arguments.length < 3 ? target : arguments[2]
      , desc = getOwnDescriptor(assertObject(target), propertyKey), proto;
    if(desc)return has(desc, 'value')
      ? desc.value
      : desc.get === undefined
        ? undefined
        : desc.get.call(receiver);
    return isObject(proto = getPrototypeOf(target))
      ? reflectGet(proto, propertyKey, receiver)
      : undefined;
  }
  function reflectSet(target, propertyKey, V/*, receiver*/){
    var receiver = arguments.length < 4 ? target : arguments[3]
      , ownDesc  = getOwnDescriptor(assertObject(target), propertyKey)
      , existingDescriptor, proto;
    if(!ownDesc){
      if(isObject(proto = getPrototypeOf(target))){
        return reflectSet(proto, propertyKey, V, receiver);
      }
      ownDesc = descriptor(0);
    }
    if(has(ownDesc, 'value')){
      if(ownDesc.writable === false || !isObject(receiver))return false;
      existingDescriptor = getOwnDescriptor(receiver, propertyKey) || descriptor(0);
      existingDescriptor.value = V;
      return defineProperty(receiver, propertyKey, existingDescriptor), true;
    }
    return ownDesc.set === undefined
      ? false
      : (ownDesc.set.call(receiver, V), true);
  }
  var isExtensible = Object.isExtensible || returnIt;
  
  var reflect = {
    // 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
    apply: ctx(call, apply, 3),
    // 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
    construct: function(target, argumentsList /*, newTarget*/){
      var proto    = assertFunction(arguments.length < 3 ? target : arguments[2])[PROTOTYPE]
        , instance = create(isObject(proto) ? proto : ObjectProto)
        , result   = apply.call(target, instance, argumentsList);
      return isObject(result) ? result : instance;
    },
    // 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
    defineProperty: wrap(defineProperty),
    // 26.1.4 Reflect.deleteProperty(target, propertyKey)
    deleteProperty: function(target, propertyKey){
      var desc = getOwnDescriptor(assertObject(target), propertyKey);
      return desc && !desc.configurable ? false : delete target[propertyKey];
    },
    // 26.1.5 Reflect.enumerate(target)
    enumerate: function(target){
      return new Enumerate(assertObject(target));
    },
    // 26.1.6 Reflect.get(target, propertyKey [, receiver])
    get: reflectGet,
    // 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
    getOwnPropertyDescriptor: function(target, propertyKey){
      return getOwnDescriptor(assertObject(target), propertyKey);
    },
    // 26.1.8 Reflect.getPrototypeOf(target)
    getPrototypeOf: function(target){
      return getPrototypeOf(assertObject(target));
    },
    // 26.1.9 Reflect.has(target, propertyKey)
    has: function(target, propertyKey){
      return propertyKey in target;
    },
    // 26.1.10 Reflect.isExtensible(target)
    isExtensible: function(target){
      return !!isExtensible(assertObject(target));
    },
    // 26.1.11 Reflect.ownKeys(target)
    ownKeys: ownKeys,
    // 26.1.12 Reflect.preventExtensions(target)
    preventExtensions: wrap(Object.preventExtensions || returnIt),
    // 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
    set: reflectSet
  }
  // 26.1.14 Reflect.setPrototypeOf(target, proto)
  if(setPrototypeOf)reflect.setPrototypeOf = function(target, proto){
    return setPrototypeOf(assertObject(target), proto), true;
  };
  
  $define(GLOBAL, {Reflect: {}});
  $define(STATIC, 'Reflect', reflect);
}();

/******************************************************************************
 * Module : es7.proposals                                                     *
 ******************************************************************************/

!function(){
  $define(PROTO, ARRAY, {
    // https://github.com/domenic/Array.prototype.includes
    includes: createArrayContains(true)
  });
  $define(PROTO, STRING, {
    // https://github.com/mathiasbynens/String.prototype.at
    at: createPointAt(true)
  });
  
  function createObjectToArray(isEntries){
    return function(object){
      var O      = toObject(object)
        , keys   = getKeys(object)
        , length = keys.length
        , i      = 0
        , result = Array(length)
        , key;
      if(isEntries)while(length > i)result[i] = [key = keys[i++], O[key]];
      else while(length > i)result[i] = O[keys[i++]];
      return result;
    }
  }
  $define(STATIC, OBJECT, {
    // https://gist.github.com/WebReflection/9353781
    getOwnPropertyDescriptors: function(object){
      var O      = toObject(object)
        , result = {};
      forEach.call(ownKeys(O), function(key){
        defineProperty(result, key, descriptor(0, getOwnDescriptor(O, key)));
      });
      return result;
    },
    // https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-04/apr-9.md#51-objectentries-objectvalues
    values:  createObjectToArray(false),
    entries: createObjectToArray(true)
  });
  $define(STATIC, REGEXP, {
    // https://gist.github.com/kangax/9698100
    escape: createReplacer(/([\\\-[\]{}()*+?.,^$|])/g, '\\$1', true)
  });
}();

/******************************************************************************
 * Module : es7.abstract-refs                                                 *
 ******************************************************************************/

// https://github.com/zenparsing/es-abstract-refs
!function(REFERENCE){
  REFERENCE_GET = getWellKnownSymbol(REFERENCE+'Get', true);
  var REFERENCE_SET = getWellKnownSymbol(REFERENCE+SET, true)
    , REFERENCE_DELETE = getWellKnownSymbol(REFERENCE+'Delete', true);
  
  $define(STATIC, SYMBOL, {
    referenceGet: REFERENCE_GET,
    referenceSet: REFERENCE_SET,
    referenceDelete: REFERENCE_DELETE
  });
  
  hidden(FunctionProto, REFERENCE_GET, returnThis);
  
  function setMapMethods(Constructor){
    if(Constructor){
      var MapProto = Constructor[PROTOTYPE];
      hidden(MapProto, REFERENCE_GET, MapProto.get);
      hidden(MapProto, REFERENCE_SET, MapProto.set);
      hidden(MapProto, REFERENCE_DELETE, MapProto['delete']);
    }
  }
  setMapMethods(Map);
  setMapMethods(WeakMap);
}('reference');

/******************************************************************************
 * Module : core.dict                                                         *
 ******************************************************************************/

!function(DICT){
  Dict = function(iterable){
    var dict = create(null);
    if(iterable != undefined){
      if(isIterable(iterable)){
        forOf(iterable, true, function(key, value){
          dict[key] = value;
        });
      } else assign(dict, iterable);
    }
    return dict;
  }
  Dict[PROTOTYPE] = null;
  
  function DictIterator(iterated, kind){
    set(this, ITER, {o: toObject(iterated), a: getKeys(iterated), i: 0, k: kind});
  }
  createIterator(DictIterator, DICT, function(){
    var iter = this[ITER]
      , O    = iter.o
      , keys = iter.a
      , kind = iter.k
      , key;
    do {
      if(iter.i >= keys.length){
        iter.o = undefined;
        return iterResult(1);
      }
    } while(!has(O, key = keys[iter.i++]));
    if(kind == KEY)  return iterResult(0, key);
    if(kind == VALUE)return iterResult(0, O[key]);
                     return iterResult(0, [key, O[key]]);
  });
  function createDictIter(kind){
    return function(it){
      return new DictIterator(it, kind);
    }
  }
  
  /*
   * 0 -> forEach
   * 1 -> map
   * 2 -> filter
   * 3 -> some
   * 4 -> every
   * 5 -> find
   * 6 -> findKey
   * 7 -> mapPairs
   */
  function createDictMethod(type){
    var isMap    = type == 1
      , isEvery  = type == 4;
    return function(object, callbackfn, that /* = undefined */){
      var f      = ctx(callbackfn, that, 3)
        , O      = toObject(object)
        , result = isMap || type == 7 || type == 2 ? new (generic(this, Dict)) : undefined
        , key, val, res;
      for(key in O)if(has(O, key)){
        val = O[key];
        res = f(val, key, object);
        if(type){
          if(isMap)result[key] = res;             // map
          else if(res)switch(type){
            case 2: result[key] = val; break      // filter
            case 3: return true;                  // some
            case 5: return val;                   // find
            case 6: return key;                   // findKey
            case 7: result[res[0]] = res[1];      // mapPairs
          } else if(isEvery)return false;         // every
        }
      }
      return type == 3 || isEvery ? isEvery : result;
    }
  }
  function createDictReduce(isTurn){
    return function(object, mapfn, init){
      assertFunction(mapfn);
      var O      = toObject(object)
        , keys   = getKeys(O)
        , length = keys.length
        , i      = 0
        , memo, key, result;
      if(isTurn)memo = init == undefined ? new (generic(this, Dict)) : Object(init);
      else if(arguments.length < 3){
        assert(length, REDUCE_ERROR);
        memo = O[keys[i++]];
      } else memo = Object(init);
      while(length > i)if(has(O, key = keys[i++])){
        result = mapfn(memo, O[key], key, object);
        if(isTurn){
          if(result === false)break;
        } else memo = result;
      }
      return memo;
    }
  }
  var findKey = createDictMethod(6);
  function includes(object, el){
    return (el == el ? keyOf(object, el) : findKey(object, sameNaN)) !== undefined;
  }
  
  var dictMethods = {
    keys:    createDictIter(KEY),
    values:  createDictIter(VALUE),
    entries: createDictIter(KEY+VALUE),
    forEach: createDictMethod(0),
    map:     createDictMethod(1),
    filter:  createDictMethod(2),
    some:    createDictMethod(3),
    every:   createDictMethod(4),
    find:    createDictMethod(5),
    findKey: findKey,
    mapPairs:createDictMethod(7),
    reduce:  createDictReduce(false),
    turn:    createDictReduce(true),
    keyOf:   keyOf,
    includes:includes,
    // Has / get / set own property
    has: has,
    get: get,
    set: createDefiner(0),
    isDict: function(it){
      return isObject(it) && getPrototypeOf(it) === Dict[PROTOTYPE];
    }
  };
  
  if(REFERENCE_GET)for(var key in dictMethods)!function(fn){
    function method(){
      for(var args = [this], i = 0; i < arguments.length;)args.push(arguments[i++]);
      return invoke(fn, args);
    }
    fn[REFERENCE_GET] = function(){
      return method;
    }
  }(dictMethods[key]);
  
  $define(GLOBAL + FORCED, {Dict: assignHidden(Dict, dictMethods)});
}('Dict');

/******************************************************************************
 * Module : core.$for                                                         *
 ******************************************************************************/

!function(ENTRIES, FN){  
  function $for(iterable, entries){
    if(!(this instanceof $for))return new $for(iterable, entries);
    this[ITER]    = getIterator(iterable);
    this[ENTRIES] = !!entries;
  }
  
  createIterator($for, 'Wrapper', function(){
    return this[ITER].next();
  });
  var $forProto = $for[PROTOTYPE];
  setIterator($forProto, function(){
    return this[ITER]; // unwrap
  });
  
  function createChainIterator(next){
    function Iter(I, fn, that){
      this[ITER]    = getIterator(I);
      this[ENTRIES] = I[ENTRIES];
      this[FN]      = ctx(fn, that, I[ENTRIES] ? 2 : 1);
    }
    createIterator(Iter, 'Chain', next, $forProto);
    setIterator(Iter[PROTOTYPE], returnThis); // override $forProto iterator
    return Iter;
  }
  
  var MapIter = createChainIterator(function(){
    var step = this[ITER].next();
    return step.done ? step : iterResult(0, stepCall(this[FN], step.value, this[ENTRIES]));
  });
  
  var FilterIter = createChainIterator(function(){
    for(;;){
      var step = this[ITER].next();
      if(step.done || stepCall(this[FN], step.value, this[ENTRIES]))return step;
    }
  });
  
  assignHidden($forProto, {
    of: function(fn, that){
      forOf(this, this[ENTRIES], fn, that);
    },
    array: function(fn, that){
      var result = [];
      forOf(fn != undefined ? this.map(fn, that) : this, false, push, result);
      return result;
    },
    filter: function(fn, that){
      return new FilterIter(this, fn, that);
    },
    map: function(fn, that){
      return new MapIter(this, fn, that);
    }
  });
  
  $for.isIterable  = isIterable;
  $for.getIterator = getIterator;
  
  $define(GLOBAL + FORCED, {$for: $for});
}('entries', safeSymbol('fn'));

/******************************************************************************
 * Module : core.delay                                                        *
 ******************************************************************************/

// https://esdiscuss.org/topic/promise-returning-delay-function
$define(GLOBAL + FORCED, {
  delay: function(time){
    return new Promise(function(resolve){
      setTimeout(resolve, time, true);
    });
  }
});

/******************************************************************************
 * Module : core.binding                                                      *
 ******************************************************************************/

!function(_, toLocaleString){
  // Placeholder
  core._ = path._ = path._ || {};

  $define(PROTO + FORCED, FUNCTION, {
    part: part,
    only: function(numberArguments, that /* = @ */){
      var fn     = assertFunction(this)
        , n      = toLength(numberArguments)
        , isThat = arguments.length > 1;
      return function(/* ...args */){
        var length = min(n, arguments.length)
          , args   = Array(length)
          , i      = 0;
        while(length > i)args[i] = arguments[i++];
        return invoke(fn, args, isThat ? that : this);
      }
    }
  });
  
  function tie(key){
    var that  = this
      , bound = {};
    return hidden(that, _, function(key){
      if(key === undefined || !(key in that))return toLocaleString.call(that);
      return has(bound, key) ? bound[key] : (bound[key] = ctx(that[key], that, -1));
    })[_](key);
  }
  
  hidden(path._, TO_STRING, function(){
    return _;
  });
  
  hidden(ObjectProto, _, tie);
  DESC || hidden(ArrayProto, _, tie);
  // IE8- dirty hack - redefined toLocaleString is not enumerable
}(DESC ? uid('tie') : TO_LOCALE, ObjectProto[TO_LOCALE]);

/******************************************************************************
 * Module : core.object                                                       *
 ******************************************************************************/

!function(){
  function define(target, mixin){
    var keys   = ownKeys(toObject(mixin))
      , length = keys.length
      , i = 0, key;
    while(length > i)defineProperty(target, key = keys[i++], getOwnDescriptor(mixin, key));
    return target;
  };
  $define(STATIC + FORCED, OBJECT, {
    isObject: isObject,
    classof: classof,
    define: define,
    make: function(proto, mixin){
      return define(create(proto), mixin);
    }
  });
}();

/******************************************************************************
 * Module : core.array                                                        *
 ******************************************************************************/

$define(PROTO + FORCED, ARRAY, {
  turn: function(fn, target /* = [] */){
    assertFunction(fn);
    var memo   = target == undefined ? [] : Object(target)
      , O      = ES5Object(this)
      , length = toLength(O.length)
      , index  = 0;
    while(length > index)if(fn(memo, O[index], index++, this) === false)break;
    return memo;
  }
});
if(framework)ArrayUnscopables.turn = true;

/******************************************************************************
 * Module : core.number                                                       *
 ******************************************************************************/

!function(numberMethods){  
  function NumberIterator(iterated){
    set(this, ITER, {l: toLength(iterated), i: 0});
  }
  createIterator(NumberIterator, NUMBER, function(){
    var iter = this[ITER]
      , i    = iter.i++;
    return i < iter.l ? iterResult(0, i) : iterResult(1);
  });
  defineIterator(Number, NUMBER, function(){
    return new NumberIterator(this);
  });
  
  numberMethods.random = function(lim /* = 0 */){
    var a = +this
      , b = lim == undefined ? 0 : +lim
      , m = min(a, b);
    return random() * (max(a, b) - m) + m;
  };

  forEach.call(array(
      // ES3:
      'round,floor,ceil,abs,sin,asin,cos,acos,tan,atan,exp,sqrt,max,min,pow,atan2,' +
      // ES6:
      'acosh,asinh,atanh,cbrt,clz32,cosh,expm1,hypot,imul,log1p,log10,log2,sign,sinh,tanh,trunc'
    ), function(key){
      var fn = Math[key];
      if(fn)numberMethods[key] = function(/* ...args */){
        // ie9- dont support strict mode & convert `this` to object -> convert it to number
        var args = [+this]
          , i    = 0;
        while(arguments.length > i)args.push(arguments[i++]);
        return invoke(fn, args);
      }
    }
  );
  
  $define(PROTO + FORCED, NUMBER, numberMethods);
}({});

/******************************************************************************
 * Module : core.string                                                       *
 ******************************************************************************/

!function(){
  var escapeHTMLDict = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&apos;'
  }, unescapeHTMLDict = {}, key;
  for(key in escapeHTMLDict)unescapeHTMLDict[escapeHTMLDict[key]] = key;
  $define(PROTO + FORCED, STRING, {
    escapeHTML:   createReplacer(/[&<>"']/g, escapeHTMLDict),
    unescapeHTML: createReplacer(/&(?:amp|lt|gt|quot|apos);/g, unescapeHTMLDict)
  });
}();

/******************************************************************************
 * Module : core.date                                                         *
 ******************************************************************************/

!function(formatRegExp, flexioRegExp, locales, current, SECONDS, MINUTES, HOURS, MONTH, YEAR){
  function createFormat(prefix){
    return function(template, locale /* = current */){
      var that = this
        , dict = locales[has(locales, locale) ? locale : current];
      function get(unit){
        return that[prefix + unit]();
      }
      return String(template).replace(formatRegExp, function(part){
        switch(part){
          case 's'  : return get(SECONDS);                  // Seconds : 0-59
          case 'ss' : return lz(get(SECONDS));              // Seconds : 00-59
          case 'm'  : return get(MINUTES);                  // Minutes : 0-59
          case 'mm' : return lz(get(MINUTES));              // Minutes : 00-59
          case 'h'  : return get(HOURS);                    // Hours   : 0-23
          case 'hh' : return lz(get(HOURS));                // Hours   : 00-23
          case 'D'  : return get(DATE);                     // Date    : 1-31
          case 'DD' : return lz(get(DATE));                 // Date    : 01-31
          case 'W'  : return dict[0][get('Day')];           // Day     : Понедельник
          case 'N'  : return get(MONTH) + 1;                // Month   : 1-12
          case 'NN' : return lz(get(MONTH) + 1);            // Month   : 01-12
          case 'M'  : return dict[2][get(MONTH)];           // Month   : Январь
          case 'MM' : return dict[1][get(MONTH)];           // Month   : Января
          case 'Y'  : return get(YEAR);                     // Year    : 2014
          case 'YY' : return lz(get(YEAR) % 100);           // Year    : 14
        } return part;
      });
    }
  }
  function addLocale(lang, locale){
    function split(index){
      var result = [];
      forEach.call(array(locale.months), function(it){
        result.push(it.replace(flexioRegExp, '$' + index));
      });
      return result;
    }
    locales[lang] = [array(locale.weekdays), split(1), split(2)];
    return core;
  }
  $define(PROTO + FORCED, DATE, {
    format:    createFormat('get'),
    formatUTC: createFormat('getUTC')
  });
  addLocale(current, {
    weekdays: 'Sunday,Monday,Tuesday,Wednesday,Thursday,Friday,Saturday',
    months: 'January,February,March,April,May,June,July,August,September,October,November,December'
  });
  addLocale('ru', {
    weekdays: 'Воскресенье,Понедельник,Вторник,Среда,Четверг,Пятница,Суббота',
    months: 'Январ:я|ь,Феврал:я|ь,Март:а|,Апрел:я|ь,Ма:я|й,Июн:я|ь,' +
            'Июл:я|ь,Август:а|,Сентябр:я|ь,Октябр:я|ь,Ноябр:я|ь,Декабр:я|ь'
  });
  core.locale = function(locale){
    return has(locales, locale) ? current = locale : current;
  };
  core.addLocale = addLocale;
}(/\b\w\w?\b/g, /:(.*)\|(.*)$/, {}, 'en', 'Seconds', 'Minutes', 'Hours', 'Month', 'FullYear');

/******************************************************************************
 * Module : core.global                                                       *
 ******************************************************************************/

$define(GLOBAL + FORCED, {global: global});

/******************************************************************************
 * Module : js.array.statics                                                  *
 ******************************************************************************/

// JavaScript 1.6 / Strawman array statics shim
!function(arrayStatics){
  function setArrayStatics(keys, length){
    forEach.call(array(keys), function(key){
      if(key in ArrayProto)arrayStatics[key] = ctx(call, ArrayProto[key], length);
    });
  }
  setArrayStatics('pop,reverse,shift,keys,values,entries', 1);
  setArrayStatics('indexOf,every,some,forEach,map,filter,find,findIndex,includes', 3);
  setArrayStatics('join,slice,concat,push,splice,unshift,sort,lastIndexOf,' +
                  'reduce,reduceRight,copyWithin,fill,turn');
  $define(STATIC, ARRAY, arrayStatics);
}({});

/******************************************************************************
 * Module : web.dom.itarable                                                  *
 ******************************************************************************/

!function(NodeList){
  if(framework && NodeList && !(SYMBOL_ITERATOR in NodeList[PROTOTYPE])){
    hidden(NodeList[PROTOTYPE], SYMBOL_ITERATOR, Iterators[ARRAY]);
  }
  Iterators.NodeList = Iterators[ARRAY];
}(global.NodeList);

/******************************************************************************
 * Module : core.log                                                          *
 ******************************************************************************/

!function(log, enabled){
  // Methods from https://github.com/DeveloperToolsWG/console-object/blob/master/api.md
  forEach.call(array('assert,clear,count,debug,dir,dirxml,error,exception,' +
      'group,groupCollapsed,groupEnd,info,isIndependentlyComposed,log,' +
      'markTimeline,profile,profileEnd,table,time,timeEnd,timeline,' +
      'timelineEnd,timeStamp,trace,warn'), function(key){
    log[key] = function(){
      if(enabled && key in console)return apply.call(console[key], console, arguments);
    };
  });
  $define(GLOBAL + FORCED, {log: assign(log.log, log, {
    enable: function(){
      enabled = true;
    },
    disable: function(){
      enabled = false;
    }
  })});
}({}, true);
}(typeof self != 'undefined' && self.Math === Math ? self : Function('return this')(), false);
module.exports = { "default": module.exports, __esModule: true };

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/helpers.js":[function(require,module,exports){
(function (global){
"use strict";

var _core = require("babel-runtime/core-js")["default"];

var helpers = exports["default"] = {};
exports.__esModule = true;

helpers.inherits = function (subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      enumerable: false,
      writable: true,
      configurable: true
    }
  });
  if (superClass) subClass.__proto__ = superClass;
};

helpers.defaults = function (obj, defaults) {
  var keys = _core.Object.getOwnPropertyNames(defaults);

  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];

    var value = _core.Object.getOwnPropertyDescriptor(defaults, key);

    if (value && value.configurable && obj[key] === undefined) {
      Object.defineProperty(obj, key, value);
    }
  }

  return obj;
};

helpers.prototypeProperties = function (child, staticProps, instanceProps) {
  if (staticProps) Object.defineProperties(child, staticProps);
  if (instanceProps) Object.defineProperties(child.prototype, instanceProps);
};

helpers.applyConstructor = function (Constructor, args) {
  var instance = Object.create(Constructor.prototype);
  var result = Constructor.apply(instance, args);
  return result != null && (typeof result == "object" || typeof result == "function") ? result : instance;
};

helpers.taggedTemplateLiteral = function (strings, raw) {
  return _core.Object.freeze(Object.defineProperties(strings, {
    raw: {
      value: _core.Object.freeze(raw)
    }
  }));
};

helpers.taggedTemplateLiteralLoose = function (strings, raw) {
  strings.raw = raw;
  return strings;
};

helpers.interopRequire = function (obj) {
  return obj && obj.__esModule ? obj["default"] : obj;
};

helpers.toArray = function (arr) {
  return Array.isArray(arr) ? arr : _core.Array.from(arr);
};

helpers.toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return _core.Array.from(arr);
  }
};

helpers.slicedToArray = function (arr, i) {
  if (Array.isArray(arr)) {
    return arr;
  } else if (_core.$for.isIterable(Object(arr))) {
    var _arr = [];

    for (var _iterator = _core.$for.getIterator(arr), _step; !(_step = _iterator.next()).done;) {
      _arr.push(_step.value);

      if (i && _arr.length === i) break;
    }

    return _arr;
  } else {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }
};

helpers.objectWithoutProperties = function (obj, keys) {
  var target = {};

  for (var i in obj) {
    if (keys.indexOf(i) >= 0) continue;
    if (!Object.prototype.hasOwnProperty.call(obj, i)) continue;
    target[i] = obj[i];
  }

  return target;
};

helpers.hasOwn = Object.prototype.hasOwnProperty;
helpers.slice = Array.prototype.slice;
helpers.bind = Function.prototype.bind;

helpers.defineProperty = function (obj, key, value) {
  return Object.defineProperty(obj, key, {
    value: value,
    enumerable: true,
    configurable: true,
    writable: true
  });
};

helpers.asyncToGenerator = function (fn) {
  return function () {
    var gen = fn.apply(this, arguments);
    return new _core.Promise(function (resolve, reject) {
      var callNext = step.bind(null, "next");
      var callThrow = step.bind(null, "throw");

      function step(key, arg) {
        try {
          var info = gen[key](arg);
          var value = info.value;
        } catch (error) {
          reject(error);
          return;
        }

        if (info.done) {
          resolve(value);
        } else {
          _core.Promise.resolve(value).then(callNext, callThrow);
        }
      }

      callNext();
    });
  };
};

helpers.interopRequireWildcard = function (obj) {
  return obj && obj.__esModule ? obj : {
    "default": obj
  };
};

helpers._typeof = function (obj) {
  return obj && obj.constructor === _core.Symbol ? "symbol" : typeof obj;
};

helpers._extends = _core.Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

helpers.get = function get(_x, _x2, _x3) {
  var _again = true;

  _function: while (_again) {
    _again = false;
    var object = _x,
        property = _x2,
        receiver = _x3;
    desc = parent = getter = undefined;

    var desc = _core.Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = _core.Object.getPrototypeOf(object);

      if (parent === null) {
        return undefined;
      } else {
        _x = parent;
        _x2 = property;
        _x3 = receiver;
        _again = true;
        continue _function;
      }
    } else if ("value" in desc && desc.writable) {
      return desc.value;
    } else {
      var getter = desc.get;

      if (getter === undefined) {
        return undefined;
      }

      return getter.call(receiver);
    }
  }
};

helpers.set = function set(_x, _x2, _x3, _x4) {
  var _again = true;

  _function: while (_again) {
    _again = false;
    var object = _x,
        property = _x2,
        value = _x3,
        receiver = _x4;
    desc = parent = setter = undefined;

    var desc = _core.Object.getOwnPropertyDescriptor(object, property);

    if (desc === undefined) {
      var parent = _core.Object.getPrototypeOf(object);

      if (parent !== null) {
        _x = parent;
        _x2 = property;
        _x3 = value;
        _x4 = receiver;
        _again = true;
        continue _function;
      }
    } else if ("value" in desc && desc.writable) {
      return desc.value = value;
    } else {
      var setter = desc.set;

      if (setter !== undefined) {
        return setter.call(receiver, value);
      }
    }
  }
};

helpers.classCallCheck = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

helpers.objectDestructuringEmpty = function (obj) {
  if (obj == null) throw new TypeError("Cannot destructure undefined");
};

helpers.temporalUndefined = {};

helpers.temporalAssertDefined = function (val, name, undef) {
  if (val === undef) {
    throw new ReferenceError(name + " is not defined - temporal dead zone");
  }

  return true;
};

helpers.selfGlobal = typeof global === "undefined" ? self : global;
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/regenerator/index.js":[function(require,module,exports){
(function (global){
// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g =
  typeof global === "object" ? global :
  typeof window === "object" ? window : this;

var hasOwn = Object.prototype.hasOwnProperty;
var hadRuntime = hasOwn.call(g, "regeneratorRuntime");
var oldRuntime = hadRuntime && g.regeneratorRuntime;
delete g.regeneratorRuntime; // Force reevalutation of runtime.js.

module.exports = require("./runtime");

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  delete g.regeneratorRuntime;
}

module.exports = { "default": module.exports, __esModule: true };

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./runtime":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/regenerator/runtime.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/regenerator/runtime.js":[function(require,module,exports){
(function (global){
"use strict";

var _core = require("babel-runtime/core-js")["default"];

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!(function (global) {
  "use strict";

  var hasOwn = Object.prototype.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var iteratorSymbol = typeof _core.Symbol === "function" && _core.Symbol.iterator || "@@iterator";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    return new Generator(innerFn, outerFn, self || null, tryLocsList || []);
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype;
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = "GeneratorFunction";

  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  runtime.mark = function (genFun) {
    genFun.__proto__ = GeneratorFunctionPrototype;
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    return new _core.Promise(function (resolve, reject) {
      var generator = wrap(innerFn, outerFn, self, tryLocsList);
      var callNext = step.bind(generator.next);
      var callThrow = step.bind(generator["throw"]);

      function step(arg) {
        var record = tryCatch(this, null, arg);
        if (record.type === "throw") {
          reject(record.arg);
          return;
        }

        var info = record.arg;
        if (info.done) {
          resolve(info.value);
        } else {
          _core.Promise.resolve(info.value).then(callNext, callThrow);
        }
      }

      callNext();
    });
  };

  function Generator(innerFn, outerFn, self, tryLocsList) {
    var generator = outerFn ? Object.create(outerFn.prototype) : this;
    var context = new Context(tryLocsList);
    var state = GenStateSuspendedStart;

    function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var record = tryCatch(delegate.iterator[method], delegate.iterator, arg);

          if (record.type === "throw") {
            context.delegate = null;

            // Like returning generator.throw(uncaught), but without the
            // overhead of an extra function call.
            method = "throw";
            arg = record.arg;

            continue;
          }

          // Delegate generator ran and handled its own exceptions so
          // regardless of what the method was, we continue as if it is
          // "next" with an undefined arg.
          method = "next";
          arg = undefined;

          var info = record.arg;
          if (info.done) {
            context[delegate.resultName] = info.value;
            context.next = delegate.nextLoc;
          } else {
            state = GenStateSuspendedYield;
            return info;
          }

          context.delegate = null;
        }

        if (method === "next") {
          if (state === GenStateSuspendedStart && typeof arg !== "undefined") {
            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
            throw new TypeError("attempt to send " + JSON.stringify(arg) + " to newborn generator");
          }

          if (state === GenStateSuspendedYield) {
            context.sent = arg;
          } else {
            delete context.sent;
          }
        } else if (method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw arg;
          }

          if (context.dispatchException(arg)) {
            // If the dispatched exception was caught by a catch block,
            // then let that catch block handle the exception normally.
            method = "next";
            arg = undefined;
          }
        } else if (method === "return") {
          context.abrupt("return", arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          var info = {
            value: record.arg,
            done: context.done
          };

          if (record.arg === ContinueSentinel) {
            if (context.delegate && method === "next") {
              // Deliberately forget the last sent value so that we don't
              // accidentally pass it on to the delegate.
              arg = undefined;
            }
          } else {
            return info;
          }
        } else if (record.type === "throw") {
          state = GenStateCompleted;

          if (method === "next") {
            context.dispatchException(record.arg);
          } else {
            arg = record.arg;
          }
        }
      }
    }

    generator.next = invoke.bind(generator, "next");
    generator["throw"] = invoke.bind(generator, "throw");
    generator["return"] = invoke.bind(generator, "return");

    return generator;
  }

  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset();
  }

  runtime.keys = function (object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function reset() {
      this.prev = 0;
      this.next = 0;
      this.sent = undefined;
      this.done = false;
      this.delegate = null;

      this.tryEntries.forEach(resetTryEntry);

      // Pre-initialize at least 20 temporary variables to enable hidden
      // class optimizations for simple generators.
      for (var tempIndex = 0, tempName; hasOwn.call(this, tempName = "t" + tempIndex) || tempIndex < 20; ++tempIndex) {
        this[tempName] = null;
      }
    },

    stop: function stop() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;
        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg < finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.next = finallyEntry.finallyLoc;
      } else {
        this.complete(record);
      }

      return ContinueSentinel;
    },

    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = record.arg;
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          return this.complete(entry.completion, entry.afterLoc);
        }
      }
    },

    "catch": function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      return ContinueSentinel;
    }
  };
})(
// Among the various tricks for obtaining a reference to the global
// object, this seems to be the most reliable technique that does not
// use indirect eval (which violates Content Security Policy).
typeof global === "object" ? global : typeof window === "object" ? window : undefined);
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"babel-runtime/core-js":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/babel-runtime/core-js.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/collection/forEach.js":[function(require,module,exports){
var arrayEach = require('../internal/arrayEach'),
    baseEach = require('../internal/baseEach'),
    bindCallback = require('../internal/bindCallback'),
    isArray = require('../lang/isArray');

/**
 * Iterates over elements of `collection` invoking `iteratee` for each element.
 * The `iteratee` is bound to `thisArg` and invoked with three arguments;
 * (value, index|key, collection). Iterator functions may exit iteration early
 * by explicitly returning `false`.
 *
 * **Note:** As with other "Collections" methods, objects with a `length` property
 * are iterated like arrays. To avoid this behavior `_.forIn` or `_.forOwn`
 * may be used for object iteration.
 *
 * @static
 * @memberOf _
 * @alias each
 * @category Collection
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Array|Object|string} Returns `collection`.
 * @example
 *
 * _([1, 2]).forEach(function(n) {
 *   console.log(n);
 * }).value();
 * // => logs each value from left to right and returns the array
 *
 * _.forEach({ 'a': 1, 'b': 2 }, function(n, key) {
 *   console.log(n, key);
 * });
 * // => logs each value-key pair and returns the object (iteration order is not guaranteed)
 */
function forEach(collection, iteratee, thisArg) {
  return (typeof iteratee == 'function' && typeof thisArg == 'undefined' && isArray(collection))
    ? arrayEach(collection, iteratee)
    : baseEach(collection, bindCallback(iteratee, thisArg, 3));
}

module.exports = forEach;

},{"../internal/arrayEach":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/arrayEach.js","../internal/baseEach":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseEach.js","../internal/bindCallback":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/bindCallback.js","../lang/isArray":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isArray.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/collection/sample.js":[function(require,module,exports){
var baseRandom = require('../internal/baseRandom'),
    isIterateeCall = require('../internal/isIterateeCall'),
    shuffle = require('./shuffle'),
    toIterable = require('../internal/toIterable');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeMin = Math.min;

/**
 * Gets a random element or `n` random elements from a collection.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to sample.
 * @param {number} [n] The number of elements to sample.
 * @param- {Object} [guard] Enables use as a callback for functions like `_.map`.
 * @returns {*} Returns the random sample(s).
 * @example
 *
 * _.sample([1, 2, 3, 4]);
 * // => 2
 *
 * _.sample([1, 2, 3, 4], 2);
 * // => [3, 1]
 */
function sample(collection, n, guard) {
  if (guard ? isIterateeCall(collection, n, guard) : n == null) {
    collection = toIterable(collection);
    var length = collection.length;
    return length > 0 ? collection[baseRandom(0, length - 1)] : undefined;
  }
  var result = shuffle(collection);
  result.length = nativeMin(n < 0 ? 0 : (+n || 0), result.length);
  return result;
}

module.exports = sample;

},{"../internal/baseRandom":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseRandom.js","../internal/isIterateeCall":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isIterateeCall.js","../internal/toIterable":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/toIterable.js","./shuffle":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/collection/shuffle.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/collection/shuffle.js":[function(require,module,exports){
var baseRandom = require('../internal/baseRandom'),
    toIterable = require('../internal/toIterable');

/**
 * Creates an array of shuffled values, using a version of the Fisher-Yates
 * shuffle. See [Wikipedia](https://en.wikipedia.org/wiki/Fisher-Yates_shuffle)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to shuffle.
 * @returns {Array} Returns the new shuffled array.
 * @example
 *
 * _.shuffle([1, 2, 3, 4]);
 * // => [4, 1, 3, 2]
 */
function shuffle(collection) {
  collection = toIterable(collection);

  var index = -1,
      length = collection.length,
      result = Array(length);

  while (++index < length) {
    var rand = baseRandom(0, index);
    if (index != rand) {
      result[index] = result[rand];
    }
    result[rand] = collection[index];
  }
  return result;
}

module.exports = shuffle;

},{"../internal/baseRandom":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseRandom.js","../internal/toIterable":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/toIterable.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/collection/size.js":[function(require,module,exports){
var isLength = require('../internal/isLength'),
    keys = require('../object/keys');

/**
 * Gets the size of `collection` by returning `collection.length` for
 * array-like values or the number of own enumerable properties for objects.
 *
 * @static
 * @memberOf _
 * @category Collection
 * @param {Array|Object|string} collection The collection to inspect.
 * @returns {number} Returns the size of `collection`.
 * @example
 *
 * _.size([1, 2, 3]);
 * // => 3
 *
 * _.size({ 'a': 1, 'b': 2 });
 * // => 2
 *
 * _.size('pebbles');
 * // => 7
 */
function size(collection) {
  var length = collection ? collection.length : 0;
  return isLength(length) ? length : keys(collection).length;
}

module.exports = size;

},{"../internal/isLength":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isLength.js","../object/keys":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/object/keys.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/arrayCopy.js":[function(require,module,exports){
/**
 * Copies the values of `source` to `array`.
 *
 * @private
 * @param {Array} source The array to copy values from.
 * @param {Array} [array=[]] The array to copy values to.
 * @returns {Array} Returns `array`.
 */
function arrayCopy(source, array) {
  var index = -1,
      length = source.length;

  array || (array = Array(length));
  while (++index < length) {
    array[index] = source[index];
  }
  return array;
}

module.exports = arrayCopy;

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/arrayEach.js":[function(require,module,exports){
/**
 * A specialized version of `_.forEach` for arrays without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Array} array The array to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns `array`.
 */
function arrayEach(array, iteratee) {
  var index = -1,
      length = array.length;

  while (++index < length) {
    if (iteratee(array[index], index, array) === false) {
      break;
    }
  }
  return array;
}

module.exports = arrayEach;

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseCallback.js":[function(require,module,exports){
var baseMatches = require('./baseMatches'),
    baseMatchesProperty = require('./baseMatchesProperty'),
    baseProperty = require('./baseProperty'),
    bindCallback = require('./bindCallback'),
    identity = require('../utility/identity'),
    isBindable = require('./isBindable');

/**
 * The base implementation of `_.callback` which supports specifying the
 * number of arguments to provide to `func`.
 *
 * @private
 * @param {*} [func=_.identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function baseCallback(func, thisArg, argCount) {
  var type = typeof func;
  if (type == 'function') {
    return (typeof thisArg != 'undefined' && isBindable(func))
      ? bindCallback(func, thisArg, argCount)
      : func;
  }
  if (func == null) {
    return identity;
  }
  if (type == 'object') {
    return baseMatches(func);
  }
  return typeof thisArg == 'undefined'
    ? baseProperty(func + '')
    : baseMatchesProperty(func + '', thisArg);
}

module.exports = baseCallback;

},{"../utility/identity":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/utility/identity.js","./baseMatches":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseMatches.js","./baseMatchesProperty":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseMatchesProperty.js","./baseProperty":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseProperty.js","./bindCallback":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/bindCallback.js","./isBindable":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isBindable.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseClone.js":[function(require,module,exports){
var arrayCopy = require('./arrayCopy'),
    arrayEach = require('./arrayEach'),
    baseCopy = require('./baseCopy'),
    baseForOwn = require('./baseForOwn'),
    initCloneArray = require('./initCloneArray'),
    initCloneByTag = require('./initCloneByTag'),
    initCloneObject = require('./initCloneObject'),
    isArray = require('../lang/isArray'),
    isObject = require('../lang/isObject'),
    keys = require('../object/keys');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values supported by `_.clone`. */
var cloneableTags = {};
cloneableTags[argsTag] = cloneableTags[arrayTag] =
cloneableTags[arrayBufferTag] = cloneableTags[boolTag] =
cloneableTags[dateTag] = cloneableTags[float32Tag] =
cloneableTags[float64Tag] = cloneableTags[int8Tag] =
cloneableTags[int16Tag] = cloneableTags[int32Tag] =
cloneableTags[numberTag] = cloneableTags[objectTag] =
cloneableTags[regexpTag] = cloneableTags[stringTag] =
cloneableTags[uint8Tag] = cloneableTags[uint8ClampedTag] =
cloneableTags[uint16Tag] = cloneableTags[uint32Tag] = true;
cloneableTags[errorTag] = cloneableTags[funcTag] =
cloneableTags[mapTag] = cloneableTags[setTag] =
cloneableTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * The base implementation of `_.clone` without support for argument juggling
 * and `this` binding `customizer` functions.
 *
 * @private
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {string} [key] The key of `value`.
 * @param {Object} [object] The object `value` belongs to.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates clones with source counterparts.
 * @returns {*} Returns the cloned value.
 */
function baseClone(value, isDeep, customizer, key, object, stackA, stackB) {
  var result;
  if (customizer) {
    result = object ? customizer(value, key, object) : customizer(value);
  }
  if (typeof result != 'undefined') {
    return result;
  }
  if (!isObject(value)) {
    return value;
  }
  var isArr = isArray(value);
  if (isArr) {
    result = initCloneArray(value);
    if (!isDeep) {
      return arrayCopy(value, result);
    }
  } else {
    var tag = objToString.call(value),
        isFunc = tag == funcTag;

    if (tag == objectTag || tag == argsTag || (isFunc && !object)) {
      result = initCloneObject(isFunc ? {} : value);
      if (!isDeep) {
        return baseCopy(value, result, keys(value));
      }
    } else {
      return cloneableTags[tag]
        ? initCloneByTag(value, tag, isDeep)
        : (object ? value : {});
    }
  }
  // Check for circular references and return corresponding clone.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == value) {
      return stackB[length];
    }
  }
  // Add the source value to the stack of traversed objects and associate it with its clone.
  stackA.push(value);
  stackB.push(result);

  // Recursively populate clone (susceptible to call stack limits).
  (isArr ? arrayEach : baseForOwn)(value, function(subValue, key) {
    result[key] = baseClone(subValue, isDeep, customizer, key, value, stackA, stackB);
  });
  return result;
}

module.exports = baseClone;

},{"../lang/isArray":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isArray.js","../lang/isObject":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isObject.js","../object/keys":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/object/keys.js","./arrayCopy":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/arrayCopy.js","./arrayEach":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/arrayEach.js","./baseCopy":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseCopy.js","./baseForOwn":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseForOwn.js","./initCloneArray":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/initCloneArray.js","./initCloneByTag":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/initCloneByTag.js","./initCloneObject":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/initCloneObject.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseCopy.js":[function(require,module,exports){
/**
 * Copies the properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Array} props The property names to copy.
 * @returns {Object} Returns `object`.
 */
function baseCopy(source, object, props) {
  if (!props) {
    props = object;
    object = {};
  }
  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];
    object[key] = source[key];
  }
  return object;
}

module.exports = baseCopy;

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseEach.js":[function(require,module,exports){
var baseForOwn = require('./baseForOwn'),
    isLength = require('./isLength'),
    toObject = require('./toObject');

/**
 * The base implementation of `_.forEach` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array|Object|string} Returns `collection`.
 */
function baseEach(collection, iteratee) {
  var length = collection ? collection.length : 0;
  if (!isLength(length)) {
    return baseForOwn(collection, iteratee);
  }
  var index = -1,
      iterable = toObject(collection);

  while (++index < length) {
    if (iteratee(iterable[index], index, iterable) === false) {
      break;
    }
  }
  return collection;
}

module.exports = baseEach;

},{"./baseForOwn":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseForOwn.js","./isLength":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isLength.js","./toObject":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/toObject.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseFor.js":[function(require,module,exports){
var toObject = require('./toObject');

/**
 * The base implementation of `baseForIn` and `baseForOwn` which iterates
 * over `object` properties returned by `keysFunc` invoking `iteratee` for
 * each property. Iterator functions may exit iteration early by explicitly
 * returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
function baseFor(object, iteratee, keysFunc) {
  var index = -1,
      iterable = toObject(object),
      props = keysFunc(object),
      length = props.length;

  while (++index < length) {
    var key = props[index];
    if (iteratee(iterable[key], key, iterable) === false) {
      break;
    }
  }
  return object;
}

module.exports = baseFor;

},{"./toObject":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/toObject.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseForIn.js":[function(require,module,exports){
var baseFor = require('./baseFor'),
    keysIn = require('../object/keysIn');

/**
 * The base implementation of `_.forIn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForIn(object, iteratee) {
  return baseFor(object, iteratee, keysIn);
}

module.exports = baseForIn;

},{"../object/keysIn":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/object/keysIn.js","./baseFor":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseFor.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseForOwn.js":[function(require,module,exports){
var baseFor = require('./baseFor'),
    keys = require('../object/keys');

/**
 * The base implementation of `_.forOwn` without support for callback
 * shorthands and `this` binding.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return baseFor(object, iteratee, keys);
}

module.exports = baseForOwn;

},{"../object/keys":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/object/keys.js","./baseFor":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseFor.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseIsEqual.js":[function(require,module,exports){
var baseIsEqualDeep = require('./baseIsEqualDeep');

/**
 * The base implementation of `_.isEqual` without support for `this` binding
 * `customizer` functions.
 *
 * @private
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(value, other, customizer, isWhere, stackA, stackB) {
  // Exit early for identical values.
  if (value === other) {
    // Treat `+0` vs. `-0` as not equal.
    return value !== 0 || (1 / value == 1 / other);
  }
  var valType = typeof value,
      othType = typeof other;

  // Exit early for unlike primitive values.
  if ((valType != 'function' && valType != 'object' && othType != 'function' && othType != 'object') ||
      value == null || other == null) {
    // Return `false` unless both values are `NaN`.
    return value !== value && other !== other;
  }
  return baseIsEqualDeep(value, other, baseIsEqual, customizer, isWhere, stackA, stackB);
}

module.exports = baseIsEqual;

},{"./baseIsEqualDeep":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseIsEqualDeep.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseIsEqualDeep.js":[function(require,module,exports){
var equalArrays = require('./equalArrays'),
    equalByTag = require('./equalByTag'),
    equalObjects = require('./equalObjects'),
    isArray = require('../lang/isArray'),
    isTypedArray = require('../lang/isTypedArray');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * A specialized version of `baseIsEqual` for arrays and objects which performs
 * deep comparisons and tracks traversed objects enabling objects with circular
 * references to be compared.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `value` objects.
 * @param {Array} [stackB=[]] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseIsEqualDeep(object, other, equalFunc, customizer, isWhere, stackA, stackB) {
  var objIsArr = isArray(object),
      othIsArr = isArray(other),
      objTag = arrayTag,
      othTag = arrayTag;

  if (!objIsArr) {
    objTag = objToString.call(object);
    if (objTag == argsTag) {
      objTag = objectTag;
    } else if (objTag != objectTag) {
      objIsArr = isTypedArray(object);
    }
  }
  if (!othIsArr) {
    othTag = objToString.call(other);
    if (othTag == argsTag) {
      othTag = objectTag;
    } else if (othTag != objectTag) {
      othIsArr = isTypedArray(other);
    }
  }
  var objIsObj = objTag == objectTag,
      othIsObj = othTag == objectTag,
      isSameTag = objTag == othTag;

  if (isSameTag && !(objIsArr || objIsObj)) {
    return equalByTag(object, other, objTag);
  }
  var valWrapped = objIsObj && hasOwnProperty.call(object, '__wrapped__'),
      othWrapped = othIsObj && hasOwnProperty.call(other, '__wrapped__');

  if (valWrapped || othWrapped) {
    return equalFunc(valWrapped ? object.value() : object, othWrapped ? other.value() : other, customizer, isWhere, stackA, stackB);
  }
  if (!isSameTag) {
    return false;
  }
  // Assume cyclic values are equal.
  // For more information on detecting circular references see https://es5.github.io/#JO.
  stackA || (stackA = []);
  stackB || (stackB = []);

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == object) {
      return stackB[length] == other;
    }
  }
  // Add `object` and `other` to the stack of traversed objects.
  stackA.push(object);
  stackB.push(other);

  var result = (objIsArr ? equalArrays : equalObjects)(object, other, equalFunc, customizer, isWhere, stackA, stackB);

  stackA.pop();
  stackB.pop();

  return result;
}

module.exports = baseIsEqualDeep;

},{"../lang/isArray":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isArray.js","../lang/isTypedArray":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isTypedArray.js","./equalArrays":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/equalArrays.js","./equalByTag":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/equalByTag.js","./equalObjects":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/equalObjects.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseIsFunction.js":[function(require,module,exports){
/**
 * The base implementation of `_.isFunction` without support for environments
 * with incorrect `typeof` results.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 */
function baseIsFunction(value) {
  // Avoid a Chakra JIT bug in compatibility modes of IE 11.
  // See https://github.com/jashkenas/underscore/issues/1621 for more details.
  return typeof value == 'function' || false;
}

module.exports = baseIsFunction;

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseIsMatch.js":[function(require,module,exports){
var baseIsEqual = require('./baseIsEqual');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.isMatch` without support for callback
 * shorthands or `this` binding.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @param {Array} props The source property names to match.
 * @param {Array} values The source values to match.
 * @param {Array} strictCompareFlags Strict comparison flags for source values.
 * @param {Function} [customizer] The function to customize comparing objects.
 * @returns {boolean} Returns `true` if `object` is a match, else `false`.
 */
function baseIsMatch(object, props, values, strictCompareFlags, customizer) {
  var length = props.length;
  if (object == null) {
    return !length;
  }
  var index = -1,
      noCustomizer = !customizer;

  while (++index < length) {
    if ((noCustomizer && strictCompareFlags[index])
          ? values[index] !== object[props[index]]
          : !hasOwnProperty.call(object, props[index])
        ) {
      return false;
    }
  }
  index = -1;
  while (++index < length) {
    var key = props[index];
    if (noCustomizer && strictCompareFlags[index]) {
      var result = hasOwnProperty.call(object, key);
    } else {
      var objValue = object[key],
          srcValue = values[index];

      result = customizer ? customizer(objValue, srcValue, key) : undefined;
      if (typeof result == 'undefined') {
        result = baseIsEqual(srcValue, objValue, customizer, true);
      }
    }
    if (!result) {
      return false;
    }
  }
  return true;
}

module.exports = baseIsMatch;

},{"./baseIsEqual":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseIsEqual.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseMatches.js":[function(require,module,exports){
var baseIsMatch = require('./baseIsMatch'),
    isStrictComparable = require('./isStrictComparable'),
    keys = require('../object/keys');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.matches` which does not clone `source`.
 *
 * @private
 * @param {Object} source The object of property values to match.
 * @returns {Function} Returns the new function.
 */
function baseMatches(source) {
  var props = keys(source),
      length = props.length;

  if (length == 1) {
    var key = props[0],
        value = source[key];

    if (isStrictComparable(value)) {
      return function(object) {
        return object != null && object[key] === value && hasOwnProperty.call(object, key);
      };
    }
  }
  var values = Array(length),
      strictCompareFlags = Array(length);

  while (length--) {
    value = source[props[length]];
    values[length] = value;
    strictCompareFlags[length] = isStrictComparable(value);
  }
  return function(object) {
    return baseIsMatch(object, props, values, strictCompareFlags);
  };
}

module.exports = baseMatches;

},{"../object/keys":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/object/keys.js","./baseIsMatch":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseIsMatch.js","./isStrictComparable":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isStrictComparable.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseMatchesProperty.js":[function(require,module,exports){
var baseIsEqual = require('./baseIsEqual'),
    isStrictComparable = require('./isStrictComparable');

/**
 * The base implementation of `_.matchesProperty` which does not coerce `key`
 * to a string.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @param {*} value The value to compare.
 * @returns {Function} Returns the new function.
 */
function baseMatchesProperty(key, value) {
  if (isStrictComparable(value)) {
    return function(object) {
      return object != null && object[key] === value;
    };
  }
  return function(object) {
    return object != null && baseIsEqual(value, object[key], null, true);
  };
}

module.exports = baseMatchesProperty;

},{"./baseIsEqual":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseIsEqual.js","./isStrictComparable":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isStrictComparable.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseMerge.js":[function(require,module,exports){
var arrayEach = require('./arrayEach'),
    baseForOwn = require('./baseForOwn'),
    baseMergeDeep = require('./baseMergeDeep'),
    isArray = require('../lang/isArray'),
    isLength = require('./isLength'),
    isObject = require('../lang/isObject'),
    isObjectLike = require('./isObjectLike'),
    isTypedArray = require('../lang/isTypedArray');

/**
 * The base implementation of `_.merge` without support for argument juggling,
 * multiple sources, and `this` binding `customizer` functions.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {Function} [customizer] The function to customize merging properties.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates values with source counterparts.
 * @returns {Object} Returns the destination object.
 */
function baseMerge(object, source, customizer, stackA, stackB) {
  if (!isObject(object)) {
    return object;
  }
  var isSrcArr = isLength(source.length) && (isArray(source) || isTypedArray(source));
  (isSrcArr ? arrayEach : baseForOwn)(source, function(srcValue, key, source) {
    if (isObjectLike(srcValue)) {
      stackA || (stackA = []);
      stackB || (stackB = []);
      return baseMergeDeep(object, source, key, baseMerge, customizer, stackA, stackB);
    }
    var value = object[key],
        result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
        isCommon = typeof result == 'undefined';

    if (isCommon) {
      result = srcValue;
    }
    if ((isSrcArr || typeof result != 'undefined') &&
        (isCommon || (result === result ? result !== value : value === value))) {
      object[key] = result;
    }
  });
  return object;
}

module.exports = baseMerge;

},{"../lang/isArray":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isArray.js","../lang/isObject":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isObject.js","../lang/isTypedArray":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isTypedArray.js","./arrayEach":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/arrayEach.js","./baseForOwn":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseForOwn.js","./baseMergeDeep":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseMergeDeep.js","./isLength":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isLength.js","./isObjectLike":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isObjectLike.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseMergeDeep.js":[function(require,module,exports){
var arrayCopy = require('./arrayCopy'),
    isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isLength = require('./isLength'),
    isPlainObject = require('../lang/isPlainObject'),
    isTypedArray = require('../lang/isTypedArray'),
    toPlainObject = require('../lang/toPlainObject');

/**
 * A specialized version of `baseMerge` for arrays and objects which performs
 * deep merges and tracks traversed objects enabling objects with circular
 * references to be merged.
 *
 * @private
 * @param {Object} object The destination object.
 * @param {Object} source The source object.
 * @param {string} key The key of the value to merge.
 * @param {Function} mergeFunc The function to merge values.
 * @param {Function} [customizer] The function to customize merging properties.
 * @param {Array} [stackA=[]] Tracks traversed source objects.
 * @param {Array} [stackB=[]] Associates values with source counterparts.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function baseMergeDeep(object, source, key, mergeFunc, customizer, stackA, stackB) {
  var length = stackA.length,
      srcValue = source[key];

  while (length--) {
    if (stackA[length] == srcValue) {
      object[key] = stackB[length];
      return;
    }
  }
  var value = object[key],
      result = customizer ? customizer(value, srcValue, key, object, source) : undefined,
      isCommon = typeof result == 'undefined';

  if (isCommon) {
    result = srcValue;
    if (isLength(srcValue.length) && (isArray(srcValue) || isTypedArray(srcValue))) {
      result = isArray(value)
        ? value
        : (value ? arrayCopy(value) : []);
    }
    else if (isPlainObject(srcValue) || isArguments(srcValue)) {
      result = isArguments(value)
        ? toPlainObject(value)
        : (isPlainObject(value) ? value : {});
    }
    else {
      isCommon = false;
    }
  }
  // Add the source value to the stack of traversed objects and associate
  // it with its merged value.
  stackA.push(srcValue);
  stackB.push(result);

  if (isCommon) {
    // Recursively merge objects and arrays (susceptible to call stack limits).
    object[key] = mergeFunc(result, srcValue, customizer, stackA, stackB);
  } else if (result === result ? result !== value : value === value) {
    object[key] = result;
  }
}

module.exports = baseMergeDeep;

},{"../lang/isArguments":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isArguments.js","../lang/isArray":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isArray.js","../lang/isPlainObject":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isPlainObject.js","../lang/isTypedArray":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isTypedArray.js","../lang/toPlainObject":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/toPlainObject.js","./arrayCopy":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/arrayCopy.js","./isLength":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isLength.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseProperty.js":[function(require,module,exports){
/**
 * The base implementation of `_.property` which does not coerce `key` to a string.
 *
 * @private
 * @param {string} key The key of the property to get.
 * @returns {Function} Returns the new function.
 */
function baseProperty(key) {
  return function(object) {
    return object == null ? undefined : object[key];
  };
}

module.exports = baseProperty;

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseRandom.js":[function(require,module,exports){
/** Native method references. */
var floor = Math.floor;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeRandom = Math.random;

/**
 * The base implementation of `_.random` without support for argument juggling
 * and returning floating-point numbers.
 *
 * @private
 * @param {number} min The minimum possible value.
 * @param {number} max The maximum possible value.
 * @returns {number} Returns the random number.
 */
function baseRandom(min, max) {
  return min + floor(nativeRandom() * (max - min + 1));
}

module.exports = baseRandom;

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseSetData.js":[function(require,module,exports){
var identity = require('../utility/identity'),
    metaMap = require('./metaMap');

/**
 * The base implementation of `setData` without support for hot loop detection.
 *
 * @private
 * @param {Function} func The function to associate metadata with.
 * @param {*} data The metadata.
 * @returns {Function} Returns `func`.
 */
var baseSetData = !metaMap ? identity : function(func, data) {
  metaMap.set(func, data);
  return func;
};

module.exports = baseSetData;

},{"../utility/identity":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/utility/identity.js","./metaMap":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/metaMap.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseToString.js":[function(require,module,exports){
/**
 * Converts `value` to a string if it is not one. An empty string is returned
 * for `null` or `undefined` values.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {string} Returns the string.
 */
function baseToString(value) {
  if (typeof value == 'string') {
    return value;
  }
  return value == null ? '' : (value + '');
}

module.exports = baseToString;

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseValues.js":[function(require,module,exports){
/**
 * The base implementation of `_.values` and `_.valuesIn` which creates an
 * array of `object` property values corresponding to the property names
 * returned by `keysFunc`.
 *
 * @private
 * @param {Object} object The object to query.
 * @param {Array} props The property names to get values for.
 * @returns {Object} Returns the array of property values.
 */
function baseValues(object, props) {
  var index = -1,
      length = props.length,
      result = Array(length);

  while (++index < length) {
    result[index] = object[props[index]];
  }
  return result;
}

module.exports = baseValues;

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/bindCallback.js":[function(require,module,exports){
var identity = require('../utility/identity');

/**
 * A specialized version of `baseCallback` which only supports `this` binding
 * and specifying the number of arguments to provide to `func`.
 *
 * @private
 * @param {Function} func The function to bind.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {number} [argCount] The number of arguments to provide to `func`.
 * @returns {Function} Returns the callback.
 */
function bindCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  if (typeof thisArg == 'undefined') {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
    case 5: return function(value, other, key, object, source) {
      return func.call(thisArg, value, other, key, object, source);
    };
  }
  return function() {
    return func.apply(thisArg, arguments);
  };
}

module.exports = bindCallback;

},{"../utility/identity":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/utility/identity.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/bufferClone.js":[function(require,module,exports){
(function (global){
var constant = require('../utility/constant'),
    isNative = require('../lang/isNative');

/** Native method references. */
var ArrayBuffer = isNative(ArrayBuffer = global.ArrayBuffer) && ArrayBuffer,
    bufferSlice = isNative(bufferSlice = ArrayBuffer && new ArrayBuffer(0).slice) && bufferSlice,
    floor = Math.floor,
    Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

/** Used to clone array buffers. */
var Float64Array = (function() {
  // Safari 5 errors when using an array buffer to initialize a typed array
  // where the array buffer's `byteLength` is not a multiple of the typed
  // array's `BYTES_PER_ELEMENT`.
  try {
    var func = isNative(func = global.Float64Array) && func,
        result = new func(new ArrayBuffer(10), 0, 1) && func;
  } catch(e) {}
  return result;
}());

/** Used as the size, in bytes, of each `Float64Array` element. */
var FLOAT64_BYTES_PER_ELEMENT = Float64Array ? Float64Array.BYTES_PER_ELEMENT : 0;

/**
 * Creates a clone of the given array buffer.
 *
 * @private
 * @param {ArrayBuffer} buffer The array buffer to clone.
 * @returns {ArrayBuffer} Returns the cloned array buffer.
 */
function bufferClone(buffer) {
  return bufferSlice.call(buffer, 0);
}
if (!bufferSlice) {
  // PhantomJS has `ArrayBuffer` and `Uint8Array` but not `Float64Array`.
  bufferClone = !(ArrayBuffer && Uint8Array) ? constant(null) : function(buffer) {
    var byteLength = buffer.byteLength,
        floatLength = Float64Array ? floor(byteLength / FLOAT64_BYTES_PER_ELEMENT) : 0,
        offset = floatLength * FLOAT64_BYTES_PER_ELEMENT,
        result = new ArrayBuffer(byteLength);

    if (floatLength) {
      var view = new Float64Array(result, 0, floatLength);
      view.set(new Float64Array(buffer, 0, floatLength));
    }
    if (byteLength != offset) {
      view = new Uint8Array(result, offset);
      view.set(new Uint8Array(buffer, offset));
    }
    return result;
  };
}

module.exports = bufferClone;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../lang/isNative":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isNative.js","../utility/constant":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/utility/constant.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/createAssigner.js":[function(require,module,exports){
var bindCallback = require('./bindCallback'),
    isIterateeCall = require('./isIterateeCall');

/**
 * Creates a function that assigns properties of source object(s) to a given
 * destination object.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return function() {
    var length = arguments.length,
        object = arguments[0];

    if (length < 2 || object == null) {
      return object;
    }
    if (length > 3 && isIterateeCall(arguments[1], arguments[2], arguments[3])) {
      length = 2;
    }
    // Juggle arguments.
    if (length > 3 && typeof arguments[length - 2] == 'function') {
      var customizer = bindCallback(arguments[--length - 1], arguments[length--], 5);
    } else if (length > 2 && typeof arguments[length - 1] == 'function') {
      customizer = arguments[--length];
    }
    var index = 0;
    while (++index < length) {
      var source = arguments[index];
      if (source) {
        assigner(object, source, customizer);
      }
    }
    return object;
  };
}

module.exports = createAssigner;

},{"./bindCallback":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/bindCallback.js","./isIterateeCall":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isIterateeCall.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/equalArrays.js":[function(require,module,exports){
/**
 * A specialized version of `baseIsEqualDeep` for arrays with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Array} array The array to compare.
 * @param {Array} other The other array to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing arrays.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the arrays are equivalent, else `false`.
 */
function equalArrays(array, other, equalFunc, customizer, isWhere, stackA, stackB) {
  var index = -1,
      arrLength = array.length,
      othLength = other.length,
      result = true;

  if (arrLength != othLength && !(isWhere && othLength > arrLength)) {
    return false;
  }
  // Deep compare the contents, ignoring non-numeric properties.
  while (result && ++index < arrLength) {
    var arrValue = array[index],
        othValue = other[index];

    result = undefined;
    if (customizer) {
      result = isWhere
        ? customizer(othValue, arrValue, index)
        : customizer(arrValue, othValue, index);
    }
    if (typeof result == 'undefined') {
      // Recursively compare arrays (susceptible to call stack limits).
      if (isWhere) {
        var othIndex = othLength;
        while (othIndex--) {
          othValue = other[othIndex];
          result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isWhere, stackA, stackB);
          if (result) {
            break;
          }
        }
      } else {
        result = (arrValue && arrValue === othValue) || equalFunc(arrValue, othValue, customizer, isWhere, stackA, stackB);
      }
    }
  }
  return !!result;
}

module.exports = equalArrays;

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/equalByTag.js":[function(require,module,exports){
/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

/**
 * A specialized version of `baseIsEqualDeep` for comparing objects of
 * the same `toStringTag`.
 *
 * **Note:** This function only supports comparing values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 * @private
 * @param {Object} value The object to compare.
 * @param {Object} other The other object to compare.
 * @param {string} tag The `toStringTag` of the objects to compare.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalByTag(object, other, tag) {
  switch (tag) {
    case boolTag:
    case dateTag:
      // Coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal.
      return +object == +other;

    case errorTag:
      return object.name == other.name && object.message == other.message;

    case numberTag:
      // Treat `NaN` vs. `NaN` as equal.
      return (object != +object)
        ? other != +other
        // But, treat `-0` vs. `+0` as not equal.
        : (object == 0 ? ((1 / object) == (1 / other)) : object == +other);

    case regexpTag:
    case stringTag:
      // Coerce regexes to strings and treat strings primitives and string
      // objects as equal. See https://es5.github.io/#x15.10.6.4 for more details.
      return object == (other + '');
  }
  return false;
}

module.exports = equalByTag;

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/equalObjects.js":[function(require,module,exports){
var keys = require('../object/keys');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A specialized version of `baseIsEqualDeep` for objects with support for
 * partial deep comparisons.
 *
 * @private
 * @param {Object} object The object to compare.
 * @param {Object} other The other object to compare.
 * @param {Function} equalFunc The function to determine equivalents of values.
 * @param {Function} [customizer] The function to customize comparing values.
 * @param {boolean} [isWhere] Specify performing partial comparisons.
 * @param {Array} [stackA] Tracks traversed `value` objects.
 * @param {Array} [stackB] Tracks traversed `other` objects.
 * @returns {boolean} Returns `true` if the objects are equivalent, else `false`.
 */
function equalObjects(object, other, equalFunc, customizer, isWhere, stackA, stackB) {
  var objProps = keys(object),
      objLength = objProps.length,
      othProps = keys(other),
      othLength = othProps.length;

  if (objLength != othLength && !isWhere) {
    return false;
  }
  var hasCtor,
      index = -1;

  while (++index < objLength) {
    var key = objProps[index],
        result = hasOwnProperty.call(other, key);

    if (result) {
      var objValue = object[key],
          othValue = other[key];

      result = undefined;
      if (customizer) {
        result = isWhere
          ? customizer(othValue, objValue, key)
          : customizer(objValue, othValue, key);
      }
      if (typeof result == 'undefined') {
        // Recursively compare objects (susceptible to call stack limits).
        result = (objValue && objValue === othValue) || equalFunc(objValue, othValue, customizer, isWhere, stackA, stackB);
      }
    }
    if (!result) {
      return false;
    }
    hasCtor || (hasCtor = key == 'constructor');
  }
  if (!hasCtor) {
    var objCtor = object.constructor,
        othCtor = other.constructor;

    // Non `Object` object instances with different constructors are not equal.
    if (objCtor != othCtor && ('constructor' in object && 'constructor' in other) &&
        !(typeof objCtor == 'function' && objCtor instanceof objCtor && typeof othCtor == 'function' && othCtor instanceof othCtor)) {
      return false;
    }
  }
  return true;
}

module.exports = equalObjects;

},{"../object/keys":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/object/keys.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/initCloneArray.js":[function(require,module,exports){
/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Initializes an array clone.
 *
 * @private
 * @param {Array} array The array to clone.
 * @returns {Array} Returns the initialized clone.
 */
function initCloneArray(array) {
  var length = array.length,
      result = new array.constructor(length);

  // Add array properties assigned by `RegExp#exec`.
  if (length && typeof array[0] == 'string' && hasOwnProperty.call(array, 'index')) {
    result.index = array.index;
    result.input = array.input;
  }
  return result;
}

module.exports = initCloneArray;

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/initCloneByTag.js":[function(require,module,exports){
var bufferClone = require('./bufferClone');

/** `Object#toString` result references. */
var boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    numberTag = '[object Number]',
    regexpTag = '[object RegExp]',
    stringTag = '[object String]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to match `RegExp` flags from their coerced string values. */
var reFlags = /\w*$/;

/**
 * Initializes an object clone based on its `toStringTag`.
 *
 * **Note:** This function only supports cloning values with tags of
 * `Boolean`, `Date`, `Error`, `Number`, `RegExp`, or `String`.
 *
 *
 * @private
 * @param {Object} object The object to clone.
 * @param {string} tag The `toStringTag` of the object to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneByTag(object, tag, isDeep) {
  var Ctor = object.constructor;
  switch (tag) {
    case arrayBufferTag:
      return bufferClone(object);

    case boolTag:
    case dateTag:
      return new Ctor(+object);

    case float32Tag: case float64Tag:
    case int8Tag: case int16Tag: case int32Tag:
    case uint8Tag: case uint8ClampedTag: case uint16Tag: case uint32Tag:
      var buffer = object.buffer;
      return new Ctor(isDeep ? bufferClone(buffer) : buffer, object.byteOffset, object.length);

    case numberTag:
    case stringTag:
      return new Ctor(object);

    case regexpTag:
      var result = new Ctor(object.source, reFlags.exec(object));
      result.lastIndex = object.lastIndex;
  }
  return result;
}

module.exports = initCloneByTag;

},{"./bufferClone":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/bufferClone.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/initCloneObject.js":[function(require,module,exports){
/**
 * Initializes an object clone.
 *
 * @private
 * @param {Object} object The object to clone.
 * @returns {Object} Returns the initialized clone.
 */
function initCloneObject(object) {
  var Ctor = object.constructor;
  if (!(typeof Ctor == 'function' && Ctor instanceof Ctor)) {
    Ctor = Object;
  }
  return new Ctor;
}

module.exports = initCloneObject;

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isBindable.js":[function(require,module,exports){
var baseSetData = require('./baseSetData'),
    isNative = require('../lang/isNative'),
    support = require('../support');

/** Used to detect named functions. */
var reFuncName = /^\s*function[ \n\r\t]+\w/;

/** Used to detect functions containing a `this` reference. */
var reThis = /\bthis\b/;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Checks if `func` is eligible for `this` binding.
 *
 * @private
 * @param {Function} func The function to check.
 * @returns {boolean} Returns `true` if `func` is eligible, else `false`.
 */
function isBindable(func) {
  var result = !(support.funcNames ? func.name : support.funcDecomp);

  if (!result) {
    var source = fnToString.call(func);
    if (!support.funcNames) {
      result = !reFuncName.test(source);
    }
    if (!result) {
      // Check if `func` references the `this` keyword and store the result.
      result = reThis.test(source) || isNative(func);
      baseSetData(func, result);
    }
  }
  return result;
}

module.exports = isBindable;

},{"../lang/isNative":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isNative.js","../support":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/support.js","./baseSetData":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseSetData.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isIndex.js":[function(require,module,exports){
/**
 * Used as the maximum length of an array-like value.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  value = +value;
  length = length == null ? MAX_SAFE_INTEGER : length;
  return value > -1 && value % 1 == 0 && value < length;
}

module.exports = isIndex;

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isIterateeCall.js":[function(require,module,exports){
var isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    isObject = require('../lang/isObject');

/**
 * Checks if the provided arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call, else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number') {
    var length = object.length,
        prereq = isLength(length) && isIndex(index, length);
  } else {
    prereq = type == 'string' && index in object;
  }
  if (prereq) {
    var other = object[index];
    return value === value ? value === other : other !== other;
  }
  return false;
}

module.exports = isIterateeCall;

},{"../lang/isObject":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isObject.js","./isIndex":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isIndex.js","./isLength":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isLength.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isLength.js":[function(require,module,exports){
/**
 * Used as the maximum length of an array-like value.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.max_safe_integer)
 * for more details.
 */
var MAX_SAFE_INTEGER = Math.pow(2, 53) - 1;

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This function is based on ES `ToLength`. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-tolength)
 * for more details.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 */
function isLength(value) {
  return typeof value == 'number' && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

module.exports = isLength;

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isObjectLike.js":[function(require,module,exports){
/**
 * Checks if `value` is object-like.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 */
function isObjectLike(value) {
  return (value && typeof value == 'object') || false;
}

module.exports = isObjectLike;

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isStrictComparable.js":[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Checks if `value` is suitable for strict equality comparisons, i.e. `===`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` if suitable for strict
 *  equality comparisons, else `false`.
 */
function isStrictComparable(value) {
  return value === value && (value === 0 ? ((1 / value) > 0) : !isObject(value));
}

module.exports = isStrictComparable;

},{"../lang/isObject":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isObject.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/metaMap.js":[function(require,module,exports){
(function (global){
var isNative = require('../lang/isNative');

/** Native method references. */
var WeakMap = isNative(WeakMap = global.WeakMap) && WeakMap;

/** Used to store function metadata. */
var metaMap = WeakMap && new WeakMap;

module.exports = metaMap;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../lang/isNative":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isNative.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/shimIsPlainObject.js":[function(require,module,exports){
var baseForIn = require('./baseForIn'),
    isObjectLike = require('./isObjectLike');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * A fallback implementation of `_.isPlainObject` which checks if `value`
 * is an object created by the `Object` constructor or has a `[[Prototype]]`
 * of `null`.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 */
function shimIsPlainObject(value) {
  var Ctor;

  // Exit early for non `Object` objects.
  if (!(isObjectLike(value) && objToString.call(value) == objectTag) ||
      (!hasOwnProperty.call(value, 'constructor') &&
        (Ctor = value.constructor, typeof Ctor == 'function' && !(Ctor instanceof Ctor)))) {
    return false;
  }
  // IE < 9 iterates inherited properties before own properties. If the first
  // iterated property is an object's own property then there are no inherited
  // enumerable properties.
  var result;
  // In most environments an object's own properties are iterated before
  // its inherited properties. If the last iterated property is an object's
  // own property then there are no inherited enumerable properties.
  baseForIn(value, function(subValue, key) {
    result = key;
  });
  return typeof result == 'undefined' || hasOwnProperty.call(value, result);
}

module.exports = shimIsPlainObject;

},{"./baseForIn":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseForIn.js","./isObjectLike":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isObjectLike.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/shimKeys.js":[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('./isIndex'),
    isLength = require('./isLength'),
    keysIn = require('../object/keysIn'),
    support = require('../support');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which creates an array of the
 * own enumerable property names of `object`.
 *
 * @private
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 */
function shimKeys(object) {
  var props = keysIn(object),
      propsLength = props.length,
      length = propsLength && object.length;

  var allowIndexes = length && isLength(length) &&
    (isArray(object) || (support.nonEnumArgs && isArguments(object)));

  var index = -1,
      result = [];

  while (++index < propsLength) {
    var key = props[index];
    if ((allowIndexes && isIndex(key, length)) || hasOwnProperty.call(object, key)) {
      result.push(key);
    }
  }
  return result;
}

module.exports = shimKeys;

},{"../lang/isArguments":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isArguments.js","../lang/isArray":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isArray.js","../object/keysIn":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/object/keysIn.js","../support":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/support.js","./isIndex":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isIndex.js","./isLength":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isLength.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/toIterable.js":[function(require,module,exports){
var isLength = require('./isLength'),
    isObject = require('../lang/isObject'),
    values = require('../object/values');

/**
 * Converts `value` to an array-like object if it is not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Array|Object} Returns the array-like object.
 */
function toIterable(value) {
  if (value == null) {
    return [];
  }
  if (!isLength(value.length)) {
    return values(value);
  }
  return isObject(value) ? value : Object(value);
}

module.exports = toIterable;

},{"../lang/isObject":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isObject.js","../object/values":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/object/values.js","./isLength":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isLength.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/toObject.js":[function(require,module,exports){
var isObject = require('../lang/isObject');

/**
 * Converts `value` to an object if it is not one.
 *
 * @private
 * @param {*} value The value to process.
 * @returns {Object} Returns the object.
 */
function toObject(value) {
  return isObject(value) ? value : Object(value);
}

module.exports = toObject;

},{"../lang/isObject":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isObject.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/clone.js":[function(require,module,exports){
var baseClone = require('../internal/baseClone'),
    bindCallback = require('../internal/bindCallback'),
    isIterateeCall = require('../internal/isIterateeCall');

/**
 * Creates a clone of `value`. If `isDeep` is `true` nested objects are cloned,
 * otherwise they are assigned by reference. If `customizer` is provided it is
 * invoked to produce the cloned values. If `customizer` returns `undefined`
 * cloning is handled by the method instead. The `customizer` is bound to
 * `thisArg` and invoked with two argument; (value [, index|key, object]).
 *
 * **Note:** This method is loosely based on the structured clone algorithm.
 * The enumerable properties of `arguments` objects and objects created by
 * constructors other than `Object` are cloned to plain `Object` objects. An
 * empty object is returned for uncloneable values such as functions, DOM nodes,
 * Maps, Sets, and WeakMaps. See the [HTML5 specification](http://www.w3.org/TR/html5/infrastructure.html#internal-structured-cloning-algorithm)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to clone.
 * @param {boolean} [isDeep] Specify a deep clone.
 * @param {Function} [customizer] The function to customize cloning values.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {*} Returns the cloned value.
 * @example
 *
 * var users = [
 *   { 'user': 'barney' },
 *   { 'user': 'fred' }
 * ];
 *
 * var shallow = _.clone(users);
 * shallow[0] === users[0];
 * // => true
 *
 * var deep = _.clone(users, true);
 * deep[0] === users[0];
 * // => false
 *
 * // using a customizer callback
 * var el = _.clone(document.body, function(value) {
 *   if (_.isElement(value)) {
 *     return value.cloneNode(false);
 *   }
 * });
 *
 * el === document.body
 * // => false
 * el.nodeName
 * // => BODY
 * el.childNodes.length;
 * // => 0
 */
function clone(value, isDeep, customizer, thisArg) {
  if (isDeep && typeof isDeep != 'boolean' && isIterateeCall(value, isDeep, customizer)) {
    isDeep = false;
  }
  else if (typeof isDeep == 'function') {
    thisArg = customizer;
    customizer = isDeep;
    isDeep = false;
  }
  customizer = typeof customizer == 'function' && bindCallback(customizer, thisArg, 1);
  return baseClone(value, isDeep, customizer);
}

module.exports = clone;

},{"../internal/baseClone":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseClone.js","../internal/bindCallback":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/bindCallback.js","../internal/isIterateeCall":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isIterateeCall.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isArguments.js":[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as an `arguments` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  var length = isObjectLike(value) ? value.length : undefined;
  return (isLength(length) && objToString.call(value) == argsTag) || false;
}

module.exports = isArguments;

},{"../internal/isLength":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isLength.js","../internal/isObjectLike":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isObjectLike.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isArray.js":[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isNative = require('./isNative'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var arrayTag = '[object Array]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/* Native method references for those with the same name as other `lodash` methods. */
var nativeIsArray = isNative(nativeIsArray = Array.isArray) && nativeIsArray;

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(function() { return arguments; }());
 * // => false
 */
var isArray = nativeIsArray || function(value) {
  return (isObjectLike(value) && isLength(value.length) && objToString.call(value) == arrayTag) || false;
};

module.exports = isArray;

},{"../internal/isLength":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isLength.js","../internal/isObjectLike":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isObjectLike.js","./isNative":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isNative.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isBoolean.js":[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var boolTag = '[object Boolean]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a boolean primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isBoolean(false);
 * // => true
 *
 * _.isBoolean(null);
 * // => false
 */
function isBoolean(value) {
  return (value === true || value === false || isObjectLike(value) && objToString.call(value) == boolTag) || false;
}

module.exports = isBoolean;

},{"../internal/isObjectLike":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isObjectLike.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isFunction.js":[function(require,module,exports){
(function (global){
var baseIsFunction = require('../internal/baseIsFunction'),
    isNative = require('./isNative');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/** Native method references. */
var Uint8Array = isNative(Uint8Array = global.Uint8Array) && Uint8Array;

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
var isFunction = !(baseIsFunction(/x/) || (Uint8Array && !baseIsFunction(Uint8Array))) ? baseIsFunction : function(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in older versions of Chrome and Safari which return 'function' for regexes
  // and Safari 8 equivalents which return 'object' for typed array constructors.
  return objToString.call(value) == funcTag;
};

module.exports = isFunction;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"../internal/baseIsFunction":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseIsFunction.js","./isNative":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isNative.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isNative.js":[function(require,module,exports){
var escapeRegExp = require('../string/escapeRegExp'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var funcTag = '[object Function]';

/** Used to detect host constructors (Safari > 5). */
var reHostCtor = /^\[object .+?Constructor\]$/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to resolve the decompiled source of functions. */
var fnToString = Function.prototype.toString;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/** Used to detect if a method is native. */
var reNative = RegExp('^' +
  escapeRegExp(objToString)
  .replace(/toString|(function).*?(?=\\\()| for .+?(?=\\\])/g, '$1.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a native function, else `false`.
 * @example
 *
 * _.isNative(Array.prototype.push);
 * // => true
 *
 * _.isNative(_);
 * // => false
 */
function isNative(value) {
  if (value == null) {
    return false;
  }
  if (objToString.call(value) == funcTag) {
    return reNative.test(fnToString.call(value));
  }
  return (isObjectLike(value) && reHostCtor.test(value)) || false;
}

module.exports = isNative;

},{"../internal/isObjectLike":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isObjectLike.js","../string/escapeRegExp":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/string/escapeRegExp.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isObject.js":[function(require,module,exports){
/**
 * Checks if `value` is the language type of `Object`.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * **Note:** See the [ES5 spec](https://es5.github.io/#x8) for more details.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // Avoid a V8 JIT bug in Chrome 19-20.
  // See https://code.google.com/p/v8/issues/detail?id=2291 for more details.
  var type = typeof value;
  return type == 'function' || (value && type == 'object') || false;
}

module.exports = isObject;

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isPlainObject.js":[function(require,module,exports){
var isNative = require('./isNative'),
    shimIsPlainObject = require('../internal/shimIsPlainObject');

/** `Object#toString` result references. */
var objectTag = '[object Object]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/** Native method references. */
var getPrototypeOf = isNative(getPrototypeOf = Object.getPrototypeOf) && getPrototypeOf;

/**
 * Checks if `value` is a plain object, that is, an object created by the
 * `Object` constructor or one with a `[[Prototype]]` of `null`.
 *
 * **Note:** This method assumes objects created by the `Object` constructor
 * have no inherited enumerable properties.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a plain object, else `false`.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * _.isPlainObject(new Foo);
 * // => false
 *
 * _.isPlainObject([1, 2, 3]);
 * // => false
 *
 * _.isPlainObject({ 'x': 0, 'y': 0 });
 * // => true
 *
 * _.isPlainObject(Object.create(null));
 * // => true
 */
var isPlainObject = !getPrototypeOf ? shimIsPlainObject : function(value) {
  if (!(value && objToString.call(value) == objectTag)) {
    return false;
  }
  var valueOf = value.valueOf,
      objProto = isNative(valueOf) && (objProto = getPrototypeOf(valueOf)) && getPrototypeOf(objProto);

  return objProto
    ? (value == objProto || getPrototypeOf(value) == objProto)
    : shimIsPlainObject(value);
};

module.exports = isPlainObject;

},{"../internal/shimIsPlainObject":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/shimIsPlainObject.js","./isNative":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isNative.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isString.js":[function(require,module,exports){
var isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var stringTag = '[object String]';

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a `String` primitive or object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isString('abc');
 * // => true
 *
 * _.isString(1);
 * // => false
 */
function isString(value) {
  return typeof value == 'string' || (isObjectLike(value) && objToString.call(value) == stringTag) || false;
}

module.exports = isString;

},{"../internal/isObjectLike":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isObjectLike.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isTypedArray.js":[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isObjectLike = require('../internal/isObjectLike');

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    arrayTag = '[object Array]',
    boolTag = '[object Boolean]',
    dateTag = '[object Date]',
    errorTag = '[object Error]',
    funcTag = '[object Function]',
    mapTag = '[object Map]',
    numberTag = '[object Number]',
    objectTag = '[object Object]',
    regexpTag = '[object RegExp]',
    setTag = '[object Set]',
    stringTag = '[object String]',
    weakMapTag = '[object WeakMap]';

var arrayBufferTag = '[object ArrayBuffer]',
    float32Tag = '[object Float32Array]',
    float64Tag = '[object Float64Array]',
    int8Tag = '[object Int8Array]',
    int16Tag = '[object Int16Array]',
    int32Tag = '[object Int32Array]',
    uint8Tag = '[object Uint8Array]',
    uint8ClampedTag = '[object Uint8ClampedArray]',
    uint16Tag = '[object Uint16Array]',
    uint32Tag = '[object Uint32Array]';

/** Used to identify `toStringTag` values of typed arrays. */
var typedArrayTags = {};
typedArrayTags[float32Tag] = typedArrayTags[float64Tag] =
typedArrayTags[int8Tag] = typedArrayTags[int16Tag] =
typedArrayTags[int32Tag] = typedArrayTags[uint8Tag] =
typedArrayTags[uint8ClampedTag] = typedArrayTags[uint16Tag] =
typedArrayTags[uint32Tag] = true;
typedArrayTags[argsTag] = typedArrayTags[arrayTag] =
typedArrayTags[arrayBufferTag] = typedArrayTags[boolTag] =
typedArrayTags[dateTag] = typedArrayTags[errorTag] =
typedArrayTags[funcTag] = typedArrayTags[mapTag] =
typedArrayTags[numberTag] = typedArrayTags[objectTag] =
typedArrayTags[regexpTag] = typedArrayTags[setTag] =
typedArrayTags[stringTag] = typedArrayTags[weakMapTag] = false;

/** Used for native method references. */
var objectProto = Object.prototype;

/**
 * Used to resolve the `toStringTag` of values.
 * See the [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.prototype.tostring)
 * for more details.
 */
var objToString = objectProto.toString;

/**
 * Checks if `value` is classified as a typed array.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is correctly classified, else `false`.
 * @example
 *
 * _.isTypedArray(new Uint8Array);
 * // => true
 *
 * _.isTypedArray([]);
 * // => false
 */
function isTypedArray(value) {
  return (isObjectLike(value) && isLength(value.length) && typedArrayTags[objToString.call(value)]) || false;
}

module.exports = isTypedArray;

},{"../internal/isLength":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isLength.js","../internal/isObjectLike":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isObjectLike.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/toPlainObject.js":[function(require,module,exports){
var baseCopy = require('../internal/baseCopy'),
    keysIn = require('../object/keysIn');

/**
 * Converts `value` to a plain object flattening inherited enumerable
 * properties of `value` to own properties of the plain object.
 *
 * @static
 * @memberOf _
 * @category Lang
 * @param {*} value The value to convert.
 * @returns {Object} Returns the converted plain object.
 * @example
 *
 * function Foo() {
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.assign({ 'a': 1 }, new Foo);
 * // => { 'a': 1, 'b': 2 }
 *
 * _.assign({ 'a': 1 }, _.toPlainObject(new Foo));
 * // => { 'a': 1, 'b': 2, 'c': 3 }
 */
function toPlainObject(value) {
  return baseCopy(value, keysIn(value));
}

module.exports = toPlainObject;

},{"../internal/baseCopy":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseCopy.js","../object/keysIn":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/object/keysIn.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/object/keys.js":[function(require,module,exports){
var isLength = require('../internal/isLength'),
    isNative = require('../lang/isNative'),
    isObject = require('../lang/isObject'),
    shimKeys = require('../internal/shimKeys');

/* Native method references for those with the same name as other `lodash` methods. */
var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](https://people.mozilla.org/~jorendorff/es6-draft.html#sec-object.keys)
 * for more details.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  if (object) {
    var Ctor = object.constructor,
        length = object.length;
  }
  if ((typeof Ctor == 'function' && Ctor.prototype === object) ||
     (typeof object != 'function' && (length && isLength(length)))) {
    return shimKeys(object);
  }
  return isObject(object) ? nativeKeys(object) : [];
};

module.exports = keys;

},{"../internal/isLength":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isLength.js","../internal/shimKeys":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/shimKeys.js","../lang/isNative":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isNative.js","../lang/isObject":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isObject.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/object/keysIn.js":[function(require,module,exports){
var isArguments = require('../lang/isArguments'),
    isArray = require('../lang/isArray'),
    isIndex = require('../internal/isIndex'),
    isLength = require('../internal/isLength'),
    isObject = require('../lang/isObject'),
    support = require('../support');

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  if (object == null) {
    return [];
  }
  if (!isObject(object)) {
    object = Object(object);
  }
  var length = object.length;
  length = (length && isLength(length) &&
    (isArray(object) || (support.nonEnumArgs && isArguments(object))) && length) || 0;

  var Ctor = object.constructor,
      index = -1,
      isProto = typeof Ctor == 'function' && Ctor.prototype === object,
      result = Array(length),
      skipIndexes = length > 0;

  while (++index < length) {
    result[index] = (index + '');
  }
  for (var key in object) {
    if (!(skipIndexes && isIndex(key, length)) &&
        !(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

module.exports = keysIn;

},{"../internal/isIndex":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isIndex.js","../internal/isLength":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/isLength.js","../lang/isArguments":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isArguments.js","../lang/isArray":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isArray.js","../lang/isObject":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isObject.js","../support":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/support.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/object/mapValues.js":[function(require,module,exports){
var baseCallback = require('../internal/baseCallback'),
    baseForOwn = require('../internal/baseForOwn');

/**
 * Creates an object with the same keys as `object` and values generated by
 * running each own enumerable property of `object` through `iteratee`. The
 * iteratee function is bound to `thisArg` and invoked with three arguments;
 * (value, key, object).
 *
 * If a property name is provided for `iteratee` the created `_.property`
 * style callback returns the property value of the given element.
 *
 * If a value is also provided for `thisArg` the created `_.matchesProperty`
 * style callback returns `true` for elements that have a matching property
 * value, else `false`.
 *
 * If an object is provided for `iteratee` the created `_.matches` style
 * callback returns `true` for elements that have the properties of the given
 * object, else `false`.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function|Object|string} [iteratee=_.identity] The function invoked
 *  per iteration.
 * @param {*} [thisArg] The `this` binding of `iteratee`.
 * @returns {Object} Returns the new mapped object.
 * @example
 *
 * _.mapValues({ 'a': 1, 'b': 2 }, function(n) {
 *   return n * 3;
 * });
 * // => { 'a': 3, 'b': 6 }
 *
 * var users = {
 *   'fred':    { 'user': 'fred',    'age': 40 },
 *   'pebbles': { 'user': 'pebbles', 'age': 1 }
 * };
 *
 * // using the `_.property` callback shorthand
 * _.mapValues(users, 'age');
 * // => { 'fred': 40, 'pebbles': 1 } (iteration order is not guaranteed)
 */
function mapValues(object, iteratee, thisArg) {
  var result = {};
  iteratee = baseCallback(iteratee, thisArg, 3);

  baseForOwn(object, function(value, key, object) {
    result[key] = iteratee(value, key, object);
  });
  return result;
}

module.exports = mapValues;

},{"../internal/baseCallback":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseCallback.js","../internal/baseForOwn":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseForOwn.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/object/merge.js":[function(require,module,exports){
var baseMerge = require('../internal/baseMerge'),
    createAssigner = require('../internal/createAssigner');

/**
 * Recursively merges own enumerable properties of the source object(s), that
 * don't resolve to `undefined` into the destination object. Subsequent sources
 * overwrite property assignments of previous sources. If `customizer` is
 * provided it is invoked to produce the merged values of the destination and
 * source properties. If `customizer` returns `undefined` merging is handled
 * by the method instead. The `customizer` is bound to `thisArg` and invoked
 * with five arguments; (objectValue, sourceValue, key, object, source).
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @param {Function} [customizer] The function to customize merging properties.
 * @param {*} [thisArg] The `this` binding of `customizer`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * var users = {
 *   'data': [{ 'user': 'barney' }, { 'user': 'fred' }]
 * };
 *
 * var ages = {
 *   'data': [{ 'age': 36 }, { 'age': 40 }]
 * };
 *
 * _.merge(users, ages);
 * // => { 'data': [{ 'user': 'barney', 'age': 36 }, { 'user': 'fred', 'age': 40 }] }
 *
 * // using a customizer callback
 * var object = {
 *   'fruits': ['apple'],
 *   'vegetables': ['beet']
 * };
 *
 * var other = {
 *   'fruits': ['banana'],
 *   'vegetables': ['carrot']
 * };
 *
 * _.merge(object, other, function(a, b) {
 *   if (_.isArray(a)) {
 *     return a.concat(b);
 *   }
 * });
 * // => { 'fruits': ['apple', 'banana'], 'vegetables': ['beet', 'carrot'] }
 */
var merge = createAssigner(baseMerge);

module.exports = merge;

},{"../internal/baseMerge":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseMerge.js","../internal/createAssigner":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/createAssigner.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/object/values.js":[function(require,module,exports){
var baseValues = require('../internal/baseValues'),
    keys = require('./keys');

/**
 * Creates an array of the own enumerable property values of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property values.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.values(new Foo);
 * // => [1, 2] (iteration order is not guaranteed)
 *
 * _.values('hi');
 * // => ['h', 'i']
 */
function values(object) {
  return baseValues(object, keys(object));
}

module.exports = values;

},{"../internal/baseValues":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseValues.js","./keys":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/object/keys.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/string/escapeRegExp.js":[function(require,module,exports){
var baseToString = require('../internal/baseToString');

/**
 * Used to match `RegExp` special characters.
 * See this [article on `RegExp` characters](http://www.regular-expressions.info/characters.html#special)
 * for more details.
 */
var reRegExpChars = /[.*+?^${}()|[\]\/\\]/g,
    reHasRegExpChars = RegExp(reRegExpChars.source);

/**
 * Escapes the `RegExp` special characters "\", "^", "$", ".", "|", "?", "*",
 * "+", "(", ")", "[", "]", "{" and "}" in `string`.
 *
 * @static
 * @memberOf _
 * @category String
 * @param {string} [string=''] The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escapeRegExp('[lodash](https://lodash.com/)');
 * // => '\[lodash\]\(https://lodash\.com/\)'
 */
function escapeRegExp(string) {
  string = baseToString(string);
  return (string && reHasRegExpChars.test(string))
    ? string.replace(reRegExpChars, '\\$&')
    : string;
}

module.exports = escapeRegExp;

},{"../internal/baseToString":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/internal/baseToString.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/support.js":[function(require,module,exports){
(function (global){
var isNative = require('./lang/isNative');

/** Used to detect functions containing a `this` reference. */
var reThis = /\bthis\b/;

/** Used for native method references. */
var objectProto = Object.prototype;

/** Used to detect DOM support. */
var document = (document = global.window) && document.document;

/** Native method references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/**
 * An object environment feature flags.
 *
 * @static
 * @memberOf _
 * @type Object
 */
var support = {};

(function(x) {

  /**
   * Detect if functions can be decompiled by `Function#toString`
   * (all but Firefox OS certified apps, older Opera mobile browsers, and
   * the PlayStation 3; forced `false` for Windows 8 apps).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.funcDecomp = !isNative(global.WinRTError) && reThis.test(function() { return this; });

  /**
   * Detect if `Function#name` is supported (all but IE).
   *
   * @memberOf _.support
   * @type boolean
   */
  support.funcNames = typeof Function.name == 'string';

  /**
   * Detect if the DOM is supported.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.dom = document.createDocumentFragment().nodeType === 11;
  } catch(e) {
    support.dom = false;
  }

  /**
   * Detect if `arguments` object indexes are non-enumerable.
   *
   * In Firefox < 4, IE < 9, PhantomJS, and Safari < 5.1 `arguments` object
   * indexes are non-enumerable. Chrome < 25 and Node.js < 0.11.0 treat
   * `arguments` object indexes as non-enumerable and fail `hasOwnProperty`
   * checks for indexes that exceed their function's formal parameters with
   * associated values of `0`.
   *
   * @memberOf _.support
   * @type boolean
   */
  try {
    support.nonEnumArgs = !propertyIsEnumerable.call(arguments, 1);
  } catch(e) {
    support.nonEnumArgs = true;
  }
}(0, 0));

module.exports = support;

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{"./lang/isNative":"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/lang/isNative.js"}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/utility/constant.js":[function(require,module,exports){
/**
 * Creates a function that returns `value`.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value The value to return from the new function.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var object = { 'user': 'fred' };
 * var getter = _.constant(object);
 *
 * getter() === object;
 * // => true
 */
function constant(value) {
  return function() {
    return value;
  };
}

module.exports = constant;

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/lodash/utility/identity.js":[function(require,module,exports){
/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utility
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'user': 'fred' };
 *
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],"/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/node_modules/tiny-sprintf/dist/sprintf.js":[function(require,module,exports){
/**
 * sprintf implementation. Get pretty indented monospace strings.
 * @param {String} str - the string to parse
 * @param {...*} args - arguments, used in order, or referenced by n$
 * @returns {String}
 * @example
 * // Type casting...
 * sprintf('%s', 10); // '10'
 * sprintf('%s', 'abc'); // 'abc'
 *
 * // Escape anything else
 * sprintf('%%', 1); // '%'
 * sprintf('%T', 'abc'); // 'T'
 *
 * // Limit length
 * sprintf("%.5s", 'abcdef'); // 'bcdef'
 * sprintf("%-.5s", 'abcdef'); // 'abcde'
 *
 * // Indent to length
 * sprintf("%5s", 'a'); // '    a'
 * sprintf("%-5s", 'a'); // 'a    '
 * sprintf("%5.4s", 'abc'); // ' abc'
 * sprintf("%-5.4s", 'abc'); // 'abc '
 *
 * // Use pad chars
 * sprintf("%04s", 10); // "0010"
 * sprintf("%'#4s", 10); // "##10"
 *
 * // Use arguments in order
 * sprintf("%1$s, %2$s, %2$s, %1$s!", 'left', 'right'); // 'left, right, right, left!'
 */

var undefined,
	/* method vars */
	r = /%(\+)?(\d+\$)?(0|'.)?(-)?(\d+)?(\.\d+)?(.)/g,
	s = function(str) {
		var value,
			index = 1,
			execMatch,
			tempVar1,
			tempVar2,
			tempVar3;
		while (execMatch = r.exec(str)) {
			value = execMatch[7];

			// arg from index
			if ((tempVar2 = execMatch[2]) && tempVar2[(tempVar1 = tempVar2.length - 1)] == "$") {
				tempVar2 = tempVar2.substr(0, tempVar1);
			}

			if (s[tempVar1 = value.toLowerCase()] &&
				(tempVar3 = s[tempVar1](arguments[tempVar2 || index], /[A-Z]/.test(value), execMatch[1])) !== undefined) {

				value=''+tempVar3;

				// pad char
				if (tempVar1 = execMatch[3]) {
					if (tempVar1[0] == "'") {
						tempVar1 = tempVar1[1];
					}
				} else {
					tempVar1 = ' ';
				}
				if (tempVar2 = execMatch[5]) while (value.length < tempVar2) {
					value = execMatch[4] ? (value + tempVar1) : (tempVar1 + value);
				}

				if ((tempVar1 = execMatch[6] && execMatch[6].substr(1)) && value.length > tempVar1) {
					value = execMatch[4] ? value.substr(0, tempVar1) : value.substr(value.length - tempVar1);
				}
				index++;
			}
			str = str.substr(0, tempVar1 = execMatch.index) + value + str.substr(r.lastIndex);
			r.lastIndex = value.length + tempVar1;
		}
		return str;
	};

/**
 * Returns string value only if lowercase s.
 * @param {*} value
 * @param {Boolean} caps
 * @returns {String|undefined}
 */
s.s=function(value, caps) {
	return caps ? undefined : value+'';
};

module.exports = s;
},{}]},{},["/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/browser.js"])("/Users/fkling/Dropbox (Personal)/projects/jsnetworkx/jsnx/browser.js")
});