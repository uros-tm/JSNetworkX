/*global assert, utils*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestGraph = void 0;

var
/*istanbul ignore next*/
_BaseAttrGraphTester = _interopRequireDefault(require("./BaseAttrGraphTester"));

var
/*istanbul ignore next*/
_Graph = _interopRequireDefault(require("../Graph"));

var
/*istanbul ignore next*/
_JSNetworkXError = _interopRequireDefault(require("../../exceptions/JSNetworkXError"));

var
/*istanbul ignore next*/
_KeyError = _interopRequireDefault(require("../../exceptions/KeyError"));

var
/*istanbul ignore next*/
_lodash = _interopRequireDefault(require("lodash"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Map = utils.Map;

var sorted = function sorted(iterator) {
  return Array.from(iterator).sort();
}; // Tests specific to dict-of-dict-of-dict graph data structure


var TestGraph =
/*istanbul ignore next*/
_lodash[
/*istanbul ignore next*/
"default"].extend({},
/*istanbul ignore next*/
_BaseAttrGraphTester[
/*istanbul ignore next*/
"default"], {
  beforeEach: function
  /*istanbul ignore next*/
  beforeEach() {
    var ed1 = {};
    var ed2 = {};
    var ed3 = {};
    this.Graph =
    /*istanbul ignore next*/
    _Graph[
    /*istanbul ignore next*/
    "default"]; // build dict-of-dict-of-dict K3

    this.k3adj = new Map([[0, new Map([[1, ed1], [2, ed2]])], [1, new Map([[0, ed1], [2, ed3]])], [2, new Map([[0, ed2], [1, ed3]])]]);
    this.k3edges = [[0, 1], [0, 2], [1, 2]];
    this.k3nodes = [0, 1, 2];
    this.K3 = new this.Graph();
    this.K3.adj = this.K3.edge = this.k3adj;
    this.K3.node = new Map([[0, {}], [1, {}], [2, {}]]);
  },
  testDataInput: function
  /*istanbul ignore next*/
  testDataInput() {
    var G = new this.Graph(new Map([[1, [2]], [2, [1]]]), {
      name: 'test'
    });
    assert.deepEqual(sorted(G.adj.entries()), [[1, new Map([[2, {}]])], [2, new Map([[1, {}]])]]);
  },
  testAdjacencyIter: function
  /*istanbul ignore next*/
  testAdjacencyIter() {
    var G = this.K3;
    assert.deepEqual(sorted(G.adjacencyIter()), [[0, new Map([[1, {}], [2, {}]])], [1, new Map([[0, {}], [2, {}]])], [2, new Map([[0, {}], [1, {}]])]]);
  },
  testGetitem: function
  /*istanbul ignore next*/
  testGetitem() {
    var G = this.K3;
    assert.deepEqual(G.get(0), new Map([[1, {}], [2, {}]]));
    assert[
    /*istanbul ignore next*/
    "throws"](function () {
      G.get('j');
    },
    /*istanbul ignore next*/
    _KeyError[
    /*istanbul ignore next*/
    "default"]); //  assert_raises((TypeError,networkx.NetworkXError), G.__getitem__, ['A'])
  },
  testAddNode: function
  /*istanbul ignore next*/
  testAddNode() {
    var G = new this.Graph();
    G.addNode(0);
    assert.deepEqual(G.adj, new Map([[0, new Map()]])); // test add attributes

    G.addNode(1, {
      c: 'red'
    });
    G.addNode(2, {
      c: 'blue'
    });
    assert[
    /*istanbul ignore next*/
    "throws"](function () {
      G.addNode(4, []);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
    assert[
    /*istanbul ignore next*/
    "throws"](function () {
      G.addNode(4, 4);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
    assert.equal(G.node.get(1).c, 'red');
    assert.equal(G.node.get(2).c, 'blue'); // test upding attributes

    G.addNode(1, {
      c: 'blue'
    });
    G.addNode(2, {
      c: 'red'
    });
    assert.equal(G.node.get(1).c, 'blue');
    assert.equal(G.node.get(2).c, 'red');
  },
  testAddNodesFrom: function
  /*istanbul ignore next*/
  testAddNodesFrom() {
    var G = new this.Graph();
    G.addNodesFrom([0, 1, 2]);
    assert.deepEqual(G.adj, new Map([[0, new Map()], [1, new Map()], [2, new Map()]])); // test add attributes

    G.addNodesFrom([0, 1, 2], {
      c: 'red'
    });
    assert.equal(G.node.get(0).c, 'red');
    assert.equal(G.node.get(2).c, 'red'); // test that attribute dicts are not the same

    assert.notEqual(G.node.get(0), G.node.get(1)); // test updating attributes

    G.addNodesFrom([0, 1, 2], {
      c: 'blue'
    });
    assert.equal(G.node.get(0).c, 'blue');
    assert.equal(G.node.get(2).c, 'blue');
    assert.notEqual(G.node.get(0), G.node.get(1)); // test tuple input

    var H = new this.Graph();
    H.addNodesFrom(G.nodes(true));
    assert.equal(H.node.get(0).c, 'blue');
    assert.equal(H.node.get(2).c, 'blue');
    assert.notEqual(H.node.get(0), H.node.get(1)); // specific overrides general

    H.addNodesFrom([0, [1, {
      c: 'green'
    }], [3, {
      c: 'cyan'
    }]], {
      c: 'red'
    });
    assert.equal(H.node.get(0).c, 'red');
    assert.equal(H.node.get(1).c, 'green');
    assert.equal(H.node.get(2).c, 'blue');
    assert.equal(H.node.get(3).c, 'cyan');
  },
  testRemoveNode: function
  /*istanbul ignore next*/
  testRemoveNode() {
    var G = this.K3;
    G.removeNode(0);
    assert.deepEqual(G.adj, new Map([[1, new Map([[2, {}]])], [2, new Map([[1, {}]])]]));
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.removeNode(-1);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
  },
  testRemoveNodesFrom: function
  /*istanbul ignore next*/
  testRemoveNodesFrom() {
    var G = this.K3;
    G.removeNodesFrom([0, 1]);
    assert.deepEqual(G.adj, new Map([[2, new Map()]]));
    assert.doesNotThrow(function ()
    /*istanbul ignore next*/
    {
      return G.removeNodesFrom([-1]);
    }); // silent fail
  },
  testAddEdge: function
  /*istanbul ignore next*/
  testAddEdge() {
    var G = new this.Graph();
    G.addEdge(0, 1);
    assert.deepEqual(G.adj, new Map([[0, new Map([[1, {}]])], [1, new Map([[0, {}]])]]));
    G = new this.Graph();
    G.addEdge.apply(G, [0, 1]); //  G.add_edge(*(0,1))

    assert.deepEqual(G.adj, new Map([[0, new Map([[1, {}]])], [1, new Map([[0, {}]])]]));
  },
  testAddEdgesFrom: function
  /*istanbul ignore next*/
  testAddEdgesFrom() {
    var G = new this.Graph();
    G.addEdgesFrom([[0, 1], [0, 2, {
      weight: 3
    }]]);
    assert.deepEqual(G.adj, new Map([[0, new Map([[1, {}], [2, {
      weight: 3
    }]])], [1, new Map([[0, {}]])], [2, new Map([[0, {
      weight: 3
    }]])]]));
    G.addEdgesFrom([[0, 1], [0, 2, {
      weight: 3
    }], [1, 2, {
      data: 4
    }]], {
      data: 2
    });
    assert.deepEqual(G.adj, new Map([[0, new Map([[1, {
      data: 2
    }], [2, {
      data: 2,
      weight: 3
    }]])], [1, new Map([[0, {
      data: 2
    }], [2, {
      data: 4
    }]])], [2, new Map([[0, {
      weight: 3,
      data: 2
    }], [1, {
      data: 4
    }]])]]));
    assert[
    /*istanbul ignore next*/
    "throws"](function () {
      G.addEdgesFrom([[0]]);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
    assert[
    /*istanbul ignore next*/
    "throws"](function () {
      G.addEdgesFrom([[0, 1, 2, 3]]);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]); // too many in tuple
    // not a tuple

    assert[
    /*istanbul ignore next*/
    "throws"](function () {
      G.addEdgesFrom([0]);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
  },
  testRemoveEdge: function
  /*istanbul ignore next*/
  testRemoveEdge() {
    var G = this.K3;
    G.removeEdge(0, 1);
    assert.deepEqual(G.adj, new Map([[0, new Map([[2, {}]])], [1, new Map([[2, {}]])], [2, new Map([[0, {}], [1, {}]])]]));
    assert[
    /*istanbul ignore next*/
    "throws"](function () {
      G.removeEdge(-1, 0);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
  },
  testRemoveEdgesFrom: function
  /*istanbul ignore next*/
  testRemoveEdgesFrom() {
    var G = this.K3;
    G.removeEdgesFrom([[0, 1]]);
    assert.deepEqual(G.adj, new Map([[0, new Map([[2, {}]])], [1, new Map([[2, {}]])], [2, new Map([[0, {}], [1, {}]])]]));
    assert.doesNotThrow(function ()
    /*istanbul ignore next*/
    {
      return G.removeEdgesFrom([[0, 0]]);
    }); // silent fail
  },
  testClear: function
  /*istanbul ignore next*/
  testClear() {
    var G = this.K3;
    G.clear();
    assert.deepEqual(G.adj, new Map());
  },
  testEdgesData: function
  /*istanbul ignore next*/
  testEdgesData() {
    var G = this.K3;
    assert.deepEqual(sorted(G.edges(true)), [[0, 1, {}], [0, 2, {}], [1, 2, {}]]);
    assert.deepEqual(sorted(G.edges(0, true)), [[0, 1, {}], [0, 2, {}]]);
    assert[
    /*istanbul ignore next*/
    "throws"](function () {
      G.edges(-1);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
  },
  testGetEdgeData: function
  /*istanbul ignore next*/
  testGetEdgeData() {
    var G = this.K3;
    assert.deepEqual(G.getEdgeData(0, 1), {});
    assert.equal(G.getEdgeData(10, 20), null);
    assert.equal(G.getEdgeData(-1, 0), null);
    assert.equal(G.getEdgeData(-1, 0, 1), 1);
  }
});

/*istanbul ignore next*/
exports.TestGraph = TestGraph;