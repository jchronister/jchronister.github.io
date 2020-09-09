"use strict";

describe("Question 1 Function 1: maxOfThree", function() {

  it("First Paramete Largest",
      function() {
      assert.equal(maxOfThree(21, -1, 5),21);
  });

  it("Middle Parameter Largest",
      function() {
      assert.equal(maxOfThree(2, 6, 5), 6);
  });

  it("Last Parameter Largest",
      function() {
      assert.equal(maxOfThree(2, -1, 5), 5);
  });

  it("All Parameters Same",
      function() {
      assert.equal(maxOfThree(-1, -1, -1), -1);
  });

});


describe("Question 1 Function 2: sum", function() {

  it("Sum 1 Item",
      function() {
      assert.equal(sum([21]),21);
  });

  it("Sum 3 Items",
      function() {
      assert.equal(sum([1,2,3]), 6);
  });

  it("Sum 11 Items",
      function() {
      assert.equal(sum([1,2,3,4,5,6,7,8,9,10]), 55);
  });

});


describe("Question 1 Function 3: findLongestWord", function() {

  it("No Items",
      function() {
      assert.equal(findLongestWord([]),0);
  });

  it("For 3 Items",
      function() {
      assert.equal(findLongestWord(['hi','never','ghosts']), 6);
  });

  it("Not An Array",
      function() {
      assert.equal(findLongestWord(8), 0);
  });

});

describe("Question 2 Function: isVowel", function () {
 it("a is vowel", function () {
 assert.equal(isVowel("a"), true);
 });
 it("e is vowel", function () {
 assert.equal(isVowel("e"), true);
 });
 it("i is vowel", function () {
 assert.equal(isVowel("i"), true);
 });
 it("o is vowel", function () {
 assert.equal(isVowel("o"), true);
 });
 it("u is vowel", function () {
 assert.equal(isVowel("u"), true);
 });
 it("z is not vowel", function () {
 assert.equal(isVowel("z"), false);
 });
 it("5 is not vowel", function () {
 assert.equal(isVowel("5"), false);
 });
});

describe("Question 3 Function 1: reverse", function () {
  it("1 Letter", function () {
    assert.equal(reverse("A"), "A");
  });

  it("1 Word", function () {
    assert.equal(reverse("Testing"), "gnitseT");
  });

  it("1 Sentence", function () {
    assert.equal(reverse("I Like Candy"), "ydnaC ekiL I");
  });
  
});


describe("Question 3 Function 2: filterLongWords", function () {
  it("No Word Returned", function () {
    assert.deepEqual(filterLongWords(["Test"],5), []);
  });

  it("Return 1 of 2 Words, One Length Equal to Argument", function () {
  assert.deepEqual(filterLongWords(["Testing","Cow"],3), ["Testing"]);
  });

  it("Return 2 of 4 Words", function () {
    assert.deepEqual(filterLongWords(["I", "Like", "Candy", "Sometimes"],4), ["Candy","Sometimes"]);
  });
  
});