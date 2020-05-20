/*global assert, utils*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TestMultiDiGraph = void 0;

var
/*istanbul ignore next*/
_BaseMultiDiGraphTester = _interopRequireDefault(require("./BaseMultiDiGraphTester"));

var
/*istanbul ignore next*/
_MultiDiGraph = _interopRequireDefault(require("../MultiDiGraph"));

var
/*istanbul ignore next*/
_exceptions = require("../../exceptions");

var
/*istanbul ignore next*/
_MultiGraphTest = require("./2_MultiGraph-test");

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Map = utils.Map;
var TestMultiDiGraph = Object.assign({},
/*istanbul ignore next*/
_MultiGraphTest.
/*istanbul ignore next*/
TestMultiGraph,
/*istanbul ignore next*/
_BaseMultiDiGraphTester[
/*istanbul ignore next*/
"default"], {
  beforeEach: function
  /*istanbul ignore next*/
  beforeEach() {
    this.Graph =
    /*istanbul ignore next*/
    _MultiDiGraph[
    /*istanbul ignore next*/
    "default"]; // build K3

    this.k3edges = [[0, 1], [0, 2], [1, 2]];
    this.k3nodes = [0, 1, 2];
    this.K3 = new this.Graph();
    this.K3.adj = new Map({
      0: new Map(),
      1: new Map(),
      2: new Map()
    });
    this.K3.succ = this.K3.adj;
    this.K3.pred = new Map({
      0: new Map(),
      1: new Map(),
      2: new Map()
    });
    this.k3nodes.forEach(function (u) {
      this.k3nodes.forEach(function (v) {
        if (v !== u) {
          var d = {
            0: {}
          };
          this.K3.succ.get(u).set(v, d);
          this.K3.pred.get(v).set(u, d);
        }
      }, this);
    }, this);
    this.K3.adj = this.K3.succ;
    this.K3.edge = this.K3.adj;
    this.K3.node = new Map({
      0: {},
      1: {},
      2: {}
    });
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
      1: new Map()
    }));
    assert.deepEqual(G.succ, new Map({
      0: new Map({
        1: {
          0: {}
        }
      }),
      1: new Map()
    }));
    assert.deepEqual(G.pred, new Map({
      0: new Map(),
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
      1: new Map()
    }));
    assert.deepEqual(G.succ, new Map({
      0: new Map({
        1: {
          0: {}
        }
      }),
      1: new Map()
    }));
    assert.deepEqual(G.pred, new Map({
      0: new Map(),
      1: new Map({
        0: {
          0: {}
        }
      })
    }));
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
      1: new Map()
    }));
    assert.deepEqual(G.succ, new Map({
      0: new Map({
        1: {
          0: {},
          1: {
            weight: 3
          }
        }
      }),
      1: new Map()
    }));
    assert.deepEqual(G.pred, new Map({
      0: new Map(),
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
    assert.deepEqual(G.succ, new Map({
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
      1: new Map()
    }));
    assert.deepEqual(G.pred, new Map({
      0: new Map(),
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
    JSNetworkXError);
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
    assert.deepEqual(G.pred, new Map({
      0: new Map({
        1: {
          0: {}
        },
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
    assert.deepEqual(G.succ, new Map({
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
    assert.deepEqual(G.pred, new Map({
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
    assert.deepEqual(G.succ, new Map({
      0: new Map({
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
    assert.deepEqual(G.pred, new Map({
      0: new Map({
        1: {
          0: {}
        },
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
  },
  testRemoveEdgesFrom: function
  /*istanbul ignore next*/
  testRemoveEdgesFrom() {
    var G = this.K3;
    G.removeEdgesFrom([[0, 1]]);
    assert.deepEqual(G.succ, new Map({
      0: new Map({
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
    assert.deepEqual(G.pred, new Map({
      0: new Map({
        1: {
          0: {}
        },
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
    }); // silent fail
  }
});

/*istanbul ignore next*/
exports.TestMultiDiGraph = TestMultiDiGraph;