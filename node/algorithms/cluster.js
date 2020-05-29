'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.triangles = triangles;
exports.averageClustering = averageClustering;
exports.clustering = clustering;
exports.transitivity = transitivity;
exports.squareClustering = squareClustering;

var
/*istanbul ignore next*/
_JSNetworkXError = _interopRequireDefault(require("../exceptions/JSNetworkXError"));

var
/*istanbul ignore next*/
_internals = require("../_internals");

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(trianglesAndDegreeIter),
    _marked2 = /*#__PURE__*/regeneratorRuntime.mark(weightedTrianglesAndDegreeIter);

/*istanbul ignore next*/ function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Compute the number of triangles.
 *
 * Finds the number of triangles that include a node as one vertex.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.completeGraph(5);
 * jsnx.triangles(G, 0);
 * // 6
 * jsnx.triangles(G);
 * Map {0: 6, 1: 6, 2: 6, 3: 6, 4: 6}
 * Array.from(jsnx.triangles(G, [0,1]).values());
 * // [6, 6]
 * ```
 *
 * ### Notes
 *
 * When computing triangles for the entire graph each triangle is counted
 * three times, once at each node.  Self loops are ignored.
 *
 * @param {Graph} G A JSnetworkX graph
 * @param {Iterable=} optNodes (default: all nodes)
 *      Compute triangles for nodes in this container.
 *
 * @return {!(Map|number)} Number of triangles keyed by node label.
 */
function triangles(_x, _x2) {
  return _triangles.apply(this, arguments);
}
/**
 * Return an iterator of (node, degree, triangles).
 *
 * This double counts triangles so you may want to divide by 2.
 * See `degree()` and `triangles()` for definitions and details.
 *
 * @param {Graph} G A jsnetworkx graph
 * @param {Iterable=} optNodes (default: all nodes)
 *      Compute triangles for nodes in this container.
 *
 * @return {!Iterator<Array>}
 */


/*istanbul ignore next*/
function _triangles() {
  _triangles = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee(G, optNodes)
  /*istanbul ignore next*/
  {
    return regeneratorRuntime.wrap(function _callee$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!G.isDirected()) {
              _context3.next = 2;
              break;
            }

            throw new
            /*istanbul ignore next*/
            _JSNetworkXError[
            /*istanbul ignore next*/
            "default"]('triangles() is not defined for directed graphs.');

          case 2:
            if (!(optNodes != null && G.hasNode(optNodes))) {
              _context3.next = 4;
              break;
            }

            return _context3.abrupt("return", Math.floor(
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            next)(trianglesAndDegreeIter(G, optNodes))[2] / 2));

          case 4:
            return _context3.abrupt("return", new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map(
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            mapIterator)(trianglesAndDegreeIter(G, optNodes),
            /* eslint-disable no-unused-vars */
            function (
            /*istanbul ignore next*/
            _ref3)
            /*istanbul ignore next*/
            {
              var _ref4 = _slicedToArray(_ref3, 3),
                  v = _ref4[0],
                  _ = _ref4[1],
                  triangles = _ref4[2];

              return (
                /*istanbul ignore next*/
                (0,
                /*istanbul ignore next*/
                _internals.
                /*istanbul ignore next*/
                tuple2)(v, Math.floor(triangles / 2), v)
              );
            }
            /* eslint-enable no-unused-vars */
            )));

          case 5:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee);
  }));
  return _triangles.apply(this, arguments);
}

function trianglesAndDegreeIter(G, optNodes)
/*istanbul ignore next*/
{
  var nodesNbrs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, v, vNbrs, vset, ntriangles, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, w, wset;

  return regeneratorRuntime.wrap(function trianglesAndDegreeIter$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!G.isMultigraph()) {
            _context.next = 2;
            break;
          }

          throw new
          /*istanbul ignore next*/
          _JSNetworkXError[
          /*istanbul ignore next*/
          "default"]('Not defined for multigraphs.');

        case 2:
          nodesNbrs =
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          mapIterator)(optNodes == null ? G : G.nbunchIter(optNodes), function (n)
          /*istanbul ignore next*/
          {
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              tuple2)(n, G.get(n))
            );
          });
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 6;
          _iterator = nodesNbrs[Symbol.iterator]();

        case 8:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 37;
            break;
          }

          _step$value = _slicedToArray(_step.value, 2), v = _step$value[0], vNbrs = _step$value[1];
          vset = new
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          Set(vNbrs.keys());
          vset[
          /*istanbul ignore next*/
          "delete"](v);
          ntriangles = 0;
          _iteratorNormalCompletion2 = true;
          _didIteratorError2 = false;
          _iteratorError2 = undefined;
          _context.prev = 16;

          for (
          /*istanbul ignore next*/
          _iterator2 = vset[Symbol.iterator]();
          /*istanbul ignore next*/
          !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
          /*istanbul ignore next*/
          _iteratorNormalCompletion2 = true) {
            /*istanbul ignore next*/
            w = _step2.value;

            /*istanbul ignore next*/
            wset = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Set(G.get(w).keys());
            wset[
            /*istanbul ignore next*/
            "delete"](w);
            ntriangles += vset.intersection(wset).size;
          }

          _context.next = 24;
          break;

        case 20:
          _context.prev = 20;
          _context.t0 = _context["catch"](16);
          _didIteratorError2 = true;
          _iteratorError2 = _context.t0;

        case 24:
          _context.prev = 24;
          _context.prev = 25;

          if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
            _iterator2["return"]();
          }

        case 27:
          _context.prev = 27;

          if (!_didIteratorError2) {
            _context.next = 30;
            break;
          }

          throw _iteratorError2;

        case 30:
          return _context.finish(27);

        case 31:
          return _context.finish(24);

        case 32:
          _context.next = 34;
          return (
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            tuple3)(v, vset.size, ntriangles)
          );

        case 34:
          _iteratorNormalCompletion = true;
          _context.next = 8;
          break;

        case 37:
          _context.next = 43;
          break;

        case 39:
          _context.prev = 39;
          _context.t1 = _context["catch"](6);
          _didIteratorError = true;
          _iteratorError = _context.t1;

        case 43:
          _context.prev = 43;
          _context.prev = 44;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 46:
          _context.prev = 46;

          if (!_didIteratorError) {
            _context.next = 49;
            break;
          }

          throw _iteratorError;

        case 49:
          return _context.finish(46);

        case 50:
          return _context.finish(43);

        case 51:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[6, 39, 43, 51], [16, 20, 24, 32], [25,, 27, 31], [44,, 46, 50]]);
}
/**
 * Return an iterator of `(node, degree, weightedTriangles)`.
 *
 * Used for weighted clustering.
 *
 * @param {Graph} G A JSnetworkX graph
 * @param {Iterable=} optNodes (default: all nodes)
 *      Compute triangles for nodes in this container.
 * @param {string=} opt_weight (default: 'weight')
 *      The name of edge weight attribute.
 *
 * @return {Iterator<Array>}
 */


function weightedTrianglesAndDegreeIter(G, optNodes)
/*istanbul ignore next*/
{
  var optWeight,
      maxWeight,
      nodesNbrs,
      _iteratorNormalCompletion3,
      _didIteratorError3,
      _iteratorError3,
      _iterator3,
      _step3,
      _step3$value,
      i,
      nbrs,
      inbrs,
      weightedTriangles,
      seen,
      _iteratorNormalCompletion4,
      _didIteratorError4,
      _iteratorError4,
      _iterator4,
      _step4,
      j,
      weightij,
      jnbrs,
      _iteratorNormalCompletion5,
      _didIteratorError5,
      _iteratorError5,
      _iterator5,
      _step5,
      k,
      weightjk,
      weightki,
      _args2 = arguments;

  return regeneratorRuntime.wrap(function weightedTrianglesAndDegreeIter$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          optWeight = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : 'weight';

          if (!G.isMultigraph()) {
            _context2.next = 3;
            break;
          }

          throw new
          /*istanbul ignore next*/
          _JSNetworkXError[
          /*istanbul ignore next*/
          "default"]('Not defined for multigraphs.');

        case 3:
          maxWeight = optWeight == null || G.edges().length === 0 ? 1 :
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          max)(
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          mapIterator)(G.edgesIter(true),
          /* eslint-disable no-unused-vars */
          function (
          /*istanbul ignore next*/
          _ref)
          /*istanbul ignore next*/
          {
            var _ref2 = _slicedToArray(_ref, 3),
                u = _ref2[0],
                v = _ref2[1],
                data = _ref2[2];

            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              getDefault)(data[optWeight], 1)
            );
          }
          /* eslint-enable no-unused-vars */
          ));
          nodesNbrs =
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          mapIterator)(optNodes == null ? G : G.nbunchIter(optNodes), function (n)
          /*istanbul ignore next*/
          {
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              tuple2)(n, G.get(n))
            );
          });
          _iteratorNormalCompletion3 = true;
          _didIteratorError3 = false;
          _iteratorError3 = undefined;
          _context2.prev = 8;
          _iterator3 = nodesNbrs[Symbol.iterator]();

        case 10:
          if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
            _context2.next = 66;
            break;
          }

          _step3$value = _slicedToArray(_step3.value, 2), i = _step3$value[0], nbrs = _step3$value[1];
          inbrs = new
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          Set(nbrs.keys()).difference([i]);
          weightedTriangles = 0;
          seen = new
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          Set();
          _iteratorNormalCompletion4 = true;
          _didIteratorError4 = false;
          _iteratorError4 = undefined;
          _context2.prev = 18;
          _iterator4 = inbrs[Symbol.iterator]();

        case 20:
          if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
            _context2.next = 47;
            break;
          }

          j = _step4.value;
          weightij =
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          getDefault)(nbrs.get(j)[optWeight], 1) / maxWeight;
          seen.add(j);
          jnbrs = new
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          Set(G.get(j).keys()).difference(seen);
          _iteratorNormalCompletion5 = true;
          _didIteratorError5 = false;
          _iteratorError5 = undefined;
          _context2.prev = 28;

          for (
          /*istanbul ignore next*/
          _iterator5 = inbrs.intersection(jnbrs)[Symbol.iterator]();
          /*istanbul ignore next*/
          !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done);
          /*istanbul ignore next*/
          _iteratorNormalCompletion5 = true) {
            /*istanbul ignore next*/
            k = _step5.value;

            /*istanbul ignore next*/
            weightjk =
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            getDefault)(G.get(j).get(k)[optWeight], 1) / maxWeight;

            /*istanbul ignore next*/
            weightki =
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            getDefault)(nbrs.get(k)[optWeight], 1) / maxWeight;
            weightedTriangles += Math.pow(weightij * weightjk * weightki, 1 / 3);
          }

          _context2.next = 36;
          break;

        case 32:
          _context2.prev = 32;
          _context2.t0 = _context2["catch"](28);
          _didIteratorError5 = true;
          _iteratorError5 = _context2.t0;

        case 36:
          _context2.prev = 36;
          _context2.prev = 37;

          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }

        case 39:
          _context2.prev = 39;

          if (!_didIteratorError5) {
            _context2.next = 42;
            break;
          }

          throw _iteratorError5;

        case 42:
          return _context2.finish(39);

        case 43:
          return _context2.finish(36);

        case 44:
          _iteratorNormalCompletion4 = true;
          _context2.next = 20;
          break;

        case 47:
          _context2.next = 53;
          break;

        case 49:
          _context2.prev = 49;
          _context2.t1 = _context2["catch"](18);
          _didIteratorError4 = true;
          _iteratorError4 = _context2.t1;

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
          _context2.next = 63;
          return (
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            tuple3)(i, inbrs.size, weightedTriangles * 2)
          );

        case 63:
          _iteratorNormalCompletion3 = true;
          _context2.next = 10;
          break;

        case 66:
          _context2.next = 72;
          break;

        case 68:
          _context2.prev = 68;
          _context2.t2 = _context2["catch"](8);
          _didIteratorError3 = true;
          _iteratorError3 = _context2.t2;

        case 72:
          _context2.prev = 72;
          _context2.prev = 73;

          if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
            _iterator3["return"]();
          }

        case 75:
          _context2.prev = 75;

          if (!_didIteratorError3) {
            _context2.next = 78;
            break;
          }

          throw _iteratorError3;

        case 78:
          return _context2.finish(75);

        case 79:
          return _context2.finish(72);

        case 80:
        case "end":
          return _context2.stop();
      }
    }
  }, _marked2, null, [[8, 68, 72, 80], [18, 49, 53, 61], [28, 32, 36, 44], [37,, 39, 43], [54,, 56, 60], [73,, 75, 79]]);
}
/**
 * Compute the average clustering coefficient for the graph G.
 *
 * The clustering coefficient for the graph is the average,
 *
 * ```math
 * C = \frac{1}{n}\sum_{v \in G} c_v
 * ```
 *
 * where `$n$` is the number of nodes in `$G$`.
 *
 * ### Example
 *
 * ```
 * var G = jsnx.completeGraph(5);
 * jsnx.averageClustering(G);
 * // 1
 * ```
 *
 * ### Notes
 *
 * Self loops are ignored.
 *
 *
 * ### References
 *
 * [1] [Generalizations of the clustering coefficient to weighted
 *     complex networks by J. Saramäki, M. Kivelä, J.-P. Onnela,
 *     K. Kaski, and J. Kertész, Physical Review E, 75 027105 (2007).][1]
 * [1]: http://jponnela.com/web_documents/a9.pdf
 * [2] [Marcus Kaiser,  Mean clustering coefficients: the role of isolated
 *     nodes and leafs on clustering measures for small-world networks.][2]
 * [2]:http://arxiv.org/abs/0802.2512
 *
 * @param {Graph} G graph
 * @param {?Iterable} optNodes (default: all nodes)
 *    Compute average clustering for nodes in this container.
 * @param {?string=} optWeight (default: null)
 *    The edge attribute that holds the numerical value used as a weight.
 *    If `null`, then each edge has weight `1`.
 * @param {?boolean=} optCountZeros
 *    If `false` include only the nodes with nonzero clustering in the average.
 * @return {number}
 */


/*istanbul ignore next*/
function averageClustering(_x3, _x4, _x5) {
  return _averageClustering.apply(this, arguments);
}
/**
 * Compute the clustering coefficient for nodes.
 *
 * For unweighted graphs the clustering of each node `$u$`
 * is the fraction of possible triangles through that node that exist,
 *
 * ```math
 * c_u = \frac{2 T(u)}{deg(u)(deg(u)-1)}
 * ```
 *
 * where `$T(u)$` is the number of triangles through node `$u$` and `$deg(u)$`
 * is the degree of `$u$`.
 *
 * For weighted graphs the clustering is defined as the geometric average of
 * the subgraph edge weights,
 *
 * ```math
 * c_u = \frac{1}{deg(u)(deg(u)-1)}
 *       \sum_{uv} (\hat{w}_{uv} \hat{w}_{uw} \hat{w}_{vw})^{1/3}
 * ```
 *
 * The edge weights `$\hat{w}_{uv}$` are normalized by the maximum weight in the
 * network `$\hat{w}_{uv} = w_{uv}/\max(2)$`.
 *
 * The value `$c_u$` is assigned to `$0$` if `$deg(u) < 2$`.
 *
 * ### Example
 *
 * ```
 * var G = jsnx.completeGraph(5);
 * jsnx.clustering(G, 0);
 * // 1
 * jsnx.clustering(G);
 * // Map {0: 1, 1: 1, 2: 1, 3: 1, 4: 1}
 * ```
 *
 * @param {Graph} G graph
 * @param {?Iterable=} optNodes (default: all nodes)
 *      Compute average clustering for nodes in this container.
 * @param {?string=} optWeight (default: null)
 *  If the edge attribute that holds the numerical value used as a weight.
 *  If `null`, then each edge has weight `1`.
 *
 * @return {!(number|Map)} Clustering coefficient at specified nodes
 */


/*istanbul ignore next*/
function _averageClustering() {
  _averageClustering = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee2(G, optNodes, optWeight)
  /*istanbul ignore next*/
  {
    var optCountZeros,
        clusters,
        _args4 = arguments;
    return regeneratorRuntime.wrap(function _callee2$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            optCountZeros = _args4.length > 3 && _args4[3] !== undefined ? _args4[3] : true;
            _context4.t0 = Array;
            _context4.next = 4;
            return clustering(G, optNodes, optWeight).values();

          case 4:
            _context4.t1 = _context4.sent;
            clusters = _context4.t0.from.call(_context4.t0, _context4.t1);

            if (!optCountZeros) {
              clusters = clusters.filter(function (v)
              /*istanbul ignore next*/
              {
                return v > 0;
              });
            }

            return _context4.abrupt("return", clusters.reduce(function (s, x)
            /*istanbul ignore next*/
            {
              return s + x;
            }, 0) / clusters.length);

          case 8:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee2);
  }));
  return _averageClustering.apply(this, arguments);
}

/*istanbul ignore next*/
function clustering(_x6, _x7, _x8) {
  return _clustering.apply(this, arguments);
}
/**
 * Compute graph transitivity, the fraction of all possible triangles
 * present in G.
 *
 * Possible triangles are identified by the number of "triads"
 * (two edges with a shared vertex).
 *
 * The transitivity is
 *
 * ```math
 * T = 3\frac{\#triangles}{\#triads}
 * ```
 *
 * ### Example
 *
 * ```
 * var G = jsnx.completeGraph(5);
 * jsnx.transitivity(G);
 * // 1
 * ```
 *
 * @param {Graph} G graph
 * @return {number} Transitivity
 */


/*istanbul ignore next*/
function _clustering() {
  _clustering = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee3(G, optNodes, optWeight)
  /*istanbul ignore next*/
  {
    var trianglesIter, clusters;
    return regeneratorRuntime.wrap(function _callee3$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!G.isDirected()) {
              _context5.next = 2;
              break;
            }

            throw new
            /*istanbul ignore next*/
            _JSNetworkXError[
            /*istanbul ignore next*/
            "default"]('Clustering algorithms are not defined for directed graphs.');

          case 2:
            trianglesIter = optWeight == null ? trianglesAndDegreeIter(G, optNodes) : weightedTrianglesAndDegreeIter(G, optNodes, optWeight);
            clusters = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map(
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            mapIterator)(trianglesIter, function (
            /*istanbul ignore next*/
            _ref5) {
              /*istanbul ignore next*/
              var _ref6 = _slicedToArray(_ref5, 3),
                  node = _ref6[0],
                  degree = _ref6[1],
                  triangles = _ref6[2];

              return (
                /*istanbul ignore next*/
                (0,
                /*istanbul ignore next*/
                _internals.
                /*istanbul ignore next*/
                tuple2)(node, triangles === 0 ? 0 : triangles / (degree * (degree - 1)))
              );
            }));
            return _context5.abrupt("return", G.hasNode(optNodes) ?
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            next)(clusters.values()) : clusters);

          case 5:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee3);
  }));
  return _clustering.apply(this, arguments);
}

/*istanbul ignore next*/
function transitivity(_x9) {
  return _transitivity.apply(this, arguments);
}
/**
 * Compute the squares clustering coefficient for nodes.
 *
 * For each node return the faction of possible squares that exist at the node
 *
 * ```math
 * C_4(v) = \frac{ \sum_{u=1}^{k_v}
 * \sum_{w=u+1}^{k_v} q_v(u,w) }{ \sum_{u=1}^{k_v}
 * \sum_{w=u+1}^{k_v} [a_v(u,w) + q_v(u,w)]}
 * ```
 *
 * where `$q_v(u,w)$` are the number of common neighbors of `$u$` and `$v$`
 * other than `$v$` (i.e. squares), and
 * `$a_v(u,w) = (k_u-(1+q_v(u,w)+\theta_{uv}))(k_w-(1+q_v(u,w)+\theta_{uw}))$`
 * where `$\theta_{uw} = 1$` if `$u$` and `$w$` are  connected and `$0$`
 * otherwise.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.completeGraph(5);
 * jsnx.squareClustering(G, 0);
 * // 1
 * jsnx.squareClustering(G);
 * // Map {0: 1, 1: 1, 2: 1, 3: 1, 4: 1}
 * ```
 *
 * ### Notes
 *
 * While `$C_3(v)$` (triangle clustering) gives the probability that
 * two neighbors of node `$v$` are connected with each other, `$C_4(v)$` is
 * the probability that two neighbors of node `$v$` share a common
 * neighbor different from `$v$`. This algorithm can be applied to both
 * bipartite and unipartite networks.
 *
 * @param {Graph} G graph
 * @param {Iterable=} opt_nodes (default: all)
 *   Compute clustering for nodes in this container.
 *
 * @return {!(Map|number)}
 *      A dictionary keyed by node with the square clustering coefficient value.
 */


/*istanbul ignore next*/
function _transitivity() {
  _transitivity = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee4(G)
  /*istanbul ignore next*/
  {
    var triangles, triples, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, _step6$value, node, degree, triangles_;

    return regeneratorRuntime.wrap(function _callee4$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            /* eslint-disable no-shadow */
            triangles = 0; // 6 times number of triangles

            /* eslint-enable no-shadow */

            triples = 0; // 2 times number of connected triples

            /* eslint-disable no-unused-vars */

            _iteratorNormalCompletion6 = true;
            _didIteratorError6 = false;
            _iteratorError6 = undefined;
            _context6.prev = 5;

            for (
            /*istanbul ignore next*/
            _iterator6 = trianglesAndDegreeIter(G)[Symbol.iterator]();
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion6 = true) {
              /*istanbul ignore next*/
              _step6$value = _slicedToArray(_step6.value, 3), node = _step6$value[0], degree = _step6$value[1], triangles_ = _step6$value[2];

              /* eslint-enable no-unused-vars */
              triples += degree * (degree - 1);
              triangles += triangles_;
            }

            _context6.next = 13;
            break;

          case 9:
            _context6.prev = 9;
            _context6.t0 = _context6["catch"](5);
            _didIteratorError6 = true;
            _iteratorError6 = _context6.t0;

          case 13:
            _context6.prev = 13;
            _context6.prev = 14;

            if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
              _iterator6["return"]();
            }

          case 16:
            _context6.prev = 16;

            if (!_didIteratorError6) {
              _context6.next = 19;
              break;
            }

            throw _iteratorError6;

          case 19:
            return _context6.finish(16);

          case 20:
            return _context6.finish(13);

          case 21:
            return _context6.abrupt("return", triangles === 0 ? 0 : triangles / triples);

          case 22:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee4, null, [[5, 9, 13, 21], [14,, 16, 20]]);
  }));
  return _transitivity.apply(this, arguments);
}

/*istanbul ignore next*/
function squareClustering(_x10, _x11) {
  return _squareClustering.apply(this, arguments);
}

/*istanbul ignore next*/
function _squareClustering() {
  _squareClustering = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee5(G, optNodes)
  /*istanbul ignore next*/
  {
    var nodesIter, clustering, _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, v, potential, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, _step8$value, u, w, squares, degm;

    return regeneratorRuntime.wrap(function _callee5$(_context7) {
      while (1) {
        switch (_context7.prev = _context7.next) {
          case 0:
            nodesIter = optNodes == null ? G : G.nbunchIter(optNodes);
            clustering = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map(); // eslint-disable-line no-shadow

            _iteratorNormalCompletion7 = true;
            _didIteratorError7 = false;
            _iteratorError7 = undefined;
            _context7.prev = 5;
            _iterator7 = nodesIter[Symbol.iterator]();

          case 7:
            if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
              _context7.next = 34;
              break;
            }

            v = _step7.value;
            clustering.set(v, 0);
            potential = 0;
            _iteratorNormalCompletion8 = true;
            _didIteratorError8 = false;
            _iteratorError8 = undefined;
            _context7.prev = 14;

            for (
            /*istanbul ignore next*/
            _iterator8 =
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            genCombinations)(G.get(v).keys(), 2)[Symbol.iterator]();
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion8 = true) {
              /*istanbul ignore next*/
              _step8$value = _slicedToArray(_step8.value, 2), u = _step8$value[0], w = _step8$value[1];

              /*istanbul ignore next*/
              squares = new
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              Set(G.get(u).keys()).intersection(new
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              Set(G.get(w).keys()));
              squares[
              /*istanbul ignore next*/
              "delete"](v);
              squares = squares.size;
              clustering.set(v, clustering.get(v) + squares);

              /*istanbul ignore next*/
              degm = squares + 1;

              if (G.get(u).has(w)) {
                degm += 1;
              }

              potential += (G.get(u).size - degm) * (G.get(w).size - degm) + squares;
            }

            _context7.next = 22;
            break;

          case 18:
            _context7.prev = 18;
            _context7.t0 = _context7["catch"](14);
            _didIteratorError8 = true;
            _iteratorError8 = _context7.t0;

          case 22:
            _context7.prev = 22;
            _context7.prev = 23;

            if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
              _iterator8["return"]();
            }

          case 25:
            _context7.prev = 25;

            if (!_didIteratorError8) {
              _context7.next = 28;
              break;
            }

            throw _iteratorError8;

          case 28:
            return _context7.finish(25);

          case 29:
            return _context7.finish(22);

          case 30:
            if (potential > 0) {
              clustering.set(v, clustering.get(v) / potential);
            }

          case 31:
            _iteratorNormalCompletion7 = true;
            _context7.next = 7;
            break;

          case 34:
            _context7.next = 40;
            break;

          case 36:
            _context7.prev = 36;
            _context7.t1 = _context7["catch"](5);
            _didIteratorError7 = true;
            _iteratorError7 = _context7.t1;

          case 40:
            _context7.prev = 40;
            _context7.prev = 41;

            if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
              _iterator7["return"]();
            }

          case 43:
            _context7.prev = 43;

            if (!_didIteratorError7) {
              _context7.next = 46;
              break;
            }

            throw _iteratorError7;

          case 46:
            return _context7.finish(43);

          case 47:
            return _context7.finish(40);

          case 48:
            if (!G.hasNode(optNodes)) {
              _context7.next = 50;
              break;
            }

            return _context7.abrupt("return",
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            next)(clustering.values()));

          case 50:
            return _context7.abrupt("return", clustering);

          case 51:
          case "end":
            return _context7.stop();
        }
      }
    }, _callee5, null, [[5, 36, 40, 48], [14, 18, 22, 30], [23,, 25, 29], [41,, 43, 47]]);
  }));
  return _squareClustering.apply(this, arguments);
}