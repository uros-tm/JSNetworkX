'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var
/*istanbul ignore next*/
_DiGraph2 = _interopRequireDefault(require("./DiGraph"));

var
/*istanbul ignore next*/
_MultiGraph = _interopRequireDefault(require("./MultiGraph"));

var
/*istanbul ignore next*/
_JSNetworkXError = _interopRequireDefault(require("../exceptions/JSNetworkXError"));

var
/*istanbul ignore next*/
_internals = require("../_internals");

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(yieldEdges),
    _marked2 =
/*#__PURE__*/
regeneratorRuntime.mark(yieldDegree);

/*istanbul ignore next*/ function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * A directed graph class that can store multiedges.
 *
 * Multiedges are multiple edges between two nodes. Each edge can hold optional
 * data or attributes.
 *
 * A MultiDiGraph holds directed edges. Self loops are allowed. Edges are
 * respresented as links between nodes with optional key/value attributes.
 *
 * ### Example
 *
 * Create an empty graph structure (a "null graph") with no nodes and no edges:
 *
 * ```
 * var G = new jsnx.MultiDiGraph();
 * ```
 *
 * G can be grown in several ways.
 *
 * #### Nodes
 *
 * Add one node at a time:
 *
 * ```
 * G.addNode(1);
 * ```
 *
 * Add the nodes from any iterable:
 *
 * ```
 * G.addNodesFrom([2,3]);
 * var H = new jsnx.Graph();
 * H.addPath([0,1,2,3,4,5]);
 * G.addNodesFrom(H);
 * ```
 *
 * In addition to strings and integers, any object that implements a custom
 * `toString` method can represent a node.
 *
 * #### Edges
 *
 * `G` can also be grown by adding edges. Add one edge,
 *
 * ```
 * G.addEdge(1, 2);
 * ```
 *
 * a list of edges,
 *
 * ```
 * G.addEdgesFrom([[1,2], [1,3]]);
 * ```
 *
 * or a collection of edges
 *
 * ```
 * G.addEdgesFrom(H.edges());
 * ```
 *
 * If some edges connect nodes not yet in the graph, the nodes are added
 * automatically. If an edge already exists, an additional edge is created and
 * stored using a key to identify the edge. By default the key is the lowest
 * unused integer.
 *
 * ```
 * G.addEdgesFrom([[4,5,{route:282}], [4,5,{route:37}]]);
 * G.get(4);
 * // Map {5: {0: {}, 1: {route: 282}, 2: {route: 37}}}
 *
 * #### Attributes
 *
 * Each graph, node and edge can hold key/value attribute pairs in an associated
 * attribute object. By default these are empty, but can be added or changed
 * using `addEdge` or `addNode`.
 *
 * ```
 * G.addNode(1, {time: '5pm'});
 * G.addNodesFrom([3], {time: '2pm'});
 * G.nodes(true);
 * // [[1, {time: '5pm'}], [3, {time: '2pm'}]]
 * ```
 *
 * Add edge attributes using `addEdge` and `addEdgesFrom`:
 *
 * ```
 * G.addEdge(1, 2, {weight: 4.7});
 * G.addEdgesFrom([[3,4], [4,5]], {color: 'red'});
 * G.addEdgesFrom([[1,2,{color: 'blue'}], [2,3,{weight: 8}]]);
 * ```
 */
var MultiDiGraph =
/*#__PURE__*/
function (_DiGraph) {
  _inherits(MultiDiGraph, _DiGraph);

  /**
   * @param {(Object|Array|Graph)} optData Data to initialize graph.
   *   If no data is passed, an empty graph is created. The data can be an edge
   *   list, or any JSNetworkX graph object.
   * @param {Object=} opt_attr (default= no attributes)
   *       Attributes to add to graph as key=value pairs.
   */
  function
  /*istanbul ignore next*/
  MultiDiGraph(optData, optAttr) {
    /*istanbul ignore next*/
    _classCallCheck(this, MultiDiGraph);

    return _possibleConstructorReturn(this, _getPrototypeOf(MultiDiGraph).call(this, optData, optAttr));
  }
  /**
   * Holds the graph type (class) name for information.
   *
   * @type {string}
   */


  _createClass(MultiDiGraph, [{
    key: "addEdge",

    /**
     * Add an edge between u and v.
     *
     * The nodes u and v will be automatically added if they are not already in
     * the graph.
     *
     * Edge attributes can be specified by providing an object with key/value
     * pairs.
     *
     * ### Note
     *
     * To replace/update edge data, use the optional key argument to identify a
     * unique edge. Otherwise a new edge will be created.
     *
     * ### Example
     *
     * The following add the edge e=(1,2) to graph G:
     *
     * ```
     * var G = new jsnx.MultiDiGraph();
     * G.addEdge(1, 2);
     * G.addEdgesFrom([[1,2]]);
     * ```
     *
     * Associate data to edges using keywords:
     *
     * ```
     * G.addEdge(1, 2, {weight: 3});
     * G.addEdge(1, 2, 0, {weight: 4}); // update data for key=0
     * G.addEdge(1, 3, {weight: 7, capacity: 15, length: 342.7});
     * ```
     * @param {Node} u
     * @param {Node} v
     * @param {(string|number)} optKey (default=lowest unused integer) Used to
     *   distinguish multiedges between a pair of nodes.
     * @param {Object} opAttrDict Object of edge attributes. Key/value pairs will
     *   update existing data associated with the edge.
     */
    value: function addEdge(u, v, optKey, optAttrDict) {
      if (optKey &&
      /*istanbul ignore next*/
      _typeof(optKey) === 'object') {
        optAttrDict = optKey;
        optKey = null;
      }

      if (optAttrDict && !
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      isPlainObject)(optAttrDict)) {
        throw new
        /*istanbul ignore next*/
        _JSNetworkXError[
        /*istanbul ignore next*/
        "default"]('The optAttrDict argument must be a plain object.');
      } // add nodes


      var keydict;

      if (!this.succ.has(u)) {
        this.succ.set(u, new
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        Map());
        this.pred.set(u, new
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        Map());
        this.node.set(u, {});
      }

      if (!this.succ.has(v)) {
        this.succ.set(v, new
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        Map());
        this.pred.set(v, new
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        Map());
        this.node.set(v, {});
      }

      if (this.succ.get(u).has(v)) {
        keydict = this.get(u).get(v);

        if (optKey == null) {
          // find unique integer key
          optKey = Object.keys(keydict).length;

          while (keydict[optKey]) {
            optKey += 1;
          }
        }

        keydict[optKey] = Object.assign(
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        getDefault)(keydict[optKey], {}), optAttrDict);
      } else {
        // selfloops work this way without special treatment
        if (optKey == null) {
          optKey = 0;
        }

        keydict =
        /*istanbul ignore next*/
        _defineProperty({}, optKey, Object.assign({}, optAttrDict));
        this.succ.get(u).set(v, keydict);
        this.pred.get(v).set(u, keydict);
      }
    }
    /**
     * Remove an edge between u and v.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiDiGraph();
     * G.addPath([0,1,2,3]);
     * G.removeEdge(0, 1);
     * ```
     *
     * For multiple edges:
     *
     * ```
     * var G = new jsnx.MultiDiGraph();
     * G.addEdgesFrom([[1,2], [1,2], [1,2]]);
     * G.removeEdge(1, 2); // remove a single (arbitrary) edge
     * ```
     *
     * For edges with keys:
     *
     * ```
     * var G = new jsnx.MultiDiGraph();
     * G.addEdge(1, 2, 'first');
     * G.addEdge(1, 2, 'second');
     * G.removeEdge(1, 2, 'second');
     * ```
     * @param {Node} u
     * @param {Node} v
     * @param {(string|number)} optKey Used to distinguish multiple edges between
     *   a pair of nodes. If undefined, remove a single (arbitrary) edge between
     *   u and v.
     */

  }, {
    key: "removeEdge",
    value: function removeEdge(u, v, optKey) {
      var keydict;
      var neightborsOfU = this.adj.get(u);

      if (neightborsOfU) {
        keydict = neightborsOfU.get(v);
      }

      if (keydict == null) {
        throw new
        /*istanbul ignore next*/
        _JSNetworkXError[
        /*istanbul ignore next*/
        "default"](
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        sprintf)('The edge %j-%j is not in the graph', u, v));
      } // remove the edge with specified data


      if (optKey == null) {
        for (var key in keydict) {
          delete keydict[key];
          break;
        }
      } else {
        if (!keydict[optKey]) {
          throw new
          /*istanbul ignore next*/
          _JSNetworkXError[
          /*istanbul ignore next*/
          "default"](
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          sprintf)('The edge %j-%j with key %j is not in the graph', u, v, optKey));
        }

        delete keydict[optKey];
      }

      if (Object.keys(keydict).length === 0) {
        // remove the key entries if last edge
        this.succ.get(u)[
        /*istanbul ignore next*/
        "delete"](v);
        this.pred.get(v)[
        /*istanbul ignore next*/
        "delete"](u);
      }
    }
    /**
     * Return an iterator over the edges.
     *
     * Edges are returned as tuples with optional data and keys in the order
     * `(node, neighbor, key, data)`.
     *
     * ### Note
     *
     * Nodes in `optNbunch` that are not in the graph will be (quietly) ignored.
     * For directed graphs this returns the out-edges.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiDiGraph();
     * G.addPath([0,1,2,3]);
     * Array.from(G.edgesIter());
     * // [[0,1], [1,2], [2,3]]
     * Array.from(G.edgesIter(true));
     * // [[0,1,{}], [1,2,{}], [2,3,{}]]
     * Array.from(G.edgesIter([0,2]));
     * // [[0,1], [2,3]]
     * ```
     *
     * @alias outEdgesIter
     *
     * @param {Iterable} optNbunch (default=all nodes) A container of nodes.
     *   The container will be iterated over only once.
     * @param {boolean} optData (default=false) If true, return edge attribute
     *   dictionaries with each edge.
     * @param {boolean} optKeys (default=flase) If true, return edge keys with
     *   each edge.
     * @return {Iterator} An iterator of `(u,v)`, `(u,v,d)` or `(u,v,key,d)` edges
     */

  }, {
    key: "edgesIter",
    value:
    /*#__PURE__*/
    regeneratorRuntime.mark(function edgesIter(optNbunch) {
      var _this = this;

      var optData,
          optKeys,
          nodesNbrs,
          _args = arguments;
      return regeneratorRuntime.wrap(function edgesIter$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              optData = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;
              optKeys = _args.length > 2 && _args[2] !== undefined ? _args[2] : false;

              if (typeof optNbunch === 'boolean') {
                optKeys = optData;
                optData = optNbunch;
                optNbunch = null;
              }

              nodesNbrs = optNbunch == null ? this.adj :
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              mapIterator)(this.nbunchIter(optNbunch), function (n)
              /*istanbul ignore next*/
              {
                return (
                  /*istanbul ignore next*/
                  (0,
                  /*istanbul ignore next*/
                  _internals.
                  /*istanbul ignore next*/
                  tuple2)(n, _this.adj.get(n))
                );
              });
              return (
                /*istanbul ignore next*/
                _context.delegateYield(yieldEdges(nodesNbrs, optData, optKeys, 'out'), "t0", 5)
              );

            case 5:
            case "end":
              return _context.stop();
          }
        }
      }, edgesIter, this);
    })
    /**
     * @alias edgesIter
     */

  }, {
    key: "outEdgesIter",
    value: function outEdgesIter(optNbunch, optData, optKeys) {
      return this.edgesIter(optNbunch, optData, optKeys);
    }
    /**
     * Return a list of the outgoing edges.
     *
     * Edges are returned as tuples with optional data and keys in the order
     * `(node, neighbor, key, data)`.
     *
     * ### Note
     *
     * Nodes in `optNbunch` that are not in the graph will be (quietly) ignored.
     * For directed graphs `edges()` is the same as `outEdges()`.
     *
     * @see inEdges
     *
     * @param {Iterable} optNbunch (default=all nodes) A container of nodes.
     *   The container will be iterated over only once.
     * @param {boolean} optData (default=false) If true, return edge attribute
     *   dictionaries with each edge.
     * @param {boolean} optKeys (default=flase) If true, return edge keys with
     *   each edge.
     * @return {Array} A list of `(u,v)`, `(u,v,d)` or `(u,v,key,d)` tuples of
     *   edges
     */

  }, {
    key: "outEdges",
    value: function outEdges(optNbunch, optData, optKeys) {
      return Array.from(this.outEdgesIter(optNbunch, optData, optKeys));
    }
    /**
     * Return an iterator over the incoming edges.
     *
     * Edges are returned as tuples with optional data and keys in the order
     * `(node, neighbor, key, data)`.
     *
     * @see edgesIter
     *
     * @param {Iterable=} optNbunch (default=all nodes) A container of nodes.
     *   The container will be iterated over only once.
     * @param {boolean=} optData (default=false) If true, return edge attribute
     *   dictionaries with each edge.
     * @param {boolean=} optKeys (default=flase) If true, return edge keys with
     *   each edge.
     * @return {Iterator} An iterator of `(u,v)`, `(u,v,d)` or `(u,v,key,d)` edges
     */

  }, {
    key: "inEdgesIter",
    value:
    /*#__PURE__*/
    regeneratorRuntime.mark(function inEdgesIter(optNbunch) {
      var _this2 = this;

      var optData,
          optKeys,
          nodesNbrs,
          _args2 = arguments;
      return regeneratorRuntime.wrap(function inEdgesIter$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              optData = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;
              optKeys = _args2.length > 2 && _args2[2] !== undefined ? _args2[2] : false;

              if (typeof optNbunch === 'boolean') {
                optKeys = optData;
                optData = optNbunch;
                optNbunch = null;
              }

              nodesNbrs = optNbunch == null ? this.pred :
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              mapIterator)(this.nbunchIter(optNbunch), function (n)
              /*istanbul ignore next*/
              {
                return (
                  /*istanbul ignore next*/
                  (0,
                  /*istanbul ignore next*/
                  _internals.
                  /*istanbul ignore next*/
                  tuple2)(n, _this2.pred.get(n))
                );
              });
              return (
                /*istanbul ignore next*/
                _context2.delegateYield(yieldEdges(nodesNbrs, optData, optKeys, 'in'), "t0", 5)
              );

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, inEdgesIter, this);
    })
    /**
     * Return a list of the incoming edges.
     *
     * @see outEdges
     *
     * @param {Iterable=} optNbunch (default=all nodes) A container of nodes.
     *   The container will be iterated over only once.
     * @param {boolean=} optData (default=false) If true, return edge attribute
     *   dictionaries with each edge.
     * @param {boolean=} optKeys (default=flase) If true, return edge keys with
     *   each edge.
     * @return {Array} A list of `(u,v)`, `(u,v,d)` or `(u,v,key,d)` tuples of
     *   edges
     */

  }, {
    key: "inEdges",
    value: function inEdges(optNbunch, optData, optKeys) {
      return Array.from(this.inEdgesIter(optNbunch, optData, optKeys));
    }
    /**
     * Return an iterator for `(node, degree)`.
     *
     * The node degree is the number of edges adjacent to the node.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiDiGraph();
     * G.addPath([0,1,2,3]);
     * Array.from(G.degreeIter([0,1]));
     * // [[0,1], [1,2]]
     * ```
     *
     * @param {Iterable=} optNbunch (default=all nodes) A container of nodes.
     *   The container will be iterated through once.
     * @param {string=} optString (default=null)
     *   The edge attribute that holds the numerical value used as a weight. If
     *   None, then each edge has weight 1.
     *   The degree is the sum of the edge weights.
     * @return {Iterator} The iterator returns two-tuples of `(node, degree)`.
     */

  }, {
    key: "degreeIter",
    value:
    /*#__PURE__*/
    regeneratorRuntime.mark(function degreeIter(optNbunch, optWeight) {
      var _this3 = this;

      var tuple2Succ, tuple2Pred, nodesNbrs, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _step$value, _step$value$, n, succ, _step$value$2, _, pred, keydict, inDegree, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, outDegree, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, _step4$value, _step4$value$, _step4$value$2;

      return regeneratorRuntime.wrap(function degreeIter$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              tuple2Succ =
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              createTupleFactory)(2);
              tuple2Pred =
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              createTupleFactory)(2);
              nodesNbrs = optNbunch == null ?
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              zipIterator)(this.succ.entries(), this.pred.entries()) :
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              zipIterator)(
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              mapIterator)(this.nbunchIter(optNbunch), function (n)
              /*istanbul ignore next*/
              {
                return tuple2Succ(n, _this3.succ.get(n));
              }),
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              mapIterator)(this.nbunchIter(optNbunch), function (n)
              /*istanbul ignore next*/
              {
                return tuple2Pred(n, _this3.pred.get(n));
              }));

              if (!(optWeight == null)) {
                _context3.next = 72;
                break;
              }

              /* eslint-disable no-unused-vars */
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context3.prev = 7;
              _iterator = nodesNbrs[Symbol.iterator]();

            case 9:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context3.next = 56;
                break;
              }

              _step$value = _slicedToArray(_step.value, 2), _step$value$ = _slicedToArray(_step$value[0], 2), n = _step$value$[0], succ = _step$value$[1], _step$value$2 = _slicedToArray(_step$value[1], 2), _ = _step$value$2[0], pred = _step$value$2[1];
              inDegree = 0;
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context3.prev = 15;

              for (
              /*istanbul ignore next*/
              _iterator2 = pred.values()[Symbol.iterator]();
              /*istanbul ignore next*/
              !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
              /*istanbul ignore next*/
              _iteratorNormalCompletion2 = true) {
                /*istanbul ignore next*/
                keydict = _step2.value;
                inDegree += Object.keys(keydict).length;
              }

              _context3.next = 23;
              break;

            case 19:
              _context3.prev = 19;
              _context3.t0 = _context3["catch"](15);
              _didIteratorError2 = true;
              _iteratorError2 = _context3.t0;

            case 23:
              _context3.prev = 23;
              _context3.prev = 24;

              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }

            case 26:
              _context3.prev = 26;

              if (!_didIteratorError2) {
                _context3.next = 29;
                break;
              }

              throw _iteratorError2;

            case 29:
              return _context3.finish(26);

            case 30:
              return _context3.finish(23);

            case 31:
              outDegree = 0;
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context3.prev = 35;

              for (
              /*istanbul ignore next*/
              _iterator3 = succ.values()[Symbol.iterator]();
              /*istanbul ignore next*/
              !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
              /*istanbul ignore next*/
              _iteratorNormalCompletion3 = true) {
                /*istanbul ignore next*/
                keydict = _step3.value;
                inDegree += Object.keys(keydict).length;
              }

              _context3.next = 43;
              break;

            case 39:
              _context3.prev = 39;
              _context3.t1 = _context3["catch"](35);
              _didIteratorError3 = true;
              _iteratorError3 = _context3.t1;

            case 43:
              _context3.prev = 43;
              _context3.prev = 44;

              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }

            case 46:
              _context3.prev = 46;

              if (!_didIteratorError3) {
                _context3.next = 49;
                break;
              }

              throw _iteratorError3;

            case 49:
              return _context3.finish(46);

            case 50:
              return _context3.finish(43);

            case 51:
              _context3.next = 53;
              return [n, inDegree + outDegree];

            case 53:
              _iteratorNormalCompletion = true;
              _context3.next = 9;
              break;

            case 56:
              _context3.next = 62;
              break;

            case 58:
              _context3.prev = 58;
              _context3.t2 = _context3["catch"](7);
              _didIteratorError = true;
              _iteratorError = _context3.t2;

            case 62:
              _context3.prev = 62;
              _context3.prev = 63;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 65:
              _context3.prev = 65;

              if (!_didIteratorError) {
                _context3.next = 68;
                break;
              }

              throw _iteratorError;

            case 68:
              return _context3.finish(65);

            case 69:
              return _context3.finish(62);

            case 70:
              _context3.next = 98;
              break;

            case 72:
              /* eslint-disable no-unused-vars */
              _iteratorNormalCompletion4 = true;
              _didIteratorError4 = false;
              _iteratorError4 = undefined;
              _context3.prev = 75;
              _iterator4 = nodesNbrs[Symbol.iterator]();

            case 77:
              if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                _context3.next = 84;
                break;
              }

              _step4$value = _slicedToArray(_step4.value, 2), _step4$value$ = _slicedToArray(_step4$value[0], 2), n = _step4$value$[0], succ = _step4$value$[1], _step4$value$2 = _slicedToArray(_step4$value[1], 2), _ = _step4$value$2[0], pred = _step4$value$2[1];
              _context3.next = 81;
              return [n, sumEdgeAttribute(pred, optWeight, 1) + sumEdgeAttribute(succ, optWeight, 1)];

            case 81:
              _iteratorNormalCompletion4 = true;
              _context3.next = 77;
              break;

            case 84:
              _context3.next = 90;
              break;

            case 86:
              _context3.prev = 86;
              _context3.t3 = _context3["catch"](75);
              _didIteratorError4 = true;
              _iteratorError4 = _context3.t3;

            case 90:
              _context3.prev = 90;
              _context3.prev = 91;

              if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                _iterator4["return"]();
              }

            case 93:
              _context3.prev = 93;

              if (!_didIteratorError4) {
                _context3.next = 96;
                break;
              }

              throw _iteratorError4;

            case 96:
              return _context3.finish(93);

            case 97:
              return _context3.finish(90);

            case 98:
            case "end":
              return _context3.stop();
          }
        }
      }, degreeIter, this, [[7, 58, 62, 70], [15, 19, 23, 31], [24,, 26, 30], [35, 39, 43, 51], [44,, 46, 50], [63,, 65, 69], [75, 86, 90, 98], [91,, 93, 97]]);
    })
    /**
     * Return an iterator for `(node, in-degree)`.
     *
     * The node in-degree is the number of edges pointing to the node.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiDiGraph();
     * G.addPath([0,1,2,3]);
     * Array.from(G.degreeIter([0,1]));
     * // [[0,0], [1,1]]
     * ```
     *
     * @param {Iterable=} optNbunch (default=all nodes) A container of nodes.
     *   The container will be iterated through once.
     * @param {string=} optString (default=null)
     *   The edge attribute that holds the numerical value used as a weight. If
     *   None, then each edge has weight 1.
     *   The degree is the sum of the edge weights.
     * @return {Iterator} The iterator returns two-tuples of `(node, degree)`.
     */

  }, {
    key: "inDegreeIter",
    value:
    /*#__PURE__*/
    regeneratorRuntime.mark(function inDegreeIter(optNbunch, optWeight) {
      return regeneratorRuntime.wrap(function inDegreeIter$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              return (
                /*istanbul ignore next*/
                _context4.delegateYield(yieldDegree(this, this.pred, optNbunch, optWeight), "t0", 1)
              );

            case 1:
            case "end":
              return _context4.stop();
          }
        }
      }, inDegreeIter, this);
    })
    /**
     * Return an iterator for `(node, out-degree)`.
     *
     * The node out-degree is the number of edges pointing out of the node.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiDiGraph();
     * G.addPath([0,1,2,3]);
     * Array.from(G.degreeIter([0,1]));
     * // [[0,1], [1,1]]
     * ```
     *
     * @param {Iterable=} optNbunch (default=all nodes) A container of nodes.
     *   The container will be iterated through once.
     * @param {string=} optString (default=null)
     *   The edge attribute that holds the numerical value used as a weight. If
     *   None, then each edge has weight 1.
     *   The degree is the sum of the edge weights.
     * @return {Iterator} The iterator returns two-tuples of `(node, degree)`.
     */

  }, {
    key: "outDegreeIter",
    value:
    /*#__PURE__*/
    regeneratorRuntime.mark(function outDegreeIter(optNbunch, optWeight) {
      return regeneratorRuntime.wrap(function outDegreeIter$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              return (
                /*istanbul ignore next*/
                _context5.delegateYield(yieldDegree(this, this.succ, optNbunch, optWeight), "t0", 1)
              );

            case 1:
            case "end":
              return _context5.stop();
          }
        }
      }, outDegreeIter, this);
    })
    /**
     * Return True if graph is a multigraph, False otherwise.
     *
     * @return {boolean} True if graph is a multigraph, False otherwise.
     */

  }, {
    key: "isMultigraph",
    value: function isMultigraph() {
      return true;
    }
    /**
     * Return True if graph is directed, False otherwise.
     *
     * @return {boolean}  True if graph is directed, False otherwise.
     */

  }, {
    key: "isDirected",
    value: function isDirected() {
      return true;
    }
    /**
     * Return a directed copy of the graph.
     *
     * ### Notes
     *
     * This returns a deep copy of the edge, node, and
     * graph attributes which attempts to completely copy
     * all of the data and references.
     *
     * This is in contrast to the similar `var G = new MultiDiGraph(D);`, which
     * returns a shallow copy of the data.
     *
     * @return {MultiDiGraph} A deep copy of the graph.
     */

  }, {
    key: "toDirected",
    value: function toDirected() {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        deepcopy)(this)
      );
    }
    /**
     * Return an undirected representation of the digraph.
     *
     * ### Notes
     *
     * The result is an undirected graph with the same name, nodes and
     * with edge `(u,v,data)` if either `(u,v,data)` or `(v,u,data)`
     * is in the digraph.  If both edges exist in digraph and
     * their edge data is different, only one edge is created
     * with an arbitrary choice of which edge data to use.
     * You must check and correct for this manually if desired.
     *
     * This returns a deep copy of the edge, node, and
     * graph attributes which attempts to completely copy
     * all of the data and references.
     *
     * This is in contrast to the similar `var G = new MultiGraph(D);`, which
     * returns a shallow copy of the data.
     *
     * @param {boolean=} optReciprocal If true, only keep edges that appear in
     *   both directions in the original digraph.
     * @return {MultiGraph}
     */

  }, {
    key: "toUndirected",
    value: function toUndirected(optReciprocal) {
      var H = new
      /*istanbul ignore next*/
      _MultiGraph[
      /*istanbul ignore next*/
      "default"]();
      H.name = this.name;
      H.addNodesFrom(this);

      /*istanbul ignore next*/
      var _iteratorNormalCompletion5 = true;
      var _didIteratorError5 = false;
      var _iteratorError5 = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator5 = this.adjacencyIter()[Symbol.iterator](), _step5;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion5 = true) {
          /*istanbul ignore next*/
          var _step5$value = _slicedToArray(_step5.value, 2),
              u = _step5$value[0],
              nbrs = _step5$value[1];

          /*istanbul ignore next*/
          var _iteratorNormalCompletion6 = true;
          var _didIteratorError6 = false;
          var _iteratorError6 = undefined;

          try {
            for (
            /*istanbul ignore next*/
            var _iterator6 = nbrs[Symbol.iterator](), _step6;
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion6 = true) {
              /*istanbul ignore next*/
              var _step6$value = _slicedToArray(_step6.value, 2),
                  v = _step6$value[0],
                  keydict = _step6$value[1];

              for (var key in keydict) {
                if (!optReciprocal || this.hasEdge(v, u, key)) {
                  H.addEdge(u, v, key,
                  /*istanbul ignore next*/
                  (0,
                  /*istanbul ignore next*/
                  _internals.
                  /*istanbul ignore next*/
                  deepcopy)(keydict[key]));
                }
              }
            }
          } catch (err) {
            _didIteratorError6 = true;
            _iteratorError6 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
                _iterator6["return"]();
              }
            } finally {
              if (_didIteratorError6) {
                throw _iteratorError6;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError5 = true;
        _iteratorError5 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
            _iterator5["return"]();
          }
        } finally {
          if (_didIteratorError5) {
            throw _iteratorError5;
          }
        }
      }

      H.graph =
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      deepcopy)(this.graph);
      H.node =
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      deepcopy)(this.node);
      return H;
    }
    /**
     * Return the subgraph induced on nodes in `nbunch`.
     *
     * The induced subgraph of the graph contains the nodes in `optNbunch` and the
     * edges between those nodes.
     *
     * ### Notes
     *
     * The graph, edge or node attributes just point to the original graph.
     * So changes to the node or edge structure will not be reflected in
     * the original graph while changes to the attributes will.
     *
     * To create a subgraph with its own copy of the edge/node attributes use:
     * `jsnx.MultiDiGraph(G.subgraph(nbunch))`.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiDiGraph();
     * G.addPath([0,1,2,3]);
     * var H = G.subgraph([0,1,2]);
     * H.edges();
     * // [[0,1], [1,2]]
     * ```
     *
     * @param {Iterable} nBunch A container of nodes which will be iterated
     *   through once.
     * @return {MultiDiGraph}
     */

  }, {
    key: "subgraph",
    value: function subgraph(nBunch) {
      var bunch = this.nbunchIter(nBunch); // create new graph and copy subgraph into it

      var H = new this.constructor(); // copy node and attribute dictionaries

      /*istanbul ignore next*/
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator7 = bunch[Symbol.iterator](), _step7;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion7 = true) {
          /*istanbul ignore next*/
          var n = _step7.value;
          H.node.set(n, this.node.get(n));
        }
      } catch (err) {
        _didIteratorError7 = true;
        _iteratorError7 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
            _iterator7["return"]();
          }
        } finally {
          if (_didIteratorError7) {
            throw _iteratorError7;
          }
        }
      }

      var HSucc = H.succ;
      var HPred = H.pred;
      var thisSucc = this.succ; // add nodes

      /*istanbul ignore next*/
      var _iteratorNormalCompletion8 = true;
      var _didIteratorError8 = false;
      var _iteratorError8 = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator8 = H[Symbol.iterator](), _step8;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion8 = true) {
          /*istanbul ignore next*/
          var _n2 = _step8.value;
          HSucc.set(_n2, new
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          Map());
          HPred.set(_n2, new
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          Map());
        } // add edges

      } catch (err) {
        _didIteratorError8 = true;
        _iteratorError8 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
            _iterator8["return"]();
          }
        } finally {
          if (_didIteratorError8) {
            throw _iteratorError8;
          }
        }
      }

      /*istanbul ignore next*/
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator9 = HSucc[Symbol.iterator](), _step9;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion9 = true) {
          /*istanbul ignore next*/
          var _step9$value = _slicedToArray(_step9.value, 2),
              u = _step9$value[0],
              HNbrs = _step9$value[1];

          /*istanbul ignore next*/
          var _iteratorNormalCompletion10 = true;
          var _didIteratorError10 = false;
          var _iteratorError10 = undefined;

          try {
            for (
            /*istanbul ignore next*/
            var _iterator10 = thisSucc.get(u)[Symbol.iterator](), _step10;
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion10 = true) {
              /*istanbul ignore next*/
              var _step10$value = _slicedToArray(_step10.value, 2),
                  v = _step10$value[0],
                  keydict = _step10$value[1];

              if (HSucc.has(v)) {
                // add both representations of edge: u-v and v-u
                // they share the same keydict
                var keydictCopy =
                /*istanbul ignore next*/
                (0,
                /*istanbul ignore next*/
                _internals.
                /*istanbul ignore next*/
                clone)(keydict);
                HNbrs.set(v, keydictCopy);
                HPred.get(v).set(u, keydictCopy);
              }
            }
          } catch (err) {
            _didIteratorError10 = true;
            _iteratorError10 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion10 && _iterator10["return"] != null) {
                _iterator10["return"]();
              }
            } finally {
              if (_didIteratorError10) {
                throw _iteratorError10;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError9 = true;
        _iteratorError9 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion9 && _iterator9["return"] != null) {
            _iterator9["return"]();
          }
        } finally {
          if (_didIteratorError9) {
            throw _iteratorError9;
          }
        }
      }

      H.graph = this.graph;
      return H;
    }
    /**
     * Return the reverse of the graph.
     *
     * The reverse is a graph with the same nodes and edges but with the
     * directions of the edges reversed.
     *
     * @param {boolean=} optCopy If true, return a new MultiDiGraph holding the
     *   reversed edges. If false, the reverse graph is created using the original
     *   graph (this changes the original graph).
     * @return {?MultiDiGraph}
     */

  }, {
    key: "reverse",
    value: function reverse() {
      /*istanbul ignore next*/
      var optCopy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var H;

      if (optCopy) {
        H = new this.constructor(null, {
          name:
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          sprintf)('Reverse of (%s)', this.name)
        });
        H.addNodesFrom(this);
        H.addEdgesFrom(
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        mapIterator)(this.edges(true, true), function (
        /*istanbul ignore next*/
        _ref)
        /*istanbul ignore next*/
        {
          var _ref2 = _slicedToArray(_ref, 4),
              u = _ref2[0],
              v = _ref2[1],
              key = _ref2[2],
              data = _ref2[3];

          return (
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            tuple4)(v, u, key,
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            deepcopy)(data))
          );
        }));
        H.graph =
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        deepcopy)(this.graph);
        H.node =
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        deepcopy)(this.node);
      } else {
        /*istanbul ignore next*/
        var _ref3 = [this.succ, this.pred];

        /*istanbul ignore next*/
        this.pred = _ref3[0];

        /*istanbul ignore next*/
        this.succ = _ref3[1];
        this.adj = this.succ;
        H = this;
      }

      return H;
    }
  }], [{
    key: "__name__",
    get: function get() {
      return 'MultiDiGraph';
    }
  }]);

  return MultiDiGraph;
}(
/*istanbul ignore next*/
_DiGraph2[
/*istanbul ignore next*/
"default"]); // Simulate multiple inheritance by merging prototypes


/*istanbul ignore next*/
exports["default"] = MultiDiGraph;
Object.getOwnPropertyNames(
/*istanbul ignore next*/
_MultiGraph[
/*istanbul ignore next*/
"default"].prototype).forEach(function (prop) {
  if (!MultiDiGraph.prototype.hasOwnProperty(prop)) {
    MultiDiGraph.prototype[prop] =
    /*istanbul ignore next*/
    _MultiGraph[
    /*istanbul ignore next*/
    "default"].prototype[prop];
  }
});

function yieldEdges(nodesNbrs, data, keys, type)
/*istanbul ignore next*/
{
  var _iteratorNormalCompletion11, _didIteratorError11, _iteratorError11, _iterator11, _step11, _step11$value, n, nbrs, _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, _step12$value, nbr, keydict, key, result;

  return regeneratorRuntime.wrap(function yieldEdges$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _iteratorNormalCompletion11 = true;
          _didIteratorError11 = false;
          _iteratorError11 = undefined;
          _context6.prev = 3;
          _iterator11 = nodesNbrs[Symbol.iterator]();

        case 5:
          if (_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done) {
            _context6.next = 44;
            break;
          }

          _step11$value = _slicedToArray(_step11.value, 2), n = _step11$value[0], nbrs = _step11$value[1];
          _iteratorNormalCompletion12 = true;
          _didIteratorError12 = false;
          _iteratorError12 = undefined;
          _context6.prev = 10;
          _iterator12 = nbrs[Symbol.iterator]();

        case 12:
          if (_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done) {
            _context6.next = 27;
            break;
          }

          _step12$value = _slicedToArray(_step12.value, 2), nbr = _step12$value[0], keydict = _step12$value[1];
          _context6.t0 = regeneratorRuntime.keys(keydict);

        case 15:
          if ((_context6.t1 = _context6.t0()).done) {
            _context6.next = 24;
            break;
          }

          key = _context6.t1.value;
          result = type === 'out' ? [n, nbr] : [nbr, n];

          if (keys) {
            result[2] = isNaN(key) ? key : +key;
          }

          if (data) {
            result.push(keydict[key]);
          }

          _context6.next = 22;
          return result;

        case 22:
          _context6.next = 15;
          break;

        case 24:
          _iteratorNormalCompletion12 = true;
          _context6.next = 12;
          break;

        case 27:
          _context6.next = 33;
          break;

        case 29:
          _context6.prev = 29;
          _context6.t2 = _context6["catch"](10);
          _didIteratorError12 = true;
          _iteratorError12 = _context6.t2;

        case 33:
          _context6.prev = 33;
          _context6.prev = 34;

          if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
            _iterator12["return"]();
          }

        case 36:
          _context6.prev = 36;

          if (!_didIteratorError12) {
            _context6.next = 39;
            break;
          }

          throw _iteratorError12;

        case 39:
          return _context6.finish(36);

        case 40:
          return _context6.finish(33);

        case 41:
          _iteratorNormalCompletion11 = true;
          _context6.next = 5;
          break;

        case 44:
          _context6.next = 50;
          break;

        case 46:
          _context6.prev = 46;
          _context6.t3 = _context6["catch"](3);
          _didIteratorError11 = true;
          _iteratorError11 = _context6.t3;

        case 50:
          _context6.prev = 50;
          _context6.prev = 51;

          if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
            _iterator11["return"]();
          }

        case 53:
          _context6.prev = 53;

          if (!_didIteratorError11) {
            _context6.next = 56;
            break;
          }

          throw _iteratorError11;

        case 56:
          return _context6.finish(53);

        case 57:
          return _context6.finish(50);

        case 58:
        case "end":
          return _context6.stop();
      }
    }
  }, _marked, null, [[3, 46, 50, 58], [10, 29, 33, 41], [34,, 36, 40], [51,, 53, 57]]);
}

function sumEdgeAttribute(nbrs, attribute, def) {
  var sum = 0;

  /*istanbul ignore next*/
  var _iteratorNormalCompletion13 = true;
  var _didIteratorError13 = false;
  var _iteratorError13 = undefined;

  try {
    for (
    /*istanbul ignore next*/
    var _iterator13 = nbrs.values()[Symbol.iterator](), _step13;
    /*istanbul ignore next*/
    !(_iteratorNormalCompletion13 = (_step13 = _iterator13.next()).done);
    /*istanbul ignore next*/
    _iteratorNormalCompletion13 = true) {
      /*istanbul ignore next*/
      var keydict = _step13.value;

      for (var key in keydict) {
        sum +=
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        getDefault)(keydict[key][attribute], def);
      }
    }
  } catch (err) {
    _didIteratorError13 = true;
    _iteratorError13 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion13 && _iterator13["return"] != null) {
        _iterator13["return"]();
      }
    } finally {
      if (_didIteratorError13) {
        throw _iteratorError13;
      }
    }
  }

  return sum;
}

function yieldDegree(graph, edges, nBunch, weight)
/*istanbul ignore next*/
{
  var nodesNbrs, _iteratorNormalCompletion14, _didIteratorError14, _iteratorError14, _iterator14, _step14, _step14$value, n, nbrs, sum, _iteratorNormalCompletion15, _didIteratorError15, _iteratorError15, _iterator15, _step15, keydict, _iteratorNormalCompletion16, _didIteratorError16, _iteratorError16, _iterator16, _step16, _step16$value;

  return regeneratorRuntime.wrap(function yieldDegree$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          nodesNbrs = nBunch == null ? edges :
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          mapIterator)(graph.nbunchIter(nBunch), function (n)
          /*istanbul ignore next*/
          {
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              tuple2)(n, edges.get(n))
            );
          });

          if (!(weight == null)) {
            _context7.next = 50;
            break;
          }

          _iteratorNormalCompletion14 = true;
          _didIteratorError14 = false;
          _iteratorError14 = undefined;
          _context7.prev = 5;
          _iterator14 = nodesNbrs[Symbol.iterator]();

        case 7:
          if (_iteratorNormalCompletion14 = (_step14 = _iterator14.next()).done) {
            _context7.next = 34;
            break;
          }

          _step14$value = _slicedToArray(_step14.value, 2), n = _step14$value[0], nbrs = _step14$value[1];
          sum = 0;
          _iteratorNormalCompletion15 = true;
          _didIteratorError15 = false;
          _iteratorError15 = undefined;
          _context7.prev = 13;

          for (
          /*istanbul ignore next*/
          _iterator15 = nbrs.values()[Symbol.iterator]();
          /*istanbul ignore next*/
          !(_iteratorNormalCompletion15 = (_step15 = _iterator15.next()).done);
          /*istanbul ignore next*/
          _iteratorNormalCompletion15 = true) {
            /*istanbul ignore next*/
            keydict = _step15.value;
            sum += Object.keys(keydict).length;
          }

          _context7.next = 21;
          break;

        case 17:
          _context7.prev = 17;
          _context7.t0 = _context7["catch"](13);
          _didIteratorError15 = true;
          _iteratorError15 = _context7.t0;

        case 21:
          _context7.prev = 21;
          _context7.prev = 22;

          if (!_iteratorNormalCompletion15 && _iterator15["return"] != null) {
            _iterator15["return"]();
          }

        case 24:
          _context7.prev = 24;

          if (!_didIteratorError15) {
            _context7.next = 27;
            break;
          }

          throw _iteratorError15;

        case 27:
          return _context7.finish(24);

        case 28:
          return _context7.finish(21);

        case 29:
          _context7.next = 31;
          return [n, sum];

        case 31:
          _iteratorNormalCompletion14 = true;
          _context7.next = 7;
          break;

        case 34:
          _context7.next = 40;
          break;

        case 36:
          _context7.prev = 36;
          _context7.t1 = _context7["catch"](5);
          _didIteratorError14 = true;
          _iteratorError14 = _context7.t1;

        case 40:
          _context7.prev = 40;
          _context7.prev = 41;

          if (!_iteratorNormalCompletion14 && _iterator14["return"] != null) {
            _iterator14["return"]();
          }

        case 43:
          _context7.prev = 43;

          if (!_didIteratorError14) {
            _context7.next = 46;
            break;
          }

          throw _iteratorError14;

        case 46:
          return _context7.finish(43);

        case 47:
          return _context7.finish(40);

        case 48:
          _context7.next = 76;
          break;

        case 50:
          _iteratorNormalCompletion16 = true;
          _didIteratorError16 = false;
          _iteratorError16 = undefined;
          _context7.prev = 53;
          _iterator16 = nodesNbrs[Symbol.iterator]();

        case 55:
          if (_iteratorNormalCompletion16 = (_step16 = _iterator16.next()).done) {
            _context7.next = 62;
            break;
          }

          _step16$value = _slicedToArray(_step16.value, 2), n = _step16$value[0], nbrs = _step16$value[1];
          _context7.next = 59;
          return [n, sumEdgeAttribute(nbrs, weight, 1)];

        case 59:
          _iteratorNormalCompletion16 = true;
          _context7.next = 55;
          break;

        case 62:
          _context7.next = 68;
          break;

        case 64:
          _context7.prev = 64;
          _context7.t2 = _context7["catch"](53);
          _didIteratorError16 = true;
          _iteratorError16 = _context7.t2;

        case 68:
          _context7.prev = 68;
          _context7.prev = 69;

          if (!_iteratorNormalCompletion16 && _iterator16["return"] != null) {
            _iterator16["return"]();
          }

        case 71:
          _context7.prev = 71;

          if (!_didIteratorError16) {
            _context7.next = 74;
            break;
          }

          throw _iteratorError16;

        case 74:
          return _context7.finish(71);

        case 75:
          return _context7.finish(68);

        case 76:
        case "end":
          return _context7.stop();
      }
    }
  }, _marked2, null, [[5, 36, 40, 48], [13, 17, 21, 29], [22,, 24, 28], [41,, 43, 47], [53, 64, 68, 76], [69,, 71, 75]]);
}