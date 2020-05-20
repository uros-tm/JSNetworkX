/*global assert */
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testIsIterator = void 0;

var
/*istanbul ignore next*/
_isIterator = _interopRequireDefault(require("../isIterator"));

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

var testIsIterator = {
  'true for iterators': function
  /*istanbul ignore next*/
  trueForIterators() {
    assert(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _isIterator[
    /*istanbul ignore next*/
    "default"])(generator()));
  },
  'does not fail for null/undefined': function
  /*istanbul ignore next*/
  doesNotFailForNullUndefined() {
    assert(!
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _isIterator[
    /*istanbul ignore next*/
    "default"])(null));
    assert(!
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _isIterator[
    /*istanbul ignore next*/
    "default"])(void 0));
  }
};

/*istanbul ignore next*/
exports.testIsIterator = testIsIterator;