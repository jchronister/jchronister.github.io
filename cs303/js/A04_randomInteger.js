"use strict";
//>DescStart
/*  A random number from min to max
*
*   Create a function randomInteger(min, max) that generates a 
*   random integer number from min to max including both min and max
*   as possible values.
*
*   Any number from the interval min..max must appear with the same probability.
*/
//>DescEnd
/** Returns a Random Integer >= Min and <= Max
*   @param  {Number} min - Random Minimum
*   @param  {Number} max - Random Maximum
*   @returns  {Number} Random Number
*/
function randomInteger(min,max) {
  return Math.ceil(Math.random() * (max - (min - 1)) + (min - 1));
}
