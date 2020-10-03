/* eslint-disable require-jsdoc */
/* eslint-disable id-length */
"use strict";

// eslint-disable-next-line no-unused-vars
var log = console.log;
// eslint-disable-next-line no-redeclare
if (typeof alert === "undefined") var alert = console.log;
// eslint-disable-next-line no-undef, no-redeclare
if (typeof prompt === "undefined") var prompt = require("prompt-sync")();

//GW2D4TREE//GW2D4TREE
// eslint-disable-next-line no-unused-vars
function getW2D4Tree () {

    class TreeNode {
        constructor(value) {
        this.value = value;
        this.descendents = [];
        }
    }

    // create nodes with values
    const abe = new TreeNode("Abe");
    const homer = new TreeNode("Homer");
    const bart = new TreeNode("Bart");

    const lisa = new TreeNode("Lisa");
    const maggie = new TreeNode("Maggie");
    // associate root with is descendents
    abe.descendents.push(homer);
    homer.descendents.push(bart, lisa, maggie);

    return [abe, TreeNode];

}
//GW2D4TREE
//LTTC//LTTC
/*  Write recursive functions to Log to the console the names of 
*   everyone in the tree.
*/
function logTreeNamebyRecursion (tree) {
    
  log(tree.value);

  if (tree.descendents.length > 0) {
    // eslint-disable-next-line no-unused-vars
    tree.descendents.forEach(n=>logTreeNamebyRecursion(n));
  }
    
}
//LTTC
//TC//TC
/*  Given a target value, return true or false if there is a node in the tree with the target value. E.g.,
*  contains(tree, “Lisa”) → true
*  contains(tree, “Crusty”) → false
*/
function treeContains (tree, name) {

  var retrn;

  if (tree.value === name) return true;

  if (tree.descendents.length > 0) {

    tree.descendents.forEach(function(n) {
       if (retrn === true) return retrn;
       // eslint-disable-next-line no-unused-vars
       retrn = treeContains (n, name);
     });

  } 

  return retrn || false;
}

function treeContainsAnotherWay (tree, name) {

  // if (tree.descendents.lenth === 0) {
  //   return tree(tree.value === name);
  // } else {
  //   var found;
  //   // Check Value
  //   if (tree.value === name) return true;

  //   // Check Children
  //   tree.descendents.forEach(function(n) {
  //     if (found === true) return true;
  //     found = treeContainsAnotherWay(n, name);
  //     if (found === true) return true;
  //   });
  //   return found;
  // }

    if (tree.descendents.lenth === 0) {
      return tree(tree.value === name);
    } else {
      var found;
      // Check Value
      if (tree.value === name) return true;

      // Check Children
      for (var elmt of tree.descendents) {
        // eslint-disable-next-line no-unused-vars
        found = treeContainsAnotherWay(elmt, name);
        if (found === true) return true;
      }
    return false;
  }
}
//TC
//GTN
/* Given a target value, return the subtree with the found node or null 
*  if no match. Extend the tree to have a more interesting test. 
*  Create a mocha test to run at least 2 or 3 tests on your tree.
*  findSubtree(tree, “Homer”) → subtree with Homer as the root
*/
//GTN
// eslint-disable-next-line no-unused-vars
function extendTree (tree) {

  let newTree = function (name) {
    return new tree[1](name);
  };

  tree[0].descendents.push(newTree("Jeff"));
  tree[0].descendents[1].descendents.push(newTree("Kevin"), newTree("Cory"));
  tree[0].descendents[0].descendents[1].descendents.push(newTree("Jeff"));
  tree[0].descendents[0].descendents[1].descendents[0].descendents.push(newTree("Joe"), newTree("Jane"));

  return tree;
}

function getTreeNode (tree, name) {

  var retrn;

  if (tree.value === name) return tree;

  if (tree.descendents.length > 0) {

    tree.descendents.forEach(function(n) {
       if (retrn) return retrn;
       // eslint-disable-next-line no-unused-vars
       retrn = getTreeNode (n, name);
     });

  } 

  return retrn || null;
}
//GTN
//CLN
/*  Create a new class ListNode (based on TreeNode below) and use it 
*   to generate a linked list of
*   Abe, Homer, Bart, Lisa, Maggie instead of a tree
*/
//CLN
// eslint-disable-next-line no-unused-vars
function createListNode () {

  class linkNode {
    constructor(value, child) {
    this.value = value;
    this.next = child || null;
    }
  }

  var list = ["Abe", "Homer", "Bart", "Lisa", "Maggie"];
  var linkList, parentNode;

  list.forEach((n, i) => {

    if (i === 0) {
      parentNode = new linkNode(n);
      linkList = parentNode;
    } else {
    var newNode = new linkNode(n);
    parentNode.next = newNode;
    parentNode = newNode;
    }
  });

  return linkList;

}
//CLN
//FLN
/*  Given a target value in the list, return the node that 
*   contains the target value or null if no match.
*   findListNode(list, “Bart”)
*/
//FLN
function findListNode(list, name) {

  var lst = list;

  if (lst.value === name) {
    return lst;
  } else {
    if (lst.next === null) {
      lst = null;
    } else {
      // eslint-disable-next-line no-unused-vars
      return findListNode(lst.next, name);
    }
  }

  return lst || null;

}
//FLN
//TRM
/*  Write a recursive function, treeModifier, that will take a tree and a modifier function as
*   parameters. Walk through the tree and apply the function to each node. The function should
*   apply some operation to a node. Write a function that will change the value of a node to be all
*   caps. Write another that will change the value to have *** in front and behind the node value.
*   Write another that will reverse the string of the node value. Call your recursive function with
*   each of these modifier functions.
*   treeModifier(tree, modiferFunc)
*   allCaps(node)
*   addStars(node)
*   reverseNode(node)
*/
//TRM
function treeModifier(tree, modFunction) {

  modFunction(tree);
  // eslint-disable-next-line no-unused-vars
  tree.descendents.forEach(n => treeModifier(n, modFunction));
  return tree;

}

// eslint-disable-next-line no-unused-vars
function allCaps(node) {
  node.value = node.value.toUpperCase();
}

// eslint-disable-next-line no-unused-vars
function addStars(node) {
  node.value = "***" + node.value + "***";
}

// eslint-disable-next-line no-unused-vars
function reverseString(node) {
  var arr = node.value.split("");
  arr.reverse();
  node.value = arr.join("");
}
//TRM
//SO
/*  Write code to illustrate the use of the spread operator for the 
*   following use cases
*   a) Copy an array
*   b) Concatenate arrays into a new array
*   c) Concatenate an array and a new array element
*   d) Use an array as arguments
*   e) Use Math.min and Math.max
*   f) Combine several objects into a single object
*/
//SO
function spreadCopyArray () {

  var ary = [1, 2, 3, 4];
  var cloneAry = [...ary];
  
  // Verify Clone
  cloneAry[4] = 99;
  return [ary, cloneAry];

}

function spreadConcatenateArrays () {

  var ary1 = [1, 2, 3, 4];
  var ary2 = [3, 2, 1, 0];
  return [...ary1, ...ary2];

}

function spreadConcatenateArrayAndElement () {

  var ary = [1, 2, 3, 4];
  var x = 5;
  return [...ary, x];

}

function spreadFunctionCallArguments () {

  var ary = [1, 2, 3];
  var add = (a, b, c) => a + b + c;
  return add(...ary);

}

function spreadMathMin () {

  var ary = [151, 22, 39, 44];
  return Math.min(...ary);

}

function spreadMathMax () {

  var ary = [151, 22, 39, 44];
  return Math.max(...ary);

}

function spreadCombineObjects () {

  var obj1 = {name1: "joe", age1: 2};
  var obj2 = {name2: "jane", age2: 42};
  var obj3 = {name3: "molly", age3: 22};

  return  {...obj1, ...obj2, ...obj3}

}
//SO
//RO
/*  Write code to illustrate the use of the rest operator
*   a. In a destructuring assignment
*   b. In a function call
*/
//RO
function restDestructuringAssignment () {

  var ary = [1, 2, 3, 4, 5];
  var [a, b, c, d, e] = [...ary];

  return a + b + c + d + e;
}

function restFunctionDeclaration () {

  var max = function (...arg) {
    return Math.max(...arg);
  }

  return max(111, 212, 13, 144, 315);
  
}
//RO
//FTS
/* Fibonacci Sequences
*  Test of with and Without Memorization Technique
*/
//FTS
// eslint-disable-next-line no-unused-vars
function fibonacciTest (n, memOn) {

  var alreadyCalculated = [];

  var calFib = function(no) {
    
    if (memOn) if (alreadyCalculated[no]) return alreadyCalculated[no];

    if (no <= 1) {
      return no;
    } else {
      var a1 = calFib(no - 1);
      if (!alreadyCalculated[no - 1]) alreadyCalculated[no - 1] = a1;
      var a2 = calFib(no - 2);
      if (!alreadyCalculated[no - 2]) alreadyCalculated[no - 2] = a2;
      return a1 + a2;
    }
  };
  
  var start = Date.now();
  var fib = calFib(n);
  var end = Date.now();

  return fib + " in " + (end - start) + " ms";

}
//FTS