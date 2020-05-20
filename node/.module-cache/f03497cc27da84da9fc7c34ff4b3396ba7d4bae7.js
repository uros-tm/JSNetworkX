'use strict';
/**
 * @fileoverview Shortest path algorithms for unweighted graphs.
 */

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.singleSourceShortestPathLength = singleSourceShortestPathLength;
exports.allPairsShortestPathLength = allPairsShortestPathLength;
exports.bidirectionalShortestPath = bidirectionalShortestPath;
exports.singleSourceShortestPath = singleSourceShortestPath;
exports.allPairsShortestPath = allPairsShortestPath;
exports.predecessor = predecessor;

var
/*istanbul ignore next*/
_exceptions = require("../../exceptions");

var
/*istanbul ignore next*/
_internals = require("../../_internals");

/*istanbul ignore next*/ function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Compute the shortest path lengths from source to all reachable nodes.
 *
 * ### Example
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * var length = jsnx.singleSourceShortestPathLength(G, 0);
 * length.get(4);
 * // 4
 * length
 * // Map {0: 0, 1: 1, 2: 2, 3: 3, 4: 4}
 * ```
 *
 * @see shortestPathLength
 *
 * @param {Graph} G graph
 * @param {Node} source Starting node for path
 * @param {number=} optCutoff
 *    Depth to stop the search. Only paths of length <= cutoff are returned.
 *
 * @return {!Map} Map of shortest path lengths keyed by target.
 */
function singleSourceShortestPathLength(_x, _x2, _x3) {
  return _singleSourceShortestPathLength.apply(this, arguments);
}
/**
 * Compute the shortest path lengths between all nodes in G.
 *
 * The map returned only has keys for reachable node pairs.
 *
 * ### Example
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * var length = jsnx.allPairsShortestPathLength(G);
 * length.get(1).get(4);
 * // 3
 * length.get(1);
 * // Map {0: 1, 1: 0, 2: 1, 3: 2, 4: 3}
 * ```
 *
 * @param {Graph} G
 * @param {number=} optCutoff  depth to stop the search.
 *    Only paths of length <= cutoff are returned.
 *
 * @return {!Map}
 */


/*istanbul ignore next*/
function _singleSourceShortestPathLength() {
  _singleSourceShortestPathLength = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee(G, source, optCutoff)
  /*istanbul ignore next*/
  {
    var seen, level, nextlevel, thislevel, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, v;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            seen = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map(); // level (number of hops) when seen n BFS

            level = 0; // the current level
            // map of nodes to check at next level

            nextlevel = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map([[source, 1]]);

          case 3:
            if (!(nextlevel.size > 0)) {
              _context.next = 30;
              break;
            }

            thislevel = nextlevel;
            nextlevel = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map();
            /*eslint no-loop-func:0*/

            _iteratorNormalCompletion5 = true;
            _didIteratorError5 = false;
            _iteratorError5 = undefined;
            _context.prev = 9;

            for (
            /*istanbul ignore next*/
            _iterator5 = thislevel.keys()[Symbol.iterator]();
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion5 = true) {
              /*istanbul ignore next*/
              v = _step5.value;

              if (!seen.has(v)) {
                seen.set(v, level);
                G.get(v).forEach(function (_, n)
                /*istanbul ignore next*/
                {
                  return nextlevel.set(n, 1);
                });
              }
            }

            _context.next = 17;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context["catch"](9);
            _didIteratorError5 = true;
            _iteratorError5 = _context.t0;

          case 17:
            _context.prev = 17;
            _context.prev = 18;

            if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
              _iterator5["return"]();
            }

          case 20:
            _context.prev = 20;

            if (!_didIteratorError5) {
              _context.next = 23;
              break;
            }

            throw _iteratorError5;

          case 23:
            return _context.finish(20);

          case 24:
            return _context.finish(17);

          case 25:
            if (!(optCutoff != null && optCutoff <= level)) {
              _context.next = 27;
              break;
            }

            return _context.abrupt("break", 30);

          case 27:
            level += 1;
            _context.next = 3;
            break;

          case 30:
            return _context.abrupt("return", seen);

          case 31:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[9, 13, 17, 25], [18,, 20, 24]]);
  }));
  return _singleSourceShortestPathLength.apply(this, arguments);
}

/*istanbul ignore next*/
function allPairsShortestPathLength(_x4, _x5) {
  return _allPairsShortestPathLength.apply(this, arguments);
}
/**
 * Return a list of nodes in a shortest path between source and target.
 *
 * This algorithm is used by `shortestPath(G, source, target)`.
 *
 * @see shortestPath
 *
 * @param {Graph} G
 * @param {Node} source starting node for path
 * @param {Node} target ending node for path
 *
 * @return {!Array}
 */


/*istanbul ignore next*/
function _allPairsShortestPathLength() {
  _allPairsShortestPathLength = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee2(G, optCutoff)
  /*istanbul ignore next*/
  {
    var paths, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, n;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            paths = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map();
            _iteratorNormalCompletion6 = true;
            _didIteratorError6 = false;
            _iteratorError6 = undefined;
            _context2.prev = 4;

            for (
            /*istanbul ignore next*/
            _iterator6 = G[Symbol.iterator]();
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion6 = true) {
              /*istanbul ignore next*/
              n = _step6.value;
              paths.set(n, singleSourceShortestPathLength(G, n, optCutoff));
            }

            _context2.next = 12;
            break;

          case 8:
            _context2.prev = 8;
            _context2.t0 = _context2["catch"](4);
            _didIteratorError6 = true;
            _iteratorError6 = _context2.t0;

          case 12:
            _context2.prev = 12;
            _context2.prev = 13;

            if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
              _iterator6["return"]();
            }

          case 15:
            _context2.prev = 15;

            if (!_didIteratorError6) {
              _context2.next = 18;
              break;
            }

            throw _iteratorError6;

          case 18:
            return _context2.finish(15);

          case 19:
            return _context2.finish(12);

          case 20:
            return _context2.abrupt("return", paths);

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 8, 12, 20], [13,, 15, 19]]);
  }));
  return _allPairsShortestPathLength.apply(this, arguments);
}

/*istanbul ignore next*/
function bidirectionalShortestPath(_x6, _x7, _x8) {
  return _bidirectionalShortestPath.apply(this, arguments);
}
/**
 * Bidirectional shortest path helper.
 *
 * @return {!Array} Returns [pred,succ,w] where
 *    pred is a map of predecessors from w to the source, and
 *    succ is a map of successors from w to the target.
 */


/*istanbul ignore next*/
function _bidirectionalShortestPath() {
  _bidirectionalShortestPath = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee3(G, source, target)
  /*istanbul ignore next*/
  {
    var _bidirectionalPredSuc, _bidirectionalPredSuc2, pred, succ, w, path;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            // call helper to do the real work
            _bidirectionalPredSuc = bidirectionalPredSucc(G, source, target), _bidirectionalPredSuc2 = _slicedToArray(_bidirectionalPredSuc, 3), pred = _bidirectionalPredSuc2[0], succ = _bidirectionalPredSuc2[1], w = _bidirectionalPredSuc2[2]; // build path from pred+w+succ

            path = []; // from source to w

            while (w != null) {
              path.push(w);
              w = pred.get(w);
            }

            w = succ.get(path[0]);
            path.reverse(); // from w to target

            while (w != null) {
              path.push(w);
              w = succ.get(w);
            }

            return _context3.abrupt("return", path);

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _bidirectionalShortestPath.apply(this, arguments);
}

function bidirectionalPredSucc(G, source, target) {
  // does BFS from both source and target and meets in the middle
  if (
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  nodesAreEqual)(source, target)) {
    return [new
    /*istanbul ignore next*/
    _internals.
    /*istanbul ignore next*/
    Map([[source, null]]), new
    /*istanbul ignore next*/
    _internals.
    /*istanbul ignore next*/
    Map([[target, null]]), source];
  } // handle either directed or undirected


  var gpred, gsucc;

  if (G.isDirected()) {
    gpred = G.predecessorsIter.bind(G);
    gsucc = G.successorsIter.bind(G);
  } else {
    gpred = G.neighborsIter.bind(G);
    gsucc = G.neighborsIter.bind(G);
  } // predecesssor and successors in search


  var pred = new
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  Map([[source, null]]);
  var succ = new
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  Map([[target, null]]); //
  // initialize fringes, start with forward

  var forwardFringe = [source];
  var reverseFringe = [target];
  var thisLevel;
  /*jshint newcap:false*/

  while (forwardFringe.length > 0 && reverseFringe.length > 0) {
    if (forwardFringe.length <= reverseFringe.length) {
      thisLevel = forwardFringe;
      forwardFringe = [];

      /*istanbul ignore next*/
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator = thisLevel[Symbol.iterator](), _step;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion = true) {
          /*istanbul ignore next*/
          var v = _step.value;

          /*istanbul ignore next*/
          var _iteratorNormalCompletion2 = true;
          var _didIteratorError2 = false;
          var _iteratorError2 = undefined;

          try {
            for (
            /*istanbul ignore next*/
            var _iterator2 = gsucc(v)[Symbol.iterator](), _step2;
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion2 = true) {
              /*istanbul ignore next*/
              var w = _step2.value;

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
      thisLevel = reverseFringe;
      reverseFringe = [];

      /*istanbul ignore next*/
      var _iteratorNormalCompletion3 = true;
      var _didIteratorError3 = false;
      var _iteratorError3 = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator3 = thisLevel[Symbol.iterator](), _step3;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion3 = true) {
          /*istanbul ignore next*/
          var _v = _step3.value;

          /*istanbul ignore next*/
          var _iteratorNormalCompletion4 = true;
          var _didIteratorError4 = false;
          var _iteratorError4 = undefined;

          try {
            for (
            /*istanbul ignore next*/
            var _iterator4 = gpred(_v)[Symbol.iterator](), _step4;
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion4 = true) {
              /*istanbul ignore next*/
              var _w = _step4.value;

              if (!succ.has(_w)) {
                reverseFringe.push(_w);
                succ.set(_w, _v);
              }

              if (pred.has(_w)) {
                return [pred, succ, _w]; // found path
              }
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

  throw new
  /*istanbul ignore next*/
  _exceptions.
  /*istanbul ignore next*/
  JSNetworkXNoPath(
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  sprintf)('No path between `%j` and `%j`.', source, target));
}
/**
 * Compute shortest path between source and all other nodes reachable from
 * source.
 *
 * ### Example
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * var path = jsnx.singleSourceShortestPath(G, 0);
 * path.get(4);
 * // [1, 2, 3, 4]
 * ```
 *
 * ### Notes
 *
 * The shortest path is not necessarily unique. So there can be multiple⋅
 * paths between the source and each target node, all of which have the⋅
 * same 'shortest' length. For each target node, this function returns⋅
 * only one of those paths.
 *
 *
 * @see shortestPath
 *
 * @param {Graph} G
 * @param {Node} source
 * @param {number=} optCutoff Depth to stop the search.
 *    Only paths of `length <= cutoff` are returned.
 *
 * @return {!Map<Array>} Map, keyed by target, of shortest paths.
 */


/*istanbul ignore next*/
function singleSourceShortestPath(_x9, _x10, _x11) {
  return _singleSourceShortestPath.apply(this, arguments);
}
/**
 * Compute shortest paths between all nodes.
 *
 * ### Example
 *
 * ```
 * var G = jsnx.pathGraph(5);
 * var path = jsnx.allPairsShortestPath(G);
 * path.get(0).get(4);
 * // [0, 1, 2, 3, 4]
 * ```
 *
 * @see floydWarshall
 *
 * @param {Graph} G
 * @param {number=} optCutoff Depth to stop the search.
 *    Only paths of length <= cutoff are returned.
 *
 * @return {!Map} Map, keyed by source and target, of shortest paths.
 */


/*istanbul ignore next*/
function _singleSourceShortestPath() {
  _singleSourceShortestPath = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee4(G, source, optCutoff)
  /*istanbul ignore next*/
  {
    var level, nextlevel, paths, thislevel, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, v, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, w;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            level = 0;
            nextlevel = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map([[source, 1]]);
            paths = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map([[source, [source]]]);

            if (!(optCutoff === 0)) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt("return", paths);

          case 5:
            if (!(nextlevel.size > 0)) {
              _context4.next = 56;
              break;
            }

            thislevel = nextlevel;
            nextlevel = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map();
            _iteratorNormalCompletion7 = true;
            _didIteratorError7 = false;
            _iteratorError7 = undefined;
            _context4.prev = 11;
            _iterator7 = thislevel.keys()[Symbol.iterator]();

          case 13:
            if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
              _context4.next = 37;
              break;
            }

            v = _step7.value;
            _iteratorNormalCompletion8 = true;
            _didIteratorError8 = false;
            _iteratorError8 = undefined;
            _context4.prev = 18;

            for (
            /*istanbul ignore next*/
            _iterator8 = G.get(v).keys()[Symbol.iterator]();
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion8 = true) {
              /*istanbul ignore next*/
              w = _step8.value;

              if (!paths.has(w)) {
                paths.set(w, paths.get(v).concat([w]));
                nextlevel.set(w, 1);
              }
            }

            _context4.next = 26;
            break;

          case 22:
            _context4.prev = 22;
            _context4.t0 = _context4["catch"](18);
            _didIteratorError8 = true;
            _iteratorError8 = _context4.t0;

          case 26:
            _context4.prev = 26;
            _context4.prev = 27;

            if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
              _iterator8["return"]();
            }

          case 29:
            _context4.prev = 29;

            if (!_didIteratorError8) {
              _context4.next = 32;
              break;
            }

            throw _iteratorError8;

          case 32:
            return _context4.finish(29);

          case 33:
            return _context4.finish(26);

          case 34:
            _iteratorNormalCompletion7 = true;
            _context4.next = 13;
            break;

          case 37:
            _context4.next = 43;
            break;

          case 39:
            _context4.prev = 39;
            _context4.t1 = _context4["catch"](11);
            _didIteratorError7 = true;
            _iteratorError7 = _context4.t1;

          case 43:
            _context4.prev = 43;
            _context4.prev = 44;

            if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
              _iterator7["return"]();
            }

          case 46:
            _context4.prev = 46;

            if (!_didIteratorError7) {
              _context4.next = 49;
              break;
            }

            throw _iteratorError7;

          case 49:
            return _context4.finish(46);

          case 50:
            return _context4.finish(43);

          case 51:
            level += 1;

            if (!(optCutoff != null && optCutoff <= level)) {
              _context4.next = 54;
              break;
            }

            return _context4.abrupt("break", 56);

          case 54:
            _context4.next = 5;
            break;

          case 56:
            return _context4.abrupt("return", paths);

          case 57:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[11, 39, 43, 51], [18, 22, 26, 34], [27,, 29, 33], [44,, 46, 50]]);
  }));
  return _singleSourceShortestPath.apply(this, arguments);
}

/*istanbul ignore next*/
function allPairsShortestPath(_x12, _x13) {
  return _allPairsShortestPath.apply(this, arguments);
}
/**
 * Returns a map of predecessors for the path from source to all nodes in G.
 *
 * ### Example
 *
 * ```
 * var G = jsnx.pathGraph(4);
 * G.nodes();
 * // [0, 1, 2, 3, 4]
 * jsnx.predecessor(G, 0);
 * // Map {0: [], 1: [0], 2: [1], 3: [2]}
 *
 * @param {Graph} G
 * @param {Node} source Starting node for path
 * @param {{target: Node, cutoff: number, returnSeen: boolean}} optArgs
 *   - `target(=null)`: If provided only predecessors between⋅source and target
 *     are returned
 *   - `cutoff`: Depth to stop the search. Only paths of `length <= cutoff` are
 *     returned
 *   - `returnSeen(=false)`: If `true`, return `(seenNodes, predecessors)`
 *
 * @return {!(Map|Array)} Map, keyed by node, of predecessors in the shortest
 *   path.
 */


/*istanbul ignore next*/
function _allPairsShortestPath() {
  _allPairsShortestPath = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee5(G, optCutoff)
  /*istanbul ignore next*/
  {
    var paths, _iteratorNormalCompletion9, _didIteratorError9, _iteratorError9, _iterator9, _step9, n;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            paths = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map();
            _iteratorNormalCompletion9 = true;
            _didIteratorError9 = false;
            _iteratorError9 = undefined;
            _context5.prev = 4;

            for (
            /*istanbul ignore next*/
            _iterator9 = G[Symbol.iterator]();
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion9 = true) {
              /*istanbul ignore next*/
              n = _step9.value;
              paths.set(n, singleSourceShortestPath(G, n, optCutoff));
            }

            _context5.next = 12;
            break;

          case 8:
            _context5.prev = 8;
            _context5.t0 = _context5["catch"](4);
            _didIteratorError9 = true;
            _iteratorError9 = _context5.t0;

          case 12:
            _context5.prev = 12;
            _context5.prev = 13;

            if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
              _iterator9["return"]();
            }

          case 15:
            _context5.prev = 15;

            if (!_didIteratorError9) {
              _context5.next = 18;
              break;
            }

            throw _iteratorError9;

          case 18:
            return _context5.finish(15);

          case 19:
            return _context5.finish(12);

          case 20:
            return _context5.abrupt("return", paths);

          case 21:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[4, 8, 12, 20], [13,, 15, 19]]);
  }));
  return _allPairsShortestPath.apply(this, arguments);
}

/*istanbul ignore next*/
function predecessor(_x14, _x15) {
  return _predecessor.apply(this, arguments);
}

/*istanbul ignore next*/
function _predecessor() {
  _predecessor = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee6(G, source)
  /*istanbul ignore next*/
  {
    var optArgs,
        target,
        cutoff,
        returnSeen,
        level,
        nextlevel,
        seen,
        pred,
        thislevel,
        _args6 = arguments;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            optArgs = _args6.length > 2 && _args6[2] !== undefined ? _args6[2] : {};
            // TODO: use parameter destructuring
            // {target, cutoff, returnSeen}
            target = optArgs.target, cutoff = optArgs.cutoff, returnSeen = optArgs.returnSeen;
            level = 0;
            nextlevel = [source];
            seen = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map([[source, level]]);
            pred = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map([[source, []]]);
            /*jshint loopfunc:true*/

          case 6:
            if (!(nextlevel.length > 0)) {
              _context6.next = 15;
              break;
            }

            level += 1;
            thislevel = nextlevel;
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

            if (!(cutoff != null && cutoff <= level)) {
              _context6.next = 13;
              break;
            }

            return _context6.abrupt("break", 15);

          case 13:
            _context6.next = 6;
            break;

          case 15:
            if (!(target != null)) {
              _context6.next = 21;
              break;
            }

            if (!returnSeen) {
              _context6.next = 20;
              break;
            }

            return _context6.abrupt("return", pred.has(target) ? [pred.get(target), seen.get(target)] : [[], -1]);

          case 20:
            return _context6.abrupt("return",
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            getDefault)(pred.get(target), []));

          case 21:
            return _context6.abrupt("return", returnSeen ? [pred, seen] : pred);

          case 22:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _predecessor.apply(this, arguments);
}