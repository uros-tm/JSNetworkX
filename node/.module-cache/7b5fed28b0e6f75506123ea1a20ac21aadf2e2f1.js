'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isGraphical = isGraphical;
exports.isValidDegreeSequence = isValidDegreeSequence;
exports.isValidDegreeSequenceHavelHakimi = isValidDegreeSequenceHavelHakimi;
exports.isValidDegreeSequenceErdosGallai = isValidDegreeSequenceErdosGallai;

var
/*istanbul ignore next*/
_exceptions = require("../exceptions");

var
/*istanbul ignore next*/
_fillArray = _interopRequireDefault(require("../_internals/fillArray"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Returns `true` if `sequence` is a valid degree sequence.
 * A degree sequence is valid if some graph can realize it.
 *
 * ### Example
 *
 * ```
 * var G = jsnx.pathGraph(4);
 * var sequence = G.degree().values();
 * jsnx.isValidDegreeSequence(sequence);
 * // true
 * ```
 *
 * @param {Iterable} sequence A sequence of integer node degrees.
 * @param {string=} optMethod ('eg' | 'hh')
 *      The method used to validate the degree sequence.
 *      "eg" corresponds to the Erdős-Gallai algorithm, and
 *      "hh" to the Havel-Hakimi algorithm.
 * @return {boolean}
 *      `true` if `sequence` is a valid degree sequence and `false` if not.
 */
function isGraphical(_x) {
  return _isGraphical.apply(this, arguments);
} // We need this instead of just aliasing this so that the async code transform
// kicks in

/**
 * @alias isGraphical
 */


/*istanbul ignore next*/
function _isGraphical() {
  _isGraphical = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee(sequence)
  /*istanbul ignore next*/
  {
    var optMethod,
        _args = arguments;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            optMethod = _args.length > 1 && _args[1] !== undefined ? _args[1] : 'hh';
            _context.t0 = optMethod;
            _context.next = _context.t0 === 'eg' ? 4 : _context.t0 === 'hh' ? 7 : 10;
            break;

          case 4:
            _context.next = 6;
            return isValidDegreeSequenceErdosGallai(Array.from(sequence));

          case 6:
            return _context.abrupt("return", _context.sent);

          case 7:
            _context.next = 9;
            return isValidDegreeSequenceHavelHakimi(Array.from(sequence));

          case 9:
            return _context.abrupt("return", _context.sent);

          case 10:
            throw new
            /*istanbul ignore next*/
            _exceptions.
            /*istanbul ignore next*/
            JSNetworkXException("`opt_method` must be 'eg' or 'hh'");

          case 11:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _isGraphical.apply(this, arguments);
}

/*istanbul ignore next*/
function isValidDegreeSequence(_x2, _x3) {
  return _isValidDegreeSequence.apply(this, arguments);
}

/*istanbul ignore next*/
function _isValidDegreeSequence() {
  _isValidDegreeSequence = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee2(sequence, optMethod)
  /*istanbul ignore next*/
  {
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return isGraphical(sequence, optMethod);

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _isValidDegreeSequence.apply(this, arguments);
}

function basicGraphicalTests(sequence) {
  // sort and perform some simple tests on the sequence
  if (!sequence.every(function (x)
  /*istanbul ignore next*/
  {
    return Math.floor(x) === x;
  })) {
    // list of positive intengers
    throw new
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkXUnfeasible();
  }

  var numberOfNodes = sequence.length;
  var numDegress =
  /*istanbul ignore next*/
  (0,
  /*istanbul ignore next*/
  _fillArray[
  /*istanbul ignore next*/
  "default"])(numberOfNodes, 0);
  var maxDegree = 0;
  var minDegree = numberOfNodes;
  var degreeSum = 0;
  var n = 0;

  for (var i = 0; i < numberOfNodes; i++) {
    var degree = sequence[i]; // Reject if degree is negative or larger than the sequence length

    if (degree < 0 || degree >= numberOfNodes) {
      throw new
      /*istanbul ignore next*/
      _exceptions.
      /*istanbul ignore next*/
      JSNetworkXUnfeasible();
    } // process only the non-zero integers
    else if (degree > 0) {
        maxDegree = Math.max(maxDegree, degree);
        minDegree = Math.min(minDegree, degree);
        degreeSum += degree;
        n += 1;
        numDegress[degree] += 1;
      }
  } // Reject sequence if it has odd sum or is over-saturated


  if (degreeSum % 2 === 1 || degreeSum > n * (n - 1)) {
    throw new
    /*istanbul ignore next*/
    _exceptions.
    /*istanbul ignore next*/
    JSNetworkXUnfeasible();
  }

  return [maxDegree, minDegree, degreeSum, n, numDegress];
}
/**
 * Returns `true` if `degreeSequence` cam be realized by a simple graph.
 *
 * The Validation proceeds via the Havel-Hakimi theorem.
 * Worst-case run time is `$O(s)$`, where `$s$` is the sum of the degree
 * sequence.
 *
 * The `$ZZ$` condition says that for the sequence `$d$`, if
 *
 * ```math
 *     |d| >= \frac{(\max(d) + \min(d) + 1)^2}{4*\min(d)}
 * ```
 *
 * then `$d$` is graphical.
 *
 * ### References
 *
 * [1] I.E. Zverovich and V.E. Zverovich. "Contributions to the theory
 *     of graphic sequences", Discrete Mathematics, 105, pp. 292-303 (1992).
 *
 * @param {Iterable} degreeSequence
 *   A list of integers where each element specifies the degree of a node
 *   in a graph.
 * @return {boolean} `true` if `degreeSequence` is graphical and `false` if not.
 */


/*istanbul ignore next*/
function isValidDegreeSequenceHavelHakimi(_x4) {
  return _isValidDegreeSequenceHavelHakimi.apply(this, arguments);
}
/**
 * Returns `true` if `degreeSequence` can be realized by a simple graph.
 * The validation is done using the Erdős-Gallai theorem.
 *
 * This implementation uses an equivalent form of the Erdős-Gallai criterion.
 * Worst-case run time is `$O(n)$` where `$n$` is the length of the sequence.
 *
 * Specifically, a sequence `$d$` is graphical if and only if the sum of the
 * sequence is even and for all strong indices `$k$` in the sequence,
 *
 * ```math
 * \sum_{i=1}^{k} d_i \leq k(k-1) + \sum_{j=k+1}^{n} \min(d_i,k)
 *    = k(n-1) - ( k \sum_{j=0}^{k-1} n_j - \sum_{j=0}^{k-1} j n_j )
 * ```
 *
 * A strong index `$k$` is any index where `$d_k \geq k$` and the value `$n_j$`
 * is the number of occurrences of `$j$` in `$d$`. The maximal strong index is
 * called the Durfee index.
 *
 * This particular rearrangement comes from the proof of Theorem 3 in (2)
 *
 * The `$ZZ$` condition says that for the sequence `$d$`, if
 *
 * ```math
 * |d| >= \frac{(\max(d) + \min(d) + 1)^2}{4*\min(d)}
 * ```
 *
 * then `$d$` is graphical. This was shown in Theorem 6 in (2).
 *
 * ### References
 * [1] A. Tripathi and S. Vijay. "A note on a theorem of Erdős & Gallai",
 *     Discrete Mathematics, 265, pp. 417-420 (2003).
 *
 * [2] I.E. Zverovich and V.E. Zverovich. "Contributions to the theory
 *     of graphic sequences", Discrete Mathematics, 105, pp. 292-303 (1992).
 *
 * @param {Iterable} degreeSequence
 *      A list of integers where each element specifies the degree of a node
 *      in a graph.
 * @return {boolean} `true` if `degreeSequence` is graphical and f`alse` if not.
 */


/*istanbul ignore next*/
function _isValidDegreeSequenceHavelHakimi() {
  _isValidDegreeSequenceHavelHakimi = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee3(degreeSequence)
  /*istanbul ignore next*/
  {
    var _, maxDegree, minDegree, n, numDegrees, _basicGraphicalTests, _basicGraphicalTests2, modstubs, mslen, k, i, stub;

    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.prev = 0;
            _basicGraphicalTests = basicGraphicalTests(degreeSequence);
            _basicGraphicalTests2 = _slicedToArray(_basicGraphicalTests, 5);
            maxDegree = _basicGraphicalTests2[0];
            minDegree = _basicGraphicalTests2[1];
            _ = _basicGraphicalTests2[2];
            n = _basicGraphicalTests2[3];
            numDegrees = _basicGraphicalTests2[4];
            _context3.next = 17;
            break;

          case 10:
            _context3.prev = 10;
            _context3.t0 = _context3["catch"](0);

            if (!(
            /*istanbul ignore next*/
            _context3.t0 instanceof
            /*istanbul ignore next*/
            _exceptions.
            /*istanbul ignore next*/
            JSNetworkXUnfeasible)) {
              _context3.next = 16;
              break;
            }

            return _context3.abrupt("return", false);

          case 16:
            throw _context3.t0;

          case 17:
            if (!(n === 0 || 4 * minDegree * n >= Math.pow(maxDegree + minDegree + 1, 2))) {
              _context3.next = 19;
              break;
            }

            return _context3.abrupt("return", true);

          case 19:
            modstubs =
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _fillArray[
            /*istanbul ignore next*/
            "default"])(maxDegree + 1, 0); // successively reduce degree sequence by removing node of maximum degree

          case 20:
            if (!(n > 0)) {
              _context3.next = 32;
              break;
            }

            // Retrieve the maximum degree in the sequence
            while (numDegrees[maxDegree] === 0) {
              maxDegree -= 1;
            } // If there are not enough stubs to connect to, then the sequence is not
            // graphical


            if (!(maxDegree > n - 1)) {
              _context3.next = 24;
              break;
            }

            return _context3.abrupt("return", false);

          case 24:
            // Remove largest stub in list
            numDegrees[maxDegree] -= 1;
            n -= 1; // Reduce the next maxDegree largest stubs

            mslen = 0;
            k = maxDegree;

            for (
            /*istanbul ignore next*/
            i = 0; i < maxDegree; i++) {
              while (numDegrees[k] === 0) {
                k -= 1;
              }

              numDegrees[k] -= 1;
              n -= 1;

              if (k > 1) {
                modstubs[mslen] = k - 1;
                mslen += 1;
              }
            } // Add back to the list any non-zero stubs that were removed


            for (i = 0; i < mslen; i++) {
              /*istanbul ignore next*/
              stub = modstubs[i];
              numDegrees[stub] += 1;
              n += 1;
            }

            _context3.next = 20;
            break;

          case 32:
            return _context3.abrupt("return", true);

          case 33:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[0, 10]]);
  }));
  return _isValidDegreeSequenceHavelHakimi.apply(this, arguments);
}

/*istanbul ignore next*/
function isValidDegreeSequenceErdosGallai(_x5) {
  return _isValidDegreeSequenceErdosGallai.apply(this, arguments);
} // TODO: is_multigraphical
// TODO: is_pseudographical
// TODO: is_digraphical


/*istanbul ignore next*/
function _isValidDegreeSequenceErdosGallai() {
  _isValidDegreeSequenceErdosGallai = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee4(degreeSequence)
  /*istanbul ignore next*/
  {
    var maxDegree, minDegree, _, n, numDegrees, _basicGraphicalTests3, _basicGraphicalTests4, k, degreeSum, sumnj, sumjnj, dk, runSize, v;

    return regeneratorRuntime.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.prev = 0;
            _basicGraphicalTests3 = basicGraphicalTests(degreeSequence);
            _basicGraphicalTests4 = _slicedToArray(_basicGraphicalTests3, 5);
            maxDegree = _basicGraphicalTests4[0];
            minDegree = _basicGraphicalTests4[1];
            _ = _basicGraphicalTests4[2];
            n = _basicGraphicalTests4[3];
            numDegrees = _basicGraphicalTests4[4];
            _context4.next = 17;
            break;

          case 10:
            _context4.prev = 10;
            _context4.t0 = _context4["catch"](0);

            if (!(
            /*istanbul ignore next*/
            _context4.t0 instanceof
            /*istanbul ignore next*/
            _exceptions.
            /*istanbul ignore next*/
            JSNetworkXUnfeasible)) {
              _context4.next = 16;
              break;
            }

            return _context4.abrupt("return", false);

          case 16:
            throw _context4.t0;

          case 17:
            if (!(n === 0 || 4 * minDegree * n >= Math.pow(maxDegree + minDegree + 1, 2))) {
              _context4.next = 19;
              break;
            }

            return _context4.abrupt("return", true);

          case 19:
            // Perform the EG checks using the reformulation of Zverovich and Zverovich
            k = 0;
            degreeSum = 0;
            sumnj = 0;
            sumjnj = 0;
            dk = maxDegree;

          case 24:
            if (!(dk >= minDegree)) {
              _context4.next = 38;
              break;
            }

            if (!(dk < k + 1)) {
              _context4.next = 27;
              break;
            }

            return _context4.abrupt("return", true);

          case 27:
            if (!(numDegrees[dk] > 0)) {
              _context4.next = 35;
              break;
            }

            runSize = numDegrees[dk]; // Process a run of identical-valued degrees

            if (dk < k + runSize) {
              // Check if end of run is past Durfee index
              runSize = dk - k; // Adjust back to Durfee index
            }

            degreeSum += runSize * dk;

            for (
            /*istanbul ignore next*/
            v = 0; v < runSize; v++) {
              sumnj += numDegrees[k + v];
              sumjnj += (k + v) * numDegrees[k + v];
            }

            k += runSize;

            if (!(degreeSum > k * (n - 1) - k * sumnj + sumjnj)) {
              _context4.next = 35;
              break;
            }

            return _context4.abrupt("return", false);

          case 35:
            dk -= 1;
            _context4.next = 24;
            break;

          case 38:
            return _context4.abrupt("return", true);

          case 39:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4, null, [[0, 10]]);
  }));
  return _isValidDegreeSequenceErdosGallai.apply(this, arguments);
}