'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.toMapOfLists = toMapOfLists;
exports.fromMapOfLists = fromMapOfLists;
exports.toMapOfMaps = toMapOfMaps;
exports.fromMapOfMaps = fromMapOfMaps;

var
/*istanbul ignore next*/
_prepCreateUsing = _interopRequireDefault(require("./prepCreateUsing"));

var
/*istanbul ignore next*/
_internals = require("../_internals");

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * This module provides functions to convert JSNetworkX graphs to and from
 * non-NetworkX formats.
 */

/**
 * Return adjacency representation of graph as a map of lists.
 *
 * Completely ignores edge data for `MultiGraph` and `MultiDiGraph`.
 *
 * @param {Graph} G A graph
 * @param {Iterable=} optNodelist Use only nods specified in this list.
 *
 * @return {!Map}
 */
function toMapOfLists(G, optNodelist) {
  var map = new
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  Map();

  if (optNodelist != null) {
    Array.from(optNodelist).forEach(function (n)
    /*istanbul ignore next*/
    {
      return map.set(n, G.neighbors(n).filter(function (v)
      /*istanbul ignore next*/
      {
        return optNodelist.indexOf(v) > -1;
      }));
    });
  } else {
    /*istanbul ignore next*/
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (
      /*istanbul ignore next*/
      var _iterator = G[Symbol.iterator](), _step;
      /*istanbul ignore next*/
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      /*istanbul ignore next*/
      _iteratorNormalCompletion = true) {
        /*istanbul ignore next*/
        var n = _step.value;
        map.set(n, G.neighbors(n));
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

  return map;
}
/**
 * Return a graph from a map of lists.
 * *
 * @param {!Map} map A map of lists adjacency representation.
 * @param {Graph=} optCreateUsing Use specified graph for result.
 *    Otherwise a new graph is created.
 *
 * @return {!Graph}
 */


function fromMapOfLists(map, optCreateUsing) {
  var G =
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _prepCreateUsing[
  /*istanbul ignore next*/
  "default"])(optCreateUsing);
  G.addNodesFrom(map.keys());

  if (G.isMultigraph() && !G.isDirected()) {
    // a map_of_lists can't show multiedges.  BUT for undirected graphs,
    // each edge shows up twice in the map_of_lists.
    // So we need to treat this case separately.
    var seen = new
    /*istanbul ignore next*/
    _internals.
    /*istanbul ignore next*/
    Set();
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
      nbrlist.forEach(function (nbr)
      /*istanbul ignore next*/
      {
        return G.addEdge(node, nbr);
      });
    });
  }

  return G;
}
/**
 * Return adjacency representation of graph as a map of maps.
 *
 * @param {Graph} G A jsnx Graph
 * @param {Iterable=} optNodelist Use only nodes specified in nodelist
 * @param {Object=} optEdgeData If provided,  the value of the map will be
 *      set to edgeData for all edges.  This is useful to make
 *      an adjacency matrix type representation with 1 as the edge data.
 *      If optEdgeData is null or undefined, the edge data in G is used to
 *      fill the values.
 *      If G is a multigraph, the edge data is a dict for each pair (u,v).
 *
 * @return {!Map}
 */


function toMapOfMaps(G, optNodelist, optEdgeData) {
  var mapOfMaps = new
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  Map();

  if (optNodelist != null) {
    optNodelist = Array.from(optNodelist);
    optNodelist.forEach(function (u) {
      var mapOfU = mapOfMaps.set(u, new
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      Map());
      G.get(u).forEach(function (v, data) {
        if (optNodelist.indexOf(v) > -1) {
          mapOfU.set(v, optEdgeData == null ? data : optEdgeData);
        }
      });
    });
  } else {
    /*istanbul ignore next*/
    // nodelist is undefined
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      var _loop = function _loop() {
        var _step2$value = _slicedToArray(_step2.value, 2),
            nbrmap = _step2$value[0],
            u = _step2$value[1];

        /*eslint no-loop-func:0*/
        var mapOfU = mapOfMaps.set(u, new
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        Map());
        nbrmap.forEach(function (data, v) {
          mapOfU.set(v, optEdgeData == null ? data : optEdgeData);
        });
      };

      for (
      /*istanbul ignore next*/
      var _iterator2 = G.adjacencyIter()[Symbol.iterator](), _step2;
      /*istanbul ignore next*/
      !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
      /*istanbul ignore next*/
      _iteratorNormalCompletion2 = true) {
        /*istanbul ignore next*/
        _loop();
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

  return mapOfMaps;
}
/**
 * Return a graph from a map of maps.
 *
 * @param {!Map} map A map of maps adjacency representation.
 * @param {Graph=} optCreateUsing Use specified graph for result.
 *      Otherwise a new graph is created.
 * @param {boolean=} optMultigraphInput (default=False)
 *      When True, the values of the inner dict are assumed
 *      to be containers of edge data for multiple edges.
 *      Otherwise this routine assumes the edge data are singletons.
 *
 * @return {Graph}
 */


function fromMapOfMaps(map, optCreateUsing, optMultigraphInput) {
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
  Set(); // don't add both directions of undirected graph

  G.addNodesFrom(map.keys()); // is map a MultiGraph or MultiDiGraph?

  if (optMultigraphInput) {
    // make a copy  of the list of edge data (but not the edge data)
    if (G.isDirected()) {
      map.forEach(function (nbrs, u) {
        if (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        isArrayLike)(nbrs)) {
          // throw expection of not map (object)
          throw new TypeError('Value is not a map.');
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
        if (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        isArrayLike)(nbrs)) {
          // throw exception of not map
          throw new TypeError('Not a map');
        }

        nbrs.forEach(function (datadict, v) {
          // this works because sets convert the value to their string
          // representation
          if (!seen.has(
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          tuple2)(u, v))) {
            for (var key in datadict) {
              var data = datadict[key];

              if (isMultigraph) {
                G.addEdge(u, v, key, data);
              } else {
                G.addEdge(u, v, data);
              }
            }

            seen.add(
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            tuple2)(v, u));
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
        if (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        isArrayLike)(nbrs)) {
          // throw exception of not dict (object)
          throw new TypeError('Value is not a map');
        }

        nbrs.forEach(function (data, v) {
          if (!seen.has(
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          tuple2)(u, v))) {
            G.addEdge(u, v, data);
            seen.add(
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            tuple2)(v, u));
          }
        });
      });
    } else {
      map.forEach(function (nbrs, u) {
        if (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        isArrayLike)(nbrs)) {
          // throw exception of not dict (object)
          throw new TypeError('Value is not a map');
        }

        nbrs.forEach(function (data, v) {
          G.addEdge(u, v, data);
        });
      });
    }
  }

  return G;
}