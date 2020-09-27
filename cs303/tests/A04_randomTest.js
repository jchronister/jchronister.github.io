"use strict";

describe("random", function() {

  for (let i = 0; i < 10; i+=1) {
    it("Should Be >=1 and <3", function() {
      let x = random(1,3);
      assert(x >= 1 && x < 3);
    });
  }

});