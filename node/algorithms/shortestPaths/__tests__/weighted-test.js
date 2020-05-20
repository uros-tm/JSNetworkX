/*global assert*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testWeighted = void 0;

var
/*istanbul ignore next*/
weighted = _interopRequireWildcard(require("../weighted"));

var
/*istanbul ignore next*/
_internals = require("../../../_internals");

var
/*istanbul ignore next*/
_ = require("../../../");

var
/*istanbul ignore next*/
_generators = require("../../../generators");

/*istanbul ignore next*/ function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function validatePath(G, source, target, length, path) {
  assert.equal(path[0], source);
  assert.equal(path[path.length - 1], target);
  var sum = 0;

  if (!G.isMultigraph()) {
    for (var i = 0; i < path.length - 1; i += 1) {
      sum +=
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _internals.
      /*istanbul ignore next*/
      getDefault)(G.get(path[i]).get(path[i + 1]).weight, 1);
    }
  } else {
    for (var _i = 0; _i < path.length - 1; _i += 1) {
      var keydata = G.get(path[_i]).get(path[_i + 1]);
      var min = Infinity;

      for (var prop in keydata) {
        var weight =
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _internals.
        /*istanbul ignore next*/
        getDefault)(keydata[prop].weight, 1);
        min = weight < min ? weight : min;
      }

      sum += min;
    }
  }

  assert.equal(length, sum);
}

var testWeighted = {
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
    this.XG = new
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    DiGraph();
    this.XG.addWeightedEdgesFrom([['s', 'u', 10], ['s', 'x', 5], ['u', 'v', 1], ['u', 'x', 2], ['v', 'y', 1], ['x', 'u', 3], ['x', 'v', 5], ['x', 'y', 2], ['y', 's', 7], ['y', 'v', 6]]);
    this.MXG = new
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    MultiDiGraph(this.XG);
    this.MXG.addEdge('s', 'u', {
      weight: 15
    });
    this.XG2 = new
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    DiGraph();
    this.XG2.addWeightedEdgesFrom([[1, 4, 1], [4, 5, 1], [5, 6, 1], [6, 3, 1], [1, 3, 50], [1, 2, 100], [2, 3, 100]]);
    this.XG3 = new
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    DiGraph();
    this.XG3.addWeightedEdgesFrom([[0, 1, 2], [1, 2, 12], [2, 3, 1], [3, 4, 5], [4, 5, 1], [5, 0, 10]]);
    this.XG4 = new
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    DiGraph();
    this.XG4.addWeightedEdgesFrom([[0, 1, 2], [1, 2, 2], [2, 3, 1], [3, 4, 1], [4, 5, 1], [5, 6, 1], [6, 7, 1], [7, 0, 1]]);
    this.MXG4 = new
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    MultiDiGraph(this.XG4);
    this.MXG4.addEdge(0, 1, {
      weight: 3
    });
    this.G = new
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    DiGraph(); // no weights

    this.G.addEdgesFrom([['s', 'u'], ['s', 'x'], ['u', 'v'], ['u', 'x'], ['v', 'y'], ['x', 'u'], ['x', 'v'], ['x', 'y'], ['y', 's'], ['y', 'v']]);
  },
  testDijkstra: function
  /*istanbul ignore next*/
  testDijkstra() {
    /*istanbul ignore next*/
    var _this = this;

    var _weighted$singleSourc = weighted.singleSourceDijkstra(this.XG, {
      source: 's'
    }),
        _weighted$singleSourc2 = _slicedToArray(_weighted$singleSourc, 2),
        distances = _weighted$singleSourc2[0],
        paths = _weighted$singleSourc2[1];

    validatePath(this.XG, 's', 'v', 9, paths.get('v'));
    assert.equal(distances.get('v'), 9);
    validatePath(this.XG, 's', 'v', 9, weighted.singleSourceDijkstraPath(this.XG, {
      source: 's'
    }).get('v'));
    assert.equal(weighted.singleSourceDijkstraPathLength(this.XG, {
      source: 's'
    }).get('v'), 9);
    validatePath(this.XG, 's', 'v', 9, weighted.singleSourceDijkstra(this.XG, {
      source: 's'
    })[1].get('v'));
    validatePath(this.MXG, 's', 'v', 9, weighted.singleSourceDijkstraPath(this.MXG, {
      source: 's'
    }).get('v'));
    var GG = this.XG.toUndirected(); // make sure we get lower weight
    // toUndirected might choose either edge with weight 2 or 3

    GG.get('u').get('x').weight = 2;

    /*istanbul ignore next*/
    var _weighted$singleSourc3 = weighted.singleSourceDijkstra(GG, {
      source: 's'
    });

    /*istanbul ignore next*/
    var _weighted$singleSourc4 = _slicedToArray(_weighted$singleSourc3, 2);

    distances = _weighted$singleSourc4[0];

    /*istanbul ignore next*/
    paths = _weighted$singleSourc4[1];
    validatePath(GG, 's', 'v', 8, paths.get('v'));
    assert.equal(distances.get('v'), 8); // uses lower weight of 2 on u<->x edge

    validatePath(GG, 's', 'v', 8, weighted.dijkstraPath(GG, {
      source: 's',
      target: 'v'
    }));
    assert.equal(weighted.dijkstraPathLength(GG, {
      source: 's',
      target: 'v'
    }), 8);
    validatePath(this.XG2, 1, 3, 4, weighted.dijkstraPath(this.XG2, {
      source: 1,
      target: 3
    }));
    validatePath(this.XG3, 0, 3, 15, weighted.dijkstraPath(this.XG3, {
      source: 0,
      target: 3
    }));
    assert.equal(weighted.dijkstraPathLength(this.XG3, {
      source: 0,
      target: 3
    }), 15);
    validatePath(this.XG4, 0, 2, 4, weighted.dijkstraPath(this.XG4, {
      source: 0,
      target: 2
    }));
    assert.equal(weighted.dijkstraPathLength(this.XG4, {
      source: 0,
      target: 2
    }), 4);
    validatePath(this.MXG4, 0, 2, 4, weighted.dijkstraPath(this.MXG4, {
      source: 0,
      target: 2
    }));
    validatePath(this.G, 's', 'v', 2, weighted.singleSourceDijkstra(this.G, {
      source: 's',
      target: 'v'
    })[1].get('v'));
    validatePath(this.G, 's', 'v', 2, weighted.singleSourceDijkstra(this.G, {
      source: 's'
    })[1].get('v'));
    validatePath(this.G, 's', 'v', 2, weighted.dijkstraPath(this.G, {
      source: 's',
      target: 'v'
    }));
    assert.equal(weighted.dijkstraPathLength(this.G, {
      source: 's',
      target: 'v'
    }), 2); // JSNetworkXError: node s not reachable from moon

    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return weighted.dijkstraPath(_this.G, {
        source: 's',
        target: 'moon'
      });
    },
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    JSNetworkXNoPath);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return weighted.dijkstraPathLength(_this.G, {
        source: 's',
        target: 'moon'
      });
    },
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    JSNetworkXNoPath);
    validatePath(this.cycle, 0, 3, 3, weighted.dijkstraPath(this.cycle, {
      source: 0,
      target: 3
    }));
    validatePath(this.cycle, 0, 4, 3, weighted.dijkstraPath(this.cycle, {
      source: 0,
      target: 4
    }));
    assert.deepEqual(weighted.singleSourceDijkstra(this.cycle, {
      source: 0,
      target: 0
    }), [new
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    Map([[0, 0]]), new
    /*istanbul ignore next*/
    _.
    /*istanbul ignore next*/
    Map([[0, 0]])]);
  },
  // TODO testBidirectionalDijkstra
  // TODO testBidirectionalDijkstraNoPath
  // TODO testDijkstraPredecessor
  testSingleSourceDijkstraPathLength: function
  /*istanbul ignore next*/
  testSingleSourceDijkstraPathLength() {
    var pl = weighted.singleSourceDijkstraPathLength;
    assert.equal(pl(this.MXG4, {
      source: 0
    }).get(2), 4);
    assert.notOk(pl(this.MXG4, {
      source: 0,
      cutoff: 2
    }).has(4));
  } // TODO testBidirectionalDijkstraMultigraph
  // TODO testDijkstraPredDistanceMultigraph
  // TODO testNegativeEdgeCycle

};

/*istanbul ignore next*/
exports.testWeighted = testWeighted;