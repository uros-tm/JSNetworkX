/*global assert, utils*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clique = void 0;

var
/*istanbul ignore next*/
_relabel = require("../../relabel");

var
/*istanbul ignore next*/
_generators = require("../../generators");

var
/*istanbul ignore next*/
_clique = require("../clique");

var clique = {
  beforeEach: function
  /*istanbul ignore next*/
  beforeEach() {
    var z = [3, 4, 3, 4, 2, 4, 2, 1, 1, 1, 1];
    this.G =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _relabel.
    /*istanbul ignore next*/
    convertNodeLabelsToIntegers)(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generators.
    /*istanbul ignore next*/
    havelHakimiGraph)(z), 1);
    this.cl = Array.from(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _clique.
    /*istanbul ignore next*/
    findCliques)(this.G));
    var H =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generators.
    /*istanbul ignore next*/
    completeGraph)(6);
    H =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _relabel.
    /*istanbul ignore next*/
    relabelNodes)(H, {
      0: 1,
      1: 2,
      2: 3,
      3: 4,
      4: 5,
      5: 6
    });
    H.removeEdgesFrom([[2, 6], [2, 5], [2, 4], [1, 3], [5, 3]]);
    this.H = H;
  },
  testFindCliques1: function
  /*istanbul ignore next*/
  testFindCliques1() {
    var cl = Array.from(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _clique.
    /*istanbul ignore next*/
    findCliques)(this.G));
    var rcl = Array.from(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _clique.
    /*istanbul ignore next*/
    findCliquesRecursive)(this.G));
    assert.deepEqual(cl.map(function (v)
    /*istanbul ignore next*/
    {
      return v.sort();
    }).sort(), rcl.map(function (v)
    /*istanbul ignore next*/
    {
      return v.sort();
    }).sort());
    var expected = [[2, 6, 1, 3], [2, 6, 4], [5, 4, 7], [8, 9], [10, 11]];
    assert.deepEqual(cl.map(function (v)
    /*istanbul ignore next*/
    {
      return v.sort();
    }).sort(), expected.map(function (v)
    /*istanbul ignore next*/
    {
      return v.sort();
    }).sort());
  },
  testSelfloops: function
  /*istanbul ignore next*/
  testSelfloops() {
    this.G.addEdge(1, 1);
    var cl = Array.from(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _clique.
    /*istanbul ignore next*/
    findCliques)(this.G));
    var rcl = Array.from(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _clique.
    /*istanbul ignore next*/
    findCliquesRecursive)(this.G));
    assert.deepEqual(cl.map(function (v)
    /*istanbul ignore next*/
    {
      return v.sort();
    }).sort(), rcl.map(function (v)
    /*istanbul ignore next*/
    {
      return v.sort();
    }).sort());
    var expected = [[2, 6, 1, 3], [2, 6, 4], [5, 4, 7], [8, 9], [10, 11]];
    assert.deepEqual(cl.map(function (v)
    /*istanbul ignore next*/
    {
      return v.sort();
    }).sort(), expected.map(function (v)
    /*istanbul ignore next*/
    {
      return v.sort();
    }).sort());
  },
  testFindCliques2: function
  /*istanbul ignore next*/
  testFindCliques2() {
    var hcl = Array.from(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _clique.
    /*istanbul ignore next*/
    findCliques)(this.H));
    assert.deepEqual(hcl.map(function (v)
    /*istanbul ignore next*/
    {
      return v.sort();
    }).sort(), [[1, 2], [1, 4, 5, 6], [2, 3], [3, 4, 6]]);
  },
  testCliqueNumber: function
  /*istanbul ignore next*/
  testCliqueNumber() {
    assert.equal(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _clique.
    /*istanbul ignore next*/
    graphCliqueNumber)(this.G), 4);
    assert.equal(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _clique.
    /*istanbul ignore next*/
    graphCliqueNumber)(this.G, this.cl), 4);
  },
  testNumberOfCliques: function
  /*istanbul ignore next*/
  testNumberOfCliques() {
    var G = this.G;
    assert.equal(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _clique.
    /*istanbul ignore next*/
    graphNumberOfCliques)(G), 5);
    assert.equal(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _clique.
    /*istanbul ignore next*/
    graphNumberOfCliques)(G, this.cl), 5);
    assert.equal(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _clique.
    /*istanbul ignore next*/
    numberOfCliques)(G, 1), 1);
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _clique.
    /*istanbul ignore next*/
    numberOfCliques)(G, [1]), new utils.Map({
      1: 1
    }));
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _clique.
    /*istanbul ignore next*/
    numberOfCliques)(G, [1, 2]), new utils.Map({
      1: 1,
      2: 2
    }));
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _clique.
    /*istanbul ignore next*/
    numberOfCliques)(G, 2), 2);
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _clique.
    /*istanbul ignore next*/
    numberOfCliques)(G), new utils.Map({
      1: 1,
      2: 2,
      3: 1,
      4: 2,
      5: 1,
      6: 2,
      7: 1,
      8: 1,
      9: 1,
      10: 1,
      11: 1
    }));
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _clique.
    /*istanbul ignore next*/
    numberOfCliques)(G, G.nodes()), new utils.Map({
      1: 1,
      2: 2,
      3: 1,
      4: 2,
      5: 1,
      6: 2,
      7: 1,
      8: 1,
      9: 1,
      10: 1,
      11: 1
    }));
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _clique.
    /*istanbul ignore next*/
    numberOfCliques)(G, [2, 3, 4]), new utils.Map({
      2: 2,
      3: 1,
      4: 2
    }));
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _clique.
    /*istanbul ignore next*/
    numberOfCliques)(G, null, this.cl), new utils.Map({
      1: 1,
      2: 2,
      3: 1,
      4: 2,
      5: 1,
      6: 2,
      7: 1,
      8: 1,
      9: 1,
      10: 1,
      11: 1
    }));
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _clique.
    /*istanbul ignore next*/
    numberOfCliques)(G, G.nodes(), this.cl), new utils.Map({
      1: 1,
      2: 2,
      3: 1,
      4: 2,
      5: 1,
      6: 2,
      7: 1,
      8: 1,
      9: 1,
      10: 1,
      11: 1
    }));
  } //TODO: test_node_clique_number
  //TODO: test_cliques_containing_node
  //TODO: test_make_clique_bipartite

};

/*istanbul ignore next*/
exports.clique = clique;