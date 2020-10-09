/* eslint-disable id-length */
"use strict";
/*global assert,Accumulator,groupById,unique*/
//CNA
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
//CNA
//CKOFA
describe("groupById", function() {

  it("creates an object grouped by id", function() {
    let users = [
      {id: "john", name: "John Smith", age: 20},
      {id: "ann", name: "Ann Smith", age: 24},
      {id: "pete", name: "Pete Peterson", age: 31},
    ];

    assert.deepEqual(groupById(users), {
      john: {id: "john", name: "John Smith", age: 20},
      ann: {id: "ann", name: "Ann Smith", age: 24},
      pete: {id: "pete", name: "Pete Peterson", age: 31},
    });
  });

  it("works with an empty array", function() {
    let users = [];
    assert.deepEqual(groupById(users), {});
  });
});
//CKOFA
//FUAM
describe("unique", function() {
  it("removes non-unique elements", function() {
    let strings = ["Hare", "Krishna", "Hare", "Krishna",
      "Krishna", "Krishna", "Hare", "Hare", ":-O"
    ];

    assert.deepEqual(unique(strings), ["Hare", "Krishna", ":-O"]);
  });

  it("does not change the source array", function() {
    let strings = ["Krishna", "Krishna", "Hare", "Hare"];
    unique(strings);
    assert.deepEqual(strings, ["Krishna", "Krishna", "Hare", "Hare"]);
  });
});
//FUAM