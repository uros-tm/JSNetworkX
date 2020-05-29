'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.eigenvectorCentrality = eigenvectorCentrality;

var
/*istanbul ignore next*/
_exceptions = require("../../exceptions");

var
/*istanbul ignore next*/
_internals = require("../../_internals");

/*istanbul ignore next*/ function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Compute the eigenvector centrality for `G`.
 *
 * Eigenvector centrality computes the centrality for a node based on the
 * centrality of its neighbors. The eigenvector centrality for node `i` is
 *
 * ```math
 * Ax = \lambda x
 * ```
 *
 * where `$A$` is the adjacency matrix of the graph `G` with eigenvalue
 * `$\lambda$`. By virtue of the Perron-Frobinus theorem, there is a unique and
 * positive solution if `$\lambda$` is the largest eigenvalue associated with
 * the eigenvector of the adjacency matrix `$A$`. ([2])
 *
 * ### Examples
 *
 * ```
 * var G = jsnx.pathGraph(4);
 * jsnx.eigenvectorCentrality(G);
 * // Map {0: 0.37, 1: 0.6, 2: 0.6, 3: 0.37}
 * ```
 *
 * ### Notes
 *
 * The measure was introduced by ([1][]).
 *
 * The eigenvector calculation is done by the power iteration method and has
 * no guarantee of convergence. The iteration will stop after `maxIter`
 * iterations or an error tolerance of `numberOfNodes(G) * tol` has been
 * reached.
 *
 * For directed graphs this is "left" eigenvector centrality which corresponds
 * to the in-edges in the graph. For out-edges eigenvector centrality
 * first reverse the graph with `G.reverse()`.
 *
 * ### References
 *
 * [1] [Phillip Bonacich:
 *     Power and Centrality: A Family of Measures.
 *     American Journal of Sociology 92(5):1170–1182, 1986](1)
 * [1]: http://www.leonidzhukov.net/hse/2014/socialnetworks/papers/Bonacich-Centrality.pdf
 * [2] Mark E. J. Newman:
 *     Networks: An Introduction.
 *     Oxford University Press, USA, 2010, pp. 169.
 *
 * @see pagerank
 * @see hits
 *
 * @param {Graph} G
 * @param {{maxIter: ?number, tolerance: ?number, nstart: ?Map, weight: ?string}} optParameters
 *   - maxIter: Maximum number of iterations in power method.
 *   - tolerance: Error tolerance used to check convergence in power method
 *     iteration.
 *   - nstart: Starting value of eigenvector iteration for each node.
 *   - weight: If not defined, all edge weights are considered equal. Otherwise
 *     holds the name of the edge attribute used as weight.
 * @return {Map} Map of nodes with eigenvector centrality as the value
 */
function eigenvectorCentrality(_x) {
  return _eigenvectorCentrality.apply(this, arguments);
} // not ported:
// eigenvectorCentralityNumpy


/*istanbul ignore next*/
function _eigenvectorCentrality() {
  _eigenvectorCentrality = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee(G)
  /*istanbul ignore next*/
  {
    var _ref,
        _ref$maxIter,
        maxIter,
        _ref$tolerance,
        tolerance,
        nstart,
        weight,
        sqrt,
        pow,
        abs,
        x,
        zeroMap,
        start,
        _iteratorNormalCompletion,
        _didIteratorError,
        _iteratorError,
        _iterator,
        _step,
        n,
        _iteratorNormalCompletion2,
        _didIteratorError2,
        _iteratorError2,
        _iterator2,
        _step2,
        _n,
        sum,
        _iteratorNormalCompletion3,
        _didIteratorError3,
        _iteratorError3,
        _iterator3,
        _step3,
        _v2,
        _iteratorNormalCompletion4,
        _didIteratorError4,
        _iteratorError4,
        _iterator4,
        _step4,
        _step4$value,
        k,
        _v3,
        i,
        xlast,
        _iteratorNormalCompletion5,
        _didIteratorError5,
        _iteratorError5,
        _iterator5,
        _step5,
        _step5$value,
        _n2,
        v,
        _iteratorNormalCompletion8,
        _didIteratorError8,
        _iteratorError8,
        _iterator8,
        _step8,
        _step8$value,
        nbr,
        data,
        _sum,
        _iteratorNormalCompletion6,
        _didIteratorError6,
        _iteratorError6,
        _iterator6,
        _step6,
        error,
        _iteratorNormalCompletion7,
        _didIteratorError7,
        _iteratorError7,
        _iterator7,
        _step7,
        _step7$value,
        _n3,
        _v,
        _args = arguments;

    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _ref = _args.length > 1 && _args[1] !== undefined ? _args[1] : {}, _ref$maxIter = _ref.maxIter, maxIter = _ref$maxIter === void 0 ? 100 : _ref$maxIter, _ref$tolerance = _ref.tolerance, tolerance = _ref$tolerance === void 0 ? 1e-6 : _ref$tolerance, nstart = _ref.nstart, weight = _ref.weight;
            sqrt = Math.sqrt;
            pow = Math.pow;
            abs = Math.abs;

            if (!G.isMultigraph()) {
              _context.next = 6;
              break;
            }

            throw new
            /*istanbul ignore next*/
            _exceptions.
            /*istanbul ignore next*/
            JSNetworkXException('Not defined for multigraphs.');

          case 6:
            if (!(G.order() === 0)) {
              _context.next = 8;
              break;
            }

            throw new
            /*istanbul ignore next*/
            _exceptions.
            /*istanbul ignore next*/
            JSNetworkXException('Empty graph.');

          case 8:
            zeroMap = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map();

            if (nstart) {
              _context.next = 33;
              break;
            }

            // choose starting vector with entries of 1/#G
            start = 1 / G.order();
            x = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map();
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _iteratorError = undefined;
            _context.prev = 15;

            for (
            /*istanbul ignore next*/
            _iterator = G[Symbol.iterator]();
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion = true) {
              /*istanbul ignore next*/
              n = _step.value;
              x.set(n, start);
              zeroMap.set(n, 0);
            }

            _context.next = 23;
            break;

          case 19:
            _context.prev = 19;
            _context.t0 = _context["catch"](15);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 23:
            _context.prev = 23;
            _context.prev = 24;

            if (!_iteratorNormalCompletion && _iterator["return"] != null) {
              _iterator["return"]();
            }

          case 26:
            _context.prev = 26;

            if (!_didIteratorError) {
              _context.next = 29;
              break;
            }

            throw _iteratorError;

          case 29:
            return _context.finish(26);

          case 30:
            return _context.finish(23);

          case 31:
            _context.next = 53;
            break;

          case 33:
            x = nstart;
            _iteratorNormalCompletion2 = true;
            _didIteratorError2 = false;
            _iteratorError2 = undefined;
            _context.prev = 37;

            for (
            /*istanbul ignore next*/
            _iterator2 = x.keys()[Symbol.iterator]();
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion2 = true) {
              /*istanbul ignore next*/
              _n = _step2.value;
              zeroMap.set(_n, 0);
            }

            _context.next = 45;
            break;

          case 41:
            _context.prev = 41;
            _context.t1 = _context["catch"](37);
            _didIteratorError2 = true;
            _iteratorError2 = _context.t1;

          case 45:
            _context.prev = 45;
            _context.prev = 46;

            if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
              _iterator2["return"]();
            }

          case 48:
            _context.prev = 48;

            if (!_didIteratorError2) {
              _context.next = 51;
              break;
            }

            throw _iteratorError2;

          case 51:
            return _context.finish(48);

          case 52:
            return _context.finish(45);

          case 53:
            // normalize starting vector
            sum = 0;
            _iteratorNormalCompletion3 = true;
            _didIteratorError3 = false;
            _iteratorError3 = undefined;
            _context.prev = 57;

            for (
            /*istanbul ignore next*/
            _iterator3 = x.values()[Symbol.iterator]();
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion3 = true) {
              /*istanbul ignore next*/
              _v2 = _step3.value;
              sum += _v2;
            }

            _context.next = 65;
            break;

          case 61:
            _context.prev = 61;
            _context.t2 = _context["catch"](57);
            _didIteratorError3 = true;
            _iteratorError3 = _context.t2;

          case 65:
            _context.prev = 65;
            _context.prev = 66;

            if (!_iteratorNormalCompletion3 && _iterator3["return"] != null) {
              _iterator3["return"]();
            }

          case 68:
            _context.prev = 68;

            if (!_didIteratorError3) {
              _context.next = 71;
              break;
            }

            throw _iteratorError3;

          case 71:
            return _context.finish(68);

          case 72:
            return _context.finish(65);

          case 73:
            sum = 1 / sum;
            _iteratorNormalCompletion4 = true;
            _didIteratorError4 = false;
            _iteratorError4 = undefined;
            _context.prev = 77;

            for (
            /*istanbul ignore next*/
            _iterator4 = x[Symbol.iterator]();
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion4 = true) {
              /*istanbul ignore next*/
              _step4$value = _slicedToArray(_step4.value, 2), k = _step4$value[0], _v3 = _step4$value[1];
              x.set(k, _v3 * sum);
            }

            _context.next = 85;
            break;

          case 81:
            _context.prev = 81;
            _context.t3 = _context["catch"](77);
            _didIteratorError4 = true;
            _iteratorError4 = _context.t3;

          case 85:
            _context.prev = 85;
            _context.prev = 86;

            if (!_iteratorNormalCompletion4 && _iterator4["return"] != null) {
              _iterator4["return"]();
            }

          case 88:
            _context.prev = 88;

            if (!_didIteratorError4) {
              _context.next = 91;
              break;
            }

            throw _iteratorError4;

          case 91:
            return _context.finish(88);

          case 92:
            return _context.finish(85);

          case 93:
            tolerance = G.order() * tolerance; // make up to maxIter iterations

            i = 0;

          case 95:
            if (!(i < maxIter)) {
              _context.next = 188;
              break;
            }

            xlast = x;
            x = new
            /*istanbul ignore next*/
            _internals.
            /*istanbul ignore next*/
            Map(zeroMap); // do the multiplication y^T = x^T A

            _iteratorNormalCompletion5 = true;
            _didIteratorError5 = false;
            _iteratorError5 = undefined;
            _context.prev = 101;
            _iterator5 = x[Symbol.iterator]();

          case 103:
            if (_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done) {
              _context.next = 127;
              break;
            }

            _step5$value = _slicedToArray(_step5.value, 2), _n2 = _step5$value[0], v = _step5$value[1];
            _iteratorNormalCompletion8 = true;
            _didIteratorError8 = false;
            _iteratorError8 = undefined;
            _context.prev = 108;

            for (
            /*istanbul ignore next*/
            _iterator8 = G.get(_n2)[Symbol.iterator]();
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion8 = (_step8 = _iterator8.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion8 = true) {
              /*istanbul ignore next*/
              _step8$value = _slicedToArray(_step8.value, 2), nbr = _step8$value[0], data = _step8$value[1];
              x.set(nbr, x.get(nbr) + xlast.get(_n2) *
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _internals.
              /*istanbul ignore next*/
              getDefault)(weight && data[weight], 1));
            }

            _context.next = 116;
            break;

          case 112:
            _context.prev = 112;
            _context.t4 = _context["catch"](108);
            _didIteratorError8 = true;
            _iteratorError8 = _context.t4;

          case 116:
            _context.prev = 116;
            _context.prev = 117;

            if (!_iteratorNormalCompletion8 && _iterator8["return"] != null) {
              _iterator8["return"]();
            }

          case 119:
            _context.prev = 119;

            if (!_didIteratorError8) {
              _context.next = 122;
              break;
            }

            throw _iteratorError8;

          case 122:
            return _context.finish(119);

          case 123:
            return _context.finish(116);

          case 124:
            _iteratorNormalCompletion5 = true;
            _context.next = 103;
            break;

          case 127:
            _context.next = 133;
            break;

          case 129:
            _context.prev = 129;
            _context.t5 = _context["catch"](101);
            _didIteratorError5 = true;
            _iteratorError5 = _context.t5;

          case 133:
            _context.prev = 133;
            _context.prev = 134;

            if (!_iteratorNormalCompletion5 && _iterator5["return"] != null) {
              _iterator5["return"]();
            }

          case 136:
            _context.prev = 136;

            if (!_didIteratorError5) {
              _context.next = 139;
              break;
            }

            throw _iteratorError5;

          case 139:
            return _context.finish(136);

          case 140:
            return _context.finish(133);

          case 141:
            // normalize vector
            _sum = 0;
            _iteratorNormalCompletion6 = true;
            _didIteratorError6 = false;
            _iteratorError6 = undefined;
            _context.prev = 145;

            for (
            /*istanbul ignore next*/
            _iterator6 = x.values()[Symbol.iterator]();
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion6 = true) {
              /*istanbul ignore next*/
              v = _step6.value;
              _sum += pow(v, 2);
            }

            _context.next = 153;
            break;

          case 149:
            _context.prev = 149;
            _context.t6 = _context["catch"](145);
            _didIteratorError6 = true;
            _iteratorError6 = _context.t6;

          case 153:
            _context.prev = 153;
            _context.prev = 154;

            if (!_iteratorNormalCompletion6 && _iterator6["return"] != null) {
              _iterator6["return"]();
            }

          case 156:
            _context.prev = 156;

            if (!_didIteratorError6) {
              _context.next = 159;
              break;
            }

            throw _iteratorError6;

          case 159:
            return _context.finish(156);

          case 160:
            return _context.finish(153);

          case 161:
            _sum = sqrt(_sum); // this should never be zero?

            _sum = _sum === 0 ? 1 : 1 / _sum;
            error = 0;
            _iteratorNormalCompletion7 = true;
            _didIteratorError7 = false;
            _iteratorError7 = undefined;
            _context.prev = 167;

            for (
            /*istanbul ignore next*/
            _iterator7 = x[Symbol.iterator]();
            /*istanbul ignore next*/
            !(_iteratorNormalCompletion7 = (_step7 = _iterator7.next()).done);
            /*istanbul ignore next*/
            _iteratorNormalCompletion7 = true) {
              /*istanbul ignore next*/
              _step7$value = _slicedToArray(_step7.value, 2), _n3 = _step7$value[0], _v = _step7$value[1];
              _v = _v * _sum;
              x.set(_n3, _v); // check error convergence

              error += abs(_v - xlast.get(_n3));
            }

            _context.next = 175;
            break;

          case 171:
            _context.prev = 171;
            _context.t7 = _context["catch"](167);
            _didIteratorError7 = true;
            _iteratorError7 = _context.t7;

          case 175:
            _context.prev = 175;
            _context.prev = 176;

            if (!_iteratorNormalCompletion7 && _iterator7["return"] != null) {
              _iterator7["return"]();
            }

          case 178:
            _context.prev = 178;

            if (!_didIteratorError7) {
              _context.next = 181;
              break;
            }

            throw _iteratorError7;

          case 181:
            return _context.finish(178);

          case 182:
            return _context.finish(175);

          case 183:
            if (!(error < tolerance)) {
              _context.next = 185;
              break;
            }

            return _context.abrupt("return", x);

          case 185:
            i++;
            _context.next = 95;
            break;

          case 188:
            throw new
            /*istanbul ignore next*/
            _exceptions.
            /*istanbul ignore next*/
            JSNetworkXError('eigenvectorCentrality(): power iteration failed to converge in ' +
            /*istanbul ignore next*/
            "".concat(maxIter, " iterations."));

          case 189:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[15, 19, 23, 31], [24,, 26, 30], [37, 41, 45, 53], [46,, 48, 52], [57, 61, 65, 73], [66,, 68, 72], [77, 81, 85, 93], [86,, 88, 92], [101, 129, 133, 141], [108, 112, 116, 124], [117,, 119, 123], [134,, 136, 140], [145, 149, 153, 161], [154,, 156, 160], [167, 171, 175, 183], [176,, 178, 182]]);
  }));
  return _eigenvectorCentrality.apply(this, arguments);
}