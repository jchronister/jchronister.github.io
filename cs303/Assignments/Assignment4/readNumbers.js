  "use strict";
  /**  Repeat until the input is a number
  *
  *   Create a function readNumber which prompts for a number until the 
  *   visitor enters a valid numeric value.
  *
  *   The resulting value must be returned as a number.
  *   
  *   The visitor can also stop the process by entering an empty line or 
  *   pressing “CANCEL”. In that case, the function should return null.
  *
  * @returns {Number|null} Returns Number or null
  */
 function readNumber () {
  
  let num;

  do {
    num = prompt("Please Enter Number");
    if (num === "" || num === null) return null;
    num = Number(num);

  } while (num !== num);

  return num;
}