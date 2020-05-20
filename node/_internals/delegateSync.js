'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = delegateSync;

var
/*istanbul ignore next*/
_WorkerSettings = _interopRequireDefault(require("../WorkerSettings"));

var
/*istanbul ignore next*/
_isIterator = _interopRequireDefault(require("./isIterator"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * DON'T CALL THIS FUNCTION EXPLICITLY. It's inserted by a transform.
 *
 * In environments that does not support workers, we are using this synchronous
 * version.
 *
 * @param {string} method The name on the root jsnx object to execute.
 * @param {Array} args An array of arguments to send to the worker.
 *    Some types, such as graphs, are converted to a different format first.
 * @return {Promise}
 */
function delegateSync(method, args) {
  return new Promise(function (resolve, reject) {
    try {
      // We have to do the same here as we do in the worker, which is
      // returning an array if we get back an iterator
      var result =
      /*istanbul ignore next*/
      _WorkerSettings[
      /*istanbul ignore next*/
      "default"].methodLookupFunction(method).apply(null, args);

      if (
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _isIterator[
      /*istanbul ignore next*/
      "default"])(result)) {
        result = Array.from(result);
      }

      resolve(result);
    } catch (ex) {
      reject(ex);
    }
  });
}