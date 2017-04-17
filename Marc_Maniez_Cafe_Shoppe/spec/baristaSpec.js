const fs = require('fs');
const chai = require('chai');
const expect = chai.expect;
const Shoppe = require('../src/shoppe');

describe('cafe shoppe', () => {

  const input = JSON.parse(fs.readFileSync('./sample-data/input.json'));
  const output = JSON.parse(fs.readFileSync('./sample-data/output_fifo.json'));

  describe('fifo', () => {
    it('should process the orders on a first come, first served basis', () => {

    });
  });
});