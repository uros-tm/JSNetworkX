'use strict';
/**
 * This module provides functions to convert
 * NetworkX graphs to and from other formats.
 *
 * The preferred way of converting data to a NetworkX graph
 * is through the graph constuctor.  The constructor calls
 * the to_networkx_graph() function which attempts to guess the
 * input type and convert it automatically.
 */

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toNetworkxGraph = toNetworkxGraph;
exports.convertToUndirected = convertToUndirected;
exports.convertToDirected = convertToDirected;
exports.toDictOfLists = toDictOfLists;
exports.fromDictOfLists = fromDictOfLists;
exports.toDictOfDicts = toDictOfDicts;
exports.fromDictOfDicts = fromDictOfDicts;
exports.toEdgelist = toEdgelist;
exports.fromEdgelist = fromEdgelist;

var
/*istanbul ignore next*/
convertMap = _interopRequireWildcard(require("./contrib/convert"));

var
/*istanbul ignore next*/
_prepCreateUsing = _interopRequireDefault(require("./contrib/prepCreateUsing"));

var
/*istanbul ignore next*/
_mapValues2 = _interopRequireDefault(require("lodash/mapValues"));

var
/*istanbul ignore next*/
_internals = require("./_internals");

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var hasOwn = Object.prototype.hasOwnProperty;
/**
 * Make a JSNetworkX graph from a known data structure.
 *
 * The preferred way to call this is automatically from the class constructor
 *
 * ```
 * var data = {0: {1 : {weight: 1}}} // object of objects single edge (0,1)
 * var G = new jsnx.Graph(d);
 * ```
 *
 * instead of the equivalent
 *
 * ```
 * var G = jsnx.fromDictOfDicts(d);
 * ```
 *
 * @param {?} data An object to be converted
 *   Current accepts types are:
 *
 *   - any JSNetworkX graph
 *   - object of objects
 *   - object of lists
 *   - list of edges
 *
 * @param {Graph=} optCreateUsing NetworkX graph
 *     Use specified graph for result.  Otherwise a new graph is created.
 * @param {boolean=} optMultigraphInput
 *     If `true` and  `data` is an object of objects,
 *     try to create a multigraph assuming object of objects of lists
 *     If data and createUsing are both multigraphs then create
 *     a multigraph from a multigraph.
 * @return {Graph}
 */

function toNetworkxGraph(data, optCreateUsing) {
  /*istanbul ignore next*/
  var optMultigraphInput = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var result = null; // jsnx graph

  if (hasOwn.call(data, 'adj')) {
    try {
      result = convertMap.fromMapOfMaps(data.adj, optCreateUsing, data.isMultigraph());

      if (hasOwn.call(data, 'graph') &&
      /*istanbul ignore next*/
      _typeof(data.graph) === 'object') {
        result.graph =
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        clone)(data.graph);
      }

      if (hasOwn.call(data, 'node') &&
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      isMap)(data.node)) {
        result.node = new
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        Map();
        data.node.forEach(function (element, k)
        /*istanbul ignore next*/
        {
          return result.node.set(k,
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          clone)(element));
        });
      }

      return result;
    } catch (ex) {
      throw ex;
    }
  } // map of maps / lists


  if (
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  isMap)(data)) {
    try {
      return convertMap.fromMapOfMaps(data, optCreateUsing, optMultigraphInput);
    } catch (e) {
      try {
        return convertMap.fromMapOfLists(data, optCreateUsing);
      } catch (ex) {
        throw new Error('Map data structure cannot be converted to a graph.');
      }
    }
  } // dict of dicts / lists


  if (
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  isPlainObject)(data)) {
    try {
      return fromDictOfDicts(data, optCreateUsing, optMultigraphInput);
    } catch (e) {
      try {
        return fromDictOfLists(data, optCreateUsing);
      } catch (ex) {
        throw new Error('Object data structure cannot be converted to a graph.');
      }
    }
  } // list of edges


  if (
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  isArrayLike)(data)) {
    try {
      return fromEdgelist(data, optCreateUsing);
    } catch (e) {
      throw new Error('Input is not a valid edge list');
    }
  }

  return result;
}
/**
 * Return a new undirected representation of the graph G.
 *
 * @param {Graph} G Graph to convert
 * @return {!Graph}
 */


function convertToUndirected(G) {
  return G.toUndirected();
}
/**
 * Return a new directed representation of the graph G.
 *
 * @param {Graph} G Graph to convert
 * @return {!Graph}
 */


function convertToDirected(G) {
  return G.toDirected();
}
/**
 * Return adjacency representation of graph as a dictionary of lists.
 *
 * Completely ignores edge data for MultiGraph and MultiDiGraph.
 *
 * @param {Graph} G A JSNetworkX graph
 * @param {Iterable=} optNodelist Use only nodes specified in nodelist
 *
 * @return {!Object.<Array>}
 */


function toDictOfLists(G, optNodelist) {
  var contains = function
  /*istanbul ignore next*/
  contains(n) {
    return optNodelist.indexOf(n) > -1;
  };

  var d = Object.create(null);

  if (optNodelist == null) {
    optNodelist = G;

    contains = function
    /*istanbul ignore next*/
    contains(n) {
      return optNodelist.hasNode(n);
    };
  } else {
    optNodelist = Array.from(optNodelist);
  }

  /*istanbul ignore next*/
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (
    /*istanbul ignore next*/
    var _iterator = optNodelist[Symbol.iterator](), _step;
    /*istanbul ignore next*/
    !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
    /*istanbul ignore next*/
    _iteratorNormalCompletion = true) {
      /*istanbul ignore next*/
      var n = _step.value;
      d[n] = G.neighbors(n).filter(contains);
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

  return d;
}
/**
 * Return a graph from a dictionary of lists.
 *
 * ### Examples
 *
 * ```
 * var data = {0: [1]}; // single edge (0,1)
 * var G = jsnx.fromDictOfLists(data);
 * // or
 * var G = new jsnx.Graph(data);
 * ```
 *
 * @param {!Object.<Array>} d A dictionary of lists adjacency representation.
 * @param {Graph=} optCreateUsing Use specified graph for result.
 *    Otherwise a new graph is created.
 * @return {!Graph}
 */


function fromDictOfLists(d, optCreateUsing) {
  var G =
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _prepCreateUsing[
  /*istanbul ignore next*/
  "default"])(optCreateUsing); // Convert numeric property names to numbers

  G.addNodesFrom(
  /*istanbul ignore next*/

  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee()
  /*istanbul ignore next*/
  {
    var n;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.t0 = regeneratorRuntime.keys(d);

          case 1:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 7;
              break;
            }

            n = _context.t1.value;
            _context.next = 5;
            return isNaN(n) ? n : +n;

          case 5:
            _context.next = 1;
            break;

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })());
  var node;
  var nbrlist;

  if (G.isMultigraph() && !G.isDirected()) {
    // a dict_of_lists can't show multiedges.  BUT for undirected graphs,
    // each edge shows up twice in the dict_of_lists.
    // So we need to treat this case separately.
    var seen = new
    /*istanbul ignore next*/
    _internals.
    /*istanbul ignore next*/
    Set();

    for (node in d) {
      nbrlist = d[node]; // treat numeric keys like numbers

      node = isNaN(node) ? node : +node;
      /*eslint no-loop-func:0*/

      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      forEach)(nbrlist, function (nbr) {
        if (!seen.has(nbr)) {
          G.addEdge(node, nbr);
        }
      });
      seen.add(node); // don't allow reverse edge to show up
    }
  } else {
    var edgeList = [];

    for (node in d) {
      nbrlist = d[node]; // treat numeric keys like numbers

      node = isNaN(node) ? node : +node;

      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      forEach)(nbrlist, function (nbr) {
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
 * @param {Iterable=} optNodelist Use only nodes specified in nodelist
 * @param {Object=} optEdgeData If provided,  the value of the dictionary will
 *      be set to edgeData for all edges.  This is useful to make
 *      an adjacency matrix type representation with 1 as the edge data.
 *      If edgedata is null or undefined, the edgedata in G is used to fill
 *      the values.
 *      If G is a multigraph, the edgedata is a dict for each pair (u,v).
 * @return {!Object.<Object>}
 */


function toDictOfDicts(G, optNodelist, optEdgeData) {
  var dod = {};

  if (optNodelist != null) {
    optNodelist = Array.from(optNodelist);

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
      // nodelist and edgeData are defined
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
      /*istanbul ignore next*/
      // dn = [nbrdict, u]
      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator2 = G.adjacencyIter()[Symbol.iterator](), _step2;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion2 = true) {
          /*istanbul ignore next*/
          var _step2$value = _slicedToArray(_step2.value, 2),
              nbrdict = _step2$value[0],
              u = _step2$value[1];

          /*jshint loopfunc:true*/
          dod[u] =
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _mapValues2[
          /*istanbul ignore next*/
          "default"])(nbrdict, function () {
            return optEdgeData;
          });
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
    } else {
      /*istanbul ignore next*/
      // edge_data is defined
      // dn = [nbrdict, u]
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator3 = G.adjacencyIter()[Symbol.iterator](), _step3;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion3 = true) {
          /*istanbul ignore next*/
          var _step3$value = _slicedToArray(_step3.value, 2),
              nbrdict = _step3$value[0],
              u = _step3$value[1];

          dod[u] =
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          clone)(nbrdict);
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
  }

  return dod;
}
/**
 * Return a graph from a dictionary of dictionaries.
 *
 *
 * ### Examples
 *
 * ```
 * var data = {0: {1: {weight: 1}}}; // single edge (0,1)
 * var G = jsnx.fromDictOfDicts(data);
 * // or
 * var G = new jsnx.Graph(data);
 * ```
 *
 * @param {!Object.<!Object>} d A dictionary of dictionaries adjacency
 *      representation.
 * @param {Graph=} optCreateUsing Use specified graph for result.
 *      Otherwise a new graph is created.
 * @param {boolean=} optMultigraphInput
 *      When `true`, the values of the inner object are assumed
 *      to be containers of edge data for multiple edges.
 *      Otherwise this routine assumes the edge data are singletons.
 *
 * @return {Graph}
 */


function fromDictOfDicts(d, optCreateUsing) {
  /*istanbul ignore next*/
  var optMultigraphInput = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  var G =
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _prepCreateUsing[
  /*istanbul ignore next*/
  "default"])(optCreateUsing);
  var seen = new
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  Set(); // Convert numeric property names to numbers

  G.addNodesFrom(
  /*istanbul ignore next*/

  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee2()
  /*istanbul ignore next*/
  {
    var n;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.t0 = regeneratorRuntime.keys(d);

          case 1:
            if ((_context2.t1 = _context2.t0()).done) {
              _context2.next = 7;
              break;
            }

            n = _context2.t1.value;
            _context2.next = 5;
            return isNaN(n) ? n : +n;

          case 5:
            _context2.next = 1;
            break;

          case 7:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })()); // is dict a MultiGraph or MultiDiGraph?

  if (optMultigraphInput) {
    // make a copy  of the list of edge data (but not the edge data)
    if (G.isDirected()) {
      for (var u in d) {
        var nbrs = d[u];

        if (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        isArrayLike)(nbrs)) {
          // throw exception of not dict (object)
          throw new TypeError('Inner object seems to be an array');
        } // treat numeric keys like numbers


        u = isNaN(u) ? u : +u;

        for (var v in nbrs) {
          var datadict = nbrs[v]; // treat numeric keys like numbers

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
      for (var _u in d) {
        var _nbrs = d[_u];

        if (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        isArrayLike)(_nbrs)) {
          // throw exception of not dict (object)
          throw new TypeError('Inner object seems to be an array');
        } // treat numeric keys like numbers


        _u = isNaN(_u) ? _u : +_u;

        for (var _v in _nbrs) {
          var _datadict = _nbrs[_v]; // treat numeric keys like numbers

          _v = isNaN(_v) ? _v : +_v;

          if (!seen.has([_u, _v])) {
            for (var _key in _datadict) {
              if (G.isMultigraph()) {
                G.addEdge(_u, _v, _key, _datadict[_key]);
              } else {
                G.addEdge(_u, _v, _datadict[_key]);
              }
            }

            seen.add([_v, _u]);
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
      for (var _u2 in d) {
        var _nbrs2 = d[_u2];

        if (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        isArrayLike)(_nbrs2)) {
          // throw exception of not dict (object)
          throw new TypeError('Inner object seems to be an array');
        } // treat numeric keys like numbers


        _u2 = isNaN(_u2) ? _u2 : +_u2;

        for (var _v2 in _nbrs2) {
          var data = _nbrs2[_v2];
          _v2 = isNaN(_v2) ? _v2 : +_v2;

          if (!seen.has([_u2, _v2])) {
            G.addEdge(_u2, _v2, data);
            seen.add([_v2, _u2]);
          }
        }
      }
    } else {
      for (var _u3 in d) {
        var _nbrs3 = d[_u3];

        if (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        isArrayLike)(_nbrs3)) {
          // throw exception of not dict (object)
          throw new TypeError('Inner object seems to be an array');
        } // treat numeric keys like numbers


        _u3 = isNaN(_u3) ? _u3 : +_u3;

        for (var _v3 in _nbrs3) {
          var _data = _nbrs3[_v3]; // treat numeric keys like numbers

          _v3 = isNaN(_v3) ? _v3 : +_v3;
          G.addEdge(_u3, _v3, _data);
        }
      }
    }
  }

  return G;
}
/**
 * Return a list of edges in the graph.
 *
 * @param {Graph} G A JSNetworkX graph
 * @param {Iterable=} optNodelist Use only nodes specified in nodelist
 * @return {!Array}
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
 * @param {Graph=} optCreateUsing Use specified graph for result.
 *      Otherwise a new graph is created.
 * @return {!Graph}
 */


function fromEdgelist(edgelist, optCreateUsing) {
  var G =
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _prepCreateUsing[
  /*istanbul ignore next*/
  "default"])(optCreateUsing);
  G.addEdgesFrom(edgelist);
  return G;
} // NOT IMPLEMENTED
// to_numpy_matrix
// from_numpy_matrix
// to_numpy_recarray
// to_scipy_sparse_matrix
// from_scipy_sparse_matrix
// setup_module