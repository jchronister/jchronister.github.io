/* eslint-disable require-jsdoc */
/* eslint-disable id-length */
"use strict";

/* global List Sequence PriorityQueue Item*/

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

function callRemoveDuplicates() {

  let list = new List();
  for (var i = 0; i < 10; i++) {
    list.insertLast(i); list.insertLast(i);
  }

  return removeDuplicates(list);

}
//RDLS