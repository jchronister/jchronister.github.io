
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

/*global assert*/

//MOM
/*  Write your own version of map. Write a function, myMap that 
*   takes 2 arguments, an array and a function to apply to the array. 
*   It should return a new array of the same size with the function
*   applied to each element of the input array. It should not change 
*   the input array.
*/
//MOM
Array.prototype.mapMe = function (callFunction) {
  
  let retrn = [];

  for (let i = 0; i < this.length; i += 1) {
    retrn.push(callFunction(this[i]));
  }

  return retrn;

};

function callmapMe () {

  let testAry = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return [testAry.mapMe(n=>n*2), testAry];
}
//MOM
//MOF
/*   Write your own version of filter. Write a function, myFilter that 
*    takes 2 arguments, an array and a function to apply to the array. 
*    It should return a new array with the function applied to each
*    element of the input array. It should not change the input array. 
*    It should work like Array.filter. I.e., the input function returns 
*    true or false for each element in the original array, and the true
*    elements are included in the returned array.
*/
//MOF
Array.prototype.filterMe = function (testFunction) {

  let retrn = [];

  for (let i = 0; i < this.length; i += 1) {
    if(testFunction(this[i]) === true) retrn.push(this[i]);
  }

  return retrn;

};

function callfilterMe () {

  let testAry = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return [testAry.filterMe(n=>n%2===0), testAry];
}
//MOF
//MOR
/* Create Version of Reduce
*/
//MOR
Array.prototype.reduceMe = function (reduceFuntion, startValue) {

  let sum = startValue;
  if (sum === undefined) sum = this[0];

  for (let i = 0; i < this.length; i += 1) {

    sum = reduceFuntion(sum,this[i]);

  }
  return sum;

};

function callreduceMe () {

  let testAry = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return testAry.reduceMe((a,n)=>a+n,0);
}
//MOR
//WSC
/* Write a constructor function to replace the Class given for the 
*  Simpsons tree recursion exercise.
*/
    class simpson {
        constructor(value) {
        this.value = value;
        this.descendents = [];
       }
    }
//WSC
function Simpson (name) {
  this.value = name;
  this.descendents = [];
}

function createSimpson(name) {
  return new Simpson(name);
}
//WSC
//CHC
/*
*     Write a constructor function to create nodes for the HTML 
*     DOM tree recursion exercise from the W1D3 recursion assignment.
*/
//CHC
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
  value: null,
  children: [node2, node3],
 };
 
function createHTMLTree () {

  let HTMLelement = function (element, textValue, children) {

    this.name = element;
    this.value = textValue;

    let child = [];
    if (children) {
      if (!Array.isArray(children)) children = [children];
      children.forEach(n=>child.push(n));
    } else {
      child = null;
    }

    this.children = child;

  };
  
  let emt5 = new HTMLelement("input", "this was typed by a user", null);
  let emt4 = new HTMLelement("label", "Name", null);
  let emt3 = new HTMLelement("p","This is text in the a paragraph", null);
  let emt2 = new HTMLelement("div", null, [emt4, emt5]);
  let emt1 = new HTMLelement("body", null, [emt2, emt3]);

  return emt1;

}
//CHC
