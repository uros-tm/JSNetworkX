/*istanbul ignore next*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testUnion = exports.testSymmetricDifference = exports.testSet = void 0;

var
/*istanbul ignore next*/
_Set = _interopRequireWildcard(require("../Set"));

/*istanbul ignore next*/ function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

/*global assert*/
var testSet = {
  testCreate: function
  /*istanbul ignore next*/
  testCreate() {
    var set = new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]();
    assert(set);
  },
  testAddElements: function
  /*istanbul ignore next*/
  testAddElements() {
    var set = new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]([1, 2, 3]);
    assert.deepEqual(Array.from(set.values()).sort(), [1, 2, 3]);
    set = new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]();
    set.add(1);
    set.add('4');
    assert(set.has(1));
    assert(set.has('4'));
  },
  testRemoveElements: function
  /*istanbul ignore next*/
  testRemoveElements() {
    var set = new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]([1, 2, 3]);
    set[
    /*istanbul ignore next*/
    "delete"](2);
    assert(!set.has(2));
    assert(set.has(1));
    assert(set.has(3));
  },
  testCount: function
  /*istanbul ignore next*/
  testCount() {
    var set = new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]([1, 2, 3]);
    assert.equal(set.size, 3);
  },
  difference: {
    'single argument - different set, same elements': function
    /*istanbul ignore next*/
    singleArgumentDifferentSetSameElements() {
      var set = new
      /*istanbul ignore next*/
      _Set[
      /*istanbul ignore next*/
      "default"]([1, 2, 3]);
      var diff = set.difference();
      assert.notEqual(diff, set);
      assert.deepEqual(diff, set);
    },
    'two arguments': function
    /*istanbul ignore next*/
    twoArguments() {
      var diff = new
      /*istanbul ignore next*/
      _Set[
      /*istanbul ignore next*/
      "default"]([1, 2, 3, 4]).difference(new
      /*istanbul ignore next*/
      _Set[
      /*istanbul ignore next*/
      "default"]([2, 4]));
      assert.deepEqual(diff, new
      /*istanbul ignore next*/
      _Set[
      /*istanbul ignore next*/
      "default"]([1, 3]));
    },
    'multiple arguments': function
    /*istanbul ignore next*/
    multipleArguments() {
      var diff = new
      /*istanbul ignore next*/
      _Set[
      /*istanbul ignore next*/
      "default"]([1, 2, 3, 4]).difference(new
      /*istanbul ignore next*/
      _Set[
      /*istanbul ignore next*/
      "default"]([2, 6]), new
      /*istanbul ignore next*/
      _Set[
      /*istanbul ignore next*/
      "default"]([4]));
      assert.deepEqual(diff, new
      /*istanbul ignore next*/
      _Set[
      /*istanbul ignore next*/
      "default"]([1, 3]));
    }
  },
  intersection: {
    'two arguments': function
    /*istanbul ignore next*/
    twoArguments() {
      var diff = new
      /*istanbul ignore next*/
      _Set[
      /*istanbul ignore next*/
      "default"]([1, 2, 3, 4]).intersection(new
      /*istanbul ignore next*/
      _Set[
      /*istanbul ignore next*/
      "default"]([2, 4]));
      assert.deepEqual(diff, new
      /*istanbul ignore next*/
      _Set[
      /*istanbul ignore next*/
      "default"]([2, 4]));
    },
    'multiple arguments': function
    /*istanbul ignore next*/
    multipleArguments() {
      var diff = new
      /*istanbul ignore next*/
      _Set[
      /*istanbul ignore next*/
      "default"]([1, 2, 3, 4]).intersection(new
      /*istanbul ignore next*/
      _Set[
      /*istanbul ignore next*/
      "default"]([2, 6]), new
      /*istanbul ignore next*/
      _Set[
      /*istanbul ignore next*/
      "default"]([2, 4]));
      assert.deepEqual(diff, new
      /*istanbul ignore next*/
      _Set[
      /*istanbul ignore next*/
      "default"]([2]));
    }
  }
};

/*istanbul ignore next*/
exports.testSet = testSet;
var testSymmetricDifference = {
  'empty set': function
  /*istanbul ignore next*/
  emptySet() {
    var full = new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]([1, 2, 3]);
    var empty = new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]();
    var result =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _Set.
    /*istanbul ignore next*/
    symmetricDifference)(full, empty);
    assert.deepEqual(result, full);
    assert.notEqual(result, full);
    result =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _Set.
    /*istanbul ignore next*/
    symmetricDifference)(empty, full);
    assert.deepEqual(result, full);
    assert.notEqual(result, full);
  },
  'sets with common elements': function
  /*istanbul ignore next*/
  setsWithCommonElements() {
    var a = new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]([1, 2, 3, 4]);
    var b = new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]([3, 4, 5, 6]);
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _Set.
    /*istanbul ignore next*/
    symmetricDifference)(a, b), new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]([1, 2, 5, 6]));
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _Set.
    /*istanbul ignore next*/
    symmetricDifference)(b, a), new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]([1, 2, 5, 6]));
  },
  'sets without common elements': function
  /*istanbul ignore next*/
  setsWithoutCommonElements() {
    var a = new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]([1, 2]);
    var b = new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]([3, 4]);
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _Set.
    /*istanbul ignore next*/
    symmetricDifference)(a, b), new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]([1, 2, 3, 4]));
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _Set.
    /*istanbul ignore next*/
    symmetricDifference)(b, a), new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]([1, 2, 3, 4]));
  }
};

/*istanbul ignore next*/
exports.testSymmetricDifference = testSymmetricDifference;
var testUnion = {
  'empty set': function
  /*istanbul ignore next*/
  emptySet() {
    var full = new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]([1, 2, 3]);
    var empty = new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]();
    var result =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _Set.
    /*istanbul ignore next*/
    union)(full, empty);
    assert.deepEqual(result, full);
    assert.notEqual(result, full);
    result =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _Set.
    /*istanbul ignore next*/
    union)(empty, full);
    assert.deepEqual(result, full);
    assert.notEqual(result, full);
  },
  'sets with common elements': function
  /*istanbul ignore next*/
  setsWithCommonElements() {
    var a = new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]([1, 2, 3, 4]);
    var b = new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]([3, 4, 5, 6]);
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _Set.
    /*istanbul ignore next*/
    union)(a, b), new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]([1, 2, 3, 4, 5, 6]));
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _Set.
    /*istanbul ignore next*/
    union)(b, a), new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]([1, 2, 3, 4, 5, 6]));
  },
  'sets without common elements': function
  /*istanbul ignore next*/
  setsWithoutCommonElements() {
    var a = new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]([1, 2]);
    var b = new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]([3, 4]);
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _Set.
    /*istanbul ignore next*/
    union)(a, b), new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]([1, 2, 3, 4]));
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _Set.
    /*istanbul ignore next*/
    union)(b, a), new
    /*istanbul ignore next*/
    _Set[
    /*istanbul ignore next*/
    "default"]([1, 2, 3, 4]));
  }
};

/*istanbul ignore next*/
exports.testUnion = testUnion;