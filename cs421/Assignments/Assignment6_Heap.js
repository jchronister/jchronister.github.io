/* eslint-disable require-jsdoc */
/* eslint-disable id-length */
"use strict";

/*global getTree Print EulerTour*/

function printTree() {// eslint-disable-line no-unused-vars
  let tree = getTree();
  let printer = new Print();
  return printer.print(tree, "return");
}

//FTH//FTH
function findTreeHeight(tree) {

  if(tree.isEmpty()) return 0;

  // Get Position
  let p = arguments[1] === undefined ? tree.root() : arguments[1];

  if(tree.isExternal(p)) return 0;

  let leftH = findTreeHeight(tree, tree.leftChild(p));
  let rightH = findTreeHeight(tree, tree.rightChild(p));

  return Math.max(leftH, rightH) + 1;

}

function callFindTreeHeight() {// eslint-disable-line no-unused-vars

    let tree = getTree();
    return findTreeHeight(tree);

}
//FTH
//FTHET
//FTHET
function eulerTourTreeHeight(binaryTree) {// eslint-disable-line no-unused-vars

  class TreeHeight extends EulerTour {
    
    visitExternal(T, p, result) {
      result[1] = 0;
    } 
    visitPostOrder(T, p, result) {
      result[1] = Math.max(result[0], result[2]) + 1;
    } 

  }

  let tree = binaryTree || getTree();
  if (tree.isEmpty()) return 0;

  return new TreeHeight().eulerTour(tree, tree.root());

}
//FTHET
//GHK
//GHK
function getHeapKeysLessEqualtoKey(heap, key) {

  let p = arguments[2] || 1;
  let ary = arguments[3] || [];

  if (p >= heap.size() || heap.key(p) > key) return ary;

  ary.push(heap.key(p));

  getHeapKeysLessEqualtoKey(heap, key, 2*p, ary);
  getHeapKeysLessEqualtoKey(heap, key, 2*p + 1, ary);

  return ary;

}


function callGetHeapKeysLessEqualtoKey(key) {// eslint-disable-line no-unused-vars

  let fakeHeap = [null, 4, 5, 6, 15, 7, 8, 20, 16, 25, 10, 12, 11, 9, 23, 27];

  fakeHeap.key = function(n){return this[n];};
  fakeHeap.size = function(){return this.length;};

  return getHeapKeysLessEqualtoKey(fakeHeap, key);

}
//GHK