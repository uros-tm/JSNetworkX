'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = genPermutations;

var
/*istanbul ignore next*/
_range = _interopRequireDefault(require("./range"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(genPermutations);

/**
 * Implements Python's itertools.permutations
 *
 * Return successive r length permutations of elements in the iterable.
 * *
 * @param {Iterable} iterable
 * @param {number=} opt_r
 *
 * @return {Iterator}
 */
function genPermutations(iterable, r)
/*istanbul ignore next*/
{
  var pool, n, indicies, cycles, rangeR, k, i, index, j;
  return regeneratorRuntime.wrap(function genPermutations$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          // genPermutations('ABCD', 2) --> AB AC AD BA BC BD CA CB CD DA DB DC
          // genPermutations(range(3)) --> 012 021 102 120 201 210
          pool = Array.from(iterable);
          n = pool.length;
          r = r == null ? n : r;

          if (!(r > n)) {
            _context.next = 5;
            break;
          }

          return _context.abrupt("return");

        case 5:
          indicies =
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _range[
          /*istanbul ignore next*/
          "default"])(n);
          cycles =
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _range[
          /*istanbul ignore next*/
          "default"])(n, n - r, -1);
          rangeR =
          /*istanbul ignore next*/
          (0,
          /*istanbul ignore next*/
          _range[
          /*istanbul ignore next*/
          "default"])(r - 1, -1, -1);
          _context.next = 10;
          return indicies.slice(0, r).map(function (i)
          /*istanbul ignore next*/
          {
            return pool[i];
          });

        case 10:
          if (!true) {
            _context.next = 35;
            break;
          }

          k = 0;

        case 12:
          if (!(k < rangeR.length)) {
            _context.next = 31;
            break;
          }

          i = rangeR[k];
          cycles[i] -= 1;
          index = indicies[i];

          if (!(cycles[i] === 0)) {
            _context.next = 22;
            break;
          }

          indicies.splice(i, 1);
          indicies.push(index);
          cycles[i] = n - i;
          _context.next = 28;
          break;

        case 22:
          j = cycles[i];
          indicies[i] = indicies[indicies.length - j];
          indicies[indicies.length - j] = index;
          /* eslint-disable no-loop-func */

          _context.next = 27;
          return indicies.slice(0, r).map(function (i)
          /*istanbul ignore next*/
          {
            return pool[i];
          });

        case 27:
          return _context.abrupt("break", 31);

        case 28:
          k++;
          _context.next = 12;
          break;

        case 31:
          if (!(rangeR.length === k)) {
            _context.next = 33;
            break;
          }

          return _context.abrupt("return");

        case 33:
          _context.next = 10;
          break;

        case 35:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}