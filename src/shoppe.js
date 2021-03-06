const fs = require('fs');

// Required classes:
const Fifo = require('./fifo_queue');
const ProfitQueue = require('./profit_queue');
const Barista = require('./barista');

// Queing schemes:
const queueSwitch = {
  fifo: () => new Fifo(),
  profit: () => new ProfitQueue(),
};

module.exports = class Shoppe {
  constructor ({ baristas=2, menu='./sample-data/menu.json', closingTime=100, queue='fifo', orders='./sample-data/input.json' } = {}) {
    this.queue = queueSwitch[queue]();
    this.currentTime = 0;
    this.closingTime = closingTime;
    // rebuild the menu for constant time access to a beverage's properties
    this.menu = JSON.parse(fs.readFileSync(menu)).reduce((prev, curr) => {
      prev[curr.type] = { brew_time: curr.brew_time, profit: curr.profit };
      return prev;
    }, {});
    // Assuming customer orders are in chronological order, reversing them will allow us to always access the upcoming order in constant time, provided that we pop off orders one by one as they are processed.
    this.orders = JSON.parse(fs.readFileSync(orders)).reverse();
    this.baristas = new Array(baristas).fill(0).map((item, index) => new Barista(index + 1));
    this.logs = [];
  }
  operate() {
    while (this.currentTime <= this.closingTime) {
      let newOrder = this.checkOrders();
      while (newOrder) {
        this.queue.enqueue(newOrder, this.menu);
        newOrder = this.checkOrders();
      }
      let barista = this.getAvailableBarista();
      while (barista && !this.queue.isEmpty()) {
        const order = this.queue.dequeue();
        this.makeBeverage(barista, order);
        barista = this.getAvailableBarista();
      }
      this.currentTime++;
    }
    return JSON.stringify(this.logs);
  }
  // this peeks at the next order, pops it off and returns it if it matches the current time.
  checkOrders() {
    if (!this.orders.length) return null;
    return this.currentTime === this.orders[this.orders.length - 1].order_time ? this.orders.pop() : null;
  }
  getAvailableBarista() {
    for (let i = 0; i < this.baristas.length; i++) {
      if (this.baristas[i].isAvailable(this.currentTime)) return this.baristas[i];
    }
    return null;
  }
  makeBeverage(barista, order) {
    const beverage = order.type;
    const duration = this.menu[beverage].brew_time;
    barista.busyUntil = this.currentTime + duration;
    this.logs.push({ barista_id: barista.id, start_time: this.currentTime, order_id: order.order_id });
  }
};
