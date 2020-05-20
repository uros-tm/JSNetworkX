'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var
/*istanbul ignore next*/
_KeyError = _interopRequireDefault(require("../exceptions/KeyError"));

var
/*istanbul ignore next*/
_Map = _interopRequireDefault(require("../_internals/Map"));

var
/*istanbul ignore next*/
_Set = _interopRequireDefault(require("../_internals/Set"));

var
/*istanbul ignore next*/
_JSNetworkXError = _interopRequireDefault(require("../exceptions/JSNetworkXError"));

var
/*istanbul ignore next*/
_isBoolean = _interopRequireDefault(require("lodash/isBoolean"));

var
/*istanbul ignore next*/
_isString = _interopRequireDefault(require("lodash/isString"));

var
/*istanbul ignore next*/
convert = _interopRequireWildcard(require("../convert"));

var
/*istanbul ignore next*/
_internals = require("../_internals");

/*istanbul ignore next*/ function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

/*jshint expr:false*/

/*
 * Base class for undirected graphs.
 *
 * A Graph stores nodes and edges with optional data, or attributes.
 *
 * Graphs hold undirected edges.  Self loops are allowed but multiple
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
 * var G = new jsnx.Graph();
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
 * var G = new jsnx.Graph(null, {day: 'Friday'});
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
 * @see DiGraph
 * @see MultiGraph
 * @see MultiDiGraph
 */
var Graph =
/*#__PURE__*/
function () {
  /*
   * @param {Iterable} optData Data to initialize graph.  If `data` is not
   *    provided, an empty graph is created. The data can be an edge list, or
   *    any JSNetworkX graph object.
   * @param {Object=} optAttr (default=no attributes)
   *    Attributes to add to graph as key=value pairs.
   */
  function
  /*istanbul ignore next*/
  Graph(optData, optAttr) {
    /*istanbul ignore next*/
    _classCallCheck(this, Graph);

    // makes it possible to call Graph without new
    if (!(this instanceof Graph)) {
      return new Graph(optData, optAttr);
    }

    this.graph = {}; // dictionary for graph attributes

    this.node = new
    /*istanbul ignore next*/
    _Map[
    /*istanbul ignore next*/
    "default"](); // empty node dict (created before convert)

    this.adj = new
    /*istanbul ignore next*/
    _Map[
    /*istanbul ignore next*/
    "default"](); // empty adjacency dict
    // attempt to load graph with data

    if (optData != null) {
      convert.toNetworkxGraph(optData, this);
    } // load graph attributes (must be after convert)


    if (optAttr) {
      Object.assign(this.graph, optAttr);
    }

    this.edge = this.adj;
  }
  /**
   * Holds the graph type (class) name for information.
   *
   * @type {string}
   */


  _createClass(Graph, [{
    key: "toString",

    /**
     * Return the graph name
     *
     * @return {string} Graph name.
     */
    value: function toString() {
      return this.name;
    }
    /**
     * Return a Map of neighbors of node n.
     *
     * @param {Node} n  A node in the graph.
     *
     * @return {!Map} The adjacency dictionary for nodes connected to n.
     */

  }, {
    key: "get",
    value: function get(n) {
      var value = this.adj.get(n);

      if (typeof value === 'undefined') {
        throw new
        /*istanbul ignore next*/
        _KeyError[
        /*istanbul ignore next*/
        "default"]('Graph does not contain node ' + n + '.');
      }

      return value;
    }
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

  }, {
    key: "addNode",
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
        "default"]('The attr_dict argument must be an object.');
      }

      if (!this.node.has(n)) {
        this.adj.set(n, new
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

      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      forEach)(nodes, function (node) {
        if (Array.isArray(node) && node.length === 2 &&
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        isPlainObject)(node[1])) {
          /*istanbul ignore next*/
          var _node = _slicedToArray(node, 2),
              nn = _node[0],
              ndict = _node[1];

          if (!this.adj.has(nn)) {
            this.adj.set(nn, new
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
            this.node.set(nn, Object.assign(newdict, ndict));
          } else {
            var olddict = this.node.get(nn);
            Object.assign(olddict, optAttr, ndict);
          }

          return; // continue next iteration
        }

        var newnode = !this.node.has(node);

        if (newnode) {
          this.adj.set(node, new
          /*istanbul ignore next*/
          _Map[
          /*istanbul ignore next*/
          "default"]());
          this.node.set(node,
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          clone)(optAttr));
        } else {
          Object.assign(this.node.get(node), optAttr);
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
      var adj = this.adj;

      if (this.node[
      /*istanbul ignore next*/
      "delete"](n)) {
        adj.get(n).forEach(function (_, u)
        /*istanbul ignore next*/
        {
          return adj.get(u)[
          /*istanbul ignore next*/
          "delete"](n);
        } // remove all edges n-u in graph
        );
        adj[
        /*istanbul ignore next*/
        "delete"](n); // now remove node
      } else {
        throw new
        /*istanbul ignore next*/
        _JSNetworkXError[
        /*istanbul ignore next*/
        "default"]('The node %s is not in the graph', n);
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
      var adj = this.adj;
      var node = this.node;

      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      forEach)(nodes, function (n) {
        if (node[
        /*istanbul ignore next*/
        "delete"](n)) {
          adj.get(n).forEach(function (_, u)
          /*istanbul ignore next*/
          {
            return adj.get(u)[
            /*istanbul ignore next*/
            "delete"](n);
          });
          adj[
          /*istanbul ignore next*/
          "delete"](n);
        }
      });
    }
    /**
     * Return an iterator over the nodes.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2]);
     * var data = [];
     * Array.from(G.nodesIter(true)).map(([node, data]) => data);
     * // [{}, {}, {}]
     * ```
     *
     * ### Notes
     *
     * If the node is not required, it is simpler and equivalent to use `G`, e.g.
     * `Array.from(G)` or `for (var node of G)`.
     *
     * @param {boolean=} optData If false the iterator returns
     *   nodes. If true return a two-tuple of node and node data dictionary.
     *
     * @return {Iterator} of nodes If data=true the iterator gives
     *           two-tuples containing (node, node data, dictionary).
     */

  }, {
    key: "nodesIter",
    value: function nodesIter() {
      /*istanbul ignore next*/
      var optData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

      if (optData) {
        return (
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          toIterator)(this.node)
        );
      }

      return this.node.keys();
    }
    /**
     * Return a list of the nodes in the graph.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2]);
     * G.nodes();
     * // [0,1,2]
     * G.addNode(1, {time: '5pm'});
     * G.nodes(true);
     * // [[0,{}], [1,{time: '5pm'}], [2,{}]]
     * ```
     *
     * @param {boolean=} optData If false the iterator returns
     *   nodes. If true return a two-tuple of node and node data dictionary.
     *
     * @return {!Array} of nodes If data=true a list of two-tuples containing
     *           (node, node data object).
     */

  }, {
    key: "nodes",
    value: function nodes() {
      /*istanbul ignore next*/
      var optData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      return Array.from(optData ? this.node.entries() : this.node.keys());
    }
    /**
     * Return the number of nodes in the graph.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2]);
     * G.numberOfNodes();
     * // 3
     * ```
     *
     * @see #order
     *
     * @return {number} The number of nodes in the graph.
     */

  }, {
    key: "numberOfNodes",
    value: function numberOfNodes() {
      return this.node.size;
    }
    /**
     * Return the number of nodes in the graph.
     *
     * @see #numberOfNodes
     *
     * @return {number} The number of nodes in the graph.
     */

  }, {
    key: "order",
    value: function order() {
      return this.node.size;
    }
    /**
     * Return true if the graph contains the node n.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2]);
     * G.hasNode(0);
     * // true
     * ```
     *
     * @param {Node} n node.
     * @return {boolean}
     */

  }, {
    key: "hasNode",
    value: function hasNode(n) {
      return this.node.has(n);
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
    value: function addEdge(u, v, optAttrDict) {
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
        "default"]('The attr_dict argument must be an object.');
      } // add nodes


      if (!this.node.has(u)) {
        this.adj.set(u, new
        /*istanbul ignore next*/
        _Map[
        /*istanbul ignore next*/
        "default"]());
        this.node.set(u, {});
      }

      if (!this.node.has(v)) {
        this.adj.set(v, new
        /*istanbul ignore next*/
        _Map[
        /*istanbul ignore next*/
        "default"]());
        this.node.set(v, {});
      } // add the edge


      var datadict = this.adj.get(u).get(v) || {};
      Object.assign(datadict, optAttrDict);
      this.adj.get(u).set(v, datadict);
      this.adj.get(v).set(u, datadict);
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
    value: function addEdgesFrom(ebunch, optAttrDict) {
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
        "default"]('The attr_dict argument must be an object.');
      } // process ebunch


      /*istanbul ignore next*/
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator = ebunch[Symbol.iterator](), _step;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion = true) {
          /*istanbul ignore next*/
          var tuple = _step.value;

          if (tuple.length == null) {
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
            sprintf)('Edge tuple %j must be a 2-tuple or 3-tuple.', tuple));
          }

          /*istanbul ignore next*/
          var _tuple = _slicedToArray(tuple, 3),
              u = _tuple[0],
              v = _tuple[1],
              data = _tuple[2];

          if (!
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          isPlainObject)(data)) {
            data = {};
          }

          if (u == null || v == null || tuple[3] != null) {
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
            sprintf)('Edge tuple %j must be a 2-tuple or 3-tuple.', tuple));
          }

          if (!this.node.has(u)) {
            this.adj.set(u, new
            /*istanbul ignore next*/
            _Map[
            /*istanbul ignore next*/
            "default"]());
            this.node.set(u, {});
          }

          if (!this.node.has(v)) {
            this.adj.set(v, new
            /*istanbul ignore next*/
            _Map[
            /*istanbul ignore next*/
            "default"]());
            this.node.set(v, {});
          } // add the edge


          var datadict = this.adj.get(u).get(v) || {};
          Object.assign(datadict, optAttrDict, data);
          this.adj.get(u).set(v, datadict);
          this.adj.get(v).set(u, datadict);
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
    /**
     * Add all the edges in `ebunch` as weighted edges with specified weights.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addWeightedEdgesFrom([[0,1,3.0], [1,2,7.5]]);
     * ```
     *
     * ### Note
     *
     * Adding the same edge twice for Graph/DiGraph simply updates
     * the edge data.  For MultiGraph/MultiDiGraph, duplicate edges
     * are stored.
     *
     * @see #addEdge
     * @see #addEdgesFrom
     *
     * @param {Iterable} ebunch  container of edges
     *      Each edge given in the list or container will be added
     *      to the graph. The edges must be given as 3-tuples (u,v,w)
     *      where w is a number.
     * @param {string=} optWeight (default 'weight')
     *      The attribute name for the edge weights to be added.
     * @param {Object=} optAttr Edge attributes to add/update for all edges.
     */

  }, {
    key: "addWeightedEdgesFrom",
    value: function addWeightedEdgesFrom(ebunch, optWeight, optAttr) {
      optAttr = optAttr || {};

      if (!
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _isString[
      /*istanbul ignore next*/
      "default"])(optWeight)) {
        optAttr = optWeight;
        optWeight = 'weight';
      }

      this.addEdgesFrom(
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      mapSequence)(ebunch, function (e) {
        var attr = {};
        attr[optWeight] = e[2];

        if (attr[optWeight] == null) {
          // simulate too few value to unpack error
          throw new TypeError('Values must consist of three elements: %s.', e);
        }

        return [e[0], e[1], attr];
      }), optAttr);
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
      var node = this.adj.get(u);

      if (node != null) {
        node[
        /*istanbul ignore next*/
        "delete"](v); // self-loop needs only one entry removed

        var vnode = this.adj.get(v);

        if (vnode !== node) {
          vnode[
          /*istanbul ignore next*/
          "delete"](u);
        }
      } else {
        throw new
        /*istanbul ignore next*/
        _JSNetworkXError[
        /*istanbul ignore next*/
        "default"]('The edge %s-%s is not in the graph', u, v);
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
      var adj = this.adj;

      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      forEach)(ebunch, function (
      /*istanbul ignore next*/
      _ref) {
        /*istanbul ignore next*/
        var _ref2 = _slicedToArray(_ref, 2),
            u = _ref2[0],
            v = _ref2[1];

        var unode = adj.get(u);

        if (unode != null && unode.has(v)) {
          unode[
          /*istanbul ignore next*/
          "delete"](v);
          var vnode = adj.get(v);

          if (vnode !== unode) {
            vnode[
            /*istanbul ignore next*/
            "delete"](u);
          }
        }
      });
    }
    /**
     * Return True if the edge (u,v) is in the graph.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * G.hasEdge(0, 1);
     * // true
     * var edge = [0, 1];
     * G.hasEdge.apply(G, edge);
     * // true
     * ```
     *
     * @param {Node} u Node.
     * @param {Node} v Node.
     *
     * @return {boolean} True if edge is in the graph, False otherwise.
     */

  }, {
    key: "hasEdge",
    value: function hasEdge(u, v) {
      var unode = this.adj.get(u);
      return unode && unode.has(v);
    }
    /**
     * Return a list of the nodes connected to the node n.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * G.neighbors(0);
     * // [1]
     * ```
     *
     * ### Notes
     *
     * It can be more convenient to access the adjacency map as `G.get(n)`:
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addEdge('a', 'b', {weight: 7});
     * G.get('a');
     * // Map {'b': {weight: 7}}
     * ```
     *
     * @param {!Node} n A node in the graph.
     * @return {!Array} A list of nodes that are adjacent to n.
     */

  }, {
    key: "neighbors",
    value: function neighbors(n) {
      return Array.from(this.neighborsIter(n));
    }
    /**
     * Return an iterator over all neighbors of node n.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * Array.from(G.neighborsIter(0));
     * // [1]
     * ```
     *
     * You could also iterate over the adjacency map instead:
     *
     * ```
     * Array.from(G.get(0).keys());
     * ```
     *
     * @param {!Node} n A node in the graph.
     * @return {!Iterator} A list of nodes that are adjacent to n.
     */

  }, {
    key: "neighborsIter",
    value: function neighborsIter(n) {
      var node = this.adj.get(n);

      if (node != null) {
        return node.keys();
      } else {
        throw new
        /*istanbul ignore next*/
        _JSNetworkXError[
        /*istanbul ignore next*/
        "default"]('The node %s is not in the graph.', n);
      }
    }
    /**
     * Return a list of edges.
     *
     * Edges are returned as tuples with optional data
     * in the order (node, neighbor, data).
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2]);
     * G.addEdge(2, 3, {weight: 5});
     * G.edges();
     * // [[0,1], [1,2], [2,3]]
     * G.edges(true);
     * // [[0,1,{}], [1,2,{}], [2,3, {weight: 5}]
     * G.edges([0,3]);
     * // [[0,1], [3,2]]
     * G.edges(0);
     * // [[0,1]]
     * ```
     *
     * ### Note
     *
     * Nodes in `nbunch` that are not in the graph will be (quietly) ignored.
     * For directed graphs this returns the out-edges.
     *
     * @param {?(Node|Iterable)=} optNbunch A container of nodes.
     *      The container will be iterated through once.
     * @param {?boolean=} optData Return two tuples (u,v) (False)
     *      or three-tuples (u,v,data) (True).
     * @return {!Array} list of edge tuples
     *      Edges that are adjacent to any node in nbunch, or a list
     *      of all edges if nbunch is not specified.
     */

  }, {
    key: "edges",
    value: function edges(optNbunch) {
      /*istanbul ignore next*/
      var optData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
      return Array.from(this.edgesIter(optNbunch, optData));
    }
    /**
     * Return an iterator over the edges.
     *
     * Edges are returned as tuples with optional data
     * in the order (node, neighbor, data).
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2]);
     * G.addEdge(2, 3, {weight: 5});
     * Array.from(G.edgesIter());
     * // [[0,1], [1,2], [2,3]]
     * Array.from(G.edgesIter(true));
     * // [[0,1,{}], [1,2,{}], [2,3, {weight: 5}]
     * Array.from(G.edgesIter([0,3]));
     * // [[0,1], [3,2]]
     * Array.from(G.edgesIter(0));
     * // [[0,1]]
     * ```
     *
     * ### Note
     *
     * Nodes in `nbunch` that are not in the graph will be (quietly) ignored.
     * For directed graphs this returns the out-edges.
     *
     * @param {?(Node|Iterable)=} optNbunch A container of nodes.
     *      The container will be iterated through once.
     * @param {?boolean=} optData Return two tuples (u,v) (False)
     *      or three-tuples (u,v,data) (True).
     * @return {!Iterator} iterater if `(u,v)` or `(u,v,d)` edge tuples
     */

  }, {
    key: "edgesIter",
    value:
    /*#__PURE__*/
    regeneratorRuntime.mark(function edgesIter(optNbunch) {
      var optData,
          seen,
          nodesNbrs,
          adj,
          _iteratorNormalCompletion2,
          _didIteratorError2,
          _iteratorError2,
          _iterator2,
          _step2,
          nodeData,
          node,
          _iteratorNormalCompletion3,
          _didIteratorError3,
          _iteratorError3,
          _iterator3,
          _step3,
          neighborsData,
          _args = arguments;

      return regeneratorRuntime.wrap(function edgesIter$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              optData = _args.length > 1 && _args[1] !== undefined ? _args[1] : false;

              // handle calls with data being the only argument
              if (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _isBoolean[
              /*istanbul ignore next*/
              "default"])(optNbunch)) {
                optData = optNbunch;
                optNbunch = null;
              } // helper dict to keep track of multiply stored edges


              seen = new
              /*istanbul ignore next*/
              _Set[
              /*istanbul ignore next*/
              "default"]();

              if (optNbunch == null) {
                nodesNbrs = this.adj.entries();
              } else {
                /*istanbul ignore next*/
                adj = this.adj;
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
                    tuple2)(n, adj.get(n))
                  );
                });
              }

              _iteratorNormalCompletion2 = true;
              _didIteratorError2 = false;
              _iteratorError2 = undefined;
              _context.prev = 7;
              _iterator2 = nodesNbrs[Symbol.iterator]();

            case 9:
              if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                _context.next = 50;
                break;
              }

              nodeData = _step2.value;
              node = nodeData[0];
              _iteratorNormalCompletion3 = true;
              _didIteratorError3 = false;
              _iteratorError3 = undefined;
              _context.prev = 15;
              _iterator3 = nodeData[1].entries()[Symbol.iterator]();

            case 17:
              if (_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done) {
                _context.next = 31;
                break;
              }

              neighborsData = _step3.value;

              if (seen.has(neighborsData[0])) {
                _context.next = 28;
                break;
              }

              if (!optData) {
                _context.next = 26;
                break;
              }

              neighborsData.unshift(node);
              _context.next = 24;
              return neighborsData;

            case 24:
              _context.next = 28;
              break;

            case 26:
              _context.next = 28;
              return [node, neighborsData[0]];

            case 28:
              _iteratorNormalCompletion3 = true;
              _context.next = 17;
              break;

            case 31:
              _context.next = 37;
              break;

            case 33:
              _context.prev = 33;
              _context.t0 = _context["catch"](15);
              _didIteratorError3 = true;
              _iteratorError3 = _context.t0;

            case 37:
              _context.prev = 37;
              _context.prev = 38;

              if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
                _iterator3["return"]();
              }

            case 40:
              _context.prev = 40;

              if (!_didIteratorError3) {
                _context.next = 43;
                break;
              }

              throw _iteratorError3;

            case 43:
              return _context.finish(40);

            case 44:
              return _context.finish(37);

            case 45:
              seen.add(node);
              nodeData.length = 0;

            case 47:
              _iteratorNormalCompletion2 = true;
              _context.next = 9;
              break;

            case 50:
              _context.next = 56;
              break;

            case 52:
              _context.prev = 52;
              _context.t1 = _context["catch"](7);
              _didIteratorError2 = true;
              _iteratorError2 = _context.t1;

            case 56:
              _context.prev = 56;
              _context.prev = 57;

              if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
                _iterator2["return"]();
              }

            case 59:
              _context.prev = 59;

              if (!_didIteratorError2) {
                _context.next = 62;
                break;
              }

              throw _iteratorError2;

            case 62:
              return _context.finish(59);

            case 63:
              return _context.finish(56);

            case 64:
            case "end":
              return _context.stop();
          }
        }
      }, edgesIter, this, [[7, 52, 56, 64], [15, 33, 37, 45], [38,, 40, 44], [57,, 59, 63]]);
    })
    /**
     * Return the attribute object associated with edge (u,v).
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * G.getEdgeData(0,1);
     * // {}
     * ```
     *
     * If the edge exists, it may be simpler to access `G.get(0).get(1)`.
     *
     * @param {Node} u Node.
     * @param {Node} v Node.
     * @param {*} optDefault
     *   Value to return if the edge (u,v) is not found.
     * @return {*} The edge attribute object.
     */

  }, {
    key: "getEdgeData",
    value: function getEdgeData(u, v) {
      /*istanbul ignore next*/
      var optDefault = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
      var nbrs = this.adj.get(u);

      if (nbrs != null) {
        var data = nbrs.get(v);

        if (data != null) {
          return data;
        }
      }

      return optDefault;
    }
    /**
     * Return an adjacency list representation of the graph.
     *
     * The output adjacency list is in the order of G.nodes().
     * For directed graphs, only outgoing adjacencies are included.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * G.adjacencyList();
     * // [[1], [0,2], [1,3], [2]]
     * ```
     *
     * @return {!Array.<Array>} The adjacency structure of the graph as a
     *      list of lists.
     */

  }, {
    key: "adjacencyList",
    value: function adjacencyList() {
      /*eslint no-unused-vars:0*/
      return Array.from(
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      mapIterator)(this.adjacencyIter(), function (
      /*istanbul ignore next*/
      _ref3)
      /*istanbul ignore next*/
      {
        var _ref4 = _slicedToArray(_ref3, 2),
            _ = _ref4[0],
            adj = _ref4[1];

        return Array.from(adj.keys());
      }));
    }
    /**
     * Return an iterator of (node, adjacency map) tuples for all nodes.
     *
     * For directed graphs, only outgoing adjacencies are included.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph() // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * Array.from(G.adjacencyIter());
     * // [
     * //   [0, Map {1: {}}],
     * //   [1, Map {0: {}, 2: {}}],
     * //   [2, Map {1: {}, 3: {}}],
     * //   [3, Map {2: {}]]
     * // ]
     * ```
     *
     * @return {!Iterator} An array of (node, adjacency map) tuples
     *      for all nodes in the graph.
     */

  }, {
    key: "adjacencyIter",
    value: function adjacencyIter() {
      return this.adj.entries();
    }
    /**
     * Return the degree of a node or nodes.
     *
     * The node degree is the number of edges adjacent to that node.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph();  // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3])
     * G.degree(0)
     * // 1
     * G.degree([0,1])
     * // Map {0: 1, 1: 2}
     * Array.from(G.degree([0,1]).values())
     * // [1, 2]
     * ```
     *
     * @param {(Node|Iterable)=} optNbunch (default=all nodes)
     *      An iterable of nodes.  The iterable will be iterated
     *      through once.
     * @param {string=} optWeight
     *      The edge attribute that holds the numerical value used
     *      as a weight.  If null or not defined, then each edge has weight 1.
     *      The degree is the sum of the edge weights adjacent to the node.
     * @return {!(number|Map)} A dictionary with nodes as keys and
     *      degree as values or a number if a single node is specified.
     */

  }, {
    key: "degree",
    value: function degree(optNbunch, optWeight) {
      if (optNbunch != null && this.hasNode(optNbunch)) {
        // return a single node
        return this.degreeIter(optNbunch, optWeight).next().value[1];
      } else {
        return new
        /*istanbul ignore next*/
        _Map[
        /*istanbul ignore next*/
        "default"](this.degreeIter(optNbunch, optWeight));
      }
    }
    /**
     * Return an array for (node, degree).
     *
     * The node degree is the number of edges adjacent to that node.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph();  // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3])
     * Array.from(G.degreeIter(0));
     * // [[0, 1]]
     * Array.from(G.degreeIter([0,1]));
     * // [[0, 1], [1, 2]]
     * ```
     *
     * @param {(Node|Iterable)=} optNbunch (default=all nodes)
     *       A container of nodes.  The container will be iterated
     *       through once.
     * @param {string=} optWeight
     *      The edge attribute that holds the numerical value used
     *      as a weight.  If null or not defined, then each edge has weight 1.
     *      The degree is the sum of the edge weights adjacent to the node.
     * @return {!Iterator} of two-tuples of (node, degree).
     *
     * @export
     */

  }, {
    key: "degreeIter",
    value: function degreeIter(optNbunch, optWeight) {
      var nodesNbrs;
      var iterator;

      if (optNbunch == null) {
        nodesNbrs = this.adj.entries();
      } else {
        var adj = this.adj;
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
            tuple2)(n, adj.get(n))
          );
        });
      }

      if (!optWeight) {
        iterator =
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        mapIterator)(nodesNbrs, function (
        /*istanbul ignore next*/
        _ref5) {
          /*istanbul ignore next*/
          var _ref6 = _slicedToArray(_ref5, 2),
              node = _ref6[0],
              nbrs = _ref6[1];

          return [node, nbrs.size + +nbrs.has(node)];
        });
      } else {
        iterator =
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
              n = _ref8[0],
              nbrs = _ref8[1];

          var sum = 0;
          nbrs.forEach(function (data) {
            var weight = data[optWeight];
            sum += +(weight != null ? weight : 1);
          });

          if (nbrs.has(n)) {
            var weight = nbrs.get(n)[optWeight];
            sum += +(weight != null ? weight : 1);
          }

          return [n, sum];
        });
      }

      return iterator;
    }
    /**
     * Remove all nodes and edges from the graph.
     *
     * This also removes the name, and all graph, node, and edge attributes.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph(); // or DiGraph, MultiGraph, MultiDiGraph, etc
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
      this.name = '';
      this.adj.clear();
      this.node.clear();

      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      clear)(this.graph);
    }
    /**
     * Return a copy of the graph.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph(); // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * var H = G.copy();
     * ```
     *
     * ### Notes
     *
     * This makes a complete copy of the graph including all of the
     * node or edge attributes.
     *
     * @return {!Graph}
     */

  }, {
    key: "copy",
    value: function copy() {
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
      return false;
    }
    /**
     * Return a directed representation of the graph.
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
     * @return {!DiGraph}
     *   A directed graph with the same name, same nodes, and with
     *   each edge (u,v,data) replaced by two directed edges
     *   (u,v,data) and (v,u,data).
     */

  }, {
    key: "toDirected",
    value: function toDirected() {
      var G = new (require('./DiGraph'))();
      G.name = this.name;
      G.addNodesFrom(this);
      G.addEdgesFrom(
      /*istanbul ignore next*/

      /*#__PURE__*/
      regeneratorRuntime.mark(function
      /*istanbul ignore next*/
      _callee()
      /*istanbul ignore next*/
      {
        var _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, nd, u, _iteratorNormalCompletion5, _didIteratorError5, _iteratorError5, _iterator5, _step5, nbr;

        return regeneratorRuntime.wrap(function _callee$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _iteratorNormalCompletion4 = true;
                _didIteratorError4 = false;
                _iteratorError4 = undefined;
                _context2.prev = 3;
                _iterator4 = this.adjacencyIter()[Symbol.iterator]();

              case 5:
                if (_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done) {
                  _context2.next = 37;
                  break;
                }

                nd = _step4.value;
                u = nd[0];
                _iteratorNormalCompletion5 = true;
                _didIteratorError5 = false;
                _iteratorError5 = undefined;
                _context2.prev = 11;
                _iterator5 = nd[1][Symbol.iterator]();

              case 13:
                if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
                  _context2.next = 20;
                  break;
                }

                nbr = _step5.value;
                _context2.next = 17;
                return (
                  /*istanbul ignore next*/
                  (0,
                  /*istanbul ignore next*/
                  _internals.
                  /*istanbul ignore next*/
                  tuple3)(u, nbr[0],
                  /*istanbul ignore next*/
                  (0,
                  /*istanbul ignore next*/
                  _internals.
                  /*istanbul ignore next*/
                  deepcopy)(nbr[1]))
                );

              case 17:
                _iteratorNormalCompletion5 = true;
                _context2.next = 13;
                break;

              case 20:
                _context2.next = 26;
                break;

              case 22:
                _context2.prev = 22;
                _context2.t0 = _context2["catch"](11);
                _didIteratorError5 = true;
                _iteratorError5 = _context2.t0;

              case 26:
                _context2.prev = 26;
                _context2.prev = 27;

                if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
                  _iterator5["return"]();
                }

              case 29:
                _context2.prev = 29;

                if (!_didIteratorError5) {
                  _context2.next = 32;
                  break;
                }

                throw _iteratorError5;

              case 32:
                return _context2.finish(29);

              case 33:
                return _context2.finish(26);

              case 34:
                _iteratorNormalCompletion4 = true;
                _context2.next = 5;
                break;

              case 37:
                _context2.next = 43;
                break;

              case 39:
                _context2.prev = 39;
                _context2.t1 = _context2["catch"](3);
                _didIteratorError4 = true;
                _iteratorError4 = _context2.t1;

              case 43:
                _context2.prev = 43;
                _context2.prev = 44;

                if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
                  _iterator4["return"]();
                }

              case 46:
                _context2.prev = 46;

                if (!_didIteratorError4) {
                  _context2.next = 49;
                  break;
                }

                throw _iteratorError4;

              case 49:
                return _context2.finish(46);

              case 50:
                return _context2.finish(43);

              case 51:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee, this, [[3, 39, 43, 51], [11, 22, 26, 34], [27,, 29, 33], [44,, 46, 50]]);
      }).call(this));
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
     * Return an undirected copy of the graph.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph(); // or MultiGraph, etc
     * G.addPath([0,1]);
     * var H = G.toDirected();
     * G.edges();
     * // [[0,1], [1,0]]
     * var G2 = H.toUndirected();
     * G2.edges();
     * // [[0,1]]
     * ```
     *
     * ### Notes
     *
     * This returns a "deepcopy" of the edge, node, and
     * graph attributes which attempts to completely copy
     * all of the data and references.
     *
     * This is in contrast to the similar `var H = new jsnx.Graph(G);` which
     * returns a shallow copy of the data.
     *
     * @return {!Graph} A deepcopy of the graph.
     * @export
     */

  }, {
    key: "toUndirected",
    value: function toUndirected() {
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
     * Return the subgraph induced on nodes in nbunch.
     *
     * The induced subgraph of the graph contains the nodes in nbunch
     * and the edges between those nodes.
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
     *      An iterable of nodes which will be iterated through once.
     * @return {Graph}
     */

  }, {
    key: "subgraph",
    value: function subgraph(nbunch) {
      var bunch = this.nbunchIter(nbunch);
      var n; // create new graph and copy subgraph into it

      var H = new this.constructor(); // copy node and attribute dictionaries

      /*istanbul ignore next*/
      var _iteratorNormalCompletion6 = true;
      var _didIteratorError6 = false;
      var _iteratorError6 = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator6 = bunch[Symbol.iterator](), _step6;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion6 = true) {
          /*istanbul ignore next*/
          n = _step6.value;
          H.node.set(n, this.node.get(n));
        } // namespace shortcuts for speed

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

      var HAdj = H.adj;
      var thisAdj = this.adj; // add nodes and edges (undirected method)

      /*istanbul ignore next*/
      var _iteratorNormalCompletion7 = true;
      var _didIteratorError7 = false;
      var _iteratorError7 = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator7 = H[Symbol.iterator](), _step7;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion7 = true) {
          /*istanbul ignore next*/
          n = _step7.value;
          var Hnbrs = new
          /*istanbul ignore next*/
          _Map[
          /*istanbul ignore next*/
          "default"]();
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
              var nbrdata = _step8.value;
              var nbr = nbrdata[0];
              var data = nbrdata[1];

              if (HAdj.has(nbr)) {
                // add both representations of edge: n-nbr and nbr-n
                Hnbrs.set(nbr, data);
                HAdj.get(nbr).set(n, data);
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
    /**
     * Return a list of nodes with self loops.
     *
     * A node with a self loop has an edge with both ends adjacent
     * to that node.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addEdge(1, 1)
     * G.addEdge(1, 2)
     * G.nodesWithSelfloops()
     * // [1]
     * ```
     *
     * @return {Array} A list of nodes with self loops.
     */

  }, {
    key: "nodesWithSelfloops",
    value: function nodesWithSelfloops() {
      var nodes = [];

      /*istanbul ignore next*/
      var _iteratorNormalCompletion9 = true;
      var _didIteratorError9 = false;
      var _iteratorError9 = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator9 = this.adj.entries()[Symbol.iterator](), _step9;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion9 = (_step9 = _iterator9.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion9 = true) {
          /*istanbul ignore next*/
          var nd = _step9.value;

          if (nd[1].has(nd[0])) {
            nodes.push(nd[0]);
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

      return nodes;
    }
    /**
     * Return a list of selfloop edges.
     *
     * A selfloop edge has the same node at both ends.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addEdge(1,1)
     * G.addEdge(1,2)
     * G.selfloopEdges()
     * // [(1, 1)]
     * G.selfloop_edges(true)
     * // [(1, 1, {})]
     * ```
     *
     * @param {boolean=} optData
     *      Return selfloop edges as two tuples (u,v) (data=False)
     *      or three-tuples (u,v,data) (data=True).
     *
     * @return {Array}  A list of all selfloop edges.
     */

  }, {
    key: "selfloopEdges",
    value: function selfloopEdges() {
      /*istanbul ignore next*/
      var optData = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var edges = [];

      /*istanbul ignore next*/
      var _iteratorNormalCompletion10 = true;
      var _didIteratorError10 = false;
      var _iteratorError10 = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator10 = this.adj.entries()[Symbol.iterator](), _step10;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion10 = (_step10 = _iterator10.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion10 = true) {
          /*istanbul ignore next*/
          var nd = _step10.value;

          /*istanbul ignore next*/
          var _nd = _slicedToArray(nd, 2),
              node = _nd[0],
              nbrs = _nd[1];

          if (nbrs.has(node)) {
            if (optData) {
              edges.push(
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              tuple3c)(node, node, nbrs.get(node), nd));
            } else {
              edges.push(
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              tuple2c)(node, node, nd));
            }
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

      return edges;
    }
    /**
     * Return the number of selfloop edges.
     *
     * A selfloop edge has the same node at both ends.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.add_edge(1,1)
     * G.add_edge(1,2)
     * G.number_of_selfloops()
     * // 1
     * ```
     *
     * @return {number} The number of selfloops.
     */

  }, {
    key: "numberOfSelfloops",
    value: function numberOfSelfloops() {
      return this.selfloopEdges().length;
    }
    /**
     * Return the number of edges.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3])
     * G.size()
     * // 3
     *
     * var G = new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addEdge('a',' b', {weight: 2});
     * G.addEdge('b', 'c', {weight: 4});
     * G.size()
     * // 2
     * G.size('weight');
     * // 6.0
     * ```
     *
     * @param {string=} optWeight The edge attribute that holds the numerical
     *      value used as a weight.  If not defined, then each edge has weight 1.
     * @return {number} The number of edges or sum of edge weights in the graph.
     */

  }, {
    key: "size",
    value: function size(optWeight) {
      var s = 0;

      /*istanbul ignore next*/
      var _iteratorNormalCompletion11 = true;
      var _didIteratorError11 = false;
      var _iteratorError11 = undefined;

      try {
        for (
        /*istanbul ignore next*/
        var _iterator11 = this.degree(null, optWeight).values()[Symbol.iterator](), _step11;
        /*istanbul ignore next*/
        !(_iteratorNormalCompletion11 = (_step11 = _iterator11.next()).done);
        /*istanbul ignore next*/
        _iteratorNormalCompletion11 = true) {
          /*istanbul ignore next*/
          var v = _step11.value;
          s += v;
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

      s = s / 2;

      if (optWeight == null) {
        return Math.floor(s); // int(s)
      } else {
        return s; // no need to cast to float
      }
    }
    /**
     * Return the number of edges between two nodes.
     *
     * ### Examples
     *
     * ```
     * var G = new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * G.numberOfEdges();
     * // 3
     * G.number_of_edges(0,1);
     * // 1
     * ```
     *
     * @param {!Node=} u node.
     * @param {!Node=} v node
     *       If u and v are both specified, return the number of edges between
     *       u and v. Otherwise return the total number of all edges.
     * @return {number} The number of edges in the graph.
     *      If nodes u and v are specified return the number of edges between
     *      those nodes.
     */

  }, {
    key: "numberOfEdges",
    value: function numberOfEdges(u, v) {
      if (u == null) {
        return Math.floor(this.size());
      }

      if (this.adj.get(u).has(v)) {
        return 1;
      } else {
        return 0;
      }
    }
    /**
     * Add a star.
     *
     * ### Examples
     * ```
     * var G = new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addStar([0,1,2,3]);
     * G.addStar([10,11,12], {weight: 2});
     * ```
     *
     * The first node in nodes is the middle of the star.  It is connected
     * to all other nodes.
     *
     * @param {Iterable} nodes A container of nodes.
     * @param {Object=} optAttr  Attributes to add to every edge in the star.
     */

  }, {
    key: "addStar",
    value: function addStar(nodes, optAttr) {
      var niter =
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      toIterator)(nodes);
      var v = niter.next().value;
      var edges =
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      mapIterator)(niter, function (n)
      /*istanbul ignore next*/
      {
        return (
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          tuple2)(v, n)
        );
      });
      this.addEdgesFrom(edges, optAttr);
    }
    /**
     * Add a path.
     *
     * ### Examples
     *
     * ```
     * var G= new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addPath([0,1,2,3]);
     * G.addPath([10,11,12], {weight: 7});
     * ```
     *
     * @param {Iterable} nodes A container of nodes.
     *      A path will be constructed from the nodes (in order)
     *      and added to the graph.
     * @param {Object=} optAttr Attributes to add to every edge in path.
     */

  }, {
    key: "addPath",
    value: function addPath(nodes, optAttr) {
      var nlist = Array.from(nodes);
      var edges =
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      zipSequence)(nlist.slice(0, nlist.length - 1), nlist.slice(1));
      this.addEdgesFrom(edges, optAttr);
    }
    /**
     * Add a cycle.
     *
     * ### Examples
     *
     * ```
     * var G= new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addCycle([0,1,2,3]);
     * G.addCycle([10,11,12], {weight: 7});
     * ```
     *
     * @param {Iterable} nodes A container of nodes.
     *      A cycle will be constructed from the nodes (in order)
     *      and added to the graph.
     * @param {Object=} optAttr  Attributes to add to every edge in cycle.
     */

  }, {
    key: "addCycle",
    value: function addCycle(nodes, optAttr) {
      var nlist = Array.from(nodes);
      var edges =
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      zipSequence)(nlist, nlist.slice(1).concat([nlist[0]]));
      this.addEdgesFrom(edges, optAttr);
    }
    /**
     * Return an iterator of nodes contained in `nbunch` that are
     * also in the graph.
     *
     * The nodes in `nbunch` are checked for membership in the graph
     * and if not are silently ignored.
     *
     * ### Notes
     *
     * When `nbunch` is an iterator, the returned iterator yields values
     * directly from `nbunch`, becoming exhausted when `nbunch` is exhausted.
     *
     * To test whether `nbunch` is a single node, one can use
     * `if (this.hasNode(nbunch))`, even after processing with this routine.
     *
     * If `nbunch` is not a node or a (possibly empty) sequence/iterator
     * or not defined, an Error is raised.
     *
     * @param {(Node|Iterable)=} optNbunch (default=all nodes)
     *      A container of nodes.  The container will be iterated
     *      through once.
     * @return {!Iterator} An iterator over nodes in nbunch
     *      that are also in the graph.
     *      If nbunch is null or not defined, iterate over all nodes in the graph.
     */

  }, {
    key: "nbunchIter",
    value:
    /*#__PURE__*/
    regeneratorRuntime.mark(function nbunchIter(optNbunch) {
      var adj, _iteratorNormalCompletion12, _didIteratorError12, _iteratorError12, _iterator12, _step12, n;

      return regeneratorRuntime.wrap(function nbunchIter$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              if (!(optNbunch == null)) {
                _context3.next = 4;
                break;
              }

              return (
                /*istanbul ignore next*/
                _context3.delegateYield(this.adj.keys(), "t0", 2)
              );

            case 2:
              _context3.next = 44;
              break;

            case 4:
              if (!this.hasNode(optNbunch)) {
                _context3.next = 9;
                break;
              }

              _context3.next = 7;
              return optNbunch;

            case 7:
              _context3.next = 44;
              break;

            case 9:
              // if nbunch is a sequence of nodes
              adj = this.adj;
              _context3.prev = 10;
              _iteratorNormalCompletion12 = true;
              _didIteratorError12 = false;
              _iteratorError12 = undefined;
              _context3.prev = 14;
              _iterator12 =
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              toIterator)(optNbunch)[Symbol.iterator]();

            case 16:
              if (_iteratorNormalCompletion12 = (_step12 = _iterator12.next()).done) {
                _context3.next = 24;
                break;
              }

              n = _step12.value;

              if (!adj.has(n)) {
                _context3.next = 21;
                break;
              }

              _context3.next = 21;
              return n;

            case 21:
              _iteratorNormalCompletion12 = true;
              _context3.next = 16;
              break;

            case 24:
              _context3.next = 30;
              break;

            case 26:
              _context3.prev = 26;
              _context3.t1 = _context3["catch"](14);
              _didIteratorError12 = true;
              _iteratorError12 = _context3.t1;

            case 30:
              _context3.prev = 30;
              _context3.prev = 31;

              if (!_iteratorNormalCompletion12 && _iterator12["return"] != null) {
                _iterator12["return"]();
              }

            case 33:
              _context3.prev = 33;

              if (!_didIteratorError12) {
                _context3.next = 36;
                break;
              }

              throw _iteratorError12;

            case 36:
              return _context3.finish(33);

            case 37:
              return _context3.finish(30);

            case 38:
              _context3.next = 44;
              break;

            case 40:
              _context3.prev = 40;
              _context3.t2 = _context3["catch"](10);

              if (!(
              /*istanbul ignore next*/
              _context3.t2 instanceof TypeError)) {
                _context3.next = 44;
                break;
              }

              throw new
              /*istanbul ignore next*/
              _JSNetworkXError[
              /*istanbul ignore next*/
              "default"]('nbunch is not a node or a sequence of nodes');

            case 44:
            case "end":
              return _context3.stop();
          }
        }
      }, nbunchIter, this, [[10, 40], [14, 26, 30, 38], [31,, 33, 37]]);
    })
    /**
     * A graph is an iterable over its nodes.
     *
     * ### Example
     *
     * ```
     * var G = new jsnx.Graph();   // or DiGraph, MultiGraph, MultiDiGraph, etc
     * G.addNodesFrom([0,1,2,3]);
     * for (var node of G) {
     *   console.log(node);
     * }
     * ```
     *
     * @return {Iterator}
     */

  }, {
    key: Symbol.iterator,
    value: function value() {
      return this.node.keys();
    }
  }, {
    key: "name",

    /**
     * Gets or sets the name of the graph.
     *
     * @param {string=} opt_name Graph name.
     * @return {(string|undefined)} Graph name if no parameter was passed.
     */
    get: function get() {
      return this.graph.name || '';
    },
    set: function set(name) {
      this.graph.name = name;
    }
  }], [{
    key: "__name__",
    get: function get() {
      return 'Graph';
    }
  }]);

  return Graph;
}();

/*istanbul ignore next*/
exports["default"] = Graph;