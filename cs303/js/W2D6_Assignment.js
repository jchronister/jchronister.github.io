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

//PLC
/*  Does a function pickup latest changes?
*
*   The function sayHi uses an external variable name. 
*   When the function runs, which value is it going to use?
*/
//PLC
function latestChange () {// eslint-disable-line no-unused-vars

  let name = "John";

  function sayHi() {
    return ("Hi, " + name);
  }

  name = "Pete";

  return sayHi(); //--> "Pete"?

}
//PLC
//WVA
/*  Which variables are available?
*
*   The function makeWorker below makes another function 
*   and returns it. That new function can be called from somewhere else.
*
*   Will it have access to the outer variables from its creation place, 
*   or the invocation place, or both?
*/
//WVA
function whichVariableAvailable () {// eslint-disable-line no-unused-vars

  function makeWorker() {
    let name = "Pete";

    return function() {
      return (name);
    };
  }

  let name = "John"; // eslint-disable-line no-unused-vars

  // create a function
  let work = makeWorker();

  return work(); //--> Pete

}
//WVA
//ACI
/*  Are counters independent?
*
*   Here we make two counters: counter and counter2 
*   using the same makeCounter function.
*
*   Are they independent? What is the second counter going to show? 
*   0,1 or 2,3 or something else?
*/
//ACI
function areCountersIndependent() {// eslint-disable-line no-unused-vars

  function makeCounter() {
    let count = 0;

    return function() {
      return count++;
    };
  }

  let counter = makeCounter();
  let counter2 = makeCounter();

  return "Counter: " + counter() + ", " + counter() + //--> 0, 1
       "\nCounter2: " + counter2() + ", " + counter2(); //--> 0, 1

}
//ACI
//CO
/*   Counter object
*
*    Here a counter object is made with the help of the constructor function.
*
*    Will it work? What will it show?
*/
//CO
function counterObject() {// eslint-disable-line no-unused-vars

  function Counter() {

    let count = 0;

    this.up = function() {
      return ++count;
    };
    this.down = function() {
      return --count;
    };
  }

  let counter = new Counter();

  return counter.up() + ", " + counter.up() + ", " + counter.down(); //--> 1, 2, 1

}
//CO
//FII
/*   Function in if
*    Look at the code. What will be the result of the call at the last line?
*/
//FII
function functionInIf() {// eslint-disable-line no-unused-vars

  let phrase = "Hello";

  if (true) {// eslint-disable-line no-constant-condition

    let user = "John";

    function sayHi() {// eslint-disable-line no-inner-declarations, no-unused-vars
      return (`${phrase}, ${user}`);
    }
    
  }
    
  try {
    return sayHi(); // eslint-disable-line no-undef
  } 
  catch (err){
    return err.toString();
  }
  
}
//FII
//SWC
/*  Sum with closures
*
*   Write function sum that works like this: sum(a)(b) = a+b.
*
*   Yes, exactly this way, using double parentheses (not a mistype).
*/
//SWC
function sumWithClosure(num1, num2) {// eslint-disable-line no-unused-vars

  let sum = function (num1) {
    return  function (anyNum) {
              return anyNum + num1;
            };
  };

  return sum(num1)(num2);

}
//SWC
//VV
/*  Is variable visible?
*
*   What will be the result of this code?
*/
//VV
function isVariableVisible() {// eslint-disable-line no-unused-vars

  let x = 1; // eslint-disable-line no-unused-vars

  function func() {
    return x;
    const x = 2;// eslint-disable-line no-unreachable
  }

  try {
    return func(); 
  } 
  catch (err){
    return err.toString();
  }
}
//VV
//FTF
/*  Filter through function
*
*   We have a built-in method arr.filter(f) for arrays. 
*   It filters all elements through the function f. If it 
*   returns true, then that element is returned in the resulting array.
*
*   Make a set of “ready to use” filters:
*
*   inBetween(a, b) – between a and b or equal to them (inclusively).
*   inArray([...]) – in the given array.
*   The usage must be like this:
*   arr.filter(inBetween(3,6))
*   arr.filter(inArray([1,2,3]))
*   arr = [1, 2, 3, 4, 5, 6, 7];
*/
//FTF
function inBetween(min, max) {// eslint-disable-line no-unused-vars
  return function (n) {
    return n >= min && n <= max;
  };
}

function inArray(ary) {// eslint-disable-line no-unused-vars
  return n=>ary.includes(n);
}
//FTF
//SBF
/*  Sort by field
*
*   We’ve got an array of objects to sort:
*   The usual way to do that would be:
*   users.sort((a, b) => a.name > b.name ? 1 : -1);
*   users.sort((a, b) => a.age > b.age ? 1 : -1);
*
*   Make it even less verbose, like this...
*    
*/
//SBF
function sortByField(fieldName) {

  let users = [
    { name: "John", age: 20, surname: "Johnson" },
    { name: "Pete", age: 18, surname: "Peterson" },
    { name: "Ann", age: 19, surname: "Hathaway" },
    { name: "Joe", age: 8, surname: "Hathaway" },
  ];

  let byField = function (a, b) {
    return a[fieldName] > b[fieldName] ? 1 : -1;
  };

  return users.sort(byField);

}
//SBF
//AOF
/*  Army of functions
*
*   The following code creates an array of shooters.
*
*   Every function is meant to output its number. But something is wrong…
*
*
➢global lexical environment (LE)
 __________________________________________
| makeArmy: function                       |
| army: array of functions (after call)    |  => Null
|__________________________________________|


 
➢LE for makeArmy()
 __________________________________________
| shooters: []                             |
| i: 0                                     |  => Global
|__________________________________________|

 
➢LE for LE of the while loop
 __________________________________________
| shooter: function                        |  => makeArmy
|__________________________________________|


**Change**When a is added, there will be a LE for Each Iteration of Loop 
 __________________________________________
| shooter: function                        |  => makeArmy
| a: 0 - 10                                |                      
|__________________________________________|


➢ LE for army[0]
 __________________________________________
|                                          |  
| [0]: function                            |  => Global
|__________________________________________|
*///AOF
function makeArmy(bind) { // 'Yes to Bind a' or Anything Else to Use i
  let shooters = [];

  let i = 0;
   while (i < 10) {
    let a = i;  // <-- Added Variable a Bound to Each Loop Iteration
    let shooter = function() {
      return ( bind === "Yes" ? a : i );
    };
    shooters.push(shooter); 
    i++;
  }

  // Execute and Display Array
  return (shooters.map(n=>n()));
  
}
//AOF
//SADC
/*  Set and decrease for counter
*
*   Modify the code of makeCounter() so that the counter 
*   can also decrease and set the number:
*
*   counter() should return the next number (as before).
*   counter.set(value) should set the counter to value.
*   counter.decrease() should decrease the counter by 1.
*   See the sandbox code for the complete usage example.
*
*   P.S. You can use either a closure or the function property 
*   to keep the current count. Or write both variants.
*/
//SADC
function makeCounter() {

  function counter() {
    return counter.count++;
  }

  counter.count = 0;
  counter.set = (value) => counter.count = value;
  counter.decrease = () => counter.count -= 1;

  return counter;
}
//SADC
//AGLE
/***
➢global lexical environment (LE)
 __________________________________________
| makeArmy: function                       |
| army: array of functions (after call)    |  => Null
|__________________________________________|


 
➢LE for makeArmy()
 __________________________________________
| shooters: []                             |
| i: 0                                     |  => Global
|__________________________________________|

 
➢LE for LE of the while loop
 __________________________________________
| shooters: []                             |
| i: number 0-10                           |  => makeArmy
| shooter: function                        |
|__________________________________________|


➢ LE for army[0]
 __________________________________________
|                                          |  
| [0]: function                            |  => Global
|__________________________________________|
*///AGLE