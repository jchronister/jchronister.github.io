/* eslint-disable require-jsdoc */
/* eslint-disable id-length */
"use strict";

/*global Sequence */

// var $ = require("./Sequence.js");

// eslint-disable-next-line no-unused-vars
var log = console.log;
// eslint-disable-next-line no-redeclare
if (typeof alert === "undefined") var alert = console.log;
// eslint-disable-next-line no-undef, no-redeclare
if (typeof prompt === "undefined") var prompt = require("prompt-sync")();

function generateRandomList(n, ary) {

  let random = function randomInteger(min,max) {// eslint-disable-line no-unused-vars
    return Math.ceil(Math.random() * (max - (min - 1)) + (min - 1));
  };

  let list = new Sequence (n);
  let max = ary.length - 1;
  
  for (var i = 0; i < n; ++i) {
    list.insertLast(ary[random(0, max)]);
  }
  return list;
}

//RD
//RD
function removeDuplicates(list) {

  // Remove Duplicate p in list where element = match
  let rmvDuplicates = function (list, p, match) {

    if (!list.isLast(p)) var next = list.after(p);
    if (p.element() === match) list.remove(p);
    if (next) rmvDuplicates(list, next, match);

  };

  // Return on Empty Array
  if (list.isEmpty()) return;

  var i = list.first();

  while (true) { // eslint-disable-line no-constant-condition

    // Get Element to Check
    var compare = list.after(i);
    var elmtI = i.element();

    rmvDuplicates(list, compare, elmtI);

    if (list.isLast(i)) return list;
    i = list.after(i);
  }
    
}
 
function callRemoveDuplicates() {// eslint-disable-line no-unused-vars

  let list = new Sequence (25);

  for(let i = 0; i < 10; ++i){
    list.insertLast(i);
    list.insertFirst(i); 
  }

  list.print();
  removeDuplicates(list);
  list.print();
  return "See Console for Output";
}
//RD
//IP
//IP
function isPermutation(listA, listB) {

  // Finds and Removes search Item from list
  let exists = function (list, search) {

    let i = list.first();

    while (true) {// eslint-disable-line no-constant-condition

      // Check for Match and Remove
      if (i.element() === search) {
        list.swapElements(i, list.last()); // Speedup for Sequence Removal
        list.remove(list.last());
        return true;
      }

      if(list.isLast(i)) return false;

      i = list.after(i);

    }

  };

  if (listA.size() !== listB.size()) return false;

  // Make Copy of B to Remove Items
  let bItems = new Sequence(listB.size());
  let iter = listB.iterator();
  while (iter.hasNext()) {
    bItems.insertLast(iter.nextObject());
  }

  // Loop Through List A and Compare to List B
  iter = listA.iterator();
  while (iter.hasNext()) {

    // Get and Compare for Match
    if (!exists(bItems, iter.nextObject())) return false;

  }

  // All Matches
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
  log(isPermutation (listA,listB));

  listA.insertLast(3);
  listB.insertLast(4);
  listA.print(),listB.print();
  log(isPermutation (listA,listB));

  return "See Console for Output";
}
//IP
//S2C
/*  An in-place algorithm sortRB(L) that places all red objects in 
*   list L before the blue colored objects.
*/
//S2C
function swap2Colors (list) {

  // Return on Empty or 1 Element
  if (list.size() < 2) return;

  let s = list.first();
  let e = list.last();

  do {

    if (s.element() === "R") {
      s = list.after(s);
    } else {
      list.swapElements(s,e);
      e = list.before(e);
    }
  } while (s !== e);

  return list;
}

function callSwap2Colors(){// eslint-disable-line no-unused-vars

  let list = generateRandomList(10, ["R","B"]);

  let input = list.print("return");
  return "\nInput: " + input + "\n" + "Output: " + swap2Colors(list).print("return");
} 
//S2C
//S3C
//S3C
function swap3Colors (list) { 

  // Return on Empty or 1 Element
  if (list.size() < 2) return;

  let i = list.first();
  let r = list.first();
  let g = list.last();
  let notAtMiddle = true;

  do {

    if (i === g) notAtMiddle = false;

    if (i.element() === "G") {

      list.swapElements(i, g);
      if (notAtMiddle) g = list.before(g);
 
    } else {

      if (i.element() === "R") {
        list.swapElements(i, r);
        r = list.after(r);
      }

      if (notAtMiddle) i = list.after(i);
  
    }
        
        
  } while (notAtMiddle);

  return list;
}

function callSwap3Colors(){// eslint-disable-line no-unused-vars

  let list = generateRandomList(15, ["R","B","G"]);

  let input = list.print("return");
  return "\nInput: " + input + "\n" + "Output: " + swap3Colors(list).print("return");
}
//S3C