/*istanbul ignore next*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestDiGraph = void 0;

var
/*istanbul ignore next*/
_BaseDiGraphTester = _interopRequireDefault(require("./BaseDiGraphTester"));

var
/*istanbul ignore next*/
_DiGraph = _interopRequireDefault(require("../DiGraph"));

var
/*istanbul ignore next*/
_JSNetworkXError = _interopRequireDefault(require("../../exceptions/JSNetworkXError"));

var
/*istanbul ignore next*/
_GraphTest = require("./0_Graph-test");

var
/*istanbul ignore next*/
_lodash = _interopRequireDefault(require("lodash"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/*global assert, utils*/
var Map = utils.Map;

var sorted = function sorted(iterator) {
  return Array.from(iterator).sort();
};

var TestDiGraph =
/*istanbul ignore next*/
_lodash[
/*istanbul ignore next*/
"default"].extend({},
/*istanbul ignore next*/
_GraphTest.
/*istanbul ignore next*/
TestGraph,
/*istanbul ignore next*/
_BaseDiGraphTester[
/*istanbul ignore next*/
"default"], {
  beforeEach: function
  /*istanbul ignore next*/
  beforeEach() {
    this.Graph =
    /*istanbul ignore next*/
    _DiGraph[
    /*istanbul ignore next*/
    "default"];
    var ed1 = {};
    var ed2 = {};
    var ed3 = {};
    var ed4 = {};
    var ed5 = {};
    var ed6 = {};
    this.k3adj = new Map([[0, new Map([[1, ed1], [2, ed2]])], [1, new Map([[0, ed3], [2, ed4]])], [2, new Map([[0, ed5], [1, ed6]])]]);
    this.k3edges = [[0, 1], [0, 2], [1, 2]];
    this.k3nodes = [0, 1, 2];
    this.K3 = new this.Graph();
    this.K3.adj = this.K3.succ = this.K3.edge = this.k3adj;
    this.K3.pred = new Map([[0, new Map([[1, ed3], [2, ed5]])], [1, new Map([[0, ed1], [2, ed6]])], [2, new Map([[0, ed2], [1, ed4]])]]);
    ed1 = {};
    ed2 = {};
    this.P3 = new this.Graph();
    this.P3.adj = new Map([[0, new Map([[1, ed1]])], [1, new Map([[2, ed2]])], [2, new Map()]]);
    this.P3.succ = this.P3.adj;
    this.P3.pred = new Map([[0, new Map()], [1, new Map([[0, ed1]])], [2, new Map([[1, ed2]])]]);
    this.K3.node = new Map([[0, {}], [1, {}], [2, {}]]);
    this.P3.node = new Map([[0, {}], [1, {}], [2, {}]]);
  },
  testDataInput: function
  /*istanbul ignore next*/
  testDataInput() {
    var G = new this.Graph(new Map([[1, [2]], [2, [1]]]), {
      name: 'test'
    });
    assert.equal(G.name, 'test');
    assert.deepEqual(sorted(G.adj.entries()), [[1, new Map([[2, {}]])], [2, new Map([[1, {}]])]]);
    assert.deepEqual(sorted(G.succ.entries()), [[1, new Map([[2, {}]])], [2, new Map([[1, {}]])]]);
    assert.deepEqual(sorted(G.pred.entries()), [[1, new Map([[2, {}]])], [2, new Map([[1, {}]])]]);
  },
  testAddEdge: function
  /*istanbul ignore next*/
  testAddEdge() {
    var G = new this.Graph();
    G.addEdge(0, 1);
    assert.deepEqual(G.adj, new Map({
      0: new Map({
        1: {}
      }),
      1: new Map()
    }));
    assert.deepEqual(G.succ, new Map({
      0: new Map({
        1: {}
      }),
      1: new Map()
    }));
    assert.deepEqual(G.pred, new Map({
      0: new Map(),
      1: new Map({
        0: {}
      })
    }));
    G = new this.Graph();
    G.addEdge.apply(G, [0, 1]); // tuple unpacking

    assert.deepEqual(G.adj, new Map({
      0: new Map({
        1: {}
      }),
      1: new Map()
    }));
    assert.deepEqual(G.succ, new Map({
      0: new Map({
        1: {}
      }),
      1: new Map()
    }));
    assert.deepEqual(G.pred, new Map({
      0: new Map(),
      1: new Map({
        0: {}
      })
    }));
  },
  testAddEdgesFrom: function
  /*istanbul ignore next*/
  testAddEdgesFrom() {
    var G = new this.Graph();
    G.addEdgesFrom([[0, 1], [0, 2, {
      data: 3
    }]], {
      data: 2
    });
    assert.deepEqual(G.adj, new Map({
      0: new Map({
        1: {
          data: 2
        },
        2: {
          data: 3
        }
      }),
      1: new Map(),
      2: new Map()
    }));
    assert.deepEqual(G.succ, new Map({
      0: new Map({
        1: {
          data: 2
        },
        2: {
          data: 3
        }
      }),
      1: new Map(),
      2: new Map()
    }));
    assert.deepEqual(G.pred, new Map({
      0: new Map(),
      1: new Map({
        0: {
          data: 2
        }
      }),
      2: new Map({
        0: {
          data: 3
        }
      })
    })); // too few in tuple

    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.addEdgesFrom([[0]]);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]); // too many in tuple

    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.addEdgesFrom([[0, 1, 2, 3]]);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]); // not a tuple

    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.addEdgesFrom([0]);
    }, TypeError);
  },
  testRemoveEdge: function
  /*istanbul ignore next*/
  testRemoveEdge() {
    var G = this.K3;
    G.removeEdge(0, 1);
    assert.deepEqual(G.succ, new Map({
      0: new Map({
        2: {}
      }),
      1: new Map({
        0: {},
        2: {}
      }),
      2: new Map({
        0: {},
        1: {}
      })
    }));
    assert.deepEqual(G.pred, new Map({
      0: new Map({
        1: {},
        2: {}
      }),
      1: new Map({
        2: {}
      }),
      2: new Map({
        0: {},
        1: {}
      })
    }));
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.removeEdge(-1, 0);
    },
    /*istanbul ignore next*/
    _JSNetworkXError[
    /*istanbul ignore next*/
    "default"]);
  },
  testRemoveEdgesFrom: function
  /*istanbul ignore next*/
  testRemoveEdgesFrom() {
    var G = this.K3;
    G.removeEdgesFrom([[0, 1]]);
    assert.deepEqual(G.succ, new Map({
      0: new Map({
        2: {}
      }),
      1: new Map({
        0: {},
        2: {}
      }),
      2: new Map({
        0: {},
        1: {}
      })
    }));
    assert.deepEqual(G.pred, new Map({
      0: new Map({
        1: {},
        2: {}
      }),
      1: new Map({
        2: {}
      }),
      2: new Map({
        0: {},
        1: {}
      })
    }));
    assert.doesNotThrow(function ()
    /*istanbul ignore next*/
    {
      return G.removeEdgesFrom([[0, 0]]);
    });
  }
});

/*istanbul ignore next*/
exports.TestDiGraph = TestDiGraph;