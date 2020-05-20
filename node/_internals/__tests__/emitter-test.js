/*global assert*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testEmitter = void 0;

var
/*istanbul ignore next*/
_emitter = _interopRequireDefault(require("../emitter"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function onHelper(obj, type, callback) {
  var resolve;
  var promise = new Promise(function (res) {
    resolve = res;
  });
  obj.on(type, function (x)
  /*istanbul ignore next*/
  {
    return callback && callback(x), resolve(x);
  });
  return promise;
}

var testEmitter = {
  API: function
  /*istanbul ignore next*/
  API() {
    var ee =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _emitter[
    /*istanbul ignore next*/
    "default"])();
    assert.isFunction(ee.on);
    assert.isFunction(ee.off);
    assert.isFunction(ee.emit);
    var obj = {};
    var emit =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _emitter[
    /*istanbul ignore next*/
    "default"])(obj);
    assert.isFunction(emit);
    assert.isFunction(obj.on);
    assert.isFunction(obj.off);
  },
  'on/emit': function
  /*istanbul ignore next*/
  onEmit() {
    var obj = {};
    var emit =
    /*istanbul ignore next*/
    (0,
    /*istanbul ignore next*/
    _emitter[
    /*istanbul ignore next*/
    "default"])(obj);
    var promises = [];
    promises.push(assert.becomes(onHelper(obj, 'foo'), 'bar'));
    emit('foo', 'bar');
    promises.push(assert.becomes(onHelper(obj, 'bar'), 'abc'));
    promises.push(assert.becomes(onHelper(obj, 'bar'), 'abc'));
    emit('bar', 'abc');
    return Promise.all(promises);
  }
};

/*istanbul ignore next*/
exports.testEmitter = testEmitter;