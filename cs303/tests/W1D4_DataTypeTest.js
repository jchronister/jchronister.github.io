"use strict";
/*global assert,random,randomInteger,sinon,readNumber,ucFirst,checkSpam,
extractCurrencyValue,truncate,getMaxSubSum,camelize*/
//RNT
describe("random", function() {

  for (let i = 0; i < 10; i+=1) {
    it("Should Be >=1 and <3", function() {
      let num = random(1,3);
      assert(num >= 1 && num < 3);
    });
  }

});
//RNT
//RIT
describe("randomInteger", function() {

  for (let i = 0; i < 10; i+=1) {
    it("Should Be 1, 2, or 3", function() {
      let num = randomInteger(1,3);
      assert(num === 1 || num === 2 || num === 3);
    });
  }

});
//RIT
//RUIN
beforeEach(function() {
  sinon.stub(window, "prompt");
});

afterEach(function() {
  prompt.restore();
});

describe("readNumber", function() {

  it("if a number, returns it", function() {
    prompt.returns("123");
    assert.strictEqual(readNumber(), 123);
  });

  it("if 0, returns it", function() {
    prompt.returns("0");
    assert.strictEqual(readNumber(), 0);
  });

  it("continues the loop until meets a number", function() {
    prompt.onCall(0).returns("not a number");
    prompt.onCall(1).returns("not a number again");
    prompt.onCall(2).returns("1");
    assert.strictEqual(readNumber(), 1);
  });

  it("if an empty line, returns null", function() {
    prompt.returns("");
    assert.isNull(readNumber());
  });

  it("if cancel, returns null", function() {
    prompt.returns(null);
    assert.isNull(readNumber());
  });

});
//RUIN
//UFC
describe("ucFirst", function() {
  it("Uppercases the first symbol", function() {
    assert.strictEqual(ucFirst("john"), "John");
  });

  it("Doesn't die on an empty string", function() {
    assert.strictEqual(ucFirst(""), "");
  });
});
//UFC

//CFS
describe("checkSpam", function() {
  it("finds spam in 'buy ViAgRA now'", function() {
    assert.isTrue(checkSpam("buy ViAgRA now"));
  });

  it("finds spam in 'free xxxxx'", function() {
    assert.isTrue(checkSpam("free xxxxx"));
  });

  it("no spam in 'innocent rabbit'", function() {
    assert.isFalse(checkSpam("innocent rabbit"));
  });
});
//CFS
//TTT
describe("truncate", function() {
  it("truncate the long string to the given length (including the ellipsis)", function() {
    assert.equal(
      truncate("What I'd like to tell on this topic is:", 20),
      "What I'd like to te…"
    );
  });

  it("doesn't change short strings", function() {
    assert.equal(
      truncate("Hi everyone!", 20),
      "Hi everyone!"
    );
  });
});
//TTT
//ETM
describe("extractCurrencyValue", function() {

  it("for the string $120 returns the number 120", function() {
    assert.strictEqual(extractCurrencyValue("$120"), 120);
  });

});
//ETM
//MSA
describe("getMaxSubSum", function() {
  it("maximal subsum of [1, 2, 3] equals 6", function() {
    assert.equal(getMaxSubSum([1, 2, 3]), 6);
  });

  it("maximal subsum of [-1, 2, 3, -9] equals 5", function() {
    assert.equal(getMaxSubSum([-1, 2, 3, -9]), 5);
  });

  it("maximal subsum of [-1, 2, 3, -9, 11] equals 11", function() {
    assert.equal(getMaxSubSum([-1, 2, 3, -9, 11]), 11);
  });

  it("maximal subsum of [-2, -1, 1, 2] equals 3", function() {
    assert.equal(getMaxSubSum([-2, -1, 1, 2]), 3);
  });

  it("maximal subsum of [100, -9, 2, -3, 5] equals 100", function() {
    assert.equal(getMaxSubSum([100, -9, 2, -3, 5]), 100);
  });

  it("maximal subsum of [] equals 0", function() {
    assert.equal(getMaxSubSum([]), 0);
  });

  it("maximal subsum of [-1] equals 0", function() {
    assert.equal(getMaxSubSum([-1]), 0);
  });

  it("maximal subsum of [-1, -2] equals 0", function() {
    assert.equal(getMaxSubSum([-1, -2]), 0);
  });

  it("maximal subsum of [2, -8, 5, -1, 2, -3, 2] equals 6", function() {
    assert.equal(getMaxSubSum([2, -8, 5, -1, 2, -3, 2]), 6);
  });
});
//MSA
//TBW
describe("camelize", function() {

  it("leaves an empty line as is", function() {
    assert.equal(camelize(""), "");
  });

  it("turns background-color into backgroundColor", function() {
    assert.equal(camelize("background-color"), "backgroundColor");
  });

  it("turns list-style-image into listStyleImage", function() {
    assert.equal(camelize("list-style-image"), "listStyleImage");
  });

  it("turns -webkit-transition into WebkitTransition", function() {
    assert.equal(camelize("-webkit-transition"), "WebkitTransition");
  });

});
//TBW