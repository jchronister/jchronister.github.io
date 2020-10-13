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


//WWP
/*  Working with prototype
*
*   Here’s the code that creates a pair of objects, then modifies them.
*
*   Which values are shown in the process?
*/
//WWP
function workingWithPrototype () {

  let retrn = [];

  let animal = {
    jumps: null
  };

  let rabbit = {
    __proto__: animal,
    jumps: true
  };

  retrn.push( "rabbit.jumps = " + rabbit.jumps ); //--> true

  delete rabbit.jumps;

  retrn.push( "delete rabbit.jumps then rabbit.jumps = " + rabbit.jumps ); //--> null

  delete animal.jumps;

  retrn.push( "delete rabbit.jumps then rabbit.jumps = " + rabbit.jumps ); //--> undefined

  return retrn;

}
//WWP
//SA
/*
*   Searching algorithm
*
*   The task has two parts.
*
*   Given the following objects:
*   Use __proto__ to assign prototypes in a way that any property 
*   lookup will follow the path: pockets → bed → table → head. For 
*   instance, pockets.pen should be 3 (found in table), and bed.glasses 
*   should be 1 (found in head).
*   Answer the question: is it faster to get glasses as pockets.glasses 
*   or head.glasses? Benchmark if needed.
*/
//SA
function searchingAlgorithm () {

  let head = {
    glasses: 1
  };

  let table = {
    pen: 3,
    __proto__: head,
  };

  let bed = {
    sheet: 1,
    pillow: 2,
    __proto__: table,
  };

  let pockets = {
    money: 2000,
    __proto__: bed,
  };

  return ["pockets.pen = " + pockets.pen,
          "bed.glasses = " + bed.glasses];

}
//SA
//WDIW
/*
*   Where does it write?
*
*  We have rabbit inheriting from animal.
*
*  If we call rabbit.eat(), which object receives the full property: 
*  animal or rabbit?
*/
//WDIW
function whereDoesItWrite () {

  let animal = {
    eat() {
      this.full = true;
    }
  };

  let rabbit = {
    __proto__: animal
  };

  rabbit.eat(); 

  return [animal, rabbit];
}
//WDIW
//WBHF
/*  Why are both hamsters full?
*
*   We have two hamsters: speedy and lazy inheriting from the 
*   general hamster object.
*
*   When we feed one of them, the other one is also full. Why? How 
*   can we fix it?
*/
//WBHF
function whyAreBothHamstersFull () {

  let retrn = [];

  let hamster = {
    stomach: [],

    eat(food) {
      this.stomach.push(food);
    }
  };

  let speedy = {
    __proto__: hamster
  };

  let lazy = {
    __proto__: hamster
  };

  // This one found the food
  speedy.eat("apple");
  retrn.push( "speedy.stomach = " + speedy.stomach ); // apple

  // This one also has it, why? fix please.
  retrn.push( "lazy.stomach = " + lazy.stomach ); // apple

  // Fix to Give Each Hamster its Own Stomach when Called
  hamster.eat = function (food) {
    // eslint-disable-next-line no-prototype-builtins
    if(!this.hasOwnProperty("stomach")) this.stomach = [];
    this.stomach.push(food);
  };

  speedy.eat("grape");speedy.eat("grape1");speedy.eat("grape2");
  retrn.push( "speedy.stomach = " + speedy.stomach );
  retrn.push( "lazy.stomach = " + lazy.stomach );


  return retrn;

}
//WBHF