/*global assert, utils*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var
/*istanbul ignore next*/
_BaseAttrGraphTester = _interopRequireDefault(require("./BaseAttrGraphTester"));

var
/*istanbul ignore next*/
_shared = _interopRequireDefault(require("./shared"));

var
/*istanbul ignore next*/
_ = require("../");

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Map = utils.Map;
var sharedMulti = {
  deepcopyEdgeAttr: function
  /*istanbul ignore next*/
  deepcopyEdgeAttr(H, G) {
    assert.deepEqual(G.get(1).get(2)[0].foo, H.get(1).get(2)[0].foo);
    G.get(1).get(2)[0].foo.push(1);
    assert.notDeepEqual(G.get(1).get(2)[0].foo, H.get(1).get(2)[0].foo);
  },
  shallowCopyEdgeAttr: function
  /*istanbul ignore next*/
  shallowCopyEdgeAttr(H, G) {
    assert.deepEqual(G.get(1).get(2)[0].foo, H.get(1).get(2)[0].foo);
    G.get(1).get(2)[0].foo.push(1);
    assert.deepEqual(G.get(1).get(2)[0].foo, H.get(1).get(2)[0].foo);
  },
  sameAttrdict: function
  /*istanbul ignore next*/
  sameAttrdict(H, G) {
    // same attrdict in the edgedata
    var oldFoo = H.get(1).get(2)[0].foo;
    H.addEdge(1, 2, 0, {
      foo: 'baz'
    });
    assert.deepEqual(G.edge, H.edge);
    H.addEdge(1, 2, 0, {
      foo: oldFoo
    });
    assert.deepEqual(G.edge, H.edge); // but not same edgedata dict

    H.addEdge(1, 2, {
      foo: 'baz'
    });
    assert.notDeepEqual(G.edge, H.edge);
    oldFoo = H.node.get(0).foo;
    H.node.get(0).foo = 'baz';
    assert.deepEqual(G.node, H.node);
    H.node.get(0).foo = oldFoo;
    assert.deepEqual(G.node, H.node);
  },
  differentAttrdict: function
  /*istanbul ignore next*/
  differentAttrdict(H, G) {
    // used by graphEqualButDifferent
    var oldFoo = H.get(1).get(2)[0].foo;
    H.addEdge(1, 2, 0, {
      foo: 'baz'
    });
    assert.notDeepEqual(G.edge, H.edge);
    H.addEdge(1, 2, 0, {
      foo: oldFoo
    });
    assert.deepEqual(G.edge, H.edge);
    var HH = H.copy();
    H.addEdge(1, 2, {
      foo: 'baz'
    });
    assert.notDeepEqual(G.edge, H.edge);
    H = HH;
    oldFoo = H.node.get(0).foo;
    H.node.get(0).foo = 'baz';
    assert.notDeepEqual(G.node, H.node);
    H.node.get(0).foo = oldFoo;
    assert.deepEqual(G.node, H.node);
  }
};
var origShared;

/*istanbul ignore next*/
var _default = Object.assign({},
/*istanbul ignore next*/
_BaseAttrGraphTester[
/*istanbul ignore next*/
"default"], {
  before: function
  /*istanbul ignore next*/
  before() {
    // override multigraph methods
    origShared = Object.assign({},
    /*istanbul ignore next*/
    _shared[
    /*istanbul ignore next*/
    "default"]);
    Object.assign(
    /*istanbul ignore next*/
    _shared[
    /*istanbul ignore next*/
    "default"], sharedMulti);
  },
  after: function
  /*istanbul ignore next*/
  after() {
    // restore original shared
    Object.assign(
    /*istanbul ignore next*/
    _shared[
    /*istanbul ignore next*/
    "default"], origShared);
  },
  testHasEdge: function
  /*istanbul ignore next*/
  testHasEdge() {
    var G = this.K3;
    assert.equal(G.hasEdge(0, 1), true);
    assert.equal(G.hasEdge(0, -1), false);
    assert.equal(G.hasEdge(0, 1, 0), true);
    assert.equal(G.hasEdge(0, 1, 1), false);
  },
  testGetEdgeData: function
  /*istanbul ignore next*/
  testGetEdgeData() {
    var G = this.K3;
    assert.deepEqual(G.getEdgeData(0, 1), {
      0: {}
    });
    assert.deepEqual(G.get(0).get(1), {
      0: {}
    });
    assert.deepEqual(G.get(0).get(1)[0], {});
    assert.equal(G.getEdgeData(10, 20), null);
    assert.deepEqual(G.getEdgeData(0, 1, 0), {});
  },
  testAdjacencyIter: function
  /*istanbul ignore next*/
  testAdjacencyIter() {
    var G = this.K3;
    assert.deepEqual(Array.from(G.adjacencyIter()), [[0, new Map({
      1: {
        0: {}
      },
      2: {
        0: {}
      }
    })], [1, new Map({
      0: {
        0: {}
      },
      2: {
        0: {}
      }
    })], [2, new Map({
      0: {
        0: {}
      },
      1: {
        0: {}
      }
    })]]);
  },
  testToUndirected: function
  /*istanbul ignore next*/
  testToUndirected() {
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

    /*istanbul ignore next*/
    _shared[
    /*istanbul ignore next*/
    "default"].isShallowCopy(H, G);

    H = G.toUndirected();

    /*istanbul ignore next*/
    _shared[
    /*istanbul ignore next*/
    "default"].isDeepcopy(H, G);
  },
  testToDirected: function
  /*istanbul ignore next*/
  testToDirected() {
    var G = this.K3;

    /*istanbul ignore next*/
    _shared[
    /*istanbul ignore next*/
    "default"].addAttributes(G);

    var H = new
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    MultiDiGraph(G);

    /*istanbul ignore next*/
    _shared[
    /*istanbul ignore next*/
    "default"].isShallowCopy(H, G);

    H = G.toDirected();

    /*istanbul ignore next*/
    _shared[
    /*istanbul ignore next*/
    "default"].isDeepcopy(H, G);
  },
  testSelfloops: function
  /*istanbul ignore next*/
  testSelfloops() {
    var G = this.K3;
    G.addEdge(0, 0);
    assert.deepEqual(G.nodesWithSelfloops(), [0]);
    assert.deepEqual(G.selfloopEdges(), [[0, 0]]);
    assert.deepEqual(G.selfloopEdges(true), [[0, 0, {}]]);
    assert.equal(G.numberOfSelfloops(), 1);
  },
  testSelfloops2: function
  /*istanbul ignore next*/
  testSelfloops2() {
    var G = this.K3;
    G.addEdge(0, 0);
    G.addEdge(0, 0);
    G.addEdge(0, 0, 'parallel edge');
    G.removeEdge(0, 0, 'parallel edge');
    assert.equal(G.numberOfEdges(0, 0), 2);
    G.removeEdge(0, 0);
    assert.equal(G.numberOfEdges(0, 0), 1);
  },
  testEdgeAttr4: function
  /*istanbul ignore next*/
  testEdgeAttr4() {
    var G = new this.Graph();
    G.addEdge(1, 2, 0, {
      data: 7,
      spam: 'bar',
      bar: 'foo'
    });
    assert.deepEqual(G.edges(true), [[1, 2, {
      data: 7,
      spam: 'bar',
      bar: 'foo'
    }]]); // OK to set data like this

    G.get(1).get(2)[0].data = 10;
    assert.deepEqual(G.edges(true), [[1, 2, {
      data: 10,
      spam: 'bar',
      bar: 'foo'
    }]]);
    G.edge.get(1).get(2)[0].data = 20;
    assert.deepEqual(G.edges(true), [[1, 2, {
      data: 20,
      spam: 'bar',
      bar: 'foo'
    }]]);
    G.edge.get(1).get(2)[0].listdata = [20, 200];
    G.edge.get(1).get(2)[0].weight = 20;
    assert.deepEqual(G.edges(true), [[1, 2, {
      data: 20,
      spam: 'bar',
      bar: 'foo',
      listdata: [20, 200],
      weight: 20
    }]]);
  }
});

/*istanbul ignore next*/
exports["default"] = _default;