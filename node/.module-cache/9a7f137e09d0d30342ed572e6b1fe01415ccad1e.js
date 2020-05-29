/*eslint max-len:[1, 83]*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isDirectedAcyclicGraph = isDirectedAcyclicGraph;
exports.topologicalSort = topologicalSort;
exports.topologicalSortRecursive = topologicalSortRecursive;
exports.isAperiodic = isAperiodic;

var
/*istanbul ignore next*/
_JSNetworkXError = _interopRequireDefault(require("../exceptions/JSNetworkXError"));

var
/*istanbul ignore next*/
_JSNetworkXUnfeasible = _interopRequireDefault(require("../exceptions/JSNetworkXUnfeasible"));

var
/*istanbul ignore next*/
_internals = require("../_internals");

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// TODO: descendants
// TODO: ancestors

/**
 * Return `true` if the graph G is a directed acyclic graph (DAG) or
 * `false` if not.
 *
 * @param {Graph} G A graph
 * @return {boolean} true of G is a DAG, false otherwise
 */
function isDirectedAcyclicGraph(_x) {
  return _isDirectedAcyclicGraph.apply(this, arguments);
}
/**
 * Return a list of nodes in topological sort order.
 *
 * A topological sort is a non-unique permutation of the nodes such that an edge
 * from `$u$` to `$v$` implies that `$u$` appears before `$v$` in the
 * topological sort order.
 *
 * ### Notes
 *
 * This algorithm is based on a description and proof in
 * The Algorithm Design Manual ([1][]).
 *
 * ### References
 *
 *
 * [1] [Skiena, S. S. The Algorithm Design Manual  (Springer-Verlag, 1998).][1]
 * [1]: http://www.amazon.com/exec/obidos/ASIN/0387948600/ref=ase_thealgorithmrepo/
 *
 * @see #is_directed_acyclic_graph
 *
 * @param {Graph} G A directed Graph
 * @param {Iterable=} optNbunch Explore graph in specified order given
 *    in optNbunch.
 * @return {!Array}
 */


/*istanbul ignore next*/
function _isDirectedAcyclicGraph() {
  _isDirectedAcyclicGraph = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee(G)
  /*istanbul ignore next*/
  {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            topologicalSort(G);
            return _context.abrupt("return", true);

          case 5:
            _context.prev = 5;
            _context.t0 = _context["catch"](0);

            if (!(
            /*istanbul ignore next*/
            _context.t0 instanceof
            /*istanbul ignore next*/
            _JSNetworkXUnfeasible[
            /*istanbul ignore next*/
            "default"])) {
              _context.next = 9;
              break;
            }

            return _context.abrupt("return", false);

          case 9:
            throw _context.t0;

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[0, 5]]);
  }));
  return _isDirectedAcyclicGraph.apply(this, arguments);
}

/*istanbul ignore next*/
function topologicalSort(_x2, _x3) {
  return _topologicalSort.apply(this, arguments);
}
/**
 * Return a list of nodes in topological sort order.
 *
 * A topological sort is a non-unique permutation of the nodes such that an edge
 * from `$u$` to `$v$` implies that `$u$` appears before `$v$` in the
 * topological sort order.
 *
 * ### Notes
 *
 * This is a recursive version of topological sort.
 *
 * @see #topological_sort
 * @see #is_directed_acyclic_graph
 *
 * @param {Graph} G A directed Graph
 * @param {Iterable=} optNbunch Explore graph in specified order given
 *    in optNbunch.
 * @return {!Array}
 */


/*istanbul ignore next*/
function _topologicalSort() {
  _topologicalSort = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee2(G, optNbunch)
  /*istanbul ignore next*/
  {
    var seen, orderExplored, explored;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (G.isDirected()) {
              _context2.next = 2;
              break;
            }

            throw new
            /*istanbul ignore next*/
            _JSNetworkXError[
            /*istanbul ignore next*/
            "default"]('Topological sort not defined on undirected graphs.');

          case 2:
            // nonrecursive version
            seen = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Set();
            orderExplored = []; // provide order and
            // fast search without more general priorityDictionary

            explored = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Set();

            if (optNbunch == null) {
              optNbunch = G.nodesIter();
            }

            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            forEach)(optNbunch, function (v) {
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
                /*eslint-disable no-loop-func*/

                G.get(w).forEach(function (_, n) {
                  if (!explored.has(n)) {
                    if (seen.has(n)) {
                      // CYCLE !!
                      throw new
                      /*istanbul ignore next*/
                      _JSNetworkXUnfeasible[
                      /*istanbul ignore next*/
                      "default"]('Graph contains a cycle.');
                    }

                    newNodes.push(n);
                  }
                });
                /*eslint-enable no-loop-func*/

                if (newNodes.length > 0) {
                  // add new nodes to fringe
                  fringe.push.apply(fringe, newNodes);
                } else {
                  explored.add(w);
                  orderExplored.unshift(w);
                }
              }
            });
            return _context2.abrupt("return", orderExplored);

          case 8:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _topologicalSort.apply(this, arguments);
}

/*istanbul ignore next*/
function topologicalSortRecursive(_x4, _x5) {
  return _topologicalSortRecursive.apply(this, arguments);
}
/**
 * Return true if G is aperiodic.
 *
 * A directed graph is aperiodic if there is no integer `$k > 1$` that
 * divides the length of every cycle in the graph.
 *
 * ### Notes
 *
 * This uses the method outlined in (1), which runs in `$O(m)$` time
 * given `$m$` edges in `$G$`. Note that a graph is not aperiodic if it is
 * acyclic as every integer trivial divides length `$0$` cycles.
 *
 *
 * ### References
 *
 * [1] Jarvis, J. P.; Shier, D. R. (1996),
 *     Graph-theoretic analysis of finite Markov chains,
 *     in Shier, D. R.; Wallenius, K. T., Applied Mathematical Modeling:
 *     A Multidisciplinary Approach, CRC Press.
 *
 * @param {Graph} G
 * @return {boolean} true if the graph is aperiodic false otherwise
 */


/*istanbul ignore next*/
function _topologicalSortRecursive() {
  _topologicalSortRecursive = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee3(G, optNbunch)
  /*istanbul ignore next*/
  {
    var _dfs, seen, explored;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _dfs = function _dfs2(G, seen, explored, v) {
              // eslint-disable-line no-shadow
              seen.add(v);
              G.get(v).forEach(function (_, w) {
                if (!seen.has(w)) {
                  if (!_dfs(G, seen, explored, w)) {
                    return false;
                  }
                } else if (seen.has(w) && explored.indexOf(w) === -1) {
                  throw new
                  /*istanbul ignore next*/
                  _JSNetworkXUnfeasible[
                  /*istanbul ignore next*/
                  "default"]('Graph contains a cycle.');
                }
              });
              explored.unshift(v);
              return true;
            };

            if (G.isDirected()) {
              _context3.next = 3;
              break;
            }

            throw new
            /*istanbul ignore next*/
            _JSNetworkXError[
            /*istanbul ignore next*/
            "default"]('Topological sort not defined on undirected graphs.');

          case 3:
            seen = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Set();
            explored = [];

            if (optNbunch == null) {
              optNbunch = G.nodesIter();
            }

            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            forEach)(optNbunch, function (v) {
              if (explored.indexOf(v) === -1) {
                if (!_dfs(G, seen, explored, v)) {
                  throw new
                  /*istanbul ignore next*/
                  _JSNetworkXUnfeasible[
                  /*istanbul ignore next*/
                  "default"]('Graph contains a cycle.');
                }
              }
            });
            return _context3.abrupt("return", explored);

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _topologicalSortRecursive.apply(this, arguments);
}

/*istanbul ignore next*/
function isAperiodic(_x6) {
  return _isAperiodic.apply(this, arguments);
}

/*istanbul ignore next*/
function _isAperiodic() {
  _isAperiodic = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee4(G)
  /*istanbul ignore next*/
  {
    var next, levels, thisLevel, g, l, nextLevel, i, u;
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (G.isDirected()) {
              _context4.next = 2;
              break;
            }

            throw new
            /*istanbul ignore next*/
            _JSNetworkXError[
            /*istanbul ignore next*/
            "default"]('is_aperiodic not defined for undirected graphs.');

          case 2:
            next = G.nodesIter().next();

            if (!next.done) {
              _context4.next = 5;
              break;
            }

            return _context4.abrupt("return", true);

          case 5:
            levels = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map();
            levels.set(next.value, 0);
            thisLevel = [next.value];
            g = 0;
            l = 1;

            while (thisLevel.length > 0) {
              /*istanbul ignore next*/
              nextLevel = [];

              for (
              /*istanbul ignore next*/
              i = 0; i < thisLevel.length; i++) {
                /*istanbul ignore next*/
                u = thisLevel[i];
                /*eslint-disable no-loop-func*/

                G.get(u).forEach(function (_, v) {
                  if (levels.has(v)) {
                    // non-tree edge
                    g =
                    /*istanbul ignore next*/
                    (0,
                    /*istanbul ignore next*/
                    _internals.
                    /*istanbul ignore next*/
                    gcd)(g, levels.get(u) - levels.get(v) + 1);
                  } else {
                    // tree edge
                    nextLevel.push(v);
                    levels.set(v, l);
                  }
                });
                /*eslint-enable no-loop-func*/
              }

              thisLevel = nextLevel;
              l += 1;
            }

            if (!(levels.size === G.numberOfNodes())) {
              _context4.next = 13;
              break;
            }

            return _context4.abrupt("return", g === 1);

          case 13:
            return _context4.abrupt("return", g === 1 && isAperiodic(G.subgraph(new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Set(G.nodes()).difference(levels.keys()))));

          case 14:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _isAperiodic.apply(this, arguments);
}