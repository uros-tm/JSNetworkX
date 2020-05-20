'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSupported = isSupported;
exports.serialize = serialize;
exports.deserialize = deserialize;
exports.serializeAll = serializeAll;

var
/*istanbul ignore next*/
_isIterable = _interopRequireDefault(require("./isIterable"));

var
/*istanbul ignore next*/
_isPlainObject = _interopRequireDefault(require("./isPlainObject"));

var
/*istanbul ignore next*/
_Map = _interopRequireDefault(require("./Map"));

var
/*istanbul ignore next*/
_Set = _interopRequireDefault(require("./Set"));

var
/*istanbul ignore next*/
classes = _interopRequireWildcard(require("../classes"));

/*istanbul ignore next*/ function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var KEY = '__type-jsnx__';
/**
 * @fileoverview
 * Helper methods to serialize and unserialize data for communicating with
 * workers.
 */

function serializeSet(value) {
  /*istanbul ignore next*/
  var _ref;

  // TODO: serialize nested values
  return (
    /*istanbul ignore next*/
    _ref = {}, _defineProperty(_ref, KEY, 'Set'), _defineProperty(_ref, "data", Array.from(value.values())), _ref
  );
}

function deserializeSet(value) {
  return new
  /*istanbul ignore next*/
  _Set[
  /*istanbul ignore next*/
  "default"](value.data);
}

function serializeValues(
/*istanbul ignore next*/
_ref2) {
  /*istanbul ignore next*/
  var _ref3 = _slicedToArray(_ref2, 2),
      key = _ref3[0],
      value = _ref3[1];

  return [key, serialize(value)];
}

function serializeMap(value) {
  /*istanbul ignore next*/
  var _ref4;

  var serializedValues = Object.fromEntries(Object.entries(value).map(serializeValues));
  return (
    /*istanbul ignore next*/
    _ref4 = {}, _defineProperty(_ref4, KEY, 'Map'), _defineProperty(_ref4, "data", serializedValues), _ref4
  );
}

function deserializeMap(value) {
  return new
  /*istanbul ignore next*/
  _Map[
  /*istanbul ignore next*/
  "default"](value.data.map(function (kv)
  /*istanbul ignore next*/
  {
    return kv[1] = deserialize(kv[1]), kv;
  }));
}

function serializeGraph(value) {
  /*istanbul ignore next*/
  var _ref5;

  // TODO: serialize complex edge and node data
  return (
    /*istanbul ignore next*/
    _ref5 = {}, _defineProperty(_ref5, KEY, value.constructor.__name__), _defineProperty(_ref5, "data", value.graph), _defineProperty(_ref5, "nodes", Array.from(value.node)), _defineProperty(_ref5, "edges", value.edges(null, true)), _ref5
  );
}

function deserializeGraph(value) {
  var G = new classes[value[KEY]](value.edges, value.data);
  G.addNodesFrom(value.nodes);
  return G;
}
/**
 * Returns true if the value can be properly serialized, otherwise false.
 *
 * @param {*} value
 * @return {boolean}
 */


function isSupported(value) {
  var type =
  /*istanbul ignore next*/
  _typeof(value);

  return (// Primitives
    value == null || type === 'string' || type === 'number' || type === 'boolean' || // Objects and arrays (we just assume they contain only primitives)

    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _isPlainObject[
    /*istanbul ignore next*/
    "default"])(value) || Array.isArray(value) || // Our custom collections (shallow)
    value instanceof
    /*istanbul ignore next*/
    _Map[
    /*istanbul ignore next*/
    "default"] || value instanceof
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"] || // Graphs
    value.constructor.__name__ === 'Graph' || value.constructor.__name__ === 'DiGraph' || // Generic iterables

    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _isIterable[
    /*istanbul ignore next*/
    "default"])(value)
  );
}

function serialize(value) {
  // primitives
  var type =
  /*istanbul ignore next*/
  _typeof(value);

  if (!value || type === 'string' || type === 'number' || type === 'boolean') {
    return value;
  } // Collections


  if (value instanceof
  /*istanbul ignore next*/
  _Set[
  /*istanbul ignore next*/
  "default"]) {
    return serializeSet(value);
  } else if (value instanceof
  /*istanbul ignore next*/
  _Map[
  /*istanbul ignore next*/
  "default"]) {
    return serializeMap(value);
  } // Graphs
  else if (value.constructor.__name__ === 'Graph' || value.constructor.__name__ === 'DiGraph') {
      return serializeGraph(value);
    } // Iterables
    else if (
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _isIterable[
      /*istanbul ignore next*/
      "default"])(value)) {
        // We keep it simple for now and don't serialize the values of the iterable
        // itself
        return Array.from(value);
      } // TODO: Handle arrays and objects better
  // default


  return value;
}

function deserialize(value) {
  // primitives
  var type =
  /*istanbul ignore next*/
  _typeof(value);

  if (!value || type === 'string' || type === 'number' || type === 'boolean') {
    return value;
  } // custom serializtion?


  if (value[KEY]) {
    switch (value[KEY]) {
      case 'Map':
        return deserializeMap(value);

      case 'Set':
        return deserializeSet(value);

      case 'Graph':
      case 'DiGraph':
        return deserializeGraph(value);
    }
  } // TODO: Handle arrays and objects better
  // default


  return value;
}
/**
 * Serialize an array of values (e.g. arguments passed to a method).,
 *
 * @param {Array} values
 * @return {{serializable: bool, values: Array}}
 */


function serializeAll() {
  /*istanbul ignore next*/
  var values = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var serializedValues = new Array(values.length);
  var serializable = values.every(function (value, i) {
    var supported = isSupported(value);

    if (supported) {
      serializedValues[i] = serialize(value);
    }

    return supported;
  });
  return {
    serializable: serializable,
    serializedValues: serializedValues
  };
}