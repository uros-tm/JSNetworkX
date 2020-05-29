'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fastGnpRandomGraph = fastGnpRandomGraph;
exports.gnpRandomGraph = gnpRandomGraph;
exports.binomialGraph = binomialGraph;
exports.erdosRenyiGraph = erdosRenyiGraph;

var
/*istanbul ignore next*/
_DiGraph = _interopRequireDefault(require("../classes/DiGraph"));

var
/*istanbul ignore next*/
_Graph = _interopRequireDefault(require("../classes/Graph"));

var
/*istanbul ignore next*/
_classic = require("./classic");

var
/*istanbul ignore next*/
_internals = require("../_internals");

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

//
//-------------------------------------------------------------------------
//  Some Famous Random Graphs
//-------------------------------------------------------------------------

/**
 * Return a random graph `$G_{n,p}$` (Erdős-Rényi graph, binomial graph).
 *
 * The `$G_{n,p}$` graph algorithm chooses each of the `$[n(n-1)]/2$`
 * (undirected) or `$n(n-1)$` (directed) possible edges with probability `$p$`.
 *
 * This algorithm is `$O(n+m)$` where `$m$` is the expected number of
 * edges `$m = p*n*(n-1)/2$`.
 *
 * It should be faster than `gnpRandomGraph` when `p` is small and
 * the expected number of edges is small (sparse graph).
 *
 * ### References
 *
 * [1] Vladimir Batagelj and Ulrik Brandes,
 *     "Efficient generation of large random networks",
 *     Phys. Rev. E, 71, 036113, 2005.
 *
 * @param {number} n The number of nodes
 * @param {number} p Probability for edge creation
 * @param {boolean} optDirected If true return a directed graph
 * @return {Graph}
 */
function fastGnpRandomGraph(_x, _x2) {
  return _fastGnpRandomGraph.apply(this, arguments);
}
/**
 * Return a random graph `$G_{n,p}$` (Erdős-Rényi graph, binomial graph).
 *
 * Chooses each of the possible edges with probability `p.
 *
 * This is also called `binomialGraph` and `erdosRenyiGraph`.
 *
 * This is an `$O(n^2)$` algorithm.  For sparse graphs (small `$p$`) see
 * `fastGnpRandomGraph for a faster algorithm.
 *
 * @param {number} n The number of nodes
 * @param {number} p Probability for edge creation
 * @param {boolean} optDirected
 *  If true returns a directed graph
 * @return {Graph}
 */


/*istanbul ignore next*/
function _fastGnpRandomGraph() {
  _fastGnpRandomGraph = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee(n, p)
  /*istanbul ignore next*/
  {
    var optDirected,
        G,
        v,
        w,
        lp,
        lr,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            optDirected = _args.length > 2 && _args[2] !== undefined ? _args[2] : false;
            G =
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _classic.
            /*istanbul ignore next*/
            emptyGraph)(n);
            G.name =
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            sprintf)('fastGnpRandomGraph(%s, %s)', n, p);

            if (!(p <= 0 || p >= 1)) {
              _context.next = 5;
              break;
            }

            return _context.abrupt("return", gnpRandomGraph(n, p, optDirected));

          case 5:
            w = -1;
            lp = Math.log(1 - p);

            if (optDirected) {
              // Nodes in graph are from 0,n-1 (start with v as the first node index).
              v = 0;
              G = new
              /*istanbul ignore next*/
              _DiGraph[
              /*istanbul ignore next*/
              "default"](G);

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

            return _context.abrupt("return", G);

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fastGnpRandomGraph.apply(this, arguments);
}

/*istanbul ignore next*/
function gnpRandomGraph(_x3, _x4) {
  return _gnpRandomGraph.apply(this, arguments);
}
/**
 * @alias gnpRandomGraph
 */


/*istanbul ignore next*/
function _gnpRandomGraph() {
  _gnpRandomGraph = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee2(n, p)
  /*istanbul ignore next*/
  {
    var optDirected,
        G,
        edges,
        rangeN,
        _iteratorNormalCompletion,
        _didIteratorError,
        _iteratorError,
        _iterator,
        _step,
        edge,
        _args2 = arguments;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            optDirected = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : false;
            G = optDirected ? new
            /*istanbul ignore next*/
            _DiGraph[
            /*istanbul ignore next*/
            "default"]() : new
            /*istanbul ignore next*/
            _Graph[
            /*istanbul ignore next*/
            "default"]();
            rangeN =
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            range)(n);
            G.addNodesFrom(rangeN);
            G.name =
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            sprintf)('gnpRandomGraph(%s, %s)', n, p);

            if (!(p <= 0)) {
              _context2.next = 7;
              break;
            }

            return _context2.abrupt("return", G);

          case 7:
            if (!(p >= 1)) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return",
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _classic.
            /*istanbul ignore next*/
            completeGraph)(n, G));

          case 9:
            edges = G.isDirected() ?
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            genPermutations)(rangeN, 2) :
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            genCombinations)(rangeN, 2);
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context2.prev = 13;

            for (
            /*istanbul ignore next*/
            _iterator = edges[Symbol.iterator]();
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion = true) {
              /*istanbul ignore next*/
              edge = _step.value;

              if (Math.random() < p) {
                G.addEdge(edge[0], edge[1]);
              }
            }

            _context2.next = 21;
            break;

          case 17:
            _context2.prev = 17;
            _context2.t0 = _context2["catch"](13);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 21:
            _context2.prev = 21;
            _context2.prev = 22;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 24:
            _context2.prev = 24;

            if (!_didIteratorError) {
              _context2.next = 27;
              break;
            }

            throw _iteratorError;

          case 27:
            return _context2.finish(24);

          case 28:
            return _context2.finish(21);

          case 29:
            return _context2.abrupt("return", G);

          case 30:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[13, 17, 21, 29], [22,, 24, 28]]);
  }));
  return _gnpRandomGraph.apply(this, arguments);
}

/*istanbul ignore next*/
function binomialGraph(_x5, _x6, _x7) {
  return _binomialGraph.apply(this, arguments);
}
/**
 * @alias gnpRandomGraph
 */


/*istanbul ignore next*/
function _binomialGraph() {
  _binomialGraph = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee3(n, p, optDirected)
  /*istanbul ignore next*/
  {
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return gnpRandomGraph(n, p, optDirected);

          case 2:
            return _context3.abrupt("return", _context3.sent);

          case 3:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _binomialGraph.apply(this, arguments);
}

/*istanbul ignore next*/
function erdosRenyiGraph(_x8, _x9, _x10) {
  return _erdosRenyiGraph.apply(this, arguments);
} //TODO: newman_watts_strogatz_graph
//TODO: watts_strogatz_graph
//TODO: connected_watts_strogatz_graph
//TODO: random_regular_graph
//TODO: _random_subset
//TODO: barabasi_albert_graph
//TODO: powerlaw_cluster_graph
//TODO: random_lobster
//TODO: random_shell_graph
//TODO: random_powerlaw_tree
//TODO: random_powerlaw_tree_sequence


/*istanbul ignore next*/
function _erdosRenyiGraph() {
  _erdosRenyiGraph = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee4(n, p, optDirected)
  /*istanbul ignore next*/
  {
    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return gnpRandomGraph(n, p, optDirected);

          case 2:
            return _context4.abrupt("return", _context4.sent);

          case 3:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _erdosRenyiGraph.apply(this, arguments);
}