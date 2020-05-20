/*istanbul ignore next*/
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = initializeBrowserWorker;

var
/*istanbul ignore next*/
_message = require("./_internals/message");

var
/*istanbul ignore next*/
_WorkerSettings = _interopRequireDefault(require("./WorkerSettings"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

/**
 * If this function is executed inside a Worker, it will listen to the
 * "message" event and use `WorkerSettings.methodLookupFunction` to get a
 * reference to the JSNetworkX method to executed.
 */
function initializeBrowserWorker() {
  if (!global.document) {
    // inside worker
    global.onmessage = function (event) {
      var args = event.data.args.map(
      /*istanbul ignore next*/
      _message.
      /*istanbul ignore next*/
      deserialize);

      var result =
      /*istanbul ignore next*/
      _WorkerSettings[
      /*istanbul ignore next*/
      "default"].methodLookupFunction(event.data.method).apply(null, args);

      global.postMessage(
      /*istanbul ignore next*/
      (0,
      /*istanbul ignore next*/
      _message.
      /*istanbul ignore next*/
      serialize)(result));
      global.close();
    };
  }
}