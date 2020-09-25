"use strict";

{
  let setup = {
  key: "randomInteger",
  filePath: "./randomInteger.js",
  fileCrop: [null, "//^//"],
  divButtonId: null,
  divOutputId: null,
  functionRef: randomInteger,
  callCaption: "Click to Call Function randomInteger",
  promptQuestion: "Please Enter Min and Max Separated by Comma",
  promptReturn: ["number","number"],
  defaultPromptInput: "1, 10",
  };

  if (typeof $setup === "object") $setup.ary.push(setup);

 }
//^//

/*  A random number from min to max
*
*   Create a function randomInteger(min, max) that generates a 
*   random integer number from min to max including both min and max
*   as possible values.
*
*   Any number from the interval min..max must appear with the same probability.
*/

/** Returns a Random Integer >= Min and <= Max
*   @param  {Number} min - Random Minimum
*   @param  {Number} max - Random Maximum
*   @returns  {Number} Random Number
*/
function randomInteger(min,max) {
  return Math.ceil(Math.random() * (max - (min - 1)) + (min - 1));
}