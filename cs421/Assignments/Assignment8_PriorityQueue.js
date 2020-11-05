/* eslint-disable require-jsdoc */
/* eslint-disable id-length */
"use strict";

/*global PriorityQueue Item Sequence*/





function makeRandomItems(n) {

  let random = function randomInteger(min,max) {// eslint-disable-line no-unused-vars
    return Math.ceil(Math.random() * (max - (min - 1)) + (min - 1));
  };

  let retrn = [];

  for (var i = 0; i < n; i++) {
    let num = random(1, 100);
    retrn.push([num, "Element " + num]);
  }

  return retrn;

}


//PQ//PQ
function priorityqueue (n) {// eslint-disable-line no-unused-vars
    
  let que = new PriorityQueue(Item.prototype.compare);

  // Add Items
  let items = makeRandomItems(n);
  items.forEach(n=>que.insertItem(n[0], n[1]));

  // Log Objects
  console.log(items);
  console.log(que);

  // Test Methods
  console.log("Size '" + que.size() + "' should equal '" + items.length + "' which is " + (que.size() === items.length));
  let minKey =  que.minKey();
  let minEl = que.minElement();
  let minObj = que.removeMin();
  console.log("Min Key '" + minKey + "' should equal '" + minObj.key() + "' which is " + (minKey === minObj.key()));
  console.log("Min Element '" + minEl + "' should equal '" + minObj. element() + "' which is " + (minEl === minObj.element()));
  console.log("Removed Item" , minObj);
  console.log("IsEmpty = '" + que.isEmpty()  + "' should be '" + (items.length === 0) + "' which is " + (que.isEmpty() === (items.length === 0)));
  return "See Console for Output";
}
//PQ
//PQS//PQS
function priorityQueueSort(n) {// eslint-disable-line no-unused-vars

  let sorted = [];

  let que = new PriorityQueue(Item.prototype.compare);

  let items = makeRandomItems(n);
  items.forEach(n=>que.insertItem(n[0], n[1]));

  console.log(items);

  while (!que.isEmpty()) {
    sorted.push(que.removeMin());
  }

  console.log(sorted);

  return "See Console for Output";
}
//PQS
//CS//CS
function compareSequences(seqA, seqB, compare) {// eslint-disable-line no-unused-vars

  if (seqA.size() !== seqB.size()) return false;

  // Create Priority Que Function
  let createPQ = function (seq) {

    let que = new PriorityQueue(compare);

    for (var i = seq.size() - 1; i >=0; --i){
      que.insertItem(seq.elemAtRank(i));
    }
    return que;
  };

  // Create Priority Ques
  let a = createPQ(seqA);
  let b = createPQ(seqB);

  // Pull Out and Compare Each Item
  while (!a.isEmpty()) {
    if (compare(a.removeMin(),b.removeMin()) !== 0) return false;
  }

  return true;

}

function callCompareSequences() {// eslint-disable-line no-unused-vars

  // Create & Fill Sequences
  let random = makeRandomItems(10);

  let a = new Sequence();
  let b = new Sequence();
  
  random.forEach(function(n){
    a.insertLast(n[0]);
    b.insertFirst(n[0]);
  });

  a.print();
  b.print();
  console.log(compareSequences(a, b, Item.prototype.compare));

  b.replaceAtRank(5, 150);
  a.print();
  b.print();
  console.log(compareSequences(a, b, Item.prototype.compare));

  return "See Console for Output";
}
//CS