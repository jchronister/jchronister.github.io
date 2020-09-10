"use strict";
// var prompt = require('prompt-sync')();
// var alert = console.log;

/*  Create new Accumulator
*
*   Create a constructor function Accumulator(startingValue).
*
*   Object that it creates should:
*
*   Store the “current value” in the property value. The starting value is set to the argument of the constructor startingValue.
*   The read() method should use prompt to read a new number and add it to value.
*   In other words, the value property is the sum of all user-entered values with the initial value startingValue.
*/

function Accumulator(startingValue) {

  this.sum = startingValue || 0;

  this.read = function () {
    let num = Number(prompt("Please Enter Numer to Add to Total"));
    if (num) this.sum+=num
  }

  this.show = function () {
    return this.sum;
  }

}


// let x = new Accumulator();
// alert(x.show())
// x.read()
// alert(x.show())
// x.read()
// alert(x.show())
// x.read()
// alert(x.show())
// x.read()
