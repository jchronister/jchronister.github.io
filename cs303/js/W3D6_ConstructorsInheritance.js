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
//ADM
/* Add method "f.defer(ms)" to functions
*
*  Add to the prototype of all functions the method defer(ms), 
*  that runs the function after ms milliseconds.
*
*  After you do it, such code should work:
*/
//ADM
function addDefer () {

  let f = function () {
    alert("Hello!");
  };

  Function.prototype.defer = function (ms) {
    setTimeout(this, ms);
  };

  f.defer(2000);
  return "See Alert Box";
}
//ADM
//ADF
/*  Add the decorating "defer()" to functions
*
*   Add to the prototype of all functions the method defer(ms), 
*   that returns a wrapper, delaying the call by ms milliseconds.
*
*   Please note that the arguments should be passed to the original function.
*/
//ADF
function addDecorating () {

  function f(a, b) {
    alert( a + b );
  }

  Function.prototype.wdefer = function(ms) {

    let funct = this;

    return function () { 
      let arg = arguments;
      setTimeout(function(){funct.apply(funct,arg);}, ms);
    };

  };
  f.wdefer(1000)(1, 2); // shows 3 after 1 second
  return "See Alert Box";
}
//ADF
//SCH
/*  Create an object called Teacher derived from the Person class, 
*   and implement a method called teach
*   which receives a string called subject, and prints out:
*   [teacher's name] is now teaching [subject]
*
*   Here is code for Person and an example of a Student function 
*   constructor. Write Mocha tests that verify
*   the describe, learn, and teach methods work as expected for students 
*   and teachers.
*/
//SCH
let Person = function() {};

Person.prototype.initialize = function(name, age) {
  this.name = name;
  this.age = age;
};
Person.prototype.describe = function() {
  return this.name + ", " + this.age + " years old.";
};

let Student = function() {};
Student.prototype = new Person();

Student.prototype.learn = function(subject) {
  let learned = this.name + " just learned " + subject;
  console.log(learned);
  return learned;
};

let Teacher = function () {};
Teacher.prototype = new Person();

Teacher.prototype.teach = function(subject) {
  let teached = this.name + " is now teaching " + subject;
  console.log(teached);
  return teached;
};

function school () {

  let retrn = [];

  let me = new Student();
  me.initialize("John", 25);
  retrn.push(me.describe(),me.learn("Inheritance"));
  
  let teacher = new Teacher();
  teacher.initialize("Jane", 30);
  retrn.push(teacher.describe(),teacher.teach("Science"));

  return retrn;
}
//SCH
//DBC
/*  The difference between calls
*
*   Let’s create a new rabbit object:
*
*   These calls do the same thing or not?
*/
//DBC
function rabbitObjectCalls() {

  let retrn = [];

  function Rabbit(name) {
    this.name = name;
  }

  Rabbit.prototype.sayHi = function() {
    return (this.name);
  };

  let rabbit = new Rabbit("Rabbit");

  retrn.push("rabbit.sayHi() -> " + rabbit.sayHi());
  retrn.push("Rabbit.prototype.sayHi() -> " + Rabbit.prototype.sayHi());
  retrn.push("Object.getPrototypeOf(rabbit).sayHi() -> " + Object.getPrototypeOf(rabbit).sayHi());
  retrn.push("rabbit.__proto__.sayHi() -> " + rabbit.__proto__.sayHi());

  return retrn;
}
//DBC
