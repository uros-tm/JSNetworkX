'use strict';
/**
 * Takes a number of iterators and returns a new iterator which emits an array
 * of each of the iterators next values. Stops when the shortest iterator is
 * exhausted.
 *
 * @param {...Iterator} var_args
 * @return {Iterator}
 */

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = zipIterator;

var _marked = /*#__PURE__*/regeneratorRuntime.mark(zipIterator);

function zipIterator()
/*istanbul ignore next*/
{
  var varArgs,
      length,
      done,
      nextZip,
      i,
      next,
      _args = arguments;
  return regeneratorRuntime.wrap(function zipIterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // TODO: Use rest parameter once 6to5 is fixed (2.0)
          varArgs = _args;
          length = varArgs.length;

        case 2:
          if (!true) {
            _context.next = 21;
            break;
          }

          done = false;
          nextZip = new Array(length);
          i = 0;

        case 6:
          if (!(i < length)) {
            _context.next = 15;
            break;
          }

          next = varArgs[i].next();

          if (!next.done) {
            _context.next = 11;
            break;
          }

          done = true;
          return _context.abrupt("break", 15);

        case 11:
          nextZip[i] = next.value;

        case 12:
          i++;
          _context.next = 6;
          break;

        case 15:
          if (!done) {
            _context.next = 17;
            break;
          }

          return _context.abrupt("break", 21);

        case 17:
          _context.next = 19;
          return nextZip;

        case 19:
          _context.next = 2;
          break;

        case 21:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}