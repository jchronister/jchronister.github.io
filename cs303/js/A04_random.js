"use strict";

/*  A random number from min to max
*
*   The built-in function Math.random() creates a random 
*   value from 0 to 1 (not including 1).
*
*   Write the function random(min, max) to generate a random 
*   floating-point number from min to max (not including max).
*/

/**
*   @param  {Number} min - Random Minimum
*   @param  {Number} max - Random Maximum
*   @returns  {Number} Random Number
*/
function random(min,max) {
return (Math.random() * (max - min)) + min;
}