/*global assert*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testZipIterator = void 0;

var
/*istanbul ignore next*/
_zipIterator = _interopRequireDefault(require("../zipIterator"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(gen);

function gen(data)
/*istanbul ignore next*/
{
  var i;
  return regeneratorRuntime.wrap(function gen$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < data.length)) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return data[i];

        case 4:
          i++;
          _context.next = 1;
          break;

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var testZipIterator = {
  'zip itarators of equal length': function
  /*istanbul ignore next*/
  zipItaratorsOfEqualLength() {
    assert.deepEqual(Array.from(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _zipIterator[
    /*istanbul ignore next*/
    "default"])(gen([1, 2, 3]), gen([4, 5, 6]), gen([7, 8, 9]))), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]);
  },
  'zip shortest iterator': function
  /*istanbul ignore next*/
  zipShortestIterator() {
    assert.deepEqual(Array.from(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _zipIterator[
    /*istanbul ignore next*/
    "default"])(gen([1, 2, 3]), gen([4, 5]))), [[1, 4], [2, 5]]);
  },
  'empty iterator': function
  /*istanbul ignore next*/
  emptyIterator() {
    assert.deepEqual(Array.from(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _zipIterator[
    /*istanbul ignore next*/
    "default"])(gen([1, 2, 3]), gen([]))), []);
  }
};

/*istanbul ignore next*/
exports.testZipIterator = testZipIterator;