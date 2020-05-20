/*eslint camelcase:0*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = delegate;

var
/*istanbul ignore next*/
_path = _interopRequireDefault(require("path"));

var
/*istanbul ignore next*/
_child_process = _interopRequireDefault(require("child_process"));

var
/*istanbul ignore next*/
_message = require("./message");

var
/*istanbul ignore next*/
_delegateSync = _interopRequireDefault(require("./delegateSync"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function delegateToChildProcess(method, args) {
  return new Promise(function (resolve, reject) {
    var response = '';
    var error = '';

    var child =
    /*istanbul ignore next*/
    _child_process[
    /*istanbul ignore next*/
    "default"].spawn(process.execPath, [
    /*istanbul ignore next*/
    _path[
    /*istanbul ignore next*/
    "default"].join(__dirname, '../worker.js')]);

    child.stdout.on('data', function (data)
    /*istanbul ignore next*/
    {
      return response += data;
    });
    child.stderr.on('data', function (data)
    /*istanbul ignore next*/
    {
      return error += data;
    });
    child.on('close', function () {
      if (error) {
        reject(new Error(error));
      } else {
        resolve(JSON.parse(response));
      }
    });
    child.stdin.write(JSON.stringify({
      method: method,
      args: args
    }));
    child.stdin.end();
  });
}
/**
 * DON'T CALL THIS FUNCTION EXPLICITLY. It's inserted by a transform.
 *
 * Eventually this will spawn another thread and run the computation there.
 *
 * @param {string} method The name on the root jsnx object to execute.
 * @param {Array} args An array of arguments to send to the worker.
 *    Some types, such as graphs, are converted to a different format first.
 * @return {Promise}
 */


function delegate(method, args) {
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

  return delegateToChildProcess(method, serializedValues).then(function (response)
  /*istanbul ignore next*/
  {
    return (
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _message.
      /*istanbul ignore next*/
      deserialize)(response.result)
    );
  });
}