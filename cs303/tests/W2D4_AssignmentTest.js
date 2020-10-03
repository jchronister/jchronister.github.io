"use strict";
/*global assert,*/
//GTN
describe("getTreeNode", function() {

  it("Equal to Kevin", function() {
    var ext = window["extendTree"];
    var tree = window["getW2D4Tree"];
    assert.deepEqual(window["getTreeNode"](ext(tree())[0], "Kevin"), {value:"Kevin",descendents:[]});
  });

  it("Equal to Cory", function() {
    var ext = window["extendTree"];
    var tree = window["getW2D4Tree"];
    assert.deepEqual(window["getTreeNode"](ext(tree())[0], "Cory"), {value:"Cory",descendents:[]});
  });

  it("Equal to Homer", function() {
    var ext = window["extendTree"];
    var tree = window["getW2D4Tree"];
    var expect = ext(tree())[0].descendents[0];
    assert.deepEqual(window["getTreeNode"](ext(tree())[0], "Homer"), expect);
  });

});
//GTN