/*global assert*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testGenericPath = void 0;

var
/*istanbul ignore next*/
_ = require("../../../");

var
/*istanbul ignore next*/
_generators = require("../../../generators");

var
/*istanbul ignore next*/
_generic = require("../generic");

var
/*istanbul ignore next*/
_unweighted = require("../unweighted");

var
/*istanbul ignore next*/
_weighted = require("../weighted");

function validateGridPath(r, c, s, t, p) {
  assert.isArray(p);
  assert.equal(p[0], s);
  assert.equal(p[p.length - 1], t);
  s = [Math.floor((s - 1) / c), (s - 1) % c];
  t = [Math.floor((t - 1) / c), (t - 1) % c];
  assert.equal(p.length, Math.abs(t[0] - s[0]) + Math.abs(t[1] - s[1]) + 1);
  p = p.map(function (u)
  /*istanbul ignore next*/
  {
    return [Math.floor((u - 1) / c), (u - 1) % c];
  });

  /*istanbul ignore next*/
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (
    /*istanbul ignore next*/
    var _iterator = p[Symbol.iterator](), _step;
    /*istanbul ignore next*/
    !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
    /*istanbul ignore next*/
    _iteratorNormalCompletion = true) {
      /*istanbul ignore next*/
      var u = _step.value;
      assert.ok(0 <= u[0] && u[0] < r);
      assert.ok(0 <= u[1] && u[1] < c);
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

  for (var i = 0; i < p.length - 1; i++) {
    assert.deepEqual([Math.abs(p[i + 1][0] - p[i][0]), Math.abs(p[i + 1][1] - p[i][1])].sort(), [0, 1]);
  }
}

var testGenericPath = {
  beforeEach: function
  /*istanbul ignore next*/
  beforeEach() {
    this.grid =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    convertNodeLabelsToIntegers)(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generators.
    /*istanbul ignore next*/
    grid2dGraph)(4, 4), 1, 'sorted');
    this.cycle =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generators.
    /*istanbul ignore next*/
    cycleGraph)(7);
    this.directedCycle =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generators.
    /*istanbul ignore next*/
    cycleGraph)(7, new
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    DiGraph());
  },
  testShortestPath: function
  /*istanbul ignore next*/
  testShortestPath() {
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPath)(this.cycle, {
      source: 0,
      target: 3
    }), [0, 1, 2, 3]);
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPath)(this.cycle, {
      source: 0,
      target: 4
    }), [0, 6, 5, 4]);
    validateGridPath(4, 4, 1, 12,
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPath)(this.grid, {
      source: 1,
      target: 12
    }));
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPath)(this.directedCycle, {
      source: 0,
      target: 3
    }), [0, 1, 2, 3]); // now with weights

    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPath)(this.cycle, {
      source: 0,
      target: 3,
      weight: 'weight'
    }), [0, 1, 2, 3]);
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPath)(this.cycle, {
      source: 0,
      target: 4,
      weight: 'weight'
    }), [0, 6, 5, 4]);
    validateGridPath(4, 4, 1, 12,
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPath)(this.grid, {
      source: 1,
      target: 12,
      weight: 'weight'
    }));
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPath)(this.directedCycle, {
      source: 0,
      target: 3,
      weight: 'weight'
    }), [0, 1, 2, 3]);
  },
  testShortestPathTarget: function
  /*istanbul ignore next*/
  testShortestPathTarget() {
    var paths =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPath)(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generators.
    /*istanbul ignore next*/
    pathGraph)(3), {
      target: 1
    });
    assert.deepEqual(paths, new
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    Map([[0, [0, 1]], [1, [1]], [2, [2, 1]]]));
  },
  testShortestPathLength: function
  /*istanbul ignore next*/
  testShortestPathLength() {
    assert.equal(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPathLength)(this.cycle, {
      source: 0,
      target: 3
    }), 3);
    assert.equal(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPathLength)(this.grid, {
      source: 1,
      target: 12
    }), 5);
    assert.equal(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPathLength)(this.directedCycle, {
      source: 0,
      target: 4
    }), 4); // now with weights

    assert.equal(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPathLength)(this.cycle, {
      source: 0,
      target: 3,
      weight: 'weight'
    }), 3);
    assert.equal(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPathLength)(this.grid, {
      source: 1,
      target: 12,
      weight: 'weight'
    }), 5);
    assert.equal(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPathLength)(this.directedCycle, {
      source: 0,
      target: 4,
      weight: 'weight'
    }), 4);
  },
  testShortestPathLengthTarget: function
  /*istanbul ignore next*/
  testShortestPathLengthTarget() {
    var distances =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPathLength)(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generators.
    /*istanbul ignore next*/
    pathGraph)(3), {
      target: 1
    });
    assert.equal(distances.get(0), 1);
    assert.equal(distances.get(1), 0);
    assert.equal(distances.get(2), 1);
  },
  testSingleSourceShortestPath: function
  /*istanbul ignore next*/
  testSingleSourceShortestPath() {
    var paths =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPath)(this.cycle, {
      source: 0
    });
    assert.deepEqual(paths.get(3), [0, 1, 2, 3]);
    assert.deepEqual(paths,
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _unweighted.
    /*istanbul ignore next*/
    singleSourceShortestPath)(this.cycle, 0));
    paths =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPath)(this.grid, {
      source: 1
    });
    validateGridPath(4, 4, 1, 12, paths.get(12)); // now with weights

    paths =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPath)(this.cycle, {
      source: 0,
      weight: 'weight'
    });
    assert.deepEqual(paths.get(3), [0, 1, 2, 3]);
    assert.deepEqual(paths,
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _weighted.
    /*istanbul ignore next*/
    singleSourceDijkstraPath)(this.cycle, {
      source: 0
    }));
    paths =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPath)(this.grid, {
      source: 1,
      weight: 'weight'
    });
    validateGridPath(4, 4, 1, 12, paths.get(12));
  },
  testSingleSourceShortestPathLength: function
  /*istanbul ignore next*/
  testSingleSourceShortestPathLength() {
    var distances =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPathLength)(this.cycle, {
      source: 0
    });
    assert.deepEqual(distances, new
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    Map([[0, 0], [1, 1], [2, 2], [3, 3], [4, 3], [5, 2], [6, 1]]));
    assert.deepEqual(distances,
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _unweighted.
    /*istanbul ignore next*/
    singleSourceShortestPathLength)(this.cycle, 0));
    distances =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPathLength)(this.grid, {
      source: 1
    });
    assert.equal(distances.get(16), 6); // now with weights

    distances =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPathLength)(this.cycle, {
      source: 0,
      weight: 'weight'
    });
    assert.deepEqual(distances, new
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    Map([[0, 0], [1, 1], [2, 2], [3, 3], [4, 3], [5, 2], [6, 1]]));
    assert.deepEqual(distances,
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _weighted.
    /*istanbul ignore next*/
    singleSourceDijkstraPathLength)(this.cycle, {
      source: 0
    }));
    distances =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPathLength)(this.grid, {
      source: 1,
      weight: 'weight'
    });
    assert.equal(distances.get(16), 6);
  },
  testAllPairsShortestPath: function
  /*istanbul ignore next*/
  testAllPairsShortestPath() {
    var paths =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPath)(this.cycle);
    assert.deepEqual(paths.get(0).get(3), [0, 1, 2, 3]);
    assert.deepEqual(paths,
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _unweighted.
    /*istanbul ignore next*/
    allPairsShortestPath)(this.cycle));
    paths =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPath)(this.grid);
    validateGridPath(4, 4, 1, 12, paths.get(1).get(12)); // now with weights

    paths =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPath)(this.cycle, {
      weight: 'weight'
    });
    assert.deepEqual(paths.get(0).get(3), [0, 1, 2, 3]);
    assert.deepEqual(paths,
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _weighted.
    /*istanbul ignore next*/
    allPairsDijkstraPath)(this.cycle));
    paths =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPath)(this.grid, {
      weight: 'weight'
    });
    validateGridPath(4, 4, 1, 12, paths.get(1).get(12));
  },
  testAllPairsShortestPathLength: function
  /*istanbul ignore next*/
  testAllPairsShortestPathLength() {
    var distances =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPathLength)(this.cycle);
    assert.deepEqual(distances.get(0), new
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    Map([[0, 0], [1, 1], [2, 2], [3, 3], [4, 3], [5, 2], [6, 1]]));
    assert.deepEqual(distances,
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _unweighted.
    /*istanbul ignore next*/
    allPairsShortestPathLength)(this.cycle));
    distances =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPathLength)(this.grid);
    assert.equal(distances.get(1).get(16), 6); // now with weights

    distances =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPathLength)(this.cycle, {
      weight: 'weight'
    });
    assert.deepEqual(distances.get(0), new
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    Map([[0, 0], [1, 1], [2, 2], [3, 3], [4, 3], [5, 2], [6, 1]]));
    assert.deepEqual(distances,
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _weighted.
    /*istanbul ignore next*/
    allPairsDijkstraPathLength)(this.cycle));
    distances =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    shortestPathLength)(this.grid, {
      weight: 'weight'
    });
    assert.equal(distances.get(1).get(16), 6);
  },
  // TODO testAverageShortestPath
  // TODO testWeightedAverageShortestPath
  // TODO testAverageShortestDisconnect
  testHasPath: function
  /*istanbul ignore next*/
  testHasPath() {
    var G = new
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    Graph();
    G.addPath([0, 1, 2]);
    G.addPath([3, 4]);
    assert.ok(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    hasPath)(G, {
      source: 0,
      target: 2
    }));
    assert.notOk(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generic.
    /*istanbul ignore next*/
    hasPath)(G, {
      source: 0,
      target: 4
    }));
  } //
  // TODO testAllShortestPaths
  // TODO testAllShortestPathsRaise

};

/*istanbul ignore next*/
exports.testGenericPath = testGenericPath;