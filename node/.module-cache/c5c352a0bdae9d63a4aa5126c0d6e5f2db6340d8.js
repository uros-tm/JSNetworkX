/*global assert*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var
/*istanbul ignore next*/
_JSNetworkXError = _interopRequireDefault(require("../../exceptions/JSNetworkXError"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  addAttributes: function
  /*istanbul ignore next*/
  addAttributes(G) {
    G.graph.foo = [];
    G.node.get(0).foo = [];
    G.removeEdge(1, 2);
    var ll = [];
    G.addEdge(1, 2, {
      foo: ll
    });
    G.addEdge(2, 1, {
      foo: ll
    }); // must be dict

    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.addEdge(0, 1, []);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
  },
  isDeepcopy: function
  /*istanbul ignore next*/
  isDeepcopy(H, G) {
    this.graphsEqual(H, G);
    this.differentAttrdict(H, G);
    this.deepCopyAttrdict(H, G);
  },
  deepCopyAttrdict: function
  /*istanbul ignore next*/
  deepCopyAttrdict(H, G) {
    this.deepcopyGraphAttr(H, G);
    this.deepcopyNodeAttr(H, G);
    this.deepcopyEdgeAttr(H, G);
  },
  deepcopyGraphAttr: function
  /*istanbul ignore next*/
  deepcopyGraphAttr(H, G) {
    assert.deepEqual(G.graph.foo, H.graph.foo);
    G.graph.foo.push(1);
    assert.notDeepEqual(G.graph.foo, H.graph.foo);
  },
  deepcopyNodeAttr: function
  /*istanbul ignore next*/
  deepcopyNodeAttr(H, G) {
    assert.deepEqual(G.node.get(0).foo, H.node.get(0).foo);
    G.node.get(0).foo.push(1);
    assert.notDeepEqual(G.node.get(0).foo, H.node.get(0).foo);
  },
  deepcopyEdgeAttr: function
  /*istanbul ignore next*/
  deepcopyEdgeAttr(H, G) {
    assert.deepEqual(G.get(1).get(2).foo, H.get(1).get(2).foo);
    G.get(1).get(2).foo.push(1);
    assert.notDeepEqual(G.get(1).get(2).foo, H.get(1).get(2).foo);
  },
  graphsEqual: function
  /*istanbul ignore next*/
  graphsEqual(H, G) {
    assert.deepEqual(G.adj, H.adj);
    assert.deepEqual(G.edge, H.edge);
    assert.deepEqual(G.node, H.node);
    assert.deepEqual(G.graph, H.graph);
    assert.deepEqual(G.name, H.name);

    if (!G.isDirected() && !H.isDirected()) {
      assert.strictEqual(H.adj.get(1).get(2), H.adj.get(2).get(1));
      assert.strictEqual(G.adj.get(1).get(2), G.adj.get(2).get(1));
    } else {
      // at least one is directed
      if (!G.isDirected()) {
        G.pred = G.adj;
        G.succ = G.adj;
      }

      if (!H.isDirected()) {
        H.pred = H.adj;
        H.succ = H.adj;
      }

      assert.deepEqual(G.pred, H.pred);
      assert.deepEqual(G.succ, H.succ);
      assert.strictEqual(H.succ.get(1).get(2), H.pred.get(2).get(1));
      assert.strictEqual(G.succ.get(1).get(2), G.pred.get(2).get(1));
    }
  },
  differentAttrdict: function
  /*istanbul ignore next*/
  differentAttrdict(H, G) {
    var oldFoo = H.get(1).get(2).foo;
    H.addEdge(1, 2, {
      foo: 'baz'
    });
    assert.notDeepEqual(G.edge, H.edge);
    H.addEdge(1, 2, {
      foo: oldFoo
    });
    assert.deepEqual(G.edge, H.edge);
    oldFoo = H.node.get(0).foo;
    H.node.get(0).foo = 'baz';
    assert.notDeepEqual(G.node, H.node);
    H.node.get(0).foo = oldFoo;
    assert.deepEqual(G.node, H.node);
  },
  isShallowCopy: function
  /*istanbul ignore next*/
  isShallowCopy(H, G) {
    this.graphsEqual(H, G);
    this.differentAttrdict(H, G);
    this.shallowCopyAttrdict(H, G);
  },
  shallowCopyAttrdict: function
  /*istanbul ignore next*/
  shallowCopyAttrdict(H, G) {
    this.shallowCopyGraphAttr(H, G);
    this.shallowCopyNodeAttr(H, G);
    this.shallowCopyEdgeAttr(H, G);
  },
  shallowCopyGraphAttr: function
  /*istanbul ignore next*/
  shallowCopyGraphAttr(H, G) {
    assert.equal(G.graph.foo, H.graph.foo);
    G.graph.foo.push(1);
    assert.deepEqual(G.graph.foo, H.graph.foo);
  },
  shallowCopyNodeAttr: function
  /*istanbul ignore next*/
  shallowCopyNodeAttr(H, G) {
    assert.deepEqual(G.node.get(0).foo, H.node.get(0).foo);
    G.node.get(0).foo.push(1);
    assert.deepEqual(G.node.get(0).foo, H.node.get(0).foo);
  },
  shallowCopyEdgeAttr: function
  /*istanbul ignore next*/
  shallowCopyEdgeAttr(H, G) {
    assert.deepEqual(G.get(1).get(2).foo, H.get(1).get(2).foo);
    G.get(1).get(2).foo.push(1);
    assert.deepEqual(G.get(1).get(2).foo, H.get(1).get(2).foo);
  },
  sameAttrdict: function
  /*istanbul ignore next*/
  sameAttrdict(H, G) {
    var oldFoo = H.get(1).get(2).foo;
    H.addEdge(1, 2, {
      foo: 'baz'
    });
    assert.deepEqual(G.edge, H.edge);
    H.addEdge(1, 2, {
      foo: oldFoo
    });
    assert.deepEqual(G.edge, H.edge);
    oldFoo = H.node.get(0).foo;
    H.node.get(0).foo = 'baz';
    assert.deepEqual(G.node, H.node);
    H.node.get(0).foo = oldFoo;
    assert.deepEqual(G.node, H.node);
  }
};

/*istanbul ignore next*/
exports["default"] = _default;