/*global assert, utils*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var
/*istanbul ignore next*/
_BaseMultiGraphTester = _interopRequireDefault(require("./BaseMultiGraphTester"));

var
/*istanbul ignore next*/
_ = require("../");

var
/*istanbul ignore next*/
_exceptions = require("../../exceptions");

var
/*istanbul ignore next*/
_shared = _interopRequireDefault(require("./shared"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Map = utils.Map;

function sorted(value) {
  return Array.from(value).sort();
}

var sharedMultiDigraph = {
  isShallow: function
  /*istanbul ignore next*/
  isShallow(H, G) {
    // graph
    assert.deepEqual(G.graph.foo, H.graph.foo);
    G.graph.foo.push(1);
    assert.deepEqual(G.graph.foo, H.graph.foo); // node

    assert.deepEqual(G.node.get(0).foo, H.node.get(0).foo);
    G.node.get(0).foo.push(1);
    assert.deepEqual(G.node.get(0).foo, H.node.get(0).foo); // edge

    assert.deepEqual(G.get(1).get(2)[0].foo, H.get(1).get(2)[0].foo);
    G.get(1).get(2)[0].foo.push(1);
    assert.deepEqual(G.get(1).get(2)[0].foo, H.get(1).get(2)[0].foo);
  },
  isDeep: function
  /*istanbul ignore next*/
  isDeep(H, G) {
    // graph
    assert.deepEqual(G.graph.foo, H.graph.foo);
    G.graph.foo.push(1);
    assert.notDeepEqual(G.graph.foo, H.graph.foo); // node

    assert.deepEqual(G.node.get(0).foo, H.node.get(0).foo);
    G.node.get(0).foo.push(1);
    assert.notDeepEqual(G.node.get(0).foo, H.node.get(0).foo); // edge

    assert.deepEqual(G.get(1).get(2)[0].foo, H.get(1).get(2)[0].foo);
    G.get(1).get(2)[0].foo.push(1);
    assert.notDeepEqual(G.get(1).get(2)[0].foo, H.get(1).get(2)[0].foo);
  }
};

/*istanbul ignore next*/
var _default = Object.assign({},
/*istanbul ignore next*/
_BaseMultiGraphTester[
/*istanbul ignore next*/
"default"], {
  testEdges: function
  /*istanbul ignore next*/
  testEdges() {
    var G = this.K3;
    assert.deepEqual(sorted(G.edges()), [[0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]]);
    assert.deepEqual(sorted(G.edges(0)), [[0, 1], [0, 2]]);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.edges(-1);
    },
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkxError);
  },
  testEdgesData: function
  /*istanbul ignore next*/
  testEdgesData() {
    var G = this.K3;
    assert.deepEqual(sorted(G.edges(true)), [[0, 1, {}], [0, 2, {}], [1, 0, {}], [1, 2, {}], [2, 0, {}], [2, 1, {}]]);
    assert.deepEqual(sorted(G.edges(0, true)), [[0, 1, {}], [0, 2, {}]]);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.neighbors(-1);
    },
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkxError);
  },
  testEdgesIter: function
  /*istanbul ignore next*/
  testEdgesIter() {
    var G = this.K3;
    assert.deepEqual(sorted(G.edgesIter()), [[0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]]);
    assert.deepEqual(sorted(G.edgesIter(0)), [[0, 1], [0, 2]]);
    G.addEdge(0, 1);
    assert.deepEqual(sorted(G.edgesIter()), [[0, 1], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]]);
  },
  testOutEdges: function
  /*istanbul ignore next*/
  testOutEdges() {
    var G = this.K3;
    assert.deepEqual(sorted(G.outEdges()), [[0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]]);
    assert.deepEqual(sorted(G.outEdges(0)), [[0, 1], [0, 2]]);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.outEdges(-1);
    },
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkxError);
    assert.deepEqual(sorted(G.outEdges(0, false, true)), [[0, 1, 0], [0, 2, 0]]);
  },
  testOutEdgesIter: function
  /*istanbul ignore next*/
  testOutEdgesIter() {
    var G = this.K3;
    assert.deepEqual(sorted(G.outEdgesIter()), [[0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]]);
    assert.deepEqual(sorted(G.outEdgesIter(0)), [[0, 1], [0, 2]]);
    G.addEdge(0, 1, 2);
    assert.deepEqual(sorted(G.edgesIter()), [[0, 1], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]]);
  },
  testInEdges: function
  /*istanbul ignore next*/
  testInEdges() {
    var G = this.K3;
    assert.deepEqual(sorted(G.inEdges()), [[0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]]);
    assert.deepEqual(sorted(G.inEdges(0)), [[1, 0], [2, 0]]);
    G.addEdge(0, 1, 2);
    assert.deepEqual(sorted(G.inEdges()), [[0, 1], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]]);
    assert.deepEqual(sorted(G.inEdges(0, false, true)), [[1, 0, 0], [2, 0, 0]]);
  },
  testInEdgesIter: function
  /*istanbul ignore next*/
  testInEdgesIter() {
    var G = this.K3;
    assert.deepEqual(sorted(G.inEdgesIter()), [[0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]]);
    assert.deepEqual(sorted(G.inEdgesIter(0)), [[1, 0], [2, 0]]);
    G.addEdge(0, 1, 2);
    assert.deepEqual(sorted(G.inEdgesIter()), [[0, 1], [0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]]);
    assert.deepEqual(sorted(G.inEdges(true)), [[0, 1, {}], [0, 1, {}], [0, 2, {}], [1, 0, {}], [1, 2, {}], [2, 0, {}], [2, 1, {}]]);
  },
  testToUndirected: function
  /*istanbul ignore next*/
  testToUndirected() {
    // MultiDiGraph -> MultiGraph changes number of edges so it is
    // not a copy operation... use isShallow, not isShallowCopy
    var G = this.K3;

    /*istanbul ignore next*/
    _shared[
    /*istanbul ignore next*/
    "default"].addAttributes(G);

    var H = new
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    MultiGraph(G);
    sharedMultiDigraph.isShallow(H, G);
    H = G.toUndirected();
    sharedMultiDigraph.isDeep(H, G);
  },
  testHasSuccessor: function
  /*istanbul ignore next*/
  testHasSuccessor() {
    var G = this.K3;
    assert.equal(G.hasSuccessor(0, 1), true);
    assert.equal(G.hasSuccessor(0, -1), false);
  },
  testSuccessors: function
  /*istanbul ignore next*/
  testSuccessors() {
    var G = this.K3;
    assert.deepEqual(sorted(G.successors(0)), [1, 2]);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.successors(-1);
    },
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkxError);
  },
  testSuccessorsIter: function
  /*istanbul ignore next*/
  testSuccessorsIter() {
    var G = this.K3;
    assert.deepEqual(sorted(G.successorsIter(0)), [1, 2]);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.successorsIter(-1);
    },
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkxError);
  },
  testHasPredecessor: function
  /*istanbul ignore next*/
  testHasPredecessor() {
    var G = this.K3;
    assert.equal(G.hasPredecessor(0, 1), true);
    assert.equal(G.hasPredecessor(0, -1), false);
  },
  testPredecessors: function
  /*istanbul ignore next*/
  testPredecessors() {
    var G = this.K3;
    assert.deepEqual(sorted(G.predecessors(0)), [1, 2]);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.predecessors(-1);
    },
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkxError);
  },
  testPredecessorsIter: function
  /*istanbul ignore next*/
  testPredecessorsIter() {
    var G = this.K3;
    assert.deepEqual(sorted(G.predecessorsIter(0)), [1, 2]);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.predecessorsIter(-1);
    },
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkxError);
  },
  testDegree: function
  /*istanbul ignore next*/
  testDegree() {
    var G = this.K3;
    assert.deepEqual(Array.from(G.degree().values()), [4, 4, 4]);
    assert.deepEqual(G.degree(), new Map({
      0: 4,
      1: 4,
      2: 4
    }));
    assert.equal(G.degree(0), 4);
    assert.deepEqual(G.degree([0]), new Map({
      0: 4
    }));
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.degree(-1);
    },
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkxError);
  },
  testDegreeIter: function
  /*istanbul ignore next*/
  testDegreeIter() {
    var G = this.K3;
    assert.deepEqual(sorted(G.degreeIter()), [[0, 4], [1, 4], [2, 4]]);
    assert.deepEqual(new Map(G.degreeIter()), new Map([[0, 4], [1, 4], [2, 4]]));
    assert.deepEqual(sorted(G.degreeIter(0)), [[0, 4]]);
    G.addEdge(0, 1, {
      weight: 0.3,
      other: 1.2
    });
    assert.deepEqual(sorted(G.degreeIter(null, 'weight')), [[0, 4.3], [1, 4.3], [2, 4]]);
    assert.deepEqual(sorted(G.degreeIter(null, 'other')), [[0, 5.2], [1, 5.2], [2, 4]]);
  },
  testInDegree: function
  /*istanbul ignore next*/
  testInDegree() {
    var G = this.K3;
    assert.deepEqual(Array.from(G.inDegree().values()), [2, 2, 2]);
    assert.deepEqual(G.inDegree(), new Map({
      0: 2,
      1: 2,
      2: 2
    }));
    assert.equal(G.inDegree(0), 2);
    assert.deepEqual(G.inDegree([0]), new Map({
      0: 2
    }));
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.inDegree(-1);
    },
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkxError);
  },
  testInDegreeIter: function
  /*istanbul ignore next*/
  testInDegreeIter() {
    var G = this.K3;
    assert.deepEqual(sorted(G.inDegreeIter()), [[0, 2], [1, 2], [2, 2]]);
    assert.deepEqual(new Map(G.inDegreeIter()), new Map([[0, 2], [1, 2], [2, 2]]));
    assert.deepEqual(sorted(G.inDegreeIter(0)), [[0, 2]]);
    assert.deepEqual(sorted(G.inDegreeIter(0, 'weight')), [[0, 2]]);
  },
  testOutDegree: function
  /*istanbul ignore next*/
  testOutDegree() {
    var G = this.K3;
    assert.deepEqual(Array.from(G.outDegree().values()), [2, 2, 2]);
    assert.deepEqual(G.outDegree(), new Map({
      0: 2,
      1: 2,
      2: 2
    }));
    assert.equal(G.outDegree(0), 2);
    assert.deepEqual(G.outDegree([0]), new Map({
      0: 2
    }));
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.outDegree(-1);
    },
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkxError);
  },
  testOutDegreeIter: function
  /*istanbul ignore next*/
  testOutDegreeIter() {
    var G = this.K3;
    assert.deepEqual(sorted(G.outDegreeIter()), [[0, 2], [1, 2], [2, 2]]);
    assert.deepEqual(new Map(G.outDegreeIter()), new Map([[0, 2], [1, 2], [2, 2]]));
    assert.deepEqual(sorted(G.outDegreeIter(0)), [[0, 2]]);
    assert.deepEqual(sorted(G.outDegreeIter(0, 'weight')), [[0, 2]]);
  },
  testSize: function
  /*istanbul ignore next*/
  testSize() {
    var G = this.K3;
    assert.equal(G.size(), 6);
    assert.equal(G.numberOfEdges(), 6);
    G.addEdge(0, 1, {
      weight: 0.3,
      other: 1.2
    });
    assert.equal(G.size('weight'), 6.3);
    assert.equal(G.size('other'), 7.2);
  },
  testToUndirectedReciprocal: function
  /*istanbul ignore next*/
  testToUndirectedReciprocal() {
    var G = new this.Graph();
    G.addEdge(1, 2);
    assert.equal(G.toUndirected().hasEdge(1, 2), true);
    assert.equal(G.toUndirected(true).hasEdge(1, 2), false);
    G.addEdge(2, 1);
    assert.equal(G.toUndirected(true).hasEdge(1, 2), true);
  },
  testReverseCopy: function
  /*istanbul ignore next*/
  testReverseCopy() {
    var G = new
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    MultiDiGraph([[0, 1], [0, 1]]);
    var R = G.reverse();
    assert.deepEqual(sorted(R.edges()), [[1, 0], [1, 0]]);
    R.removeEdge(1, 0);
    assert.deepEqual(sorted(R.edges()), [[1, 0]]);
    assert.deepEqual(sorted(G.edges()), [[0, 1], [0, 1]]);
  },
  testReverseNocopy: function
  /*istanbul ignore next*/
  testReverseNocopy() {
    var G = new
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    MultiDiGraph([[0, 1], [0, 1]]);
    var R = G.reverse(false);
    assert.deepEqual(sorted(R.edges()), [[1, 0], [1, 0]]);
    R.removeEdge(1, 0);
    assert.deepEqual(sorted(R.edges()), [[1, 0]]);
    assert.deepEqual(sorted(G.edges()), [[1, 0]]);
  }
});

/*istanbul ignore next*/
exports["default"] = _default;