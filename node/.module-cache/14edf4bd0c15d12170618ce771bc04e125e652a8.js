/*global assert*/
'use strict';

/*istanbul ignore next*/ function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testIsomorph = void 0;

var
/*istanbul ignore next*/
_classes = require("../../../classes");

var
/*istanbul ignore next*/
iso = _interopRequireWildcard(require("../isomorph"));

/*istanbul ignore next*/ function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var testIsomorph = {
  beforeEach: function
  /*istanbul ignore next*/
  beforeEach() {
    this.G1 = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph();
    this.G2 = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph();
    this.G3 = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph();
    this.G4 = new
    /*istanbul ignore next*/
    _classes.
    /*istanbul ignore next*/
    Graph();
    this.G1.addEdgesFrom([[1, 2], [1, 3], [1, 5], [2, 3]]);
    this.G2.addEdgesFrom([[10, 20], [20, 30], [10, 30], [10, 50]]);
    this.G3.addEdgesFrom([[1, 2], [1, 3], [1, 5], [2, 5]]);
    this.G4.addEdgesFrom([[1, 2], [1, 3], [1, 5], [2, 4]]);
  },
  testCouldBeIsomorphic: function
  /*istanbul ignore next*/
  testCouldBeIsomorphic() {
    assert(iso.couldBeIsomorphic(this.G1, this.G2));
    assert(iso.couldBeIsomorphic(this.G1, this.G3));
    assert(!iso.couldBeIsomorphic(this.G1, this.G4));
    assert(iso.couldBeIsomorphic(this.G3, this.G2));
  },
  testFastCouldBeIsomorphic: function
  /*istanbul ignore next*/
  testFastCouldBeIsomorphic() {
    assert(iso.fastCouldBeIsomorphic(this.G3, this.G2));
  },
  testFasterCouldBeIsomorphic: function
  /*istanbul ignore next*/
  testFasterCouldBeIsomorphic() {
    assert(iso.fasterCouldBeIsomorphic(this.G3, this.G2));
  } // TODO

  /*
  testIsIsomorphic: function() {
    assert(iso.isIsomorphic(this.G1, this.G2));
    assert(iso.isIsomorphic(this.G1, this.G4));
  },
  */

};

/*istanbul ignore next*/
exports.testIsomorph = testIsomorph;