/*eslint max-len:[1, 94]*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.betweennessCentrality = betweennessCentrality;
exports.edgeBetweennessCentrality = edgeBetweennessCentrality;

var
/*istanbul ignore next*/
_internals = require("../../_internals");

/*istanbul ignore next*/ function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Compute the shortest-path betweenness centrality for nodes.
 *
 * Betweenness centrality of a node `$v$` is the sum of the
 * fraction of all-pairs shortest paths that pass through `$v$`:
 *
 * ```math
 * c_B(v) = \sum_{s,t \in V} \frac{\sigma(s, t|v)}{\sigma(s, t)}
 * ```
 *
 * where `$V$` is the set of nodes, `$\sigma(s, t)$` is the number of
 * shortest `$(s, t)$`-paths,  and `$\sigma(s, t|v)$` is the number of those
 * paths  passing through some  node `$v$` other than `$s, t$`.
 * If `$s = t$`, `$\sigma(s, t) = 1$`, and if `$v \in {s, t}$`,
 * `$\sigma(s, t|v) = 0$` ([2][]).
 *
 * ### Notes
 *
 * The algorithm is from Ulrik Brandes ([1][]):
 *
 * See ([2][]) for details on algorithms for variations and related metrics.
 *
 * For approximate betweenness calculations set `k=#samples` to use
 * `k` nodes ("pivots") to estimate the betweenness values. For an estimate
 * of the number of pivots needed see ([3][]).
 *
 * For weighted graphs the edge weights must be greater than zero.
 * Zero edge weights can produce an infinite number of equal length
 * paths between pairs of nodes.
 *
 * ### References
 *
 * [1] [A Faster Algorithm for Betweenness Centrality.
 *    Ulrik Brandes,
 *    Journal of Mathematical Sociology 25(2):163-177, 2001.][1]
 * [1]: http://www.inf.uni-konstanz.de/algo/publications/b-fabc-01.pdf
 *
 * [2] [Ulrik Brandes: On Variants of Shortest-Path Betweenness
 *    Centrality and their Generic Computation.
 *    Social Networks 30(2):136-145, 2008.][2]
 * [2]: http://www.inf.uni-konstanz.de/algo/publications/b-vspbc-08.pdf
 *
 * [3] [Ulrik Brandes and Christian Pich:
 *    Centrality Estimation in Large Networks.
 *    International Journal of Bifurcation and Chaos 17(7):2303-2318, 2007.][3]
 * [3]: http://www.inf.uni-konstanz.de/algo/publications/bp-celn-06.pdf
 *
 * @see edgeBetweennessCentrality
 * @see loadCentrality
 *
 * @param {!Graph} G A JSNetworkX graph
 * @param {{k: ?number, normalized: ?bool, weight: ?string,endpoints: ?bool}=} optParameters
 *   - `k` (int)
 *
 *     If `k` is defined use `k` node samples to estimate betweenness.
 *     The value of `k <= n` where `n` is the number of nodes in the graph.
 *     Higher values give better approximation.
 *   - `normalized` (bool)
 *
 *     If `true`, the betweenness values are normalized by `2/((n-1)(n-2))`
 *     for graphs and `1/((n-1)(n-2))` for directed graphs where `n` is the
 *     number of nodes in G.
 *   - `weight` (default=null)
 *
 *     If null, all edge weights are considered equal.
 *     Otherwise holds the name of the edge attribute used as weight.
 *
 *   - `endpoints` (default=false)
 *
 *     If true include the endpoints in the shortest path counts.
 *
 * @return {Map} object with node keys with betweenness centrality as the value.
 */
function betweennessCentrality(_x) {
  return _betweennessCentrality.apply(this, arguments);
}
/**
 * Compute betweenness centrality for edges.
 *
 * Betweenness centrality of an edge `$e$` is the sum of the
 * fraction of all-pairs shortest paths that pass through `$e$`:
 *
 * ```math
 * c_B(v) = \sum_{s,t \in V} \frac{\sigma(s, t|e)}{\sigma(s, t)}
 * ```
 *
 * where `$V$` is the set of nodes, `$\sigma(s, t)$` is the number of
 * shortest `$(s, t)$`-paths, and `$\sigma(s, t|e)$` is the number of
 * those paths passing through edge `$e$` ([2][]).
 *
 * ### Notes
 *
 * The algorithm is from Ulrik Brandes ([1][]).
 *
 * For weighted graphs the edge weights must be greater than zero.
 * Zero edge weights can produce an infinite number of equal length
 * paths between pairs of nodes.
 *
 * ### References
 *
 * [1] [A Faster Algorithm for Betweenness Centrality. Ulrik Brandes,
 *    Journal of Mathematical Sociology 25(2):163-177, 2001.][1]
 * [1]: http://www.inf.uni-konstanz.de/algo/publications/b-fabc-01.pdf
 * [2] [Ulrik Brandes: On Variants of Shortest-Path Betweenness
 *    Centrality and their Generic Computation.
 *    Social Networks 30(2):136-145, 2008.][2]
 * [2]: http://www.inf.uni-konstanz.de/algo/publications/b-vspbc-08.pdf
 *
 * @see betweennessCentrality
 * @see edgeLoad
 *
 * @param {!Graph} G A NetworkX graph
 * @param {{normalized: bool=, weight: string=}=} optArgDict
 *   - `normalized` (default=false)
 *
 *     If true the betweenness values are normalized by `2/(n(n-1))`
 *     for graphs, and `1/(n(n-1))` for directed graphs where `n`
 *     is the number of nodes in G.
 *
 *   - `weight` (default=null)
 *
 *     If null, all edge weights are considered equal.
 *     Otherwise holds the name of the edge attribute used as weight.
 *
 * @return {Map} object with edge keys with betweenness centrality as the value.
*/


/*istanbul ignore next*/
function _betweennessCentrality() {
  _betweennessCentrality = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee(G)
  /*istanbul ignore next*/
  {
    var optArgDict,
        k,
        normalized,
        weight,
        endpoints,
        v,
        betweenness,
        nodes,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            optArgDict = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            // TODO: Use destructuring defaults once 6to5 supports it
            // {k=null, normalized=true, weight=null, endpoints=false}
            k = optArgDict.k, normalized = optArgDict.normalized, weight = optArgDict.weight, endpoints = optArgDict.endpoints;
            normalized = normalized == null ? true : normalized;
            endpoints = endpoints == null ? false : endpoints;
            betweenness = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map(Object.values(G).map(function (v)
            /*istanbul ignore next*/
            {
              return (
                /*istanbul ignore next*/
                (0,
                /*istanbul ignore next*/
                _internals.
                /*istanbul ignore next*/
                tuple2)(v, 0)
              );
            }));
            nodes = G.nodes();

            if (k != null) {
              nodes =
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              Arrays.sample(nodes, k);
            }

            nodes.forEach(function (s) {
              /*istanbul ignore next*/
              // single source shortest paths
              var _ref = weight == null ? singleSourceShortestPathBasic(G, s) : // use BFS
              singleSourceDijkstraPathBasic(G, s, weight),
                  _ref2 = _slicedToArray(_ref, 3),
                  S = _ref2[0],
                  P = _ref2[1],
                  sigma = _ref2[2]; // use Dijkstra's algorithm
              // accumulation


              betweenness = endpoints ? accumulateEndpoints(betweenness, S, P, sigma, s) : accumulateBasic(betweenness, S, P, sigma, s);
            }); // rescaling

            return _context.abrupt("return", rescale(betweenness, G.order(), normalized, G.isDirected(), k));

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _betweennessCentrality.apply(this, arguments);
}

/*istanbul ignore next*/
function edgeBetweennessCentrality(_x2) {
  return _edgeBetweennessCentrality.apply(this, arguments);
} // helpers for betweenness centrality


/*istanbul ignore next*/
function _edgeBetweennessCentrality() {
  _edgeBetweennessCentrality = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee2(G)
  /*istanbul ignore next*/
  {
    var optArgDict,
        normalized,
        weight,
        v,
        betweenness,
        _iteratorNormalCompletion2,
        _didIteratorError2,
        _iteratorError2,
        _iterator2,
        _step2,
        edge,
        _iteratorNormalCompletion3,
        _didIteratorError3,
        _iteratorError3,
        _iterator3,
        _step3,
        s,
        _ref3,
        _ref4,
        S,
        P,
        sigma,
        _iteratorNormalCompletion4,
        _didIteratorError4,
        _iteratorError4,
        _iterator4,
        _step4,
        n,
        _args2 = arguments;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            optArgDict = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : {};
            // TODO: Use destructuring defaults once 6to5 supports it
            normalized = optArgDict.normalized, weight = optArgDict.weight;
            normalized = normalized == null ? true : normalized;
            betweenness = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map(Object.values(G).map(function (v)
            /*istanbul ignore next*/
            {
              return (
                /*istanbul ignore next*/
                (0,
                /*istanbul ignore next*/
                _internals.
                /*istanbul ignore next*/
                tuple2)(v, 0)
              );
            }));
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context2.prev = 7;

            for (
            /*istanbul ignore next*/
            _iterator2 = G.edgesIter()[Symbol.iterator]();
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion2 = true) {
              /*istanbul ignore next*/
              edge = _step2.value;
              betweenness.set(edge, 0);
            }

            _context2.next = 15;
            break;

          case 11:
            _context2.prev = 11;
            _context2.t0 = _context2["catch"](7);
            _didIteratorError2 = true;
            _iteratorError2 = _context2.t0;

          case 15:
            _context2.prev = 15;
            _context2.prev = 16;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 18:
            _context2.prev = 18;

            if (!_didIteratorError2) {
              _context2.next = 21;
              break;
            }

            throw _iteratorError2;

          case 21:
            return _context2.finish(18);

          case 22:
            return _context2.finish(15);

          case 23:
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context2.prev = 26;

            for (
            /*istanbul ignore next*/
            _iterator3 = G[Symbol.iterator]();
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion3 = true) {
              /*istanbul ignore next*/
              s = _step3.value;

              /*istanbul ignore next*/
              // single source shortest paths
              _ref3 = weight == null ? singleSourceShortestPathBasic(G, s) : // use BFS
              singleSourceDijkstraPathBasic(G, s, weight), _ref4 = _slicedToArray(_ref3, 3), S = _ref4[0], P = _ref4[1], sigma = _ref4[2]; // use Dijkstra's algorithm
              // accumulation

              betweenness = accumulateEdges(betweenness, S, P, sigma, s);
            } // rescaling


            _context2.next = 34;
            break;

          case 30:
            _context2.prev = 30;
            _context2.t1 = _context2["catch"](26);
            _didIteratorError3 = true;
            _iteratorError3 = _context2.t1;

          case 34:
            _context2.prev = 34;
            _context2.prev = 35;

            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }

          case 37:
            _context2.prev = 37;

            if (!_didIteratorError3) {
              _context2.next = 40;
              break;
            }

            throw _iteratorError3;

          case 40:
            return _context2.finish(37);

          case 41:
            return _context2.finish(34);

          case 42:
            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context2.prev = 45;

            for (
            /*istanbul ignore next*/
            _iterator4 = G[Symbol.iterator]();
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion4 = true) {
              /*istanbul ignore next*/
              n = _step4.value;
              betweenness[
              /*istanbul ignore next*/
              "delete"](n);
            }

            _context2.next = 53;
            break;

          case 49:
            _context2.prev = 49;
            _context2.t2 = _context2["catch"](45);
            _didIteratorError4 = true;
            _iteratorError4 = _context2.t2;

          case 53:
            _context2.prev = 53;
            _context2.prev = 54;

            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }

          case 56:
            _context2.prev = 56;

            if (!_didIteratorError4) {
              _context2.next = 59;
              break;
            }

            throw _iteratorError4;

          case 59:
            return _context2.finish(56);

          case 60:
            return _context2.finish(53);

          case 61:
            return _context2.abrupt("return", rescaleE(betweenness, G.order(), normalized, G.isDirected()));

          case 62:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[7, 11, 15, 23], [16,, 18, 22], [26, 30, 34, 42], [35,, 37, 41], [45, 49, 53, 61], [54,, 56, 60]]);
  }));
  return _edgeBetweennessCentrality.apply(this, arguments);
}

function singleSourceShortestPathBasic(G, s) {
  var S = [];
  var P = new
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  Map(Object.values(G).map(function (v)
  /*istanbul ignore next*/
  {
    return (
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      tuple2)(v, [])
    );
  }));
  var sigma = new
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  Map(Object.values(G).map(function (v)
  /*istanbul ignore next*/
  {
    return (
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      tuple2)(v, 0)
    );
  }));
  var D = new
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  Map();
  sigma.set(s, 1);
  D.set(s, 0);
  var Q = [s];

  while (Q.length > 0) {
    // use BFS to find shortest paths
    var v = Q.shift();
    S.push(v);
    var Dv = D.get(v);
    var sigmav = sigma.get(v);
    /* eslint-disable no-loop-func */

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
    /* eslint-enable no-loop-func */
  }

  return [S, P, sigma];
}

function createTupleForValues(object, secondValue) {
  return Object.values(G).map(function (v)
  /*istanbul ignore next*/
  {
    return (
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      tuple2)(v, secondValue)
    );
  });
}

function singleSourceDijkstraPathBasic(G, s) {
  /*istanbul ignore next*/
  var weight = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'weight';
  // modified from Eppstein
  var S = [];
  var P = new
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  Map(createTupleForValues(G, []));
  var sigma = new
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  Map(createTupleForValues(G, 0));
  var D = new
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  Map();
  sigma.set(s, 1);
  var seen = new
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  Map([
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  tuple2)(s, 0)]); // use Q as heap with (distance,node id) tuples

  var Q = new
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  PriorityQueue();
  Q.enqueue(0, [s, s]);

  while (Q.size > 0) {
    /*istanbul ignore next*/
    var _Q$dequeue = Q.dequeue(),
        _Q$dequeue2 = _slicedToArray(_Q$dequeue, 2),
        dist = _Q$dequeue2[0],
        _Q$dequeue2$ = _slicedToArray(_Q$dequeue2[1], 2),
        pred = _Q$dequeue2$[0],
        v = _Q$dequeue2$[1];

    if (D.has(v)) {
      continue; // already searched this node.
    }

    sigma.set(v, sigma.get(v) + sigma.get(pred)); // count paths

    S.push(v);
    D.set(v, dist);

    /*istanbul ignore next*/
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (
      /*istanbul ignore next*/
      var _iterator = G.get(v)[Symbol.iterator](), _step;
      /*istanbul ignore next*/
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      /*istanbul ignore next*/
      _iteratorNormalCompletion = true) {
        /*istanbul ignore next*/
        var _step$value = _slicedToArray(_step.value, 2),
            w = _step$value[0],
            edgedata = _step$value[1];

        var vwDist = dist +
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        getDefault)(edgedata[weight], 1);

        if (!D.has(w) && (!seen.has(w) || vwDist < seen.get(w))) {
          seen.set(w, vwDist);
          Q.enqueue(vwDist, [v, w]);
          sigma.set(w, 0);
          P.set(w, [v]);
        } else if (vwDist === seen.get(w)) {
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

  return [S, P, sigma];
}

function accumulateBasic(betweenness, S, P, sigma, s) {
  var delta = new
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  Map(createTupleForValues(S, 0));

  while (S.length > 0) {
    var w = S.pop();
    var coeff = (1 + delta.get(w)) / sigma.get(w);
    /* eslint-disable no-loop-func */

    P.get(w).forEach(function (v) {
      delta.set(v, delta.get(v) + sigma.get(v) * coeff);
    });
    /* eslint-enable no-loop-func */
    // handle object nodes

    if (w !== s ||
    /*istanbul ignore next*/
    _typeof(w) === 'object' && w.toString() !== s.toString()) {
      betweenness.set(w, betweenness.get(w) + delta.get(w));
    }
  }

  return betweenness;
}

function accumulateEndpoints(betweenness, S, P, sigma, s) {
  betweenness.set(s, betweenness.get(s) + S.length - 1);
  var delta = new
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  Map(createTupleForValues(S, 0));

  while (S.length > 0) {
    var w = S.pop();
    var coeff = (1 + delta.get(w)) / sigma.get(w);
    /* eslint-disable no-loop-func */

    P.get(w).forEach(function (v) {
      delta.set(v, delta.get(v) + sigma.get(v) * coeff);
    });
    /* eslint-enable no-loop-func */
    // handle object nodes

    if (w !== s ||
    /*istanbul ignore next*/
    _typeof(w) === 'object' && w.toString() !== s.toString()) {
      betweenness.set(w, betweenness.get(w) + delta.get(w) + 1);
    }
  }

  return betweenness;
}

function accumulateEdges(betweenness, S, P, sigma, s) {
  var delta = new
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  Map(createTupleForValues(S, 0));

  while (S.length > 0) {
    var w = S.pop();
    var coeff = (1 + delta.get(w)) / sigma.get(w);
    /* eslint-disable no-loop-func */

    P.get(w).forEach(function (v) {
      var c = sigma.get(v) * coeff;
      var edge = [v, w];

      if (!betweenness.has(edge)) {
        edge = [w, v];
      }

      betweenness.set(edge, betweenness.get(edge) + c);
      delta.set(v, delta.get(v) + c);
    });
    /* eslint-enable no-loop-func */
    // handle object nodes

    if (w !== s ||
    /*istanbul ignore next*/
    _typeof(w) === 'object' && w.toString() !== s.toString()) {
      betweenness.set(w, betweenness.get(w) + delta.get(w));
    }
  }

  return betweenness;
}

function rescale(betweenness, n, optNormalized) {
  /*istanbul ignore next*/
  var optDirected = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

  /*istanbul ignore next*/
  var optK = arguments.length > 4 ? arguments[4] : undefined;
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

    betweenness.forEach(function (v, k)
    /*istanbul ignore next*/
    {
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
    betweenness.forEach(function (v, k)
    /*istanbul ignore next*/
    {
      return betweenness.set(k, v * scale);
    });
  }

  return betweenness;
}