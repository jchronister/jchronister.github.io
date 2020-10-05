/* eslint-disable id-length */
"use strict";
/*global assert,simpson,Simpson,createHTMLTree,node1*/


//WSCT
describe("createSimpson", function() {
  it("Constructor = Class", function() {
    let classSimpson = new simpson("Kevin");
    assert.deepEqual(new Simpson("Kevin"), classSimpson);
  });
});
//WSCT
//CHCT
describe("createHTMLTree", function() {
  it("Constructor = Class", function() {
    assert.deepEqual(createHTMLTree(), node1);
  });
});
//CHCT
//MORT
describe("callreduceMe", function() {
  it("Reduce Array", function() {
    assert.equal([1,2,3].reduceMe((a,n) => a + n, 0), 6);
  });
});
//MORT
//MOFT
describe("callfilterMe", function() {
  it("Filter Array", function() {
    assert.deepEqual([1,2,3,4,5].filterMe((n) => n > 3), [4, 5]);
  });
});
//MOFT
//MOMT
describe("callmapMe", function() {
  it("Map Array", function() {
    assert.deepEqual([1,2,3,4,5].mapMe((n) => n + 3), [4, 5, 6, 7, 8]);
  });
});
//MOMT 