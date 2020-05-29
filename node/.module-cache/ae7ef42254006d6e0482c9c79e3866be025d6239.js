'use strict';
/**
 * Returns a new iterator which maps every value from the provided iterator via
 * the callback function.
 *
 * @param {Iterator} iterator
 * @param {function} map
 * @param {?=} opt_this_obj
 * @return {Iterator}
 */

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = mapIterator;

var _marked = /*#__PURE__*/regeneratorRuntime.mark(mapIterator);

function mapIterator(iterator, map, optThisObj)
/*istanbul ignore next*/
{
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, v;

  return regeneratorRuntime.wrap(function mapIterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context.prev = 3;
          _iterator = iterator[Symbol.iterator]();

        case 5:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context.next = 12;
            break;
          }

          v = _step.value;
          _context.next = 9;
          return map.call(optThisObj, v);

        case 9:
          _iteratorNormalCompletion = true;
          _context.next = 5;
          break;

        case 12:
          _context.next = 18;
          break;

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](3);
          _didIteratorError = true;
          _iteratorError = _context.t0;

        case 18:
          _context.prev = 18;
          _context.prev = 19;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 21:
          _context.prev = 21;

          if (!_didIteratorError) {
            _context.next = 24;
            break;
          }

          throw _iteratorError;

        case 24:
          return _context.finish(21);

        case 25:
          return _context.finish(18);

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[3, 14, 18, 26], [19,, 21, 25]]);
}