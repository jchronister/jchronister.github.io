/* eslint-disable require-jsdoc */
/* eslint-disable id-length */
"use strict";

// eslint-disable-next-line no-unused-vars
var log = console.log;
// eslint-disable-next-line no-redeclare
if (typeof alert === "undefined") var alert = console.log;
// eslint-disable-next-line no-undef, no-redeclare
if (typeof prompt === "undefined") var prompt = require("prompt-sync")();

//MD//MD
/** Return Array of Object Property Values
 * @param  {Array} objAry - Array of Objects
 * @param  {String} key - Object Property
 * @returns {Array} Object Property Array
 */
function mapObj(objAry, key) {
  return objAry.map(n => n[key]);
}

// eslint-disable-next-line require-jsdoc,no-unused-vars
function mapDouble(ary, objKey) {
  if(objKey) ary = mapObj(ary, objKey);
  return ary.map(n => n*2);
}
//MD
//FAE//FAE
// eslint-disable-next-line require-jsdoc,no-unused-vars
function filterAllEvens (ary, objKey) {
  if(objKey) ary = mapObj(ary, objKey);
  return ary.filter(n => n % 2 === 0);
}
//FAE
//FAG10//FAG10
// eslint-disable-next-line require-jsdoc,no-unused-vars
function filterAgeGT10 (ary, objKey) {
  if(objKey) ary = mapObj(ary, objKey);
  return ary.filter(n => n > 10);
}
//FAG10
//FEIE//FEIE
// eslint-disable-next-line require-jsdoc,no-unused-vars
function findEven (ary, objKey) {
  if(objKey) ary = mapObj(ary, objKey);
  return ary.find(n => n % 2 === 0);
}

// eslint-disable-next-line require-jsdoc,no-unused-vars
function includesEven (ary, objKey) {
  if(objKey) ary = mapObj(ary, objKey);
  return ary.map(n => n % 2).includes(0);
}
//FEIE
//FG10IG10//FG10IG10
// eslint-disable-next-line require-jsdoc,no-unused-vars
function findGT10 (ary, objKey) {
  if(objKey) ary = mapObj(ary, objKey);
  return ary.find(n => n > 10);
}

// eslint-disable-next-line require-jsdoc,no-unused-vars
function includesGT10 (ary, objKey) {
  if(objKey) ary = mapObj(ary, objKey);
  return ary.map(n => n > 10).includes(true);
}
//FG10IG10
//RTS//RTS
/** Sum Items in Ary
 * @param  {Array} ary Array of Number or Object with Number Properties
 * @param  {String} objKey Optional Key for Array of Objects
 * @returns {Number} Sum
 */
function reduceToSum (ary, objKey) {// eslint-disable-line no-unused-vars
  if(objKey) ary = mapObj(ary, objKey);
  return ary.reduce((a,n) => a+n, 0);
}
//RTS
//RTA//RTA
/** Average Items in Ary
 * @param  {Array} ary Array of Number or Object with Number Properties
 * @param  {String} objKey Optional Key for Array of Objects
 * @returns {Number} Average
 */
function reduceToAvg (ary, objKey) {// eslint-disable-line no-unused-vars
  if(objKey) ary = mapObj(ary, objKey);
  return ary.reduce((a,n) => a+n, 0) / ary.length;
}
//RTA
//RTM//RTM
/** Max Items in Ary
 * @param  {Array} ary Array of Number or Object with Number Properties
 * @param  {String} objKey Optional Key for Array of Objects
 * @returns {Number} Max
 */
function reduceToMax (ary, objKey) {// eslint-disable-line no-unused-vars
  if(objKey) ary = mapObj(ary,objKey);
   return ary.reduce((a,n) => n > a ? n : a, ary[0]);
}
//RTM
//RAEA//RAEA
// eslint-disable-next-line require-jsdoc, no-unused-vars
function reduceAvgEvenAge (ary) {
  var filtered = ary.map(n=>n.age).filter(n=>n%2===0);
  return filtered.reduce((a,n) => a + n, 0) / filtered.length;
}
//RAEA
//RAOA//RAOA
// eslint-disable-next-line require-jsdoc
function reduceAvgOddAge (ary) {// eslint-disable-line no-unused-vars
  var filtered = ary.map(n=>n.age).filter(n=>n%2!==0);
  return filtered.reduce((a,n) => a + n, 0) / filtered.length;
}
//RAOA

//RTREE
// eslint-disable-next-line require-jsdoc, no-unused-vars
function getTree() {

  let node3 = {
    name: "p",
    value: "This is text in the a paragraph",
    children: null
  };
  let node4 = {
    name: "label",
    value: "Name",
    children: null
  };
  let node5 = {
    name: "input",
    value: "this was typed by a user",
    children: null
  };
  let node2 = {
    name: "div",
    value: null,
    children: [node4, node5]
  };
  let node1 = {
    name: "body",
    children: [node2, node3],
    value: null,
  };


  return node1;
}
//RTREE
// eslint-disable-next-line require-jsdoc
function recurseTree(tree) {

  log(tree.name, tree.value);
  var child = tree.children;
  // eslint-disable-next-line no-unused-vars
  if (child !== null) child.forEach(n => recurseTree(n));

}

// eslint-disable-next-line require-jsdoc, no-unused-vars
function callrecurseTree(){recurseTree(getTree());}
//RTREE
//ITREE//ITREE
// eslint-disable-next-line require-jsdoc, no-unused-vars
function iterativeTree(tree) {

  var stack = [];

  do {

    // Log and Remove from Stack
    log(tree.name, tree.value);
    stack.shift();
    var child = tree.children;

    // Add Children to Stack
    if (child !== null) child.forEach(n=>stack.push(n));
 
    tree = stack[0];
  
  } while(tree !== undefined);
  
}
// eslint-disable-next-line require-jsdoc, no-unused-vars
function calliterativeTree(){recurseTree(getTree());}
//ITREE
//STN
/* Sum all numbers till the given one
*
*  Write a function sumTo(n) that calculates the sum of numbers 1 + 2 + ... + n.
*
*  For instance:
*  sumTo(1) = 1
*  sumTo(2) = 2 + 1 = 3
*  sumTo(3) = 3 + 2 + 1 = 6
*  sumTo(4) = 4 + 3 + 2 + 1 = 10
*  ...
*  sumTo(100) = 100 + 99 + ... + 2 + 1 = 5050
*  
*   Make 3 solution variants:
*
*  Using a for loop.
*  Using a recursion, cause sumTo(n) = n + sumTo(n-1) for n > 1.
*  Using the arithmetic progression formula.
*/
//STN
// eslint-disable-next-line no-unused-vars
function sumToUseLoop(n) {

  var sum = 0;
  for (var i = 1; i <= n; i += 1) sum += i;
  return sum;

}

function sumToUseRecursion(n) {

  if (n < 0) {
    return 0;
  } else {
    // eslint-disable-next-line no-unused-vars
    return n + sumToUseRecursion(n - 1);
  } 

}

// eslint-disable-next-line no-unused-vars
function sumToArithmeticProgression(n) {

  // For Any Series a_1, a_3, ... a_n
  // Sum of Numbers = n * (a_1 + a_n) / 2

  return n * (1 + n) / 2;

}
//STN
//CF
/*  Calculate Factorial
*
*  The factorial of a natural number is a number multiplied 
*  by "number minus one", then by "number minus two", and so on till 1. The factorial of n is denoted as n!
*
*  We can write a definition of factorial like this:
*
*  n! = n * (n - 1) * (n - 2) * ...*1
*  Values of factorials for different n:
*
*  1! = 1
*  2! = 2 * 1 = 2
*  3! = 3 * 2 * 1 = 6
*  4! = 4 * 3 * 2 * 1 = 24
*  5! = 5 * 4 * 3 * 2 * 1 = 120
*  The task is to write a function factorial(n) that calculates n! 
*  using recursive calls.
*/
//CF
function calculatefactorial (n) {

  if (n < 1) {
    return 1;
  } else {
    // eslint-disable-next-line no-unused-vars
    return n * calculatefactorial (n - 1);
  }

}
//CF
//FN
/* Fibonacci numbers
*
*  The sequence of Fibonacci numbers has the formula Fn = Fn-1 + Fn-2. 
*  In other words, the next number is a sum of the two preceding ones.
*
*  First two numbers are 1, then 2(1+1), then 3(1+2), 5(2+3) 
*  and so on: 1, 1, 2, 3, 5, 8, 13, 21....
*
*  Fibonacci numbers are related to the Golden ratio and many 
*  natural phenomena around us.
*
*  Write a function fib(n) that returns the n-th Fibonacci number.
*
*  alert(fib(3)); // 2
*  alert(fib(7)); // 13
*  fib(77)); // 5527939700884757
*  P.S. The function should be fast. The call to fib(77) should take no more than a fraction of a second.
*/
//FN
// eslint-disable-next-line no-unused-vars
function fibonacci (n) {

  var alreadyCalculated = [];

  var calFib = function(no) {
    
    if (alreadyCalculated[no]) return alreadyCalculated[no];

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

  return (calFib(n));

}
//FN
//LL
/*  Let’s say we have a single-linked list (as described in the 
*   chapter Recursion and stack):
*
*   Write a function printList(list) that outputs list items one-by-one.
*
*   Make two variants of the solution: using a loop and using recursion.
*/
//LL
// eslint-disable-next-line no-unused-vars
function getListToPrint() {
  return {
    value: 1, next: 
    {value: 2, next: 
      {value: 3, next: 
        {value: 4, next: null}}}};
}

function printListbyRecursion (start) {

  log(start.value);

  var next = start.next;
  // eslint-disable-next-line no-unused-vars
  if (next !== null) printListbyRecursion(next);

}
// eslint-disable-next-line no-unused-vars
function callprintListbyRecursion() {printListbyRecursion(getListToPrint());}

// eslint-disable-next-line no-unused-vars
function printListbyIteration (start) {

  var retrn = [];

  while (start !== null) {
    retrn.push(start.value);
    start = start.next;
  }

  retrn.forEach(n=>log(n));
}
// eslint-disable-next-line no-unused-vars
function callprintListbyIteration() {printListbyIteration(getListToPrint());}
//LL
//OSLLR
/*  Output a single-linked list in the reverse order
*
*   Output a single-linked list from the previous task Output a 
*   single-linked list in the reverse order.
*   
*   Make two solutions: using a loop and using a recursion.
*/
//OSLLR
function reverseLinkedList(list){

  // eslint-disable-next-line no-unused-vars
  if (list.next !== null) reverseLinkedList(list.next);
  log(list.value);

}
// eslint-disable-next-line no-unused-vars
function callreverseLinkedList() {reverseLinkedList(getListToPrint());}

// eslint-disable-next-line no-unused-vars
function reverseLinkedListIteration(list){
  
  var li = [];
    
  // eslint-disable-next-line no-constant-condition
  while (true) {
    li.push(list.value);
    if (list.next === null) break;  
    list = list.next;
  }
  
  for (var i = li.length - 1; i >= 0; i -=1) log(li[i]);

} 
// eslint-disable-next-line no-unused-vars
function callreverseLinkedListIteration() {reverseLinkedListIteration(getListToPrint());}
//OSLLR