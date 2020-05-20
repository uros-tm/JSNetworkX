'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = delegateToWorker;

var
/*istanbul ignore next*/
_Worker = _interopRequireDefault(require("./Worker"));

var
/*istanbul ignore next*/
_WorkerSettings = _interopRequireDefault(require("../WorkerSettings"));

var
/*istanbul ignore next*/
_delegateSync = _interopRequireDefault(require("./delegateSync"));

var
/*istanbul ignore next*/
_message = require("./message");

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var delegateImplementation;

if (typeof
/*istanbul ignore next*/
_Worker[
/*istanbul ignore next*/
"default"] === 'function') {
  // Workers are supported
  delegateImplementation = function
  /*istanbul ignore next*/
  delegateImplementation(method, args) {
    /*istanbul ignore next*/
    var _serializeAll =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _message.
    /*istanbul ignore next*/
    serializeAll)(args),
        serializable = _serializeAll.serializable,
        serializedValues = _serializeAll.serializedValues;

    if (!serializable) {
      console.info('At least one argument can\'t be serialized and sent to the worker. ' +
      /*istanbul ignore next*/
      "We will run ".concat(method, " in the same thread instead."));
      return (
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _delegateSync[
        /*istanbul ignore next*/
        "default"])(method, args)
      );
    }

    return new Promise(function (resolve, reject) {
      var worker = new
      /*istanbul ignore next*/
      _Worker[
      /*istanbul ignore next*/
      "default"](
      /*istanbul ignore next*/
      _WorkerSettings[
      /*istanbul ignore next*/
      "default"].workerPath);
      worker.addEventListener('message', function (oEvent)
      /*istanbul ignore next*/
      {
        return resolve(
        /*istanbul ignore next*/
        (0,
        /*istanbul ignore next*/
        _message.
        /*istanbul ignore next*/
        deserialize)(oEvent.data));
      }, false);
      worker.addEventListener('error', reject, false);
      worker.postMessage({
        method: method,
        args: serializedValues
      });
    });
  };
} else {
  delegateImplementation = function
  /*istanbul ignore next*/
  delegateImplementation(method, args) {
    console.info(
    /*istanbul ignore next*/
    "Workers are not supported in this environment, so \"".concat(method, "\" will ") + 'run in the same thread instead. This might block the environment.');
    return (
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _delegateSync[
      /*istanbul ignore next*/
      "default"])(method, args)
    );
  };
}
/**
 * DON'T CALL THIS FUNCTION EXPLICITLY. It's inserted by a transform.
 *
 * Tries to create a worker and pass the arguments to it. Copying large graphs
 * is not very fast, but still faster than running most algorithms
 * synchronously.
 *
 * Falls back to synchronous execution if browser doesn't support workers.
 *
 * This returns a promise which gets resolved with the result sent from the
 * worker or the synchronous functions.
 *
 * @param {string} method The name on the root jsnx object to execute.
 * @param {Array} args An array of arguments to send to the worker.
 *    Some types, such as graphs, are converted to a different format first.
 * @return {Promise}
 */


function delegateToWorker(method, args) {
  return delegateImplementation(method, args);
}