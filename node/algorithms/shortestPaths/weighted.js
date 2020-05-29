'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.dijkstraPath = dijkstraPath;
exports.dijkstraPathLength = dijkstraPathLength;
exports.singleSourceDijkstraPath = singleSourceDijkstraPath;
exports.singleSourceDijkstraPathLength = singleSourceDijkstraPathLength;
exports.singleSourceDijkstra = singleSourceDijkstra;
exports.allPairsDijkstraPathLength = allPairsDijkstraPathLength;
exports.allPairsDijkstraPath = allPairsDijkstraPath;

var
/*istanbul ignore next*/
_internals = require("../../_internals");

var
/*istanbul ignore next*/
_JSNetworkXNoPath = _interopRequireDefault(require("../../exceptions/JSNetworkXNoPath"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Returns the shortest path from `source` to `target` in a weighted graph G.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * jsnx.dijkstraPath(G, {source: 0, target: 4});
 * // [0, 1, 2, 3, 4]
 * ```
 *
 * ### Notes
 *
 * Edge weight attributes must be numerical. Distances are calculated as sums
 * of weighted edges traversed.
 *
 * @see bidirectionalDijkstra
 *
 * @param {Graph} G
 * @param {{source: Node, target: Node, weight: ?string}} parameters
 *   - source: Starting node
 *   - target: Ending node
 *   - weight(='weight'): Edge data key corresponding to the edge weight
 * @return {Array} List of nodes in a shortest path
 */
function dijkstraPath(_x, _x2) {
  return _dijkstraPath.apply(this, arguments);
}
/**
 * Returns the shortest path length from `source` to `target` in a weighted
 * graph.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * jsnx.dijkstraPathLength(G, {source: 0, target: 4});
 * // 4
 * ```
 *
 * ### Notes
 *
 * Edge weight attributes must be numerical. Distances are calculated as sums
 * of weighted edges traversed.
 *
 * @see bidirectionalDijkstra
 *
 * @param {Graph} G
 * @param {{source: Node, target: Node, weight: ?string}} parameters
 *   - source: Starting node
 *   - target: Ending node
 *   - weight(='weight'): Edge data key corresponding to the edge weight
 * @return {number} Shortest path length
 */


/*istanbul ignore next*/
function _dijkstraPath() {
  _dijkstraPath = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee(G,
  /*istanbul ignore next*/
  _ref)
  /*istanbul ignore next*/
  {
    var source, target, _ref$weight, weight, _yield$singleSourceDi, _yield$singleSourceDi2, distances, paths, path;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            source = _ref.source, target = _ref.target, _ref$weight = _ref.weight, weight = _ref$weight === void 0 ? 'weight' : _ref$weight;
            _context.next = 3;
            return singleSourceDijkstra(G, {
              source: source,
              target: target,
              weight: weight
            });

          case 3:
            _yield$singleSourceDi = _context.sent;
            _yield$singleSourceDi2 = _slicedToArray(_yield$singleSourceDi, 2);
            distances = _yield$singleSourceDi2[0];
            paths = _yield$singleSourceDi2[1];
            path = paths.get(target);

            if (path) {
              _context.next = 10;
              break;
            }

            throw new
            /*istanbul ignore next*/
            _JSNetworkXNoPath[
            /*istanbul ignore next*/
            "default"](
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            sprintf)('Node %j is not reachable from %j', source, target));

          case 10:
            return _context.abrupt("return", path);

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _dijkstraPath.apply(this, arguments);
}

/*istanbul ignore next*/
function dijkstraPathLength(_x3, _x4) {
  return _dijkstraPathLength.apply(this, arguments);
}

/*istanbul ignore next*/
function _dijkstraPathLength() {
  _dijkstraPathLength = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee2(G,
  /*istanbul ignore next*/
  _ref2)
  /*istanbul ignore next*/
  {
    var source, target, _ref2$weight, weight, distances, distance;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            source = _ref2.source, target = _ref2.target, _ref2$weight = _ref2.weight, weight = _ref2$weight === void 0 ? 'weight' : _ref2$weight;
            _context2.next = 3;
            return singleSourceDijkstraPathLength(G, {
              source: source,
              weight: weight
            });

          case 3:
            distances = _context2.sent;
            distance = distances.get(target);

            if (!(distance == null)) {
              _context2.next = 7;
              break;
            }

            throw new
            /*istanbul ignore next*/
            _JSNetworkXNoPath[
            /*istanbul ignore next*/
            "default"](
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            sprintf)('Node %j is not reachable from %j', source, target));

          case 7:
            return _context2.abrupt("return", distance);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _dijkstraPathLength.apply(this, arguments);
}

function minMultiEdgeWeight(keydata, weight) {
  var minweight = Infinity;

  for (var key in keydata) {
    var edgeWeight =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _internals.
    /*istanbul ignore next*/
    getDefault)(keydata[key][weight], 1);

    if (edgeWeight < minweight) {
      minweight = edgeWeight;
    }
  }

  return minweight;
}
/**
 * Compute shortest path between source and all other reachable nodes for a
 * weighted graph.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * var path = jsnx.singleSourceDijkstraPath(G, {source: 0});
 * path.get(4);
 * // [0, 1, 2, 3, 4]
 * ```
 *
 * ### Notes
 *
 * Edge weight attributes must be numerical. Distances are calculated as sums
 * of weighted edges traversed.
 *
 * @see singleSourceDijkstra
 *
 * @param {Graph} G
 * @param {{source: Node, weight: ?string, cutoff: ?number}} parameters
 *   - source: Starting node for path
 *   - weight: Edge data key corresponding to the edge weight
 *   - cutoff: Depth to stop the search. Only paths of length <= cutoff are
 *     returned.
 * @return {Map} Map of shortest paths keyed by target
 */


/*istanbul ignore next*/
function singleSourceDijkstraPath(_x5, _x6) {
  return _singleSourceDijkstraPath.apply(this, arguments);
}
/**
 * Compute the shortest path length between source and all other reachable
 * nodes for a weighted graph.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * var length = jsnx.singleSourceDijkstraPathLength(G, {source: 0});
 * length.get(4);
 * // 4
 * length
 * // Map {0: 0, 1: 1, 2: 2, 3: 3, 4: 4}
 * ```
 *
 * ### Notes
 *
 * Edge weight attributes must be numerical. Distances are calculated as sums
 * of weighted edges traversed.
 *
 * @see singleSourceDijkstra
 *

 * @param {Graph} G
 * @param {{source: Node, weight: ?string, cutoff: ?number}} parameters
 *   - source: Starting node for path
 *   - weight: Edge data key corresponding to the edge weight
 *   - cutoff: Depth to stop the search. Only paths of length <= cutoff are
 *     returned.
 * @return {Map} Map of shortest paths keyed by target
 */


/*istanbul ignore next*/
function _singleSourceDijkstraPath() {
  _singleSourceDijkstraPath = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee3(G,
  /*istanbul ignore next*/
  _ref3)
  /*istanbul ignore next*/
  {
    var source, cutoff, _ref3$weight, weight, _yield$singleSourceDi3, _yield$singleSourceDi4, length, path;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            source = _ref3.source, cutoff = _ref3.cutoff, _ref3$weight = _ref3.weight, weight = _ref3$weight === void 0 ? 'weight' : _ref3$weight;
            _context3.next = 3;
            return singleSourceDijkstra(G, {
              source: source,
              cutoff: cutoff,
              weight: weight
            });

          case 3:
            _yield$singleSourceDi3 = _context3.sent;
            _yield$singleSourceDi4 = _slicedToArray(_yield$singleSourceDi3, 2);
            length = _yield$singleSourceDi4[0];
            path = _yield$singleSourceDi4[1];
            return _context3.abrupt("return", path);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _singleSourceDijkstraPath.apply(this, arguments);
}

/*istanbul ignore next*/
function singleSourceDijkstraPathLength(_x7, _x8) {
  return _singleSourceDijkstraPathLength.apply(this, arguments);
}
/**
 * Compute shortest paths and lengths in a weighted graph G.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * var [lengths, paths] = jsnx.singleSourceDijkstra(G, {source: 0});
 * lengths.get(4);
 * // 4
 * lengths
 * // Map {0: 0, 1: 1, 2: 2, 3: 3, 4: 4}
 * paths.get(4);
 * // [0, 1, 2, 3, 4]
 * ```
 *
 * ### Notes
 *
 * Edge weight attributes must be numerical.
 * Distances are calculated as sums of weighted edges traversed.
 *
 * This algorithm is not guaranteed to work if edge weights are negative or are
 * floating point numbers (overflows and roundoff errors can cause problems).
 *
 * @see singleSourceDijkstraPath
 * @see singleSourceDijkstraPathLength
 *
 * @param {Graph} G
 * @param {{source: Node, target: ?Node, cutoff: ?number, weight: ?string}}
 *   parameters
 *   - source: Starting node for path
 *   - target: Ending node in the path (optional)
 *   - weight: Edge data key corresponding to the edge weight
 *   - cutoff: Depth to stop the search. Only paths of length <= cutoff are
 *     returned.
 * @return {Array<Map>}
 *   Returns a tuple of two Maps keyed by node. The first Map stores distances
 *   from the source. The second one stores the path from the source to that
 *   node.
 */


/*istanbul ignore next*/
function _singleSourceDijkstraPathLength() {
  _singleSourceDijkstraPathLength = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee4(G,
  /*istanbul ignore next*/
  _ref4)
  /*istanbul ignore next*/
  {
    var source, cutoff, _ref4$weight, weight, distances, seen, fringe, i, _fringe$dequeue, _fringe$dequeue2, d, _fringe$dequeue2$, _, v, edata, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, w, edgeData, vwDistance;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            source = _ref4.source, cutoff = _ref4.cutoff, _ref4$weight = _ref4.weight, weight = _ref4$weight === void 0 ? 'weight' : _ref4$weight;
            distances = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map();
            seen = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map([[source, 0]]);
            fringe = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            PriorityQueue();
            i = 0;
            fringe.enqueue(0, [i++, source]);

          case 6:
            if (!(fringe.size > 0)) {
              _context4.next = 49;
              break;
            }

            _fringe$dequeue = fringe.dequeue(), _fringe$dequeue2 = _slicedToArray(_fringe$dequeue, 2), d = _fringe$dequeue2[0], _fringe$dequeue2$ = _slicedToArray(_fringe$dequeue2[1], 2), _ = _fringe$dequeue2$[0], v = _fringe$dequeue2$[1]; // eslint-disable-line no-unused-vars

            if (!distances.has(v)) {
              _context4.next = 10;
              break;
            }

            return _context4.abrupt("continue", 6);

          case 10:
            distances.set(v, d);
            edata = void 0;

            if (G.isMultigraph()) {
              edata =
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              mapIterator)(G.get(v), function (
              /*istanbul ignore next*/
              _ref8) {
                /*istanbul ignore next*/
                var _ref9 = _slicedToArray(_ref8, 2),
                    w = _ref9[0],
                    keydata = _ref9[1];

                // eslint-disable-line no-loop-func
                return [w,
                /*istanbul ignore next*/
                _defineProperty({}, weight, minMultiEdgeWeight(keydata, weight))];
              });
            } else {
              edata = G.get(v);
            }

            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context4.prev = 16;
            _iterator = edata[Symbol.iterator]();

          case 18:
            if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
              _context4.next = 33;
              break;
            }

            _step$value = _slicedToArray(_step.value, 2), w = _step$value[0], edgeData = _step$value[1];
            vwDistance = d +
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            getDefault)(edgeData[weight], 1);

            if (!(cutoff != null)) {
              _context4.next = 24;
              break;
            }

            if (!(vwDistance > cutoff)) {
              _context4.next = 24;
              break;
            }

            return _context4.abrupt("continue", 30);

          case 24:
            if (!distances.has(w)) {
              _context4.next = 29;
              break;
            }

            if (!(vwDistance < distances.get(w))) {
              _context4.next = 27;
              break;
            }

            throw new Error('Contradictory paths found: negative weights?');

          case 27:
            _context4.next = 30;
            break;

          case 29:
            if (!seen.has(w) || vwDistance < seen.get(w)) {
              seen.set(w, vwDistance);
              fringe.enqueue(vwDistance, [i++, w]);
            }

          case 30:
            _iteratorNormalCompletion = true;
            _context4.next = 18;
            break;

          case 33:
            _context4.next = 39;
            break;

          case 35:
            _context4.prev = 35;
            _context4.t0 = _context4["catch"](16);
            _didIteratorError = true;
            _iteratorError = _context4.t0;

          case 39:
            _context4.prev = 39;
            _context4.prev = 40;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 42:
            _context4.prev = 42;

            if (!_didIteratorError) {
              _context4.next = 45;
              break;
            }

            throw _iteratorError;

          case 45:
            return _context4.finish(42);

          case 46:
            return _context4.finish(39);

          case 47:
            _context4.next = 6;
            break;

          case 49:
            return _context4.abrupt("return", distances);

          case 50:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[16, 35, 39, 47], [40,, 42, 46]]);
  }));
  return _singleSourceDijkstraPathLength.apply(this, arguments);
}

/*istanbul ignore next*/
function singleSourceDijkstra(_x9, _x10) {
  return _singleSourceDijkstra.apply(this, arguments);
} // TODO dijkstraPredecessorAndDistance

/**
 * Compute shortest path lengths between all nodes in a weighted graph.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * var path = jsnx.allPairsDijkstraPath(G);
 * path.get(1).get(4);
 * // 3
 * path.get(1);
 * // Map {0: 1, 1: 0, 2: 1, 3: 2, 4: 3}
 * ```
 *
 * ### Notes
 *
 * Edge weight attributes must be numerical.
 * Distances are calculated as sums of weighted edges traversed.
 *
 * The Map returned only has keys for reachable node pairs.
 *
 * @param {Graph} G
 * @param {{weight: ?string, cutoff: ?number}=} optParameters
 *   - weight: Edge data key corresponding to the edge weight
 *   - cutoff: Depth to stop the search. Only paths of length <= cutoff are
 *     returned.
 * @return {Map} A Map of Maps of shortest path lengths
 */


/*istanbul ignore next*/
function _singleSourceDijkstra() {
  _singleSourceDijkstra = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee5(G,
  /*istanbul ignore next*/
  _ref5)
  /*istanbul ignore next*/
  {
    var source, target, cutoff, _ref5$weight, weight, distances, paths, seen, fringe, i, _fringe$dequeue3, _fringe$dequeue4, d, _fringe$dequeue4$, _, v, edata, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, _step2$value, w, edgeData, vwDistance;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            source = _ref5.source, target = _ref5.target, cutoff = _ref5.cutoff, _ref5$weight = _ref5.weight, weight = _ref5$weight === void 0 ? 'weight' : _ref5$weight;

            if (!
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            nodesAreEqual)(source, target)) {
              _context5.next = 3;
              break;
            }

            return _context5.abrupt("return", [new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map([[source, 0]]), new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map([[source, target]])]);

          case 3:
            distances = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map();
            paths = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map([[source, [source]]]);
            seen = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map([[source, 0]]);
            fringe = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            PriorityQueue();
            i = 0;
            fringe.enqueue(0, [i++, source]);

          case 9:
            if (!(fringe.size > 0)) {
              _context5.next = 54;
              break;
            }

            _fringe$dequeue3 = fringe.dequeue(), _fringe$dequeue4 = _slicedToArray(_fringe$dequeue3, 2), d = _fringe$dequeue4[0], _fringe$dequeue4$ = _slicedToArray(_fringe$dequeue4[1], 2), _ = _fringe$dequeue4$[0], v = _fringe$dequeue4$[1]; // eslint-disable-line no-unused-vars

            if (!distances.has(v)) {
              _context5.next = 13;
              break;
            }

            return _context5.abrupt("continue", 9);

          case 13:
            distances.set(v, d);

            if (!
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            nodesAreEqual)(v, target)) {
              _context5.next = 16;
              break;
            }

            return _context5.abrupt("break", 54);

          case 16:
            edata = void 0;

            if (G.isMultigraph()) {
              edata =
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              mapIterator)(G.get(v), function (
              /*istanbul ignore next*/
              _ref11) {
                /*istanbul ignore next*/
                var _ref12 = _slicedToArray(_ref11, 2),
                    w = _ref12[0],
                    keydata = _ref12[1];

                // eslint-disable-line no-loop-func
                return [w,
                /*istanbul ignore next*/
                _defineProperty({}, weight, minMultiEdgeWeight(keydata, weight))];
              });
            } else {
              edata = G.get(v);
            }

            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context5.prev = 21;
            _iterator2 = edata[Symbol.iterator]();

          case 23:
            if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
              _context5.next = 38;
              break;
            }

            _step2$value = _slicedToArray(_step2.value, 2), w = _step2$value[0], edgeData = _step2$value[1];
            vwDistance = d +
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            getDefault)(edgeData[weight], 1);

            if (!(cutoff != null)) {
              _context5.next = 29;
              break;
            }

            if (!(vwDistance > cutoff)) {
              _context5.next = 29;
              break;
            }

            return _context5.abrupt("continue", 35);

          case 29:
            if (!distances.has(w)) {
              _context5.next = 34;
              break;
            }

            if (!(vwDistance < distances.get(w))) {
              _context5.next = 32;
              break;
            }

            throw new Error('Contradictory paths found: negative weights?');

          case 32:
            _context5.next = 35;
            break;

          case 34:
            if (!seen.has(w) || vwDistance < seen.get(w)) {
              seen.set(w, vwDistance);
              fringe.enqueue(vwDistance, [i++, w]);
              paths.set(w, paths.get(v).concat([w]));
            }

          case 35:
            _iteratorNormalCompletion2 = true;
            _context5.next = 23;
            break;

          case 38:
            _context5.next = 44;
            break;

          case 40:
            _context5.prev = 40;
            _context5.t0 = _context5["catch"](21);
            _didIteratorError2 = true;
            _iteratorError2 = _context5.t0;

          case 44:
            _context5.prev = 44;
            _context5.prev = 45;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 47:
            _context5.prev = 47;

            if (!_didIteratorError2) {
              _context5.next = 50;
              break;
            }

            throw _iteratorError2;

          case 50:
            return _context5.finish(47);

          case 51:
            return _context5.finish(44);

          case 52:
            _context5.next = 9;
            break;

          case 54:
            return _context5.abrupt("return", [distances, paths]);

          case 55:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[21, 40, 44, 52], [45,, 47, 51]]);
  }));
  return _singleSourceDijkstra.apply(this, arguments);
}

/*istanbul ignore next*/
function allPairsDijkstraPathLength(_x11) {
  return _allPairsDijkstraPathLength.apply(this, arguments);
}
/**
 * Compute shortest paths between all nodes in a weighted graph.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * var path = jsnx.allPairsDijkstraPath(G);
 * path.get(0).get(4);
 * // [0, 1, 2, 3, 4]
 * ```
 *
 * ### Notes
 *
 * Edge weight attributes must be numerical.
 * Distances are calculated as sums of weighted edges traversed.
 *
 * @param {Graph} G
 * @param {{weight: ?string, cutoff: ?number}=} optParameters
 *   - weight: Edge data key corresponding to the edge weight
 *   - cutoff: Depth to stop the search. Only paths of length <= cutoff are
 *     returned.
 * @return {Map} A Map of Maps of shortest paths.
 */


/*istanbul ignore next*/
function _allPairsDijkstraPathLength() {
  _allPairsDijkstraPathLength = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee6(G)
  /*istanbul ignore next*/
  {
    var _ref6,
        cutoff,
        _ref6$weight,
        weight,
        distances,
        parameters,
        _iteratorNormalCompletion3,
        _didIteratorError3,
        _iteratorError3,
        _iterator3,
        _step3,
        source,
        _args6 = arguments;

    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _ref6 = _args6.length > 1 && _args6[1] !== undefined ? _args6[1] : {}, cutoff = _ref6.cutoff, _ref6$weight = _ref6.weight, weight = _ref6$weight === void 0 ? 'weight' : _ref6$weight;
            distances = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map();
            parameters = {
              weight: weight,
              cutoff: cutoff
            };
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context6.prev = 6;
            _iterator3 = G[Symbol.iterator]();

          case 8:
            if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
              _context6.next = 20;
              break;
            }

            source = _step3.value;
            parameters.source = source;
            _context6.t0 = distances;
            _context6.t1 = source;
            _context6.next = 15;
            return singleSourceDijkstraPathLength(G, parameters);

          case 15:
            _context6.t2 = _context6.sent;

            _context6.t0.set.call(_context6.t0, _context6.t1, _context6.t2);

          case 17:
            _iteratorNormalCompletion3 = true;
            _context6.next = 8;
            break;

          case 20:
            _context6.next = 26;
            break;

          case 22:
            _context6.prev = 22;
            _context6.t3 = _context6["catch"](6);
            _didIteratorError3 = true;
            _iteratorError3 = _context6.t3;

          case 26:
            _context6.prev = 26;
            _context6.prev = 27;

            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }

          case 29:
            _context6.prev = 29;

            if (!_didIteratorError3) {
              _context6.next = 32;
              break;
            }

            throw _iteratorError3;

          case 32:
            return _context6.finish(29);

          case 33:
            return _context6.finish(26);

          case 34:
            return _context6.abrupt("return", distances);

          case 35:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6, null, [[6, 22, 26, 34], [27,, 29, 33]]);
  }));
  return _allPairsDijkstraPathLength.apply(this, arguments);
}

/*istanbul ignore next*/
function allPairsDijkstraPath(_x12) {
  return _allPairsDijkstraPath.apply(this, arguments);
} // TODO bellmanFord
// TODO goldbergRadzik
// TODO negativeEdgeCycle
// TODO bidirectionalDijkstra


/*istanbul ignore next*/
function _allPairsDijkstraPath() {
  _allPairsDijkstraPath = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee7(G)
  /*istanbul ignore next*/
  {
    var _ref7,
        cutoff,
        _ref7$weight,
        weight,
        paths,
        parameters,
        _iteratorNormalCompletion4,
        _didIteratorError4,
        _iteratorError4,
        _iterator4,
        _step4,
        source,
        _args7 = arguments;

    return regeneratorRuntime.wrap(function _callee7$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            _ref7 = _args7.length > 1 && _args7[1] !== undefined ? _args7[1] : {}, cutoff = _ref7.cutoff, _ref7$weight = _ref7.weight, weight = _ref7$weight === void 0 ? 'weight' : _ref7$weight;
            paths = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map();
            parameters = {
              weight: weight,
              cutoff: cutoff
            };
            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context7.prev = 6;
            _iterator4 = G[Symbol.iterator]();

          case 8:
            if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
              _context7.next = 20;
              break;
            }

            source = _step4.value;
            parameters.source = source;
            _context7.t0 = paths;
            _context7.t1 = source;
            _context7.next = 15;
            return singleSourceDijkstraPath(G, parameters);

          case 15:
            _context7.t2 = _context7.sent;

            _context7.t0.set.call(_context7.t0, _context7.t1, _context7.t2);

          case 17:
            _iteratorNormalCompletion4 = true;
            _context7.next = 8;
            break;

          case 20:
            _context7.next = 26;
            break;

          case 22:
            _context7.prev = 22;
            _context7.t3 = _context7["catch"](6);
            _didIteratorError4 = true;
            _iteratorError4 = _context7.t3;

          case 26:
            _context7.prev = 26;
            _context7.prev = 27;

            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }

          case 29:
            _context7.prev = 29;

            if (!_didIteratorError4) {
              _context7.next = 32;
              break;
            }

            throw _iteratorError4;

          case 32:
            return _context7.finish(29);

          case 33:
            return _context7.finish(26);

          case 34:
            return _context7.abrupt("return", paths);

          case 35:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee7, null, [[6, 22, 26, 34], [27,, 29, 33]]);
  }));
  return _allPairsDijkstraPath.apply(this, arguments);
}