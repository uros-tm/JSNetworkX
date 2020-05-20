/*globals assert*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testRelabel = void 0;

var
/*istanbul ignore next*/
_classes = require("../classes");

var
/*istanbul ignore next*/
_exceptions = require("../exceptions");

var
/*istanbul ignore next*/
relabel = _interopRequireWildcard(require("../relabel"));

var
/*istanbul ignore next*/
_generators = require("../generators");

/*istanbul ignore next*/ function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var testRelabel = {
  testConvertNodeLabelsToIntegers: function
  /*istanbul ignore next*/
  testConvertNodeLabelsToIntegers() {
    // test that empty graph converts fine for all options
    var G =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generators.
    /*istanbul ignore next*/
    emptyGraph)();
    var H = relabel.convertNodeLabelsToIntegers(G, 100);
    assert.equal(H.name, '(emptyGraph(0))WithIntLabels');
    assert.deepEqual(H.nodes(), []);
    assert.deepEqual(H.edges(), []);
    ['default', 'sorted', 'increasing degree', 'decreasing degree'].forEach(function (opt) {
      /* eslint-disable no-shadow */
      var G =
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _generators.
      /*istanbul ignore next*/
      emptyGraph)();
      var H = relabel.convertNodeLabelsToIntegers(G, 100, opt);
      /* eslint-enable no-shadow */

      assert.equal(H.name, '(emptyGraph(0))WithIntLabels');
      assert.deepEqual(H.nodes(), []);
      assert.deepEqual(H.edges(), []);
    });
    G =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generators.
    /*istanbul ignore next*/
    emptyGraph)();
    G.addEdgesFrom([['A', 'B'], ['A', 'C'], ['B', 'C'], ['C', 'D']]);
    G.name = 'paw';
    H = relabel.convertNodeLabelsToIntegers(G);
    var degH = Array.from(H.degree().values());
    var degG = Array.from(G.degree().values());
    assert.deepEqual(degH.sort(), degG.sort());
    H = relabel.convertNodeLabelsToIntegers(G, 1000);
    degH = Array.from(H.degree().values());
    degG = Array.from(G.degree().values());
    assert.deepEqual(degH.sort(), degG.sort());
    assert.deepEqual(H.nodes(), [1000, 1001, 1002, 1003]);
    H = relabel.convertNodeLabelsToIntegers(G, 'increasing degree');
    degH = Array.from(H.degree().values());
    degG = Array.from(G.degree().values());
    assert.deepEqual(degH.sort(), degG.sort());
    assert.equal(H.degree(0), 1);
    assert.equal(H.degree(1), 2);
    assert.equal(H.degree(2), 2);
    assert.equal(H.degree(3), 3);
    H = relabel.convertNodeLabelsToIntegers(G, 'decreasing degree');
    degH = Array.from(H.degree().values());
    degG = Array.from(G.degree().values());
    assert.deepEqual(degH.sort(), degG.sort());
    assert.deepEqual(H.degree(0), 3);
    assert.deepEqual(H.degree(1), 2);
    assert.deepEqual(H.degree(2), 2);
    assert.deepEqual(H.degree(3), 1);
  },
  testRelabelNodesCopy: function
  /*istanbul ignore next*/
  testRelabelNodesCopy() {
    var G =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generators.
    /*istanbul ignore next*/
    emptyGraph)();
    G.addEdgesFrom([['A', 'B'], ['A', 'C'], ['B', 'C'], ['C', 'D']]);
    var mapping = {
      'A': 'aardvark',
      'B': 'bear',
      'C': 'cat',
      'D': 'dog'
    };
    var H = relabel.relabelNodes(G, mapping);
    assert.deepEqual(H.nodes().sort(), ['aardvark', 'bear', 'cat', 'dog']);
  },
  testRelabelNodesFunction: function
  /*istanbul ignore next*/
  testRelabelNodesFunction() {
    var G =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generators.
    /*istanbul ignore next*/
    emptyGraph)();
    G.addEdgesFrom([['A', 'B'], ['A', 'C'], ['B', 'C'], ['C', 'D']]);
    var H = relabel.relabelNodes(G, function (n) {
      return n.charCodeAt(0);
    });
    assert.deepEqual(H.nodes().sort(), [65, 66, 67, 68]);
  },
  testRelabelNodesGraph: function
  /*istanbul ignore next*/
  testRelabelNodesGraph() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph([['A', 'B'], ['A', 'C'], ['B', 'C'], ['C', 'D']]);
    var mapping = {
      'A': 'aardvark',
      'B': 'bear',
      'C': 'cat',
      'D': 'dog'
    };
    var H = relabel.relabelNodes(G, mapping);
    assert.deepEqual(H.nodes().sort(), ['aardvark', 'bear', 'cat', 'dog']);
  },
  testRelabelNodesDigraph: function
  /*istanbul ignore next*/
  testRelabelNodesDigraph() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    DiGraph([['A', 'B'], ['A', 'C'], ['B', 'C'], ['C', 'D']]);
    var mapping = {
      'A': 'aardvark',
      'B': 'bear',
      'C': 'cat',
      'D': 'dog'
    };
    var H = relabel.relabelNodes(G, mapping, false);
    assert.deepEqual(H.nodes().sort(), ['aardvark', 'bear', 'cat', 'dog']);
  },
  testRelabelNodesMultigraph: function
  /*istanbul ignore next*/
  testRelabelNodesMultigraph() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    MultiGraph([['a', 'b'], ['a', 'b']]);
    var mapping = {
      'a': 'aardvark',
      'b': 'bear'
    };
    var H = relabel.relabelNodes(G, mapping, false);
    assert.deepEqual(H.nodes().sort(), ['aardvark', 'bear']);
    assert.deepEqual(H.edges().sort(), [['aardvark', 'bear'], ['aardvark', 'bear']]);
  },
  testRelabelNodesMultidigraph: function
  /*istanbul ignore next*/
  testRelabelNodesMultidigraph() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    MultiDiGraph([['a', 'b'], ['a', 'b']]);
    var mapping = {
      'a': 'aardvark',
      'b': 'bear'
    };
    var H = relabel.relabelNodes(G, mapping, false);
    assert.deepEqual(H.nodes().sort(), ['aardvark', 'bear']);
    assert.deepEqual(H.edges().sort(), [['aardvark', 'bear'], ['aardvark', 'bear']]);
  },
  testRelabelNodesMissing: function
  /*istanbul ignore next*/
  testRelabelNodesMissing() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph([['A', 'B'], ['A', 'C'], ['B', 'C'], ['C', 'D']]);
    var mapping = {
      '0': 'aardvark'
    };
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return relabel.relabelNodes(G, mapping, false);
    }, 'Node 0 is not in the graph.');
  } //TODO: testRelabelNodesTopsort

};

/*istanbul ignore next*/
exports.testRelabel = testRelabel;