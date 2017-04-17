const fs = require('fs');

const defaultMenu = JSON.parse(fs.readFileSync('../sample-data/menu.json'));
const fifo = require('./fifo_queue');
const defaultOrders = JSON.parse(fs.readFileSync('../sample-data/input.json'));

module.exports = function(baristas=2, menu=defaultMenu, time=100, queue='fifo', orders=defaultOrders) {
  const queueSwitch = { fifo };
  queue = queueSwitch[queue];

};

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
