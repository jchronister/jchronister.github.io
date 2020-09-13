"use strict";
var prompt = require('prompt-sync')();
var log = console.log;

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
/**
 * @param  {String} String to Camelize
 * @return  {string} Camelized String
 */
function camelize(str) {

    let spot, ch;
    while ((spot = str.indexOf("-")) !== -1) {
      ch = str[spot + 1];
      if (ch) ch = ch.toUpperCase();
      str = str.substring(0,spot ) + (ch || "") + str.slice(spot + 2)
    }

    return str;

}


console.log(camelize('background-color'))

