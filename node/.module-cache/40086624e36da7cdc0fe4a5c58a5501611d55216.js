'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.makeSmallUndirectedGraph = makeSmallUndirectedGraph;
exports.makeSmallGraph = makeSmallGraph;
exports.bullGraph = bullGraph;
exports.krackhardtKiteGraph = krackhardtKiteGraph;

var
/*istanbul ignore next*/
_JSNetworkXError = _interopRequireDefault(require("../exceptions/JSNetworkXError"));

var
/*istanbul ignore next*/
_classic = require("./classic");

var
/*istanbul ignore next*/
_internals = require("../_internals");

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * Return a small undirected graph described by `graphDescription`.
 *
 * @see makeSmallGraph.
 *
 * @param {Array} graphDescription
 *    Description of the graph to create in the form `{type, name, n, list}`.
 * @param {Graph=}
 *    optCreateUsing Graph instance to empty and add nodes to.
 * @return {Graph}
 */
function makeSmallUndirectedGraph(graphDescription, optCreateUsing) {
  if (optCreateUsing != null && optCreateUsing.isDirected()) {
    throw new
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]('Directed Graph not supported');
  }

  return makeSmallGraph(graphDescription, optCreateUsing);
}
/**
 * Return the small graph described by graph_description.
 *
 * `graphDescription` is a list of the form `{type, name, n, list}`.
 *
 * Here `ltype` is one of `"adjacencylist"` or `"edgelist"`,
 * `name` is the name of the graph and `n` the number of nodes.
 * This constructs a graph of `n` nodes with integer labels 0,..,n-1.
 *
 * If `ltype="adjacencylist"` then `xlist` is an adjacency list
 * with exactly `n` entries, in with the `j`'th entry (which can be empty)
 * specifies the nodes connected to vertex `j`.
 *
 * E.g. the "square" graph `$C_4$` can be obtained by
 *
 * ```
 * var G = makeSmallGraph({
 *   type: "adjacencylist",
 *   name: "C_4",
 *   n: 4,
 *   list: [[2,4],[1,3],[2,4],[1,3]]
 * });
 * ```
 *
 * or, since we do not need to add edges twice,
 *
 * ```
 * var G = makeSmallGraph({
 *   type: "adjacencylist",
 *   name: "C_4",
 *   n: 4,
 *   list: [[2,4],[3],[4],[]]]
 * });
 * ```
 *
 * If `ltype="edgelist"` then `xlist` is an edge list written as
 * `[[v1,w2],[v2,w2],...,[vk,wk]]`, where `vj` and `wj` integers in the range
 * 1,..,n
 *
 * E.g. the "square" graph `$C_4$` can be obtained by
 *
 * ```
 * var G = makeSmallGraph({
 *   type: "edgelist",
 *   name: "C_4",
 *   n: 4,
 *   list: [[1,2],[3,4],[2,3],[4,1]]]
 * });
 * ```
 *
 * Use the `optCreateUsing` argument to choose the graph class/type.
 *
 * @param {Array} graphDescription
 *    Description of the graph to create in the form `{type, name, n, list}`.
 * @param {Graph=} optCreateUsing Graph instance to empty and add nodes to.
 * @return {Graph}
 */


function makeSmallGraph(
/*istanbul ignore next*/
_ref, optCreateUsing) {
  /*istanbul ignore next*/
  var type = _ref.type,
      name = _ref.name,
      n = _ref.n,
      list = _ref.list;
  var G =
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _classic.
  /*istanbul ignore next*/
  emptyGraph)(n, optCreateUsing);
  var nodes = G.nodes();

  if (type === 'adjacencylist') {
    if (list.length !== n) {
      throw new
      /*istanbul ignore next*/
      _JSNetworkXError[
      /*istanbul ignore next*/
      "default"]('invalid graphDescription');
    }

    nodes.forEach(function (v) {
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      forEach)(list[v], function (u)
      /*istanbul ignore next*/
      {
        return G.addEdge(u - 1, v);
      });
    });
  } else if (type === 'edgelist') {
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _internals.
    /*istanbul ignore next*/
    forEach)(list, function (
    /*istanbul ignore next*/
    _ref2) {
      /*istanbul ignore next*/
      var _ref3 = _slicedToArray(_ref2, 2),
          v = _ref3[0],
          u = _ref3[1];

      v -= 1;
      u -= 1;

      if (v < 0 || v > n - 1 || u < 0 || u > n - 1) {
        throw new
        /*istanbul ignore next*/
        _JSNetworkXError[
        /*istanbul ignore next*/
        "default"]('invalid graphDescription');
      } else {
        G.addEdge(v, u);
      }
    });
  }

  G.name = name;
  return G;
} // TODO: LCF_graph

/**
 * Return the Bull graph.
 *
 * @param {Graph=} optCreateUsing  Graph instance to empty and add nodes to.
 * @return {Graph}
 */


function bullGraph(optCreateUsing) {
  var type = 'adjacencylist';
  var name = 'Bull Graph';
  var n = 5;
  var list = [[2, 3], [1, 3, 4], [1, 2, 5], [2], [3]];
  return makeSmallUndirectedGraph({
    type: type,
    name: name,
    n: n,
    list: list
  }, optCreateUsing);
} // TODO: chvatal_graph
// TODO: cubical_graph
// TODO: desargues_graph
// TODO: diamond_graph
// TODO: dodecahedral_graph
// TODO: frucht_graph
// TODO: heawood_graph
// TODO: house_graph
// TODO: house_x_graph
// TODO: icosahedral_graph

/**
 * Return the Krackhardt Kite Social Network.
 *
 * A 10 actor social network introduced by David Krackhardt
 * to illustrate: degree, betweenness, centrality, closeness, etc.
 * The traditional labeling is:
 * Andre=1, Beverley=2, Carol=3, Diane=4,
 * Ed=5, Fernando=6, Garth=7, Heather=8, Ike=9, Jane=10.
 *
 * @param {Graph=} opt_create_using Graph instance to empty and add nodes to.
 * @return {Graph}
 */


function krackhardtKiteGraph(optCreateUsing) {
  var type = 'adjacencylist';
  var name = 'Krackhardt Kite Social Network';
  var n = 10;
  var list = [[2, 3, 4, 6], [1, 4, 5, 7], [1, 4, 6], [1, 2, 3, 5, 6, 7], [2, 4, 7], [1, 3, 4, 7, 8], [2, 4, 5, 6, 8], [6, 7, 9], [8, 10], [9]];
  return makeSmallUndirectedGraph({
    type: type,
    name: name,
    n: n,
    list: list
  }, optCreateUsing);
} // TODO: moebius_kantor_graph
// TODO: octahedral_graph
// TODO: pappus_graph
// TODO: petersen_graph
// TODO: sedgewick_maze_graph
// TODO: tetrahedral_graph
// TODO: truncated_cube_graph
// TODO: truncated_tetrahedron_graph
// TODO: tutte_graph