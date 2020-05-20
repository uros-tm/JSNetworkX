'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.hasPath = hasPath;
exports.shortestPath = shortestPath;
exports.shortestPathLength = shortestPathLength;

var
/*istanbul ignore next*/
_exceptions = require("../../exceptions");

var
/*istanbul ignore next*/
_unweighted = require("./unweighted");

var
/*istanbul ignore next*/
_weighted = require("./weighted");

/*istanbul ignore next*/ function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Return `true` if `G` has a path from `source to `target`, `false` otherwise.
 *
 * @param {Graph} G
 * @param {{source: Node, target: node}} parameters
 *   - source: Starting node for path
 *   - target: Ending node for path
 * @return {boolean}
 */
function hasPath(_x, _x2) {
  return _hasPath.apply(this, arguments);
}
/**
 * Compute shortest paths in the graph.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * jsnx.shortestPath(G, {source: 0, target: 4});
 * // [0, 1, 2, 3, 4]
 * var paths = jsnx.shortestPath(G, {source: 0}); // target not specified
 * paths.get(4);
 * // [0, 1, 2, 3, 4]
 * paths = jsnx.shortestPath(G {target: 4}); // source not specified
 * paths.get(0);
 * // [0, 1, 2, 3, 4]
 * paths = jsnx.shortestPath(G); // source, target not specified
 * paths.get(0).get(4);
 * // [0, 1, 2, 3, 4]
 * ```
 *
 * ### Notes
 *
 * There may be more than one shortest path between a source and a target.
 * This returns only one of them.
 *
 * @see allPairsShortestPath
 * @see allPairsDijkstraPath
 * @see singleSourceShortestPath
 * @see singleSourceDijkstraPath
 *
 * @param {Graph} G
 * @param {?{source: ?Node, target: ?Node, weight: ?string}=} optParameters
 *   - source: Starting node for path.
 *     If not specified, compute the shortest paths using all nodes as source
 *     nodes.
 *   - target: Ending node for path.
 *     If not specified, compute the shortest paths using all nodes as target
 *     nodes.
 *   - weight:
 *     If not specified, every edge has weight/distance/cost of 1.
 *     If a string, use this edge attribute as the edge weight. Any edg
 *     attribute not present defaults to 1.
 * @return {(Array|Map)} All returned paths include both the source and the
 *   target in the path.
 *
 *   If the `source` and `target` are both specified, return a single list
 *   of nodes in a shortest path from the source to the target.
 *
 *   If only the `source` is specified, return a Map keyed by
 *   targets with a list of nodes in a shortest path from the source
 *   to one of the targets.
 *
 *   If only the `target` is specified, return a Map keyed by
 *   sources with a list of nodes in a shortest path from one of the
 *   sources to the target.
 *
 *   If neither the `source` nor `target` are specified return a Map
 *   of Maps with `Map {source: Map {target: [list of nodes in path] }}`.
 */


/*istanbul ignore next*/
function _hasPath() {
  _hasPath = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee(G,
  /*istanbul ignore next*/
  _ref)
  /*istanbul ignore next*/
  {
    var source, target;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            source = _ref.source, target = _ref.target;
            _context.prev = 1;
            _context.next = 4;
            return shortestPath(G, {
              source: source,
              target: target
            });

          case 4:
            _context.next = 11;
            break;

          case 6:
            _context.prev = 6;
            _context.t0 = _context["catch"](1);

            if (!(
            /*istanbul ignore next*/
            _context.t0 instanceof
            /*istanbul ignore next*/
            _exceptions.
            /*istanbul ignore next*/
            JSNetworkXNoPath)) {
              _context.next = 10;
              break;
            }

            return _context.abrupt("return", false);

          case 10:
            throw _context.t0;

          case 11:
            return _context.abrupt("return", true);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 6]]);
  }));
  return _hasPath.apply(this, arguments);
}

/*istanbul ignore next*/
function shortestPath(_x3) {
  return _shortestPath.apply(this, arguments);
}
/**
 * Compute shortest path lengths in the graph.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * jsnx.shortestPathLength(G, {source: 0, target: 4});
 * // 4
 * var paths = jsnx.shortestPathLength(G, {source: 0}); // target not specified
 * paths.get(4);
 * // 4
 * paths = jsnx.shortestPathLength(G {target: 4}); // source not specified
 * paths.get(0);
 * // 4
 * paths = jsnx.shortestPathLength(G); // source, target not specified
 * paths.get(0).get(4);
 * // 4
 * ```
 *
 * ### Notes
 *
 * The length of the path is always 1 less than the number of nodes involved in
 * the path since the length measures the number of edges followed.
 *
 * For digraphs this returns the shortest directed path length. To find path
 * lengths in the reverse directio, use `G.reverse(false)` first to flip the
 * edge orientation.
 *
 * @see allPairsShortestPathLength
 * @see allPairsDijkstraPathLength
 * @see singleSourceShortestPathLength
 * @see singleSourceDijkstraPathLength
 *
 * @param {Graph} G
 * @param {?{source: ?Node, target: ?Node, weight: ?string}=} optParameters
 *   - source: Starting node for path.
 *     If not specified, compute the shortest path lengths using all nodes as
 *     source nodes.
 *   - target: Ending node for path.
 *     If not specified, compute the shortest path length using all nodes as
 *     target nodes.
 *   - weight:
 *     If not specified, every edge has weight/distance/cost of 1.
 *     If a string, use this edge attribute as the edge weight. Any edg
 *     attribute not present defaults to 1.
 * @return {(number|Map)}
 *   If the `source` and `target` are both specified, return the length of the
 *   shortest path from the source to the target.
 *
 *   If only the `source` is specified, return a Map keyed by
 *   targets whose values are the lengths of the shortest path from the source
 *   to one of the targets.
 *
 *   If only the `target` is specified, return a Map keyed by
 *   sources whose values are the lengths of the shortest path from one of the
 *   sources to the target.
 *
 *   If neither the `source` nor `target` are specified return a Map
 *   of Maps with path[source][target]=L, where L is the length of the shortest
 *   path from source to target.
 */


/*istanbul ignore next*/
function _shortestPath() {
  _shortestPath = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee2(G)
  /*istanbul ignore next*/
  {
    var _ref2,
        source,
        target,
        weight,
        paths,
        directed,
        _iteratorNormalCompletion,
        _didIteratorError,
        _iteratorError,
        _iterator,
        _step,
        _step$value,
        _target,
        path,
        _args2 = arguments;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _ref2 = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {}, source = _ref2.source, target = _ref2.target, weight = _ref2.weight;

            if (!(source == null)) {
              _context2.next = 50;
              break;
            }

            if (!(target == null)) {
              _context2.next = 14;
              break;
            }

            if (!(weight == null)) {
              _context2.next = 9;
              break;
            }

            _context2.next = 6;
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _unweighted.
              /*istanbul ignore next*/
              allPairsShortestPath)(G)
            );

          case 6:
            paths = _context2.sent;
            _context2.next = 12;
            break;

          case 9:
            _context2.next = 11;
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _weighted.
              /*istanbul ignore next*/
              allPairsDijkstraPath)(G, {
                weight: weight
              })
            );

          case 11:
            paths = _context2.sent;

          case 12:
            _context2.next = 48;
            break;

          case 14:
            // find paths from all nodes co-accessibly to the target
            directed = G.isDirected();
            _context2.prev = 15;

            if (directed) {
              G.reverse(false);
            }

            if (!(weight == null)) {
              _context2.next = 23;
              break;
            }

            _context2.next = 20;
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _unweighted.
              /*istanbul ignore next*/
              singleSourceShortestPath)(G, target)
            );

          case 20:
            paths = _context2.sent;
            _context2.next = 26;
            break;

          case 23:
            _context2.next = 25;
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _weighted.
              /*istanbul ignore next*/
              singleSourceDijkstraPath)(G, {
                target: target,
                weight: weight
              })
            );

          case 25:
            paths = _context2.sent;

          case 26:
            // now flip the paths so they go from a source to the target
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 29;

            for (
            /*istanbul ignore next*/
            _iterator = paths[Symbol.iterator]();
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion = true) {
              /*istanbul ignore next*/
              _step$value = _slicedToArray(_step.value, 2), _target = _step$value[0], path = _step$value[1];
              paths.set(_target, path.reverse());
            }

            _context2.next = 37;
            break;

          case 33:
            _context2.prev = 33;
            _context2.t0 = _context2["catch"](29);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 37:
            _context2.prev = 37;
            _context2.prev = 38;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 40:
            _context2.prev = 40;

            if (!_didIteratorError) {
              _context2.next = 43;
              break;
            }

            throw _iteratorError;

          case 43:
            return _context2.finish(40);

          case 44:
            return _context2.finish(37);

          case 45:
            _context2.prev = 45;

            if (directed) {
              G.reverse(false);
            }

            return _context2.finish(45);

          case 48:
            _context2.next = 71;
            break;

          case 50:
            if (!(target == null)) {
              _context2.next = 62;
              break;
            }

            if (!(weight == null)) {
              _context2.next = 57;
              break;
            }

            _context2.next = 54;
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _unweighted.
              /*istanbul ignore next*/
              singleSourceShortestPath)(G, source)
            );

          case 54:
            paths = _context2.sent;
            _context2.next = 60;
            break;

          case 57:
            _context2.next = 59;
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _weighted.
              /*istanbul ignore next*/
              singleSourceDijkstraPath)(G, {
                source: source,
                weight: weight
              })
            );

          case 59:
            paths = _context2.sent;

          case 60:
            _context2.next = 71;
            break;

          case 62:
            if (!(weight == null)) {
              _context2.next = 68;
              break;
            }

            _context2.next = 65;
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _unweighted.
              /*istanbul ignore next*/
              bidirectionalShortestPath)(G, source, target)
            );

          case 65:
            paths = _context2.sent;
            _context2.next = 71;
            break;

          case 68:
            _context2.next = 70;
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _weighted.
              /*istanbul ignore next*/
              dijkstraPath)(G, {
                source: source,
                target: target,
                weight: weight
              })
            );

          case 70:
            paths = _context2.sent;

          case 71:
            return _context2.abrupt("return", paths);

          case 72:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[15,, 45, 48], [29, 33, 37, 45], [38,, 40, 44]]);
  }));
  return _shortestPath.apply(this, arguments);
}

/*istanbul ignore next*/
function shortestPathLength(_x4) {
  return _shortestPathLength.apply(this, arguments);
} // TODO averageShortestPathLength
// TODO allShortestPaths


/*istanbul ignore next*/
function _shortestPathLength() {
  _shortestPathLength = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee3(G)
  /*istanbul ignore next*/
  {
    var _ref3,
        source,
        target,
        weight,
        paths,
        directed,
        _args3 = arguments;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _ref3 = _args3.length > 1 && _args3[1] !== undefined ? _args3[1] : {}, source = _ref3.source, target = _ref3.target, weight = _ref3.weight;

            if (!(source == null)) {
              _context3.next = 31;
              break;
            }

            if (!(target == null)) {
              _context3.next = 14;
              break;
            }

            if (!(weight == null)) {
              _context3.next = 9;
              break;
            }

            _context3.next = 6;
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _unweighted.
              /*istanbul ignore next*/
              allPairsShortestPathLength)(G)
            );

          case 6:
            paths = _context3.sent;
            _context3.next = 12;
            break;

          case 9:
            _context3.next = 11;
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _weighted.
              /*istanbul ignore next*/
              allPairsDijkstraPathLength)(G, {
                weight: weight
              })
            );

          case 11:
            paths = _context3.sent;

          case 12:
            _context3.next = 29;
            break;

          case 14:
            // find paths from all nodes co-accessibly to the target
            directed = G.isDirected();
            _context3.prev = 15;

            if (directed) {
              G.reverse(false);
            }

            if (!(weight == null)) {
              _context3.next = 23;
              break;
            }

            _context3.next = 20;
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _unweighted.
              /*istanbul ignore next*/
              singleSourceShortestPathLength)(G, target)
            );

          case 20:
            paths = _context3.sent;
            _context3.next = 26;
            break;

          case 23:
            _context3.next = 25;
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _weighted.
              /*istanbul ignore next*/
              singleSourceDijkstraPathLength)(G, {
                target: target,
                weight: weight
              })
            );

          case 25:
            paths = _context3.sent;

          case 26:
            _context3.prev = 26;

            if (directed) {
              G.reverse(false);
            }

            return _context3.finish(26);

          case 29:
            _context3.next = 53;
            break;

          case 31:
            if (!(target == null)) {
              _context3.next = 43;
              break;
            }

            if (!(weight == null)) {
              _context3.next = 38;
              break;
            }

            _context3.next = 35;
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _unweighted.
              /*istanbul ignore next*/
              singleSourceShortestPathLength)(G, source)
            );

          case 35:
            paths = _context3.sent;
            _context3.next = 41;
            break;

          case 38:
            _context3.next = 40;
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _weighted.
              /*istanbul ignore next*/
              singleSourceDijkstraPathLength)(G, {
                source: source,
                weight: weight
              })
            );

          case 40:
            paths = _context3.sent;

          case 41:
            _context3.next = 53;
            break;

          case 43:
            if (!(weight == null)) {
              _context3.next = 50;
              break;
            }

            _context3.next = 46;
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _unweighted.
              /*istanbul ignore next*/
              bidirectionalShortestPath)(G, source, target)
            );

          case 46:
            paths = _context3.sent;
            paths = paths.length - 1;
            _context3.next = 53;
            break;

          case 50:
            _context3.next = 52;
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _weighted.
              /*istanbul ignore next*/
              dijkstraPathLength)(G, {
                source: source,
                target: target,
                weight: weight
              })
            );

          case 52:
            paths = _context3.sent;

          case 53:
            return _context3.abrupt("return", paths);

          case 54:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[15,, 26, 29]]);
  }));
  return _shortestPathLength.apply(this, arguments);
}