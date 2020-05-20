/**
 * @fileoverview
 * A "worker" node script for asynchronous methods. It accepts the method to
 * call and the arguments to pass from stdin and writes the result to stdout.
 *
 * Possible exit codes:
 *  - 0: Everything OK
 *  - 1: Computation produced an error
 *  - 2: Unable to deserialize input or serialize result
 */
'use strict';

var
/*istanbul ignore next*/
_message = require("./_internals/message");

var
/*istanbul ignore next*/
jsnx = _interopRequireWildcard(require("./"));

/*istanbul ignore next*/ function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {}; if (desc.get || desc.set) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } } newObj["default"] = obj; return newObj; } }

var input = '';
process.stdin.setEncoding('utf8');
process.stdin.resume();
process.stdin.on('data', function (chunk)
/*istanbul ignore next*/
{
  return input += chunk;
});
process.stdin.on('end', function () {
  var method;
  var args;
  var result;

  try {
    /*istanbul ignore next*/
    var _JSON$parse = JSON.parse(input);

    /*istanbul ignore next*/
    method = _JSON$parse.method;

    /*istanbul ignore next*/
    args = _JSON$parse.args;
    args = args.map(
    /*istanbul ignore next*/
    _message.
    /*istanbul ignore next*/
    deserialize);
  } catch (error) {
    exitWithError(2, error.message);
    return;
  }

  try {
    result = jsnx[method].apply(null, args);
  } catch (error) {
    exitWithError(1, error.message);
    return;
  }

  try {
    result = JSON.stringify({
      result:
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _message.
      /*istanbul ignore next*/
      serialize)(result)
    });
    process.stdout.write(result);
    process.exit(0);
  } catch (error) {
    exitWithError(2, error.message);
  }
});

function exitWithError(code, message) {
  process.stderr.write(message);
  process.exit(code);
}