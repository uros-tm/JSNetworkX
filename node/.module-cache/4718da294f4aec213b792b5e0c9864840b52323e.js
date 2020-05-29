/*global assert, utils*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testUnweightedPath = void 0;

var
/*istanbul ignore next*/
_relabel = require("../../../relabel");

var
/*istanbul ignore next*/
_generators = require("../../../generators");

var
/*istanbul ignore next*/
_classes = require("../../../classes");

var
/*istanbul ignore next*/
_unweighted = require("../unweighted");

/*istanbul ignore next*/ function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Map = utils.Map;
var zipSequence = utils.zipSequence;

function validateGridPath(r, c, s, t, p) {
  assert.ok(Array.isArray(p));
  assert.equal(p[0], s);
  assert.equal(p[p.length - 1], t);
  s = [Math.floor((s - 1) / c), (s - 1) % c];
  t = [Math.floor((t - 1) / c), (t - 1) % c];
  assert.equal(p.length, Math.abs(t[0] - s[0]) + Math.abs(t[1] - s[1]) + 1);
  var u;
  p = Object.values(p).map(function (u)
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
      var _u = _step.value;
      assert.ok(0 <= _u[0] && _u[0] < r);
      assert.ok(0 <= _u[1] && _u[1] < c);
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

  /*istanbul ignore next*/
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (
    /*istanbul ignore next*/
    var _iterator2 = zipSequence(p.slice(0, p.length - 1), p.slice(1))[Symbol.iterator](), _step2;
    /*istanbul ignore next*/
    !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
    /*istanbul ignore next*/
    _iteratorNormalCompletion2 = true) {
      /*istanbul ignore next*/
      var _step2$value = _slicedToArray(_step2.value, 2),
          _u2 = _step2$value[0],
          v = _step2$value[1];

      assert.isOneOf([Math.abs(v[0] - _u2[0]), Math.abs(v[1] - _u2[1])], [[0, 1], [1, 0]]);
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
}

var testUnweightedPath = {
  beforeEach: function
  /*istanbul ignore next*/
  beforeEach() {
    this.grid =
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
    _classes.
    /*istanbul ignore next*/
    DiGraph());
  },
  testBidirectionalShortestPath: function
  /*istanbul ignore next*/
  testBidirectionalShortestPath() {
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _unweighted.
    /*istanbul ignore next*/
    bidirectionalShortestPath)(this.cycle, 0, 3), [0, 1, 2, 3]);
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _unweighted.
    /*istanbul ignore next*/
    bidirectionalShortestPath)(this.cycle, 0, 4), [0, 6, 5, 4]);
    validateGridPath(4, 4, 1, 12,
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _unweighted.
    /*istanbul ignore next*/
    bidirectionalShortestPath)(this.grid, 1, 12));
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _unweighted.
    /*istanbul ignore next*/
    bidirectionalShortestPath)(this.directedCycle, 0, 3), [0, 1, 2, 3]);
  },
  //TODO: test_shortest_path_length
  testSingleSourceShortestPath: function
  /*istanbul ignore next*/
  testSingleSourceShortestPath() {
    var p =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _unweighted.
    /*istanbul ignore next*/
    singleSourceShortestPath)(this.cycle, 0);
    assert.deepEqual(p.get(3), [0, 1, 2, 3]);
    p =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _unweighted.
    /*istanbul ignore next*/
    singleSourceShortestPath)(this.cycle, 0, 0);
    assert.deepEqual(p, new Map({
      0: [0]
    }));
  },
  testSingleSourceShortestPathLength: function
  /*istanbul ignore next*/
  testSingleSourceShortestPathLength() {
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _unweighted.
    /*istanbul ignore next*/
    singleSourceShortestPathLength)(this.cycle, 0), new Map({
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 3,
      5: 2,
      6: 1
    }));
  },
  testAllPairsShortestPath: function
  /*istanbul ignore next*/
  testAllPairsShortestPath() {
    var p =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _unweighted.
    /*istanbul ignore next*/
    allPairsShortestPath)(this.cycle);
    assert.deepEqual(p.get(0).get(3), [0, 1, 2, 3]);
    p =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _unweighted.
    /*istanbul ignore next*/
    allPairsShortestPath)(this.grid);
    validateGridPath(4, 4, 1, 12, p.get(1).get(12));
  },
  testAllPairsShortestPathLength: function
  /*istanbul ignore next*/
  testAllPairsShortestPathLength() {
    var l =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _unweighted.
    /*istanbul ignore next*/
    allPairsShortestPathLength)(this.cycle);
    assert.deepEqual(l.get(0), new Map({
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 3,
      5: 2,
      6: 1
    }));
    l =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _unweighted.
    /*istanbul ignore next*/
    allPairsShortestPathLength)(this.grid);
    assert.deepEqual(l.get(1).get(16), 6);
  },
  testPredecessor: function
  /*istanbul ignore next*/
  testPredecessor() {
    var G =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generators.
    /*istanbul ignore next*/
    pathGraph)(4);
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _unweighted.
    /*istanbul ignore next*/
    predecessor)(G, 0), new Map({
      0: [],
      1: [0],
      2: [1],
      3: [2]
    }));
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _unweighted.
    /*istanbul ignore next*/
    predecessor)(G, 0, {
      target: 3
    }), [2]);
    G =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generators.
    /*istanbul ignore next*/
    grid2dGraph)(2, 2);
    assert.deepEqual(Array.from(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _unweighted.
    /*istanbul ignore next*/
    predecessor)(G, [0, 0])).sort(), [[[0, 0], []], [[0, 1], [[0, 0]]], [[1, 0], [[0, 0]]], [[1, 1], [[1, 0], [0, 1]]]]);
  },
  testPredecessorCutoff: function
  /*istanbul ignore next*/
  testPredecessorCutoff() {
    var G =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generators.
    /*istanbul ignore next*/
    pathGraph)(4);
    assert.notInclude(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _unweighted.
    /*istanbul ignore next*/
    predecessor)(G, 0, {
      target: 3
    }), 4);
  },
  testPredecessorTarget: function
  /*istanbul ignore next*/
  testPredecessorTarget() {
    var G =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _generators.
    /*istanbul ignore next*/
    pathGraph)(4);
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _unweighted.
    /*istanbul ignore next*/
    predecessor)(G, 0, {
      target: 3
    }), [2]);
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _unweighted.
    /*istanbul ignore next*/
    predecessor)(G, 0, {
      target: 3,
      cutoff: 2
    }), []);
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _unweighted.
    /*istanbul ignore next*/
    predecessor)(G, 0, {
      target: 3,
      returnSeen: 2
    }), [[2], 3]);
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _unweighted.
    /*istanbul ignore next*/
    predecessor)(G, 0, {
      target: 3,
      cutoff: 2,
      returnSeen: 2
    }), [[], -1]);
  }
};

/*istanbul ignore next*/
exports.testUnweightedPath = testUnweightedPath;