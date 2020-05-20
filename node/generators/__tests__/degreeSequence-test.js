/*global assert*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.degreeSequence = void 0;

var
/*istanbul ignore next*/
_classes = require("../../classes");

var
/*istanbul ignore next*/
_JSNetworkXError = _interopRequireDefault(require("../../exceptions/JSNetworkXError"));

var
/*istanbul ignore next*/
_degreeSequence = require("../degreeSequence");

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var degreeSequence = {
  // TODO: test_configuration_model_empty
  // TODO: test_configuration_model
  // TODO: test_configuration_raise
  // TODO: test_configuration_raise_odd
  // TODO: test_directed_configuration_raise_unequal
  // TODO: test_directed_configuration_mode
  // TODO: test_expected_degree_graph_empty
  // TODO: test_expected_degree_graph
  // TODO: test_expected_degree_graph_selfloops
  // TODO: test_expected_degree_graph_skew
  testHavelHakimiConstruction: function
  /*istanbul ignore next*/
  testHavelHakimiConstruction() {
    var G =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _degreeSequence.
    /*istanbul ignore next*/
    havelHakimiGraph)([]);
    assert.equal(G.numberOfNodes(), 0);
    var z = [1000, 3, 3, 3, 3, 2, 2, 2, 1, 1, 1];
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _degreeSequence.
        /*istanbul ignore next*/
        havelHakimiGraph)(z)
      );
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
    z = ['A', 3, 3, 3, 3, 2, 2, 2, 1, 1, 1];
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _degreeSequence.
        /*istanbul ignore next*/
        havelHakimiGraph)(z)
      );
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
    z = [5, 4, 3, 3, 3, 2, 2, 2];
    assert.doesNotThrow(function ()
    /*istanbul ignore next*/
    {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _degreeSequence.
        /*istanbul ignore next*/
        havelHakimiGraph)(z)
      );
    }); //TODO: G = jsnx.configuration_model(z);

    z = [6, 5, 4, 4, 2, 1, 1, 1];
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _degreeSequence.
        /*istanbul ignore next*/
        havelHakimiGraph)(z)
      );
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
    z = [10, 3, 3, 3, 3, 2, 2, 2, 2, 2, 2];
    assert.doesNotThrow(function ()
    /*istanbul ignore next*/
    {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _degreeSequence.
        /*istanbul ignore next*/
        havelHakimiGraph)(z)
      );
    });
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _degreeSequence.
        /*istanbul ignore next*/
        havelHakimiGraph)(z, new
        /*istanbul ignore next*/
        _classes.
        /*istanbul ignore next*/
        DiGraph())
      );
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
  } // TODO: test_directed_havel_hakimi
  // TODO: test_degree_sequence_tree
  // TODO: test_random_degree_sequence_graph
  // TODO: test_random_degree_sequence_graph_raise
  // TODO: test_random_degree_sequence_large

};

/*istanbul ignore next*/
exports.degreeSequence = degreeSequence;