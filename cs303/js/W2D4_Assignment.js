/* eslint-disable require-jsdoc */
/* eslint-disable id-length */
"use strict";

// eslint-disable-next-line no-unused-vars
var log = console.log;
// eslint-disable-next-line no-redeclare
if (typeof alert === "undefined") var alert = console.log;
// eslint-disable-next-line no-undef, no-redeclare
if (typeof prompt === "undefined") var prompt = require("prompt-sync")();

function getW2D4Tree () {

    class TreeNode {
        constructor(value) {
        this.value = value;
        this.descendents = [];
        }
    }

    // create nodes with values
    const abe = new TreeNode('Abe');
    const homer = new TreeNode('Homer');
    const bart = new TreeNode('Bart');

    const lisa = new TreeNode('Lisa');
    const maggie = new TreeNode('Maggie');
    // associate root with is descendents
    abe.descendents.push(homer);
    homer.descendents.push(bart, lisa, maggie);

    return abe;

}

/*  Write recursive functions to Log to the console the names of 
*   everyone in the tree.
*/
function logTreeNamebyRecursion (tree) {

    if (tree.descendents.length > 0) {
      tree.descendents.forEach(n=>logTreeNamebyRecursion(n));
    }

}



/*  Given a target value, return true or false if there is a node in the tree with the target value. E.g.,
*  contains(tree, “Lisa”) → true
*  contains(tree, “Crusty”) → false
*/
function treeContains (tree, name) {
log(tree.value)
  if (tree.value === name) return true;
  if (tree.descendents.length > 0) {
    // tree.descendents.forEach(n=>n.reduce((a,i)=>treeContains(i,name)===true?true:a,false));
     tree.descendents.forEach(function(n) {
       var retrn = treeContains (n, name);
       if (retrn === true) return retrn;
     });
  }
  
}

log(treeContains(getW2D4Tree (),"Lisa"))