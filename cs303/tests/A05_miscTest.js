"use strict";
//CNAstart
describe("Accumulator", function() {

  it("initial value is the argument of the constructor", function() {
    let accumulator = new Accumulator(1);
    assert.equal(accumulator.value, 1);
  });

  it("after reading 0, the value is 1", function() {
    let accumulator = new Accumulator(1);
    accumulator.read(0);
    assert.equal(accumulator.value, 1);
  });

  it("after reading 1, the value is 2", function() {
    let accumulator = new Accumulator(1);
    accumulator.read(1);
    assert.equal(accumulator.value, 2);
  });
});
//CNAend


