class ProfitQueue {
  constructor () {
    this.queue = [];
  }
  enqueue(order, menu) {
    const costEfficiency = menu[order.type].profit / menu[order.type].brew_time;
    for (let i = 0; i < this.queue.length; i++) {
      const currentBeverage = menu[this.queue[i].type];
      const efficiency = currentBeverage.profit / currentBeverage.brew_time;
      if (efficiency >= costEfficiency) {
        this.queue.splice(i, 0, order);
        return order;
      }
    }
    return this.queue.push(order);
  }
  dequeue() {
    return this.queue.pop();
  }
  isEmpty() {
    return !this.queue.length;
  }
}

module.exports = ProfitQueue;