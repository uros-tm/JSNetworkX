/*global assert, utils*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testToIterator = void 0;

var
/*istanbul ignore next*/
_toIterator = _interopRequireDefault(require("../toIterator"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(generator);

function generator()
/*istanbul ignore next*/
{
  return regeneratorRuntime.wrap(function generator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return 0;

        case 2:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var testToIterator = {
  'from iterator (identity)': function
  /*istanbul ignore next*/
  fromIteratorIdentity() {
    var iterator = generator();
    assert.strictEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _toIterator[
    /*istanbul ignore next*/
    "default"])(iterator), iterator);
  },
  'from iterable (e.g. Map)': function
  /*istanbul ignore next*/
  fromIterableEGMap() {
    var data = [[1, 2], [3, 4]];
    var map = new utils.Map(data);
    var iterator =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _toIterator[
    /*istanbul ignore next*/
    "default"])(map);
    assert(utils.isIterator(iterator));
    assert.deepEqual(Array.from(iterator), data);
  },
  'from graph': false,
  // TODO
  'from array-like object': function
  /*istanbul ignore next*/
  fromArrayLikeObject() {
    var data = [1, 2, 3];
    var iterator =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _toIterator[
    /*istanbul ignore next*/
    "default"])(data);
    assert(utils.isIterator(iterator));
    assert.deepEqual(Array.from(iterator), data);
  }
};

/*istanbul ignore next*/
exports.testToIterator = testToIterator;