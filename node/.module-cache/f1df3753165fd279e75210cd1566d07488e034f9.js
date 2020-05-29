'use strict';
/**
 * Implements Python's range function, returns an iterator.
 *
 * If one argument n is passed, iterates over 0...n.
 * If two arguments i,j are passed, iterates over i...j.
 * If three arguments i,j,k are passed, iterates over i, i+k, i+2k, ...j
 *
 * @param {?number=} opt_start Number to start from
 * @param {?number=} opt_end Number to count to
 * @param {?number=} opt_step Step size
 * @return {!Iterator}
 */

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = genRange;

var _marked = /*#__PURE__*/regeneratorRuntime.mark(genRange);

function genRange(optStart, optEnd, optStep)
/*istanbul ignore next*/
{
  var negative, i;
  return regeneratorRuntime.wrap(function genRange$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (!(optStart == null)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return");

        case 4:
          if (!(optEnd == null)) {
            _context.next = 10;
            break;
          }

          optEnd = optStart;
          optStart = 0;
          optStep = 1;
          _context.next = 16;
          break;

        case 10:
          if (!(optStep == null)) {
            _context.next = 14;
            break;
          }

          optStep = 1;
          _context.next = 16;
          break;

        case 14:
          if (!(optStep === 0)) {
            _context.next = 16;
            break;
          }

          throw new RangeError("opt_step can't be 0");

        case 16:
          negative = optStep < 0;
          i = optStart;

        case 18:
          if (!(negative && i > optEnd || !negative && i < optEnd)) {
            _context.next = 24;
            break;
          }

          _context.next = 21;
          return i;

        case 21:
          i += optStep;
          _context.next = 18;
          break;

        case 24:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}