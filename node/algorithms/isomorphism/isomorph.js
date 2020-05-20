'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.couldBeIsomorphic = couldBeIsomorphic;
exports.fastCouldBeIsomorphic = fastCouldBeIsomorphic;
exports.fasterCouldBeIsomorphic = fasterCouldBeIsomorphic;

var
/*istanbul ignore next*/
_clique = require("../clique");

var
/*istanbul ignore next*/
_cluster = require("../cluster");

/*istanbul ignore next*/ function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

/**
 * Returns `false` if graphs are definitely not isomorphic.
 * `true` does **not** guarantee isomorphism.
 *
 * Checks for matching degree, triangle, and number of cliques sequences.
 *
 * @param {!Graph} G1
 * @param {!Graph} G2
 * @return {boolean}  `false` if graphs are definitely not isomorphic.
 */
function couldBeIsomorphic(_x, _x2) {
  return _couldBeIsomorphic.apply(this, arguments);
}
/**
 * Returns `false` if graphs are definitely not isomorphic.
 * `true` does **not** guarantee isomorphism.
 *
 * Checks for matching degree and triangle sequences.
 *
 * @param {!Graph} G1
 * @param {!Graph} G2
 * @return {boolean}  `false` if graphs are definitely not isomorphic.
 */


/*istanbul ignore next*/
function _couldBeIsomorphic() {
  _couldBeIsomorphic = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee(G1, G2)
  /*istanbul ignore next*/
  {
    var degree1, triangles1, cliques1, props1, degree2, triangles2, cliques2, props2;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!(G1.order() !== G2.order())) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", false);

          case 2:
            // Check local properties
            degree1 = G1.degree();
            _context.next = 5;
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _cluster.
              /*istanbul ignore next*/
              triangles)(G1)
            );

          case 5:
            triangles1 = _context.sent;
            _context.next = 8;
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _clique.
              /*istanbul ignore next*/
              numberOfCliques)(G1)
            );

          case 8:
            cliques1 = _context.sent;
            props1 = [];
            degree1.forEach(function (_, v) {
              props1.push([degree1.get(v), triangles1.get(v), cliques1.get(v)]);
            });
            props1.sort(function (a, b)
            /*istanbul ignore next*/
            {
              return a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
            });
            degree2 = G2.degree();
            _context.next = 15;
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _cluster.
              /*istanbul ignore next*/
              triangles)(G2)
            );

          case 15:
            triangles2 = _context.sent;
            _context.next = 18;
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _clique.
              /*istanbul ignore next*/
              numberOfCliques)(G2)
            );

          case 18:
            cliques2 = _context.sent;
            props2 = [];
            degree2.forEach(function (_, v) {
              props2.push([degree2.get(v), triangles2.get(v), cliques2.get(v)]);
            });
            props2.sort(function (a, b)
            /*istanbul ignore next*/
            {
              return a[0] - b[0] || a[1] - b[1] || a[2] - b[2];
            });
            return _context.abrupt("return", props1.every(function (a, i) {
              var b = props2[i];
              return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
            }));

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _couldBeIsomorphic.apply(this, arguments);
}

/*istanbul ignore next*/
function fastCouldBeIsomorphic(_x3, _x4) {
  return _fastCouldBeIsomorphic.apply(this, arguments);
}
/**
 * Returns `false` if graphs are definitely not isomorphic.
 * `true` does **not** guarantee isomorphism.
 *
 * Checks for matching degree sequences.
 *
 * @param {!Graph} G1
 * @param {!Graph} G2
 *
 * @return {boolean}  False if graphs are definitely not isomorphic.
 *
 * @export
 */


/*istanbul ignore next*/
function _fastCouldBeIsomorphic() {
  _fastCouldBeIsomorphic = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee2(G1, G2)
  /*istanbul ignore next*/
  {
    var degree1, triangles1, props1, degree2, triangles2, props2;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!(G1.order() !== G2.order())) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return", false);

          case 2:
            // Check local properties
            degree1 = G1.degree();
            _context2.next = 5;
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _cluster.
              /*istanbul ignore next*/
              triangles)(G1)
            );

          case 5:
            triangles1 = _context2.sent;
            props1 = [];
            degree1.forEach(function (_, v) {
              props1.push([degree1.get(v), triangles1.get(v)]);
            });
            props1.sort(function (a, b)
            /*istanbul ignore next*/
            {
              return a[0] - b[0] || a[1] - b[1];
            });
            degree2 = G2.degree();
            _context2.next = 12;
            return (
              /*istanbul ignore next*/
              (0,
              /*istanbul ignore next*/
              _cluster.
              /*istanbul ignore next*/
              triangles)(G2)
            );

          case 12:
            triangles2 = _context2.sent;
            props2 = [];
            degree2.forEach(function (_, v) {
              props2.push([degree2.get(v), triangles2.get(v)]);
            });
            props2.sort(function (a, b)
            /*istanbul ignore next*/
            {
              return a[0] - b[0] || a[1] - b[1];
            });
            return _context2.abrupt("return", props1.every(function (a, i) {
              var b = props2[i];
              return a[0] === b[0] && a[1] === b[1];
            }));

          case 17:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _fastCouldBeIsomorphic.apply(this, arguments);
}

/*istanbul ignore next*/
function fasterCouldBeIsomorphic(_x5, _x6) {
  return _fasterCouldBeIsomorphic.apply(this, arguments);
} //TODO: is_isomorphic


/*istanbul ignore next*/
function _fasterCouldBeIsomorphic() {
  _fasterCouldBeIsomorphic = _asyncToGenerator(
  /*#__PURE__*/
  regeneratorRuntime.mark(function
  /*istanbul ignore next*/
  _callee3(G1, G2)
  /*istanbul ignore next*/
  {
    var degree1, degree2;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            if (!(G1.order() !== G2.order())) {
              _context3.next = 2;
              break;
            }

            return _context3.abrupt("return", false);

          case 2:
            // Check local properties
            degree1 = Array.from(G1.degree().values());
            degree1.sort(function (a, b)
            /*istanbul ignore next*/
            {
              return a - b;
            });
            degree2 = Array.from(G2.degree().values());
            degree2.sort(function (a, b)
            /*istanbul ignore next*/
            {
              return a - b;
            });
            return _context3.abrupt("return", degree1.every(function (v, i)
            /*istanbul ignore next*/
            {
              return v === degree2[i];
            }));

          case 7:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _fasterCouldBeIsomorphic.apply(this, arguments);
}