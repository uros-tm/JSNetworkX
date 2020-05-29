/*global assert*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testMapSequence = void 0;

var
/*istanbul ignore next*/
_mapSequence = _interopRequireDefault(require("../mapSequence"));

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

var testMapSequence = {
  'from array': function
  /*istanbul ignore next*/
  fromArray() {
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _mapSequence[
    /*istanbul ignore next*/
    "default"])([1, 2, 3], function (x)
    /*istanbul ignore next*/
    {
      return x * 3;
    }), [3, 6, 9]);
  },
  'from array-like': function
  /*istanbul ignore next*/
  fromArrayLike() {
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _mapSequence[
    /*istanbul ignore next*/
    "default"])({
      0: 1,
      1: 2,
      2: 3,
      length: 3
    }, function (x)
    /*istanbul ignore next*/
    {
      return x * 3;
    }), [3, 6, 9]);
  },
  'from iterator': function
  /*istanbul ignore next*/
  fromIterator() {
    var iterator =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _mapSequence[
    /*istanbul ignore next*/
    "default"])(generator([1, 2, 3]), function (x)
    /*istanbul ignore next*/
    {
      return x * 3;
    });
    var result = [];

    /*istanbul ignore next*/
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (
      /*istanbul ignore next*/
      var _iterator = iterator[Symbol.iterator](), _step;
      /*istanbul ignore next*/
      !(_iteratorNormalCompletion = (_step = _iterator.next()).done);
      /*istanbul ignore next*/
      _iteratorNormalCompletion = true) {
        /*istanbul ignore next*/
        var v = _step.value;
        result.push(v);
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator["return"] != null) {
          _iterator["return"]();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    assert.deepEqual(result, [3, 6, 9]);
  },
  'from object': function
  /*istanbul ignore next*/
  fromObject() {
    assert.deepEqual(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _mapSequence[
    /*istanbul ignore next*/
    "default"])({
      foo: 1,
      bar: 2
    }, function (x)
    /*istanbul ignore next*/
    {
      return x * 3;
    }), {
      foo: 3,
      bar: 6
    });
  }
};

/*istanbul ignore next*/
exports.testMapSequence = testMapSequence;