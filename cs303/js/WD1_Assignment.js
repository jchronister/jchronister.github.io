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

//OES
/*  Output every second
*
*   Write a function printNumbers(from, to) that outputs a number 
*   every second, starting from from and ending with to.
*
*   Make two variants of the solution.
*
*   Using setInterval.
*   Using nested setTimeout.
*/
//OES
function printNumbersWithSetInterval (from, to) {

    if (arguments.length !==2 || to < from) return;

    let timerId = setInterval(function () {
      
      log(from);  
      from += 1;
      if (from > to) clearInterval(timerId);
      
    },1000);
    
}

function printNumbersWithSetTimeout (from, to) {

  if (to < from) return;

  setTimeout(function printNos() {
    
    log(from);
    from += 1;
    if (from <= to) setTimeout(printNos, 1000);
    
  },1000);
  
}
//OES
//WWSTS
/*  What will setTimeout show?
*
*   In the code below there’s a setTimeout call 
*   scheduled, then a heavy calculation is run, that takes more than 
*   100ms to finish.
*
*   When will the scheduled function run?
*
*   After the loop. <==
*   Before the loop.
*   In the beginning of the loop.
*   What is alert going to show? 100000000
*/
//WWSTS
function setTimeoutShowwhen () {

  let i = 0;

  setTimeout(() => alert(i), 100); // ?

  // assume that the time to execute this function is >100ms
  for(let j = 0; j < 100000000; j++) {
    i++;
  }
}
//WWSTS
//BFAM
/*  Bound function as a method
*
* What will be the output?
*/
//BFAM
function bindFunctionasMethod () {

  function f() {
    return ( this ); // ?
  }
 
  let user = {
    g: f.bind(null)
  };

  return user.g();
}
//BFAM
//SB
/*  Second Bind
*
*   Can we change this by additional binding?
*
*   What will be the output?
*/
//SB
function bindAgain() {

  function f() {
    return (this.name);
  }

  // eslint-disable-next-line no-func-assign
  f = f.bind( {name: "John"} ).bind( {name: "Ann" } );

  return f();
}
//SB
//FPAB
/* Function property after bind
*
*  There’s a value in the property of a function. Will it change 
*  after bind? Why, or why not?
*/
//FPAB
function propertyAfterBind() {

  function sayHi() {
    return( this.name );
  }
  sayHi.test = 5;
  
  let bound = sayHi.bind({
    name: "John",
  });

  return( bound.test );

}
//FPAB

/*
Fix a function that loses "this"
importance: 5
The call to askPassword() in the code below should check the password and then call user.loginOk/loginFail depending on the answer.

But it leads to an error. Why?

Fix the highlighted line for everything to start working right (other lines are not to be changed).
*/

function pass () {

  function askPassword(ok, fail) {
    let password = prompt("Password?", '');
    if (password == "rockstar") return ok();
    else return fail();
  }

  let user = {
    name: "John",

    loginOk() {
      return(`${this.name} logged in`);
    },

    loginFail() {
      return(`${this.name} failed to log in`);
    },

  };

  return askPassword(user.loginOk.bind(user), user.loginFail.bind(user));
}


log(pass())




