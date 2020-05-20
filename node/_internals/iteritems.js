'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = iteritems;

var
/*istanbul ignore next*/
_items = _interopRequireDefault(require("./items"));

var
/*istanbul ignore next*/
_toIterator = _interopRequireDefault(require("./toIterator"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * Returns an iterator of [key, value] pairs for the given object (just like
 * Python's dict.iteritems()).
 *
 * @param {Object} obj
 * @return {!Array}
 */
function iteritems(obj) {
  return (
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _toIterator[
    /*istanbul ignore next*/
    "default"])(
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _items[
    /*istanbul ignore next*/
    "default"])(obj))
  );
}