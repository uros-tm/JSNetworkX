'use strict';

/*istanbul ignore next*/ function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.union = union;
exports.disjointUnion = disjointUnion;
exports.intersection = intersection;
exports.difference = difference;
exports.symmetricDifference = symmetricDifference;
exports.compose = compose;

var
/*istanbul ignore next*/
_JSNetworkXError = _interopRequireDefault(require("../../exceptions/JSNetworkXError"));

var
/*istanbul ignore next*/
_relabel = require("../../relabel");

var
/*istanbul ignore next*/
_functions = require("../../classes/functions");

var
/*istanbul ignore next*/
_Set = _interopRequireWildcard(require("../../_internals/Set"));

var
/*istanbul ignore next*/
_internals = require("../../_internals");

/*istanbul ignore next*/ function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function assertSameNodes(G, H) {
  var Hnodes = new
  /*istanbul ignore next*/
  _Set[
  /*istanbul ignore next*/
  "default"](H);
  var Gnodes = new
  /*istanbul ignore next*/
  _Set[
  /*istanbul ignore next*/
  "default"](G);

  if (Hnodes.size !== Gnodes.size ||
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  someIterator)(Gnodes.values(), function (v)
  /*istanbul ignore next*/
  {
    return !Hnodes.has(v);
  })) {
    throw new
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]('Node sets of graphs are not equal.');
  }
}
/**
 * Return the union of graphs `G` and `H`.
 *
 * Graphs `G` and `H` must be disjoint, otherwise an exception is raised.
 *
 * ### Notes
 *
 * To force a disjoint union with node relabeling, use `disjointUnion(G, H)` or
 * `convertNodeLabelsToIntegers()`.
 *
 * Graph, edge and node attributes are propagated from `G` and `H` to the union
 * Graph. If a graph attribute is present in both `G` and `H`, the value from
 * `H` is used.
 *
 * @see #disjointUnion
 *
 * @param {Graph} G
 * @param {Graph} H
 * @param {{rename: ?Array}} optParameters
 *   - rename: Node names `G` and `H` can be changed by specifying the tuple
 *     `['G-', 'H-']` (for example). Node `'u'` in `G` is then renamed to
 *     `'G-u'` and `'v'` in `H` is renamed to `'H-v'`.
 * @return {Graph} A union graph with the same type as G
 */


/*istanbul ignore next*/
function union(_x, _x2) {
  return _union.apply(this, arguments);
}
/**
 * Return the disjoint union of graphs `G` and `H`.
 *
 * This algorithm forces distinct integer node labels.
 *
 * ### Notes
 *
 * A new graph is created, of the same class as `G`.  It is recommended that `G`
 * and `H` be either both directed or both undirected.
 *
 * The nodes of `G` are relabeled `0` to `numberOfNodes(G) - 1`, and the nodes
 * of `H` are relabeled `numberOfNodes(G)` to
 * `numberOfNodes(G) + numberOfNodes(H) - 1`.
 *
 * Graph, edge, and node attributes are propagated from `G` and `H` to the union
 * graph. If a graph attribute is present in both `G` and `H` the value from `H`
 * is used.
 *
 * @param {Graph} G
 * @param {Graph} H
 * @return {Graph} A union graph with the same type as G.
 */


/*istanbul ignore next*/
function _union() {
  _union = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee(G, H)
  /*istanbul ignore next*/
  {
    var _ref,
        _ref$rename,
        rename,
        R,
        addPrefix,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            addPrefix = function _addPrefix(graph, prefix) {
              if (!prefix) {
                return graph;
              }

              return (
                /*istanbul ignore next*/
                (0,
                /*istanbul ignore next*/
                _relabel.
                /*istanbul ignore next*/
                relabelNodes)(graph, function (n)
                /*istanbul ignore next*/
                {
                  return prefix + n.toString();
                })
              );
            };

            _ref = _args.length > 2 && _args[2] !== undefined ? _args[2] : {}, _ref$rename = _ref.rename, rename = _ref$rename === void 0 ? [null, null] : _ref$rename;

            if (!(G.isMultigraph() !== H.isMultigraph())) {
              _context.next = 4;
              break;
            }

            throw new
            /*istanbul ignore next*/
            _JSNetworkXError[
            /*istanbul ignore next*/
            "default"]('G and H must both be graphs or multigraphs');

          case 4:
            // Union is same type as G
            R = new G.constructor();
            R.name =
            /*istanbul ignore next*/
            "union(".concat(G.name, ", ").concat(H.name, ")"); // rename graph to obtain disjoint node labels

            G = addPrefix(G, rename[0]);
            H = addPrefix(H, rename[1]);

            if (!(new
            /*istanbul ignore next*/
            _Set[
            /*istanbul ignore next*/
            "default"](G).intersection(new
            /*istanbul ignore next*/
            _Set[
            /*istanbul ignore next*/
            "default"](H)).size > 0)) {
              _context.next = 10;
              break;
            }

            throw new
            /*istanbul ignore next*/
            _JSNetworkXError[
            /*istanbul ignore next*/
            "default"]('The node sets of G and H are not disjoint. Use appropriate ' + '{rename: [Gprefix, Hprefix]} or use disjointUnion({G, H})');

          case 10:
            // add nodes
            R.addNodesFrom(G.nodesIter(true));
            R.addNodesFrom(H.nodesIter(true)); // add edges

            R.addEdgesFrom(G.isMultigraph() ? G.edgesIter(true, true) : G.edgesIter(true));
            R.addEdgesFrom(H.isMultigraph() ? H.edgesIter(true, true) : H.edgesIter(true)); // add graph attributes

            Object.assign(R.graph, G.graph, H.graph);
            return _context.abrupt("return", R);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _union.apply(this, arguments);
}

/*istanbul ignore next*/
function disjointUnion(_x3, _x4) {
  return _disjointUnion.apply(this, arguments);
}
/**
 * Return a new graph that contains only edges that exist in both `G` and `H`.
 *
 * The node set of `H` and `G` must be the same.
 *
 * ### Notes
 *
 * Attributes from the graph, nodes and edges are not copied to the new graph.
 * If you want a new graph of the intersection of `G` and `H` with the
 * attributes, (including edge data) from `G` use `removeNode()` as follows
 *
 * ```
 * var G = jsnx.pathGraph(3);
 * var H = jsnx.pathGraph(5);
 * var R = G.copy();
 * for (var n of G) {
 *   if (!H.hasNode(n)) {
 *     R.removeNode(n);
 *   }
 * }
 * ```
 *
 * @param {Graph} G
 * @param {Graph} H
 * @return {Graph} A new graph with the same types as G
 */


/*istanbul ignore next*/
function _disjointUnion() {
  _disjointUnion = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee2(G, H)
  /*istanbul ignore next*/
  {
    var R1, R2, R;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            R1 =
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _relabel.
            /*istanbul ignore next*/
            convertNodeLabelsToIntegers)(G);
            R2 =
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _relabel.
            /*istanbul ignore next*/
            convertNodeLabelsToIntegers)(H, R1.order());
            R = union(R1, R2);
            R.name =
            /*istanbul ignore next*/
            "disjointUnion(".concat(G.name, ", ").concat(H.name, ")");
            Object.assign(R.graph, G.graph, H.graph);
            return _context2.abrupt("return", R);

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _disjointUnion.apply(this, arguments);
}

/*istanbul ignore next*/
function intersection(_x5, _x6) {
  return _intersection.apply(this, arguments);
}
/**
 * Return a new graph that contains the edges that exist in `G` but not in `H`.
 *
 * The node sets of `H` and `G` must be the same.
 *
 * ### Notes
 *
 * Attributes from the graph, nodes and edges are not copied to the new graph.
 * If you want a new graph of the difference of `G` and `H` with the attributes
 * (including edge data) from `G`, use `removeNodes()` as follows:
 *
 * ```
 * var G = jsnx.pathGraph(3);
 * var H = jsnx.pathGraph(5);
 * var R = G.copy();
 * for (var n of G) {
 *   if (!H.hasNode(n)) {
 *     R.removeNode(n);
 *   }
 * }
 * ```
 *
 * @param {Graph} G
 * @param {Graph} H
 * @return {Graph} A new graph with the same types as G
 */


/*istanbul ignore next*/
function _intersection() {
  _intersection = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee3(G, H)
  /*istanbul ignore next*/
  {
    var R, graph, otherGraph, edges, hasEdge, addEdge, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, e;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(G.isMultigraph() !== H.isMultigraph())) {
              _context3.next = 2;
              break;
            }

            throw new
            /*istanbul ignore next*/
            _JSNetworkXError[
            /*istanbul ignore next*/
            "default"]('G and H must both be graphs or multigraphs');

          case 2:
            // create new graph
            R =
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _functions.
            /*istanbul ignore next*/
            createEmptyCopy)(G);
            R.name =
            /*istanbul ignore next*/
            "Intersection of (".concat(G.name, " and ").concat(H.name, ")");
            assertSameNodes(G, H);
            graph = G.numberOfEdges() < H.numberOfEdges() ? G : H;
            otherGraph = graph === G ? H : G;
            edges = graph.isMultigraph() ? graph.edgesIter(false, true) : graph.edgesIter();
            hasEdge = otherGraph.hasEdge;
            addEdge = R.addEdge;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context3.prev = 13;

            for (
            /*istanbul ignore next*/
            _iterator = edges[Symbol.iterator]();
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion = true) {
              /*istanbul ignore next*/
              e = _step.value;

              if (hasEdge.apply(otherGraph, e)) {
                addEdge.apply(R, e);
              }
            }

            _context3.next = 21;
            break;

          case 17:
            _context3.prev = 17;
            _context3.t0 = _context3["catch"](13);
            _didIteratorError = true;
            _iteratorError = _context3.t0;

          case 21:
            _context3.prev = 21;
            _context3.prev = 22;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 24:
            _context3.prev = 24;

            if (!_didIteratorError) {
              _context3.next = 27;
              break;
            }

            throw _iteratorError;

          case 27:
            return _context3.finish(24);

          case 28:
            return _context3.finish(21);

          case 29:
            return _context3.abrupt("return", R);

          case 30:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[13, 17, 21, 29], [22,, 24, 28]]);
  }));
  return _intersection.apply(this, arguments);
}

/*istanbul ignore next*/
function difference(_x7, _x8) {
  return _difference.apply(this, arguments);
}
/**
 * Return new graph with edges that exit in either `G` or `H` but not both.
 *
 * The node sets of `H` and `G` must be the same.
 *
 * ### Notes
 *
 * Attributes from the graph, nodes and edges are not copied to the new graph.
 *
 * @param {Graph} G
 * @param {Graph} H
 * @return {Graph} A new graph with the same types as G
 */


/*istanbul ignore next*/
function _difference() {
  _difference = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee4(G, H)
  /*istanbul ignore next*/
  {
    var R, edges, hasEdge, addEdge, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, e;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            if (!(G.isMultigraph() !== H.isMultigraph())) {
              _context4.next = 2;
              break;
            }

            throw new
            /*istanbul ignore next*/
            _JSNetworkXError[
            /*istanbul ignore next*/
            "default"]('G and H must both be graphs or multigraphs');

          case 2:
            // create new graph
            R =
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _functions.
            /*istanbul ignore next*/
            createEmptyCopy)(G);
            G.name =
            /*istanbul ignore next*/
            "Difference of (".concat(G.name, " and ").concat(H.name, ")");
            assertSameNodes(G, H);
            edges = G.isMultigraph() ? G.edgesIter(false, true) : G.edgesIter();
            hasEdge = H.hasEdge;
            addEdge = R.addEdge;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context4.prev = 11;

            for (
            /*istanbul ignore next*/
            _iterator2 = edges[Symbol.iterator]();
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion2 = true) {
              /*istanbul ignore next*/
              e = _step2.value;

              if (!hasEdge.apply(H, e)) {
                addEdge.apply(R, e);
              }
            }

            _context4.next = 19;
            break;

          case 15:
            _context4.prev = 15;
            _context4.t0 = _context4["catch"](11);
            _didIteratorError2 = true;
            _iteratorError2 = _context4.t0;

          case 19:
            _context4.prev = 19;
            _context4.prev = 20;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 22:
            _context4.prev = 22;

            if (!_didIteratorError2) {
              _context4.next = 25;
              break;
            }

            throw _iteratorError2;

          case 25:
            return _context4.finish(22);

          case 26:
            return _context4.finish(19);

          case 27:
            return _context4.abrupt("return", R);

          case 28:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[11, 15, 19, 27], [20,, 22, 26]]);
  }));
  return _difference.apply(this, arguments);
}

/*istanbul ignore next*/
function symmetricDifference(_x9, _x10) {
  return _symmetricDifference.apply(this, arguments);
}
/**
 * Return a new graph of `G` composed with `H`.
 *
 * Composition is the simple union of the node sets and edge sets. The node sets
 * of `G` and `H` do not need to be disjoint.
 *
 * ### Notes
 *
 * It is recommended that `G` and `H` be either both directed or both
 * undirected. Attributes from `H` take precedent over attributes from `G`.
 *
 * @param {Graph} G
 * @param {Graph} H
 * @return {Graph} A new graph with the same type as G
 */


/*istanbul ignore next*/
function _symmetricDifference() {
  _symmetricDifference = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee5(G, H)
  /*istanbul ignore next*/
  {
    var R, edges, addEdge, hasEdge, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, edge, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _edge;

    return regeneratorRuntime.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!(G.isMultigraph() !== H.isMultigraph())) {
              _context5.next = 2;
              break;
            }

            throw new
            /*istanbul ignore next*/
            _JSNetworkXError[
            /*istanbul ignore next*/
            "default"]('G and H must both be graphs or multigraphs');

          case 2:
            R =
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _functions.
            /*istanbul ignore next*/
            createEmptyCopy)(G);
            R.name =
            /*istanbul ignore next*/
            "Symmetric difference of (".concat(G.name, " and ").concat(H.name, ")");
            assertSameNodes(G, H);
            R.addNodesFrom(
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _Set.
            /*istanbul ignore next*/
            symmetricDifference)(new
            /*istanbul ignore next*/
            _Set[
            /*istanbul ignore next*/
            "default"](G), new
            /*istanbul ignore next*/
            _Set[
            /*istanbul ignore next*/
            "default"](H)));
            edges = G.isMultigraph() ? G.edgesIter(false, true) : G.edgesIter();
            addEdge = R.addEdge;
            hasEdge = H.hasEdge;
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context5.prev = 12;

            for (
            /*istanbul ignore next*/
            _iterator3 = edges[Symbol.iterator]();
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion3 = true) {
              /*istanbul ignore next*/
              edge = _step3.value;

              if (!hasEdge.apply(H, edge)) {
                addEdge.apply(R, edge);
              }
            }

            _context5.next = 20;
            break;

          case 16:
            _context5.prev = 16;
            _context5.t0 = _context5["catch"](12);
            _didIteratorError3 = true;
            _iteratorError3 = _context5.t0;

          case 20:
            _context5.prev = 20;
            _context5.prev = 21;

            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }

          case 23:
            _context5.prev = 23;

            if (!_didIteratorError3) {
              _context5.next = 26;
              break;
            }

            throw _iteratorError3;

          case 26:
            return _context5.finish(23);

          case 27:
            return _context5.finish(20);

          case 28:
            edges = H.isMultigraph() ? H.edgesIter(false, true) : H.edgesIter();
            hasEdge = H.hasEdge;
            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context5.prev = 33;

            for (
            /*istanbul ignore next*/
            _iterator4 = edges[Symbol.iterator]();
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion4 = true) {
              /*istanbul ignore next*/
              _edge = _step4.value;

              if (!hasEdge.apply(G, _edge)) {
                addEdge.apply(R, _edge);
              }
            }

            _context5.next = 41;
            break;

          case 37:
            _context5.prev = 37;
            _context5.t1 = _context5["catch"](33);
            _didIteratorError4 = true;
            _iteratorError4 = _context5.t1;

          case 41:
            _context5.prev = 41;
            _context5.prev = 42;

            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }

          case 44:
            _context5.prev = 44;

            if (!_didIteratorError4) {
              _context5.next = 47;
              break;
            }

            throw _iteratorError4;

          case 47:
            return _context5.finish(44);

          case 48:
            return _context5.finish(41);

          case 49:
            return _context5.abrupt("return", R);

          case 50:
          case "end":
            return _context5.stop();
        }
      }
    }, _callee5, null, [[12, 16, 20, 28], [21,, 23, 27], [33, 37, 41, 49], [42,, 44, 48]]);
  }));
  return _symmetricDifference.apply(this, arguments);
}

/*istanbul ignore next*/
function compose(_x11, _x12) {
  return _compose.apply(this, arguments);
}

/*istanbul ignore next*/
function _compose() {
  _compose = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee6(G, H)
  /*istanbul ignore next*/
  {
    var R;
    return regeneratorRuntime.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            if (!(G.isMultigraph() !== H.isMultigraph())) {
              _context6.next = 2;
              break;
            }

            throw new
            /*istanbul ignore next*/
            _JSNetworkXError[
            /*istanbul ignore next*/
            "default"]('G and H must both be graphs or multigraphs');

          case 2:
            R = new G.constructor();
            R.name =
            /*istanbul ignore next*/
            "compose(".concat(G.name, ", ").concat(H.name, ")");
            R.addNodesFrom(G.nodesIter(true));
            R.addNodesFrom(H.nodesIter(true));
            R.addEdgesFrom(G.isMultigraph() ? G.edgesIter(true, true) : G.edgesIter(true));
            R.addEdgesFrom(H.isMultigraph() ? H.edgesIter(true, true) : H.edgesIter(true)); // add graph attributes

            Object.assign(R.graph, G.graph, H.graph);
            return _context6.abrupt("return", R);

          case 10:
          case "end":
            return _context6.stop();
        }
      }
    }, _callee6);
  }));
  return _compose.apply(this, arguments);
}