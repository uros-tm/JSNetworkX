/*global assert*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.graphical = void 0;

var
/*istanbul ignore next*/
_JSNetworkXException = _interopRequireDefault(require("../../exceptions/JSNetworkXException"));

var
/*istanbul ignore next*/
_graphical = require("../graphical");

var
/*istanbul ignore next*/
_randomGraphs = require("../../generators/randomGraphs");

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var graphical = {
  testValidDegreeSequence1: function
  /*istanbul ignore next*/
  testValidDegreeSequence1() {
    this.timeout(5000);
    var n = 100;
    var p = 0.3;

    for (var i = 0; i < 10; i++) {
      var G =
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _randomGraphs.
      /*istanbul ignore next*/
      erdosRenyiGraph)(n, p);
      var deg = G.degree();
      assert.ok(
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _graphical.
      /*istanbul ignore next*/
      isValidDegreeSequence)(deg.values(),
      /*method=*/
      'eg'), 'eg');
      assert.ok(
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _graphical.
      /*istanbul ignore next*/
      isValidDegreeSequence)(deg.values(),
      /*method=*/
      'hh'), 'hh');
    }
  },
  //TODO: test_valid_degree_sequence2
  testStringInput: function
  /*istanbul ignore next*/
  testStringInput() {
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _graphical.
        /*istanbul ignore next*/
        isValidDegreeSequence)([], 'foo')
      );
    },
    /*istanbul ignore next*/
    _JSNetworkXException[
    /*istanbul ignore next*/
    "default"]);
  },
  testNegativeInput: function
  /*istanbul ignore next*/
  testNegativeInput() {
    assert.ok(!
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _graphical.
    /*istanbul ignore next*/
    isValidDegreeSequence)([-1], 'hh'));
    assert.ok(!
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _graphical.
    /*istanbul ignore next*/
    isValidDegreeSequence)([-1], 'eg'));
    assert.ok(!
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _graphical.
    /*istanbul ignore next*/
    isValidDegreeSequence)([72.5], 'eg'));
  },
  //TODO: test_atlas
  testSmallGraphTrue: function
  /*istanbul ignore next*/
  testSmallGraphTrue() {
    var z = [5, 3, 3, 3, 3, 2, 2, 2, 1, 1, 1];
    assert.ok(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _graphical.
    /*istanbul ignore next*/
    isValidDegreeSequence)(z, 'hh'), 'hh');
    assert.ok(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _graphical.
    /*istanbul ignore next*/
    isValidDegreeSequence)(z, 'eg'), 'eg');
    z = [10, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2];
    assert.ok(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _graphical.
    /*istanbul ignore next*/
    isValidDegreeSequence)(z, 'hh'), 'hh');
    assert.ok(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _graphical.
    /*istanbul ignore next*/
    isValidDegreeSequence)(z, 'eg'), 'eg');
    z = [1, 1, 1, 1, 1, 2, 2, 2, 3, 4];
    assert.ok(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _graphical.
    /*istanbul ignore next*/
    isValidDegreeSequence)(z, 'hh'), 'hh');
    assert.ok(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _graphical.
    /*istanbul ignore next*/
    isValidDegreeSequence)(z, 'eg'), 'eg');
  },
  testSmallGraphFalse: function
  /*istanbul ignore next*/
  testSmallGraphFalse() {
    var z = [1000, 3, 3, 3, 3, 2, 2, 2, 1, 1, 1];
    assert.ok(!
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _graphical.
    /*istanbul ignore next*/
    isValidDegreeSequence)(z, 'hh'));
    assert.ok(!
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _graphical.
    /*istanbul ignore next*/
    isValidDegreeSequence)(z, 'eg'));
    z = [6, 5, 4, 4, 2, 1, 1, 1];
    assert.ok(!
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _graphical.
    /*istanbul ignore next*/
    isValidDegreeSequence)(z, 'hh'));
    assert.ok(!
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _graphical.
    /*istanbul ignore next*/
    isValidDegreeSequence)(z, 'eg'));
    z = [1, 1, 1, 1, 1, 1, 2, 2, 2, 3, 4];
    assert.ok(!
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _graphical.
    /*istanbul ignore next*/
    isValidDegreeSequence)(z, 'hh'));
    assert.ok(!
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _graphical.
    /*istanbul ignore next*/
    isValidDegreeSequence)(z, 'eg'));
  } // TODO: test_directed_degree_sequence
  // TODO: test_small_directed_degree_sequence
  // TODO: test_multi_sequence
  // TODO: test_pseudo_sequence

};

/*istanbul ignore next*/
exports.graphical = graphical;