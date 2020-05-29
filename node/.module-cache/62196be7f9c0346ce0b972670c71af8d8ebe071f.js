/*global assert */
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testForEach = void 0;

var
/*istanbul ignore next*/
_Map = _interopRequireDefault(require("../Map"));

var
/*istanbul ignore next*/
_forEach = _interopRequireDefault(require("../forEach"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _marked = /*#__PURE__*/regeneratorRuntime.mark(generator);

function generator(data)
/*istanbul ignore next*/
{
  var i;
  return regeneratorRuntime.wrap(function generator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          i = 0;

        case 1:
          if (!(i < data.length)) {
            _context.next = 7;
            break;
          }

          _context.next = 4;
          return data[i];

        case 4:
          i++;
          _context.next = 1;
          break;

        case 7:
        case "end":
          return _context.stop();
      }
    }
  }, _marked);
}

var testForEach = {
  'over arrays': function
  /*istanbul ignore next*/
  overArrays() {
    var data = [1, 2, 3];
    var counter = 0;

    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _forEach[
    /*istanbul ignore next*/
    "default"])(data, function (v) {
      assert.equal(v, data[counter++]);
    });
    assert.equal(counter, data.length, 'iterated over all data');
  },
  'over iterables (e.g. Maps)': function
  /*istanbul ignore next*/
  overIterablesEGMaps() {
    var data = [[1, 2], [2, 3]];
    var map = new
    /*istanbul ignore next*/
    _Map[
    /*istanbul ignore next*/
    "default"](data);
    var counter = 0;

    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _forEach[
    /*istanbul ignore next*/
    "default"])(map, function (kv) {
      assert.deepEqual(kv, data[counter++]);
    });
    assert.equal(counter, data.length, 'iterated over all data');
  },
  'over iterators (e.g. from a generator)': function
  /*istanbul ignore next*/
  overIteratorsEGFromAGenerator() {
    var data = [1, 2, 3];
    var iterator = generator(data);
    var counter = 0;

    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _forEach[
    /*istanbul ignore next*/
    "default"])(iterator, function (v) {
      assert.equal(v, data[counter++]);
    });
    assert.equal(counter, data.length, 'iterated over all data');
  },
  'over objects (iterates over keys)': function
  /*istanbul ignore next*/
  overObjectsIteratesOverKeys() {
    var data = {
      foo: 0,
      bar: 1
    };
    var result = [];

    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _forEach[
    /*istanbul ignore next*/
    "default"])(data, function (v, k) {
      result.push([k, v]);
    });
    assert.deepEqual(result, [['foo', 0], ['bar', 1]], 'iterated over all data');
  },
  // TODO
  'over graphs': false
};

/*istanbul ignore next*/
exports.testForEach = testForEach;