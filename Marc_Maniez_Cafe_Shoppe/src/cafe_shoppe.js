const Shoppe = require('./shoppe');

// go through time linearly and carry a bunch of actions every time.

// reformat the object for some efficiency. We can't loop over the object every time we need to find something.
// Either that or we need to remove things from it as we progress.
// in fact this is what we should do, provided that we reverse the original array, since it is chronologically ordered.

// barista #1 should go first if both are free

// create Barista constructor
  // remaining minutes on task // busy until
  // barista ID

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


// caveat on my queue object:
  // - I could have made it an actual linkedList
  // - I could have made a unique Queue that takes different insertion criteria, rather than making different queue objects.

const shoppe = new Shoppe();

shoppe.operate();