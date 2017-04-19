const Shoppe = require('./shoppe');

function processArgs(args) {
  const shoppeArguments = {};
  const baristasIndex = args.indexOf('--baristas');
  if (baristasIndex >= 0) {
    shoppeArguments.baristas = Number(args[baristasIndex + 1]);
  }
  const timeIndex = args.indexOf('--time');
  if (timeIndex >= 0) {
    shoppeArguments.closingTime = Number(args[timeIndex + 1]);
  }
  const queueIndex = args.indexOf('--queue');
  if (queueIndex >= 0) {
    shoppeArguments.queue = args[queueIndex + 1];
  }
  const orderIndex = args.indexOf('--orders');
  if (orderIndex >= 0) {
    shoppeArguments.orders = args[orderIndex + 1];
  }
  const menuIndex = args.indexOf('--menu');
  if (menuIndex >= 0) {
    shoppeArguments.menu = args[menuIndex + 1];
  }
  return shoppeArguments;
}

const args = processArgs(process.argv.slice(2));

const shoppe = new Shoppe(args);

console.log(JSON.stringify(JSON.parse(shoppe.operate()), null, '\t'));