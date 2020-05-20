/*istanbul ignore next*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testBinary = void 0;

var
/*istanbul ignore next*/
_binary = require("../binary");

var
/*istanbul ignore next*/
_classes = require("../../../classes");

var
/*istanbul ignore next*/
_classic = require("../../../generators/classic");

var
/*istanbul ignore next*/
_exceptions = require("../../../exceptions");

var
/*istanbul ignore next*/
_Set = _interopRequireWildcard(require("../../../_internals/Set"));

/*istanbul ignore next*/ function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

/*global assert*/
function sorted(it) {
  return Array.from(it).sort();
}

var testBinary = {
  /*istanbul ignore next*/
  testUnionAttributes: function testUnionAttributes() {
    var g = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph();
    g.addNode(0, {
      x: 4
    });
    g.addNode(1, {
      x: 5
    });
    g.addEdge(0, 1, {
      size: 5
    });
    g.graph.name = 'g';
    var h = g.copy();
    h.graph.name = 'h';
    h.graph.attr = 'attr';
    h.node.get(0).x = 7;
    var gh =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    union)(g, h, {
      rename: ['g', 'h']
    });
    assert.deepEqual(sorted(gh.nodes()), ['g0', 'g1', 'h0', 'h1']);
    var graphs = {
      g: g,
      h: h
    };

    /*istanbul ignore next*/
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (
      /*istanbul ignore next*/
      var _iterator = gh[Symbol.iterator](), _step;
      /*istanbul ignore next*/
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      /*istanbul ignore next*/
      _iteratorNormalCompletion = true) {
        /*istanbul ignore next*/
        var n = _step.value;
        assert.deepEqual(gh.node.get(n), graphs[n[0]].node.get(Number(n[1])));
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    assert.equal(gh.graph.attr, 'attr');
    assert.equal(gh.graph.name, 'h');
  },

  /*istanbul ignore next*/
  testIntersection: function testIntersection() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph();
    var H = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph();
    G.addNodesFrom([1, 2, 3, 4]);
    G.addEdgesFrom([[1, 2], [2, 3]]);
    H.addNodesFrom([1, 2, 3, 4]);
    H.addEdgesFrom([[2, 3], [3, 4]]);
    var I =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    intersection)(G, H);
    assert.deepEqual(sorted(I.nodes()), [1, 2, 3, 4]);
    assert.deepEqual(I.edges(), [[2, 3]]);
    G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph();
    G.addNodesFrom([1, 2, 3, 4]);
    G.addEdgesFrom([[2, 3]]);
    I =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    intersection)(G, H);
    assert.deepEqual(sorted(I.nodes()), [1, 2, 3, 4]);
    assert.deepEqual(I.edges(), [[2, 3]]);
  },

  /*istanbul ignore next*/
  testIntersectionAttributes: function testIntersectionAttributes() {
    var g = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph();
    g.addNode(0, {
      x: 4
    });
    g.addNode(1, {
      x: 5
    });
    g.addEdge(0, 1, {
      size: 5
    });
    g.graph.name = 'g';
    var h = g.copy();
    h.graph.name = 'h';
    h.graph.attr = 'attr';
    h.node.get(0).x = 7;
    var gh =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    intersection)(g, h);
    assert.deepEqual(sorted(gh.nodes()), sorted(g.nodes()));
    assert.deepEqual(sorted(gh.nodes()), sorted(h.nodes()));
    assert.deepEqual(gh.edges(), g.edges());
    h.removeNode(0);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _binary.
        /*istanbul ignore next*/
        intersection)(g, h)
      );
    },
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkXError);
  },

  /*istanbul ignore next*/
  testIntersectionMultigraphAttributes: function testIntersectionMultigraphAttributes() {
    var g = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    MultiGraph();
    g.addEdge(0, 1, 0);
    g.addEdge(0, 1, 1);
    g.addEdge(0, 1, 2);
    var h = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    MultiGraph();
    h.addEdge(0, 1, 0);
    h.addEdge(0, 1, 3);
    var gh =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    intersection)(g, h);
    assert.deepEqual(sorted(gh.nodes()), sorted(g.nodes()));
    assert.deepEqual(sorted(gh.nodes()), sorted(h.nodes()));
    assert.deepEqual(gh.edges(), [[0, 1]]);
    assert.deepEqual(gh.edges(false, true), [[0, 1, '0']]);
  },

  /*istanbul ignore next*/
  testDifference: function testDifference() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph();
    var H = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph();
    G.addNodesFrom([1, 2, 3, 4]);
    G.addEdgesFrom([[1, 2], [2, 3]]);
    H.addNodesFrom([1, 2, 3, 4]);
    H.addEdgesFrom([[2, 3], [3, 4]]);
    var D =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    difference)(G, H);
    assert.deepEqual(sorted(D.nodes()), [1, 2, 3, 4]);
    assert.deepEqual(sorted(D.edges()), [[1, 2]]);
    D =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    difference)(H, G);
    assert.deepEqual(sorted(D.nodes()), [1, 2, 3, 4]);
    assert.deepEqual(sorted(D.edges()), [[3, 4]]);
    D =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    symmetricDifference)(G, H);
    assert.deepEqual(sorted(D.nodes()), [1, 2, 3, 4]);
    assert.deepEqual(sorted(D.edges()), [[1, 2], [3, 4]]);
  },

  /*istanbul ignore next*/
  testDifference2: function testDifference2() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph();
    var H = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph();
    G.addNodesFrom([1, 2, 3, 4]);
    G.addEdgesFrom([[1, 2], [2, 3]]);
    H.addNodesFrom([1, 2, 3, 4]);
    H.addEdge(1, 2);
    var D =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    difference)(G, H);
    assert.deepEqual(sorted(D.nodes()), [1, 2, 3, 4]);
    assert.deepEqual(sorted(D.edges()), [[2, 3]]);
    D =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    difference)(H, G);
    assert.deepEqual(sorted(D.nodes()), [1, 2, 3, 4]);
    assert.deepEqual(sorted(D.edges()), []);
    H.addEdge(3, 4);
    D =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    difference)(H, G);
    assert.deepEqual(sorted(D.nodes()), [1, 2, 3, 4]);
    assert.deepEqual(sorted(D.edges()), [[3, 4]]);
  },

  /*istanbul ignore next*/
  testDifferenceAttributes: function testDifferenceAttributes() {
    var g = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph();
    g.addNode(0, {
      x: 4
    });
    g.addNode(1, {
      x: 5
    });
    g.addEdge(0, 1, {
      size: 5
    });
    g.graph.name = 'g';
    var h = g.copy();
    h.graph.name = 'h';
    h.graph.attr = 'attr';
    h.node.get(0).x = 7;
    var gh =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    difference)(g, h);
    assert.deepEqual(sorted(gh.nodes()), sorted(g.nodes()));
    assert.deepEqual(sorted(gh.nodes()), sorted(h.nodes()));
    assert.deepEqual(gh.edges(), []);
    h.removeNode(0);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _binary.
        /*istanbul ignore next*/
        intersection)(g, h)
      );
    },
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkXError);
  },

  /*istanbul ignore next*/
  testDifferenceMultiGraphAttributes: function testDifferenceMultiGraphAttributes() {
    var g = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    MultiGraph();
    g.addEdge(0, 1, 0);
    g.addEdge(0, 1, 1);
    g.addEdge(0, 1, 2);
    var h = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    MultiGraph();
    h.addEdge(0, 1, 0);
    h.addEdge(0, 1, 3);
    var gh =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    difference)(g, h);
    assert.deepEqual(sorted(gh.nodes()), sorted(g.nodes()));
    assert.deepEqual(sorted(gh.nodes()), sorted(h.nodes()));
    assert.deepEqual(gh.edges(), [[0, 1], [0, 1]]);
    assert.deepEqual(gh.edges(false, true), [[0, 1, '1'], [0, 1, '2']]);
  },

  /*istanbul ignore next*/
  testDifferenceThrows: function testDifferenceThrows() {
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _binary.
        /*istanbul ignore next*/
        difference)(
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _classic.
        /*istanbul ignore next*/
        pathGraph)(4),
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _classic.
        /*istanbul ignore next*/
        pathGraph)(3))
      );
    });
  },

  /*istanbul ignore next*/
  testSymmetricDifferenceMultiGraph: function testSymmetricDifferenceMultiGraph() {
    var g = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    MultiGraph();
    g.addEdge(0, 1, 0);
    g.addEdge(0, 1, 1);
    g.addEdge(0, 1, 2);
    var h = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    MultiGraph();
    h.addEdge(0, 1, 0);
    h.addEdge(0, 1, 3);
    var gh =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    symmetricDifference)(g, h);
    assert.deepEqual(sorted(gh.nodes()), sorted(g.nodes()));
    assert.deepEqual(sorted(gh.nodes()), sorted(h.nodes()));
    assert.deepEqual(gh.edges(), [[0, 1], [0, 1], [0, 1]]);
    assert.deepEqual(gh.edges(false, true), [[0, 1, '1'], [0, 1, '2'], [0, 1, '3']]);
  },

  /*istanbul ignore next*/
  testSymmetricDifferenceThrows: function testSymmetricDifferenceThrows() {
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _binary.
        /*istanbul ignore next*/
        difference)(
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _classic.
        /*istanbul ignore next*/
        pathGraph)(4),
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _classic.
        /*istanbul ignore next*/
        pathGraph)(3))
      );
    });
  },

  /*istanbul ignore next*/
  testUnionAndCompose: function testUnionAndCompose() {
    /*eslint-disable max-len */
    var K3 =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _classic.
    /*istanbul ignore next*/
    completeGraph)(3);
    var P3 =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _classic.
    /*istanbul ignore next*/
    pathGraph)(3);
    var G1 = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    DiGraph();
    G1.addEdgesFrom([['A', 'B'], ['A', 'C'], ['A', 'D']]);
    var G2 = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    DiGraph();
    G2.addEdgesFrom([['1', '2'], ['1', '3'], ['1', '4']]);
    var G =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    union)(G1, G2);
    var H =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    compose)(G1, G2);
    assert.deepEqual(sorted(G.edges()), sorted(H.edges()));
    assert.notOk(G.hasEdge('A', 1));
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _binary.
        /*istanbul ignore next*/
        union)(K3, P3)
      );
    },
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkXError);
    var H1 =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    union)(H, G1, {
      rename: ['H', 'G1']
    });
    assert.deepEqual(sorted(H1.nodes()), ['G1A', 'G1B', 'G1C', 'G1D', 'H1', 'H2', 'H3', 'H4', 'HA', 'HB', 'HC', 'HD']);
    var H2 =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    union)(H, G2, {
      rename: ['H', '']
    });
    assert.deepEqual(sorted(H2.nodes()), ['1', '2', '3', '4', 'H1', 'H2', 'H3', 'H4', 'HA', 'HB', 'HC', 'HD']);
    assert.notOk(H1.hasEdge('HB', 'HA'));
    G =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    compose)(G, G);
    assert.deepEqual(sorted(G.edges()), sorted(H.edges()));
    G2 =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    union)(G2, G2, {
      rename: ['', 'copy']
    });
    assert.deepEqual(sorted(G2.nodes()), ['1', '2', '3', '4', 'copy1', 'copy2', 'copy3', 'copy4']);
    assert.deepEqual(G2.neighbors('copy4'), []);
    assert.deepEqual(sorted(G2.neighbors('copy1')), ['copy2', 'copy3', 'copy4']);
    assert.equal(G.order(), 8);
    assert.equal(G.numberOfEdges(), 6);
    var E =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    disjointUnion)(G, G);
    assert.equal(E.order(), 16);
    assert.equal(E.numberOfEdges(), 12);
    E =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    disjointUnion)(G1, G2);
    assert.deepEqual(E.nodes().sort(function (a, b)
    /*istanbul ignore next*/
    {
      return a - b;
    }), [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]);
  },

  /*istanbul ignore next*/
  testUnionMultiGraph: function testUnionMultiGraph() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    MultiGraph();
    G.addEdge(1, 2, 0);
    G.addEdge(1, 2, 1);
    var H = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    MultiGraph();
    H.addEdge(3, 4, 0);
    H.addEdge(3, 4, 1);
    var GH =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    union)(G, H);
    assert.deepEqual(new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"](GH),
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _Set.
    /*istanbul ignore next*/
    union)(new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"](G), new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"](H)));
    assert.deepEqual(new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"](GH.edges(false, true)),
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _Set.
    /*istanbul ignore next*/
    union)(new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"](G.edges(false, true)), new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"](H.edges(false, true))));
  },

  /*istanbul ignore next*/
  testDisjointUnionMultiGraph: function testDisjointUnionMultiGraph() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    MultiGraph();
    G.addEdge(0, 1, 0);
    G.addEdge(0, 1, 1);
    var H = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    MultiGraph();
    H.addEdge(2, 3, 0);
    H.addEdge(2, 3, 1);
    var GH =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    disjointUnion)(G, H);
    assert.deepEqual(new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"](GH),
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _Set.
    /*istanbul ignore next*/
    union)(new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"](G), new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"](H)));
    assert.deepEqual(new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"](GH.edges(false, true)),
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _Set.
    /*istanbul ignore next*/
    union)(new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"](G.edges(false, true)), new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"](H.edges(false, true))));
  },

  /*istanbul ignore next*/
  testComposeMultiGraph: function testComposeMultiGraph() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    MultiGraph();
    G.addEdge(1, 2, 0);
    G.addEdge(1, 2, 1);
    var H = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    MultiGraph();
    H.addEdge(3, 4, 0);
    H.addEdge(3, 4, 1);
    var GH =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    compose)(G, H);
    assert.deepEqual(new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"](GH),
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _Set.
    /*istanbul ignore next*/
    union)(new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"](G), new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"](H)));
    assert.deepEqual(new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"](GH.edges(false, true)),
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _Set.
    /*istanbul ignore next*/
    union)(new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"](G.edges(false, true)), new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"](H.edges(false, true))));
    H.addEdge(1, 2, 2);
    GH =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _binary.
    /*istanbul ignore next*/
    compose)(G, H);
    assert.deepEqual(new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"](GH.edges(false, true)),
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _Set.
    /*istanbul ignore next*/
    union)(new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"](G.edges(false, true)), new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"](H.edges(false, true))));
  },

  /*istanbul ignore next*/
  testMixedTypeUnion: function testMixedTypeUnion() {
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _binary.
        /*istanbul ignore next*/
        union)(new
        /*istanbul ignore next*/
        _classes.
        /*istanbul ignore next*/
        Graph(), new
        /*istanbul ignore next*/
        _classes.
        /*istanbul ignore next*/
        MultiGraph())
      );
    },
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkXError);
  },

  /*istanbul ignore next*/
  testMixedTypeDisjointUnion: function testMixedTypeDisjointUnion() {
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _binary.
        /*istanbul ignore next*/
        disjointUnion)(new
        /*istanbul ignore next*/
        _classes.
        /*istanbul ignore next*/
        Graph(), new
        /*istanbul ignore next*/
        _classes.
        /*istanbul ignore next*/
        MultiGraph())
      );
    },
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkXError);
  },

  /*istanbul ignore next*/
  testMixedTypeIntersection: function testMixedTypeIntersection() {
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _binary.
        /*istanbul ignore next*/
        intersection)(new
        /*istanbul ignore next*/
        _classes.
        /*istanbul ignore next*/
        Graph(), new
        /*istanbul ignore next*/
        _classes.
        /*istanbul ignore next*/
        MultiGraph())
      );
    },
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkXError);
  },

  /*istanbul ignore next*/
  testMixedTypeDifference: function testMixedTypeDifference() {
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _binary.
        /*istanbul ignore next*/
        difference)(new
        /*istanbul ignore next*/
        _classes.
        /*istanbul ignore next*/
        Graph(), new
        /*istanbul ignore next*/
        _classes.
        /*istanbul ignore next*/
        MultiGraph())
      );
    },
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkXError);
  },

  /*istanbul ignore next*/
  testMixedTypeSymmetricDifference: function testMixedTypeSymmetricDifference() {
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _binary.
        /*istanbul ignore next*/
        symmetricDifference)(new
        /*istanbul ignore next*/
        _classes.
        /*istanbul ignore next*/
        Graph(), new
        /*istanbul ignore next*/
        _classes.
        /*istanbul ignore next*/
        MultiGraph())
      );
    },
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkXError);
  },

  /*istanbul ignore next*/
  testMixedTypeCompose: function testMixedTypeCompose() {
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _binary.
        /*istanbul ignore next*/
        union)(new
        /*istanbul ignore next*/
        _classes.
        /*istanbul ignore next*/
        Graph(), new
        /*istanbul ignore next*/
        _classes.
        /*istanbul ignore next*/
        MultiGraph())
      );
    },
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkXError);
  }
};

/*istanbul ignore next*/
exports.testBinary = testBinary;