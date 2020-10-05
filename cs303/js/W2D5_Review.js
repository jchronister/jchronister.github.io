
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
/* eslint-disable id-length */
"use strict";

// eslint-disable-next-line no-unused-vars
var log = console.log;
// eslint-disable-next-line no-redeclare
if (typeof alert === "undefined") var alert = console.log;
// eslint-disable-next-line no-undef, no-redeclare
if (typeof prompt === "undefined") var prompt = require("prompt-sync")();



/*  Write your own version of map. Write a function, myMap that 
*   takes 2 arguments, an array and a function to apply to the array. 
*   It should return a new array of the same size with the function
*   applied to each element of the input array. It should not change 
*   the input array.
*/

Array.prototype.mapMe = function (callFunction) {
  
  let retrn = [];

  for (let i = 0; i < this.length; i += 1) {
    retrn.push(callFunction(this[i]));
  }

  return retrn;

};

// Array.prototype.mapMe = mapMe
let testAry = [1,2,3,4,5,6, 7, 8, 9, 10]

// log(testAry.mapMe(n=>n*2), testAry)




Array.prototype.filterMe = function (testFunction) {

  let retrn = [];

  for (let i = 0; i < this.length; i += 1) {
    if(testFunction(this[i]) === true) retrn.push(this[i]);
  }

  return retrn;

};

// log(testAry.filterMe(n=>n%2===0), testAry)


Array.prototype.reduceMe = function (reduceFuntion, startValue) {

  let sum = startValue;
  if (sum === undefined) sum = this[0];

  for (let i = 0; i < this.length; i += 1) {

    sum = reduceFuntion(sum,this[i]);

  }
  return sum;

};

log(testAry.reduceMe((a,n)=>a+n,0), testAry)