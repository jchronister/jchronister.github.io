"use strict";

describe("randomInteger", function() {

  for (let i = 0; i < 10; i+=1) {
    it("Should Be 1, 2, or 3", function() {
      let x = randomInteger(1,3);
      assert(x === 1 || x === 2 || x === 3);
    });
  }

});