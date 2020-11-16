/* eslint-disable require-jsdoc */
/* eslint-disable id-length */
"use strict";

/* global List Sequence PriorityQueue Item EulerTour getTree Print BinaryTree HT_Dictionary*/

//RDLS//RDLS
function removeDuplicates (listorSequence) {

  if (listorSequence.isEmpty()) return listorSequence;

  var pq = new PriorityQueue(Item.prototype.compare);
  var p = listorSequence.first();

  // Select Return
  if (listorSequence instanceof List) {
    var retrn = new List();
  } else {
    retrn = new Sequence();
  }

  // Fill Priority Que
  pq.insertItem(p.element(), p.element());
  while (!listorSequence.isLast(p)) {
    p = listorSequence.after(p);
    pq.insertItem(p.element(), p.element());
  }

  while (!pq.isEmpty()){

    var add = pq.removeMin();

    if (add !== last) {      
      retrn.insertLast(add);
      var last = add;
    }
  }

  return retrn.print("return")  ;

}

function callRemoveDuplicates() {// eslint-disable-line no-unused-vars

  let list = new List();
  for (var i = 0; i < 10; i++) {
    list.insertLast(i); list.insertLast(i);
  }

  return removeDuplicates(list);

}
//RDLS
//FM1P//FM1P
function findMax1Pass(list) {

  var ary = [-Infinity, -Infinity];

  let calVal = function (val, array) {
    if (val >= array[0]) {
      if (val !== array[0]) if (array[0] > array[1]) array[1] = array[0];
      array[0] = val;
    } else if (val >= array[1]) {
      array[1] = val;
    }
  };

  let findMax = function (list, p, arry) {

    calVal(p.element(), arry);

    if (list.isLast(p)) return;

    return findMax(list, list.after(p), arry);

  };

  if (list.isEmpty()) return [];

  findMax(list, list.first(), ary);

  if (ary[0] > ary[1]) {
    return ary;
  } else {
    return [ary[1], ary[0]];
  }

}

function callFindMax1Pass() {// eslint-disable-line no-unused-vars

  var list = new List();
  var rnd = [];
  var retrn = [];

  let random = function randomInteger(min,max) {// eslint-disable-line no-unused-vars
    return Math.ceil(Math.random() * (max - (min - 1)) + (min - 1));
  };

  for (var i = 0; i < 10; i++) {
    var rand = random(0, 1000);
    list.insertLast(rand);list.insertLast(rand);
    rnd.push(rand);
  }
console.log(list.print())

  rnd.sort((a,b)=>b-a);
  
  retrn[0] = rnd[0];
  i = 0;
  while (retrn[0] === rnd[i]) {
    i += 1;
  }
  retrn.push(rnd[i]);

  
  return JSON.stringify(findMax1Pass(list)) + " Should Equal " + JSON.stringify(retrn);

}//FM1P

function findMax2Pass(list) {

  let getVal = function (val, lessThan) {
    if (val < lessThan) {
      return val;
    } else {
      return -Infinity;
    }
  };

  let findMax = function (list, p, lessThan) {

    if (list.isLast(p)) return getVal(p.element(), lessThan);

    var check = findMax(list, list.after(p), lessThan);
    var cur = getVal(p.element(), lessThan);

    if (check > cur) {
      return check;
    } else {
      return cur;
    }
  };

  if (list.isEmpty()) return [];
  let m1 = findMax(list, list.first(),Infinity);
  let m2 = findMax(list, list.first(),m1);

  return [m1, m2];


}
//ISS//ISS
function isSubset(seqA, seqB) {

  let a = new PriorityQueue(Item.prototype.compare);
  let b = new PriorityQueue(Item.prototype.compare);


  // Put seqA in Priority Queue
  let iter = seqA.iterator();
  while (iter.hasNext()) {
    let el = iter.nextObject();
    a.insertItem(el, el);
  }

  // Put seqB in Priority Queue
  iter = seqB.iterator();
  while (iter.hasNext()) {
    let el = iter.nextObject();
    b.insertItem(el, el);
  } 

  while (!a.isEmpty() && !b.isEmpty()) {
    let aKey = a.minKey();
    let bKey = b.minKey();

    if (bKey < aKey) {
      b.removeMin();
    } else if (bKey === aKey) {
      b.removeMin();
      a.removeMin();
    } else {
      // aKey > bKey
      return false;
    }

  }
  return a.isEmpty();
}

function callIsSubset(aryCheck) {// eslint-disable-line no-unused-vars

  let a = new Sequence();
  let b = new Sequence();

  let a1 = aryCheck;
  let b1 = [50, 25, 6, 1,2, 8, 2, 1, 13,3,4,5];
  
  a1.forEach(n=>a.insertLast(n));
  b1.forEach(n=>b.insertLast(n));

  return isSubset(a, b);

}
//ISS
//FME//FME
function findMinElement() {// eslint-disable-line no-unused-vars

  class FindMinElement extends EulerTour {
      
    visitExternal(T, p, result) {
      result[1] = null;
    } 

    visitPostOrder(T, p, result) {
      result[1] = p;
      if (result[0] !== null){
        if (result[0].element() < result[1].element()) result[1] = result[0];
      }

      if (result[2] !== null){
        if (result[2].element() < result[1].element()) result[1] = result[2];
      }

    }

  }

  let tree = getTree();

  console.log((new FindMinElement).eulerTour(tree, tree.root()));
  return "See Console for Output";
}
//FME
//FTE//FTE
function findTreeElement(el) {// eslint-disable-line no-unused-vars

  class FindTreeElement extends EulerTour {
      
    visitExternal(T, p, result) {
      result[1] = null;
    } 

    visitPostOrder(T, p, result) {

      if (p.element() === T.el) {
          result[1] = p;
      } else if (result[0] !== null) {
          result[1] = result[0];
      } else if (result[2] !== null) {
          result[1] = result[2];
      } else {
        result[1] = null; // !== p.element();
      }

    }

  }

  let tree = getTree();

  tree.el = el;

  console.log((new FindTreeElement).eulerTour(tree, tree.root()));
  return "See Console for Output";
}
function printTree() {// eslint-disable-line no-unused-vars
  var printer = new Print();
  printer.print(getTree());
}
//FTE
//VAVL//VAVL
function isValidAVLTree(tree) {

  if (tree.isEmpty()) return true;

  var validTree = function (t, p) {

    // 0 Height for External Node
    if (t.isExternal(p)) return 0;

    var hL = validTree(t, t.leftChild(p));
    var hR = validTree(t, t.rightChild(p));

    // Skip Check if Children Failed Height Check
    if(hL === false || hR === false) return false;

    // Check if AVL Tree: Height +/- 1 for Each Child
    if ((hL >= (hR - 1)) && (hL <= (hR + 1))){
      if (t.isRoot(p)) {
        // Whole Tree Checked
        return true;
      } else {
        // Subtree Children Valid AVL - Return Current Node Height
        return Math.max(hL, hR) + 1;
      }
    } else {
      return false;
    }
  };

  return validTree(tree, tree.root());

}

function callisValidAVLTree(ary) {// eslint-disable-line no-unused-vars

  // let tree = getTree();
  if (ary.length < 2) return "Bad Tree: " + JSON.stringify(ary);

  var tree = new BinaryTree();
  var printer = new Print();
  var pos = [null];
  ary.unshift(null);

  pos[1] = tree.insertRoot(ary[1]);

  var l = 1;
  while (l < ary.length) {

    let lf = l * 2;
    if (lf >= ary.length) break;
    if (ary[lf] !== "null") pos[lf] = tree.insertLeft(pos[lf / 2], ary[lf]);

    let rt = l * 2 + 1;
    if (rt >= ary.length) break;
    if (ary[rt] !== "null") pos[rt] = tree.insertRight(pos[(rt - 1) / 2], ary[rt]);
    l += 1;
  }

  // Create Tree Input Values
  // root, r LeftChild, r RightChild, r LC LC, r LC RC, r RC LC r RC RC
  // null to Skip

  return printer.print(tree, "return") + "\n" + isValidAVLTree(tree);

}//VAVL

//IPD//IPD
function isPermutation(seqA, seqB) {

  if (seqA.size() !== seqB.size()) return false;

  var a = new HT_Dictionary();
  var b = new HT_Dictionary();

  let fill = function(d, seq) {

    var iter = seq.iterator();

    while (iter.hasNext()) {

      var el = iter.nextObject();
      var val = d.findElement(el);

      // No Key
      if (val === null) val = 0;
      
      val += 1;
      d.insertItem(el, val);

    }
  };

  // Fill Dictionaries with Sequence Data
  fill(a, seqA);
  fill(b, seqB);

  var iter = a.iterator();

  while (iter.hasNext()) {
    var obj = iter.nextObject();
    var el = obj.element();
    var key = obj.key();

    var check = b.findElement(key);

    // No Match
    if (check !== el) return false;

  }

  // All Matched
  return true;

}

function callIsPermutation () {// eslint-disable-line no-unused-vars

  let listA = new Sequence (7);
  let listB = new Sequence (7);

  listA.insertLast(4);
  listA.insertLast(3);
  listA.insertLast(1);
  listA.insertLast(1);
  listA.insertLast(2);

  listB.insertLast(2);
  listB.insertLast(3);
  listB.insertLast(1);
  listB.insertLast(1);
  listB.insertLast(4);
  listA.print(),listB.print();
  console.log(isPermutation (listA,listB));

  listA.insertLast(3);
  listB.insertLast(4);
  listA.print(),listB.print();
  console.log(isPermutation (listA,listB));

  return "See Console for Output";
  
}

//IPD