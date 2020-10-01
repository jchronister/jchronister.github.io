"use strict";

/*global assert, reduceToSum, reduceToAvg, reduceToMax, filterAllEvens
mapDouble, reduceAvgEvenAge, reduceAvgOddAge, filterAgeGT10, includesGT10,
findGT10, findEven, includesEven*/

//RTS
describe("reduceToSum", function() {
  it("Sum Array", function() {
    let numArray = [5,0, 7, 77, -20, 300, 51, 2];
    assert.equal(reduceToSum(numArray), 422);
  });
  it("Sum Object Age", function() {
    let peopleArray = [{name: "Sam", age: 15}, {name: "William", age: 6},
                       {name: "Lucy", age: 13}, {name:"Barney", age: 80}];
    assert.equal(reduceToSum(peopleArray, "age"), 114);
  });
});
//RTS
//RTA
describe("reduceToAvg", function() {
  it("Avgerage Array", function() {
    let numArray = [5,0, 7, 77, -20, 300, 51, 2];
    assert.equal(reduceToAvg(numArray), 52.75);
  });
  it("Average Object Age", function() {
    let peopleArray = [{name: "Sam", age: 15}, {name: "William", age: 6},
                       {name: "Lucy", age: 13}, {name:"Barney", age: 80}];
    assert.equal(reduceToAvg(peopleArray, "age"), 28.5);
  });
});
//RTA
//RTM
describe("reduceToMax", function() {
  it("Array Max", function() {
    let numArray = [5,0, 7, 77, -20, 300, 51, 2];
    assert.equal(reduceToMax(numArray), 300);
  });
  it("Max Object Age", function() {
    let peopleArray = [{name: "Sam", age: 15}, {name: "William", age: 6},
                       {name: "Lucy", age: 13}, {name:"Barney", age: 80}];
    assert.equal(reduceToMax(peopleArray, "age"), 80);
  });
});
//RTM
//RAEA
describe("reduceAvgEvenAge", function() {
  it("Average of Even Ages", function() {
    let peopleArray = [{name: "Sam", age: 15}, {name: "William", age: 6},
                       {name: "Lucy", age: 13}, {name:"Barney", age: 80}];
    assert.equal(reduceAvgEvenAge(peopleArray, "age"), 43);
  });
});
//RAEA
//RAOA
describe("reduceAvgOddAge", function() {
  it("Array Max", function() {
    let peopleArray = [{name: "Sam", age: 15}, {name: "William", age: 6},
                       {name: "Lucy", age: 13}, {name:"Barney", age: 80}];
    assert.equal(reduceAvgOddAge(peopleArray, "age"), 14);
  });
});
//RAOA
//MD
describe("mapDouble", function() {
  it("Array Double", function() {
    let numArray = [5,0, 7, 77, -20, 300, 51, 2];
    assert.deepEqual(mapDouble(numArray), [10,0,14,154,-40,600,102,4]);
  });
  it("Age Double", function() {
    let peopleArray = [{name: "Sam", age: 15}, {name: "William", age: 6},
                       {name: "Lucy", age: 13}, {name:"Barney", age: 80}];
    assert.deepEqual(mapDouble(peopleArray, "age"), [30,12,26,160]);
  });
});
//MD
//FAE
describe("filterAllEvens", function() {
  it("Even Numbers", function() {
    let numArray = [5,0, 7, 77, -20, 300, 51, 2];
    assert.deepEqual(filterAllEvens(numArray), [0,-20,300,2]);
  });
});
//FAE
//FAG10
describe("filterAgeGT10", function() {
  it("Even Age", function() {
    let peopleArray = [{name: "Sam", age: 15}, {name: "William", age: 6},
                       {name: "Lucy", age: 13}, {name:"Barney", age: 80}];
    assert.deepEqual(filterAgeGT10(peopleArray, "age"), [15,13,80]);
  });
});
//FAG10
//FG10IG10 
describe("findGT10", function() {
  it("Find >10", function() {
    let peopleArray = [{name: "Sam", age: 15}, {name: "William", age: 6},
                       {name: "Lucy", age: 13}, {name:"Barney", age: 80}];
    assert.equal(findGT10(peopleArray, "age"), 15);
  });

  it("Includes >10", function() {
    let peopleArray = [{name: "Sam", age: 15}, {name: "William", age: 6},
                       {name: "Lucy", age: 13}, {name:"Barney", age: 80}];
    assert.equal(includesGT10(peopleArray, "age"), true);
  });
});
//FG10IG10 
//FEIE
describe("findEven", function() {
  it("Find Even", function() {
    let numArray = [5,0, 7, 77, -20, 300, 51, 2];
    assert.equal(findEven(numArray), 0);
  });
  it("Includes Even", function() {
    let numArray = [5,0, 7, 77, -20, 300, 51, 2];
    assert.equal(includesEven(numArray), true);
  });
});
//FEIE