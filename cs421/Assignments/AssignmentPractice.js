/* eslint-disable require-jsdoc */
/* eslint-disable id-length */
"use strict";

/* global List RedBlackTree maxPriorityQueue Sequence PriorityQueue Item EulerTour getTree Print BinaryTree HT_Dictionary*/

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
      // Check is 2nd Largest Value is in Array
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

  rnd.sort((a,b)=>b-a);
  
  retrn[0] = rnd[0];
  i = 0;
  while (retrn[0] === rnd[i]) {
    i += 1;
  }
  retrn.push(rnd[i]);

  
  return JSON.stringify(findMax1Pass(list)) + " Should Equal " + JSON.stringify(retrn);

}//FM1P

function findMax2Pass(list) {// eslint-disable-line no-unused-vars

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

  // if (tree.isEmpty()) return true;

  // var validTree = function (t, p) {

  //   // 0 Height for External Node
  //   if (t.isExternal(p)) return 0;

  //   var hL = validTree(t, t.leftChild(p));
  //   var hR = validTree(t, t.rightChild(p));

  //   // Skip Check if Children Failed Height Check
  //   if(hL === false || hR === false) return false;

  //   // Check if AVL Tree: Height +/- 1 for Each Child
  //   if ((hL >= (hR - 1)) && (hL <= (hR + 1))){
  //     if (t.isRoot(p)) {
  //       // Whole Tree Checked
  //       return true;
  //     } else {
  //       // Subtree Children Valid AVL - Return Current Node Height
  //       return Math.max(hL, hR) + 1;
  //     }
  //   } else {
  //     return false;
  //   }
  // };

  // return validTree(tree, tree.root());

   if (tree.isEmpty()) return true;

  var validTree = function (t, p) {

    // 0 Height for External Node
    if (t.isExternal(p)) return 0;

    var hL = validTree(t, t.leftChild(p));
    var hR = validTree(t, t.rightChild(p));

    // Check if AVL Tree: Height +/- 1 for Each Child
    if (Math.abs(hL - hR) <= 1){
        return Math.max(hL, hR) + 1;
    } else {
      return -1;
    }
  };

  var r = validTree(tree, tree.root());
  if (r < 0) {
    return false;
  } else {
    return true;
  }
}

function callisValidAVLTree(ary) {// eslint-disable-line no-unused-vars

  // let tree = getTree();
  if (ary.length < 2) return "Bad Tree: " + JSON.stringify(ary);

  var tree = new BinaryTree();
  // var printer = new Print();
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

  // return printer.print(tree, "return") + "\n" + isValidAVLTree(tree);
  return  isValidAVLTree(tree);
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

//FXL//FXL  
function findXLargest(seqOrList, xLargest) {

  if (seqOrList.isEmpty()) return null;
  let p = seqOrList.first();

  let pq = new maxPriorityQueue();

  // Fill Priority Queue from Sequence or List
  pq.insertItem(p.element(),p.element());
  while (!seqOrList.isLast(p)) {
    p = seqOrList.after(p);
    var el = p.element();
    pq.insertItem(el, el);
  }

  // Find X Largest
  var cnt = 0;
  while (!pq.isEmpty()) {
    var num = pq.removeMin(); // Really Max
    if (num !== last) {
      cnt += 1;
      if (cnt === xLargest) return num;
    }
    var last = num;
  }

  return null; // No X Largest

}

function callFindXLargest(xLargest) {// eslint-disable-line no-unused-vars

  let seq = new Sequence();

  seq.insertLast(50);
  seq.insertLast(40);
  seq.insertLast(30);
  seq.insertLast(20);
  seq.insertLast(70);
  seq.insertLast(90);

  return findXLargest(seq, xLargest);

}
//FXL
//O3C//O3C
function moveToFront(seqOrList, startP, element, cnt){

  let e = seqOrList.last();
  let y = 0;
  cnt = cnt || Infinity;

  while (startP != e ){

    while(startP != e && startP.element() === element) {
      
      startP = seqOrList.after(startP);
      y+=1;
      if (y >= cnt) return [startP, 1];
    }

    while(startP != e && e.element() !== element) {
      e = seqOrList.before(e);
    }

 
    if (startP != e) {
      seqOrList.swapElements(startP, e);
      // y += 1;
      // if (y >= cnt) return seqOrList.after(startP)
    }
  }

  return [startP, null];

}


function sortColors(){// eslint-disable-line no-unused-vars

  let seq = new Sequence();

  seq.insertLast("Y");
  seq.insertLast("P");
  seq.insertLast("E");
  seq.insertLast("B");
  seq.insertLast("M");
  seq.insertLast("J");
  seq.insertLast("J");
  seq.insertLast("R");
  seq.insertLast("E");

  let p = seq.first();

  p = moveToFront(seq, p, "J", 1);
  p = moveToFront(seq, p[0], "E", 1);
  p = moveToFront(seq, p[0], "R", 1);
  p = moveToFront(seq, p[0], "E", 1);
  p = moveToFront(seq, p[0], "M", 1);
  p = moveToFront(seq, p[0], "Y", 1);

  p = moveToFront(seq, p[0], "?", 1);
if(p[1] === null) {
p = p[0];
  while (!seq.isLast(p)){
    let o = seq.after(p);
    seq.remove(p);
    p = o;
  }
  seq.remove(p);

}
  return seq.print("return");

}



//O3C

//FFS//FFS
function find1stSmallest (n) {// eslint-disable-line no-unused-vars

let tree = new RedBlackTree();


for (var i = 0; i <= 50 ; i+=5){
tree.insertItem(i, i);
}

let node = (findN(tree, tree.root(), n));




// Nothing Less
if (tree.leftChild(node) === null) {
  
  n = node;
  do {
    var v = n;
    n = tree.parent(v);
  } while (tree.leftChild(n) === v);
  
  // node = n;
}
  
if (node === tree.rightChild(n)) return n.element();


while (tree.rightChild(node) !== null) {
  node = tree.rightChild(node);
}

  return node.element();


}

function findN (tree, p, n) {

  if (tree.isExternal(p)){
    return null;
  }

  if (p.element().element() === n) return p;

  let l = findN(tree, tree.leftChild(p), n);

  if (l !== null) return l;

  return findN(tree, tree.rightChild(p), n);


}//FFS
//FERB//FERB
var cnt = 0;
function findElinRBTree(tree, p, val) {
  cnt+=1;
  if (tree.isExternal(p)) return null;

  var cur = p.element().key();

  if (cur === val) {
    return p;
  } else if (val < cur) {
    var r = findElinRBTree(tree, tree.leftChild(p), val);
  } else {
    r = findElinRBTree(tree, tree.rightChild(p), val);
  }

  return r;

}

function callfindElinRBTree() {// eslint-disable-line no-unused-vars

  let tree = new RedBlackTree();


  for (var i = 0; i <= 50 ; i+=5){
    tree.insertItem(i, i);
  }
  var r = findElinRBTree(tree, tree.root(), 0);
  // if (r !== null)  r = r.element()
  return r === null ? r :  JSON.stringify(r.element()) + " Calls: " + cnt;

}
//FERB

//IVRB//IVRB.
var yhu =0
function isValidRBT(tree, p) {
  yhu+=1
  if (tree.isExternal(p)) return 0;
 

  if (p !== tree.root()) {

    if (tree.isRed(p)) {
      var h = 0;
      if (tree.isRed(tree.parent(p))) return -1;
    } else {
      h = 1;
    }
  }

  var lH = isValidRBT(tree, tree.leftChild(p));
// if (lH < 0) return lH
  var lR = isValidRBT(tree, tree.rightChild(p));

  if (lH === lR) {
    return lH + h;
  } else {
    return -1;
  }


}


function callisValidRBT() {// eslint-disable-line no-unused-vars

  var rb = new RedBlackTree();

  for(var i = 0; i <= 50; i+=5) {
    rb.insertItem(i,i);
  }
// debugger

var p = findElinRBTree(rb, rb.root(),50);

p._color = 1;

  var r = isValidRBT(rb, rb.root());
  console.log(yhu)
  if (r < 0) {
    return false;
  } else {
    return true;
  }


}//IVRB
function reverseOrder(){

  let list = new List();

  for(var i = 0; i <= 15; i++) {
    list.insertLast(i);
  }

  let reverse = function (list,p) {

    if (!list.isLast(p)) reverse(list,list.after(p));

    console.log(p.element());
  };

  reverse(list, list.first());

}