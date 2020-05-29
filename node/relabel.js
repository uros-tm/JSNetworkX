'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.relabelNodes = relabelNodes;
exports.convertNodeLabelsToIntegers = convertNodeLabelsToIntegers;

var
/*istanbul ignore next*/
_DiGraph = _interopRequireDefault(require("./classes/DiGraph"));

var
/*istanbul ignore next*/
_exceptions = require("./exceptions");

var
/*istanbul ignore next*/
_internals = require("./_internals");

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

/**
 * Relabel the nodes of the graph G.
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(3);  // nodes 0-1-2
 * var mapping = {0: 'a', 1: 'b', 2: 'c'};
 * // var mapping = new Map([[0, 'a'], [1, 'b'], [2, 'c']]);
 * var H = jsnx.relabelNodes(G, mapping);
 * H.nodes();
 * // ['a', 'b', 'c']
 * ```
 *
 * Partial in-place mapping
 *
 * ```
 * var G = jsnx.pathGraph(3);  // nodes 0-1-2
 * var mapping = {0: 'a', 1: 'b'};
 * // var mapping = new Map([[0, 'a'], [1, 'b']]);
 * var H = jsnx.relabelNodes(G, mapping, false);
 * H.nodes();
 * // [2, 'b', 'c']
 * ```
 *
 * Mapping as function:
 *
 * ```
 * var G = jsnx.pathGraph(3);
 * var H = jsnx.relabelNodes(G, x => Math.pow(x, 2));
 * H.nodes()
 * // [0, 1, 4]
 * ```
 *
 * ### Notes
 *
 * Only the nodes specified in the mapping will be relabeled.
 *
 * The setting `copy=false` modifies the graph in place.
 * This is not always possible if the mapping is circular.
 * In that case use copy=true.
 *
 * @see #convertNodeLabelsToIntegers
 *
 * @param {Graph} G A JSNetworkX graph
 * @param {(Object|Map|function(Node):Node)} mapping
 *      A dictionary with the old labels as keys and new labels as values.
 *      A partial mapping is allowed.
 * @param {boolean=} optCopy
 *      If `true` return a copy or if `false` relabel the nodes in place.
 * @return {Graph}
 */
function relabelNodes(G, mapping) {
  /*istanbul ignore next*/
  var optCopy = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
  // you can pass a function f(oldLabel)->newLabel
  // but we'll just make a dictionary here regardless
  var m = mapping;

  if (typeof mapping !== 'function') {
    if (!
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _internals.
    /*istanbul ignore next*/
    isMap)(m)) {
      m = new
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      Map(m);
    }
  } else {
    m = new
    /*istanbul ignore next*/
    _internals.
    /*istanbul ignore next*/
    Map(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _internals.
    /*istanbul ignore next*/
    mapIterator)(G.nodesIter(), function (n)
    /*istanbul ignore next*/
    {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        tuple2)(n, mapping(n))
      );
    }));
  }

  return optCopy ? relabelCopy(G, m) : relabelInplace(G, m);
}
/**
 * @param {Graph} G A JSNetworkX graph
 * @param {Map} mapping
 *      A dictionary with the old labels as keys and new labels as values.
 *      A partial mapping is allowed.
 *
 * @return .Graph}
 * @private
 */


function relabelInplace(G, mapping) {
  var oldLabels = new
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  Set(mapping.keys());
  var nodes;

  if (
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  someIterator)(mapping.values(), function (v)
  /*istanbul ignore next*/
  {
    return oldLabels.has(v);
  })) {
    // labels sets overlap
    // can we topological sort and still do the relabeling?
    var D = new
    /*istanbul ignore next*/
    _DiGraph[
    /*istanbul ignore next*/
    "default"](mapping);
    D.removeEdgesFrom(D.selfloopEdges());

    try {
      nodes =
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      topologicalSort)(D);
    } catch (e) {
      if (e instanceof
      /*istanbul ignore next*/
      _exceptions.
      /*istanbul ignore next*/
      JSNetworkXUnfeasible) {
        throw new
        /*istanbul ignore next*/
        _exceptions.
        /*istanbul ignore next*/
        JSNetworkXUnfeasible('The node label sets are overlapping and' + ' no ordering can resolve the mapping.' + ' Use copy=True.');
      }
    }

    nodes.reverse(); // reverse topological order
  } else {
    // non-overlapping label sets
    nodes = oldLabels.values();
  }

  var multigraph = G.isMultigraph();
  var directed = G.isDirected();
  var newEdges;

  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  forEach)(nodes, function (old) {
    var newMapping;

    if (mapping.has(old)) {
      newMapping = mapping.get(old);
    } else {
      return; // continue
    }

    if (!G.hasNode(old)) {
      throw new
      /*istanbul ignore next*/
      _exceptions.
      /*istanbul ignore next*/
      JSNetworkXError(
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      sprintf)('Node %j is not in the graph.', old));
    }

    G.addNode(newMapping, G.node.get(old));

    if (multigraph) {
      newEdges = G.edges(old, true, true).map(function (d)
      /*istanbul ignore next*/
      {
        return (
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          tuple4c)(newMapping, d[1], d[2], d[3], d)
        );
      });

      if (directed) {
        newEdges = newEdges.concat(G.inEdges(old, true, true).map(function (d)
        /*istanbul ignore next*/
        {
          return (
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            tuple4c)(d[0], newMapping, d[2], d[3], d)
          );
        }));
      }
    } else {
      newEdges = G.edges(old, true).map(function (d)
      /*istanbul ignore next*/
      {
        return (
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _internals.
          /*istanbul ignore next*/
          tuple3c)(newMapping, d[1], d[2], d)
        );
      });

      if (directed) {
        newEdges = newEdges.concat(G.inEdges(old, true).map(function (d)
        /*istanbul ignore next*/
        {
          return (
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            tuple3c)(d[0], newMapping, d[2], d)
          );
        }));
      }
    }

    G.removeNode(old);
    G.addEdgesFrom(newEdges);
  });
  return G;
}
/**
 * @param {Graph} G A JSNetworkX graph
 * @param {Map} mapping
 *      A dictionary with the old labels as keys and new labels as values.
 *      A partial mapping is allowed.
 *
 * @return {Graph}
 * @private
 */


function relabelCopy(G, mapping) {
  var H = new G.constructor();
  H.name = '(' + G.name + ')';

  if (G.isMultigraph()) {
    H.addEdgesFrom(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _internals.
    /*istanbul ignore next*/
    mapIterator)(G.edgesIter(null, true, true), function (d)
    /*istanbul ignore next*/
    {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        tuple4c)(mapping.has(d[0]) ? mapping.get(d[0]) : d[0], mapping.has(d[1]) ? mapping.get(d[1]) : d[1], d[2],
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        clone)(d[3]), d)
      );
    }));
  } else {
    H.addEdgesFrom(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _internals.
    /*istanbul ignore next*/
    mapIterator)(G.edgesIter(null, true), function (d)
    /*istanbul ignore next*/
    {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        tuple3c)(mapping.has(d[0]) ? mapping.get(d[0]) : d[0], mapping.has(d[1]) ? mapping.get(d[1]) : d[1],
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        clone)(d[3]), d)
      );
    }));
  }

  G.node.forEach(function (data, n)
  /*istanbul ignore next*/
  {
    return H.addNode(mapping.has(n) ? mapping.get(n) : n,
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _internals.
    /*istanbul ignore next*/
    clone)(data));
  });
  Object.assign(H.graph,
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  clone)(G.graph));
  return H;
}
/**
 * Return a copy of G node labels replaced with integers.
 *
 * ### Notes
 *
 * Node and edge attribute data are copied to the new (relabeled) graph.
 *
 * @param {Graph} G A JSNetworkX graph
 * @param {?number=} optFirstLabel
 *      An integer specifying the offset in numbering nodes.
 *      The n new integer labels are numbered firstLabel, ..., n-1+firstLabel.
 * @param {?string=} optOrdering
 *   - "default" : inherit node ordering from `G.nodes()`
 *   - "sorted"  : inherit node ordering from `G.nodes().sort()`
 *   - "increasing degree" : nodes are sorted by increasing degree
 *   - "decreasing degree" : nodes are sorted by decreasing degree
 * @param {?boolean=} optDiscardOldLabels
 *      If true discard old labels. If false, create a node attribute
 *      'oldLabel' to hold the old labels.
 * @return {Graph}
 */


function convertNodeLabelsToIntegers(G) {
  /*istanbul ignore next*/
  var optFirstLabel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

  /*istanbul ignore next*/
  var optOrdering = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'default';

  /*istanbul ignore next*/
  var optDiscardOldLabels = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : true;

  //   This function strips information attached to the nodes and/or
  //   edges of a graph, and returns a graph with appropriate integer
  //   labels. One can view this as a re-labeling of the nodes. Be
  //   warned that the term "labeled graph" has a loaded meaning
  //   in graph theory. The fundamental issue is whether the names
  //   (labels) of the nodes (and edges) matter in deciding when two
  //   graphs are the same. For example, in problems of graph enumeration
  //   there is a distinct difference in techniques required when
  //   counting labeled vs. unlabeled graphs.
  //
  //   When implementing graph
  //   algorithms it is often convenient to strip off the original node
  //   and edge information and appropriately relabel the n nodes with
  //   the integer values 1,..,n. This is the purpose of this function,
  //   and it provides the option (see discardOldLabels variable) to either
  //   preserve the original labels in separate dicts (these are not
  //   returned but made an attribute of the new graph.
  if (typeof optOrdering === 'boolean') {
    optDiscardOldLabels = optOrdering;
    optOrdering = 'default';
  }

  switch (
  /*istanbul ignore next*/
  _typeof(optFirstLabel)) {
    case 'string':
      optOrdering = optFirstLabel;
      optFirstLabel = 0;
      break;

    case 'boolean':
      optDiscardOldLabels = optFirstLabel;
      optFirstLabel = 0;
      break;
  }

  var mapping = new
  /*istanbul ignore next*/
  _internals.
  /*istanbul ignore next*/
  Map();
  var nodes;
  var dvPairs;
  var i;
  var j;
  var l;

  switch (optOrdering) {
    case 'default':
      nodes = G.nodes();

      for (i = 0, j = optFirstLabel, l = nodes.length; i < l; i++, j++) {
        mapping.set(nodes[i], j);
      }

      break;

    case 'sorted':
      nodes = G.nodes();
      nodes.sort();

      for (i = 0, j = optFirstLabel, l = nodes.length; i < l; i++, j++) {
        mapping.set(nodes[i], j);
      }

      break;

    case 'increasing degree':
      dvPairs = Array.from(G.degreeIter());
      dvPairs.sort(function (a, b)
      /*istanbul ignore next*/
      {
        return a[1] - b[1];
      });

      for (i = 0, j = optFirstLabel, l = dvPairs.length; i < l; i++, j++) {
        mapping.set(dvPairs[i][0], j);
      }

      break;

    case 'decreasing degree':
      dvPairs = Array.from(G.degreeIter());
      dvPairs.sort(function (a, b)
      /*istanbul ignore next*/
      {
        return b[1] - a[1];
      });

      for (i = 0, j = optFirstLabel, l = dvPairs.length; i < l; i++, j++) {
        mapping.set(dvPairs[i][0], j);
      }

      break;

    default:
      throw new
      /*istanbul ignore next*/
      _exceptions.
      /*istanbul ignore next*/
      JSNetworkXError(
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      sprintf)('Unkown node ordering: "%s"', optOrdering));
  }

  var H = relabelNodes(G, mapping);
  H.name = '(' + G.name + ')WithIntLabels';

  if (!optDiscardOldLabels) {
    H.nodeLabels = mapping;
  }

  return H;
}