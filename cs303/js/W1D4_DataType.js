"use strict";
var log = console.log;// eslint-disable-line no-unused-vars
//CIASP
/*  Methods of primitives: 
*   Can I add a string property?
*   Consider the following code: What Will it Return?
*/
//CIASP
/** Try to Add Property to String
 * @param  {String} string - String
 * @returns {*} Error Message
 */
function addStringProperty (string) {// eslint-disable-line no-unused-vars
  try{
    string.test = 5;
  }
  catch(err) {
    return err.message;
  }
}
//CIASP
//SNFVstart
/*  Sum numbers from the visitor
*
*   Create a script that prompts the visitor to enter 
*   two numbers and then shows their sum.
*/
//SNFVmid
/** Sums Two Numbers
 * @returns {Number} Sum of Two Numbers Given
 */
function addNumbers () {// eslint-disable-line no-unused-vars
  let num1 = parseFloat(prompt("Please Enter Number"));
  let num2 = parseFloat(prompt("Please Enter Number"));
  return (num1 + num2);
}
//SNFVend
//RUIN
/**  Repeat until the input is a number
*
*   Create a function readNumber which prompts for a number until the 
*   visitor enters a valid numeric value.
*
*   The resulting value must be returned as a number.
*   
*   The visitor can also stop the process by entering an empty line or 
*   pressing “CANCEL”. In that case, the function should return null.
*/
//RUIN
/** Repeats Until the Input is a Number
* @returns {Number|null} Returns Number or null
*/
 function readNumber () {// eslint-disable-line no-unused-vars
  
  let num;

  do {
    num = prompt("Please Enter Number");
    if (num === "" || num === null) return null;
    num = Number(num);

  } while (num !== num);

  return num;
}
//RUIN
//OIPstart
/*  An occasional infinite loop
*   
*   let i = 0;
*   while (i != 10) {
*   i += 0.2;
*   }
*
*   This loop is infinite. It never ends. Why?
*/

//OIPmid
/** This loop is infinite. It never ends. Why?
* @returns {String} Values of i
*/
 function infiniteLoop () {// eslint-disable-line no-unused-vars

  let retrn = "Because i Never Equals 10 due to Rounding Errors with Fractions\n";

  let i = 0;
    while (i != 10) {
    i += 0.2;
    if (i > 9.5) retrn += i + "\n";
    if (i > 10.5) break;
  }
  return retrn;
}
//OIPend
//UFCstart
/*  Uppercase the first character
*
*   Write a function ucFirst(str) that returns the string str with the uppercased first character, for instance:
*   
*   ucFirst("john") == "John";
*
* @param  {String} str - Word
* @returns {String} Word
*/
//UFCmid
/** Uppercase the First Character
 * @param {String} str - String
 * @returns {String} String with First Character in Upper Case
*/
 function ucFirst(str) { // eslint-disable-line no-unused-vars
  str = "" + str;
  return str.length > 0 ? str[0].toUpperCase() + str.slice(1) : str;
}
//UFCend
//CFSstart
/*  Check for spam
*
*   Write a function checkSpam(str) that returns true if str contains
*   ‘viagra’ or ‘XXX’, otherwise false.
*
*   The function must be case-insensitive:
*/
//CFSmid
/** Checks String for 'viagra' or 'XXX'
* @param  {String} str - String to Check
* @Returns  {Boolean} true/false
*/
 function checkSpam(str) {// eslint-disable-line no-unused-vars
  str = str.toLowerCase();
  return str.includes("viagra") || str.includes("xxx");
}
//CFSend
//TTTstart
  /**  Truncate the text
*
*   Create a function truncate(str, maxlength) that checks the 
*   length of the str and, if it exceeds maxlength – replaces the 
*   end of str with the ellipsis character "…", to make its length 
*   equal to maxlength.
*
*   The result of the function should be the truncated (if needed) string.
*/
//TTTmid
/** Truncate Text at Length
* @param  {String} str - String to truncate
* @param  {Number} maxlength - Max String Length
* @returns  {String} returns String
*/
function truncate(str, maxlength) {// eslint-disable-line no-unused-vars

  if (maxlength === 0) return "";

  if (str.length > maxlength) {
    str = str.slice(0, maxlength - 1) + "…";
  }
  return str;

}
//TTTend
//ETMstart
/**  Extract the money
*
*   We have a cost in the form "$120". That is: the dollar 
*   sign goes first, and then the number.
*
*   Create a function extractCurrencyValue(str) that would 
* extract the numeric value from such string and return it.
*/
//ETMmid
/** Extract Number from $Number
* @param  {String} amount - String: Can Start with $
* @returns  {Number} Dollar Amount
*/
function extractCurrencyValue (amount) {// eslint-disable-line no-unused-vars
  amount = amount.replace(",", "");
  return amount[0] === "$" ? Number(amount.slice(1)) : Number(amount);
}
//ETMend
//MSAstart
/*  A maximal subarray
*
*   The input is an array of numbers, e.g. arr = [1, -2, 3, 4, -9, 6].
*
*   The task is: find the contiguous subarray of arr with the
*   maximal sum of items.
*
*   Write the function getMaxSubSum(arr) that will return that sum.
*
*   For instance:
*   getMaxSubSum([-1, 2, 3, -9]) == 5
*   getMaxSubSum([2, -1, 2, 3, -9]) == 6
*   getMaxSubSum([-1, 2, 3, -9, 11]) == 11
*   getMaxSubSum([-2, -1, 1, 2]) == 3
*   getMaxSubSum([100, -9, 2, -3, 5]) == 100
*   getMaxSubSum([1, 2, 3]) == 6 (take all)
*   getMaxSubSum([-1, -2, -3]) = 0
*/
//MSAmid
/** Returns Maximal Subarray Sum
*   @param  {Number[]} arr - Array of Numbers
*   @returns  {Number} Max Continuous Sum
*/
function getMaxSubSum (arr) {// eslint-disable-line no-unused-vars

  let max = 0, cnt = 0;

  for (let i = 0; i < arr.length; i+=1) {

    cnt += arr[i];
    if (cnt > max) max = cnt;
    if (cnt < 0) cnt = 0;

  }

  return max;

}
//MSAend
//TBWstart
/*   Translate border-left-width to borderLeftWidth
*
*   Write the function camelize(str) that changes dash-separated 
*    like “my-short-string” into camel-cased “myShortString”.
*
*   That is: removes all dashes, each word after dash becomes uppercased.
*
*   Examples:
*
*   camelize("background-color") == 'backgroundColor';
*   camelize("list-style-image") == 'listStyleImage';
*   camelize("-webkit-transition") == 'WebkitTransition';
*/
//TBWmid
/** Change Dash to Camel Case
 * @param  {String} str to Camelize
 * @return  {string} Camelized String
 */
function camelize(str) {// eslint-disable-line no-unused-vars

  let spot, chr;
  while ((spot = str.indexOf("-")) !== -1) {
    chr = str[spot + 1];
    if (chr) chr = chr.toUpperCase();
    str = str.substring(0,spot ) + (chr || "") + str.slice(spot + 2);
  }

  return str;

}
//TBWend
//RIT
//>DescStart
/*  A random number from min to max
*
*   Create a function randomInteger(min, max) that generates a 
*   random integer number from min to max including both min and max
*   as possible values.
*
*   Any number from the interval min..max must appear with the same probability.
*/
//RIT
/** Returns a Random Integer >= Min and <= Max
*   @param  {Number} min - Random Minimum
*   @param  {Number} max - Random Maximum
*   @returns  {Number} Random Number
*/
function randomInteger(min,max) {// eslint-disable-line no-unused-vars
  return Math.ceil(Math.random() * (max - (min - 1)) + (min - 1));
}
//RIT
//RNT
/*  A random number from min to max
*
*   The built-in function Math.random() creates a random 
*   value from 0 to 1 (not including 1).
*
*   Write the function random(min, max) to generate a random 
*   floating-point number from min to max (not including max).
*/
//RNT
/** Returns Random Floating Point Number >= Min and < Max
*   @param  {Number} min - Random Minimum
*   @param  {Number} max - Random Maximum
*   @returns  {Number} Random Number
*/
function random(min,max) {// eslint-disable-line no-unused-vars
  return (Math.random() * (max - min)) + min;
}
//RNT