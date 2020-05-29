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
_Map = _interopRequireDefault(require("../_internals/Map"));

var
/*istanbul ignore next*/
_JSNetworkXError = _interopRequireDefault(require("../exceptions/JSNetworkXError"));

var
/*istanbul ignore next*/
convert = _interopRequireWildcard(require("../convert"));

var
/*istanbul ignore next*/
_internals = require("../_internals");

/*istanbul ignore next*/ function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

/**
 * Base class for directed graphs.
 *
 * A DiGraph stores nodes and edges with optional data, or attributes.
 *
 * DiGraphs hold directed edges.  Self loops are allowed but multiple
 * (parallel) edges are not.
 *
 * Nodes can be strings, numbers or any object with a custom `toString` method.
 *
 * Edges are represented as links between nodes with optional
 * key/value attributes.
 *
 * ### Examples
 *
 * Create an empty graph (a "null graph") with no nodes and no edges.
 *
 * ```
 * var G = new jsnx.DiGraph();
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
 * G.addNodesFrom(new Set('foo', 'bar'));
 * var H = jsnx.completeGraph(10);
 * G.addNodesFrom(H);
 * ```
 *
 * In addition to strings, numbers and arrays, any object that implements a
 * custom `toString` method can be used as node.
 *
 * #### Edges
 *
 * `G` can also be grown by adding edges.
 *
 * Add one edge,
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
 * or a collection of edges,
 *
 * ```
 * G.addEdgesFrom(H.edges);
 * ```
 *
 * If some edges connect nodes not yet in the graph, the nodes are added
 * automatically. There are no errors when adding nodes or edges that already
 * exist.
 *
 * #### Attributes
 *
 * Each graph, node and edge can hold key/value attribute pairs in an associated
 * attribute object (keys must be strings or numbers).
 * By default these are empty, but can added or changed using `addEdge`,
 * `addNode`.
 *
 * ```
 * var G = new jsnx.DiGraph(null, {day: 'Friday'});
 * G.graph
 * // {day: 'Friday'}
 * ```
 *
 * Add node attributes using `addNode()` or `addNodesFrom()`:
 *
 * ```
 * G.addNode(1, {time: '5pm'});
 * G.addNodesFrom([2, [3, {time: '3pm'}]], {time: '2pm'});
 * G.nodes(true);
 * // [[1, {time: '5pm'}], [2, {time: '2pm'}], [3, {time: '3pm'}]]
 * ```
 *
 * Add edge attributes using `addEdge()`, or `addEdgesFrom()`:
 *
 * ```
 * G.addEdge(1, w, {weight: 4.7});
 * G.addEdgesFrom([[3,4], [4,5]], {color: 'red'});
 * ```
 *
 * @see Graph
 * @see MultiGraph
 * @see MultiDiGraph
 */
var DiGraph = /*#__PURE__*/function (_Graph) {
  _inherits(DiGraph, _Graph);

  /**
   * @param {Iterable} optData
   *      Data to initialize graph.  If data=None (default) an empty
   *      graph is created.  The data can be an edge list, or any
   *      JSNetworkX graph object.
   *
   * @param {Object=} optAttr
   *       Attributes to add to graph as key=value pairs.
   */
  function
  /*istanbul ignore next*/
  DiGraph(optData, optAttr) {
    /*istanbul ignore next*/
    var _this;

    _classCallCheck(this, DiGraph);

    /*istanbul ignore next*/
    _this = _possibleConstructorReturn(this, _getPrototypeOf(DiGraph).call(this));

    /*istanbul ignore next*/
    _this.graph = {}; // dictionary for graph attributes

    /*istanbul ignore next*/
    _this.node = new
    /*istanbul ignore next*/
    _Map[
    /*istanbul ignore next*/
    "default"](); // dictionary for node attributes
    // We store two adjacency lists:
    // the  predecessors of node n are stored in the dict self.pred
    // the successors of node n are stored in the dict self.succ=self.adj

    /*istanbul ignore next*/
    _this.adj = new
    /*istanbul ignore next*/
    _Map[
    /*istanbul ignore next*/
    "default"](); // empty adjacency dictionary

    /*istanbul ignore next*/
    _this.pred = new
    /*istanbul ignore next*/
    _Map[
    /*istanbul ignore next*/
    "default"](); // predecessor

    /*istanbul ignore next*/
    _this.succ =
    /*istanbul ignore next*/
    _this.adj; // successor
    //attempt to load graph with data

    if (optData != null) {
      convert.toNetworkxGraph(optData,
      /*istanbul ignore next*/
      _assertThisInitialized(_this));
    } // load graph attributes (must be afte convert)


    Object.assign(
    /*istanbul ignore next*/
    _this.graph, optAttr || {});

    /*istanbul ignore next*/
    _this.edge =
    /*istanbul ignore next*/
    _this.adj;

    /*istanbul ignore next*/
    return _this;
  }
  /**
   * Holds the graph type (class) name for information.
   *
   * @type {string}
   */


  _createClass(DiGraph, [{
    key: "addNode",

    /**
     * Add a single node n and update node attributes.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addNode(1);
     * G.addNode('Hello');
     * G.numberOfNodes();
     * 2
     * ```
     *
     * @see #addNodesFrom
     *
     * @param {Node} n Node
     * @param {Object=} opt_attr_dict Dictionary of node attributes.
     *      Key/value pairs will update existing data associated with the node.
     */
    value: function addNode(n) {
      /*istanbul ignore next*/
      var optAttrDict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!
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
        "default"]('The opt_attr_dict argument must be an object.');
      }

      if (!this.succ.has(n)) {
        this.succ.set(n, new
        /*istanbul ignore next*/
        _Map[
        /*istanbul ignore next*/
        "default"]());
        this.pred.set(n, new
        /*istanbul ignore next*/
        _Map[
        /*istanbul ignore next*/
        "default"]());
        this.node.set(n, optAttrDict);
      } else {
        // update attr even if node already exists
        Object.assign(this.node.get(n), optAttrDict);
      }
    }
    /**
     * Add multiple nodes.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph(); // or DiGraph, MultiGraph, MultiDiGraph
     * G.addNodesFrom([1,2,3]);
     * G.nodes();
     * // [1,2,3]
     * ```
     *
     * Use the second argument to update specific node attributes for every node.
     *
     * ```
     * G.addNodesFrom([1,2], {size: 10});
     * G.addNodesFrom([2,3], {weight: 0.4});
     * ```
     *
     * Use `(node, object)` tuples to update attributes for specific nodes.
     *
     * ```
     * G.addNodesFrom([[1, {size: 11}], [2, {color: 'blue'}]]);
     * G.node.get(1).size
     * // 11
     * var H = new jsnx.Graph();
     * H.addNodesFrom(G.nodes(true));
     * H.node.get(1).size
     * // 11
     * ```
     *
     * @see #addNode
     *
     * @param {Iterable} nodes
     *      An iterable of nodes
     *      OR
     *      An iterable of (node, object) tuples.
     *
     * @param {Object=} optAttr  Update attributes for all nodes in nodes.
     *       Node attributes specified in nodes as a tuple
     *       take precedence over attributes specified generally.
     */

  }, {
    key: "addNodesFrom",
    value: function addNodesFrom(nodes) {
      /*istanbul ignore next*/
      var optAttr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      // if an object, only iterate over the keys

      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      forEach)(nodes, function (n) {
        var newnode = !this.succ.has(n); // test whether n is a (node, attr) tuple

        if (Array.isArray(n) && n.length === 2 &&
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        isPlainObject)(n[1])) {
          var nn = n[0];
          var ndict = n[1];

          if (!this.succ.has(nn)) {
            this.succ.set(nn, new
            /*istanbul ignore next*/
            _Map[
            /*istanbul ignore next*/
            "default"]());
            this.pred.set(nn, new
            /*istanbul ignore next*/
            _Map[
            /*istanbul ignore next*/
            "default"]());
            var newdict =
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            clone)(optAttr);
            Object.assign(newdict, ndict);
            this.node.set(nn, newdict);
          } else {
            var olddict = this.node.get(nn);
            Object.assign(olddict, optAttr, ndict);
          }
        } else if (newnode) {
          this.succ.set(n, new
          /*istanbul ignore next*/
          _Map[
          /*istanbul ignore next*/
          "default"]());
          this.pred.set(n, new
          /*istanbul ignore next*/
          _Map[
          /*istanbul ignore next*/
          "default"]());
          this.node.set(n,
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          clone)(optAttr));
        } else {
          Object.assign(this.node.get(n), optAttr);
        }
      }, this);
    }
    /**
     * Remove node n.
     *
     * Removes the node n and all adjacent edges.
     * Attempting to remove a non-existent node will raise an exception.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2]);
     * G.edges();
     * // [[0,1], [1,2]]
     * G.removeNode(1);
     * G.edges();
     * // []
     * ```
     *
     * @see #removeNodesFrom
     *
     * @param {Node} n  A node in the graph
     */

  }, {
    key: "removeNode",
    value: function removeNode(n) {
      if (this.node[
      /*istanbul ignore next*/
      "delete"](n)) {
        var nbrs = this.succ.get(n);
        nbrs.forEach(function (_, u) {
          this.pred.get(u)[
          /*istanbul ignore next*/
          "delete"](n); // remove all edges n-u in digraph
        }, this);
        this.succ[
        /*istanbul ignore next*/
        "delete"](n); // remove node from succ

        this.pred.get(n).forEach(function (_, u) {
          this.succ.get(u)[
          /*istanbul ignore next*/
          "delete"](n); // remove all edges n-u in digraph
        }, this);
        this.pred[
        /*istanbul ignore next*/
        "delete"](n); // remove node from pred
      } else {
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
        sprintf)('The node "%j" is not in the graph', n));
      }
    }
    /**
     * Remove multiple nodes.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2]);
     * var e = G.nodes(); // [0,1,2]
     * G.removeNodesFrom(e);
     * G.nodes();
     * // []
     * ```
     *
     * @see #removeNode
     *
     * @param {Iterable} nodes  A container of nodes.
     *      If a node in the container is not in the graph it is silently ignored.
     */

  }, {
    key: "removeNodesFrom",
    value: function removeNodesFrom(nodes) {
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      forEach)(nodes, function (n) {
        if (this.succ.has(n)) {
          var succs = this.succ.get(n);
          this.node[
          /*istanbul ignore next*/
          "delete"](n);
          succs.forEach(function (_, u) {
            // remove all edges n-u in digraph
            this.pred.get(u)[
            /*istanbul ignore next*/
            "delete"](n);
          }, this);
          this.succ[
          /*istanbul ignore next*/
          "delete"](n); // remove node from succ

          this.pred.get(n).forEach(function (_, u) {
            // remove all edges n-u in digraph
            this.succ.get(u)[
            /*istanbul ignore next*/
            "delete"](n);
          }, this);
          this.pred[
          /*istanbul ignore next*/
          "delete"](n); // remove node from pred
        }
      }, this);
    }
    /**
     * Add an edge between u and v.
     *
     * The nodes u and v will be automatically added if they are
     * not already in the graph.
     *
     * Edge attributes can be specified with keywords or by providing
     * a object with key/value pairs as third argument.
     *
     *
     * ### Examples
     *
     * The following all add the edge `(1,2)` to graph `G`:
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addEdge(1,2);
     * G.addEdgesFrom([[1,2]]);
     * ```
     *
     * Associate data to edges using an object:
     *
     * ```
     * G.addEdge(1, 2, {weight: 3});
     * G.addEdge(1, 3, {weight: 7, capacity: 15, length: 342.7});
     * ```
     *
     * ### Notes
     *
     * Adding an edge that already exists updates the edge data.
     *
     * Many algorithms designed for weighted graphs use as the edge weight a
     * numerical value assigned to an attribute which by default is 'weight'.
     *
     * @see #addEdgesFrom
     *
     * @param {Node} u Node
     * @param {Node} v Node
     * @param {Object=} optAttrDict Object of edge attributes.
     *      Key/value pairs will update existing data associated with the edge.
     */

  }, {
    key: "addEdge",
    value: function addEdge(u, v) {
      /*istanbul ignore next*/
      var optAttrDict = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

      if (!
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


      if (!this.succ.has(u)) {
        this.succ.set(u, new
        /*istanbul ignore next*/
        _Map[
        /*istanbul ignore next*/
        "default"]());
        this.pred.set(u, new
        /*istanbul ignore next*/
        _Map[
        /*istanbul ignore next*/
        "default"]());
        this.node.set(u, {});
      }

      if (!this.succ.has(v)) {
        this.succ.set(v, new
        /*istanbul ignore next*/
        _Map[
        /*istanbul ignore next*/
        "default"]());
        this.pred.set(v, new
        /*istanbul ignore next*/
        _Map[
        /*istanbul ignore next*/
        "default"]());
        this.node.set(v, {});
      } // add the edge


      var datadict = this.adj.get(u).get(v) || {};
      Object.assign(datadict, optAttrDict);
      this.succ.get(u).set(v, datadict);
      this.pred.get(v).set(u, datadict);
    }
    /**
     * Add all the edges in `ebunch`.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addEdgesFrom([[0,1], [1,2]]); // using a list of edges
     * ```
     *
     * Associate data to edges
     *
     * ```
     * G.addEdgesFrom([[1,2], [2,3]], {weight: 3});
     * G.addEdgesFrom([[3,4], [1,4]], {label: 'WN2898'});
     * ```
     *
     * ### Notes
     *
     * Adding the same edge twice has no effect but any edge data
     * will be updated when each duplicate edge is added.
     *
     * @see #add_edge
     * @see #addWeightedEdgesFrom
     *
     * @param {Iterable} ebunch container of edges
     *      Each edge given in the container will be added to the
     *      graph. The edges must be given as as 2-tuples (u,v) or
     *      3-tuples (u,v,d) where d is a dictionary containing edge data.
     *
     * @param {Object=} optAttrDict Object of edge attributes.
     *      Dictionary of edge attributes.  Key/value pairs will
     *      update existing data associated with each edge.
     */

  }, {
    key: "addEdgesFrom",
    value: function addEdgesFrom(ebunch) {
      /*istanbul ignore next*/
      var optAttrDict = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!
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
        "default"]('The opt_attr_dict argument must be an object.');
      } // process ebunch


      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      forEach)(ebunch, function (edge) {
        var length =
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        size)(edge);
        var u, v, edgeData;

        if (length === 3) {
          u = edge[0];
          v = edge[1];
          edgeData = edge[2];
        } else if (length === 2) {
          u = edge[0];
          v = edge[1];
          edgeData = {};
        } else {
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
          sprintf)('Edge tuple "%j" must be a 2-tuple or 3-tuple.', edge));
        }

        if (!this.succ.has(u)) {
          this.succ.set(u, new
          /*istanbul ignore next*/
          _Map[
          /*istanbul ignore next*/
          "default"]());
          this.pred.set(u, new
          /*istanbul ignore next*/
          _Map[
          /*istanbul ignore next*/
          "default"]());
          this.node.set(u, {});
        }

        if (!this.succ.has(v)) {
          this.succ.set(v, new
          /*istanbul ignore next*/
          _Map[
          /*istanbul ignore next*/
          "default"]());
          this.pred.set(v, new
          /*istanbul ignore next*/
          _Map[
          /*istanbul ignore next*/
          "default"]());
          this.node.set(v, {});
        }

        var datadict = this.adj.get(u).get(v) || {};
        Object.assign(datadict, optAttrDict, edgeData);
        this.succ.get(u).set(v, datadict);
        this.pred.get(v).set(u, datadict);
      }, this);
    }
    /**
     * Remove the edge between u and v.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * G.removeEdge(0,1);
     * ```
     *
     * @see #removeEdgesFrom
     *
     * @param {Node} u Node
     * @param {Node} v Node
     */

  }, {
    key: "removeEdge",
    value: function removeEdge(u, v) {
      var edge = this.succ.get(u);

      if (edge !== undefined && edge[
      /*istanbul ignore next*/
      "delete"](v)) {
        this.pred.get(v)[
        /*istanbul ignore next*/
        "delete"](u);
      } else {
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
        sprintf)('The edge "%j-%j" is not in the graph', u, v));
      }
    }
    /**
     * Remove all edges specified in `ebunch`.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * var ebunch = [[1,2], [2,3]];
     * G.removeEdgesFrom(ebunch);
     * ```
     *
     * ### Notes
     *
     * Will fail silently if an edge in `ebunch` is not in the graph.
     *
     * @param {Iterable} ebunch Iterable of edge tuples
     *      Each edge given in the list or container will be removed
     *      from the graph. The edges can be:
     *        - 2-tuples (u,v) edge between u and v.
     *        - 3-tuples (u,v,k) where k is ignored.
     */

  }, {
    key: "removeEdgesFrom",
    value: function removeEdgesFrom(ebunch) {
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      forEach)(ebunch, function (edge) {
        var u = edge[0]; // ignore edge data if present

        var v = edge[1];

        try {
          this.succ.get(u)[
          /*istanbul ignore next*/
          "delete"](v);
          this.pred.get(v)[
          /*istanbul ignore next*/
          "delete"](u);
        } catch (ex) {
          /*eslint no-empty:0*/
          // pass
        }
      }, this);
    }
    /**
     * Return True if node u has successor v.
     *
     * This is true if graph has the edge u->v.
     *
     * @param {Node} u Node
     * @param {Node} v Node
     * @return {boolean} True if node u has successor v
     */

  }, {
    key: "hasSuccessor",
    value: function hasSuccessor(u, v) {
      return this.succ.has(u) && this.succ.get(u).has(v);
    }
    /**
     * Return True if node u has predecessor v.
     *
     * This is true if graph has the edge u<-v.
     *
     * @param {Node} u Node
     * @param {Node} v Node
     * @return {boolean} True if node u has predecessor v
     */

  }, {
    key: "hasPredecessor",
    value: function hasPredecessor(u, v) {
      return this.pred.has(u) && this.pred.get(u).has(v);
    }
    /**
     * Return an iterator over successor nodes of n.
     *
     * `neighborsIter()` and `successorsIter()` are the same.
     *
     * @param {Node} n Node
     * @return {!Iterator} Iterator over successor nodes of n
     */

  }, {
    key: "successorsIter",
    value: function successorsIter(n) {
      var nbrs = this.succ.get(n);

      if (nbrs !== undefined) {
        return nbrs.keys();
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
      sprintf)('The node "%j" is not in the digraph.', n));
    }
    /**
     * Return an iterator over predecessor nodes of n.
     *
     * @param {Node} n Node
     * @return {!Iterator} Iterator over predecessor nodes of n
     */

  }, {
    key: "predecessorsIter",
    value: function predecessorsIter(n) {
      var nbrs = this.pred.get(n);

      if (nbrs !== undefined) {
        return nbrs.keys();
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
      sprintf)('The node "%j" is not in the digraph.', n));
    }
    /**
     * Return a list of successor nodes of n.
     *
     * `neighbors()` and `successors()` are the same.
     *
     * @param {Node} n Node
     * @return {!Array} List of successor nodes of n
     */

  }, {
    key: "successors",
    value: function successors(n) {
      return Array.from(this.successorsIter(n));
    }
    /**
     * Return list of predecessor nodes of n.
     *
     * @param {Node} n Node
     * @return {!Array} List of predecessor nodes of n
     */

  }, {
    key: "predecessors",
    value: function predecessors(n) {
      return Array.from(this.predecessorsIter(n));
    } // digraph definitions

    /**
     * @alias successors
     */

  }, {
    key: "neighbors",
    value: function neighbors(n) {
      return this.successors(n);
    }
    /**
     * @alias successorsIter
     */

  }, {
    key: "neighborsIter",
    value: function neighborsIter(n) {
      return this.successorsIter(n);
    }
    /**
     * Return an iterator over the edges.
     *
     * Edges are returned as tuples with optional data in the order
     * `(node, neighbor, data)`.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.DiGraph() // or MultiDiGraph, etc
     * G.addPath([0,1,2]);;
     * G.addEdge(2, 3, {weight: 5});
     * Array.from(G.edgesIter());
     * // [[0,1], [1,2], [2,3]]
     * Array.from(G.edgeIter(true)); // default data is {}
     * // [[0,1,{}], [1,2,{}], [2,3,{weight: 5}]]
     * Array.from(G.edgesIter([0,2]));
     * // [[0,1], [2,3]]
     * Array.from(G.edgesIter(0));
     * // [[0,1]]
     * ```
     *
     *
     * ### Notes
     *
     * Nodes in `nbunch` that are not in the graph will be (quietly) ignored.
     *
     * @see #edges
     *
     * @param {?boolean=} optNbunch A container of nodes.
     *       The container will be iterated through once.
     * @param {?boolean=} optData
     *      If True, return edge attribute dict in 3-tuple (u,v,data).
     * @return {!Iterator} An iterator of (u,v) or (u,v,d) tuples of edges.
     */

  }, {
    key: "edgesIter",
    value: /*#__PURE__*/regeneratorRuntime.mark(function edgesIter(optNbunch) {
      var _this2 = this;

      var optData,
          nodesNbrs,
          _iteratorNormalCompletion,
          _didIteratorError,
          _iteratorError,
          _iterator,
          _step,
          nodeNbrs,
          _iteratorNormalCompletion2,
          _didIteratorError2,
          _iteratorError2,
          _iterator2,
          _step2,
          nbrData,
          result,
          _args = arguments;

      return regeneratorRuntime.wrap(function edgesIter$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              optData = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;

              // handle calls with opt_data being the only argument
              if (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              isBoolean)(optNbunch)) {
                optData = optNbunch;
                optNbunch = undefined;
              }

              if (optNbunch === undefined) {
                nodesNbrs = this.adj;
              } else {
                nodesNbrs =
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
                    tuple2)(n, _this2.adj.get(n))
                  );
                });
              }

              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context.prev = 6;
              _iterator = nodesNbrs[Symbol.iterator]();

            case 8:
              if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                _context.next = 41;
                break;
              }

              nodeNbrs = _step.value;
              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 13;
              _iterator2 = nodeNbrs[1][Symbol.iterator]();

            case 15:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context.next = 24;
                break;
              }

              nbrData = _step2.value;
              result = [nodeNbrs[0], nbrData[0]];

              if (optData) {
                result[2] = nbrData[1];
              }

              _context.next = 21;
              return result;

            case 21:
              _iteratorNormalCompletion2 = true;
              _context.next = 15;
              break;

            case 24:
              _context.next = 30;
              break;

            case 26:
              _context.prev = 26;
              _context.t0 = _context["catch"](13);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t0;

            case 30:
              _context.prev = 30;
              _context.prev = 31;

              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }

            case 33:
              _context.prev = 33;

              if (!_didIteratorError2) {
                _context.next = 36;
                break;
              }

              throw _iteratorError2;

            case 36:
              return _context.finish(33);

            case 37:
              return _context.finish(30);

            case 38:
              _iteratorNormalCompletion = true;
              _context.next = 8;
              break;

            case 41:
              _context.next = 47;
              break;

            case 43:
              _context.prev = 43;
              _context.t1 = _context["catch"](6);
              _didIteratorError = true;
              _iteratorError = _context.t1;

            case 47:
              _context.prev = 47;
              _context.prev = 48;

              if (!_iteratorNormalCompletion && _iterator["return"] != null) {
                _iterator["return"]();
              }

            case 50:
              _context.prev = 50;

              if (!_didIteratorError) {
                _context.next = 53;
                break;
              }

              throw _iteratorError;

            case 53:
              return _context.finish(50);

            case 54:
              return _context.finish(47);

            case 55:
            case "end":
              return _context.stop();
          }
        }
      }, edgesIter, this, [[6, 43, 47, 55], [13, 26, 30, 38], [31,, 33, 37], [48,, 50, 54]]);
    }) // alias out_edges to edges

    /**
     * @alias edgesIter
     */

  }, {
    key: "outEdgesIter",
    value: function outEdgesIter(optNbunch, optData) {
      return this.edgesIter(optNbunch, optData);
    }
    /**
     * @alias edges
     */

  }, {
    key: "outEdges",
    value: function outEdges(optNbunch, optData) {
      return this.edges(optNbunch, optData);
    }
    /**
     * Return an iterator over the incoming edges.
     *
     * @see edgesIter
     *
     * @param {?boolean=} optNbunch A container of nodes.
     *       The container will be iterated through once.
     * @param {?boolean=} optData
     *      If True, return edge attribute dict in 3-tuple (u,v,data).
     * @return {!Iterator} An iterator of (u,v) or (u,v,d) tuples of
     *      incoming edges.
     */

  }, {
    key: "inEdgesIter",
    value: /*#__PURE__*/regeneratorRuntime.mark(function inEdgesIter(optNbunch) {
      var _this3 = this;

      var optData,
          nodesNbrs,
          _iteratorNormalCompletion3,
          _didIteratorError3,
          _iteratorError3,
          _iterator3,
          _step3,
          nodeNbrs,
          _iteratorNormalCompletion4,
          _didIteratorError4,
          _iteratorError4,
          _iterator4,
          _step4,
          nbrData,
          result,
          _args2 = arguments;

      return regeneratorRuntime.wrap(function inEdgesIter$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              optData = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : false;

              // handle calls with opt_data being the only argument
              if (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              isBoolean)(optNbunch)) {
                optData = optNbunch;
                optNbunch = undefined;
              }

              if (optNbunch === undefined) {
                nodesNbrs = this.pred;
              } else {
                nodesNbrs =
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
                    tuple2)(n, _this3.pred.get(n))
                  );
                });
              }

              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context2.prev = 6;
              _iterator3 = nodesNbrs[Symbol.iterator]();

            case 8:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context2.next = 41;
                break;
              }

              nodeNbrs = _step3.value;
              _iteratorNormalCompletion4 = true;
              _didIteratorError4 = false;
              _iteratorError4 = undefined;
              _context2.prev = 13;
              _iterator4 = nodeNbrs[1][Symbol.iterator]();

            case 15:
              if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                _context2.next = 24;
                break;
              }

              nbrData = _step4.value;
              result = [nbrData[0], nodeNbrs[0]];

              if (optData) {
                result[2] = nbrData[1];
              }

              _context2.next = 21;
              return result;

            case 21:
              _iteratorNormalCompletion4 = true;
              _context2.next = 15;
              break;

            case 24:
              _context2.next = 30;
              break;

            case 26:
              _context2.prev = 26;
              _context2.t0 = _context2["catch"](13);
              _didIteratorError4 = true;
              _iteratorError4 = _context2.t0;

            case 30:
              _context2.prev = 30;
              _context2.prev = 31;

              if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                _iterator4["return"]();
              }

            case 33:
              _context2.prev = 33;

              if (!_didIteratorError4) {
                _context2.next = 36;
                break;
              }

              throw _iteratorError4;

            case 36:
              return _context2.finish(33);

            case 37:
              return _context2.finish(30);

            case 38:
              _iteratorNormalCompletion3 = true;
              _context2.next = 8;
              break;

            case 41:
              _context2.next = 47;
              break;

            case 43:
              _context2.prev = 43;
              _context2.t1 = _context2["catch"](6);
              _didIteratorError3 = true;
              _iteratorError3 = _context2.t1;

            case 47:
              _context2.prev = 47;
              _context2.prev = 48;

              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }

            case 50:
              _context2.prev = 50;

              if (!_didIteratorError3) {
                _context2.next = 53;
                break;
              }

              throw _iteratorError3;

            case 53:
              return _context2.finish(50);

            case 54:
              return _context2.finish(47);

            case 55:
            case "end":
              return _context2.stop();
          }
        }
      }, inEdgesIter, this, [[6, 43, 47, 55], [13, 26, 30, 38], [31,, 33, 37], [48,, 50, 54]]);
    })
    /**
     * Return a list of the incoming edges.
     *
     * @see #edges
     *
     * @param {?Iterable=} optNbunch A container of nodes.
     *       The container will be iterated through once.
     * @param {?boolean=} opt_data
     *      If True, return edge attribute dict in 3-tuple (u,v,data).
     * @return {!Array} A list of incoming edges
     */

  }, {
    key: "inEdges",
    value: function inEdges(optNbunch) {
      /*istanbul ignore next*/
      var optData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return Array.from(this.inEdgesIter(optNbunch, optData));
    }
    /**
     * Return an iterator for (node, degree).
     *
     * The node degree is the number of edges adjacent to the node.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.DiGraph() // or MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * Array.from(G.degreeIter(0));
     * // [[0, 1]]
     * Array.from(G.degreeIter([0,1]));
     * // [[0, 1], [1, 2]]
     * ```
     *
     * @see #degree
     * @see #inDegree
     * @see #outDegree
     * @see #inDegreeIter
     * @see #outDegreeIter
     *
     * @param {(Node|Iterable)=} optNbunch  A container of nodes.
     *       The container will be iterated through once.
     * @param {string=} optWeight
     *       The edge attribute that holds the numerical value used
     *       as a weight.  If None, then each edge has weight 1.
     *       The degree is the sum of the edge weights adjacent to the node.
     * @return {!Iterator}  The iterator returns two-tuples of (node, degree).
     */

  }, {
    key: "degreeIter",
    value: function degreeIter(optNbunch, optWeight) {
      /*istanbul ignore next*/
      var _this4 = this;

      var nodesNbrs;

      if (optNbunch == null) {
        nodesNbrs =
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        zipIterator)(this.succ.entries(), this.pred.entries());
      } else {
        var tuple2Succ =
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        createTupleFactory)(2);
        var tuple2Pred =
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        createTupleFactory)(2);
        nodesNbrs =
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
          return tuple2Succ(n, _this4.succ.get(n));
        }),
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        mapIterator)(this.nbunchIter(optNbunch), function (n)
        /*istanbul ignore next*/
        {
          return tuple2Pred(n, _this4.pred.get(n));
        }));
      }

      if (optWeight == null) {
        /*eslint no-unused-vars:0*/
        return (
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          mapIterator)(nodesNbrs, function (
          /*istanbul ignore next*/
          _ref)
          /*istanbul ignore next*/
          {
            var _ref2 = _slicedToArray(_ref, 2),
                _ref2$ = _slicedToArray(_ref2[0], 2),
                node = _ref2$[0],
                succ = _ref2$[1],
                _ref2$2 = _slicedToArray(_ref2[1], 2),
                u = _ref2$2[0],
                pred = _ref2$2[1];

            return [node, pred.size + succ.size];
          })
        );
      } else {
        // edge weighted graph - degree is sum of edge weights
        return (
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          mapIterator)(nodesNbrs, function (
          /*istanbul ignore next*/
          _ref3) {
            /*istanbul ignore next*/
            var _ref4 = _slicedToArray(_ref3, 2),
                _ref4$ = _slicedToArray(_ref4[0], 2),
                node = _ref4$[0],
                succ = _ref4$[1],
                _ref4$2 = _slicedToArray(_ref4[1], 2),
                _ = _ref4$2[0],
                pred = _ref4$2[1];

            var sum = 0;

            function sumData(data) {
              var weight = data[optWeight];
              sum += weight != null ? +weight : 1;
            }

            succ.forEach(sumData);
            pred.forEach(sumData);
            return [node, sum];
          })
        );
      }
    }
    /**
     * Return an iterator for (node, in-degree).
     *
     * The node in-degree is the number of edges pointing in to the node.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.DiGraph();
     * G.addPath([0,1,2,3]);
     * Array.from(G.inDegreeIter(0));
     * // [[0, 0]]
     * Array.from(G.inDegreeIter([0,1]));
     * // [[0, 0], [1, ]]
     * ```
     *
     * @see #degree
     * @see #inDegree
     * @see #outDegree
     * @see #outDegreeIter
     *
     * @param {(Node|Iterable)=} optNbunch  A container of nodes.
     *       The container will be iterated through once.
     *
     * @param {string=} optWeight
     *       The edge attribute that holds the numerical value used
     *       as a weight.  If null or undefined, then each edge has weight 1.
     *       The degree is the sum of the edge weights adjacent to the node.
     * @return {Iterator}  The iterator returns two-tuples of (node, in-degree).
     */

  }, {
    key: "inDegreeIter",
    value: function inDegreeIter(optNbunch, optWeight) {
      /*istanbul ignore next*/
      var _this5 = this;

      var nodesNbrs;

      if (optNbunch == null) {
        nodesNbrs = this.pred;
      } else {
        nodesNbrs =
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
            tuple2)(n, _this5.pred.get(n))
          );
        });
      }

      if (optWeight == null) {
        return (
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          mapIterator)(nodesNbrs, function (
          /*istanbul ignore next*/
          _ref5)
          /*istanbul ignore next*/
          {
            var _ref6 = _slicedToArray(_ref5, 2),
                node = _ref6[0],
                pred = _ref6[1];

            return [node, pred.size];
          })
        );
      } else {
        return (
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          mapIterator)(nodesNbrs, function (
          /*istanbul ignore next*/
          _ref7) {
            /*istanbul ignore next*/
            var _ref8 = _slicedToArray(_ref7, 2),
                node = _ref8[0],
                pred = _ref8[1];

            var sum = 0;
            pred.forEach(function (data) {
              var weight = data[optWeight];
              sum += weight != null ? +weight : 1;
            });
            return [node, sum];
          })
        );
      }
    }
    /**
     * Return an iterator for (node, out-degree).
     *
     * The node out-degree is the number of edges pointing in to the node.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.DiGraph();
     * G.addPath([0,1,2,3]);
     * Array.from(G.outDegreeIter(0));
     * // [[0, 1]]
     * Array.from(G.outDegreeIter([0,1]));
     * // [[0, 1], [1, ]]
     *
     *
     * @see #degree
     * @see #inDegree
     * @see #outDegree
     * @see #inDegreeIter
     *
     * @param {(Node|Iterable)=} opt_nbunch  A container of nodes.
     *       The container will be iterated through once.
     * @param {string=} optWeight
     *       The edge attribute that holds the numerical value used
     *       as a weight.  If None, then each edge has weight 1.
     *       The degree is the sum of the edge weights adjacent to the node.
     * @return {Iterator}  The iterator returns two-tuples of (node, out-degree).
     */

  }, {
    key: "outDegreeIter",
    value: function outDegreeIter(optNbunch, optWeight) {
      /*istanbul ignore next*/
      var _this6 = this;

      var nodesNbrs;

      if (optNbunch == null) {
        nodesNbrs = this.succ;
      } else {
        nodesNbrs =
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
            tuple2)(n, _this6.succ.get(n))
          );
        });
      }

      if (optWeight == null) {
        return (
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          mapIterator)(nodesNbrs, function (
          /*istanbul ignore next*/
          _ref9)
          /*istanbul ignore next*/
          {
            var _ref10 = _slicedToArray(_ref9, 2),
                node = _ref10[0],
                succ = _ref10[1];

            return [node, succ.size];
          })
        );
      } else {
        return (
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          mapIterator)(nodesNbrs, function (
          /*istanbul ignore next*/
          _ref11) {
            /*istanbul ignore next*/
            var _ref12 = _slicedToArray(_ref11, 2),
                node = _ref12[0],
                succ = _ref12[1];

            var sum = 0;
            succ.forEach(function (data) {
              var weight = data[optWeight];
              sum += weight != null ? +weight : 1;
            });
            return [node, sum];
          })
        );
      }
    }
    /**
     * Return the in-degree of a node or nodes.
     *
     * The node in-degree is the number of edges pointing in to the node.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.DiGraph(); // or MultiDiGraph
     * G.addPath([0,1,2,3]);
     * G.inDegree(0);
     * // 0
     * G.inDegree([0,1]);
     * // Map {0: 0, 1: 1}
     * Array.from(G.inDegree([0,1]).values());
     * // [0, 1]
     * ```
     *
     * @see #degree
     * @see #outDegree
     * @see #inDegreeIter
     *
     *
     * @param {(Node|Iterable)=} optNbunch  A container of nodes.
     *       The container will be iterated through once.
     * @param {string=} opt_weight
     *       The edge attribute that holds the numerical value used
     *       as a weight.  If None, then each edge has weight 1.
     *       The degree is the sum of the edge weights adjacent to the node.
     * @return {(number|Map)}
     *       A dictionary with nodes as keys and in-degree as values or
     *       a number if a single node is specified.
     */

  }, {
    key: "inDegree",
    value: function inDegree(optNbunch, optWeight) {
      if (optNbunch != null && this.hasNode(optNbunch)) {
        // return a single node
        return (
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          next)(this.inDegreeIter(optNbunch, optWeight))[1]
        );
      } else {
        return new
        /*istanbul ignore next*/
        _Map[
        /*istanbul ignore next*/
        "default"](this.inDegreeIter(optNbunch, optWeight));
      }
    }
    /**
     * Return the out-degree of a node or nodes.
     *
     * The node out-degree is the number of edges pointing out of the node.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.DiGraph(); // or MultiDiGraph
     * G.addPath([0,1,2,3]);
     * G.outDegree(0);
     * // 1
     * G.outDegree([0,1]);
     * // Map {0: 1, 1: 1}
     * Array.from(G.inDegree([0,1]).values());
     * // [1, 1]
     * ```
     *
     * @see #degree
     * @see #out_degree
     * @see #in_degree_iter
     *
     * @param {(Node|Iterable)=} optNbunch  A container of nodes.
     *       The container will be iterated through once.
     * @param {string=} optWeight
     *       The edge attribute that holds the numerical value used
     *       as a weight.  If None, then each edge has weight 1.
     *       The degree is the sum of the edge weights adjacent to the node.
     * @return {(number|Map)}
     *       A dictionary with nodes as keys and in-degree as values or
     *       a number if a single node is specified.
     */

  }, {
    key: "outDegree",
    value: function outDegree(optNbunch, optWeight) {
      if (optNbunch != null && this.hasNode(optNbunch)) {
        // return a single node
        return (
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          next)(this.outDegreeIter(optNbunch, optWeight))[1]
        );
      } else {
        return new
        /*istanbul ignore next*/
        _Map[
        /*istanbul ignore next*/
        "default"](this.outDegreeIter(optNbunch, optWeight));
      }
    }
    /**
     * Remove all nodes and edges from the graph.
     *
     * This also removes the name, and all graph, node, and edge attributes.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * G.clear();
     * G.nodes();
     * // []
     * G.edges();
     * // []
     * ```
     */

  }, {
    key: "clear",
    value: function clear() {
      this.succ.clear();
      this.pred.clear();
      this.node.clear();

      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      clear)(this.graph);
    }
    /**
     * Return True if graph is a multigraph, False otherwise.
     *
     * @return {boolean} True if graph is a multigraph, False otherwise.
     */

  }, {
    key: "isMultigraph",
    value: function isMultigraph() {
      return false;
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
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph(); // or MultiGraph, etc
     * G.addPath([0,1]);
     * var H = G.toDirected();
     * H.edges();
     * // [[0,1], [1,0]]
     * ```
     *
     * If already directed, return a (deep) copy
     *
     * ```
     * var G = new jsnx.DiGraph(); // or MultiDiGraph, etc
     * G.addPath([0,1]);
     * var H = G.toDirected();
     * H.edges();
     * // [[0,1]]
     * ```
     *
     * ### Notes
     *
     * This returns a "deepcopy" of the edge, node, and
     * graph attributes which attempts to completely copy
     * all of the data and references.
     *
     * This is in contrast to the similar `var H = new jsnx.DiGraph(G)` which
     * returns a shallow copy of the data.
     *
     * @return {!DiGraph} A deepcopy of the graph
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
     * If edges in both directions (u,v) and (v,u) exist in the
     * graph, attributes for the new undirected edge will be a combination of
     * the attributes of the directed edges.  The edge data is updated
     * in the (arbitrary) order that the edges are encountered.  For
     * more customized control of the edge attributes use `addEdge()`.
     *
     * This returns a "deepcopy" of the edge, node, and graph attributes which
     * attempts to completely copy all of the data and references.
     *
     * This is in contrast to the similar `var H = new jsnx.Graph(G)`
     * which returns a shallow copy of the data.
     *
     * @param {boolean=} optReciprocal
     *      If True only keep edges that appear in both directions
     *      in the original digraph.
     * @return {!Graph}
     *      An undirected graph with the same name and nodes and
     *      with edge (u,v,data) if either (u,v,data) or (v,u,data)
     *      is in the digraph.  If both edges exist in digraph and
     *      their edge data is different, only one edge is created
     *      with an arbitrary choice of which edge data to use.
     *      You must check and correct for this manually if desired.
     */

  }, {
    key: "toUndirected",
    value: function toUndirected(optReciprocal) {
      var H = new
      /*istanbul ignore next*/
      _Graph2[
      /*istanbul ignore next*/
      "default"]();
      H.name = this.name;
      H.addNodesFrom(this);
      var thisPred = this.pred;

      if (optReciprocal) {
        H.addEdgesFrom(
        /*istanbul ignore next*/

        /*#__PURE__*/
        regeneratorRuntime.mark(function
        /*istanbul ignore next*/
        _callee()
        /*istanbul ignore next*/
        {
          var _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, nodeData, node, predecessors, _iteratorNormalCompletion6, _didIteratorError6, _iteratorError6, _iterator6, _step6, nbrData;

          return regeneratorRuntime.wrap(function _callee$(_context3) {
            while (1) {
              switch (_context3.prev = _context3.next) {
                case 0:
                  _iteratorNormalCompletion5 = true;
                  _didIteratorError5 = false;
                  _iteratorError5 = undefined;
                  _context3.prev = 3;
                  _iterator5 = this.adjacencyIter()[Symbol.iterator]();

                case 5:
                  if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                    _context3.next = 39;
                    break;
                  }

                  nodeData = _step5.value;
                  node = nodeData[0];
                  predecessors = thisPred.get(node);
                  _iteratorNormalCompletion6 = true;
                  _didIteratorError6 = false;
                  _iteratorError6 = undefined;
                  _context3.prev = 12;
                  _iterator6 = nodeData[1][Symbol.iterator]();

                case 14:
                  if (_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done) {
                    _context3.next = 22;
                    break;
                  }

                  nbrData = _step6.value;

                  if (!predecessors.has(nbrData[0])) {
                    _context3.next = 19;
                    break;
                  }

                  _context3.next = 19;
                  return (
                    /*istanbul ignore next*/
                    (0,
                    /*istanbul ignore next*/
                    _internals.
                    /*istanbul ignore next*/
                    tuple3)(node, nbrData[0],
                    /*istanbul ignore next*/
                    (0,
                    /*istanbul ignore next*/
                    _internals.
                    /*istanbul ignore next*/
                    deepcopy)(nbrData[1]))
                  );

                case 19:
                  _iteratorNormalCompletion6 = true;
                  _context3.next = 14;
                  break;

                case 22:
                  _context3.next = 28;
                  break;

                case 24:
                  _context3.prev = 24;
                  _context3.t0 = _context3["catch"](12);
                  _didIteratorError6 = true;
                  _iteratorError6 = _context3.t0;

                case 28:
                  _context3.prev = 28;
                  _context3.prev = 29;

                  if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
                    _iterator6["return"]();
                  }

                case 31:
                  _context3.prev = 31;

                  if (!_didIteratorError6) {
                    _context3.next = 34;
                    break;
                  }

                  throw _iteratorError6;

                case 34:
                  return _context3.finish(31);

                case 35:
                  return _context3.finish(28);

                case 36:
                  _iteratorNormalCompletion5 = true;
                  _context3.next = 5;
                  break;

                case 39:
                  _context3.next = 45;
                  break;

                case 41:
                  _context3.prev = 41;
                  _context3.t1 = _context3["catch"](3);
                  _didIteratorError5 = true;
                  _iteratorError5 = _context3.t1;

                case 45:
                  _context3.prev = 45;
                  _context3.prev = 46;

                  if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                    _iterator5["return"]();
                  }

                case 48:
                  _context3.prev = 48;

                  if (!_didIteratorError5) {
                    _context3.next = 51;
                    break;
                  }

                  throw _iteratorError5;

                case 51:
                  return _context3.finish(48);

                case 52:
                  return _context3.finish(45);

                case 53:
                case "end":
                  return _context3.stop();
              }
            }
          }, _callee, this, [[3, 41, 45, 53], [12, 24, 28, 36], [29,, 31, 35], [46,, 48, 52]]);
        }).call(this));
      } else {
        H.addEdgesFrom(
        /*istanbul ignore next*/

        /*#__PURE__*/
        regeneratorRuntime.mark(function
        /*istanbul ignore next*/
        _callee2()
        /*istanbul ignore next*/
        {
          var _iteratorNormalCompletion7, _didIteratorError7, _iteratorError7, _iterator7, _step7, nodeData, _iteratorNormalCompletion8, _didIteratorError8, _iteratorError8, _iterator8, _step8, nbrData;

          return regeneratorRuntime.wrap(function _callee2$(_context4) {
            while (1) {
              switch (_context4.prev = _context4.next) {
                case 0:
                  _iteratorNormalCompletion7 = true;
                  _didIteratorError7 = false;
                  _iteratorError7 = undefined;
                  _context4.prev = 3;
                  _iterator7 = this.adjacencyIter()[Symbol.iterator]();

                case 5:
                  if (_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done) {
                    _context4.next = 36;
                    break;
                  }

                  nodeData = _step7.value;
                  _iteratorNormalCompletion8 = true;
                  _didIteratorError8 = false;
                  _iteratorError8 = undefined;
                  _context4.prev = 10;
                  _iterator8 = nodeData[1][Symbol.iterator]();

                case 12:
                  if (_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done) {
                    _context4.next = 19;
                    break;
                  }

                  nbrData = _step8.value;
                  _context4.next = 16;
                  return (
                    /*istanbul ignore next*/
                    (0,
                    /*istanbul ignore next*/
                    _internals.
                    /*istanbul ignore next*/
                    tuple3)(nodeData[0], nbrData[0],
                    /*istanbul ignore next*/
                    (0,
                    /*istanbul ignore next*/
                    _internals.
                    /*istanbul ignore next*/
                    deepcopy)(nbrData[1]))
                  );

                case 16:
                  _iteratorNormalCompletion8 = true;
                  _context4.next = 12;
                  break;

                case 19:
                  _context4.next = 25;
                  break;

                case 21:
                  _context4.prev = 21;
                  _context4.t0 = _context4["catch"](10);
                  _didIteratorError8 = true;
                  _iteratorError8 = _context4.t0;

                case 25:
                  _context4.prev = 25;
                  _context4.prev = 26;

                  if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
                    _iterator8["return"]();
                  }

                case 28:
                  _context4.prev = 28;

                  if (!_didIteratorError8) {
                    _context4.next = 31;
                    break;
                  }

                  throw _iteratorError8;

                case 31:
                  return _context4.finish(28);

                case 32:
                  return _context4.finish(25);

                case 33:
                  _iteratorNormalCompletion7 = true;
                  _context4.next = 5;
                  break;

                case 36:
                  _context4.next = 42;
                  break;

                case 38:
                  _context4.prev = 38;
                  _context4.t1 = _context4["catch"](3);
                  _didIteratorError7 = true;
                  _iteratorError7 = _context4.t1;

                case 42:
                  _context4.prev = 42;
                  _context4.prev = 43;

                  if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
                    _iterator7["return"]();
                  }

                case 45:
                  _context4.prev = 45;

                  if (!_didIteratorError7) {
                    _context4.next = 48;
                    break;
                  }

                  throw _iteratorError7;

                case 48:
                  return _context4.finish(45);

                case 49:
                  return _context4.finish(42);

                case 50:
                case "end":
                  return _context4.stop();
              }
            }
          }, _callee2, this, [[3, 38, 42, 50], [10, 21, 25, 33], [26,, 28, 32], [43,, 45, 49]]);
        }).call(this));
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
     * Return the reverse of the graph.
     *
     * The reverse is a graph with the same nodes and edges
     * but with the directions of the edges reversed.
     *
     * @param {boolean=} optCopy (default=True)
     *      If True, return a new DiGraph holding the reversed edges.
     *      If False, reverse the reverse graph is created using
     *      the original graph (this changes the original graph).
     *
     * @return {!DiGraph} A copy of the graph or the graph itself
     */

  }, {
    key: "reverse",
    value: function reverse() {
      /*istanbul ignore next*/
      var optCopy = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;
      var H;

      if (optCopy) {
        H = new this.constructor(null, {
          name: 'Reverse of (' + this.name + ')'
        });
        H.addNodesFrom(this);
        H.addEdgesFrom(
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        mapIterator)(this.edgesIter(null, true), function (edge)
        /*istanbul ignore next*/
        {
          return (
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            tuple3c)(edge[1], edge[0],
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            deepcopy)(edge[2]), edge)
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
        var thisPred = this.pred;
        var thisSucc = this.succ;
        this.succ = thisPred;
        this.pred = thisSucc;
        this.adj = this.succ;
        H = this;
      }

      return H;
    }
    /**
     * Return the subgraph induced on nodes in `nbunch`.
     *
     * The induced subgraph of the graph contains the nodes in `nbunch`
     * and the edges between those nodes.
     *
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * var H = G.subgraph([0,1,2]);
     * H.edges();
     * // [[0,1], [1,2]]
     * ```
     *
     * ### Notes
     *
     * The graph, edge or node attributes just point to the original graph.
     * So changes to the node or edge structure will not be reflected in
     * the original graph while changes to the attributes will.
     *
     * To create a subgraph with its own copy of the edge/node attributes use:
     * `new jsnx.Graph(G.subgraph(nbunch))`.
     *
     * For an inplace reduction of a graph to a subgraph you can remove nodes:
     *
     * ```
     * G.removeNodesFrom(G.nodes().filter(function(n) {
     *      return nbunch.indexOf(n) > -1;
     * }))
     * ```
     *
     * @param {Iterable} nbunch
     *      A container of nodes which will be iterated through once.
     * @return {DiGraph} A subgraph of the graph with the same edge
     *   attributes.
     */

  }, {
    key: "subgraph",
    value: function subgraph(nbunch) {
      var bunch = this.nbunchIter(nbunch);
      var n; // create new graph and copy subgraph into it

      var H = new this.constructor(); // copy node and attribute dictionaries

      /*istanbul ignore next*/
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator9 = bunch[Symbol.iterator](), _step9;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion9 = true) {
          /*istanbul ignore next*/
          n = _step9.value;
          H.node.set(n, this.node.get(n));
        } // namespace shortcuts for speed

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

      var HSucc = H.succ;
      var HPred = H.pred; // add nodes

      /*istanbul ignore next*/
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator10 = H[Symbol.iterator](), _step10;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion10 = true) {
          /*istanbul ignore next*/
          n = _step10.value;
          HSucc.set(n, new
          /*istanbul ignore next*/
          _Map[
          /*istanbul ignore next*/
          "default"]());
          HPred.set(n, new
          /*istanbul ignore next*/
          _Map[
          /*istanbul ignore next*/
          "default"]());
        } // add edges

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

      /*istanbul ignore next*/
      var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator11 = HSucc[Symbol.iterator](), _step11;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion11 = true) {
          /*istanbul ignore next*/
          var unbrs = _step11.value;

          /*istanbul ignore next*/
          var _unbrs = _slicedToArray(unbrs, 2),
              u = _unbrs[0],
              Hnbrs = _unbrs[1];

          /*istanbul ignore next*/
          var _iteratorNormalCompletion12 = true;
          var _didIteratorError12 = false;
          var _iteratorError12 = undefined;

          try {
            for (
            /*istanbul ignore next*/
            var _iterator12 = this.succ.get(u)[Symbol.iterator](), _step12;
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion12 = true) {
              /*istanbul ignore next*/
              var vdataddict = _step12.value;

              /*istanbul ignore next*/
              var _vdataddict = _slicedToArray(vdataddict, 2),
                  v = _vdataddict[0],
                  datadict = _vdataddict[1];

              if (HSucc.has(v)) {
                // add both representations of edge: u-v and v-u
                Hnbrs.set(v, datadict);
                HPred.get(v).set(u, datadict);
              }
            }
          } catch (err) {
            _didIteratorError12 = true;
            _iteratorError12 = err;
          } finally {
            try {
              if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
                _iterator12["return"]();
              }
            } finally {
              if (_didIteratorError12) {
                throw _iteratorError12;
              }
            }
          }
        }
      } catch (err) {
        _didIteratorError11 = true;
        _iteratorError11 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion11 && _iterator11["return"] != null) {
            _iterator11["return"]();
          }
        } finally {
          if (_didIteratorError11) {
            throw _iteratorError11;
          }
        }
      }

      H.graph = this.graph;
      return H;
    }
  }], [{
    key: "__name__",
    get: function get() {
      return 'DiGraph';
    }
  }]);

  return DiGraph;
}(
/*istanbul ignore next*/
_Graph2[
/*istanbul ignore next*/
"default"]);

/*istanbul ignore next*/
exports["default"] = DiGraph;