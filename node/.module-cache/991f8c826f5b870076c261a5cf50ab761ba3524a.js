/*global assert, utils*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testMessage = void 0;

var
/*istanbul ignore next*/
_message = require("../message");

var
/*istanbul ignore next*/
_classes = require("../../classes");

/*istanbul ignore next*/ function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _utils = utils,
    Map = _utils.Map,
    Set = _utils.Set;

function convert(v) {
  return (
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _message.
    /*istanbul ignore next*/
    deserialize)(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _message.
    /*istanbul ignore next*/
    serialize)(v))
  );
}

function graph() {
  var edges = [[1, 2], [2, 3]];
  var data = {
    foo: 'bar'
  };
  return new
  /*istanbul ignore next*/
  _classes.
  /*istanbul ignore next*/
  Graph(edges, data);
}

var testMessage = {
  isSupported: function
  /*istanbul ignore next*/
  isSupported() {
    // primitives
    assert.ok(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _message.
    /*istanbul ignore next*/
    isSupported)(null));
    assert.ok(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _message.
    /*istanbul ignore next*/
    isSupported)(undefined));
    assert.ok(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _message.
    /*istanbul ignore next*/
    isSupported)('foo'));
    assert.ok(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _message.
    /*istanbul ignore next*/
    isSupported)(42));
    assert.ok(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _message.
    /*istanbul ignore next*/
    isSupported)(false)); // plain objects, and arrays

    assert.ok(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _message.
    /*istanbul ignore next*/
    isSupported)({
      foo: 'bar'
    }));
    assert.ok(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _message.
    /*istanbul ignore next*/
    isSupported)([1, 2, 3])); // Maps, Sets

    assert.ok(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _message.
    /*istanbul ignore next*/
    isSupported)(new Map({
      foo: 'bar'
    })));
    assert.ok(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _message.
    /*istanbul ignore next*/
    isSupported)(new Set([1, 2, 3]))); // Graphs

    assert.ok(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _message.
    /*istanbul ignore next*/
    isSupported)(new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph()));
    assert.ok(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _message.
    /*istanbul ignore next*/
    isSupported)(new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    DiGraph())); // Custom classes not supported

    /*istanbul ignore next*/
    var Foo = function Foo() {
      _classCallCheck(this, Foo);
    };

    assert.ok(!
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _message.
    /*istanbul ignore next*/
    isSupported)(new Foo())); // Iterables

    assert.ok(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _message.
    /*istanbul ignore next*/
    isSupported)(new Set().values()));
  },
  'serialize/deserialize': function
  /*istanbul ignore next*/
  serializeDeserialize() {
    // primitives
    assert.equal(convert(null), null);
    assert.equal(convert(undefined), undefined);
    assert.equal(convert('foo'), 'foo');
    assert.equal(convert(42), 42);
    assert.equal(convert(false), false); // plain objects, and arrays

    assert.deepEqual(convert({
      foo: 'bar'
    }), {
      foo: 'bar'
    });
    assert.deepEqual(convert([1, 2, 3]), [1, 2, 3]); // Maps, Sets

    var m = new Map({
      foo: 'bar'
    });
    assert.notEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _message.
    /*istanbul ignore next*/
    serialize)(m), m);
    assert.deepEqual(convert(m), m);
    var s = new Set([1, 2, 3]);
    assert.notEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _message.
    /*istanbul ignore next*/
    serialize)(s), s);
    assert.deepEqual(convert(s), s); // Graphs

    var G = graph();
    assert.notEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _message.
    /*istanbul ignore next*/
    serialize)(G), G);
    assert.deepEqual(convert(G), G);
    G = G.toDirected();
    assert.notEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _message.
    /*istanbul ignore next*/
    serialize)(G), G);
    assert.deepEqual(convert(G), G); // Everything else is just returned as is

    /*istanbul ignore next*/
    var Foo = function Foo() {
      _classCallCheck(this, Foo);
    };

    var foo = new Foo();
    assert.equal(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _message.
    /*istanbul ignore next*/
    serialize)(foo), foo);
    assert.equal(convert(foo), foo); // Iterables (only serialized)

    foo =
    /*istanbul ignore next*/

    /*#__PURE__*/
    regeneratorRuntime.mark(function
    /*istanbul ignore next*/
    foo()
    /*istanbul ignore next*/
    {
      return regeneratorRuntime.wrap(function foo$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return 1;

            case 2:
              _context.next = 4;
              return 2;

            case 4:
              _context.next = 6;
              return 3;

            case 6:
            case "end":
              return _context.stop();
          }
        }
      }, foo);
    });
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _message.
    /*istanbul ignore next*/
    serialize)(foo()), [1, 2, 3]);
  }
};

/*istanbul ignore next*/
exports.testMessage = testMessage;