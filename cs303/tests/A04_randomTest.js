"use strict";

describe("random", function() {

  // for (let i = 0; i < 10; i+=1) {
    it("Should Be 1, 2, or 3", function() {
      let x = random(1,3);
      assert(x >= 1 && x < 3);
    });
  // }

  it("Should Be 1, 2, or 3", function() {
    let x = random(1,3);
    assert(x === 0);
  });

  it("Should Be 1, 2, or 3", function() {
    let x = random(1,3);
    assert(x >= 1 && x < 3);
  });

  it("Should Be 1, 2, or 3", function() {
    // let x = random(1,3);
    assert.equal(random(1,3), 0);
  });
});