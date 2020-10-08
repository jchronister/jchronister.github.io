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
//FFLT
/*
Fix a function that loses "this"
importance: 5
The call to askPassword() in the code below should check the password and then call user.loginOk/loginFail depending on the answer.

But it leads to an error. Why?

Fix the highlighted line for everything to start working right (other lines are not to be changed).
*/
//FFLT
function pass () {

  let pwd;

  function askPassword(ok, fail) {
    let password = pwd || prompt("Password?", '');
    pwd = password;
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

  return [askPassword(user.loginOk.bind(user), user.loginFail.bind(user)),
          askPassword(function(){return user.loginOk()},function(){return user.loginFail()}),
          askPassword(function(){return user.loginOk.call(user);}, function(){return user.loginFail.call(user);}),
          askPassword(function(){return user.loginOk.apply(user);}, function(){return user.loginFail.apply(user);})
  ];
}
//FFLT
//PAL
/* Partial application for login
*
*  The task is a little more complex variant of Fix a function 
*  that loses "this".
*
*  The user object was modified. Now instead of two functions 
*  loginOk/loginFail, it has a single function user.login(true/false).
*
*  What should we pass askPassword in the code below, so that it calls user.login(true) as ok and user.login(false) as fail?
*/
//PAL
function passAgain () {

  function askPassword(ok, fail) {
    let password = prompt("Password?", "");
    if (password == "rockstar") return ok();
    else return fail();
  }

  let user = {
    name: "John",

    login(result) {
      return ( this.name + (result ? " logged in" : " failed to log in") );
    }
  };

  return askPassword(user.login.bind(user, true), user.login.bind(user, false)); 

}
//PAL
//AFLE
/* Arrow functions and lexical ‘this’ exercise  
* Fix the code below using an arrow function and then using bind
*/
//AFLE
function correctBinding () {

  let group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],
    showList() {
        // Original Line -> this.students.forEach(function(student) {
        this.students.forEach((student) => { // <- Changed to Arrow Function
        // Original Error: Cannot read property 'title' of undefined
        log(this.title + ": " + student);
    });
    }
   };
   group.showList();


   group = {
    title: "Our Group",
    students: ["John", "Pete", "Alice"],
    showList() {
        this.students.forEach(function(student) {
        // Original Error: Cannot read property 'title' of undefined
        log(this.title + ": " + student);
    // Original Line ->   });
    }.bind(group)); // <-- Added Bind
    }
   };
   group.showList();

  }
//AFLE
//SD
/* Spy decorator
*
*  Create a decorator spy(func) that should return a wrapper that 
*  saves all calls to function in its calls property.
*
*  Every call is saved as an array of arguments.
*
*  That decorator is sometimes useful for unit-testing. Its advanced 
*  form is sinon.spy in Sinon.JS library.
*/
//SD
function work(a, b) {
  log( a + b ); // work is an arbitrary function or method
}

function spy(functn) {

  let retrn = function () {

    let arg = [].slice.apply(arguments);
    retrn.calls.push(arg);

    return functn.call(this,...arg);

  };

  retrn.calls = [];
  return retrn;
}

function callworkSpy() {

  // eslint-disable-next-line no-func-assign
  work = spy(work);

  work(1, 2); // 3
  work(4, 5); // 9

  for (let args of work.calls) {
    log( "call:" + args.join() ); // "call:1,2", "call:4,5"
  }

}
//SD
//DD
/*  Delaying decorator
*
*   Create a decorator delay(f, ms) that delays each call of f by ms 
*   milliseconds.
*   In other words, delay(f, ms) returns a "delayed by ms" variant of f.
*   In the code above, f is a function of a single argument, but your solution 
*   should pass all arguments and the context this.
*/
//DD
function f(x, y, z) {
  log(x+ y+ z);
}

function delay(call, msDelay) {
 
  return function (...arg) {
    setTimeout(call.bind(this, ...arg), msDelay);
  };

}
//DD



function callDelay() {

// create wrappers
let f1000 = delay(f, 1000);
let f1500 = delay(f, 1500);

f1000("test", " is", " working"); // shows "test is working" after 1000ms
f1500("test",1,2); // shows "test12" after 1500ms


}