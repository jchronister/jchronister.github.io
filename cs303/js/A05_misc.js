/* eslint-disable id-length */
/* eslint-disable no-unused-vars */
/* eslint-disable require-jsdoc */
"use strict";
var log = console.log;

//TEOstart
/* Two functions – one object
*
* Is it possible to create functions A and B such as new A() === new B()?
*/
//TEOmid
/** Create Equal Objects with New
 *  @returns {Object} Two Equal Objects
 */
function equalObjects () {

  var other = {};

  function A() {return other;}
  function B() {return other;}

  return new A() === new B();

}
//TEOend
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

  arr.forEach((n,i)=>{if(n < a || n < b) arr.splice(i,1);});
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
//CALstart
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
//CALmid



function extCalculator () {

  this.opr = {
    "+":function(a,b){return a + b},
    "-":function(a,b){return a - b}
  },


  this.strSpliter = function(strSplit) {
    var ary = strSplit.split("").map(n=>n.trim());
    var cal = [], cnt = 0;

    ary.forEach(function(n) {
      if (n !== "") {
        var chr = Number(n);
        if (chr === chr) {
          cal[cnt] = cal[cnt] ? cal[cnt] + n : n;
        } else { 
          cnt+=1;
          cal[cnt] = n;
          cnt+=1;
        }
      }
    });

    // Convert undefined to 0 and Numbers
    for (var i = 0; i < cal.length; i += 1) {
      if (!cal[i]) {
        cal[i] = 0;
      } else {
        var num = Number(cal[i]);
        if (num === num) cal[i] = num;
      }
    }

    return cal;

  };


  // this.calculate = function (str) {
  // }

  // calculate


}


var t = new extCalculator();
log(t.strSpliter("-4+ -1 +-6"))







// log(typeof opr["*"]==="function")
//CALend


// log(sortArray(["HTML", "JavaScript", "CSS"]))







//SACend











// log(camelize("background-color"))