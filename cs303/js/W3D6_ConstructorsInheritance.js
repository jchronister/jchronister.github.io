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

//CP
/*  Changing "prototype"
*
*   In the code below we create new Rabbit, and then try to modify 
*   its prototype.
*
*   In the start, we have this code:
*/
//CP
function changingPrototype () {

  let retrn = []; 

  function Rabbit() {}
    Rabbit.prototype = {
      eats: true
  };

  let rabbit = new Rabbit();
  retrn.push("rabbit = new Rabbit() -> " + rabbit.eats ); // true

  rabbit = new Rabbit();
  Rabbit.prototype = {};
  retrn.push("Rabbit.prototype = {} -> " + rabbit.eats );

  rabbit = new Rabbit();
  Rabbit.prototype.eats = false;
  retrn.push("Rabbit.prototype.eats = false -> " + rabbit.eats ); 

  rabbit = new Rabbit();
  Rabbit.prototype.eats = true;
  delete rabbit.eats;
  retrn.push("Delete rabbit.eats ->" + rabbit.eats ); 

  rabbit = new Rabbit();
  delete Rabbit.prototype.eats;
  retrn.push("Rabbit.prototype.eats ->" + rabbit.eats );

  return retrn;
}
 //CP
/* Add method "f.defer(ms)" to functions
*
*  Add to the prototype of all functions the method defer(ms), 
*  that runs the function after ms milliseconds.
*
*  After you do it, such code should work:
*/

function addDefer () {

  let f = function () {
    log("Hello!");
    log (this)
  };

  // f.prototype.defer = setTimeout(this, 1000);
log(Function.prototype)
  // f.defer(1000); // Logs "Hello!" after 1 second
f(10)
}

addDefer ()