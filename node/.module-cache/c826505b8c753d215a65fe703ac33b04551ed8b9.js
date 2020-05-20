/*global assert*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testObserver = void 0;

var
/*istanbul ignore next*/
_sinon = _interopRequireDefault(require("sinon"));

var
/*istanbul ignore next*/
_classes = require("../../classes/");

var
/*istanbul ignore next*/
_internals = require("../../_internals");

var
/*istanbul ignore next*/
_observer = require("../observer");

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function calledWith(cb, arg) {
  /*istanbul ignore next*/
  _sinon[
  /*istanbul ignore next*/
  "default"].assert.calledWith(cb,
  /*istanbul ignore next*/
  _sinon[
  /*istanbul ignore next*/
  "default"].match(arg));
}

var testObserver = {
  testObserve: function
  /*istanbul ignore next*/
  testObserve() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph();

    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _observer.
    /*istanbul ignore next*/
    observe)(G);
    assert.isFunction(G.on);
    assert(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _observer.
    /*istanbul ignore next*/
    isObservable)(G));

    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _observer.
    /*istanbul ignore next*/
    unobserve)(G);
    assert(!
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _observer.
    /*istanbul ignore next*/
    isObservable)(G));
  },
  testAddNodes: function
  /*istanbul ignore next*/
  testAddNodes() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph();

    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _observer.
    /*istanbul ignore next*/
    observe)(G);

    var cb =
    /*istanbul ignore next*/
    _sinon[
    /*istanbul ignore next*/
    "default"].spy();

    G.on('addNodes', cb);
    G.addNode(1);
    calledWith(cb, {
      nodes: [1],
      newNodes: [1]
    });
    cb.reset();
    G.addNodesFrom([1, 2, 3]);
    calledWith(cb, {
      nodes: [1, 2, 3],
      newNodes: [2, 3]
    });
    cb.reset();
    G.addNodesFrom([[10, {}], 11]);
    calledWith(cb, {
      nodes: [[10, {}], 11],
      newNodes: [10, 11]
    });
  },
  testAddNodesIterator: function
  /*istanbul ignore next*/
  testAddNodesIterator() {
    /*istanbul ignore next*/
    var _marked =
    /*#__PURE__*/
    regeneratorRuntime.mark(gen);

    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph();

    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _observer.
    /*istanbul ignore next*/
    observe)(G);

    function gen()
    /*istanbul ignore next*/
    {
      return regeneratorRuntime.wrap(function gen$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return (
                /*istanbul ignore next*/
                (0,
                /*istanbul ignore next*/
                _internals.
                /*istanbul ignore next*/
                tuple2)(1, {})
              );

            case 2:
              _context.next = 4;
              return (
                /*istanbul ignore next*/
                (0,
                /*istanbul ignore next*/
                _internals.
                /*istanbul ignore next*/
                tuple2)(2, {})
              );

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, _marked);
    }

    var cb =
    /*istanbul ignore next*/
    _sinon[
    /*istanbul ignore next*/
    "default"].spy();

    G.on('addNodes', cb);
    G.addNodesFrom(gen());
    calledWith(cb, {
      nodes: [[1, {}], [2, {}]],
      newNodes: [1, 2]
    });
  },
  testAddEdges: function
  /*istanbul ignore next*/
  testAddEdges() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph();

    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _observer.
    /*istanbul ignore next*/
    observe)(G);

    var cb =
    /*istanbul ignore next*/
    _sinon[
    /*istanbul ignore next*/
    "default"].spy();

    G.on('addEdges', cb);
    G.addEdge(1, 2);
    calledWith(cb, {
      edges: [[1, 2]],
      newEdges: [[1, 2]]
    });
    cb.reset();
    G.addEdgesFrom([[1, 2], [2, 3]]);
    calledWith(cb, {
      edges: [[1, 2], [2, 3]],
      newEdges: [[2, 3]]
    });
  },
  testAddEdgesIterator: function
  /*istanbul ignore next*/
  testAddEdgesIterator() {
    /*istanbul ignore next*/
    var _marked2 =
    /*#__PURE__*/
    regeneratorRuntime.mark(gen);

    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph();

    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _observer.
    /*istanbul ignore next*/
    observe)(G);

    function gen()
    /*istanbul ignore next*/
    {
      return regeneratorRuntime.wrap(function gen$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return (
                /*istanbul ignore next*/
                (0,
                /*istanbul ignore next*/
                _internals.
                /*istanbul ignore next*/
                tuple2)(1, 2)
              );

            case 2:
              _context2.next = 4;
              return (
                /*istanbul ignore next*/
                (0,
                /*istanbul ignore next*/
                _internals.
                /*istanbul ignore next*/
                tuple2)(2, 3)
              );

            case 4:
            case "end":
              return _context2.stop();
          }
        }
      }, _marked2);
    }

    var cb =
    /*istanbul ignore next*/
    _sinon[
    /*istanbul ignore next*/
    "default"].spy();

    G.on('addEdges', cb);
    G.addEdgesFrom(gen());
    calledWith(cb, {
      edges: [[1, 2], [2, 3]],
      newEdges: [[1, 2], [2, 3]]
    });
  },
  testPreventDefaultNodes: function
  /*istanbul ignore next*/
  testPreventDefaultNodes() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph();

    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _observer.
    /*istanbul ignore next*/
    observe)(G);
    G.addNodesFrom([1, 2]);
    G.on('addNodes', function (event)
    /*istanbul ignore next*/
    {
      return event.preventDefault();
    }, null, true);
    G.addNodesFrom([3, 4]);
    assert.deepEqual(G.nodes(), [1, 2]);
  },
  testPreventDefaultEdges: function
  /*istanbul ignore next*/
  testPreventDefaultEdges() {
    var G = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph();

    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _observer.
    /*istanbul ignore next*/
    observe)(G);
    G.addEdge(1, 2);
    G.on('addEdges', function (event)
    /*istanbul ignore next*/
    {
      return event.preventDefault();
    }, null, true);
    G.addEdge(2, 3);
    assert.deepEqual(G.edges(), [[1, 2]]);
  }
};

/*istanbul ignore next*/
exports.testObserver = testObserver;