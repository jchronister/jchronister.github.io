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


function removeDuplicates(list) {

  // Return on Empty Array
  if (list.isEmpty()) return;

  var i = list.first();

  while (true) { // eslint-disable-line no-constant-condition

    // Get Element to Check
    var compare = list.after(i);
    var elmtI = i.element();

    // Check Rest of Array
    while (true) {// eslint-disable-line no-constant-condition

      // Remove Matches
      if (compare.element() == elmtI) {  
        var rmv = compare;
        compare = list.before(compare);
        list.remove(rmv);
      }

      if (list.isLast(compare)) break;
      compare = list.after(compare);//I dot like this line?
    }
    
    if (list.isLast(i)) return list;
    i = list.after(i);
  }
    
}
 

function testRemoveDuplicates() {// eslint-disable-line no-unused-vars

  let list = new Sequence (25);

  for(let i = 0; i < 10; ++i){
    list.insertLast(i);
     list.insertFirst(i);

  }


  list.print();
  removeDuplicates(list);
  list.print();
}


function isPermutation(listA, listB) {

  // Finds and Removes search Item from list
  let exists = function (list, search) {

    let i = list.first();

    while (true) {// eslint-disable-line no-constant-condition

      // Check for Match and Remove
      if (i.element() === search) {
        list.last();
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
    var elA = iter.nextObject();
    if (!exists(bItems, elA)) return false;

  }

  // All Matches
  return true;

}


function testIsPermutation () {

  let listA = new $.Sequence (5);
  let listB = new $.Sequence (5);


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

  log(isPermutation (listA,listB));
}

