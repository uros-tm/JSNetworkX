/*global assert*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testEigenvectorCentralityExceptions = exports.testEigenvectorCentralityDirected = exports.testEigenvectorCentrality = void 0;

var
/*istanbul ignore next*/
_eigenvector = require("../eigenvector");

var
/*istanbul ignore next*/
_classes = require("../../../classes");

var
/*istanbul ignore next*/
_generators = require("../../../generators");

var testEigenvectorCentrality = {
  /*istanbul ignore next*/
  testK5: function testK5() {
    var G =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generators.
    /*istanbul ignore next*/
    completeGraph)(5);
    var result =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _eigenvector.
    /*istanbul ignore next*/
    eigenvectorCentrality)(G);
    var v = Math.sqrt(1 / 5);

    /*istanbul ignore next*/
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (
      /*istanbul ignore next*/
      var _iterator = G[Symbol.iterator](), _step;
      /*istanbul ignore next*/
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      /*istanbul ignore next*/
      _iteratorNormalCompletion = true) {
        /*istanbul ignore next*/
        var n = _step.value;
        assert.almostEqual(result.get(n), v);
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

    var nstart = new Map();

    /*istanbul ignore next*/
    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (
      /*istanbul ignore next*/
      var _iterator2 = G[Symbol.iterator](), _step2;
      /*istanbul ignore next*/
      !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
      /*istanbul ignore next*/
      _iteratorNormalCompletion2 = true) {
        /*istanbul ignore next*/
        var _n = _step2.value;
        nstart.set(_n, 1);
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
          _iterator2["return"]();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    result =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _eigenvector.
    /*istanbul ignore next*/
    eigenvectorCentrality)(G, {
      nstart: nstart
    });

    /*istanbul ignore next*/
    var _iteratorNormalCompletion3 = true;
    var _didIteratorError3 = false;
    var _iteratorError3 = undefined;

    try {
      for (
      /*istanbul ignore next*/
      var _iterator3 = G[Symbol.iterator](), _step3;
      /*istanbul ignore next*/
      !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
      /*istanbul ignore next*/
      _iteratorNormalCompletion3 = true) {
        /*istanbul ignore next*/
        var _n2 = _step3.value;
        assert.almostEqual(result.get(_n2), v);
      }
    } catch (err) {
      _didIteratorError3 = true;
      _iteratorError3 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
          _iterator3["return"]();
        }
      } finally {
        if (_didIteratorError3) {
          throw _iteratorError3;
        }
      }
    }
  },

  /*istanbul ignore next*/
  // Doesn't converge, but the Python implementation doesn't either
  // (it uses numpy)

  /*
  testP3() {
    let G = pathGraph(3);
    let answer = new Map([[0, 0.5], [1, 0.7071], [2, 0.5]]);
    let result = eigenvectorCentrality(G);
    for (let n in G) {
      assert.almostEqual(result.get(n), answer.get(n), 4);
    }
  },
   testP3Unweighted() {
   },
  */
  testMaxIter: function testMaxIter() {
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _eigenvector.
        /*istanbul ignore next*/
        eigenvectorCentrality)(
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _generators.
        /*istanbul ignore next*/
        pathGraph)(3), {
          maxIter: 0
        })
      );
    });
  }
};

/*istanbul ignore next*/
exports.testEigenvectorCentrality = testEigenvectorCentrality;
var testEigenvectorCentralityDirected = {
  /*istanbul ignore next*/
  beforeEach: function beforeEach() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    DiGraph();
    var edges = [[1, 2], [1, 3], [2, 4], [3, 2], [3, 5], [4, 2], [4, 5], [4, 6], [5, 6], [5, 7], [5, 8], [6, 8], [7, 1], [7, 5], [7, 8], [8, 6], [8, 7]];
    G.addEdgesFrom(edges, {
      weight: 2
    });
    this.G = G.reverse();
    this.G.evc = new Map([[1, 0.25368793], [2, 0.19576478], [3, 0.32817092], [4, 0.40430835], [5, 0.48199885], [6, 0.15724483], [7, 0.51346196], [8, 0.32475403]]);
    var H = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    DiGraph();
    edges = [[1, 2], [1, 3], [2, 4], [3, 2], [3, 5], [4, 2], [4, 5], [4, 6], [5, 6], [5, 7], [5, 8], [6, 8], [7, 1], [7, 5], [7, 8], [8, 6], [8, 7]];
    H.addEdgesFrom(edges);
    this.H = H.reverse();
    this.H.evc = new Map([[1, 0.25368793], [2, 0.19576478], [3, 0.32817092], [4, 0.40430835], [5, 0.48199885], [6, 0.15724483], [7, 0.51346196], [8, 0.32475403]]);
  },

  /*istanbul ignore next*/
  testEigenvectorCentralityWeighted: function testEigenvectorCentralityWeighted() {
    var result =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _eigenvector.
    /*istanbul ignore next*/
    eigenvectorCentrality)(this.G);

    /*istanbul ignore next*/
    var _iteratorNormalCompletion4 = true;
    var _didIteratorError4 = false;
    var _iteratorError4 = undefined;

    try {
      for (
      /*istanbul ignore next*/
      var _iterator4 = this.G[Symbol.iterator](), _step4;
      /*istanbul ignore next*/
      !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done);
      /*istanbul ignore next*/
      _iteratorNormalCompletion4 = true) {
        /*istanbul ignore next*/
        var n = _step4.value;
        assert.almostEqual(result.get(n), this.G.evc.get(n));
      }
    } catch (err) {
      _didIteratorError4 = true;
      _iteratorError4 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
          _iterator4["return"]();
        }
      } finally {
        if (_didIteratorError4) {
          throw _iteratorError4;
        }
      }
    }
  },

  /*istanbul ignore next*/
  testEigenvectorCentralityUnWeighted: function testEigenvectorCentralityUnWeighted() {
    var result =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _eigenvector.
    /*istanbul ignore next*/
    eigenvectorCentrality)(this.H);

    /*istanbul ignore next*/
    var _iteratorNormalCompletion5 = true;
    var _didIteratorError5 = false;
    var _iteratorError5 = undefined;

    try {
      for (
      /*istanbul ignore next*/
      var _iterator5 = this.H[Symbol.iterator](), _step5;
      /*istanbul ignore next*/
      !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done);
      /*istanbul ignore next*/
      _iteratorNormalCompletion5 = true) {
        /*istanbul ignore next*/
        var n = _step5.value;
        assert.almostEqual(result.get(n), this.H.evc.get(n));
      }
    } catch (err) {
      _didIteratorError5 = true;
      _iteratorError5 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
          _iterator5["return"]();
        }
      } finally {
        if (_didIteratorError5) {
          throw _iteratorError5;
        }
      }
    }
  }
};

/*istanbul ignore next*/
exports.testEigenvectorCentralityDirected = testEigenvectorCentralityDirected;
var testEigenvectorCentralityExceptions = {
  /*istanbul ignore next*/
  testMultigraph: function testMultigraph() {
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _eigenvector.
        /*istanbul ignore next*/
        eigenvectorCentrality)(new
        /*istanbul ignore next*/
        _classes.
        /*istanbul ignore next*/
        MultiGraph())
      );
    });
  },

  /*istanbul ignore next*/
  testEmpty: function testEmpty() {
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _eigenvector.
        /*istanbul ignore next*/
        eigenvectorCentrality)(new
        /*istanbul ignore next*/
        _classes.
        /*istanbul ignore next*/
        DiGraph())
      );
    });
  }
};

/*istanbul ignore next*/
exports.testEigenvectorCentralityExceptions = testEigenvectorCentralityExceptions;