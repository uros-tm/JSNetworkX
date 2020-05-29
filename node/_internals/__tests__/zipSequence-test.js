/*global assert*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testZipSequence = void 0;

var
/*istanbul ignore next*/
_zipSequence = _interopRequireDefault(require("../zipSequence"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(gen);

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

var testZipSequence = {
  'zip arrays': function
  /*istanbul ignore next*/
  zipArrays() {
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _zipSequence[
    /*istanbul ignore next*/
    "default"])([1, 2, 3], [4, 5, 6], [7, 8, 9]), [[1, 4, 7], [2, 5, 8], [3, 6, 9]]);
  },
  'zip arrays-like objects': function
  /*istanbul ignore next*/
  zipArraysLikeObjects() {
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _zipSequence[
    /*istanbul ignore next*/
    "default"])({
      length: 2,
      0: 1,
      1: 2
    }, {
      length: 3,
      0: 3,
      1: 4,
      2: 5
    }), [[1, 3], [2, 4]]);
  },
  'zip iterators': function
  /*istanbul ignore next*/
  zipIterators() {
    assert.deepEqual(Array.from(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _zipSequence[
    /*istanbul ignore next*/
    "default"])(gen([1, 2, 3]), gen([4, 5]))), [[1, 4], [2, 5]]);
  }
};

/*istanbul ignore next*/
exports.testZipSequence = testZipSequence;