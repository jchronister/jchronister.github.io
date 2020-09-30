/* eslint-disable id-length */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
"use strict";
var log = console.log;
// eslint-disable-next-line no-redeclare
if (typeof alert === "undefined") var alert = console.log;
// eslint-disable-next-line no-redeclare
if (typeof prompt === "undefined") var prompt = require("prompt-sync")();

//TEO
/* Two functions – one object
*
* Is it possible to create functions A and B such as new A() === new B()?
*/
//TEO
/** Create Equal Objects with New
 *  @returns {Object} Two Equal Objects
 */
function equalObjects () {

  var other = {};

  function A() {return other;}
  function B() {return other;}

  return new A() === new B();

}
//TEO
//CNCstart
/*  Create new Calculator
*
*   Create a constructor function Calculator that creates objects with 3 methods:
*
*   read() asks for two values using prompt and remembers them in object properties.
*   sum() returns the sum of these properties.
*   mul() returns the multiplication product of these properties.
*/
//CNCmid
/** Create Calculator Object
 *  Method read - Get Two Numbers
 *  Method sum - Sums the Two Numbers
 *  Method mul - Multiply the Two Numbers
 *  @returns {Object} Calcultor Object
 */
function Calculator () {

  this.num1 = 0;
  this.num2 = 0;

  this.read = function (num1, num2) {
    this.num1 = num1;
    this.num2 = num2;
  };

  this.sum = function () {
    return this.num1 + this.num2;
  };

  this.mul = function () {
    return this.num1 * this.num2;
  };

}
//CNCend
//CNAstart
/* Create new Accumulator
*
*  Create a constructor function Accumulator(startingValue).
*
*  Object that it creates should:
*
*  Store the “current value” in the property value. The starting 
*  value is set to the argument of the constructor starting Value.
*  The read() method should use prompt to read a new number and 
*  add it to value.
*  In other words, the value property is the sum of all user-entered 
*  values with the initial value startingValue.
*
*  Here’s the demo of the code:
*
*  let accumulator = new Accumulator(1); // initial value 1
*
*  accumulator.read(); // adds the user-entered value
*  accumulator.read(); // adds the user-entered value
*
*  alert(accumulator.value); // shows the sum of these values
*/
//CNAmid
/** Accumulator Constructor
 * property {Number} value
 *   {read} Add User Input to .value
 * @param  {Number} init - Initial Value
 * @returns {Object} Accumulator Object
 */
function Accumulator(init) {
  this.value = init;
  this.read = function (add) {
    var num = Number(add);
    if (num === num) this.value += num;
  };
}
//CNAend
//CTCCstart
/* Translate border-left-width to borderLeftWidth
*
*  Write the function camelize(str) that changes dash-separated 
*  words like “my-short-string” into camel-cased “myShortString”.
*
*  That is: removes all dashes, each word after dash becomes uppercased.
*
*  Examples:
*
*  camelize("background-color") == 'backgroundColor';
*  camelize("list-style-image") == 'listStyleImage';
*  camelize("-webkit-transition") == 'WebkitTransition';
*  P.S. Hint: use split to split the string into an array, 
*  transform it and join back.
*/
//CTCCmid
/** Change Dash to CamelCase
 * @param  {str} str - String
 * @returns {String} CamelCase String
 */
function camelize(str) {

  var ary = str.split("");

  for (var i = 0; i < ary.length; i += 1) {
      if(ary[i] === "-") {
        ary[i] = "";
        if (ary[i + 1] ) ary[i + 1] = ary[i + 1].toUpperCase();
      }
  }
  return ary.join("");
}
//CTCCend
//FRstart
/* Filter range
*
*  Write a function filterRange(arr, a, b) that gets 
*  an array arr, looks for elements between a and b in it 
*  and returns an array of them.
*
*  The function should not modify the array. It should return the new array.
*
*  For instance: let arr = [5, 3, 8, 1];
*  
*  let filtered = filterRange(arr, 1, 4);
*  
*  alert( filtered ); // 3,1 (matching values)
*
*  alert( arr ); // 5,3,8,1 (not modified)
*/
//FRmid
/** Filter Array for Range
 * @param  {Number} arr - Array to Filter
 * @param  {Number} a - range 1
 * @param  {Number} b - range 2
 * @returns {Number[]} Filtered Array & Original Array
 */
function filterRange (arr, a, b) {

  if (a > b) {
    var temp = a;
    a = b;
    b = temp;
  }
  var arrFilt = arr.filter(n => n >= a && n <= b);

  return [arrFilt, arr];

}

function callfilterRange() {
  return filterRange([5, 3, 8, 1], 1, 4);
}
//FRend
//FRIPstart
/* Filter range "in place"
*  
*  Write a function filterRangeInPlace(arr, a, b) that gets an array
*  arr and removes from it all values except those that are between a and b.
*  The test is: a ≤ arr[i] ≤ b.
*  
*  The function should only modify the array. It should not return anything.
*  
*  For instance:
*  
*  let arr = [5, 3, 8, 1];
*  
*  filterRangeInPlace(arr, 1, 4); // removed the numbers except from 1 to 4
*  
*  alert( arr ); // [3, 1]
*/
//FRIPmid
/** Filter Existing Array for Range
 * @param  {Number} arr - Array to Filter
 * @param  {Number} a - range 1
 * @param  {Number} b - range 2
 * @returns {undefined} Undefined
 */
function filterRangeAry (arr, a, b) {

  if (a > b) {
    var temp = a;
    a = b;
    b = temp;
  }

  arr.forEach((n,i)=>{if(n < a || n > b) arr.splice(i,1);});
}

function callfilterRangeAry() {
  var arr = [5, 3, 8, 1];
  filterRangeAry(arr, 1, 4);
  return arr;
}
//FRIPend
//SDOstart
/* Sort in decreasing order
*
*
*  let arr = [5, 2, 1, -10, 8]; =>  8, 5, 2, 1, -10
* 
*/
//SDOmid
/** Sorts Array in Decreasing Order
 * @param  {Number} arr - Array to Sort
 * @returns {Number} Array
 */
function sortDecreaseOrder(arr) {
  arr.sort((a,b)=>b-a);
  return arr;
}
//SDOend
//SACstart
/* Copy and sort array
*  
*  We have an array of strings arr. We’d like to have a sorted 
*  copy of it, but keep arr unmodified.
*  
*  Create a function copySorted(arr) that returns such a copy.
*  
*  let arr = ["HTML", "JavaScript", "CSS"];
*  
*  let sorted = copySorted(arr);
*  
*  alert( sorted ); // CSS, HTML, JavaScript
*  alert( arr ); // HTML, JavaScript, CSS (no changes)
*/
//SACmid
/** Returns New Sorted Text Array 
 * @param  {arr} arr - Array to Sort
 * @returns {String[]} Array & Original Array
 */
function sortArray(arr) {
  var arrSort = arr.slice();
  arrSort.sort();
  return [arrSort, arr];
}
//SACend
//ECAL
/* Create an extendable calculator
*
*  Create a constructor function Calculator that creates “extendable” calculator objects.
*  
*  The task consists of two parts.
*  
*  First, implement the method calculate(str) that takes a string like 
*  "1 + 2" in the format “NUMBER operator NUMBER” (space-delimited) and returns the result. 
*  Should understand plus + and minus -.
*  
*  Usage example:
*  
*  let calc = new Calculator;
*  
*  alert( calc.calculate("3 + 7") ); // 10
*  Then add the method addMethod(name, func) that teaches the calculator a new operation. It takes the operator name and the two-argument function func(a,b) that implements it.
*  
*  For instance, let’s add the multiplication *, division / and power **:
*  
*  let powerCalc = new Calculator;
*  powerCalc.addMethod("*", (a, b) => a * b);
*  powerCalc.addMethod("/", (a, b) => a / b);
*  powerCalc.addMethod("**", (a, b) => a ** b);
*  
*  let result = powerCalc.calculate("2 ** 3");
*  alert( result ); // 8
*  No parentheses or complex expressions in this task.
*  The numbers and the operator are delimited with exactly one space.
*  There may be error handling if you’d like to add it.
*/
//ECAL
function extCalculator () {

  // Calculator Methods
  this.opr = {
    "+":function(a,b){return a + b;},
    "-":function(a,b){return a - b;}
  };

  this.calculate = function(strFormula) {
    
    var formula = strFormula.split(" "), retrn;

    var num1 = Number(formula[0]);
    var num2 = Number(formula[2]);
    var cal = formula[1];

    if (num1 !== num1) {
      return "First Number is Not a Number";
    } else if (num2 !== num2) {
      return "Second Number is Not a Number";
    }

    if (cal in this.opr) {
      return this.opr[formula[1]](num1, num2);
    } else {
      return "Do Not Understand Operator: " + cal;
    }
  };

  this.addMethod = function (name, func) {
    this.opr[name] = func;
  };
}
//ECAL
//MTN
/* Map to names
*  
*  You have an array of user objects, each one has user.name. 
*  Write the code that converts it into an array of names.
*  
*/
//MTN
function covertArrayName () {

  let john = {name: "John", age: 25};
  let pete = {name: "Pete", age: 30};
  let mary = {name: "Mary", age: 28};
  let users = [ john, pete, mary ];

  let names = users.map(n=>n.name);

  return names;

}
//MTN
//MTO
/* Map to objects
*  
*  You have an array of user objects, each one has name, surname and id.
*  
*  Write the code to create another array from it, of objects with id 
*  and fullName, where fullName is generated from name and surname.
*/
//MTO
function mapToObject(obj) {

  // Default Test Object
  let john = { name: "John", surname: "Smith", id: 1 };
  let pete = { name: "Pete", surname: "Hunt", id: 2 };
  let mary = { name: "Mary", surname: "Key", id: 3 };

  let users = obj || [ john, pete, mary ];

  return users.map(n=>{
    var obt = {};
    obt.fullName = n.name + " " + n.surname;
    obt.id = n.id;
    return obt;
  });
}
//MTO
//SUA
/*  Sort users by age
*   
*   Write the function sortByAge(users) that gets an array of objects 
*   with the age property and sorts them by age.
*/
//SUA
function sortByAge (objAry) {
  return objAry.sort((a, b) => a.age - b.age);
}

function callSortByAge() {
  let john = { name: "John", age: 25 };
  let pete = { name: "Pete", age: 30 };
  let mary = { name: "Mary", age: 28 };
  let arr = [ pete, john, mary ];
  return sortByAge(arr);
}
//SUA
//SAA
/* Shuffle an array
*  
*  Write the function shuffle(array) that shuffles (randomly reorders) 
*  elements of the array.
*  
*  Multiple runs of shuffle may lead to different orders of elements. 
*  All element orders should have an equal probability.
*/
//SAA
function shuffle(ary) {

  var i = 0, retrn = [], len = ary.length;
  do {
    var spot = Math.floor(len * Math.random());

    if(!retrn[spot]) {
      retrn[spot] = ary[i];
      i += 1;
    }

  } while (i < len);
  return retrn;
}

function checkProbablity () {

  let count = {
    "123": 0,
    "132": 0,
    "213": 0,
    "231": 0,
    "321": 0,
    "312": 0,
  };

  //Shuffle Array
  for (let i = 0; i < 1000000; i++) {
    let array = [1, 2, 3];
    count[shuffle(array).join("")]++;
  }
  return count;
}
//SAA
//GAA
/* Get average age
*
*  Write the function getAverageAge(users) that gets an array of 
*  objects with property age and returns the average age.
*  
*  The formula for the average is (age1 + age2 + ... + ageN) / N.
*  // (25 + 30 + 29) / 3 = 28
*/
//GAA
function getAverageAge(users) {
  var total = users.length || 1;
  return users.reduce((a,n)=>a+n.age,0) / total;
}

function callgetAverageAge() {
  let john = { name: "John", age: 25 };
  let pete = { name: "Pete", age: 30 };
  let mary = { name: "Mary", age: 29 };

  let arr = [ john, pete, mary ];
  return getAverageAge(arr);
}
//GAA
//FUAM
/*  Filter unique array members
*  
*  Let arr be an array.
*  
*  Create a function unique(arr) that should return an array with 
*  unique items of arr.
*/
//FUAM
function unique(arr) {
  var retrn = [];

  arr.forEach(function(m) {
    // Slow for Big Arrays
    if(retrn.reduce((a,n) => n===m ? a + 1 : a,0) === 0) retrn.push(m);
  });
  return retrn;
}
//FUAM
//CKOFA
/*  Create keyed object from array
*
*   Let’s say we received an array of users in the form 
*   {id:..., name:..., age... }.
*
*   Create a function groupById(arr) that creates an object from it,
*   with id as the key, and array items as values.
*   Use array .reduce method in the solution.
*
*   After the call we should have:
*  {
*  john: {id: 'john', name: "John Smith", age: 20},
*  ann: {id: 'ann', name: "Ann Smith", age: 24},
*  pete: {id: 'pete', name: "Pete Peterson", age: 31},
*  }
*/

//CKOFA
function groupById(arr) {

  return arr.reduce(function(a, n) {
    a[n.id] = n;
      return a;
    }, {});

}

function callgroupById() {

  let users = [
    {id: "john", name: "John Smith", age: 20},
    {id: "ann", name: "Ann Smith", age: 24},
    {id: "pete", name: "Pete Peterson", age: 31},
  ];

  return groupById(users);
}
//CKOFA

