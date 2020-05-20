'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fullRaryTree = fullRaryTree;
exports.balancedTree = balancedTree;
exports.completeGraph = completeGraph;
exports.cycleGraph = cycleGraph;
exports.emptyGraph = emptyGraph;
exports.grid2dGraph = grid2dGraph;
exports.nullGraph = nullGraph;
exports.pathGraph = pathGraph;
exports.trivialGraph = trivialGraph;

var
/*istanbul ignore next*/
_Graph = _interopRequireDefault(require("../classes/Graph"));

var
/*istanbul ignore next*/
_internals = require("../_internals");

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(treeEdges);

/**
 * @param {number} n nodes
 * @param {number} r breadth
 * @return {Iterator}
 */
function treeEdges(n, r)
/*istanbul ignore next*/
{
  var nodes, parents, source, i, target;
  return regeneratorRuntime.wrap(function treeEdges$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // helper function for trees
          // yields edges in rooted tree at 0 with n nodes and branching ratio r
          nodes =
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          genRange)(n);

          if (!(n === 0)) {
            _context.next = 3;
            break;
          }

          return _context.abrupt("return");

        case 3:
          parents = [
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          next)(nodes)];

        case 4:
          if (!(parents.length > 0)) {
            _context.next = 20;
            break;
          }

          /*jshint unused:false*/
          source = parents.shift();
          i = 0;

        case 7:
          if (!(i < r)) {
            _context.next = 18;
            break;
          }

          target = nodes.next();

          if (!target.done) {
            _context.next = 11;
            break;
          }

          return _context.abrupt("return");

        case 11:
          target = target.value;
          parents.push(target);
          _context.next = 15;
          return (
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            tuple2)(source, target)
          );

        case 15:
          i++;
          _context.next = 7;
          break;

        case 18:
          _context.next = 4;
          break;

        case 20:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}
/**
 * Creates a full r-ary tree of n vertices.
 *
 * Sometimes called a k-ary, n-ary, or m-ary tree.  "... all non-leaf
 * vertices have exactly r children and all levels are full except
 * for some rightmost position of the bottom level (if a leaf at the
 * bottom level is missing, then so are all of the leaves to its
 * right." (1)
 *
 * ### References
 *
 * [1] An introduction to data structures and algorithms,
 *    James Andrew Storer,  Birkhauser Boston 2001, (page 225).
 *
 * @param {number} r branching factor of the tree
 * @param {number} n number of nodes in the tree
 * @param {Graph=} optCreateUsing
 *   Use specified type to construct graph
 * @return {Graph} An r-ary tree with n nodes.
 */


function fullRaryTree(r, n, optCreateUsing) {
  var G = emptyGraph(n, optCreateUsing);
  G.addEdgesFrom(treeEdges(n, r));
  return G;
}
/**
 * Return the perfectly balanced r-tree of height h.
 *
 * This is the rooted tree where all leaves are at distance h from
 * the root. The root has degree r and all other internal nodes have
 * degree r+1.
 *
 * Node labels are the integers 0 (the root) up to  numberOfNodes - 1.
 *
 * Also referred to as a complete r-ary tree.
 *
 * @param {number} r  Branching factor of the tree
 * @param {number} h Height of the tree
 * @param {Graph} optCreateUsing
 *    Use specified type to construct graph
 * @return {Graph}
 */


function balancedTree(r, h, optCreateUsing) {
  var n = r === 1 ? h : Math.floor((1 - Math.pow(r, h + 1)) / (1 - r));
  var G = emptyGraph(n, optCreateUsing);
  G.addEdgesFrom(treeEdges(n, r));
  return G;
} //TODO: barbell_graph

/**
 * Return the complete graph `$K_n$` with n nodes.
 *
 * Node labels are the integers 0 to n-1.
 * @param {number} n The number of nodes to add to the graph
 * @param {Graph=} optCreateUsing Graph instance to empty and add nodes to.
 * @return {Graph}
 */


function completeGraph(n, optCreateUsing) {
  var G = emptyGraph(n, optCreateUsing);
  G.name = 'complete_graph(' + n + ')';

  if (n > 1) {
    G.addEdgesFrom(G.isDirected() ?
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _internals.
    /*istanbul ignore next*/
    genPermutations)(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _internals.
    /*istanbul ignore next*/
    range)(n), 2) :
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _internals.
    /*istanbul ignore next*/
    genCombinations)(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _internals.
    /*istanbul ignore next*/
    range)(n), 2));
  }

  return G;
} //TODO: complete_bipartite_graph
//TODO: circular_ladder_graph

/**
 * Return the cycle graph C_n over n nodes.
 *
 * `$C_n$` is the n-path with two end-nodes connected.
 *
 * Node labels are the integers 0 to n-1
 * If `optCreateUsing` is a DiGraph, the direction is in increasing order.
 *
 * @param {number} n The number of nodes to add to the graph
 * @param {Graph=} optCreateUsing Graph instance to empty and add nodes to.
 * @return {Graph}
 */


function cycleGraph(n, optCreateUsing) {
  var G = pathGraph(n, optCreateUsing);
  G.name = 'cycle_graph(' + n + ')';

  if (n > 1) {
    G.addEdge(n - 1, 0);
  }

  return G;
} //TODO: dorogovtsev_goltsev_mendes_graph

/**
 * Return the empty graph with n nodes and zero edges.
 *
 * Node labels are the integers 0 to n-1
 *
 * ### Example
 *
 * ```
 * var G = jsnx.emptyGraph(10)
 * G.numberOfNodes()
 * // 10
 * G.numberOfEdges()
 * // 0
 * ```
 *
 * The variable `optCreateUsing` should point to a "graph"-like object that
 * will be cleaned (nodes and edges will be removed) and refitted as
 * an empty "graph" with n nodes with integer labels. This capability
 * is useful for specifying the class-nature of the resulting empty
 * "graph" (i.e. Graph, DiGraph, MyWeirdGraphClass, etc.).
 *
 * The variable `optCreateUsing` has two main uses:
 * Firstly, the variable `optCreateUsing` can be used to create an
 * empty digraph, network,etc.  For example,
 *
 * ```
 * var n = 10;
 * var G = jsnx.emptyGraph(n, new jsnx.DiGraph());
 * ```
 *
 * will create an empty digraph on n nodes.
 *
 * Secondly, one can pass an existing graph (digraph, pseudograph,
 * etc.) via `optCreateUsing`. For example, if `G` is an existing graph
 * (resp. digraph, pseudograph, etc.), then `emptyGraph(n,G)`
 * will empty G (i.e. delete all nodes and edges using `G.clear()` in
 * base) and then add n nodes and zero edges, and return the modified
 * graph (resp. digraph, pseudograph, etc.).
 *
 * @see createEmptyCopy
 *
 * @param {?number=} optN The number of nodes to add to the graph
 * @param {?Graph=} optCreateUsing Graph instance to empty and add nodes to.
 * @return {Graph}
 */


function emptyGraph(optN, optCreateUsing) {
  if (
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  isGraph)(optN)) {
    optCreateUsing = optN;
    optN = null;
  }

  if (optN == null) {
    optN = 0;
  }

  var G;

  if (optCreateUsing == null) {
    // default empty graph is a simple graph
    G = new
    /*istanbul ignore next*/
    _Graph[
    /*istanbul ignore next*/
    "default"]();
  } else {
    G = optCreateUsing;
    G.clear();
  }

  G.addNodesFrom(
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  genRange)(optN));
  G.name = 'emptyGraph(' + optN + ')';
  return G;
}
/**
 * Return the 2d grid graph of mxn nodes,
 * each connected to its nearest neighbors.
 * Optional argument `optPeriodic` will connect
 * boundary nodes via periodic boundary conditions.
 *
 * @param {number} rows Number of rows
 * @param {number} columns Number of columns
 * @param {boolean=} optPeriodic
 * @param {Graph=} optCreateUsing
 * @return {Graph}
 */


function grid2dGraph(rows, columns) {
  /*istanbul ignore next*/
  var optPeriodic = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  /*istanbul ignore next*/
  var optCreateUsing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var G = emptyGraph(0, optCreateUsing);
  G.name = 'grid2dGraph';
  var i;
  var j;

  for (i = 0; i < rows; i++) {
    for (j = 0; j < columns; j++) {
      G.addNode([i, j]);
    }
  }

  for (i = 1; i < rows; i++) {
    for (j = 0; j < columns; j++) {
      G.addEdge([i, j], [i - 1, j]);
    }
  }

  for (i = 0; i < rows; i++) {
    for (j = 1; j < columns; j++) {
      G.addEdge([i, j], [i, j - 1]);
    }
  }

  if (G.isDirected()) {
    for (i = 0; i < rows - 1; i++) {
      for (j = 0; j < columns; j++) {
        G.addEdge([i, j], [i + 1, j]);
      }
    }

    for (i = 0; i < rows; i++) {
      for (j = 0; j < columns - 1; j++) {
        G.addEdge([i, j], [i, j + 1]);
      }
    }
  }

  if (optPeriodic) {
    if (columns > 2) {
      for (i = 0; i < rows; i++) {
        G.addEdge([i, 0], [i, columns - 1]);
      }

      if (G.isDirected()) {
        for (i = 0; i < rows; i++) {
          G.addEdge([i, columns - 1], [i, 0]);
        }
      }
    }

    if (rows > 2) {
      for (j = 0; j < columns; j++) {
        G.addEdge([0, j], [rows - 1, j]);
      }

      if (G.isDirected()) {
        for (j = 0; j < columns; j++) {
          G.addEdge([rows - 1, j], [0, j]);
        }
      }
    }

    G.name = 'periodicGrid2dGraph(' + rows + ', ' + columns + ')';
  }

  return G;
} //TODO: grid_graph
//TODO: hypercube_graph
//TODO: ladder_graph
//TODO: lollipop_graph

/**
 * Return the Null graph with no nodes or edges.
 *
 * See `emptyGraph` for the use of `optCreateUsing`.
 *
 * @param {Graph=} optCreateUsing Graph instance to empty and add nodes to.
 * @return {Graph}
 */


function nullGraph(optCreateUsing) {
  var G = emptyGraph(0, optCreateUsing);
  G.name = 'nullGraph()';
  return G;
}
/**
 * Return the Null graph with no nodes or edges.
 *
 * See `emptyGraph` for the use of `optCreateUsing`.
 *
 * @param {number} n The number of nodes to add to the graph
 * @param {Graph=} optCreateUsing Graph instance to empty and
 *      add nodes to.
 * @return {Graph}
 */


function pathGraph(n, optCreateUsing) {
  var G = emptyGraph(n, optCreateUsing);
  G.name = 'pathGraph(' + n + ')';
  G.addEdgesFrom(
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  mapIterator)(
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  genRange)(n - 1), function (v) {
    return (
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      tuple2)(v, v + 1)
    );
  }));
  return G;
} //TODO: star_graph

/**
 * Return the Trivial graph with one node (with integer label 0) and no edges.
 *
 * @param {Graph=} optCreateUsing Graph instance to empty and
 *      add nodes to.
 * @return {Graph}
 */


function trivialGraph(optCreateUsing) {
  var G = emptyGraph(1, optCreateUsing);
  G.name = 'nullGraph()';
  return G;
} //TODO: wheel_graph