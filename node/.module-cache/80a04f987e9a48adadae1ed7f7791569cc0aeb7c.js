/*jshint strict:false, node:true*/

/*global utils, assert*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testFunction = void 0;

var
/*istanbul ignore next*/
_Graph = _interopRequireDefault(require("../Graph"));

var
/*istanbul ignore next*/
_DiGraph = _interopRequireDefault(require("../DiGraph"));

var
/*istanbul ignore next*/
_JSNetworkXError = _interopRequireDefault(require("../../exceptions/JSNetworkXError"));

var
/*istanbul ignore next*/
funcs = _interopRequireWildcard(require("../functions"));

/*istanbul ignore next*/ function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*eslint no-native-reassign:0*/
var Map = utils.Map;
var testFunction = {
  beforeEach: function
  /*istanbul ignore next*/
  beforeEach() {
    this.G = new
    /*istanbul ignore next*/
    _Graph[
    /*istanbul ignore next*/
    "default"]({
      0: [1, 2, 3],
      1: [1, 2, 0],
      4: []
    }, {
      name: 'Test'
    });
    this.Gdegree = new Map({
      0: 3,
      1: 2,
      3: 1,
      4: 0
    });
    this.Gnodes = [0, 1, 2, 3, 4];
    this.Gedges = [[0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2]];
    this.DG = new
    /*istanbul ignore next*/
    _DiGraph[
    /*istanbul ignore next*/
    "default"]({
      0: [1, 2, 3],
      1: [1, 2, 0],
      4: []
    });
    this.DGinDegree = new Map({
      0: 1,
      1: 2,
      2: 2,
      3: 1,
      4: 0
    });
    this.DoutDegree = new Map({
      0: 3,
      1: 3,
      2: 0,
      3: 0,
      4: 0
    });
    this.DGnodes = [0, 1, 2, 3, 4];
    this.DGedges = [[0, 1], [0, 2], [0, 3], [1, 0], [1, 1], [1, 2]];
  },
  testNodes: function
  /*istanbul ignore next*/
  testNodes() {
    assert.deepEqual(this.G.nodes(), funcs.nodes(this.G));
    assert.deepEqual(this.DG.nodes(), funcs.nodes(this.DG));
  },
  testEdges: function
  /*istanbul ignore next*/
  testEdges() {
    assert.deepEqual(this.G.edges(), funcs.edges(this.G));
    assert.deepEqual(this.DG.edges(), funcs.edges(this.DG));
    assert.deepEqual(this.G.edges([0, 1, 3]), funcs.edges(this.G, [0, 1, 3]));
    assert.deepEqual(this.DG.edges([0, 1, 3]), funcs.edges(this.DG, [0, 1, 3]));
  },
  testNodesIter: function
  /*istanbul ignore next*/
  testNodesIter() {
    assert.deepEqual(Array.from(this.G.nodesIter()), Array.from(funcs.nodesIter(this.G)));
    assert.deepEqual(Array.from(this.DG.nodesIter()), Array.from(funcs.nodesIter(this.DG)));
  },
  testEdgesIter: function
  /*istanbul ignore next*/
  testEdgesIter() {
    assert.deepEqual(Array.from(this.G.edgesIter()), Array.from(funcs.edgesIter(this.G)));
    assert.deepEqual(Array.from(this.DG.edgesIter()), Array.from(funcs.edgesIter(this.DG)));
    assert.deepEqual(Array.from(this.G.edgesIter([0, 1, 3])), Array.from(funcs.edgesIter(this.G, [0, 1, 3])));
    assert.deepEqual(Array.from(this.DG.edgesIter([0, 1, 3])), Array.from(funcs.edgesIter(this.DG, [0, 1, 3])));
  },
  testDegree: function
  /*istanbul ignore next*/
  testDegree() {
    assert.deepEqual(this.G.degree(), funcs.degree(this.G));
    assert.deepEqual(this.DG.degree(), funcs.degree(this.DG));
    assert.deepEqual(this.G.degree([0, 1]), funcs.degree(this.G, [0, 1]));
    assert.deepEqual(this.DG.degree([0, 1]), funcs.degree(this.DG, [0, 1]));
    assert.deepEqual(this.G.degree(null, 'weight'), funcs.degree(this.G, null, 'weight'));
    assert.deepEqual(this.DG.degree(null, 'weight'), funcs.degree(this.DG, null, 'weight'));
  },
  testNeighbors: function
  /*istanbul ignore next*/
  testNeighbors() {
    assert.deepEqual(this.G.neighbors(1), funcs.neighbors(this.G, 1));
    assert.deepEqual(this.DG.neighbors(1), funcs.neighbors(this.DG, 1));
  },
  testNumberOfNodes: function
  /*istanbul ignore next*/
  testNumberOfNodes() {
    assert.equal(this.G.numberOfNodes(), funcs.numberOfNodes(this.G));
    assert.equal(this.DG.numberOfNodes(), funcs.numberOfNodes(this.DG));
  },
  testNumberOfEdges: function
  /*istanbul ignore next*/
  testNumberOfEdges() {
    assert.equal(this.G.numberOfEdges(), funcs.numberOfEdges(this.G));
    assert.equal(this.DG.numberOfEdges(), funcs.numberOfEdges(this.DG));
  },
  testIsDirected: function
  /*istanbul ignore next*/
  testIsDirected() {
    assert.equal(this.G.isDirected(), funcs.isDirected(this.G));
    assert.equal(this.DG.isDirected(), funcs.isDirected(this.DG));
  },
  testSubgraph: function
  /*istanbul ignore next*/
  testSubgraph() {
    assert.deepEqual(this.G.subgraph([0, 1, 2, 4]), funcs.subgraph(this.G, [0, 1, 2, 4]));
    assert.deepEqual(this.DG.subgraph([0, 1, 2, 4]), funcs.subgraph(this.DG, [0, 1, 2, 4]));
  },
  testCreateEmptyCopy: function
  /*istanbul ignore next*/
  testCreateEmptyCopy() {
    var G = funcs.createEmptyCopy(this.G, false);
    assert.deepEqual(G.nodes(), []);
    assert.deepEqual(G.graph, {});
    assert.deepEqual(G.node, new Map());
    assert.deepEqual(G.edge, new Map());
    G = funcs.createEmptyCopy(this.G);
    assert.deepEqual(G.nodes(), this.G.nodes());
    assert.deepEqual(G.graph, {});
    assert.deepEqual(G.node, new Map(this.G.nodes().map(function (v)
    /*istanbul ignore next*/
    {
      return [v, {}];
    })));
    assert.deepEqual(G.edge, new Map(this.G.nodes().map(function (v)
    /*istanbul ignore next*/
    {
      return [v, new Map()];
    })));
  },
  testDegreeHistogram: function
  /*istanbul ignore next*/
  testDegreeHistogram() {
    assert.deepEqual(funcs.degreeHistogram(this.G), [1, 1, 1, 1, 1]);
  },
  testDensity: function
  /*istanbul ignore next*/
  testDensity() {
    assert.equal(funcs.density(this.G), 0.5);
    assert.equal(funcs.density(this.DG), 0.3);
    var G = new
    /*istanbul ignore next*/
    _Graph[
    /*istanbul ignore next*/
    "default"]();
    G.addNode(1);
    assert.equal(funcs.density(G), 0.0);
  },
  testFreeze: function
  /*istanbul ignore next*/
  testFreeze() {
    var G = funcs.freeze(this.G);
    assert.equal(G.frozen, true);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.addNode(1);
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
      return G.addNodesFrom([1]);
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
      return G.removeNode(1);
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
      return G.removeNodesFrom([1]);
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
      return G.addEdge([1, 2]);
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
      return G.addEdgesFrom([[1, 2]]);
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
      return G.removeEdge([1, 2]);
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
      return G.removeEdgesFrom([[1, 2]]);
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
      return G.clear();
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
  },
  testIsFrozen: function
  /*istanbul ignore next*/
  testIsFrozen() {
    assert.equal(funcs.isFrozen(this.G), false);
    var G = funcs.freeze(this.G);
    assert.equal(G.frozen, funcs.isFrozen(G));
    assert.equal(funcs.isFrozen(this.G), true);
  },

  /* TODO: Implement when path_graph is implemented
  test_info: function() {
    var G = path_graph(5);
    var info = info(G);
    var expected_graph_info = [
        'Name: path_graph(5)',
        'Type: Graph',
        'Number of nodes: 5',
        'Number of edges: 4',
        'Average degree: 1.6000'
    ].join('\n');
     assert.equal(info, expected_graph_info);
  },
  */
  testInfoDigraph: function
  /*istanbul ignore next*/
  testInfoDigraph() {
    var G = new
    /*istanbul ignore next*/
    _DiGraph[
    /*istanbul ignore next*/
    "default"](null, {
      name: 'path_graph(5)'
    });
    G.addPath([0, 1, 2, 3, 4]);
    var info = funcs.info(G);
    var expectedGraphInfo = ['Name: path_graph(5)', 'Type: DiGraph', 'Number of nodes: 5', 'Number of edges: 4', 'Average in degree: 0.8000', 'Average out degree: 0.8000'].join('\n');
    assert.equal(info, expectedGraphInfo);
    info = funcs.info(G, 1);
    var expectedNodeInfo = ['Node 1 has the following properties:', 'Degree: 2', 'Neighbors: 2'].join('\n');
    assert.equal(info, expectedNodeInfo);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return funcs.info(G, -1);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
  }
};

/*istanbul ignore next*/
exports.testFunction = testFunction;