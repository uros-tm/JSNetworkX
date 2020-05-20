/*global assert*/
'use strict';

/*istanbul ignore next*/
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.testPriorityQueue = void 0;

var
/*istanbul ignore next*/
_PriorityQueue = _interopRequireDefault(require("../PriorityQueue"));

/*istanbul ignore next*/ function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var testPriorityQueue = {
  constructor: function
  /*istanbul ignore next*/
  constructor() {
    var queue = new
    /*istanbul ignore next*/
    _PriorityQueue[
    /*istanbul ignore next*/
    "default"]();
    assert.equal(queue.size, 0);
    queue = new
    /*istanbul ignore next*/
    _PriorityQueue[
    /*istanbul ignore next*/
    "default"]([[3, 42], [10, 21], [1, 10]]);
    assert.equal(queue.size, 3);
  },
  queue: function
  /*istanbul ignore next*/
  queue() {
    var queue = new
    /*istanbul ignore next*/
    _PriorityQueue[
    /*istanbul ignore next*/
    "default"]();
    queue.enqueue(10, 42);
    queue.enqueue(3, 21);
    assert.equal(queue.size, 2);
  },
  dequeue: function
  /*istanbul ignore next*/
  dequeue() {
    var queue = new
    /*istanbul ignore next*/
    _PriorityQueue[
    /*istanbul ignore next*/
    "default"]();
    queue.enqueue(10, 42);
    queue.enqueue(3, 21);
    assert.equal(queue.size, 2);
    assert.deepEqual(queue.dequeue(), [3, 21]);
    assert.equal(queue.size, 1);
    queue.enqueue(1, 0);
    assert.deepEqual(queue.dequeue(), [1, 0]);
  }
};

/*istanbul ignore next*/
exports.testPriorityQueue = testPriorityQueue;