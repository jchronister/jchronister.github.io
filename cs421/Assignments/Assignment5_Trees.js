/* eslint-disable require-jsdoc */
/* eslint-disable id-length */
"use strict";

/*global getTree*/


// eslint-disable-next-line no-unused-vars
var log = console.log;
// eslint-disable-next-line no-redeclare
if (typeof alert === "undefined") var alert = console.log;
// eslint-disable-next-line no-undef, no-redeclare
if (typeof prompt === "undefined") var prompt = require("prompt-sync")();


//ST
/**  Function Sums the values in the internal nodes of a binary tree
 */
//ST
function sumTree(tree, p) {

  if (tree.isExternal(p)) return 0;

  let sumLeft = sumTree(tree, tree.leftChild(p));
  let sumRight = sumTree(tree, tree.rightChild(p));

  return sumLeft + sumRight + p.element();

}

function callSumTree() {// eslint-disable-line no-unused-vars

  let tree = getTree();

  if (tree.isEmpty()) return 0;

  // Get Starting Position
  let p = tree.root();

  return sumTree(tree, p);


}

//ST