/* eslint-disable require-jsdoc */
/* eslint-disable id-length */
"use strict";

/*global List*/


// eslint-disable-next-line no-unused-vars
var log = console.log;
// eslint-disable-next-line no-redeclare
if (typeof alert === "undefined") var alert = console.log;
// eslint-disable-next-line no-undef, no-redeclare
if (typeof prompt === "undefined") var prompt = require("prompt-sync")();


function getRandomNumberList() {

  let list = new List();
  let nums = [];

  for(let i = 0; i < 15; i++) {

    var num = Math.ceil(Math.random()*100);

    nums.push(num);
    list.insertLast(num);

  }
  return [list, nums];
}

//SS
/*  Recursive algorithm, setOfSubsets(n), that enumerates all
*   of the subsets of the set of numbers {1,2,…,n}.
*   Runtime O(n^2)
*/
//SS
function setOfSubsets(set) {

  // Add New Subsets to Return List
  let updateSubset = function (num, subset, i) {

    // End of Subset - Insert New Number and Exit
    if(subset.isFirst(i)) {
      subset.insertLast(num);
      return;
    }

    // Insert New Subset
    subset.insertLast("" + i.element() + num);

    updateSubset(num, subset, subset.before(i));
  };

  // Iterate Sets List
  let iterateSet = function (set, p, subset) {
 
    updateSubset (p.element(), subset, subset.last());

    if(!set.isLast(p)) iterateSet(set, set.after(p), subset);

  };

  // Initilize Return List
  let subset = new List();
  subset.insertFirst("()");
  if(set.isEmpty()) return subset;
  let p = set.first();

  // Iterate and Update Subsets
  iterateSet(set, p, subset);
  
  return subset;

}

function callSetOfSubsets(input) {// eslint-disable-line no-unused-vars

  let set = new List();
  input.forEach(n=>set.insertLast(n));

  let sets = setOfSubsets(set);
  return sets.print("return") + "\n2^" + set.size() + " -> " + Math.pow(2,set.size()) + " = " + sets.size();

}
//SS


//ST
/*  A recursive algorithm that uses the positions to traverse
*   the list to calculate the sum
*/
//ST
function sumTraverse(list) {

  if (list.isEmpty()) return 0;

  // Get Position
  let p = arguments[1] || list.first();

  if (list.isLast(p)) return p.element();

  return p.element() + sumTraverse(list, list.after(p));

}

function callSumTraverse() {// eslint-disable-line no-unused-vars

  let lists = getRandomNumberList();
  return "Input: [" + lists[1].join(", ") + "]\n" + lists[1].reduce((a,n)=>a+n,0) + " Hopefully Equal to " + sumTraverse(lists[0]);

}
//ST
//SR
/*  A recursive algorithm that uses the rank-based operations to
*   traverse the list to calculate the sum
*/
//SR
function sumRank(list) {

  if (list.isEmpty()) return 0;

  // Get Position
  let i = arguments[1] === undefined ? list.size() - 1 : arguments[1];

  if (i === 0) return list.elemAtRank(i);

  return list.elemAtRank(i) + sumRank(list, i - 1);

}

function callSumRank() {// eslint-disable-line no-unused-vars

  let lists = getRandomNumberList();
  return "Input: [" + lists[1].join(", ") + "]\n" + lists[1].reduce((a,n)=>a+n,0) + " Hopefully Equal to " + sumRank(lists[0]);

}
//SR
//FM
/*  Recursive method, findMax(L), that returns the maximum
*   number in the list
*/
//FM
function findMax(list) {

  if (list.isEmpty()) return null;

  // Get Position
  let p = arguments[1] || list.first();

  if (list.isLast(p)) return p.element();
  
  return Math.max(p.element(), findMax(list, list.after(p)));

}

function callfindMax() {// eslint-disable-line no-unused-vars

  let lists = getRandomNumberList();
  return "Input: [" + lists[1].join(", ") + "]\n" + lists[1].reduce((a,n)=>n>a?n:a,0) + " Hopefully Equal to " + findMax(lists[0]);

}
//FM