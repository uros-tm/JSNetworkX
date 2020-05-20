/*global assert, utils*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestMultiGraph = void 0;

var
/*istanbul ignore next*/
_BaseMultiGraphTester = _interopRequireDefault(require("./BaseMultiGraphTester"));

var
/*istanbul ignore next*/
_GraphTest = require("./0_Graph-test");

var
/*istanbul ignore next*/
_exceptions = require("../../exceptions");

var
/*istanbul ignore next*/
_MultiGraph = _interopRequireDefault(require("../MultiGraph"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Map = utils.Map;
var TestMultiGraph = Object.assign({},
/*istanbul ignore next*/
_GraphTest.
/*istanbul ignore next*/
TestGraph,
/*istanbul ignore next*/
_BaseMultiGraphTester[
/*istanbul ignore next*/
"default"], {
  beforeEach: function
  /*istanbul ignore next*/
  beforeEach() {
    this.Graph =
    /*istanbul ignore next*/
    _MultiGraph[
    /*istanbul ignore next*/
    "default"];
    var ed1 = {
      0: {}
    };
    var ed2 = {
      0: {}
    };
    var ed3 = {
      0: {}
    };
    this.k3adj = new Map({
      0: new Map({
        1: ed1,
        2: ed2
      }),
      1: new Map({
        0: ed1,
        2: ed3
      }),
      2: new Map({
        0: ed2,
        1: ed3
      })
    });
    this.k3edges = [[0, 1], [0, 2], [1, 2]];
    this.k3nodes = [0, 1, 2];
    this.K3 = new this.Graph();
    this.K3.adj = this.K3.edge = this.k3adj;
    this.K3.node = new Map({
      0: {},
      1: {},
      2: {}
    });
  },
  testDataInput: function
  /*istanbul ignore next*/
  testDataInput() {
    var G = new this.Graph({
      1: [2],
      2: [1]
    }, {
      name: 'test'
    });
    assert.equal(G.name, 'test');
    assert.deepEqual(Array.from(G.adj), [[1, new Map({
      2: {
        0: {}
      }
    })], [2, new Map({
      1: {
        0: {}
      }
    })]]);
  },
  testGetitem: function
  /*istanbul ignore next*/
  testGetitem() {
    var G = this.K3;
    assert.deepEqual(G.get(0), new Map({
      1: {
        0: {}
      },
      2: {
        0: {}
      }
    }));
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.get('j');
    },
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    KeyError); // not implemented:
    // assert.throws(function(){G.get(['A']);}, TypeError);
  },
  testRemoveNode: function
  /*istanbul ignore next*/
  testRemoveNode() {
    var G = this.K3;
    G.removeNode(0);
    assert.deepEqual(G.adj, new Map({
      1: new Map({
        2: {
          0: {}
        }
      }),
      2: new Map({
        1: {
          0: {}
        }
      })
    }));
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.removeNode(-1);
    },
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkXError);
  },
  testAddEdge: function
  /*istanbul ignore next*/
  testAddEdge() {
    var G = new this.Graph();
    G.addEdge(0, 1);
    assert.deepEqual(G.adj, new Map({
      0: new Map({
        1: {
          0: {}
        }
      }),
      1: new Map({
        0: {
          0: {}
        }
      })
    }));
    G = new this.Graph();
    G.addEdge.apply(G, [0, 1]);
    assert.deepEqual(G.adj, new Map({
      0: new Map({
        1: {
          0: {}
        }
      }),
      1: new Map({
        0: {
          0: {}
        }
      })
    }));
  },
  testAddEdgeConflictingKey: function
  /*istanbul ignore next*/
  testAddEdgeConflictingKey() {
    var G = new this.Graph();
    G.addEdge(0, 1, 1);
    G.addEdge(0, 1);
    assert.equal(G.numberOfEdges(), 2);
    G = new this.Graph();
    G.addEdgesFrom([[0, 1, 1, {}]]);
    G.addEdgesFrom([[0, 1]]);
    assert.equal(G.numberOfEdges(), 2);
  },
  testAddEdgesFrom: function
  /*istanbul ignore next*/
  testAddEdgesFrom() {
    var G = new this.Graph();
    G.addEdgesFrom([[0, 1], [0, 1, {
      weight: 3
    }]]);
    assert.deepEqual(G.adj, new Map({
      0: new Map({
        1: {
          0: {},
          1: {
            weight: 3
          }
        }
      }),
      1: new Map({
        0: {
          0: {},
          1: {
            weight: 3
          }
        }
      })
    }));
    G.addEdgesFrom([[0, 1], [0, 1, {
      weight: 3
    }]], {
      weight: 2
    });
    assert.deepEqual(G.adj, new Map({
      0: new Map({
        1: {
          0: {},
          1: {
            weight: 3
          },
          2: {
            weight: 2
          },
          3: {
            weight: 3
          }
        }
      }),
      1: new Map({
        0: {
          0: {},
          1: {
            weight: 3
          },
          2: {
            weight: 2
          },
          3: {
            weight: 3
          }
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
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkXError); // too many in tuple

    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.addEdgesFrom([[0, 1, 2, 3, 4]]);
    },
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkXError); // not a tuple

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
    assert.deepEqual(G.adj, new Map({
      0: new Map({
        2: {
          0: {}
        }
      }),
      1: new Map({
        2: {
          0: {}
        }
      }),
      2: new Map({
        0: {
          0: {}
        },
        1: {
          0: {}
        }
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
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkXError);
    assert[
    /*istanbul ignore next*/
    "throws"](function ()
    /*istanbul ignore next*/
    {
      return G.removeEdge(0, 2, 1);
    },
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkXError);
  },
  testRemoveEdgesFrom: function
  /*istanbul ignore next*/
  testRemoveEdgesFrom() {
    var G = this.K3;
    G.removeEdgesFrom([[0, 1]]);
    assert.deepEqual(G.adj, new Map({
      0: new Map({
        2: {
          0: {}
        }
      }),
      1: new Map({
        2: {
          0: {}
        }
      }),
      2: new Map({
        0: {
          0: {}
        },
        1: {
          0: {}
        }
      })
    }));
    assert.doesNotThrow(function ()
    /*istanbul ignore next*/
    {
      return G.removeEdgesFrom([[0, 0]]);
    });
  },
  testRemoveMultiedge: function
  /*istanbul ignore next*/
  testRemoveMultiedge() {
    var G = this.K3;
    G.addEdge(0, 1, 'parallel edge');
    G.removeEdge(0, 1, 'parallel edge');
    assert.deepEqual(G.adj, new Map({
      0: new Map({
        1: {
          0: {}
        },
        2: {
          0: {}
        }
      }),
      1: new Map({
        0: {
          0: {}
        },
        2: {
          0: {}
        }
      }),
      2: new Map({
        0: {
          0: {}
        },
        1: {
          0: {}
        }
      })
    }));
    G.removeEdge(0, 1);
    assert.deepEqual(G.adj, new Map({
      0: new Map({
        2: {
          0: {}
        }
      }),
      1: new Map({
        2: {
          0: {}
        }
      }),
      2: new Map({
        0: {
          0: {}
        },
        1: {
          0: {}
        }
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
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkXError);
  }
});

/*istanbul ignore next*/
exports.TestMultiGraph = TestMultiGraph;