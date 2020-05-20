/*global assert*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testGeneratorSmall = void 0;

var
/*istanbul ignore next*/
_algorithms = require("../../algorithms");

var
/*istanbul ignore next*/
_small = require("../small");

var testGeneratorSmall = {
  testMakeSmallGraph: function
  /*istanbul ignore next*/
  testMakeSmallGraph() {
    var d = {
      type: 'adjacencylist',
      name: 'Bull Graph',
      n: 5,
      list: [[2, 3], [1, 3, 4], [1, 2, 5], [2], [3]]
    };
    var G =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _small.
    /*istanbul ignore next*/
    makeSmallGraph)(d);
    assert.ok(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _algorithms.
    /*istanbul ignore next*/
    couldBeIsomorphic)(G,
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _small.
    /*istanbul ignore next*/
    bullGraph)()));
  },
  testPropertiesNamedSmallGraphs: function
  /*istanbul ignore next*/
  testPropertiesNamedSmallGraphs() {
    var G =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _small.
    /*istanbul ignore next*/
    bullGraph)();
    assert.equal(G.numberOfNodes(), 5);
    assert.equal(G.numberOfEdges(), 5);
    var d = Array.from(G.degree().values()).sort();
    assert.deepEqual(d, [1, 1, 2, 3, 3]); // TODO: expect(diameter(G)).toBe(3)
    // TODO: expect(radius(G)).toBe(2)
    // TODO: chvatal_graph
    // TODO: cubical_graph
    // TODO: desargues_graph
    // TODO: diamond_graph
    // TODO: dodecahedral_graph
    // TODO: frucht_graph
    // TODO: heawood_graph
    // TODO: house_graph
    // TODO: house_x_graph
    // TODO: icosahedral_graph
    // TODO: moebius_kantor_graph
    // TODO: octahedral_graph

    G =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _small.
    /*istanbul ignore next*/
    krackhardtKiteGraph)();
    assert.equal(G.numberOfNodes(), 10);
    assert.equal(G.numberOfEdges(), 18);
    d = Array.from(G.degree().values()).sort();
    assert.deepEqual(d, [1, 2, 3, 3, 3, 4, 4, 5, 5, 6]); // TODO: pappus_graph
    // TODO: petersen_graph
    // TODO: sedgewick_maze_graph
    // TODO: tetrahedral_graph
    // TODO: truncated_cube_graph
    // TODO: truncated_tetrahedron_graph
    // TODO: tutte_graph
  }
};

/*istanbul ignore next*/
exports.testGeneratorSmall = testGeneratorSmall;