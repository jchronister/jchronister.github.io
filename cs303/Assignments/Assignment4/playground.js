"use strict";
var prompt = require('prompt-sync')();
var log = console.log;


/**  Sum numbers from the visitor
*
*   Create a script that prompts the visitor to enter 
*   two numbers and then shows their sum.
*   @returns {Number} Sum of Two Numbers Given
*/
function addNumbers () {
  let num1 = parseFloat(prompt("Please Enter Number"));
  let num2 = parseFloat(prompt("Please Enter Number"));
  return (num1 + num2);
}









