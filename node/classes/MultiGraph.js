'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var
/*istanbul ignore next*/
_Graph2 = _interopRequireDefault(require("./Graph"));

var
/*istanbul ignore next*/
_JSNetworkXError = _interopRequireDefault(require("../exceptions/JSNetworkXError"));

var
/*istanbul ignore next*/
_internals = require("../_internals");

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
 * An undirected graph class that can store multiedges.
 *
 * Multiedges are multiple edges between two nodes.  Each edge
 * can hold optional data or attributes. A MultiGraph holds undirected edges.
 * Self loops are allowed.
 *
 * Edges are represented as links between nodes with optional
 * key/value attributes.
 *
 * ### Examples
 *
 * Create an empty graph structure (a "null graph") with no nodes and no edges.
 *
 * ```
 * var G = jsnx.MultiGraph();
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
 * G.addNodesFrom([2, 3]);
 * var H = jsnx.Graph();
 * H.addPath([0,1,2,3,4,5,6,7,8,9]);
 * G.addNodesFrom(h);
 * ```
 *
 * In addition to strings and integers, any object that implements a custom
 * `toString` method can be used as node. For example, arrays:
 *
 * ```
 * G.addNode([1,2]);
 * ```
 *
 * #### Edges
 *
 * A graph can also be grown by adding edges.
 *
 * Add one edge,
 *
 * ```
 * G.addEdge(1, 2);
 * ```
 *
 * a list or collection of edges,
 *
 * ```
 * G.addEdgesFrom([[1,2], [1,3]]);
 * G.addEdgesFrom(H.edges());
 * ```
 *
 * If some edges connect nodes not yet in the graph, the nodes are added
 * automatically. If an edge already exists, an addition edge is created and
 * stored using a key to identify the edge. By default, the key is the lowest
 * unused integer.
 *
 * ```
 * G.addEdgesFrom([[4,5,{route: 282}], [4,5,{route: 37}]]);
 * G.get(4);
 * // Map { 3: {0: {}}, 5: {0: {}, 1: {route: 282}, 2: {route: 37}}}
 * ```
 *
 * #### Attributes
 *
 * Each graph, node and edge can hold key/value attribute pairs in an associated
 * attribute "dictionary" (object). By defauly these are empty, but can be added
 * or changed using `addEdge` or `addNode`.
 *
 * ```
 * var G = jsnx.MultiGraph(null, {day: Friday}):
 * G.graph
 * // {day: 'Friday'}
 *
 * G.addNode(1, {time: '5pm'});
 * G.addNodesFrom([3], {time: '2pm'});
 * G.nodes(true);
 * // [[1, {time: '5pm'}], [3, {time: '2pm'}]]
 * ```
 *
 * @see Graph
 * @see DiGraph
 * @see MultiDiGraph
 *
 */
var MultiGraph =
/*#__PURE__*/
function (_Graph) {
  _inherits(MultiGraph, _Graph);

  /**
   * @param {?} optData Data to initialze graph.
   *      If no data is provided, an empty graph is created. The data can be
   *      an edge list or any graph object.
   * @param {Object=} optAttr Attributes to add to graph as key=value pairs.
   */
  function
  /*istanbul ignore next*/
  MultiGraph(optData, optAttr) {
    /*istanbul ignore next*/
    _classCallCheck(this, MultiGraph);

    return _possibleConstructorReturn(this, _getPrototypeOf(MultiGraph).call(this, optData, optAttr));
  }
  /**
   * Holds the graph type (class) name for information.
   * This is compatible to Pythons __name__ property.
   *
   * @type {string}
   */


  _createClass(MultiGraph, [{
    key: "addEdge",

    /**
     * Add an edge between u and v.
     *
     * The nodes u and v will be automatically added if they are
     * not already in the graph.
     *
     * Edge attributes can be specified with keywords or by providing
     * a dictionary with key/value pairs.
     *
     * ### Notes:
     *
     * To replace/update edge data, use the optional key argument
     * to identify a unique edge.  Otherwise a new edge will be created.
     *
     * NetworkX algorithms designed for weighted graphs cannot use
     * multigraphs directly because it is not clear how to handle
     * multiedge weights.  Convert to Graph using edge attribute
     * 'weight' to enable weighted graph algorithms.
     *
     * ### Example
     *
     * The following all add the edge [1,2] to the graph G:
     *
     * ```
     * var G = jsnx.MultiGraph();
     * var e = [1,2];
     * G.addEdge(1, 2);
     * G.addEdge.apply(G, e);
     * G.addEdgesFrom([e]);
     * ```
     * Associate data to edges by passing a data object:
     *
     * ```
     * G.addEdge(1, 2, {weight: 3});
     * G.addEdge(1, 2, 0, {weight: 4}); // update data for key=0
     * G.addEdge(1, 3, {weight: 7, capacity: 15, length: 342.7});
     * ```
     * @see #addEdgesFrom
     *
     * @param {Node} u node
     * @param {Node} v node
     * @param {?(number|string)=} optKey identifier
     *      Used to distinguish multiedges between a pair of nodes. Default is
     *      the lowest unused integer.
     * @param {?Object=} optAttrDict  Dictionary of edge attributes.
     *      Key/value pairs will update existing data associated with the edge.
     */
    value: function addEdge(u, v, optKey, optAttrDict) {
      var type =
      /*istanbul ignore next*/
      _typeof(optKey);

      if (optKey != null && type !== 'number' && type !== 'string') {
        optAttrDict = optKey;
        optKey = null;
      } // set up attribute dict


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
        "default"]('The optAttrDict argument must be an object.');
      } // add nodes


      if (!this.adj.has(u)) {
        this.adj.set(u, new
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        Map());
        this.node.set(u, {});
      }

      if (!this.adj.has(v)) {
        this.adj.set(v, new
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        Map());
        this.node.set(v, {});
      }

      var keydict;

      if (this.adj.get(u).has(v)) {
        keydict = this.adj.get(u).get(v);

        if (optKey == null) {
          // find a unique integer key
          // other methods might be better here?
          optKey = Object.keys(keydict).length;

          while (keydict[optKey]) {
            // ok, because values are objects only
            optKey += 1;
          }
        }

        var datadict = keydict[optKey] || {};
        keydict[optKey] = Object.assign(datadict, optAttrDict);
      } else {
        // selfloops work this way without special treatment
        if (optKey == null) {
          optKey = 0;
        }

        keydict = Object.create(null);
        keydict[optKey] = Object.assign({}, optAttrDict);
        this.adj.get(u).set(v, keydict);
        this.adj.get(v).set(u, keydict);
      }
    }
    /**
     * Add all the edges in `ebunch`.
     *
     * Adding the same edge twice has no effect but any edge data will be updated
     * when each duplicate edge is added.
     *
     * Edge attributes specified in edges as a tuple take precedence over the
     * attributes specified generally.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiGraph();
     * G.addEdgesFrom([[0,1], [1,2]]);
     * ```
     *
     * Associate data to edges
     *
     * ```
     * G.addEdgesFrom([[1,2], [2,3]], {weight: 3});
     * G.addEdgesFrom([[1,2], [2,3]], {label: 'WN2898'});
     * ```
     *
     * @see #addEdge
     * @see #addWeightedEdgesFrom
     *
     *
     * @param {Iterable} ebunch container of edges
     *      Each edge given in the container will be added to the
     *      graph. The edges can be:
     *
     *          - 2-tuples (u,v) or
     *          - 3-tuples (u,v,d) for an edge attribute dict d or
     *          - 4-tuples (u,v,k,d) for an edge identified by key k
     *
     * @param {Object=} optAttrDict Dictionary of edge attributes.
     *       Key/value pairs will update existing data associated with each edge.
     */

  }, {
    key: "addEdgesFrom",
    value: function addEdgesFrom(ebunch, optAttrDict) {
      /*istanbul ignore next*/
      var _this = this;

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
        "default"]('The optAttrDict argument must be an object.');
      } // process ebunch


      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      forEach)(ebunch, function (edge) {
        var u;
        var v;
        var key;
        var data;

        switch (edge.length) {
          case 4:
            u = edge[0];
            v = edge[1];
            key = edge[2];
            data = edge[3];
            break;

          case 3:
            u = edge[0];
            v = edge[1];
            data = edge[2];
            break;

          case 2:
            u = edge[0];
            v = edge[1];
            break;

          default:
            if (!
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            isArrayLike)(edge)) {
              throw new TypeError('Elements in edgelists must be tuples.');
            }

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
            sprintf)('Edge tuple %j must be a 2-tuple, 3-tuple or 4-tuple.', edge));
        }

        var keydict = _this.adj.has(u) ? _this.adj.get(u).get(v) || Object.create(null) : Object.create(null);

        if (key == null) {
          // find a unique integer key
          // other methods might be better here?
          key = Object.keys(keydict).length;

          while (keydict[key]) {
            key += 1;
          }
        }

        var datadict = keydict[key] || {};
        Object.assign(datadict, optAttrDict, data);

        _this.addEdge(u, v, key, datadict);
      });
    }
    /**
     * Remove an edge between u and v.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiGraph();
     * G.addPath([0,1,2,3]);
     * G.removeEdge(0, 1);
     * ```
     *
     * For multiple edges
     *
     * ```
     * var G = new jsnx.MultiGraph();
     * G.addEdgesFrom([[1,2], [1,2], [1,2]]);
     * G.removeEdge(1, 2); // remove a single edge
     * ```
     *
     * For edges with keys
     *
     * ```
     * var G = new jsnx.MultiGraph();
     * G.addEdge(1, 2, 'first');
     * G.addEdge(1, 2, 'second');
     * G.removeEdge(1, 2, 'second');
     * ```
     *
     * @see #removeEdgesFrom
     *
     * @param {Node} u
     * @param {Node} v
     * @param {(number|string)=} optKey
     *      Used to distinguish multiple edges between a pair of nodes.
     *      If null or undefined remove a single (arbitrary) edge between u and v.
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
        neightborsOfU[
        /*istanbul ignore next*/
        "delete"](v);

        if (!
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        nodesAreEqual)(u, v)) {
          this.adj.get(v)[
          /*istanbul ignore next*/
          "delete"](u);
        }
      }
    }
    /**
     * Remove all edges specified in `ebunch`.
     *
     * Will fail silently if an edge in `ebunch` is not in the graph.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiGraph();
     * G.addPath([0,1,2,3]);
     * var ebunch = [[1,2], [2,3]];
     * G.removeEdgesFrom(ebunch);
     * ```
     *
     * Removing multiple copies of edges.
     *
     * ```
     * var G = new jsnx.MultiGraph();
     * G.addEdgesFrom([[1,2], [1,2], [1,2]]);
     * G.removeEdgesFrom([[1,2], [1,2]]);
     * G.edges();
     * // [[1,2]]
     * ```
     *
     * @see #removeEdge
     *
     * @param {?} ebunch list or container of edge tuples
     *      Each edge given in the list or container will be removed
     *      from the graph. The edges can be:
     *
     *        - 2-tuples (u,v) All edges between u and v are removed.
     *        - 3-tuples (u,v,key) The edge identified by key is removed.
     */

  }, {
    key: "removeEdgesFrom",
    value: function removeEdgesFrom(ebunch) {
      /*istanbul ignore next*/
      var _this2 = this;

      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      forEach)(ebunch, function (edge) {
        try {
          _this2.removeEdge(edge[0], edge[1], edge[2]);
        } catch (ex) {
          if (!(ex instanceof
          /*istanbul ignore next*/
          _JSNetworkXError[
          /*istanbul ignore next*/
          "default"])) {
            throw ex;
          }
        }
      });
    }
    /**
     * Return True if the graph has an edge between nodes u and v.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiGraph();
     * G.addPath([0,1,2,3]);
     * G.hasEdge(0,1);
     * // true
     * G.addEdge(0, 1, 'a');
     * G.hasEdge(0, 1, 'a');
     * // true
     * ```
     *
     * The following syntax are equivalent:
     *
     * ```
     * G.hasEdge(0, 1);
     * // true
     * G.get(0).has(1);
     * // true
     * ```
     *
     * @param {Node} u node
     * @param {Node} v node
     * @param {(string|number)=} optKey If specified return true only
     *      if the edge with key is found.
     *
     * @return {boolean} true if edge is in the graph, false otherwise.
     */

  }, {
    key: "hasEdge",
    value: function hasEdge(u, v, optKey) {
      var neighborsOfU = this.adj.get(u);

      if (neighborsOfU) {
        return neighborsOfU.has(v) && (optKey == null || !!neighborsOfU.get(v)[optKey]);
      }

      return false;
    }
    /**
     * Return a list of edges.
     *
     * Edges are returned as tuples with optional data and keys in the order
     * (node, neighbor, key, data).
     *
     * Nodes in `nbunch` that are not in the graph will be (quietly) ignored.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiGraph();
     * G.addPath([0,1,2,3]);
     * G.edges();
     * // [[0,1], [1,2], [2,3]]
     * G.edges(true);
     * // [[0,1,{}], [1,2,{}], [2,3,{}]]
     * G.edges(false, true);
     * // [[0,1,0], [1,2,0], [2,3,0]]
     * G.edges(true, true);
     * // [[0,1,0,{}], [1,2,0,{}], [2,3,0,{}]]
     * G.edges([0,3]);
     * // [[0,1], [3, 2]]
     * G.edges(0);
     * // [[0,1]]
     * ```
     *
     * @see #edgesIter
     *
     * @param {?NodeContainer=} optNbunch A container of nodes.
     *      The container will be iterated through once.
     * @param {?boolean=} optData (default=False)
     *      Return two tuples (u,v) (False) or three-tuples (u,v,data) (True).
     * @param {?boolean=} optKeys (default=False)
     *      Return two tuples (u,v) (False) or three-tuples (u,v,key) (True).
     *
     * @return {!Array} list of edge tuples
     *      Edges that are adjacent to any node in nbunch, or a list
     *      of all edges if nbunch is not specified.
     */

  }, {
    key: "edges",
    value: function edges(optNbunch, optData, optKeys) {
      return Array.from(this.edgesIter(optNbunch, optData, optKeys));
    }
    /**
     * Return an iterator over edges.
     *
     * Edges are returned as tuples with optional data and keys
     * in the order (node, neighbor, key, data).
     *
     * Nodes in nbunch that are not in the graph will be (quietly) ignored.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiGraph();
     * G.addPath([0,1,2,3]);
     * Array.from(G.edgesIter);
     * // [[0,1], [1,2], [2,3]]
     * Array.from(G.edges(true));
     * // [[0,1,{}], [1,2,{}], [2,3,{}]]
     * Array.from(G.edges(false, true));
     * // [[0,1,0], [1,2,0], [2,3,0]]
     * Array.from(G.edges(true, true));
     * // [[0,1,0,{}], [1,2,0,{}], [2,3,0,{}]]
     * Array.from(G.edges([0,3]));
     * // [[0,1], [3, 2]]
     * Array.from(G.edges(0));
     * // [[0,1]]
     * ```
     *
     * @see #edges
     *
     * @param {?(NodeContainer|boolean)=} optNbunch A container of nodes.
     *      The container will be iterated through once.
     * @param {?boolean=} optData (default=False)
     *      If True, return edge attribute dict with each edge.
     * @param {?boolean=} optKeys (default=False)
     *      If True, return edge keys with each edge.
     *
     * @return {!Iterator}
     *      An iterator of (u,v), (u,v,d) or (u,v,key,d) tuples of edges.
     *
     * @override
     * @export
     */

  }, {
    key: "edgesIter",
    value:
    /*#__PURE__*/
    regeneratorRuntime.mark(function edgesIter(optNbunch) {
      var _this3 = this;

      var optData,
          optKeys,
          seen,
          nodesNbrs,
          _iteratorNormalCompletion,
          _didIteratorError,
          _iteratorError,
          _iterator,
          _step,
          _step$value,
          n,
          nbrs,
          _iteratorNormalCompletion2,
          _didIteratorError2,
          _iteratorError2,
          _iterator2,
          _step2,
          _step2$value,
          nbr,
          keydict,
          key,
          tuple,
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

              seen = new
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              Set();
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
                  tuple2)(n, _this3.adj.get(n))
                );
              });
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 8;
              _iterator = nodesNbrs[Symbol.iterator]();

            case 10:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 51;
                break;
              }

              _step$value = _slicedToArray(_step.value, 2), n = _step$value[0], nbrs = _step$value[1];
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 15;
              _iterator2 = nbrs[Symbol.iterator]();

            case 17:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context.next = 34;
                break;
              }

              _step2$value = _slicedToArray(_step2.value, 2), nbr = _step2$value[0], keydict = _step2$value[1];

              if (seen.has(nbr)) {
                _context.next = 31;
                break;
              }

              _context.t0 = regeneratorRuntime.keys(keydict);

            case 21:
              if ((_context.t1 = _context.t0()).done) {
                _context.next = 30;
                break;
              }

              key = _context.t1.value;
              tuple = [n, nbr];

              if (optKeys) {
                tuple[2] = key;
              }

              if (optData) {
                tuple.push(keydict[key]);
              }

              _context.next = 28;
              return tuple;

            case 28:
              _context.next = 21;
              break;

            case 30:
              seen.add(n);

            case 31:
              _iteratorNormalCompletion2 = true;
              _context.next = 17;
              break;

            case 34:
              _context.next = 40;
              break;

            case 36:
              _context.prev = 36;
              _context.t2 = _context["catch"](15);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t2;

            case 40:
              _context.prev = 40;
              _context.prev = 41;

              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }

            case 43:
              _context.prev = 43;

              if (!_didIteratorError2) {
                _context.next = 46;
                break;
              }

              throw _iteratorError2;

            case 46:
              return _context.finish(43);

            case 47:
              return _context.finish(40);

            case 48:
              _iteratorNormalCompletion = true;
              _context.next = 10;
              break;

            case 51:
              _context.next = 57;
              break;

            case 53:
              _context.prev = 53;
              _context.t3 = _context["catch"](8);
              _didIteratorError = true;
              _iteratorError = _context.t3;

            case 57:
              _context.prev = 57;
              _context.prev = 58;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 60:
              _context.prev = 60;

              if (!_didIteratorError) {
                _context.next = 63;
                break;
              }

              throw _iteratorError;

            case 63:
              return _context.finish(60);

            case 64:
              return _context.finish(57);

            case 65:
            case "end":
              return _context.stop();
          }
        }
      }, edgesIter, this, [[8, 53, 57, 65], [15, 36, 40, 48], [41,, 43, 47], [58,, 60, 64]]);
    })
    /**
     * Return the attribute dictionary associated with edge (u,v).
     *
     * ### Example
     *
     * ```
     * var G = jsnx.MultiGraph();
     * G.addPath([0,1,2,3]);
     * G.getEdgeData(0, 1);
     * // {0: {}}
     * G.getEdgeData('a', 'b', null, 0); // edge not in graph, return 0
     * // 0
     * ```
     *
     * @param {Node} u node
     * @param {Node} v node
     * @param {(string|number)=} optKey Return data only for the edge with
     *      specified key.
     * @param {T=} optDefault Value to return if the edge (u,v) is not found.
     *
     * @return {(Object|T)} The edge attribute dictionary.
     * @template T
     */

  }, {
    key: "getEdgeData",
    value: function getEdgeData(u, v, optKey, optDefault) {
      var neightborsOfU = this.adj.get(u);

      if (neightborsOfU) {
        if (optKey == null) {
          return neightborsOfU.get(v) || optDefault;
        }

        return neightborsOfU.has(v) && neightborsOfU.get(v)[optKey] || optDefault;
      }
    }
    /**
     * Return an iterator for (node, degree).
     *
     * The node degree is the number of edges adjacent to the node.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.Graph();
     * G.addPath([0,1,2,3]);
     * Array.from(G.degreeIter(0));
     * // [[0,1]]  // node 0 with degree 1
     * Array.from(G.degreeIter([0,1]));
     * // [[0,1], [1,2]]
     *
     * @see #degree
     *
     * @param {?(Node|NodeContainer)=} optNbunch  A container of nodes
     *      The container will be iterated through once.
     * @param {?string=} optWeight  The edge attribute that holds the numerical
     *      value used as a weight.  If undefined, then each edge has weight 1.
     *      The degree is the sum of the edge weights adjacent to the node.
     *
     * @return {!Iterator} The iterator returns two-tuples of (node, degree).
     */

  }, {
    key: "degreeIter",
    value:
    /*#__PURE__*/
    regeneratorRuntime.mark(function degreeIter(optNbunch, optWeight) {
      var _this4 = this;

      var nodesNbrs, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _iterator3, _step3, _step3$value, n, nbrs, deg, keydict, key;

      return regeneratorRuntime.wrap(function degreeIter$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              if (typeof optNbunch === 'string') {
                optWeight = optNbunch;
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
                  tuple2)(n, _this4.adj.get(n))
                );
              });
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context2.prev = 5;
              _iterator3 = nodesNbrs[Symbol.iterator]();

            case 7:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context2.next = 23;
                break;
              }

              _step3$value = _slicedToArray(_step3.value, 2), n = _step3$value[0], nbrs = _step3$value[1];

              /*eslint no-loop-func:0*/
              deg = 0;

              if (!(optWeight == null)) {
                _context2.next = 16;
                break;
              }

              nbrs.forEach(function (keydict)
              /*istanbul ignore next*/
              {
                return deg += Object.keys(keydict).length;
              });
              _context2.next = 14;
              return [n, deg + +(nbrs.has(n) && Object.keys(nbrs.get(n)).length)];

            case 14:
              _context2.next = 20;
              break;

            case 16:
              // edge weighted graph - degree is sum of nbr edge weights
              nbrs.forEach(function (keydict) {
                for (var key in keydict) {
                  deg +=
                  /*istanbul ignore next*/
                  (0,
                  /*istanbul ignore next*/
                  _internals.
                  /*istanbul ignore next*/
                  getDefault)(keydict[key][optWeight], 1);
                }
              });

              if (nbrs.has(n)) {
                /*istanbul ignore next*/
                keydict = nbrs.get(n);

                for (key in keydict) {
                  deg +=
                  /*istanbul ignore next*/
                  (0,
                  /*istanbul ignore next*/
                  _internals.
                  /*istanbul ignore next*/
                  getDefault)(keydict[key][optWeight], 1);
                }
              }

              _context2.next = 20;
              return [n, deg];

            case 20:
              _iteratorNormalCompletion3 = true;
              _context2.next = 7;
              break;

            case 23:
              _context2.next = 29;
              break;

            case 25:
              _context2.prev = 25;
              _context2.t0 = _context2["catch"](5);
              _didIteratorError3 = true;
              _iteratorError3 = _context2.t0;

            case 29:
              _context2.prev = 29;
              _context2.prev = 30;

              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }

            case 32:
              _context2.prev = 32;

              if (!_didIteratorError3) {
                _context2.next = 35;
                break;
              }

              throw _iteratorError3;

            case 35:
              return _context2.finish(32);

            case 36:
              return _context2.finish(29);

            case 37:
            case "end":
              return _context2.stop();
          }
        }
      }, degreeIter, this, [[5, 25, 29, 37], [30,, 32, 36]]);
    })
    /**
     * Return true if graph is a multigraph, false otherwise.
     *
     * @return {boolean} true if graph is a multigraph, false otherwise.
     */

  }, {
    key: "isMultigraph",
    value: function isMultigraph() {
      return true;
    }
    /**
     * Return true if graph is directed, false otherwise.
     *
     * @return {boolean}  True if graph is directed, False otherwise.
     */

  }, {
    key: "isDirected",
    value: function isDirected() {
      return false;
    }
    /**
     * Return a directed representation of the graph.
     *
     * ### Notes
     *
     * This returns a "deepcopy" of the edge, node, and graph attributes which
     * attempts to completely copy all of the data and references.
     *
     * This is in contrast to the similar D = DiGraph(G) which returns a shallow
     * copy of the data.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiGraph();
     * G.addPath([0,1]);
     * var H = G.toDirected();
     * G.edges();
     * // [[0,1], [1,0]]
     * ```
     *
     * If already directed, return a (deep) copy
     *
     * ```
     * var G = new jsnx.MultiDiGraph();
     * G.addPath([0,1]);
     * var H = G.toDirected();
     * G.edges();
     * // [[0,1]]
     * ```
     *
     * @return {!MultiDiGraph}
     *      A directed graph with the same name, same nodes, and with
     *      each edge (u,v,data) replaced by two directed edges
     *      (u,v,data) and (v,u,data).
     */

  }, {
    key: "toDirected",
    value: function toDirected() {
      var G = new (require('./MultiDiGraph'))();
      G.addNodesFrom(this);

      /*istanbul ignore next*/
      var _iteratorNormalCompletion4 = true;
      var _didIteratorError4 = false;
      var _iteratorError4 = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator4 = this.adjacencyIter()[Symbol.iterator](), _step4;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion4 = true) {
          /*istanbul ignore next*/
          var _step4$value = _slicedToArray(_step4.value, 2),
              u = _step4$value[0],
              nbrs = _step4$value[1];

          /*istanbul ignore next*/
          var _iteratorNormalCompletion5 = true;
          var _didIteratorError5 = false;
          var _iteratorError5 = undefined;

          try {
            for (
            /*istanbul ignore next*/
            var _iterator5 = nbrs[Symbol.iterator](), _step5;
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion5 = true) {
              /*istanbul ignore next*/
              var _step5$value = _slicedToArray(_step5.value, 2),
                  v = _step5$value[0],
                  keydict = _step5$value[1];

              for (var key in keydict) {
                G.addEdge(u, v, key,
                /*istanbul ignore next*/
                (0,
                /*istanbul ignore next*/
                _internals.
                /*istanbul ignore next*/
                deepcopy)(keydict[key]));
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

      G.graph =
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      deepcopy)(this.graph);
      G.node =
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      deepcopy)(this.node);
      return G;
    }
    /**
     * Return a list of selfloop edges.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiGraph();
     * G.addEdge(1, 1);
     * G.addEdge(1, 2);
     * G.selfloopEdges();
     * // [[1,1]]
     * G.selfloopEdges(true);
     * // [[1,1,{}]]
     * G.selfloopEdges(false, true);
     * // [[1,1,0]]
     * G.selfloopEdges(true, true);
     * // [[1,1,0,{}]]
     * ```
     *
     * @see #nodesWithSelfloops
     * @see #numberOfSelfloops
     *
     *
     * @param {boolean=} optData  (default=False)
     *      Return selfloop edges as two tuples (u,v) (data=False)
     *      or three-tuples (u,v,data) (data=True)
     * @param {boolean=} optKeys  (default=False)
     *       If True, return edge keys with each edge
     *
     * @return {Array} A list of all selfloop edges
     */

  }, {
    key: "selfloopEdges",
    value: function selfloopEdges() {
      /*istanbul ignore next*/
      var optData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      /*istanbul ignore next*/
      var optKeys = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      var edges = [];

      /*istanbul ignore next*/
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator6 = this.adj[Symbol.iterator](), _step6;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion6 = true)
        /*istanbul ignore next*/
        {
          var _step6$value = _slicedToArray(_step6.value, 2),
              n = _step6$value[0],
              nbrs = _step6$value[1];

          if (nbrs.has(n)) {
            var keydict = nbrs.get(n);

            for (var key in keydict) {
              var edge = [n, n];

              if (optKeys) {
                edge[2] = key;
              }

              if (optData) {
                edge.push(keydict[key]);
              }

              edges.push(edge);
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

      return edges;
    }
    /**
     * Return the number of edges between two nodes.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.MultiGraph();
     * G.addPath([0,1,2,3]);
     * G.numberOfEdges();
     * // 3
     * G.numberOfEdges(0,1);
     * // 1
     * ```
     *
     * @see #size
     *
     * @param {Node=} optU node
     * @param {Node=} optV node
     *      If u and v are specified, return the number of edges between
     *      u and v. Otherwise return the total number of all edges.
     *
     * @return {number} The number of edges in the graph.
     *      If nodes u and v are specified return the number of edges between
     *      those nodes.
     */

  }, {
    key: "numberOfEdges",
    value: function numberOfEdges(optU, optV) {
      if (optU == null || optV == null) {
        return this.size();
      }

      var neightborsOfU = this.get(optU);

      if (neightborsOfU) {
        return neightborsOfU.has(optV) ? Object.keys(neightborsOfU.get(optV)).length : 0;
      }

      return 0;
    }
    /**
     * Return the subgraph induced on nodes in nbunch.
     *
     * The induced subgraph of the graph contains the nodes in nbunch and the
     * edges between those nodes.
     *
     * ### Notes
     *
     * The graph, edge or node attributes just point to the original graph.
     * So changes to the node or edge structure will not be reflected in
     * the original graph while changes to the attributes will.
     *
     * To create a subgraph with its own copy of the edge/node attributes use:
     * `jsnx.Graph(G.subgraph(nbunch))`
     *
     * If edge attributes are containers, a deep copy can be obtained using:
     * `G.subgraph(nbunch).copy()`.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.Graph();
     * G.addPath([0,1,2,3]);
     * var H = G.subgraph([0,1,2]);
     * H.edges();
     * // [[0,1], [1,2]]
     * ```
     *
     * @param {NodeContainer=} nbunch A container of nodes which will be
     *      iterated through once.
     * @return {MultiGraph} A subgraph of the graph with the same edge attributes.
     */

  }, {
    key: "subgraph",
    value: function subgraph(nbunch) {
      var bunch = this.nbunchIter(nbunch); // create new graph and copy subgraph into it

      var H = new this.constructor(); // copy node and attribute dictionaries

      this.node.forEach(function (d, n)
      /*istanbul ignore next*/
      {
        return H.node.set(n, d);
      }); // namespace shortcuts for speed

      var HAdj = H.adj,
          thisAdj = this.adj; // add nodes and edges (undirected method)

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
          var Hnbrs = new
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          Map();
          HAdj.set(n, Hnbrs);

          /*istanbul ignore next*/
          var _iteratorNormalCompletion8 = true;
          var _didIteratorError8 = false;
          var _iteratorError8 = undefined;

          try {
            for (
            /*istanbul ignore next*/
            var _iterator8 = thisAdj.get(n)[Symbol.iterator](), _step8;
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion8 = true) {
              /*istanbul ignore next*/
              var _step8$value = _slicedToArray(_step8.value, 2),
                  nbr = _step8$value[0],
                  edgedict = _step8$value[1];

              if (HAdj.has(nbr)) {
                // add both representations of edge: n-nbr and nbr-n
                // they share the same edgedict
                var ed =
                /*istanbul ignore next*/
                (0,
                /*istanbul ignore next*/
                _internals.
                /*istanbul ignore next*/
                clone)(edgedict);
                Hnbrs.set(nbr, ed);
                HAdj.get(nbr).set(n, ed);
              }
            }
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

      H.graph = this.graph;
      return H;
    }
  }], [{
    key: "__name__",
    get: function get() {
      return 'MultiGraph';
    }
  }]);

  return MultiGraph;
}(
/*istanbul ignore next*/
_Graph2[
/*istanbul ignore next*/
"default"]);

/*istanbul ignore next*/
exports["default"] = MultiGraph;