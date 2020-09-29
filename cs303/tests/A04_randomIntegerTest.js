"use strict";

describe("randomInteger", function() {

  for (let i = 0; i < 10; i+=1) {
    it("Should Be 1, 2, or 3", function() {
      let num = randomInteger(1,3);
      assert(num === 1 || num === 2 || num === 3);
    });
  }

});