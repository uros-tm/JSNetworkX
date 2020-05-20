/*eslint max-len:[1, 94]*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.findCliques = findCliques;
exports.findCliquesRecursive = findCliquesRecursive;
exports.graphCliqueNumber = graphCliqueNumber;
exports.graphNumberOfCliques = graphNumberOfCliques;
exports.numberOfCliques = numberOfCliques;

var
/*istanbul ignore next*/
_internals = require("../_internals");

/*istanbul ignore next*/ function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _asyncIterator(iterable) { var method; if (typeof Symbol !== "undefined") { if (Symbol.asyncIterator) { method = iterable[Symbol.asyncIterator]; if (method != null) return method.call(iterable); } if (Symbol.iterator) { method = iterable[Symbol.iterator]; if (method != null) return method.call(iterable); } } throw new TypeError("Object is not async iterable"); }

function _asyncGeneratorDelegate(inner, awaitWrap) { var iter = {}, waiting = false; function pump(key, value) { waiting = true; value = new Promise(function (resolve) { resolve(inner[key](value)); }); return { done: false, value: awaitWrap(value) }; } ; if (typeof Symbol === "function" && Symbol.iterator) { iter[Symbol.iterator] = function () { return this; }; } iter.next = function (value) { if (waiting) { waiting = false; return value; } return pump("next", value); }; if (typeof inner["throw"] === "function") { iter["throw"] = function (value) { if (waiting) { waiting = false; throw value; } return pump("throw", value); }; } if (typeof inner["return"] === "function") { iter["return"] = function (value) { return pump("return", value); }; } return iter; }

function _awaitAsyncGenerator(value) { return new _AwaitValue(value); }

function _wrapAsyncGenerator(fn) { return function () { return new _AsyncGenerator(fn.apply(this, arguments)); }; }

function _AsyncGenerator(gen) { var front, back; function send(key, arg) { return new Promise(function (resolve, reject) { var request = { key: key, arg: arg, resolve: resolve, reject: reject, next: null }; if (back) { back = back.next = request; } else { front = back = request; resume(key, arg); } }); } function resume(key, arg) { try { var result = gen[key](arg); var value = result.value; var wrappedAwait = value instanceof _AwaitValue; Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) { if (wrappedAwait) { resume("next", arg); return; } settle(result.done ? "return" : "normal", arg); }, function (err) { resume("throw", err); }); } catch (err) { settle("throw", err); } } function settle(type, value) { switch (type) { case "return": front.resolve({ value: value, done: true }); break; case "throw": front.reject(value); break; default: front.resolve({ value: value, done: false }); break; } front = front.next; if (front) { resume(front.key, front.arg); } else { back = null; } } this._invoke = send; if (typeof gen["return"] !== "function") { this["return"] = undefined; } }

if (typeof Symbol === "function" && Symbol.asyncIterator) { _AsyncGenerator.prototype[Symbol.asyncIterator] = function () { return this; }; }

_AsyncGenerator.prototype.next = function (arg) { return this._invoke("next", arg); };

_AsyncGenerator.prototype["throw"] = function (arg) { return this._invoke("throw", arg); };

_AsyncGenerator.prototype["return"] = function (arg) { return this._invoke("return", arg); };

function _AwaitValue(value) { this.wrapped = value; }

/**
 * @fileoverview
 * Find and manipulate cliques of graphs.
 *
 * Note that finding the largest clique of a graph has been
 * shown to be an NP-complete problem; the algorithms here
 * could take a long time to run.
 *
 * http://en.wikipedia.org/wiki/Clique_problem
 */
// TODO: enumerate_all_cliques

/**
 * Search for all maximal cliques in a graph.
 *
 * Maximal cliques are the largest complete subgraph containing
 * a given node.  The largest maximal clique is sometimes called
 * the maximum clique.
 *
 *
 * ### Notes
 *
 * Based on the algorithm published by Bron & Kerbosch (1973) ([1][])
 * as adapted by Tomita, Tanaka and Takahashi (2006) ([2][])
 * and discussed in Cazals and Karande (2008) ([3][]).
 *
 * This algorithm ignores self-loops and parallel edges as
 * clique is not conventionally defined with such edges.
 *
 * There are often many cliques in graphs.  This algorithm can
 * run out of memory for large graphs.
 *
 * ### References
 *
 * [1] [Bron, C. and Kerbosch, J. 1973.
 *    Algorithm 457: finding all cliques of an undirected graph.
 *    Commun. ACM 16, 9 (Sep. 1973), 575-577.][1]
 * [1]: http://portal.acm.org/citation.cfm?doid=362342.362367
 *
 * [2] [Etsuji Tomita, Akira Tanaka, Haruhisa Takahashi,
 *    The worst-case time complexity for generating all maximal
 *    cliques and computational experiments,
 *    Theoretical Computer Science, Volume 363, Issue 1,
 *    Computing and Combinatorics,
 *    10th Annual International Conference on
 *    Computing and Combinatorics (COCOON 2004), 25 October 2006,
 *    Pages 28-42][2]
 * [2]: http://dx.doi.org/10.1016/j.tcs.2006.06.015
 *
 * [3] [F. Cazals, C. Karande,
 *    A note on the problem of reporting maximal cliques,
 *    Theoretical Computer Science,
 *    Volume 407, Issues 1-3, 6 November 2008, Pages 564-568][3]
 * [3]: http://dx.doi.org/10.1016/j.tcs.2008.05.010
 *
 * @see findCliquesRecursive
 *
 * @param {Graph} G
 * @return {Iterator<Array<Node>>} Iterator over member lists for each maximal
 *  clique
 */
function findCliques(_x) {
  return _findCliques.apply(this, arguments);
}

/*istanbul ignore next*/
function _findCliques() {
  _findCliques = _wrapAsyncGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee(G)
  /*istanbul ignore next*/
  {
    var adj, subgraph, candidates, Q, u, extU, stack, q, adjQ, subgraphQ, candidatesQ, _stack$pop, _stack$pop2;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(G.numberOfNodes() === 0)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", []);

          case 2:
            adj = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map(
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            mapIterator)(G, function (u) {
              var neighbors = new
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              Set(G.neighborsIter(u));
              neighbors[
              /*istanbul ignore next*/
              "delete"](u);
              return (
                /*istanbul ignore next*/
                (0,
                /*istanbul ignore next*/
                _internals.
                /*istanbul ignore next*/
                tuple2)(u, neighbors)
              );
            }));
            subgraph = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Set(G);
            candidates = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Set(G);
            Q = [null];
            u =
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            max)(subgraph, function (u)
            /*istanbul ignore next*/
            {
              return candidates.intersection(adj.get(u)).size;
            });
            extU = candidates.difference(adj.get(u));
            stack = [];

          case 9:
            if (!true) {
              _context.next = 35;
              break;
            }

            if (!(extU.size > 0)) {
              _context.next = 25;
              break;
            }

            q = extU.pop();
            candidates[
            /*istanbul ignore next*/
            "delete"](q);
            Q[Q.length - 1] = q;
            adjQ = adj.get(q);
            subgraphQ = subgraph.intersection(adjQ);

            if (!(subgraphQ.size === 0)) {
              _context.next = 21;
              break;
            }

            _context.next = 19;
            return Q.slice();

          case 19:
            _context.next = 23;
            break;

          case 21:
            candidatesQ = candidates.intersection(adjQ);

            if (candidatesQ.size > 0) {
              stack.push([subgraph, candidates, extU]);
              Q.push(null);
              subgraph = subgraphQ;
              candidates = candidatesQ;
              /* eslint-disable no-loop-func*/

              u =
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              max)(subgraph, function (u)
              /*istanbul ignore next*/
              {
                return candidates.intersection(adj.get(u)).size;
              });
              /* eslint-enable no-loop-func*/

              extU = candidates.difference(adj.get(u));
            }

          case 23:
            _context.next = 33;
            break;

          case 25:
            if (!(Q.length === 0 || stack.length === 0)) {
              _context.next = 27;
              break;
            }

            return _context.abrupt("break", 35);

          case 27:
            Q.pop();
            _stack$pop = stack.pop();
            _stack$pop2 = _slicedToArray(_stack$pop, 3);
            subgraph = _stack$pop2[0];
            candidates = _stack$pop2[1];
            extU = _stack$pop2[2];

          case 33:
            _context.next = 9;
            break;

          case 35:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _findCliques.apply(this, arguments);
}

;
/**
 * Recursive search for all maximal cliques in a graph.
 *
 * Maximal cliques are the largest complete subgraph containing
 * a given point.  The largest maximal clique is sometimes called
 * the maximum clique.
 *
 * ### Notes
 *
 * Based on the algorithm published by Bron & Kerbosch (1973) ([1][])
 * as adapted by Tomita, Tanaka and Takahashi (2006) ([2][])
 * and discussed in Cazals and Karande (2008) ([3][]).
 *
 * This algorithm ignores self-loops and parallel edges as
 * clique is not conventionally defined with such edges.
 *
 *
 * ### References
 *
 * [1] [Bron, C. and Kerbosch, J. 1973.
 *    Algorithm 457: finding all cliques of an undirected graph.
 *    Commun. ACM 16, 9 (Sep. 1973), 575-577.][1]
 * [1]: http://portal.acm.org/citation.cfm?doid=362342.362367
 *
 * [2] [Etsuji Tomita, Akira Tanaka, Haruhisa Takahashi,
 *    The worst-case time complexity for generating all maximal
 *    cliques and computational experiments,
 *    Theoretical Computer Science, Volume 363, Issue 1,
 *    Computing and Combinatorics,
 *    10th Annual International Conference on
 *    Computing and Combinatorics (COCOON 2004), 25 October 2006, Pages 28-42][2]
 * [2]: http://dx.doi.org/10.1016/j.tcs.2006.06.015
 *
 * [3] [F. Cazals, C. Karande,
 *    A note on the problem of reporting maximal cliques,
 *    Theoretical Computer Science,
 *    Volume 407, Issues 1-3, 6 November 2008, Pages 564-568][3]
 * [3]: http://dx.doi.org/10.1016/j.tcs.2008.05.010
 *
 * @param {Graph} G
 * @return {!Iterator<Array<Node>>} List of members in each maximal clique
 *
 * @see find_cliques
 */

/*istanbul ignore next*/
function findCliquesRecursive(_x2) {
  return _findCliquesRecursive.apply(this, arguments);
}

/*istanbul ignore next*/
function _findCliquesRecursive() {
  _findCliquesRecursive = _wrapAsyncGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee2(G)
  /*istanbul ignore next*/
  {
    var _marked, adj, Q, expand;

    return regeneratorRuntime.wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            expand = function _ref(subgraph, candidates) {
              var u, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, q, adjQ, subgraphQ, candidatesQ;

              return regeneratorRuntime.wrap(function expand$(_context2) {
                while (1) {
                  switch (_context2.prev = _context2.next) {
                    case 0:
                      u =
                      /*istanbul ignore next*/
                      (0,
                      /*istanbul ignore next*/
                      _internals.
                      /*istanbul ignore next*/
                      max)(subgraph, function (u)
                      /*istanbul ignore next*/
                      {
                        return candidates.intersection(adj.get(u)).size;
                      });
                      _iteratorNormalCompletion = true;
                      _didIteratorError = false;
                      _iteratorError = undefined;
                      _context2.prev = 4;
                      _iterator = candidates.difference(adj.get(u))[Symbol.iterator]();

                    case 6:
                      if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                        _context2.next = 24;
                        break;
                      }

                      q = _step.value;
                      candidates[
                      /*istanbul ignore next*/
                      "delete"](q);
                      Q.push(q);
                      adjQ = adj.get(q);
                      subgraphQ = subgraph.intersection(adjQ);

                      if (!(subgraphQ.size === 0)) {
                        _context2.next = 17;
                        break;
                      }

                      _context2.next = 15;
                      return Q.slice();

                    case 15:
                      _context2.next = 20;
                      break;

                    case 17:
                      candidatesQ = candidates.intersection(adjQ);

                      if (!(candidatesQ.size > 0)) {
                        _context2.next = 20;
                        break;
                      }

                      return (
                        /*istanbul ignore next*/
                        _context2.delegateYield(expand(subgraphQ, candidatesQ), "t0", 20)
                      );

                    case 20:
                      Q.pop();

                    case 21:
                      _iteratorNormalCompletion = true;
                      _context2.next = 6;
                      break;

                    case 24:
                      _context2.next = 30;
                      break;

                    case 26:
                      _context2.prev = 26;
                      _context2.t1 = _context2["catch"](4);
                      _didIteratorError = true;
                      _iteratorError = _context2.t1;

                    case 30:
                      _context2.prev = 30;
                      _context2.prev = 31;

                      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                        _iterator["return"]();
                      }

                    case 33:
                      _context2.prev = 33;

                      if (!_didIteratorError) {
                        _context2.next = 36;
                        break;
                      }

                      throw _iteratorError;

                    case 36:
                      return _context2.finish(33);

                    case 37:
                      return _context2.finish(30);

                    case 38:
                    case "end":
                      return _context2.stop();
                  }
                }
              }, _marked, null, [[4, 26, 30, 38], [31,, 33, 37]]);
            };

            _marked =
            /*#__PURE__*/
            regeneratorRuntime.mark(expand);

            if (!(G.size === 0)) {
              _context3.next = 5;
              break;
            }

            _context3.next = 5;
            return [];

          case 5:
            adj = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map(
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            mapIterator)(G, function (u) {
              var neighbors = new
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              Set(G.neighborsIter(u));
              neighbors[
              /*istanbul ignore next*/
              "delete"](u);
              return (
                /*istanbul ignore next*/
                (0,
                /*istanbul ignore next*/
                _internals.
                /*istanbul ignore next*/
                tuple2)(u, neighbors)
              );
            }));
            Q = [];
            return (
              /*istanbul ignore next*/
              _context3.delegateYield(_asyncGeneratorDelegate(_asyncIterator(expand(new
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              Set(G), new
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              Set(G))), _awaitAsyncGenerator), "t0", 8)
            );

          case 8:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee2);
  }));
  return _findCliquesRecursive.apply(this, arguments);
}

; //TODO: make_max_clique_graph
//TODO: make_clique_bipartite
//TODO: project_down
//TODO: project_up

/**
 * Return the clique number (size of the largest clique) for G.
 *
 * An optional list of cliques can be input if already computed.
 *
 * @param {Graph} G graph
 * @param {Iterable=} optCliques
 * @return {number}
 */

/*istanbul ignore next*/
function graphCliqueNumber(_x3, _x4) {
  return _graphCliqueNumber.apply(this, arguments);
}
/**
 * Returns the number of maximal cliques in G.
 *
 * An optional list of cliques can be input if already computed.
 *
 * @param {Graph} G graph
 * @param {Iterable=} optCliques
 * @return {number}
 */


/*istanbul ignore next*/
function _graphCliqueNumber() {
  _graphCliqueNumber = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee3(G, optCliques)
  /*istanbul ignore next*/
  {
    return regeneratorRuntime.wrap(function _callee3$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(optCliques == null)) {
              _context4.next = 4;
              break;
            }

            _context4.next = 3;
            return findCliques(G);

          case 3:
            optCliques = _context4.sent;

          case 4:
            return _context4.abrupt("return",
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            max)(optCliques, function (c)
            /*istanbul ignore next*/
            {
              return c.length;
            }).length);

          case 5:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee3);
  }));
  return _graphCliqueNumber.apply(this, arguments);
}

/*istanbul ignore next*/
function graphNumberOfCliques(_x5, _x6) {
  return _graphNumberOfCliques.apply(this, arguments);
} //TODO: node_clique_number

/**
 * Returns the number of maximal cliques for each node.
 *
 * Returns a single or list depending on input nodes.
 * Optional list of cliques can be input if already computed.
 *
 * @param {Graph} G graph
 * @param {Iterable=} optNodes List of nodes
 * @param {Iterable=} optCliques List of cliques
 * @return {!(Map|number)}
 */


/*istanbul ignore next*/
function _graphNumberOfCliques() {
  _graphNumberOfCliques = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee4(G, optCliques)
  /*istanbul ignore next*/
  {
    return regeneratorRuntime.wrap(function _callee4$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!(optCliques == null)) {
              _context5.next = 4;
              break;
            }

            _context5.next = 3;
            return findCliques(G);

          case 3:
            optCliques = _context5.sent;

          case 4:
            return _context5.abrupt("return", Array.from(optCliques).length);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee4);
  }));
  return _graphNumberOfCliques.apply(this, arguments);
}

/*istanbul ignore next*/
function numberOfCliques(_x7, _x8, _x9) {
  return _numberOfCliques.apply(this, arguments);
} //TODO: cliques_containing_node


/*istanbul ignore next*/
function _numberOfCliques() {
  _numberOfCliques = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee5(G, optNodes, optCliques)
  /*istanbul ignore next*/
  {
    var numcliq, v;
    return regeneratorRuntime.wrap(function _callee5$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.t0 = Array;
            _context6.t1 = optCliques;

            if (_context6.t1) {
              _context6.next = 6;
              break;
            }

            _context6.next = 5;
            return findCliques(G);

          case 5:
            _context6.t1 = _context6.sent;

          case 6:
            _context6.t2 = _context6.t1;
            optCliques = _context6.t0.from.call(_context6.t0, _context6.t2);

            // eslint-disable-line no-undef
            if (optNodes == null) {
              optNodes = G.nodes(); // none, get entire graph
            }

            if (!Array.isArray(optNodes)) {
              /*istanbul ignore next*/
              v = optNodes;
              numcliq = optCliques.filter(function (c)
              /*istanbul ignore next*/
              {
                return new
                /*istanbul ignore next*/
                _internals.
                /*istanbul ignore next*/
                Set(c).has(v);
              }).length;
            } else {
              optCliques = optCliques.map(function (c)
              /*istanbul ignore next*/
              {
                return new
                /*istanbul ignore next*/
                _internals.
                /*istanbul ignore next*/
                Set(c);
              });
              numcliq = new
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              Map();
              optNodes.forEach(function (v) {
                numcliq.set(v, optCliques.filter(function (c)
                /*istanbul ignore next*/
                {
                  return c.has(v);
                }).length);
              });
            }

            return _context6.abrupt("return", numcliq);

          case 11:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee5);
  }));
  return _numberOfCliques.apply(this, arguments);
}