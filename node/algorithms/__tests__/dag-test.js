/*globals assert, utils*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestDAG = void 0;

var
/*istanbul ignore next*/
_classes = require("../../classes");

var
/*istanbul ignore next*/
_JSNetworkXError = _interopRequireDefault(require("../../exceptions/JSNetworkXError"));

var
/*istanbul ignore next*/
_JSNetworkXUnfeasible = _interopRequireDefault(require("../../exceptions/JSNetworkXUnfeasible"));

var
/*istanbul ignore next*/
dag = _interopRequireWildcard(require("../dag"));

var
/*istanbul ignore next*/
_generators = require("../../generators");

/*istanbul ignore next*/ function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var TestDAG = {
  testTopologicalSort1: function
  /*istanbul ignore next*/
  testTopologicalSort1() {
    var DG = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    DiGraph();
    DG.addEdgesFrom([[1, 2], [1, 3], [2, 3]]);
    assert.deepEqual(dag.topologicalSort(DG), [1, 2, 3]);
    assert.deepEqual(dag.topologicalSortRecursive(DG), [1, 2, 3]);
  },
  testTopologicalSort2: function
  /*istanbul ignore next*/
  testTopologicalSort2() {
    var DG = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    DiGraph({
      1: [2],
      2: [3],
      3: [4],
      4: [5],
      5: [1],
      11: [12],
      12: [13],
      13: [14],
      14: [15]
    });
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return dag.topologicalSort(DG);
    },
    /*istanbul ignore next*/
    _JSNetworkXUnfeasible[
    /*istanbul ignore next*/
    "default"]);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return dag.topologicalSortRecursive(DG);
    },
    /*istanbul ignore next*/
    _JSNetworkXUnfeasible[
    /*istanbul ignore next*/
    "default"]);
    assert(!dag.isDirectedAcyclicGraph(DG));
    DG.removeEdge(1, 2);
    assert.deepEqual(dag.topologicalSortRecursive(DG), [11, 12, 13, 14, 15, 2, 3, 4, 5, 1]);
    assert.deepEqual(dag.topologicalSort(DG), [11, 12, 13, 14, 15, 2, 3, 4, 5, 1]);
    assert(dag.isDirectedAcyclicGraph(DG));
  },
  testTopologicalSort3: function
  /*istanbul ignore next*/
  testTopologicalSort3() {
    var DG = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    DiGraph();
    DG.addEdgesFrom(utils.range(2, 5).map(function (i)
    /*istanbul ignore next*/
    {
      return [1, i];
    }));
    DG.addEdgesFrom(utils.range(5, 9).map(function (i)
    /*istanbul ignore next*/
    {
      return [2, i];
    }));
    DG.addEdgesFrom(utils.range(9, 12).map(function (i)
    /*istanbul ignore next*/
    {
      return [6, i];
    }));
    DG.addEdgesFrom(utils.range(12, 15).map(function (i)
    /*istanbul ignore next*/
    {
      return [4, i];
    }));
    /*
    * Doesn't validate, probably because the order in which the nodes are
    * iterated over is different.
    assert.deepEqual(
      dag.topological_sort_recursive(DG),
      [1,4,14,13,12,3,2,7,6,11,10,9,5,8]
    );
    assert.deepEqual(
      dag.topological_sort(DG),
      [1,2,8,5,6,9,10,11,7,3,4,12,13,14]
    );
    */

    DG.addEdge(14, 1);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return dag.topologicalSort(DG);
    },
    /*istanbul ignore next*/
    _JSNetworkXUnfeasible[
    /*istanbul ignore next*/
    "default"]);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return dag.topologicalSortRecursive(DG);
    },
    /*istanbul ignore next*/
    _JSNetworkXUnfeasible[
    /*istanbul ignore next*/
    "default"]);
  },
  testTopologicalSort4: function
  /*istanbul ignore next*/
  testTopologicalSort4() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph();
    G.addEdge(0, 1);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return dag.topologicalSort(G);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return dag.topologicalSortRecursive(G);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
  },
  testTopologicalSort5: function
  /*istanbul ignore next*/
  testTopologicalSort5() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    DiGraph();
    G.addEdge(0, 1);
    assert.deepEqual(dag.topologicalSortRecursive(G), [0, 1]);
    assert.deepEqual(dag.topologicalSort(G), [0, 1]);
  },
  testNbunchArgument: function
  /*istanbul ignore next*/
  testNbunchArgument() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    DiGraph();
    G.addEdgesFrom([[1, 2], [2, 3], [1, 4], [1, 5], [2, 6]]);
    assert.deepEqual(dag.topologicalSort(G), [1, 2, 3, 6, 4, 5]);
    assert.deepEqual(dag.topologicalSortRecursive(G), [1, 5, 4, 2, 6, 3]);
    assert.deepEqual(dag.topologicalSort(G, [1]), [1, 2, 3, 6, 4, 5]);
    assert.deepEqual(dag.topologicalSortRecursive(G, [1]), [1, 5, 4, 2, 6, 3]);
    assert.deepEqual(dag.topologicalSort(G, [5]), [5]);
    assert.deepEqual(dag.topologicalSortRecursive(G, [5]), [5]);
  },
  testIsAperiodicCycle: function
  /*istanbul ignore next*/
  testIsAperiodicCycle() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    DiGraph();
    G.addCycle([1, 2, 3, 4]);
    assert(!dag.isAperiodic(G));
  },
  testIsAperiodicCycle2: function
  /*istanbul ignore next*/
  testIsAperiodicCycle2() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    DiGraph();
    G.addCycle([1, 2, 3, 4]);
    G.addCycle([3, 4, 5, 6, 7]);
    assert(dag.isAperiodic(G));
  },
  testIsAperiodicCycle3: function
  /*istanbul ignore next*/
  testIsAperiodicCycle3() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    DiGraph();
    G.addCycle([1, 2, 3, 4]);
    G.addCycle([3, 4, 5, 6]);
    assert(!dag.isAperiodic(G));
  },
  testIsAperiodicCycle4: function
  /*istanbul ignore next*/
  testIsAperiodicCycle4() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    DiGraph();
    G.addCycle([1, 2, 3, 4]);
    G.addCycle([1, 3]);
    assert(dag.isAperiodic(G));
  },
  testIsAperiodicSelfloop: function
  /*istanbul ignore next*/
  testIsAperiodicSelfloop() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    DiGraph();
    G.addCycle([1, 2, 3, 4]);
    G.addEdge(1, 1);
    assert(dag.isAperiodic(G));
  },
  testIsAperiodicRaise: function
  /*istanbul ignore next*/
  testIsAperiodicRaise() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph();
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return dag.isAperiodic(G);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
  },

  /* TODO: davis_southern_women_graph
  test_is_aperiodic_bipartite: function() {
    var G = new DiGraph(davis_southern_women_graph());
    assert(!dag.is_aperiodic(G));
  },
  */
  testIsAperiodicRaryTree: function
  /*istanbul ignore next*/
  testIsAperiodicRaryTree() {
    var G =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generators.
    /*istanbul ignore next*/
    fullRaryTree)(3, 27, new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    DiGraph());
    assert(!dag.isAperiodic(G));
  },
  testIsAperiodicDisconnected: function
  /*istanbul ignore next*/
  testIsAperiodicDisconnected() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    DiGraph();
    G.addCycle([1, 2, 3, 4]);
    G.addCycle([5, 6, 7, 8]);
    assert(!dag.isAperiodic(G));
    G.addEdge(1, 3);
    G.addEdge(5, 7);
    assert(dag.isAperiodic(G));
  },
  testIsAperiodicDisconnected2: function
  /*istanbul ignore next*/
  testIsAperiodicDisconnected2() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    DiGraph();
    G.addCycle([0, 1, 2]);
    G.addEdge(3, 3);
    assert(!dag.isAperiodic(G));
  }
};

/*istanbul ignore next*/
exports.TestDAG = TestDAG;