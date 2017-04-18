const fs = require('fs');

// I'm building shoppe so as to take different menus and orders, but the files below consitute our default options
const defaultMenu = JSON.parse(fs.readFileSync('./sample-data/menu.json'));
const defaultOrders = JSON.parse(fs.readFileSync('./sample-data/input.json'));

// Other required classes:
const Fifo = require('./fifo_queue');
const Barista = require('./barista');

// various queing schemes:
const queueSwitch = {
  fifo: () => new Fifo(),
};

class Shoppe {
  constructor (baristas=2, menu=defaultMenu, closingTime=100, queue='fifo', orders=defaultOrders) {
    this.queue = queueSwitch[queue]();
    this.currentTime = 0;
    this.closingTime = closingTime;
    // rebuild the menu for constant time access to a beverage's properties
    this.menu = menu.reduce((prev, curr) => {
      prev[curr.type] = { brew_time: curr.brew_time, profit: curr.profit };
      return prev;
    }, {});
    // Assuming customer orders are in chronological order, reversing them will allow us to always access the latest one in constant time, provided that we pop them off one by one as they are processed.
    this.orders = orders.reverse();
    this.baristas = [];
    for (let i = 0; i < baristas; i++) {
      this.baristas.push(new Barista(i + 1));
    }
    this.logs = [];
  }
  operate() {
    while (this.currentTime <= this.closingTime) {
      let newOrder = this.checkOrders();
      while (newOrder) {
        this.queue.enqueue(newOrder);
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
  // this peeks at the next order and returns it if it matches the current time.
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
}

module.exports = Shoppe;

// go through each time
  // is there an order for the current time? ==> check orders
  // if so, process it ==> process order
    // this means adding them to a queue
    // the queue will be inserted into according to specific optimization criteria ==> insert function for each optimization criteria.
  // if no more orders, check if there are any orders in the queue
    // if yes
    // check if there is an available barista
    // take the item at the front of the queue
    // if no order move on to next time, repeat process

// Optimizations (throughput, shortest avg wait time, most profit made)
  // no matter what, the orders must remain in chronological order
  //
