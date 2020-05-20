'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.havelHakimiGraph = havelHakimiGraph;

var
/*istanbul ignore next*/
_JSNetworkXError = _interopRequireDefault(require("../exceptions/JSNetworkXError"));

var
/*istanbul ignore next*/
_graphical = require("../algorithms/graphical");

var
/*istanbul ignore next*/
_classic = require("./classic");

var
/*istanbul ignore next*/
_sprintf = _interopRequireDefault(require("../_internals/sprintf"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

// TODO: configuration_model
// TODO: directed_configuration_model
// TODO: expected_degree_graph

/**
 * Return a simple graph with given degree sequence constructed
 * using the Havel-Hakimi algorithm.
 *
 * ### Notes
 *
 * The Havel-Hakimi algorithm constructs a simple graph by
 * successively connecting the node of highest degree to other nodes
 * of highest degree, resorting remaining nodes by degree, and
 * repeating the process. The resulting graph has a high
 * degree-associativity. Nodes are labeled `1,.., degreeSequence.length`,
 * corresponding to their position in `degreeSequence`.
 *
 * The basic algorithm is from Hakimi (1) and was generalized by
 * Kleitman and Wang (2).
 *
 * ### References
 *
 * [1] Hakimi S.,
 *   On Realizability of a Set of Integers as Degrees of the
 *   Vertices of a linear Graph. I,
 *   Journal of SIAM, 10(3), pp. 496-506 (1962)
 * [2] Kleitman D.J. and Wang D.L.
 *   Algorithms for Constructing Graphs and Digraphs with Given Valences and
 *   Factors,
 *   Discrete Mathematics, 6(1), pp. 79-88 (1973)
 *
 * @param {Iterable} degreeSequence list of integers
 *      Each integer corresponds to the degree of a node (need not be sorted).
 * @param {Graph} optCreateUsing
 *      Return graph of this type. The instance will be cleared.
 *      Directed graphs are not allowed.
 * @return {Graph}
 */
function havelHakimiGraph(_x, _x2) {
  return _havelHakimiGraph.apply(this, arguments);
} // TODO: directed_havel_hakimi_graph
// TODO: degree_sequence_tree
// TODO: random_degree_sequence_graph
// TODO: DegreeSequenceRandomGraph


/*istanbul ignore next*/
function _havelHakimiGraph() {
  _havelHakimiGraph = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee(degreeSequence, optCreateUsing)
  /*istanbul ignore next*/
  {
    var numberOfNodes, G, numDegrees, i, maxDegree, degreeSum, n, degree, modstubs, source, mslen, k, target, _modstubs$i, stubval, stubtarget;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            degreeSequence = Array.from(degreeSequence);
            _context.next = 3;
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _graphical.
              /*istanbul ignore next*/
              isValidDegreeSequence)(degreeSequence)
            );

          case 3:
            if (_context.sent) {
              _context.next = 5;
              break;
            }

            throw new
            /*istanbul ignore next*/
            _JSNetworkXError[
            /*istanbul ignore next*/
            "default"]('Invalid degree sequence');

          case 5:
            if (!(optCreateUsing != null)) {
              _context.next = 8;
              break;
            }

            if (!optCreateUsing.isDirected()) {
              _context.next = 8;
              break;
            }

            throw new
            /*istanbul ignore next*/
            _JSNetworkXError[
            /*istanbul ignore next*/
            "default"]('Directed Graph not supported');

          case 8:
            numberOfNodes = degreeSequence.length;
            G =
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _classic.
            /*istanbul ignore next*/
            emptyGraph)(numberOfNodes, optCreateUsing);
            numDegrees = new Array(numberOfNodes);

            for (
            /*istanbul ignore next*/
            i = 0; i < numberOfNodes; i++) {
              numDegrees[i] = [];
            }

            maxDegree = 0;
            degreeSum = 0;
            n = 0;

            for (i = 0; i < numberOfNodes; i++) {
              /*istanbul ignore next*/
              degree = degreeSequence[i]; // process only the non-zero integers

              if (degree > 0) {
                numDegrees[degree].push(n);
                maxDegree = Math.max(maxDegree, degree);
                degreeSum += degree;
                n += 1;
              }
            } // Return graph if no edges


            if (!(n === 0)) {
              _context.next = 18;
              break;
            }

            return _context.abrupt("return", G);

          case 18:
            // form list of [stubs,name] for each node.
            modstubs = new Array(maxDegree + 1);

            for (i = 0; i < maxDegree + 1; i++) {
              modstubs[i] = [0, 0];
            } // Successively reduce degree sequence by removing the maximum degree


          case 20:
            if (!(n > 0)) {
              _context.next = 32;
              break;
            }

            // Retrieve the maximum degree in the sequence
            while (numDegrees[maxDegree].length === 0) {
              maxDegree -= 1;
            } // If there are not enough stubs to connect to, then the sequence is not
            // graphical


            if (!(maxDegree > n - 1)) {
              _context.next = 24;
              break;
            }

            throw new
            /*istanbul ignore next*/
            _JSNetworkXError[
            /*istanbul ignore next*/
            "default"]('Non-graphical integer sequence');

          case 24:
            // Remove largest stub in list
            source = numDegrees[maxDegree].pop();
            n -= 1; // Reduce the next maxDegree largest stubs

            mslen = 0;
            k = maxDegree;

            for (i = 0; i < maxDegree; i++) {
              while (numDegrees[k].length === 0) {
                k -= 1;
              }

              /*istanbul ignore next*/
              target = numDegrees[k].pop();
              G.addEdge(source, target);
              n -= 1;

              if (k > 1) {
                modstubs[mslen] = [k - 1, target];
                mslen += 1;
              }
            } // Add back to the list any nonzero stubs that were removed


            for (i = 0; i < mslen; i++) {
              /*istanbul ignore next*/
              _modstubs$i = _slicedToArray(modstubs[i], 2), stubval = _modstubs$i[0], stubtarget = _modstubs$i[1];
              numDegrees[stubval].push(stubtarget);
              n += 1;
            }

            _context.next = 20;
            break;

          case 32:
            G.name =
            /*istanbul ignore next*/
            (0,
            /*istanbul ignore next*/
            _sprintf[
            /*istanbul ignore next*/
            "default"])('havelHakimiGraph %s nodes %d edges', G.order(), G.size());
            return _context.abrupt("return", G);

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _havelHakimiGraph.apply(this, arguments);
}