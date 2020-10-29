/* eslint-disable require-jsdoc */
/* eslint-disable id-length */
"use strict";

/*global DLinkedList*/


// eslint-disable-next-line no-unused-vars
var log = console.log;
// eslint-disable-next-line no-redeclare
if (typeof alert === "undefined") var alert = console.log;
// eslint-disable-next-line no-undef, no-redeclare
if (typeof prompt === "undefined") var prompt = require("prompt-sync")();



//FME
/** Get Middle Element on Linked List. For Even Number Elements Returns
 *  One Closest to End
 * @param  {Object} list Linked List
 * @returns {Object} Middle Element
 */
//FME
function findMiddle (list) {

  if (list.isEmpty()) return 0;

  let start = list.first();
  let end = list.last();

  do {

    // Exit for Odd Number Nodes
    if (start === end) return start;

    // Exit for Even Number Nodes
    start = list.after(start);
    if (start === end) return end;

    end = list.before(end);

  } while (!list.isLast(start));

}

function testFindMiddle () {// eslint-disable-line no-unused-vars
  
  let list = new DLinkedList();
  for (let i = 0; i <= 5; i++) {list.insertLast(i);}
  
  // Even Elements
  list.print();
  log("return for even",findMiddle(list));
  
  // Log Odd Element
  list.remove(list.last()); log("Remove Last Element");
  list.print();
  log("return for odd",findMiddle(list));

  return "See Console for Output";
  
}
//FME
//LLS
/** Implement a new Stack class in JavaScript based on (using) the DLinkedList
 *  class. Push & Pop.
*/
//LLS
class Stack extends DLinkedList {

  push (elmt) {
    this.insertLast(elmt);
    return this;
  }

  pop () {
    let elmt = this.last();
    this.remove(elmt);
    return elmt.element();
  }
}

function testStack () {// eslint-disable-line no-unused-vars

  let list = new Stack();
  for (let i = 0; i <= 5; i++) {
    list.push(i);
  }

  list.print();
  list.push("7A"); log("Push '7A'");
  list.print();
  log("Pop", list.pop());
  list.print();
  log("Pop", list.pop());
  list.print();

  return "See Console for Output";

} 
//LLS
//LLQ
/**
*  Implement a new Queue class in JavaScript based on the
*  DLinkedList class - enqueue() and dequeue() methods
*/
//LLQ
class Queue extends DLinkedList { 

  enqueue (elmt) {
    this.insertLast(elmt);
    return this;
  }

  dequeue () {
    let elmt = this.first();
    this.remove(elmt);
    return elmt.element();
  }

}

function testQueue () {// eslint-disable-line no-unused-vars
  
  let list = new Queue();
  for (let i = 0; i <= 5; i++) {
    list.enqueue(i);
  }

  list.print();
  list.enqueue("7A"); log("Enqueue '7A'");
  list.print();
  log(list.dequeue());
  list.print();
  log(list.dequeue());
  list.print();

  return "See Console for Output";

}
//LLQ
//LQS
/** implement the queue ADT using two stacks.
*/
//LQS
class QueueStack extends Stack { 

  enqueue(elmt) {

    let temp = new Stack();

    // Move All to Temporary Stack
    while (this.size() > 0) {
      temp.push(this.pop());
    }

    // Add New Element
    this.push(elmt);

    // Move All Off Temporary Stack
    while (temp.size() > 0) {
      this.push(temp.pop());
    }

    return this;
    
  }

  dequeue () {
    return this.pop();
  }

}

function testQueueStack() {// eslint-disable-line no-unused-vars

  let list = new QueueStack();

  for (let i = 0; i <= 5; i++) {list.enqueue(i);}
  
  list.print();
  list.enqueue("7A"); log("Enqueue '7A'");
  list.print();
  list.enqueue("7B"); log("Enqueue '7B'");
  list.print();
  log("dequeue", list.dequeue());
  list.print();
  log("dequeue", list.dequeue());
  list.print();

  return "See Console for Output";

}
//LQS