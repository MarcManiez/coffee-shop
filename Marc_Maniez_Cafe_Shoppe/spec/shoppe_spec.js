const fs = require('fs');
const chai = require('chai');
const expect = chai.expect;
const Shoppe = require('../src/shoppe');

describe('cafe shoppe', () => {

  const input = JSON.parse(fs.readFileSync('./sample-data/input.json'));
  const output = JSON.parse(fs.readFileSync('./sample-data/output_fifo.json'));

  describe('fifo', () => {
    it('should process the orders on a first come, first served basis', () => {
      const shoppe = new Shoppe();
      return expect(shoppe.operate()).to.equal(JSON.stringify(output));
    });
  });

  describe('checkOrders', () => {
    it('should return no orders when the next order has not happened yet', () => {
      const shoppe = new Shoppe();
      return expect(shoppe.checkOrders()).to.be.null;
    });

    it('should return an order when the next order is at the current time', () => {
      const shoppe = new Shoppe();
      shoppe.currentTime = 7;
      return expect(shoppe.checkOrders()).to.eql({ 'order_id': 1, 'order_time': 7, 'type': 'latte' });
    });

    it('should return no orders when the list of orders is empty', () => {
      const shoppe = new Shoppe();
      shoppe.orders = [];
      return expect(shoppe.checkOrders()).to.be.null;
    });
  });

  describe('makeBeverage', () => {
    it('should fill up logs and keep baristas busy for the appropriate amount of time', () => {
      const shoppe = new Shoppe();
      shoppe.currentTime = 7;
      shoppe.makeBeverage(shoppe.baristas[0], input[0]);
      expect(shoppe.baristas[0].busyUntil).to.equal(11);
      return expect(shoppe.logs.length).to.equal(1);
    });
  });

  describe('getAvailableBarista', () => {
    it('should select the first Barista when both are available', () => {
      const shoppe = new Shoppe();
      return expect(shoppe.getAvailableBarista()).to.eql(shoppe.baristas[0]);
    });

    it('should return null when no baristas are available', () => {
      const shoppe = new Shoppe();
      shoppe.makeBeverage(shoppe.baristas[0], input[0]);
      shoppe.makeBeverage(shoppe.baristas[1], input[1]);
      return expect(shoppe.getAvailableBarista()).to.be.null;
    });
  });
});