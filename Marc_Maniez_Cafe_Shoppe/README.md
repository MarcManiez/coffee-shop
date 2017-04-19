# Ye Olde Barista Shoppe

## How to run me

- Make sure you have node up and running
- `npm install`
- `node cafe_shoppe.js` from the project root, or `npm start`. This will produce the result for the first in first out solution.
- Options (remember to add `--` if using `npm start` —- Eg `npm start -- --baristas 5`):
  - `--queue` to give an optimization preference. Eg. `node cafe_shoppe.js --queue profit`
  - `--time` to run the shoppe for the indicated amount of time. Eg. `node cafe_shoppe.js --time 50`
  - `--baristas` to run the shoppe with the indicated number of baristas. Eg. `node cafe_shoppe.js --baristas 5`
  - `--orders` to run the shoppe with a specific set of orders. Use the path relative to the parent directory of cafe_shoppe.js. Eg. `node cafe_shoppe.js --orders ./sample-data/input.json`
  - `--menu`  to run the shoppe with a specific menu. Use the path relative to the parent directory of cafe_shoppe.js. Eg. `node cafe_shoppe.js --menu ./sample-data/menu.json`

## How to test me

- `npm test`

## Engineering, factoring, and product decisions

- I Went with a object oriented approach because we are dealing with a simple set of data, but I might not necessarily do that under normal circumstances, as such structures can be brittle and unecessarily tightly coupled.

- I tried to build the program so as to take different inputs (menus, number of baristas, and order inputs). I realize this was not required, but it added an extra challenge, forced me to think a bit harder about the classe's interface, and gave me an reason to explore `process.argv`!

- Time allowing, I would have made a single queue Object that would have multiple enqueing functions. I'm not 100% sold on my current pattern of writing a different queue class for each type of order optimization process.

- Optimizations to the queue:
 - One might argue that an array isn't necessarily the best data structure for the the first in first out queue. A linked list may have been slightly more efficient in terms of inserting and especially retrieving items.
 - For the profitability queue, a logarithmic insertion algorithmn may be more interesting depending on how large the queue gets. I just went with .splice() in this context to keep things simple.

## Optimization metric

I chose to go with a simple profit optimization technique. The only thing I needed to tweak was the queue. I made a second queue with an slightly more involved queuing method that inserts into the queue based on a how profitable a given beverage is to sell. More profitable beverages go to the front of the queue, and vise versa. This is simply calculated based by dividing an item's cost by its brewing time.