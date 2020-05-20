'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = genCombinations;

var
/*istanbul ignore next*/
_range = _interopRequireDefault(require("./range"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked =
/*#__PURE__*/
regeneratorRuntime.mark(genCombinations);

function reversed(array) {
  return array.slice().reverse();
}
/**
 * Implements Python's itertools.combinations
 *
 * Return r length subsequences of elements from the input iterable.
 *
 * @param {Iterable} iterable
 * @param {number} r
 *
 * @return {Iterator}
 */


function genCombinations(iterable, r)
/*istanbul ignore next*/
{
  var pool, n, indicies, reversedIndicies, i, k, j;
  return regeneratorRuntime.wrap(function genCombinations$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // genCombinations('ABCD', 2) --> AB AC AD BC BD CD
          // genCombinations(range(4), 3) --> 012 013 023 123
          pool = Array.from(iterable);
          n = pool.length;

          if (!(r > n)) {
            _context.next = 4;
            break;
          }

          return _context.abrupt("return");

        case 4:
          indicies =
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _range[
          /*istanbul ignore next*/
          "default"])(r);
          reversedIndicies = reversed(indicies);
          _context.next = 8;
          return indicies.map(function (i)
          /*istanbul ignore next*/
          {
            return pool[i];
          });

        case 8:
          if (!true) {
            _context.next = 26;
            break;
          }

          i = void 0;
          k = 0;

        case 11:
          if (!(k < reversedIndicies.length)) {
            _context.next = 18;
            break;
          }

          i = reversedIndicies[k];

          if (!(indicies[i] !== i + n - r)) {
            _context.next = 15;
            break;
          }

          return _context.abrupt("break", 18);

        case 15:
          k++;
          _context.next = 11;
          break;

        case 18:
          if (!(reversedIndicies.length === k)) {
            _context.next = 20;
            break;
          }

          return _context.abrupt("return");

        case 20:
          indicies[i] += 1;

          for (
          /*istanbul ignore next*/
          j = i + 1; j < r; j++) {
            indicies[j] = indicies[j - 1] + 1;
          }

          _context.next = 24;
          return indicies.map(function (i)
          /*istanbul ignore next*/
          {
            return pool[i];
          });

        case 24:
          _context.next = 8;
          break;

        case 26:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}