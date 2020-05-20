'use strict';
/**
 * Implements a simple event emitter to be merged into other objects.
 *
 * Usage:
 *
 * var e = require('./emitter');
 * var emit = e(someObject);
 *
 * // somewhere else
 * someObject.on('foo', x => console.log(x));
 *
 * // here
 * emit('foo', 'bar');
 */

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = _default;

function
/*istanbul ignore next*/
_default(obj) {
  var listeners = Object.create(null);

  function on(type, listener, thisObj) {
    var typeListeners = listeners[type] || (listeners[type] = []);
    typeListeners.push(listener, thisObj);
  }

  function off(type, listener) {
    var typeListeners = listeners[type];

    if (!typeListeners) {
      return;
    }

    if (!listener) {
      typeListeners.length = 0;
      return;
    }

    for (var i = 0; i < typeListeners.length; i += 2) {
      if (typeListeners[i] === listener) {
        typeListeners.splice(i, 2);
        break;
      }
    }
  }

  function emit(type, msg) {
    var typeListeners = listeners[type];

    if (!typeListeners) {
      return;
    }

    var i = 0;
    Promise.resolve(msg).then(function cb(msg) {
      //eslint-disable-line no-shadow
      typeListeners[i].call(typeListeners[i + 1], msg);
      i += 2;

      if (i < typeListeners.length) {
        return Promise.resolve(msg).then(cb);
      }
    });
  }

  if (obj) {
    Object.assign(obj, {
      on: on,
      off: off
    });
    return emit;
  }

  return {
    on: on,
    off: off,
    emit: emit
  };
}