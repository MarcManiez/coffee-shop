const fs = require('fs');

// I'm building shoppe so as to take different menus and orders, but the files below consitute our default options
const defaultMenu = JSON.parse(fs.readFileSync('../sample-data/menu.json'));
const defaultOrders = JSON.parse(fs.readFileSync('../sample-data/input.json'));

// different queing schemes:
const queueSwitch = {
  fifo: () => new require('./fifo_queue'),
};

// Other required classes:
const Barista = require('./barista');

class Shoppe {
  constructor (baristas=2, menu=defaultMenu, closingTime=100, queue='fifo', orders=defaultOrders) {
    this.queue = queueSwitch[queue]();
    this.currentTime = 0;
    this.closingTime = closingTime;
    this.menu = menu;
    this.order = orders;
    this.baristas = new Array(baristas).map((item, index) => new Barista(index + 1));
  }
  operate() {
    while (this.currentTime <= this.closingTime) {
      console.log('test ', this.currentTime);
      this.currentTime++;
    }
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
