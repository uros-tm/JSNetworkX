/*jshint strict:false, node:true*/
/*global utils, assert*/

var BaseDiGraphTester = require('./BaseDiGraphTester');
var DiGraph = require('../digraph');
/*jshint ignore:start*/
var Map = utils.Map;
/*jshint ignore:end*/
var JSNetworkXError = require('../../exceptions/JSNetworkXError');
var KeyError = require('../../exceptions/KeyError');
var TestGraph = require('./0_graph-test').TestGraph;

var _ = require('lodash-node');

var sorted = function(iterator) {
  return utils.itertools.toArray(iterator).sort();
};

exports.TestDiGraph = _.extend({}, TestGraph, BaseDiGraphTester, {
  beforeEach: function() {
    this.Graph = DiGraph;

    var ed1 = {};
    var ed2 = {};
    var ed3 = {};
    var ed4 = {};
    var ed5 = {};
    var ed6 = {};

    this.k3adj = new Map([
      [0, new Map([[1,ed1], [2, ed2]])],
      [1, new Map([[0,ed3], [2, ed4]])],
      [2, new Map([[0,ed5], [1, ed6]])]
    ]);
    this.k3edges = [[0,1], [0,2], [1,2]];
    this.k3nodes = [0,1,2];
    this.K3 = new this.Graph();
    this.K3.adj = this.K3.succ = this.K3.edge = this.k3adj;
    this.K3.pred = new Map([
      [0, new Map([[1,ed3], [2, ed5]])],
      [1, new Map([[0,ed1], [2, ed6]])],
      [2, new Map([[0,ed2], [1, ed4]])]
    ]);

    ed1 = {};
    ed2 = {};
    this.P3 = new this.Graph();
    this.P3.adj = new Map([
      [0, new Map([[1,ed1]])],
      [1, new Map([[2,ed2]])],
      [2, new Map()]
    ]);
    this.P3.succ = this.P3.adj;
    this.P3.pred = new Map([
      [0, new Map()],
      [1, new Map([[0,ed1]])],
      [2, new Map([[1,ed2]])]
    ]);

    this.K3.node = new Map([[0,{}], [1, {}], [2, {}]]);
    this.P3.node = new Map([[0,{}], [1, {}], [2, {}]]);
  },

  testDataInput: function() {
    var G = this.Graph(new Map([[1,[2]], [2, [1]]]), {name: 'test'});
    assert.equal(G.name, 'test');
    assert.deepEqual(
      sorted(G.adj.entries()),
      [[1, new Map([[2,{}]])], [2, new Map([[1,{}]])]]
    );
    assert.deepEqual(
      sorted(G.succ.entries()),
      [[1, new Map([[2,{}]])], [2, new Map([[1,{}]])]]
    );
    assert.deepEqual(
      sorted(G.pred.entries()),
      [[1, new Map([[2,{}]])], [2, new Map([[1,{}]])]]
    );
  },

  testAddEdge: function() {
    var G = this.Graph();
    G.addEdge(0,1);
    assert.deepEqual(
      G.adj,
      new Map({0: new Map({1:{}}), 1: new Map()})
    );
    assert.deepEqual(
      G.succ,
      new Map({0: new Map({1:{}}), 1: new Map()})
    );
    assert.deepEqual(
      G.pred,
      new Map({0: new Map(), 1: new Map({0:{}})})
    );

    G = this.Graph();
    G.addEdge.apply(G, [0,1]); // tuple unpacking
    assert.deepEqual(
      G.adj,
      new Map({0: new Map({1:{}}), 1: new Map()})
    );
    assert.deepEqual(
      G.succ,
      new Map({0: new Map({1:{}}), 1: new Map()})
    );
    assert.deepEqual(
      G.pred,
      new Map({0: new Map(), 1: new Map({0:{}})})
    );
  },

  testAddEdgesFrom: function() {
    var G = this.Graph();
    G.addEdgesFrom([[0,1], [0,2, {data: 3}]], {data: 2});

    assert.deepEqual(
      G.adj,
      new Map({
        0: new Map({1: {data:2}, 2: {data: 3}}),
        1: new Map(),
        2: new Map()})
    );
    assert.deepEqual(
      G.succ,
      new Map({
        0: new Map({1: {data:2}, 2: {data: 3}}),
        1: new Map(),
        2: new Map()})
    );
    assert.deepEqual(
      G.pred,
      new Map({
        0: new Map(),
        1: new Map({0: {data:2}}),
        2: new Map({0: {data:3}})
      })
    );

    // too few in tuple
    assert.throws(function(){G.addEdgesFrom([[0]]);}, JSNetworkXError);
    // too many in tuple
    assert.throws(
      function(){G.addEdgesFrom([[0,1,2,3]]);},
      JSNetworkXError
    );
    // not a tuple
    assert.throws(function(){G.addEdgesFrom([0]);}, TypeError);
  },

  testRemoveEdge: function() {
    var G = this.K3;
    G.removeEdge(0,1);
    assert.deepEqual(
      G.succ,
      new Map({
        0: new Map({2:{}}),
        1: new Map({0:{}, 2:{}}),
        2: new Map({0:{}, 1:{}})
      })
    );
    assert.deepEqual(
      G.pred,
      new Map({
        0: new Map({1:{}, 2:{}}),
        1: new Map({2:{}}),
        2: new Map({0:{}, 1:{}})
      })
    );
    assert.throws(
      function(){G.removeEdge(-1, 0);},
      JSNetworkXError
    );
  },

  testRemoveEdgesFrom: function() {
    var G = this.K3;
    G.removeEdgesFrom([[0,1]]);
    assert.deepEqual(
      G.succ,
      new Map({
        0: new Map({2:{}}),
        1: new Map({0:{}, 2:{}}),
        2: new Map({0:{}, 1:{}})
      })
    );
    assert.deepEqual(
      G.pred,
      new Map({
        0: new Map({1:{}, 2:{}}),
        1: new Map({2:{}}),
        2: new Map({0:{}, 1:{}})
      })
    );
    assert.doesNotThrow(function(){G.removeEdgesFrom([[0,0]]);});
  }
});