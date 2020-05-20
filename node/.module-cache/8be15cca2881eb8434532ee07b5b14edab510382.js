/*global assert, utils*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var
/*istanbul ignore next*/
_BaseGraphTester = _interopRequireDefault(require("./BaseGraphTester"));

var
/*istanbul ignore next*/
_DiGraph = _interopRequireDefault(require("../DiGraph"));

var
/*istanbul ignore next*/
_JSNetworkXError = _interopRequireDefault(require("../../exceptions/JSNetworkXError"));

var
/*istanbul ignore next*/
_lodash = _interopRequireDefault(require("lodash"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Map = utils.Map;

/*istanbul ignore next*/
// Tests specific to dict-of-dict-of-dict graph data structure
var _default =
/*istanbul ignore next*/
_lodash[
/*istanbul ignore next*/
"default"].extend({},
/*istanbul ignore next*/
_BaseGraphTester[
/*istanbul ignore next*/
"default"], {
  testHasSuccessor: function
  /*istanbul ignore next*/
  testHasSuccessor() {
    var G = this.K3;
    assert.ok(G.hasSuccessor(0, 1));
    assert.ok(!G.hasSuccessor(0, -1));
  },
  testSuccessors: function
  /*istanbul ignore next*/
  testSuccessors() {
    var G = this.K3;
    assert.deepEqual(G.successors(0), [1, 2]);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.successors(-1);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
  },
  testSuccessorsIter: function
  /*istanbul ignore next*/
  testSuccessorsIter() {
    var G = this.K3;
    assert.deepEqual(Array.from(G.successorsIter(0)), [1, 2]);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.successorsIter(-1);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
  },
  testHasPredecessor: function
  /*istanbul ignore next*/
  testHasPredecessor() {
    var G = this.K3;
    assert.ok(G.hasPredecessor(0, 1));
    assert.ok(!G.hasPredecessor(0, -1));
  },
  testPredecessors: function
  /*istanbul ignore next*/
  testPredecessors() {
    var G = this.K3;
    assert.deepEqual(G.predecessors(0), [1, 2]);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.predecessors(-1);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
  },
  testPredecessorsIter: function
  /*istanbul ignore next*/
  testPredecessorsIter() {
    var G = this.K3;
    assert.deepEqual(Array.from(G.predecessorsIter(0)), [1, 2]);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.predecessorsIter(-1);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
  },
  testEdges: function
  /*istanbul ignore next*/
  testEdges() {
    var G = this.K3;
    assert.deepEqual(G.edges(), [[0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]]);
    assert.deepEqual(G.edges(0), [[0, 1], [0, 2]]);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.edges(-1);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
  },
  testEdgesIter: function
  /*istanbul ignore next*/
  testEdgesIter() {
    var G = this.K3;
    assert.deepEqual(Array.from(G.edgesIter()), [[0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]]);
    assert.deepEqual(Array.from(G.edgesIter(0)), [[0, 1], [0, 2]]);
  },
  testEdgesData: function
  /*istanbul ignore next*/
  testEdgesData() {
    var G = this.K3;
    assert.deepEqual(G.edges(true), [[0, 1, {}], [0, 2, {}], [1, 0, {}], [1, 2, {}], [2, 0, {}], [2, 1, {}]]);
    assert.deepEqual(G.edges(0, true), [[0, 1, {}], [0, 2, {}]]);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.edges(-1);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
  },
  testOutEdges: function
  /*istanbul ignore next*/
  testOutEdges() {
    var G = this.K3;
    assert.deepEqual(G.outEdges(), [[0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]]);
    assert.deepEqual(G.outEdges(0), [[0, 1], [0, 2]]);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.edges(-1);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
  },
  testOutEdgesIter: function
  /*istanbul ignore next*/
  testOutEdgesIter() {
    var G = this.K3;
    assert.deepEqual(Array.from(G.outEdgesIter()), [[0, 1], [0, 2], [1, 0], [1, 2], [2, 0], [2, 1]]);
    assert.deepEqual(Array.from(G.outEdgesIter(0)), [[0, 1], [0, 2]]);
  },
  testOutEdgesDir: function
  /*istanbul ignore next*/
  testOutEdgesDir() {
    var G = this.P3;
    assert.deepEqual(G.outEdges(), [[0, 1], [1, 2]]);
    assert.deepEqual(G.outEdges(0), [[0, 1]]);
    assert.deepEqual(G.outEdges(2), []);
  },
  testOutEdgesIterDir: function
  /*istanbul ignore next*/
  testOutEdgesIterDir() {
    var G = this.P3;
    assert.deepEqual(Array.from(G.outEdgesIter()), [[0, 1], [1, 2]]);
    assert.deepEqual(Array.from(G.outEdgesIter(0)), [[0, 1]]);
    assert.deepEqual(Array.from(G.outEdgesIter(2)), []);
  },
  testInEdgesDir: function
  /*istanbul ignore next*/
  testInEdgesDir() {
    var G = this.P3;
    assert.deepEqual(G.inEdges(), [[0, 1], [1, 2]]);
    assert.deepEqual(G.inEdges(0), []);
    assert.deepEqual(G.inEdges(2), [[1, 2]]);
  },
  testInEdgesIterDir: function
  /*istanbul ignore next*/
  testInEdgesIterDir() {
    var G = this.P3;
    assert.deepEqual(Array.from(G.inEdgesIter()), [[0, 1], [1, 2]]);
    assert.deepEqual(Array.from(G.inEdgesIter(0)), []);
    assert.deepEqual(Array.from(G.inEdgesIter(2)), [[1, 2]]);
  },
  testDegree: function
  /*istanbul ignore next*/
  testDegree() {
    var G = this.K3;
    assert.deepEqual(Array.from(G.degree().values()), [4, 4, 4]);
    assert.deepEqual(G.degree(), new Map([[0, 4], [1, 4], [2, 4]]));
    assert.strictEqual(G.degree(0), 4);
    assert.deepEqual(G.degree([0]), new Map([[0, 4]]));
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.degree(-1);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
  },
  testDegreeIter: function
  /*istanbul ignore next*/
  testDegreeIter() {
    var G = this.K3;
    assert.deepEqual(Array.from(G.degreeIter()), [[0, 4], [1, 4], [2, 4]]);
    assert.deepEqual(new Map(G.degreeIter()), new Map([[0, 4], [1, 4], [2, 4]]));
    assert.deepEqual(Array.from(G.degreeIter(0)), [[0, 4]]);
  },
  testInDegree: function
  /*istanbul ignore next*/
  testInDegree() {
    var G = this.K3;
    assert.deepEqual(Array.from(G.inDegree().values()), [2, 2, 2]);
    assert.deepEqual(G.inDegree(), new Map([[0, 2], [1, 2], [2, 2]]));
    assert.strictEqual(G.inDegree(0), 2);
    assert.deepEqual(G.inDegree([0]), new Map([[0, 2]]));
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.inDegree(-1);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
  },
  testInDegreeIter: function
  /*istanbul ignore next*/
  testInDegreeIter() {
    var G = this.K3;
    assert.deepEqual(Array.from(G.inDegreeIter()), [[0, 2], [1, 2], [2, 2]]);
    assert.deepEqual(new Map(G.inDegreeIter()), new Map([[0, 2], [1, 2], [2, 2]]));
    assert.deepEqual(Array.from(G.inDegreeIter(0)), [[0, 2]]);
  },
  testInDegreeIterWeighted: function
  /*istanbul ignore next*/
  testInDegreeIterWeighted() {
    var G = this.K3;
    G.addEdge(0, 1, {
      weight: 0.3,
      other: 1.2
    });
    assert.deepEqual(Array.from(G.inDegreeIter(null, 'weight')), [[0, 2], [1, 1.3], [2, 2]]);
    assert.deepEqual(new Map(G.inDegreeIter(null, 'weight')), new Map([[0, 2], [1, 1.3], [2, 2]]));
    assert.deepEqual(Array.from(G.inDegreeIter(1, 'weight')), [[1, 1.3]]);
    assert.deepEqual(Array.from(G.inDegreeIter(null, 'other')), [[0, 2], [1, 2.2], [2, 2]]);
    assert.deepEqual(new Map(G.inDegreeIter(null, 'other')), new Map([[0, 2], [1, 2.2], [2, 2]]));
    assert.deepEqual(Array.from(G.inDegreeIter(1, 'other')), [[1, 2.2]]);
  },
  testOutDegree: function
  /*istanbul ignore next*/
  testOutDegree() {
    var G = this.K3;
    assert.deepEqual(Array.from(G.outDegree().values()), [2, 2, 2]);
    assert.deepEqual(G.outDegree(), new Map([[0, 2], [1, 2], [2, 2]]));
    assert.strictEqual(G.outDegree(0), 2);
    assert.deepEqual(G.outDegree([0]), new Map([[0, 2]]));
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.outDegree(-1);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
  },
  testOutDegreeIter: function
  /*istanbul ignore next*/
  testOutDegreeIter() {
    var G = this.K3;
    assert.deepEqual(Array.from(G.outDegreeIter()), [[0, 2], [1, 2], [2, 2]]);
    assert.deepEqual(new Map(G.outDegreeIter()), new Map([[0, 2], [1, 2], [2, 2]]));
    assert.deepEqual(Array.from(G.outDegreeIter(0)), [[0, 2]]);
  },
  testOutDegreeIterWeighted: function
  /*istanbul ignore next*/
  testOutDegreeIterWeighted() {
    var G = this.K3;
    G.addEdge(0, 1, {
      weight: 0.3,
      other: 1.2
    });
    assert.deepEqual(Array.from(G.outDegreeIter(null, 'weight')), [[0, 1.3], [1, 2], [2, 2]]);
    assert.deepEqual(new Map(G.outDegreeIter(null, 'weight')), new Map([[0, 1.3], [1, 2], [2, 2]]));
    assert.deepEqual(Array.from(G.outDegreeIter(0, 'weight')), [[0, 1.3]]);
    assert.deepEqual(Array.from(G.outDegreeIter(null, 'other')), [[0, 2.2], [1, 2], [2, 2]]);
    assert.deepEqual(new Map(G.outDegreeIter(null, 'other')), new Map([[0, 2.2], [1, 2], [2, 2]]));
    assert.deepEqual(Array.from(G.outDegreeIter(0, 'other')), [[0, 2.2]]);
  },
  testSize: function
  /*istanbul ignore next*/
  testSize() {
    var G = this.K3;
    assert.strictEqual(G.size(), 6);
    assert.strictEqual(G.numberOfEdges(), 6);
  },
  testToUndirectedReciprocal: function
  /*istanbul ignore next*/
  testToUndirectedReciprocal() {
    var G = new this.Graph();
    G.addEdge(1, 2);
    assert.ok(G.toUndirected().hasEdge(1, 2));
    assert.ok(!G.toUndirected(true).hasEdge(1, 2));
    G.addEdge(2, 1);
    assert.ok(G.toUndirected(true).hasEdge(1, 2));
  },
  testReverseCopy: function
  /*istanbul ignore next*/
  testReverseCopy() {
    var G = new
    /*istanbul ignore next*/
    _DiGraph[
    /*istanbul ignore next*/
    "default"]([[0, 1], [1, 2]]);
    var R = G.reverse();
    assert.deepEqual(R.edges(), [[1, 0], [2, 1]]);
    R.removeEdge(1, 0);
    assert.deepEqual(R.edges(), [[2, 1]]);
    assert.deepEqual(G.edges(), [[0, 1], [1, 2]]);
  },
  testReverseNocopy: function
  /*istanbul ignore next*/
  testReverseNocopy() {
    var G = new
    /*istanbul ignore next*/
    _DiGraph[
    /*istanbul ignore next*/
    "default"]([[0, 1], [1, 2]]);
    var R = G.reverse(false);
    assert.deepEqual(R.edges(), [[1, 0], [2, 1]]);
    R.removeEdge(1, 0);
    assert.deepEqual(R.edges(), [[2, 1]]);
    assert.deepEqual(G.edges(), [[2, 1]]);
  }
});

/*istanbul ignore next*/
exports["default"] = _default;