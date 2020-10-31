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
class Stack {

  constructor () {
    this._list = new DLinkedList();
  }

  push (elmt) {
    this._list.insertLast(elmt);
    return this._list;
  }

  pop () {
    let elmt = this._list.last();
    this._list.remove(elmt);
    return elmt.element();
  }

  print () {
    this._list.print();
  }

  isEmpty () {
    return this._list.isEmpty();
  }

  size () {
    return this._list.size();
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
class Queue { 

  constructor () {
    this._list = new DLinkedList();
  }

  enqueue (elmt) {
    this._list.insertLast(elmt);
    return this._list;
  }

  dequeue () {
    let elmt = this._list.first();
    this._list.remove(elmt);
    return elmt.element();
  }

  print () {
    this._list.print();
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
  log("dequeue", list.dequeue());
  list.print();
  log("dequeue", list.dequeue());
  list.print();

  return "See Console for Output";

}
//LLQ
//LQS
/** implement the queue ADT using two stacks.
*/
//LQS
class QueueStack { 

  constructor () {
    this._listI = new Stack();
    this._listO = new Stack();
  }

  enqueue(elmt) {

    // Add New Element
    this._listI.push(elmt);
    return this._listI;
    
  }

  dequeue () {

    // If Empty Fill From Incoming Stack
    if (this._listO.isEmpty()) {

      if (this._listI.size() === 0) throw "No Items in Queue";
    
      while (!this._listI.isEmpty()) {
        this._listO.push(this._listI.pop());
      }

    }

    return this._listO.pop();

  }

  print () {
    this._listI.print();
    this._listO.print();
  }

  size () {
    return this._listI.size() + this._listO.size();
  }

  isEmpty () {
    return this.size() === 0;
  }

}

function testQueueStack() {// eslint-disable-line no-unused-vars

  let list = new QueueStack();

  log("Empty", list.isEmpty());
  for (let i = 0; i <= 0; i++) {list.enqueue(i);}
 
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