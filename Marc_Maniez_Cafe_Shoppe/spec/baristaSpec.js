const fs = require('fs');
const chai = require('chai');
const expect = chai.expect;

describe('cafe shoppe', () => {

  const input = fs.readFileSync('./sample-data/input.json');
  const output = fs.readFileSync('./sample-data/output_fifo.json');

  describe('fifo', () => {
    it('should process the orders on a first come, first served basis', () => {

    });
  });
});