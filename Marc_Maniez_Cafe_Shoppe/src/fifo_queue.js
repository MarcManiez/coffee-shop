class Queue {
  constructor () {
    this.queue = [];
  }
  enqueue(value) {
    this.queue.push(value);
    return value;
  }
  dequeue() {
    return this.queue.shift();
  }
  isEmpty() {
    return !this.queue.length;
  }
}

module.exports = Queue;