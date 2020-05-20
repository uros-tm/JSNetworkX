/*global assert, sinon */
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testDelegateSync = void 0;

var
/*istanbul ignore next*/
_delegateSync = _interopRequireDefault(require("../delegateSync"));

var
/*istanbul ignore next*/
_WorkerSettings = _interopRequireDefault(require("../../WorkerSettings"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var testDelegateSync = {
  beforeEach: function
  /*istanbul ignore next*/
  beforeEach() {
    /*istanbul ignore next*/
    var _this = this;

    this.testFunction = sinon.spy();

    /*istanbul ignore next*/
    _WorkerSettings[
    /*istanbul ignore next*/
    "default"].methodLookupFunction = function (name)
    /*istanbul ignore next*/
    {
      return _this[name];
    };
  },
  'it returns a promise': function
  /*istanbul ignore next*/
  itReturnsAPromise() {
    var promise =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _delegateSync[
    /*istanbul ignore next*/
    "default"])('testFunction');
    return assert.isFunction(promise.then);
  },
  'it passes the arguments to the delegated function': function
  /*istanbul ignore next*/
  itPassesTheArgumentsToTheDelegatedFunction(done) {
    /*istanbul ignore next*/
    var _this2 = this;

    var promise =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _delegateSync[
    /*istanbul ignore next*/
    "default"])('testFunction', ['foo', 'bar']);
    promise.then(function () {
      assert(_this2.testFunction.calledWith('foo', 'bar'));
      done();
    });
  },
  'it resolves to the return value of the delegated function': function
  /*istanbul ignore next*/
  itResolvesToTheReturnValueOfTheDelegatedFunction() {
    this.testFunction = function () {
      return 'foo';
    };

    var promise =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _delegateSync[
    /*istanbul ignore next*/
    "default"])('testFunction', ['foo', 'bar']);
    return assert.becomes(promise, 'foo');
  },
  'it rejects if the delegated function throws an error': function
  /*istanbul ignore next*/
  itRejectsIfTheDelegatedFunctionThrowsAnError() {
    this.testFunction = function () {
      throw new Error('some error');
    };

    var promise =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _delegateSync[
    /*istanbul ignore next*/
    "default"])('testFunction', ['foo', 'bar']);
    return assert.isRejected(promise, 'some error');
  }
};

/*istanbul ignore next*/
exports.testDelegateSync = testDelegateSync;