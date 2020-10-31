/* eslint-disable require-jsdoc */
/* eslint-disable id-length */
"use strict";

/*global getTree EulerTour Print*/


// eslint-disable-next-line no-unused-vars
var log = console.log;
// eslint-disable-next-line no-redeclare
if (typeof alert === "undefined") var alert = console.log;
// eslint-disable-next-line no-undef, no-redeclare
if (typeof prompt === "undefined") var prompt = require("prompt-sync")();

function printTree() {// eslint-disable-line no-unused-vars
  let tree = getTree();
  let printer = new Print();
  return printer.print(tree, "return");
}
//ST
/**  Function Sums the values in the internal nodes of a binary tree
 */
//ST
function sumTree(tree, p) {

  // Get Position in Tree
  if (arguments[1] === undefined) {
    if (tree.isEmpty()) return 0;
    var p = tree.root();
  } else {
    p = arguments[1];
  }

  if (tree.isExternal(p)) return 0;

  let sumLeft = sumTree(tree, tree.leftChild(p));
  let sumRight = sumTree(tree, tree.rightChild(p));

  return sumLeft + sumRight + p.element();

}

function callSumTree() {// eslint-disable-line no-unused-vars

  let tree = getTree();
  return sumTree(tree);

}
//ST
//MET
/*  Function that sums the elements in a binary tree using EulerTour
*/
//MET
function maxOfTreeEulerTour (tree){

  class MaxOfTree extends EulerTour {

    visitExternal (T, p, result) {
      result[1] = -Infinity;
    }

    visitPostOrder (T, p, result) {
      result[1] = Math.max(result[0], result[2], p.element());
    }

  }

  let getMax = new MaxOfTree();

  if (tree.isEmpty()) return null;

  return getMax.eulerTour(tree, tree.root());

}

function callMaxOfTreeEulerTour () {// eslint-disable-line no-unused-vars

  let tree = getTree();
  return maxOfTreeEulerTour(tree);

}
//MET
//MOT
/**  Finds the maximum value stored in a binary tree.
*/
//MOT
function maxTree(tree) {

  if (tree.isEmpty()) return null;

  // Get Position in Tree
  let p = arguments[1] === undefined ? tree.root() : arguments[1];

  if(tree.isExternal(p)) return -Infinity;

  let maxL = maxTree(tree, tree.leftChild(p));
  let maxR = maxTree(tree, tree.rightChild(p));

  return Math.max(maxL, maxR, p.element());

}

function callMaxTree() {

  let tree = getTree();
  return maxTree(tree);

}
//MOT